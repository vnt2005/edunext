<?php
/**
 * The template for displaying the footer
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<footer class="site-footer footer-reference edn-public-footer">
    <div class="wrap edn-public-footer-main">
        <?php get_template_part('template-parts/footer/brand-info'); ?>
        <?php get_template_part('template-parts/footer/navigation'); ?>
    </div>
    <?php get_template_part('template-parts/footer/copyright'); ?>
</footer>

<?php get_template_part('template-parts/footer/floating-contacts'); ?>

<div id="toast" class="toast" role="status" aria-live="polite"></div>
<?php wp_footer(); ?>
</body>
</html>
