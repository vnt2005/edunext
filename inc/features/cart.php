<?php
/**
 * Cart Feature Handler
 *
 * Supports session/cookie-based cart for guest users,
 * and user-meta-based persistent cart for authenticated users.
 * Automatically synchronizes or isolates cart state per user.
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get current cart course IDs based on user authentication status.
 * - Logged-in users: stored in user_meta ('edunext_user_cart')
 * - Guests: stored in cookie ('edunext_cart')
 */
function edunext_get_cart_course_ids(): array {
    if (is_user_logged_in()) {
        $user_id = get_current_user_id();
        $saved = get_user_meta($user_id, 'edunext_user_cart', true);
        if (is_array($saved)) {
            return array_values(array_unique(array_filter(array_map('strval', $saved))));
        }
        return [];
    }

    if (!isset($_COOKIE['edunext_cart'])) {
        return [];
    }

    $raw = sanitize_text_field(wp_unslash($_COOKIE['edunext_cart']));
    $ids = json_decode($raw, true);
    if (!is_array($ids)) {
        return [];
    }

    return array_values(array_unique(array_filter(array_map('strval', $ids))));
}

/**
 * Get ready cart items.
 */
function edunext_get_cart_items(): array {
    $ids = edunext_get_cart_course_ids();
    $items = [];
    foreach ($ids as $id) {
        $course = edunext_catalog_course((string) $id);
        if ($course && edunext_course_is_ready($course)) {
            $items[] = $course;
        }
    }
    return $items;
}

/**
 * AJAX handler to save cart state to backend (user meta for logged in, cookie for guest).
 */
function edunext_ajax_sync_cart(): void {
    edunext_ajax_require_nonce();

    $ids_raw = wp_unslash($_POST['cartIds'] ?? '[]');
    $ids = json_decode($ids_raw, true);
    if (!is_array($ids)) {
        $ids = [];
    }
    $ids = array_values(array_unique(array_filter(array_map('sanitize_key', $ids))));

    if (is_user_logged_in()) {
        $user_id = get_current_user_id();
        update_user_meta($user_id, 'edunext_user_cart', $ids);
    } else {
        // Set secure cookie for guest (expires in 7 days)
        setcookie('edunext_cart', wp_json_encode($ids), [
            'expires'  => time() + (7 * 86400),
            'path'     => COOKIEPATH ?: '/',
            'domain'   => COOKIE_DOMAIN ?: '',
            'secure'   => is_ssl(),
            'httponly' => false,
            'samesite' => 'Lax',
        ]);
    }

    wp_send_json_success(['cartIds' => $ids]);
}
add_action('wp_ajax_edunext_sync_cart', 'edunext_ajax_sync_cart');
add_action('wp_ajax_nopriv_edunext_sync_cart', 'edunext_ajax_sync_cart');
