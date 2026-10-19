<?php
/**
 * Template Part: Home Testimonials Section
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$testimonials = [
    [
        'quote' => 'Khóa C# và ASP.NET Core giúp tôi hệ thống lại kiến thức bài bản, làm được dự án API hoàn chỉnh và vượt qua phỏng vấn Backend Developer chỉ sau 3 tháng.',
        'author' => 'Lê Tuấn Kiệt',
        'title' => 'Học Viên 6 tháng',
        'avatar' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    ],
    [
        'quote' => 'Lộ trình UI/UX trên EduNext rất thực tế, tập trung vào design system, quy chuẩn auto-layout và tư duy sản phẩm số thay vì chỉ dạy công cụ Figma cơ bản.',
        'author' => 'Nguyễn Thảo My',
        'title' => 'Học Viên 5 tháng',
        'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    ],
    [
        'quote' => 'Khóa học SQL và Phân tích dữ liệu đi thẳng vào bài toán kinh doanh thật. Giờ đây mình có thể tự tin viết query phức tạp và xây dựng dashboard báo cáo cho sếp.',
        'author' => 'Đỗ Minh Hoàng',
        'title' => 'Học Viên 7 tháng',
        'avatar' => 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
    ],
];
?>

<section class="edn-im-testimonials">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Đánh Giá Demo</span>
                <h2>Cảm Nhận Từ Học Viên</h2>
                <p>Hơn 3.000 học viên đã nâng cao kỹ năng và bứt phá sự nghiệp cùng EduNext.</p>
            </div>
        </div>

        <div class="edn-testimonials-grid">
            <?php foreach ($testimonials as $t): ?>
                <article class="edn-testimonial-card">
                    <div class="edn-testimonial-stars">★★★★★</div>
                    <blockquote class="edn-testimonial-quote">“<?php echo esc_html($t['quote']); ?>”</blockquote>
                    <div class="edn-testimonial-author">
                        <img src="<?php echo esc_url($t['avatar']); ?>" alt="<?php echo esc_attr($t['author']); ?>" loading="lazy">
                        <div>
                            <strong><?php echo esc_html($t['author']); ?></strong>
                            <small><?php echo esc_html($t['title']); ?></small>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
