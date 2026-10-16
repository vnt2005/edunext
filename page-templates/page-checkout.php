<?php
/**
 * Template Name: EduNext - Thanh toán
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/checkout">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

