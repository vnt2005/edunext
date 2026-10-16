<?php
/**
 * Template Name: EduNext - Đăng ký
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/register">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

