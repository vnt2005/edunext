<?php
/**
 * Student Enrolled Course Progress Card
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$course = $args['course'] ?? null;
if (!$course) {
    return;
}

$progress = $args['progress'] ?? 0;
$course_id = $course['id'] ?? '';
$title = $course['title'] ?? '';
$image = edunext_course_image_url($course);
?>
<article class="edn-progress-card group">
    <div class="edn-progress-card-thumb">
        <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>">
    </div>
    <div class="edn-progress-card-body">
        <h4><?php echo esc_html($title); ?></h4>
        <div class="edn-progress-bar-wrap">
            <div class="edn-progress-bar-fill" style="width: <?php echo esc_attr($progress); ?>%"></div>
        </div>
        <div class="edn-progress-meta">
            <span>Đã hoàn thành <?php echo esc_html($progress); ?>%</span>
            <a href="#/learn/<?php echo esc_attr($course_id); ?>/0" class="btn btn-p btn-s">Tiếp tục học ↗</a>
        </div>
    </div>
</article>

