<?php
/**
 * Blog Article Card Component
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
$tag = $article['tag'] ?? 'Chuyên môn';
$read_time = $article['read_time'] ?? '5 phút đọc';
$excerpt = $article['excerpt'] ?? '';
$image = $article['image'] ?? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600';
$slug = sanitize_title($title);
?>
<article class="edn-mag-card">
    <a class="edn-mag-card-media" href="#/blog/<?php echo esc_attr($slug); ?>" aria-label="Đọc bài: <?php echo esc_attr($title); ?>">
        <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy">
        <span class="edn-mag-tag-pill"><?php echo esc_html($tag); ?></span>
    </a>
    <div class="edn-mag-card-body">
        <span class="edn-mag-read-time">⏱ <?php echo esc_html($read_time); ?></span>
        <h3 class="edn-mag-card-title">
            <a href="#/blog/<?php echo esc_attr($slug); ?>"><?php echo esc_html($title); ?></a>
        </h3>
        <p class="edn-mag-card-excerpt"><?php echo esc_html($excerpt); ?></p>
        <div class="edn-mag-card-footer">
            <a class="edn-mag-read-link" href="#/blog/<?php echo esc_attr($slug); ?>">Đọc tiếp →</a>
        </div>
    </div>
</article>

