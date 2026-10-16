<?php
/**
 * The template for displaying all single pages
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main wrap edn-page-container">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('edn-page-content'); ?>>
            <header class="edn-page-header">
                <h1 class="edn-page-title"><?php the_title(); ?></h1>
            </header>

            <div class="edn-page-body">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php
get_footer();

