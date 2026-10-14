<?php

if (!defined('ABSPATH')) {
    exit;
}

function edunext_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('html5', [
        'style', 'script', 'search-form', 'gallery', 'caption',
        'comment-list', 'comment-form',
    ]);
}
add_action('after_setup_theme', 'edunext_setup');

function edunext_asset_version(string $relative_path, string $fallback = '5.0.0'): string {
    $path = get_theme_file_path($relative_path);
    return is_file($path) ? (string) filemtime($path) : $fallback;
}

function edunext_catalog_data(): array {
    static $catalog = null;
    if (is_array($catalog)) {
        return $catalog;
    }

    $path = get_theme_file_path('assets/data/course-catalog.json');
    if (!is_readable($path)) {
        $catalog = ['domains' => [], 'courses' => []];
        return $catalog;
    }

    $decoded = json_decode((string) file_get_contents($path), true);
    if (!is_array($decoded)) {
        $catalog = ['domains' => [], 'courses' => []];
        return $catalog;
    }

    $catalog = [
        'domains' => isset($decoded['domains']) && is_array($decoded['domains']) ? $decoded['domains'] : [],
        'courses' => isset($decoded['courses']) && is_array($decoded['courses']) ? $decoded['courses'] : [],
    ];
    return $catalog;
}

function edunext_catalog_course(string $course_id): ?array {
    foreach (edunext_catalog_data()['courses'] as $course) {
        if (is_array($course) && isset($course['id']) && hash_equals((string) $course['id'], $course_id)) {
            return $course;
        }
    }
    return null;
}

function edunext_course_is_ready(array $course): bool {
    if (empty($course['published']) || ($course['metadataStatus'] ?? 'draft') !== 'verified') {
        return false;
    }
    if (!isset($course['price']) || !is_numeric($course['price']) || (float) $course['price'] < 0) {
        return false;
    }

    foreach (['id', 'title', 'domainId', 'shortDescription', 'description', 'audience', 'prerequisites'] as $required_field) {
        if (trim((string) ($course[$required_field] ?? '')) === '') {
            return false;
        }
    }
    $domain_exists = false;
    foreach (edunext_catalog_data()['domains'] as $domain) {
        if (is_array($domain) && isset($domain['id']) && hash_equals((string) $domain['id'], (string) $course['domainId'])) {
            $domain_exists = true;
            break;
        }
    }
    if (!$domain_exists) {
        return false;
    }

    $level = trim((string) ($course['level'] ?? ''));
    $duration = $course['durationHours'] ?? null;
    $outcomes = isset($course['outcomes']) && is_array($course['outcomes']) ? $course['outcomes'] : [];
    if ($level === '' || in_array($level, ['Chưa xác định', 'Chưa cấu hình'], true) || !is_numeric($duration) || (float) $duration <= 0 || empty($outcomes)) {
        return false;
    }

    $lessons = isset($course['lessons']) && is_array($course['lessons']) ? $course['lessons'] : [];
    if (empty($lessons)) {
        return false;
    }

    // A video URL must not be reused for multiple lesson entries across the catalog.
    $video_counts = [];
    foreach (edunext_catalog_data()['courses'] as $catalog_course) {
        if (!is_array($catalog_course) || empty($catalog_course['lessons']) || !is_array($catalog_course['lessons'])) {
            continue;
        }
        foreach ($catalog_course['lessons'] as $catalog_lesson) {
            $catalog_video = trim((string) ($catalog_lesson['videoUrl'] ?? ''));
            if ($catalog_video !== '') {
                $key = strtolower(rtrim($catalog_video, '/'));
                $video_counts[$key] = ($video_counts[$key] ?? 0) + 1;
            }
        }
    }

    foreach ($lessons as $lesson) {
        if (!is_array($lesson) || trim((string) ($lesson['title'] ?? '')) === '') {
            return false;
        }
        $content = trim((string) ($lesson['content'] ?? ''));
        $video_url = trim((string) ($lesson['videoUrl'] ?? ''));
        $resource_url = trim((string) ($lesson['resourceUrl'] ?? ''));
        if ($content === '' && $video_url === '' && $resource_url === '') {
            return false;
        }
        foreach ([$video_url, $resource_url] as $url) {
            if ($url !== '' && (!wp_http_validate_url($url) || strtolower((string) wp_parse_url($url, PHP_URL_SCHEME)) !== 'https')) {
                return false;
            }
        }
        if ($video_url !== '' && ($video_counts[strtolower(rtrim($video_url, '/'))] ?? 0) !== 1) {
            return false;
        }
    }

    $preview_url = trim((string) ($course['previewVideoUrl'] ?? ''));
    if ($preview_url !== '' && (!wp_http_validate_url($preview_url) || strtolower((string) wp_parse_url($preview_url, PHP_URL_SCHEME)) !== 'https')) {
        return false;
    }

    return true;
}

function edunext_course_required_lessons(array $course): int {
    $lesson_count = isset($course['lessons']) && is_array($course['lessons']) ? count($course['lessons']) : 0;
    $required = $course['completionRule']['requiredCount'] ?? $lesson_count;
    return max(0, min($lesson_count, absint($required)));
}

function edunext_frontend_user_payload(): ?array {
    if (!is_user_logged_in()) {
        return null;
    }

    $user = wp_get_current_user();
    $profile = [
        'headline' => (string) get_user_meta($user->ID, 'edunext_headline', true),
        'bio' => (string) get_user_meta($user->ID, 'description', true),
        'language' => (string) (get_user_meta($user->ID, 'edunext_language', true) ?: 'vi'),
        'website' => (string) get_user_meta($user->ID, 'edunext_website', true),
        'linkedin' => (string) get_user_meta($user->ID, 'edunext_linkedin', true),
        'facebook' => (string) get_user_meta($user->ID, 'edunext_facebook', true),
        'avatar' => (string) get_user_meta($user->ID, 'edunext_avatar_url', true),
    ];

    return [
        'id' => (int) $user->ID,
        'name' => (string) $user->display_name,
        'email' => (string) $user->user_email,
        'profile' => $profile,
    ];
}

function edunext_frontend_config(): array {
    $user = wp_get_current_user();
    $user_id = is_user_logged_in() ? (int) $user->ID : 0;
    $owned_ids = $user_id ? get_user_meta($user_id, 'edunext_owned_course_ids', true) : [];
    $all_progress = $user_id ? get_user_meta($user_id, 'edunext_course_progress', true) : [];
    $orders = $user_id ? get_user_meta($user_id, 'edunext_orders', true) : [];

    if (!is_array($owned_ids)) {
        $owned_ids = [];
    }
    if (!is_array($all_progress)) {
        $all_progress = [];
    }
    if (!is_array($orders)) {
        $orders = [];
    }

    $catalog_courses = edunext_catalog_data()['courses'];
    $valid_published_ids = [];
    foreach ($catalog_courses as $catalog_course) {
        if (is_array($catalog_course) && edunext_course_is_ready($catalog_course) && !empty($catalog_course['id'])) {
            $valid_published_ids[] = sanitize_key((string) $catalog_course['id']);
        }
    }
    $owned_ids = array_values(array_unique(array_filter(array_map(
        static fn($id) => sanitize_key((string) $id),
        $owned_ids
    ))));
    $owned_ids = array_values(array_intersect($owned_ids, $valid_published_ids));
    $progress = [];
    foreach ($owned_ids as $course_id) {
        $entry = $all_progress[$course_id] ?? [];
        if (!is_array($entry)) {
            $entry = [];
        }
        $done = isset($entry['done']) && is_array($entry['done']) ? $entry['done'] : [];
        $progress[$course_id] = [
            'done' => array_values(array_unique(array_filter(array_map('absint', $done), static fn($n) => $n >= 0))),
            'updatedAt' => isset($entry['updatedAt']) ? absint($entry['updatedAt']) : null,
        ];
    }

    return [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'catalogUrl' => esc_url_raw(get_theme_file_uri('assets/data/course-catalog.json')),
        'nonce' => wp_create_nonce('edunext_user_action'),
        'loggedIn' => (bool) $user_id,
        'user' => edunext_frontend_user_payload(),
        'ownedCourseIds' => $owned_ids,
        'progress' => $progress,
        // Only certificate records stored by the server for completed, published courses are exposed.
        'certificates' => edunext_user_certificates($user_id, $owned_ids),
        // Only order records written by a trusted purchase integration are exposed here.
        'orders' => array_values(array_filter($orders, 'is_array')),
        'contact' => [
            'zaloUrl' => esc_url_raw((string) get_theme_mod('edunext_zalo_url', '')),
            'facebookUrl' => esc_url_raw((string) get_theme_mod('edunext_facebook_url', '')),
            'phone' => sanitize_text_field((string) get_theme_mod('edunext_phone_number', '')),
        ],
        'lostPasswordUrl' => esc_url_raw(wp_lostpassword_url()),
        'paymentReady' => false,
        'domainImages' => edunext_domain_images(),
        'courseImages' => edunext_course_images(),
    ];
}

function edunext_domain_images(): array {
    return [
        'field-lap-trinh-va-phat-trien-phan-mem' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        'field-phat-trien-web' => 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
        'field-phat-trien-ung-dung-di-dong' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
        'field-co-so-du-lieu' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
        'field-ai-va-machine-learning' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
        'field-khoa-hoc-du-lieu-va-phan-tich-du-lieu' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        'field-an-ninh-mang' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        'field-mang-may-tinh-va-he-thong' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
        'field-cloud-computing-va-devops' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        'field-kiem-thu-phan-mem' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        'field-kien-truc-va-thiet-ke-phan-mem' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
        'field-phat-trien-game' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
        'field-blockchain-va-web3' => 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        'field-iot-va-he-thong-nhung' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        'field-ui-ux-va-thiet-ke-san-pham-so' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
        'field-thiet-ke-do-hoa' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
        'field-thiet-ke-3d-va-kien-truc' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        'field-nhiep-anh' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
        'field-video-va-san-xuat-noi-dung' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
        'field-sang-tao-noi-dung-so' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        'field-digital-marketing' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        'field-content-marketing-va-copywriting' => 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
        'field-kinh-doanh-va-ban-hang' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        'field-thuong-mai-dien-tu' => 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
        'field-quan-tri-doanh-nghiep' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        'field-quan-ly-du-an' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        'field-tai-chinh-va-dau-tu' => 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
        'field-ke-toan-va-kiem-toan' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        'field-nhan-su' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
        'field-logistics-va-chuoi-cung-ung' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
        'field-tieng-anh' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
        'field-ngoai-ngu-khac' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
        'field-giao-duc-va-dao-tao' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
        'field-ky-nang-mem' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        'field-nang-suat-va-phat-trien-ca-nhan' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        'field-tin-hoc-van-phong' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        'field-phan-tich-nghiep-vu' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
        'field-khoa-hoc-va-toan-hoc' => 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
        'field-ky-thuat-va-cong-nghe' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
        'field-khoi-nghiep' => 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
        'field-am-nhac' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
        'field-my-thuat-va-minh-hoa' => 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
        'field-thoi-trang' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
        'field-nau-an-va-am-thuc' => 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
        'field-suc-khoe-va-the-chat' => 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
        'field-lam-dep' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        'field-bat-dong-san' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
        'field-phap-luat-va-tuan-thu' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
        'field-nong-nghiep-va-moi-truong' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
        'field-du-lich-va-dich-vu' => 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
    ];
}

function edunext_course_images(): array {
    return [
        'csharp' => 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
        'api' => 'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
        'data' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=82&w=1200',
        'english' => 'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
        'design' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=82&w=1200',
        'marketing' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=82&w=1200',
        'autocad-2d-cho-ban-ve-ky-thuat' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=1200',
        'sql-server-va-sql-tu-co-ban-den-thuc-hanh' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=82&w=1200',
        'xay-dung-ung-dung-voi-generative-ai-va-llm' => 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=82&w=1200',
        'lap-trinh-flutter-tu-dau' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=82&w=1200',
        'phat-trien-ung-dung-android-voi-kotlin' => 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=82&w=1200',
        'blender-3d-tu-modeling-den-rendering' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=82&w=1200',
    ];
}

function edunext_get_course_image(string $course_id, ?string $domain_id = null): string {
    $c_imgs = edunext_course_images();
    if (isset($c_imgs[$course_id])) {
        return $c_imgs[$course_id];
    }
    if ($domain_id !== null) {
        $d_imgs = edunext_domain_images();
        if (isset($d_imgs[$domain_id])) {
            return $d_imgs[$domain_id];
        }
    }
    return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
}

function edunext_enqueue_assets(): void {
    wp_enqueue_style(
        'edunext-fonts',
        'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'edunext-style',
        get_stylesheet_uri(),
        ['edunext-fonts'],
        edunext_asset_version('style.css')
    );

    wp_enqueue_style(
        'edunext-storefront',
        get_theme_file_uri('assets/css/storefront.css'),
        ['edunext-style'],
        edunext_asset_version('assets/css/storefront.css')
    );

    wp_enqueue_style(
        'edunext-learner-experience',
        get_theme_file_uri('assets/css/learner-experience.css'),
        ['edunext-storefront'],
        edunext_asset_version('assets/css/learner-experience.css')
    );

    wp_enqueue_style(
        'edunext-marketplace-redesign',
        get_theme_file_uri('assets/css/marketplace-redesign.css'),
        ['edunext-learner-experience'],
        edunext_asset_version('assets/css/marketplace-redesign.css')
    );

    wp_enqueue_style(
        'edunext-impeccable-public',
        get_theme_file_uri('assets/css/impeccable-public.css'),
        ['edunext-marketplace-redesign'],
        edunext_asset_version('assets/css/impeccable-public.css')
    );

    // Three.js for lightweight interactive 3D hero visualization
    wp_enqueue_script(
        'threejs',
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        [],
        'r128',
        true
    );

    // GSAP Core & ScrollTrigger for modern interactive animations
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
        [],
        '3.12.5',
        true
    );

    wp_enqueue_script(
        'gsap-scroll-trigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
        ['gsap'],
        '3.12.5',
        true
    );

    wp_enqueue_script(
        'edunext-app',
        get_theme_file_uri('assets/js/main.js'),
        ['threejs', 'gsap', 'gsap-scroll-trigger'],
        edunext_asset_version('assets/js/main.js'),
        true
    );

    wp_localize_script('edunext-app', 'EDUNEXT_CONFIG', edunext_frontend_config());
}
add_action('wp_enqueue_scripts', 'edunext_enqueue_assets');

function edunext_ajax_require_nonce(): void {
    check_ajax_referer('edunext_user_action', 'nonce');
}

function edunext_ajax_error(string $message, int $status = 400): void {
    wp_send_json_error(['message' => $message], $status);
}

function edunext_ajax_register(): void {
    edunext_ajax_require_nonce();

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $password = (string) wp_unslash($_POST['password'] ?? '');
    $accepted = sanitize_text_field(wp_unslash($_POST['accepted'] ?? ''));

    if ($name === '' || !is_email($email)) {
        edunext_ajax_error('Vui lòng nhập họ tên và địa chỉ email hợp lệ.');
    }
    if (strlen($password) < 8) {
        edunext_ajax_error('Mật khẩu cần tối thiểu 8 ký tự.');
    }
    if ($accepted !== '1') {
        edunext_ajax_error('Bạn cần đồng ý với điều khoản sử dụng.');
    }
    if (email_exists($email)) {
        edunext_ajax_error('Email này đã được đăng ký. Hãy đăng nhập.');
    }

    $local_part = (string) current(explode('@', $email));
    $login = sanitize_user($local_part, true);
    if ($login === '') {
        $login = 'edunext-user';
    }
    $base_login = $login;
    $counter = 1;
    while (username_exists($login)) {
        $login = $base_login . '-' . $counter;
        $counter++;
    }

    $user_id = wp_create_user($login, $password, $email);
    if (is_wp_error($user_id)) {
        edunext_ajax_error('Không thể tạo tài khoản lúc này. Vui lòng kiểm tra thông tin và thử lại.');
    }

    wp_update_user([
        'ID' => (int) $user_id,
        'display_name' => $name,
        'first_name' => $name,
    ]);
    wp_set_current_user((int) $user_id);
    wp_set_auth_cookie((int) $user_id, true, is_ssl());

    wp_send_json_success(['message' => 'Tài khoản đã được tạo.', 'redirect' => '#/dashboard']);
}
add_action('wp_ajax_nopriv_edunext_register', 'edunext_ajax_register');

function edunext_ajax_login(): void {
    edunext_ajax_require_nonce();

    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $password = (string) wp_unslash($_POST['password'] ?? '');
    if (!is_email($email) || $password === '') {
        edunext_ajax_error('Vui lòng nhập email và mật khẩu.');
    }

    $user = get_user_by('email', $email);
    if (!$user) {
        edunext_ajax_error('Email hoặc mật khẩu chưa chính xác.');
    }

    $signed_in = wp_signon([
        'user_login' => $user->user_login,
        'user_password' => $password,
        'remember' => true,
    ], is_ssl());

    if (is_wp_error($signed_in)) {
        edunext_ajax_error('Email hoặc mật khẩu chưa chính xác.', 401);
    }

    wp_send_json_success(['message' => 'Đăng nhập thành công.', 'redirect' => '#/dashboard']);
}
add_action('wp_ajax_nopriv_edunext_login', 'edunext_ajax_login');

function edunext_ajax_logout(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        wp_send_json_success(['redirect' => '#/']);
    }
    wp_logout();
    wp_send_json_success(['redirect' => '#/']);
}
add_action('wp_ajax_edunext_logout', 'edunext_ajax_logout');

function edunext_ajax_profile_save(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để cập nhật hồ sơ.', 401);
    }

    $user_id = get_current_user_id();
    $first = sanitize_text_field(wp_unslash($_POST['firstName'] ?? ''));
    $last = sanitize_text_field(wp_unslash($_POST['lastName'] ?? ''));
    $headline = sanitize_text_field(wp_unslash($_POST['headline'] ?? ''));
    $bio = sanitize_textarea_field(wp_unslash($_POST['bio'] ?? ''));
    $language = sanitize_key(wp_unslash($_POST['language'] ?? 'vi'));
    $links = [];
    foreach (['website', 'linkedin', 'facebook'] as $key) {
        $raw = trim((string) wp_unslash($_POST[$key] ?? ''));
        $url = $raw === '' ? '' : esc_url_raw($raw, ['http', 'https']);
        if ($raw !== '' && $url === '') {
            edunext_ajax_error('Các liên kết phải là URL bắt đầu bằng http:// hoặc https://.');
        }
        $links[$key] = $url;
    }

    if ($first === '' || $last === '') {
        edunext_ajax_error('Vui lòng nhập cả họ và tên.');
    }
    $updated = wp_update_user([
        'ID' => $user_id,
        'first_name' => $first,
        'last_name' => $last,
        // For Vietnamese names, family name and middle names precede the given name.
        'display_name' => trim($last . ' ' . $first),
    ]);
    if (is_wp_error($updated)) {
        edunext_ajax_error('Không thể cập nhật hồ sơ lúc này.');
    }

    update_user_meta($user_id, 'edunext_headline', $headline);
    update_user_meta($user_id, 'description', $bio);
    update_user_meta($user_id, 'edunext_language', in_array($language, ['vi', 'en'], true) ? $language : 'vi');
    update_user_meta($user_id, 'edunext_website', $links['website']);
    update_user_meta($user_id, 'edunext_linkedin', $links['linkedin']);
    update_user_meta($user_id, 'edunext_facebook', $links['facebook']);

    wp_send_json_success(['message' => 'Đã lưu hồ sơ.']);
}
add_action('wp_ajax_edunext_profile_save', 'edunext_ajax_profile_save');

function edunext_ajax_profile_password(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để đổi mật khẩu.', 401);
    }

    $user = wp_get_current_user();
    $current = (string) wp_unslash($_POST['currentPassword'] ?? '');
    $new = (string) wp_unslash($_POST['newPassword'] ?? '');
    $confirm = (string) wp_unslash($_POST['confirmPassword'] ?? '');

    if ($current === '' || !wp_check_password($current, $user->user_pass, $user->ID)) {
        edunext_ajax_error('Mật khẩu hiện tại chưa chính xác.');
    }
    if (strlen($new) < 8) {
        edunext_ajax_error('Mật khẩu mới cần tối thiểu 8 ký tự.');
    }
    if (!hash_equals($new, $confirm)) {
        edunext_ajax_error('Hai mật khẩu mới chưa trùng khớp.');
    }

    $updated = wp_update_user(['ID' => $user->ID, 'user_pass' => $new]);
    if (is_wp_error($updated)) {
        edunext_ajax_error('Không thể đổi mật khẩu lúc này.');
    }
    wp_set_auth_cookie($user->ID, true, is_ssl());
    wp_send_json_success(['message' => 'Đã cập nhật mật khẩu.']);
}
add_action('wp_ajax_edunext_profile_password', 'edunext_ajax_profile_password');

function edunext_ajax_profile_avatar(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để cập nhật ảnh hồ sơ.', 401);
    }
    if (empty($_FILES['avatar']) || !is_array($_FILES['avatar'])) {
        edunext_ajax_error('Vui lòng chọn một ảnh.');
    }
    $file = $_FILES['avatar'];
    if (!empty($file['size']) && (int) $file['size'] > 2 * MB_IN_BYTES) {
        edunext_ajax_error('Ảnh cần có dung lượng không quá 2 MB.');
    }
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    $detected = wp_check_filetype_and_ext($file['tmp_name'] ?? '', $file['name'] ?? '');
    if (empty($detected['type']) || !in_array($detected['type'], $allowed, true)) {
        edunext_ajax_error('Chỉ chấp nhận ảnh JPG, PNG hoặc WebP.');
    }

    require_once ABSPATH . 'wp-admin/includes/file.php';
    $uploaded = wp_handle_upload($file, ['test_form' => false, 'mimes' => [
        'jpg|jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'webp' => 'image/webp',
    ]]);
    if (isset($uploaded['error']) || empty($uploaded['url'])) {
        edunext_ajax_error('Không thể lưu ảnh đã chọn.');
    }

    update_user_meta(get_current_user_id(), 'edunext_avatar_url', esc_url_raw($uploaded['url']));
    wp_send_json_success(['message' => 'Đã cập nhật ảnh hồ sơ.']);
}
add_action('wp_ajax_edunext_profile_avatar', 'edunext_ajax_profile_avatar');

function edunext_ajax_profile_avatar_remove(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để xóa ảnh đại diện.', 401);
    }

    delete_user_meta(get_current_user_id(), 'edunext_avatar_url');
    wp_send_json_success(['message' => 'Đã xóa ảnh đại diện.']);
}
add_action('wp_ajax_edunext_profile_avatar_remove', 'edunext_ajax_profile_avatar_remove');

function edunext_user_certificates(int $user_id, array $owned_ids): array {
    if ($user_id <= 0 || empty($owned_ids)) {
        return [];
    }
    $records = get_user_meta($user_id, 'edunext_certificates', true);
    if (!is_array($records)) {
        return [];
    }

    $valid = [];
    foreach ($records as $course_id => $certificate) {
        $course_id = sanitize_key((string) $course_id);
        $course = edunext_catalog_course($course_id);
        if (!is_array($certificate) || !is_array($course) || !edunext_course_is_ready($course) || !in_array($course_id, $owned_ids, true)) {
            continue;
        }
        $progress = get_user_meta($user_id, 'edunext_course_progress', true);
        $done = is_array($progress) && isset($progress[$course_id]['done']) && is_array($progress[$course_id]['done'])
            ? array_unique(array_map('absint', $progress[$course_id]['done']))
            : [];
        if (count($done) < edunext_course_required_lessons($course)) {
            continue;
        }
        $valid[] = [
            'courseId' => $course_id,
            'courseTitle' => sanitize_text_field((string) $course['title']),
            'code' => sanitize_text_field((string) ($certificate['code'] ?? '')),
            'issuedAt' => absint($certificate['issuedAt'] ?? 0),
        ];
    }
    return $valid;
}

function edunext_ajax_progress_save(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để lưu tiến độ.', 401);
    }

    $user_id = get_current_user_id();
    $course_id = sanitize_key(wp_unslash($_POST['courseId'] ?? ''));
    $index = filter_var(wp_unslash($_POST['lessonIndex'] ?? null), FILTER_VALIDATE_INT);
    $completed = sanitize_text_field(wp_unslash($_POST['completed'] ?? ''));

    if ($course_id === '' || $index === false || $index < 0 || !in_array($completed, ['0', '1'], true)) {
        edunext_ajax_error('Dữ liệu tiến độ không hợp lệ.');
    }
    $owned_ids = get_user_meta($user_id, 'edunext_owned_course_ids', true);
    $course = edunext_catalog_course($course_id);
    if (!is_array($course) || !edunext_course_is_ready($course) || !is_array($owned_ids) || !in_array($course_id, $owned_ids, true)) {
        edunext_ajax_error('Tài khoản chưa có quyền truy cập khóa học này.', 403);
    }
    $lesson_count = isset($course['lessons']) && is_array($course['lessons']) ? count($course['lessons']) : 0;
    if ($lesson_count <= 0 || $index >= $lesson_count) {
        edunext_ajax_error('Bài học không tồn tại trong khóa học này.');
    }

    $all_progress = get_user_meta($user_id, 'edunext_course_progress', true);
    if (!is_array($all_progress)) {
        $all_progress = [];
    }
    $entry = isset($all_progress[$course_id]) && is_array($all_progress[$course_id])
        ? $all_progress[$course_id]
        : ['done' => []];
    $done = isset($entry['done']) && is_array($entry['done']) ? array_map('absint', $entry['done']) : [];

    if ($completed === '1') {
        if (!in_array($index, $done, true)) {
            $done[] = $index;
        }
    } else {
        $done = array_values(array_filter($done, static fn($item) => $item !== $index));
    }

    $all_progress[$course_id] = [
        'done' => array_values(array_unique($done)),
        'updatedAt' => time(),
    ];
    update_user_meta($user_id, 'edunext_course_progress', $all_progress);
    wp_send_json_success(['progress' => $all_progress[$course_id]]);
}
add_action('wp_ajax_edunext_progress_save', 'edunext_ajax_progress_save');

function edunext_ajax_certificate_issue(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để xem chứng chỉ.', 401);
    }

    $user_id = get_current_user_id();
    $course_id = sanitize_key(wp_unslash($_POST['courseId'] ?? ''));
    $course = edunext_catalog_course($course_id);
    $owned_ids = get_user_meta($user_id, 'edunext_owned_course_ids', true);
    if (!is_array($course) || !edunext_course_is_ready($course) || !is_array($owned_ids) || !in_array($course_id, $owned_ids, true)) {
        edunext_ajax_error('Khóa học chưa được mở cho tài khoản này.', 403);
    }

    $all_progress = get_user_meta($user_id, 'edunext_course_progress', true);
    $entry = is_array($all_progress) && isset($all_progress[$course_id]) && is_array($all_progress[$course_id])
        ? $all_progress[$course_id] : [];
    $done = isset($entry['done']) && is_array($entry['done']) ? array_unique(array_map('absint', $entry['done'])) : [];
    $required = edunext_course_required_lessons($course);
    if ($required <= 0 || count($done) < $required) {
        edunext_ajax_error('Bạn cần hoàn thành toàn bộ điều kiện học tập đã công bố trước khi nhận chứng chỉ.', 403);
    }

    $certificates = get_user_meta($user_id, 'edunext_certificates', true);
    if (!is_array($certificates)) {
        $certificates = [];
    }
    if (empty($certificates[$course_id]['code'])) {
        $certificates[$course_id] = [
            'code' => strtoupper('EDU-' . wp_date('Y') . '-' . substr(str_replace('-', '', wp_generate_uuid4()), 0, 10)),
            'issuedAt' => time(),
        ];
        update_user_meta($user_id, 'edunext_certificates', $certificates);
    }

    wp_send_json_success([
        'courseId' => $course_id,
        'courseTitle' => sanitize_text_field((string) $course['title']),
        'code' => sanitize_text_field((string) $certificates[$course_id]['code']),
        'issuedAt' => absint($certificates[$course_id]['issuedAt']),
    ]);
}
add_action('wp_ajax_edunext_certificate_issue', 'edunext_ajax_certificate_issue');
