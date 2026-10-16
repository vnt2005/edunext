<?php
/**
 * Course Card Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$course = $args['course'] ?? null;
if (!$course || !is_array($course)) {
    return;
}

$course_id = $course['id'] ?? '';
$title = $course['title'] ?? '';
$major = $course['majorName'] ?? 'Lập trình và phát triển phần mềm';
$price = isset($course['price']) ? number_format((float) $course['price'], 0, ',', '.') . 'đ' : '0đ';
$lessons_count = count($course['lessons'] ?? []);
$image = edunext_course_image_url($course);
$level = $course['level'] ?? 'Thực chiến';
?>
<article class="edn-featured-card group" data-course-id="<?php echo esc_attr($course_id); ?>">
    <div class="edn-card-thumb-wrap">
        <a href="#/courses/<?php echo esc_attr($course_id); ?>" aria-label="Xem khóa: <?php echo esc_attr($title); ?>">
            <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy">
        </a>
    </div>
    <div class="edn-card-body">
        <div class="edn-card-domain"><?php echo esc_html($major); ?></div>
        <h3 class="edn-card-title">
            <a href="#/courses/<?php echo esc_attr($course_id); ?>"><?php echo esc_html($title); ?></a>
        </h3>
        <div class="edn-card-meta">
            <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <?php echo esc_html($lessons_count); ?> bài học
            </span>
            <span class="edn-rating-tag">★ 4.9</span>
        </div>
        <div class="edn-card-footer">
            <div class="edn-card-price"><?php echo esc_html($price); ?></div>
            <a class="edn-card-btn" href="#/courses/<?php echo esc_attr($course_id); ?>">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>
                <span>Chọn học</span>
            </a>
        </div>
    </div>
</article>

