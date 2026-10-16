<?php
/**
 * Template Part: Home Blog / Latest Articles Section
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$articles = [
    [
        'title' => 'Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp',
        'slug' => 'hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap',
        'tag' => 'Lập trình',
        'readTime' => '7 phút đọc',
        'excerpt' => 'Phương pháp tiếp cận lập trình thực chiến giúp bạn nắm chắc luồng dữ liệu của chương trình.',
        'image' => 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=800',
    ],
    [
        'title' => 'Xây dựng REST API: bắt đầu từ một endpoint chạy đúng',
        'slug' => 'xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung',
        'tag' => 'ASP.NET Core',
        'readTime' => '8 phút đọc',
        'excerpt' => 'Cách tách nhỏ kiến trúc API thành từng lớp độc lập dễ kiểm thử và mở rộng.',
        'image' => 'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=800',
    ],
    [
        'title' => 'Bản vẽ AutoCAD rõ ràng bắt đầu từ đơn vị và layer',
        'slug' => 'ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer',
        'tag' => 'Thiết kế 2D',
        'readTime' => '7 phút đọc',
        'excerpt' => 'Thiết lập bản vẽ chuẩn xác ngay từ ban đầu để tiết kiệm thời gian chỉnh sửa về sau.',
        'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=800',
    ],
];
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
                <article class="edn-journal-card">
                    <a class="edn-journal-thumb" href="#/blog/<?php echo esc_attr($art['slug']); ?>" aria-label="<?php echo esc_attr($art['title']); ?>">
                        <img src="<?php echo esc_url($art['image']); ?>" alt="" loading="lazy">
                        <span class="edn-journal-tag"><?php echo esc_html($art['tag']); ?></span>
                    </a>
                    <div class="edn-journal-body">
                        <span class="edn-journal-time"><?php echo esc_html($art['readTime']); ?></span>
                        <h3><a href="#/blog/<?php echo esc_attr($art['slug']); ?>"><?php echo esc_html($art['title']); ?></a></h3>
                        <p><?php echo esc_html($art['excerpt']); ?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

