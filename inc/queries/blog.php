<?php
/**
 * Blog Query Functions
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_recent_posts(int $count = 6): WP_Query {
    return new WP_Query([
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => $count,
        'no_found_rows'  => false,
    ]);
}

