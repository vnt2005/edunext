<?php
/**
 * Blog Lead Article Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$article = $args['article'] ?? null;
if (!$article) {
    return;
}

$title = $article['title'] ?? '';
$tag = $article['tag'] ?? 'Lập trình';
$read_time = $article['read_time'] ?? '7 phút đọc';
$excerpt = $article['excerpt'] ?? '';
$image = $article['image'] ?? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200';
$slug = sanitize_title($title);
?>
<article class="edn-mag-lead">
    <a class="edn-mag-lead-media" href="#/blog/<?php echo esc_attr($slug); ?>" aria-label="Đọc bài: <?php echo esc_attr($title); ?>">
        <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>">
        <span class="edn-mag-badge-featured">Tiêu điểm</span>
    </a>
    <div class="edn-mag-lead-content">
        <div class="edn-mag-meta-row">
            <span class="edn-mag-tag-pill"><?php echo esc_html($tag); ?></span>
            <span class="edn-mag-read-time">⏱ <?php echo esc_html($read_time); ?></span>
        </div>
        <h2 class="edn-mag-lead-title">
            <a href="#/blog/<?php echo esc_attr($slug); ?>"><?php echo esc_html($title); ?></a>
        </h2>
        <p class="edn-mag-lead-excerpt"><?php echo esc_html($excerpt); ?></p>
        <div class="edn-mag-author-row">
            <div class="edn-mag-author-info">
                <span class="edn-mag-author-avatar">E</span>
                <span>Ban biên tập EduNext</span>
            </div>
            <a class="btn btn-p btn-s" href="#/blog/<?php echo esc_attr($slug); ?>">Đọc bài viết ↗</a>
        </div>
    </div>
</article>

