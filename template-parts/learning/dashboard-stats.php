<?php
/**
 * Student Learning Stats Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$total_courses = $args['total'] ?? 0;
$in_progress = $args['in_progress'] ?? 0;
$completed = $args['completed'] ?? 0;
?>
<div class="edn-learning-stats-bar">
    <div class="edn-stat-pill is-active">
        <span>Tất cả khóa học</span>
        <strong><?php echo esc_html($total_courses); ?></strong>
    </div>
    <div class="edn-stat-pill">
        <span>Đang học</span>
        <strong><?php echo esc_html($in_progress); ?></strong>
    </div>
    <div class="edn-stat-pill">
        <span>Đã hoàn thành</span>
        <strong><?php echo esc_html($completed); ?></strong>
    </div>
</div>

