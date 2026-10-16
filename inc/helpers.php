<?php
/**
 * Helper Functions and Catalog Data Management
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

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

