<?php
/**
 * Blog Topic Filter Pills Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$topics = [
    'Tất cả',
    'Lập trình',
    'ASP.NET Core',
    'AutoCAD 2D',
    'Cơ sở dữ liệu',
    'AI & Machine Learning',
    'UI/UX',
    'SEO',
    'Digital Marketing',
    'Tiếng Anh IT',
    'Mạng máy tính',
    'Kỹ năng dự án',
];
$active = $args['active_topic'] ?? 'Tất cả';
?>
<div class="edn-mag-topic-row" role="toolbar" aria-label="Bộ lọc chuyên đề bài viết">
    <?php foreach ($topics as $topic) : ?>
        <button type="button" class="edn-mag-topic-pill <?php echo $topic === $active ? 'is-active' : ''; ?>">
            <?php echo esc_html($topic); ?>
        </button>
    <?php endforeach; ?>
</div>

