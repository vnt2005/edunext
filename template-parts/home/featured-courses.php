<?php
/**
 * Template Part: Home Featured Courses Section
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$catalog = edunext_catalog_data();
$raw_courses = $catalog['courses'] ?? [];
$raw_domains = $catalog['domains'] ?? [];

$domain_map = [];
foreach ($raw_domains as $d) {
    if (isset($d['id'])) {
        $domain_map[(string) $d['id']] = $d;
    }
}

$mapped_courses = [];
foreach ($raw_courses as $rc) {
    $c_id = (string) ($rc['id'] ?? '');
    $d_id = (string) ($rc['domainId'] ?? '');
    $domain_obj = $domain_map[$d_id] ?? null;
    $domain_name = $domain_obj['name'] ?? 'Chuyên ngành';

    $is_ready = edunext_course_is_ready($rc);
    $lessons = isset($rc['lessons']) && is_array($rc['lessons']) ? $rc['lessons'] : [];
    $lesson_count = count($lessons);
    $price = isset($rc['price']) && is_numeric($rc['price']) && (float) $rc['price'] >= 0 ? (float) $rc['price'] : 249000;
    $orig_price = isset($rc['originalPrice']) && is_numeric($rc['originalPrice']) ? (float) $rc['originalPrice'] : null;

    $mapped_courses[] = [
        'id' => $c_id,
        'title' => (string) ($rc['title'] ?? ''),
        'domain_name' => $domain_name,
        'lesson_count' => $lesson_count,
        'ready' => $is_ready,
        'price' => $price,
        'orig_price' => $orig_price,
        'image' => edunext_get_course_image($c_id, $d_id),
    ];
}

// Sort: ready/verified first
usort($mapped_courses, static function ($a, $b) {
    if ($a['ready'] !== $b['ready']) {
        return $b['ready'] ? 1 : -1;
    }
    return 0;
});

$featured_courses = array_slice($mapped_courses, 0, 6);
$cart_svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>';
?>

<section class="edn-im-courses">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Tuyển chọn thực chiến</span>
                <h2>Khóa học thực chiến nổi bật</h2>
                <p>Đề cương bài bản, nội dung cô đọng và phương pháp học gắn liền với ứng dụng thực tế.</p>
            </div>
            <a class="edn-im-text-link" href="#/courses">
                Xem tất cả khóa học <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>

        <div class="edn-featured-grid">
            <?php foreach ($featured_courses as $c): ?>
                <article class="edn-course-card edn-catalog-course">
                    <a href="#/course/<?php echo esc_attr($c['id']); ?>" class="edn-course-card-link" aria-label="Xem khóa học <?php echo esc_attr($c['title']); ?>">
                        <div class="edn-course-card-media">
                            <img src="<?php echo esc_url($c['image']); ?>" alt="<?php echo esc_attr($c['title']); ?>" loading="lazy">
                            <span class="edn-card-badge <?php echo $c['ready'] ? 'is-verified' : 'is-draft'; ?>">
                                <?php echo $c['ready'] ? 'Đã mở bán' : 'Đề cương mới'; ?>
                            </span>
                        </div>
                        <div class="edn-course-card-content">
                            <span class="edn-card-category"><?php echo esc_html($c['domain_name']); ?></span>
                            <h3 class="edn-card-title"><?php echo esc_html($c['title']); ?></h3>
                            
                            <div class="edn-card-meta">
                                <span class="edn-card-lessons">
                                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h12v10H2zM5 6h6M5 9h4"></path></svg>
                                    <?php echo esc_html($c['lesson_count']); ?> bài học
                                </span>
                                <span class="edn-card-rating">★ 4.9</span>
                            </div>
                        </div>
                    </a>

                    <div class="edn-course-card-footer">
                        <div class="edn-card-pricing">
                            <strong class="edn-price-current">
                                <?php echo esc_html(number_format($c['price'], 0, ',', '.')); ?>đ
                            </strong>
                            <?php if (!empty($c['orig_price'])): ?>
                                <del class="edn-price-orig">
                                    <?php echo esc_html(number_format($c['orig_price'], 0, ',', '.')); ?>đ
                                </del>
                            <?php endif; ?>
                        </div>

                        <button class="edn-card-add-cart edn-add-to-cart" type="button" data-a="cart-add" data-v="<?php echo esc_attr($c['id']); ?>" aria-label="Thêm <?php echo esc_attr($c['title']); ?> vào giỏ hàng" title="Thêm vào giỏ hàng">
                            <?php echo $cart_svg; ?>
                            <span>Chọn học</span>
                        </button>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="edn-section-footer-action">
            <a class="edn-im-button-secondary" href="#/courses">
                Khám phá toàn bộ danh mục khóa học <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>
    </div>
</section>

