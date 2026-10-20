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

        <div class="edn-journal-grid">
            <?php foreach ($articles as $art): ?>
                <article class="edn-journal-card">
                    <a class="edn-journal-card-media" href="#/blog/<?php echo esc_attr($art['slug']); ?>" aria-label="Đọc bài: <?php echo esc_attr($art['title']); ?>">
                        <img src="<?php echo esc_url($art['image']); ?>" alt="<?php echo esc_attr($art['title']); ?>" loading="lazy">
                    </a>
                    <div class="edn-journal-card-body">
                        <div class="edn-journal-card-meta">
                            <span class="edn-badge edn-badge-cyan"><?php echo esc_html($art['tag']); ?></span>
                            <span class="edn-journal-card-readtime">⏱ <?php echo esc_html($art['readTime']); ?></span>
                        </div>
                        <h3>
                            <a href="#/blog/<?php echo esc_attr($art['slug']); ?>"><?php echo esc_html($art['title']); ?></a>
                        </h3>
                        <p><?php echo esc_html($art['excerpt']); ?></p>
                        <div class="edn-journal-card-foot">
                            <a class="edn-im-text-link" href="#/blog/<?php echo esc_attr($art['slug']); ?>">
                                Đọc bài viết <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
                            </a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
