<?php
/**
 * Enqueue Theme Styles and Scripts
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
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
        'certificates' => edunext_user_certificates($user_id, $owned_ids),
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

