<?php
/**
 * The template for displaying the blog posts index
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
        <span class="edn-badge edn-badge-accent">EDUNEXT MAGAZINE</span>
        <h1>Kiến thức thực tế, ứng dụng ngay</h1>
        <p>Ghi chép chuyên sâu về kiến trúc phần mềm, tư duy hệ thống, thiết kế sản phẩm và phương pháp làm việc hiệu quả từ các kỹ sư giàu kinh nghiệm.</p>
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
            <div id="app"></div>
            <?php
        endif;
        ?>
    </div>
</main>

<?php
get_footer();

