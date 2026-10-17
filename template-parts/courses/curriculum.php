<?php
/**
 * Course Curriculum / Syllabus Accordion Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$lessons = $args['lessons'] ?? [];
if (empty($lessons)) {
    return;
}
?>
<div class="edn-course-curriculum">
    <div class="edn-curriculum-head">
        <h3>Nội dung chương trình đào tạo</h3>
        <span><?php echo esc_html(count($lessons)); ?> bài giảng thực hành</span>
    </div>
    <div class="edn-curriculum-list">
        <?php foreach ($lessons as $index => $lesson) : 
            $course_obj = $args['course'] ?? [];
            $lesson_img = edunext_get_lesson_image($course_obj, $index);
        ?>
            <details class="edn-curriculum-item" <?php echo $index === 0 ? 'open' : ''; ?>>
                <summary class="edn-curriculum-row">
                    <span class="edn-curriculum-index"><?php echo sprintf('%02d', $index + 1); ?></span>
                    <span class="edn-curriculum-title"><?php echo esc_html($lesson['title'] ?? 'Bài ' . ($index + 1)); ?></span>
                    <span class="edn-curriculum-dur"><?php echo esc_html($lesson['duration'] ?? '15 phút'); ?></span>
                </summary>
                <div class="edn-curriculum-panel">
                    <div class="edn-curriculum-panel-content">
                        <?php if (!empty($lesson_img)) : ?>
                            <div class="edn-curriculum-thumb-wrap">
                                <img src="<?php echo esc_url($lesson_img); ?>" alt="<?php echo esc_attr($lesson['title'] ?? 'Minh họa bài học'); ?>" loading="lazy">
                            </div>
                        <?php endif; ?>
                        <p><?php echo esc_html($lesson['description'] ?? 'Tìm hiểu kiến thức và thực hành từng bước.'); ?></p>
                    </div>
                </div>
            </details>
        <?php endforeach; ?>
    </div>
</div>

