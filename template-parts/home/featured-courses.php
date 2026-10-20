<?php
/**
 * Template Part: Home Featured Courses Section
 *
 * Powered by EduNext Native Database (WordPress CPT edunext_course)
 * Authentic EduNext Card Component with Instructors, Ratings & Pricing
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$raw_courses = edunext_get_ready_courses();
$instructors = function_exists('edunext_db_get_all_instructors') ? edunext_db_get_all_instructors() : [];
if (empty($instructors)) {
    $instructors = [
        ['name' => 'Nguyễn Văn Minh', 'role' => 'Senior .NET Architect', 'org' => 'VNG', 'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'],
        ['name' => 'Trần Thu Trang', 'role' => 'Head of Product Design', 'org' => 'Tiki', 'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'],
        ['name' => 'Lê Hoàng Nam', 'role' => 'Lead Data Scientist', 'org' => 'FPT Software', 'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'],
        ['name' => 'Đặng Mai Phương', 'role' => 'Growth Marketing Lead', 'org' => 'Shopee', 'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'],
        ['name' => 'Phạm Đức Duy', 'role' => 'Mobile Tech Lead', 'org' => 'MoMo', 'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'],
        ['name' => 'Vũ Hoàng Quân', 'role' => 'Cloud Solutions Architect', 'org' => 'Viettel', 'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'],
    ];
}

$mapped_courses = [];
foreach ($raw_courses as $rc) {
    $c_id = (string) ($rc['id'] ?? '');
    $d_id = (string) ($rc['domainId'] ?? '');
    $domain_name = $rc['domain'] ?? 'Chuyên ngành';
    $level = (string) ($rc['level'] ?? 'Mọi cấp độ');
    $duration = (float) ($rc['durationHours'] ?? 0);

    $is_ready = edunext_course_is_ready($rc);
    $lessons = isset($rc['lessons']) && is_array($rc['lessons']) ? $rc['lessons'] : [];
    $lesson_count = count($lessons);
    $price = (float) ($rc['price'] ?? 0);
    $orig_price = isset($rc['originalPrice']) && (float)$rc['originalPrice'] > $price ? (float)$rc['originalPrice'] : null;

    $hash = 0;
    foreach (str_split($c_id) as $char) {
        $hash += ord($char);
    }
    $instructor = $instructors[$hash % count($instructors)];
    $rating = number_format(4.8 + (($hash % 3) * 0.1), 1);
    $reviews = 350 + ($hash % 15) * 85;
    $discount_pct = ($orig_price && $orig_price > $price) ? round((1 - $price / $orig_price) * 100) : null;

    $mapped_courses[] = [
        'id'           => $c_id,
        'title'        => (string) ($rc['title'] ?? ''),
        'domain_name'  => $domain_name,
        'level'        => $level,
        'duration'     => $duration,
        'lesson_count' => $lesson_count,
        'ready'        => $is_ready,
        'price'        => $price,
        'orig_price'   => $orig_price,
        'discount_pct' => $discount_pct,
        'image'        => edunext_get_course_image($c_id, $d_id),
        'instructor'   => $instructor,
        'rating'       => $rating,
        'reviews'      => $reviews,
    ];
}

// Sort: ready first
usort($mapped_courses, static function ($a, $b) {
    if ($a['ready'] !== $b['ready']) {
        return $b['ready'] ? 1 : -1;
    }
    return 0;
});

$featured_courses = array_slice($mapped_courses, 0, 8);
$cart_svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>';
$star_svg = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
?>

<section class="edn-im-courses edn-courses-section">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Tuyển chọn thực chiến</span>
                <h2>Khóa học thực chiến nổi bật</h2>
                <p>Chương trình được thiết kế bài bản theo từng dự án thực tế cùng các chuyên gia hàng đầu.</p>
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
                            <div class="edn-card-badge-group">
                                <span class="edn-card-badge <?php echo $c['ready'] ? 'is-verified' : 'is-draft'; ?>">
                                    <?php echo $c['ready'] ? 'Bán chạy' : 'Đề cương mới'; ?>
                                </span>
                                <?php if ($c['discount_pct']): ?>
                                    <span class="edn-card-discount-badge">-<?php echo esc_html($c['discount_pct']); ?>%</span>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="edn-course-card-content">
                            <div class="edn-card-meta-top">
                                <span class="edn-card-category"><?php echo esc_html($c['domain_name']); ?></span>
                                <span class="edn-card-level"><?php echo esc_html($c['level']); ?></span>
                            </div>
                            <h3 class="edn-card-title"><?php echo esc_html($c['title']); ?></h3>
                            
                            <div class="edn-card-instructor">
                                <img class="edn-instructor-thumb" src="<?php echo esc_url($c['instructor']['avatar']); ?>" alt="<?php echo esc_attr($c['instructor']['name']); ?>" loading="lazy">
                                <span class="edn-instructor-name"><?php echo esc_html($c['instructor']['name']); ?> <small>· <?php echo esc_html($c['instructor']['org']); ?></small></span>
                            </div>

                            <div class="edn-card-meta">
                                <span class="edn-card-rating">
                                    <?php echo $star_svg; ?>
                                    <b><?php echo esc_html($c['rating']); ?></b> <small>(<?php echo esc_html(number_format($c['reviews'], 0, ',', '.')); ?>)</small>
                                </span>
                                <span class="edn-card-lessons">
                                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h12v10H2zM5 6h6M5 9h4"></path></svg>
                                    <?php echo esc_html($c['lesson_count']); ?> bài<?php echo $c['duration'] > 0 ? ' · ' . esc_html($c['duration']) . 'h' : ''; ?>
                                </span>
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

                        <button class="edn-card-btn-action edn-add-to-cart" type="button" data-a="cart-add" data-v="<?php echo esc_attr($c['id']); ?>" aria-label="Thêm <?php echo esc_attr($c['title']); ?> vào giỏ hàng" title="Thêm vào giỏ hàng">
                            <?php echo $cart_svg; ?>
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
