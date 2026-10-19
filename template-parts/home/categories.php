<?php
/**
 * Template Part: Home Categories Grid
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$categories_showcase = [
    ['slug' => 'cong-nghe-thong-tin', 'name' => 'Công nghệ thông tin', 'count' => '14 chuyên ngành', 'icon' => '💻'],
    ['slug' => 'thiet-ke-sang-tao', 'name' => 'Thiết kế & UI/UX', 'count' => '7 chuyên ngành', 'icon' => '🎨'],
    ['slug' => 'marketing-truyen-thong-noi-dung', 'name' => 'Marketing & Content', 'count' => '3 chuyên ngành', 'icon' => '🚀'],
    ['slug' => 'kinh-doanh-quan-tri', 'name' => 'Kinh doanh & Quản trị', 'count' => '6 chuyên ngành', 'icon' => '💼'],
    ['slug' => 'tai-chinh-nhan-su-van-hanh', 'name' => 'Tài chính & Dữ liệu', 'count' => '5 chuyên ngành', 'icon' => '📊'],
    ['slug' => 'ngoai-ngu-giao-duc', 'name' => 'Ngoại ngữ & Đào tạo', 'count' => '3 chuyên ngành', 'icon' => '🌐'],
    ['slug' => 'ky-nang-van-phong', 'name' => 'Kỹ năng & Năng suất', 'count' => '3 chuyên ngành', 'icon' => '⚡'],
    ['slug' => 'khoa-hoc-ky-thuat', 'name' => 'AI & Kỹ thuật số', 'count' => '4 chuyên ngành', 'icon' => '🧠'],
];
?>

<section class="edn-im-domains edn-home-categories">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> 50 Chuyên ngành thực chiến</span>
                <h2>Khám phá theo lĩnh vực hàng đầu</h2>
            </div>
            <a class="edn-im-text-link" href="#/categories">
                Xem tất cả 50 lĩnh vực <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>

        <div class="edn-categories-grid">
            <?php foreach ($categories_showcase as $cat): ?>
                <a href="#/group/<?php echo esc_attr($cat['slug']); ?>" class="edn-cat-card">
                    <div class="edn-cat-icon" aria-hidden="true"><?php echo esc_html($cat['icon']); ?></div>
                    <div class="edn-cat-info">
                        <h3><?php echo esc_html($cat['name']); ?></h3>
                        <span><?php echo esc_html($cat['count']); ?></span>
                    </div>
                    <svg class="edn-cat-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

