<?php
/**
 * Template Name: EduNext - Lĩnh vực
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="app" data-initial-route="/categories">
    <?php get_template_part('template-parts/app'); ?>
</div>

<?php
get_footer();

