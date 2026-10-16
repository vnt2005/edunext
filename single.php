<?php
/**
 * The template for displaying all single posts
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main wrap edn-single-post">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('edn-article'); ?>>
            <header class="edn-article-header">
                <div class="edn-article-meta-top">
                    <span class="edn-mag-tag-pill"><?php the_category(', '); ?></span>
                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
                </div>
                <h1 class="edn-article-title"><?php the_title(); ?></h1>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="edn-article-hero-cover">
                    <?php the_post_thumbnail('full'); ?>
                </div>
            <?php endif; ?>

            <div class="edn-article-main-content">
                <?php the_content(); ?>
            </div>

            <footer class="edn-article-footer">
                <?php the_tags('<div class="edn-article-tags"><span>Thẻ:</span> ', ', ', '</div>'); ?>
            </footer>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php
get_footer();

