<?php
/**
 * Template Name: EduNext - Đăng nhập
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/login">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

