<?php
/**
 * Template Name: EduNext - Hỏi đáp (FAQ)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/faq">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

