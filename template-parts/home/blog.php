<?php
/**
 * Template Part: Home Blog / Latest Articles Section
 *
 * Powered by WordPress Posts (Native Database)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$recent_posts_query = edunext_get_recent_posts(3);
$articles = [];

if ($recent_posts_query->have_posts()) {
    while ($recent_posts_query->have_posts()) {
        $recent_posts_query->the_post();
        $p_id = get_the_ID();
        $cats = get_the_category($p_id);
        $tag = !empty($cats) ? $cats[0]->name : 'Kiến thức';
        $image = get_post_meta($p_id, '_edunext_image', true);
        if (!$image && has_post_thumbnail($p_id)) {
            $image = get_the_post_thumbnail_url($p_id, 'medium_large');
        }
        if (!$image) {
            $image = get_theme_file_uri('assets/images/placeholder.jpg');
        } elseif (!str_starts_with($image, 'http')) {
            $image = get_theme_file_uri($image);
        }

        $articles[] = [
            'title'    => get_the_title(),
            'slug'     => get_post_field('post_name', $p_id),
            'tag'      => $tag,
            'readTime' => get_post_meta($p_id, '_edunext_reading_time', true) ?: '6 phút đọc',
            'excerpt'  => get_the_excerpt() ?: wp_trim_words(get_the_content(), 20),
            'image'    => $image,
        ];
    }
    wp_reset_postdata();
}
?>

<section class="edn-im-journal">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Góc kiến thức</span>
                <h2>Bài viết mới nhất</h2>
                <p>Chia sẻ kinh nghiệm làm dự án, tư duy kỹ thuật và các kiến thức thực tiễn hữu ích.</p>
            </div>
            <a class="edn-im-text-link" href="#/blog">
                Tất cả bài viết <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>

        <div class="edn-journal-cards-grid">
            <?php foreach ($articles as $art): ?>
                <article class="edn-journal-card group">
                    <a class="edn-journal-thumb" href="#/blog/<?php echo esc_attr($art['slug']); ?>" aria-label="<?php echo esc_attr($art['title']); ?>">
                        <img src="<?php echo esc_url($art['image']); ?>" alt="" loading="lazy">
                        <span class="edn-journal-tag"><?php echo esc_html($art['tag']); ?></span>
                    </a>
                    <div class="edn-journal-body">
                        <span class="edn-journal-time">
                            <svg class="edn-clock-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                            <?php echo esc_html($art['readTime']); ?>
                        </span>
                        <h3><a href="#/blog/<?php echo esc_attr($art['slug']); ?>"><?php echo esc_html($art['title']); ?></a></h3>
                        <p><?php echo esc_html($art['excerpt']); ?></p>
                        <div class="edn-journal-readmore">
                            <a href="#/blog/<?php echo esc_attr($art['slug']); ?>">
                                <span class="edn-animated-text"><span class="edn-text-top">Đọc bài viết</span><span class="edn-text-bottom" aria-hidden="true">Đọc bài viết</span></span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
                            </a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
