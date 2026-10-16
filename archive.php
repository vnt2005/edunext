<?php
/**
 * The template for displaying archive pages
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main wrap edn-magazine-page">
    <header class="edn-mag-header">
        <?php
        the_archive_title('<h1>', '</h1>');
        the_archive_description('<div class="archive-description"><p>', '</p></div>');
        ?>
    </header>

    <div class="edn-mag-grid">
        <?php
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('edn-mag-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="edn-mag-card-media">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium_large'); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    <div class="edn-mag-card-body">
                        <h2 class="edn-mag-card-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="edn-mag-card-excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                </article>
                <?php
            endwhile;
            the_posts_navigation();
        else :
            ?>
            <p class="edn-empty-notice">Không tìm thấy bài viết nào trong chuyên mục này.</p>
            <?php
        endif;
        ?>
    </div>
</main>

<?php
get_footer();

