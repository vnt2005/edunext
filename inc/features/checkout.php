<?php
/**
 * Checkout and Order Feature Handler
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_ajax_create_order() {
    check_ajax_referer('edunext_nonce', 'nonce');

    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'Vui lòng đăng nhập để hoàn tất đơn hàng.'], 401);
    }

    $course_id = sanitize_key($_POST['course_id'] ?? '');
    $course = edunext_catalog_course($course_id);

    if (!$course || !edunext_course_is_ready($course)) {
        wp_send_json_error(['message' => 'Khóa học không hợp lệ hoặc chưa sẵn sàng.'], 400);
    }

    $user_id = get_current_user_id();
    $owned = get_user_meta($user_id, 'edunext_owned_course_ids', true) ?: [];
    if (!in_array($course_id, $owned, true)) {
        $owned[] = $course_id;
        update_user_meta($user_id, 'edunext_owned_course_ids', $owned);
    }

    wp_send_json_success([
        'message' => 'Đăng ký khóa học thành công!',
        'redirect' => '#/learn/' . $course_id . '/0',
    ]);
}
add_action('wp_ajax_edunext_create_order', 'edunext_ajax_create_order');

