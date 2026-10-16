<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main wrap edn-404-container">
    <section class="edn-error-404 not-found">
        <div class="edn-404-inner">
            <span class="edn-404-code">404</span>
            <h1 class="edn-404-title">Không tìm thấy trang yêu cầu</h1>
            <p class="edn-404-desc">Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc chưa từng tồn tại trên hệ thống.</p>
            <div class="edn-404-actions">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-p">Về trang chủ ↗</a>
                <a href="<?php echo esc_url(home_url('/#/courses')); ?>" class="edn-jiro-btn-outline">Khám phá khóa học</a>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();

