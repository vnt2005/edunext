<?php
/**
 * Live Search Feature Handler
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_ajax_live_search() {
    check_ajax_referer('edunext_nonce', 'nonce');

    $query = sanitize_text_field($_GET['q'] ?? '');
    if (empty($query)) {
        wp_send_json_success(['courses' => [], 'domains' => []]);
    }

    $catalog = edunext_catalog_data();
    $matched_courses = [];
    $matched_domains = [];

    $q_lower = mb_strtolower($query, 'UTF-8');

    foreach ($catalog['courses'] as $course) {
        if (!edunext_course_is_ready($course)) {
            continue;
        }
        $title = mb_strtolower($course['title'] ?? '', 'UTF-8');
        $desc = mb_strtolower($course['shortDescription'] ?? '', 'UTF-8');
        if (strpos($title, $q_lower) !== false || strpos($desc, $q_lower) !== false) {
            $matched_courses[] = [
                'id'    => $course['id'],
                'title' => $course['title'],
                'price' => $course['price'],
                'image' => edunext_course_image_url($course),
            ];
            if (count($matched_courses) >= 5) {
                break;
            }
        }
    }

    foreach ($catalog['domains'] as $domain) {
        $name = mb_strtolower($domain['name'] ?? '', 'UTF-8');
        if (strpos($name, $q_lower) !== false) {
            $matched_domains[] = [
                'id'   => $domain['id'],
                'name' => $domain['name'],
            ];
            if (count($matched_domains) >= 5) {
                break;
            }
        }
    }

    wp_send_json_success([
        'courses' => $matched_courses,
        'domains' => $matched_domains,
    ]);
}
add_action('wp_ajax_edunext_search', 'edunext_ajax_live_search');
add_action('wp_ajax_nopriv_edunext_search', 'edunext_ajax_live_search');

