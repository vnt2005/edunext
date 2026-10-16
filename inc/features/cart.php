<?php
/**
 * Cart Feature Handler
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_cart_items(): array {
    if (!isset($_COOKIE['edunext_cart'])) {
        return [];
    }

    $raw = sanitize_text_field(wp_unslash($_COOKIE['edunext_cart']));
    $ids = json_decode($raw, true);
    if (!is_array($ids)) {
        return [];
    }

    $items = [];
    foreach ($ids as $id) {
        $course = edunext_catalog_course((string) $id);
        if ($course && edunext_course_is_ready($course)) {
            $items[] = $course;
        }
    }
    return $items;
}

