<?php
/**
 * Template Name: EduNext - Giới thiệu (About)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/about">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

