<?php
/**
 * Security hardening and sanitization functions
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Remove WordPress version from head
 */
remove_action('wp_head', 'wp_generator');

/**
 * Clean up header links
 */
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

/**
 * Verify AJAX nonce securely
 *
 * @param string $action Nonce action name.
 * @param string $query_arg Nonce request parameter name.
 * @return bool
 */
function edunext_verify_ajax_nonce($action = 'edunext_nonce', $query_arg = 'nonce'): bool {
    $nonce = $_REQUEST[$query_arg] ?? '';
    if (!wp_verify_nonce($nonce, $action)) {
        wp_send_json_error(['message' => 'Phiên làm việc đã hết hạn. Vui lòng tải lại trang.'], 403);
        return false;
    }
    return true;
}

