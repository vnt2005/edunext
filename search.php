<?php
/**
 * The template for displaying search results pages
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
        <span class="edn-badge edn-badge-accent">KẾT QUẢ TÌM KIẾM</span>
        <h1><?php printf(esc_html__('Tìm kiếm cho: %s', 'edunext'), '<span>' . get_search_query() . '</span>'); ?></h1>
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
            <div class="edn-empty-search">
                <p>Không tìm thấy kết quả phù hợp cho từ khóa của bạn.</p>
                <a href="<?php echo esc_url(home_url('/#/courses')); ?>" class="btn btn-p">Khám phá khóa học ↗</a>
            </div>
            <?php
        endif;
        ?>
    </div>
</main>

<?php
get_footer();

