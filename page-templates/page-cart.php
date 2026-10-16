<?php
/**
 * Template Name: EduNext - Giỏ hàng
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/cart">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

