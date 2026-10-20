<?php
/**
 * Checkout and Order Feature Handler - Powered by EduNext Independent DB
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_ajax_create_order() {
    check_ajax_referer('edunext_user_action', 'nonce');

    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'Vui lòng đăng nhập để hoàn tất đơn hàng.'], 401);
    }

    $course_id = sanitize_key($_POST['course_id'] ?? '');
    $course = edunext_catalog_course($course_id);

    if (!$course || !edunext_course_is_ready($course)) {
        wp_send_json_error(['message' => 'Khóa học không hợp lệ hoặc chưa sẵn sàng.'], 400);
    }

    $user = wp_get_current_user();

    // Call EduNext Orders Engine
    if (class_exists('EduNext_Orders')) {
        $res = EduNext_Orders::create_order([
            'user_id'        => $user->ID,
            'customer_name'  => $user->display_name ?: $user->user_login,
            'customer_email' => $user->user_email,
            'course_ids'     => [$course_id],
            'payment_method' => 'manual',
        ]);

        if (!$res['success']) {
            wp_send_json_error(['message' => $res['message']], 400);
        }

        // For instant checkout / enrollment in manual mode:
        // Admin or instant flow completes the order and grants access
        EduNext_Orders::complete_order($res['order_id'], 'INSTANT-' . time());
    } else {
        // Fallback user meta if plugin not yet loaded
        $owned = get_user_meta($user->ID, 'edunext_owned_course_ids', true) ?: [];
        if (!in_array($course_id, $owned, true)) {
            $owned[] = $course_id;
            update_user_meta($user->ID, 'edunext_owned_course_ids', $owned);
        }
    }

    wp_send_json_success([
        'message' => 'Đăng ký khóa học thành công!',
        'redirect' => '#/learn/' . $course_id . '/0',
    ]);
}
add_action('wp_ajax_edunext_create_order', 'edunext_ajax_create_order');
