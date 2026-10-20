<?php
/**
 * Template Part: Home Featured Courses Section
 *
 * Powered by EduNext Native Database (WordPress CPT edunext_course)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$raw_courses = edunext_get_ready_courses();

$mapped_courses = [];
foreach ($raw_courses as $rc) {
    $c_id = (string) ($rc['id'] ?? '');
    $d_id = (string) ($rc['domainId'] ?? '');
    $domain_name = $rc['domain'] ?? 'Chuyên ngành';

    $lessons = isset($rc['lessons']) && is_array($rc['lessons']) ? $rc['lessons'] : [];
    $lesson_count = count($lessons);
    $price = (float) ($rc['price'] ?? 0);
    $orig_price = isset($rc['originalPrice']) && (float)$rc['originalPrice'] > $price ? (float)$rc['originalPrice'] : null;

    $mapped_courses[] = [
        'id'           => $c_id,
        'title'        => (string) ($rc['title'] ?? ''),
        'domain_name'  => $domain_name,
        'lesson_count' => $lesson_count,
        'ready'        => true,
        'price'        => $price,
        'orig_price'   => $orig_price,
        'image'        => edunext_get_course_image($c_id, $d_id),
    ];
}

$display_courses = array_slice($mapped_courses, 0, 8);
?>

<section class="edn-im-courses edn-home-featured">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Khóa học thực chiến</span>
                <h2>Khóa học tiêu biểu sẵn sàng học ngay</h2>
                <p>Chương trình được thiết kế bài bản theo từng dự án thực tế, kiểm thử bài học đầy đủ.</p>
            </div>
            <a class="edn-im-text-link" href="#/courses">
                Xem tất cả khóa học <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>

        <div class="edn-featured-grid">
            <?php foreach ($display_courses as $c): ?>
                <div class="edn-course-card" data-course-id="<?php echo esc_attr($c['id']); ?>">
                    <a class="edn-course-card-media" href="#/course/<?php echo esc_attr($c['id']); ?>" aria-label="Xem khóa học: <?php echo esc_attr($c['title']); ?>">
                        <img src="<?php echo esc_url($c['image']); ?>" alt="<?php echo esc_attr($c['title']); ?>" loading="lazy">
                        <span class="edn-badge edn-badge-cyan edn-course-badge"><?php echo esc_html($c['domain_name']); ?></span>
                    </a>
                    <div class="edn-course-card-body">
                        <div class="edn-course-card-meta">
                            <span>📖 <?php echo esc_html($c['lesson_count']); ?> bài học</span>
                            <span class="edn-status-tag ready">Đã sẵn sàng</span>
                        </div>
                        <h3>
                            <a href="#/course/<?php echo esc_attr($c['id']); ?>"><?php echo esc_html($c['title']); ?></a>
                        </h3>
                        <div class="edn-course-card-foot">
                            <div class="edn-course-price">
                                <strong><?php echo number_format($c['price'], 0, ',', '.'); ?> đ</strong>
                                <?php if ($c['orig_price']): ?>
                                    <del><?php echo number_format($c['orig_price'], 0, ',', '.'); ?> đ</del>
                                <?php endif; ?>
                            </div>
                            <a class="btn btn-sm btn-p" href="#/course/<?php echo esc_attr($c['id']); ?>">Chi tiết</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
