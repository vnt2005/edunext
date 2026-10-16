<?php
/**
 * Template Name: EduNext - Trang học tập
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/dashboard">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

