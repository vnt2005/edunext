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

    $owned_ids = array_values(array_unique(array_filter(array_map(
        static fn($id) => sanitize_key((string) $id),
        $owned_ids
    ))));
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
        'nonce' => wp_create_nonce('edunext_user_action'),
        'loggedIn' => (bool) $user_id,
        'user' => edunext_frontend_user_payload(),
        'ownedCourseIds' => $owned_ids,
        'progress' => $progress,
        // Only order records written by a trusted purchase integration are exposed here.
        'orders' => array_values(array_filter($orders, 'is_array')),
        'contact' => [
            'zaloUrl' => esc_url_raw((string) get_theme_mod('edunext_zalo_url', '')),
            'facebookUrl' => esc_url_raw((string) get_theme_mod('edunext_facebook_url', '')),
            'phone' => sanitize_text_field((string) get_theme_mod('edunext_phone_number', '')),
        ],
    ];
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

    wp_enqueue_script(
        'edunext-course-catalog',
        get_theme_file_uri('assets/js/course-catalog.js'),
        [],
        edunext_asset_version('assets/js/course-catalog.js'),
        true
    );

    wp_enqueue_script(
        'edunext-app',
        get_theme_file_uri('assets/js/main.js'),
        ['edunext-course-catalog'],
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
        'display_name' => trim($first . ' ' . $last),
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
    if (!is_array($owned_ids) || !in_array($course_id, $owned_ids, true)) {
        edunext_ajax_error('Tài khoản chưa có quyền truy cập khóa học này.', 403);
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
