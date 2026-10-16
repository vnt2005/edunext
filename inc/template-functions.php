<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function edunext_body_classes($classes) {
    $classes[] = 'edunext-theme';
    $classes[] = 'edunext-app';

    if (is_front_page()) {
        $classes[] = 'edunext-front-page';
    }

    return $classes;
}
add_filter('body_class', 'edunext_body_classes');

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function edunext_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'edunext_pingback_header');

