<?php
/**
 * Theme Setup and Support
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'style',
        'script',
        'search-form',
        'gallery',
        'caption',
        'comment-list',
        'comment-form',
    ]);
}
add_action('after_setup_theme', 'edunext_setup');

