<?php
/**
 * Template Name: EduNext - Hồ sơ học viên
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/profile">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

