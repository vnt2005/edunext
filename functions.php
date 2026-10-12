<?php
if (!defined('ABSPATH')) {
    exit;
}

function edunext_setup(): void {
    add_theme_support('title-tag');
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

function edunext_enqueue_assets(): void {
    $version = '4.7';

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
        $version
    );

    wp_enqueue_style(
        'edunext-storefront',
        get_theme_file_uri('assets/css/storefront.css'),
        ['edunext-style'],
        $version
    );

    wp_enqueue_style(
        'edunext-console',
        get_theme_file_uri('assets/css/console.css'),
        ['edunext-storefront'],
        $version
    );

    wp_enqueue_script(
        'edunext-app',
        get_theme_file_uri('assets/js/main.js'),
        [],
        $version,
        true
    );
}
add_action('wp_enqueue_scripts', 'edunext_enqueue_assets');
