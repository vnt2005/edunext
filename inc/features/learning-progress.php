<?php
/**
 * Student Learning Progress and Digital Certificates
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

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

