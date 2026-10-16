<?php
/**
 * Common Empty State Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$title = $args['title'] ?? 'Chưa có nội dung';
$message = $args['message'] ?? 'Hiện chưa có mục nào phù hợp với yêu cầu này.';
$action_url = $args['action_url'] ?? '#/courses';
$action_label = $args['action_label'] ?? 'Khám phá khóa học ↗';
?>
<div class="edn-empty-state-box">
    <div class="edn-empty-icon">📂</div>
    <h3><?php echo esc_html($title); ?></h3>
    <p><?php echo esc_html($message); ?></p>
    <?php if ($action_url && $action_label) : ?>
        <a href="<?php echo esc_url($action_url); ?>" class="btn btn-p"><?php echo esc_html($action_label); ?></a>
    <?php endif; ?>
</div>

