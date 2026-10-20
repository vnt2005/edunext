<?php
/**
 * Front Page Template for EduNext
 *
 * Modular WordPress PHP template loading sections via get_template_part:
 * - template-parts/home/hero
 * - template-parts/home/categories
 * - template-parts/home/featured-courses
 * - template-parts/home/features
 * - template-parts/home/instructors
 * - template-parts/home/testimonials
 * - template-parts/home/blog
 * - template-parts/home/faq
 * - template-parts/home/cta-banner
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="app">
    <div class="edn-home-page edn-im-home">
        <?php
        get_template_part('template-parts/home/hero');
        get_template_part('template-parts/home/categories');
        get_template_part('template-parts/home/featured-courses');
        get_template_part('template-parts/home/features');
        get_template_part('template-parts/home/instructors');
        get_template_part('template-parts/home/testimonials');
        get_template_part('template-parts/home/blog');
        get_template_part('template-parts/home/faq');
        ?>
    </div>

    <noscript>
        <div class="wrap page edn-noscript-note">
            <p>Vui lòng bật JavaScript để trải nghiệm đầy đủ tính năng tìm kiếm, xem khóa học và học tập trên EduNext.</p>
        </div>
    </noscript>
</main>

<?php
get_footer();
