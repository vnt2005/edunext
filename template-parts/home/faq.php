<?php
/**
 * Template Part: Home FAQ Accordion Section
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$faqs = [
    [
        'q' => 'EduNext có những lĩnh vực nào?',
        'a' => 'Danh mục gồm 50 chuyên ngành từ lập trình, trí tuệ nhân tạo, thiết kế sản phẩm số, marketing đến kinh doanh, tài chính và quản trị.',
    ],
    [
        'q' => 'Tôi có thể xem đề cương trước khi đăng ký không?',
        'a' => 'Hoàn toàn được. Mọi khóa học đều hiển thị rõ mục tiêu đầu ra, danh sách bài học chi tiết và video giới thiệu trước khi bạn đăng ký.',
    ],
    [
        'q' => 'Tiến độ học tập và chứng chỉ được ghi nhận ra sao?',
        'a' => 'Hệ thống tự động lưu trữ tiến độ trên tài khoản của bạn. Khi hoàn thành toàn bộ bài học, chứng chỉ số định danh có mã tra cứu sẽ được cấp tự động.',
    ],
    [
        'q' => 'Tôi có thể học lại các bài giảng đã mua không?',
        'a' => 'Có, toàn bộ các khóa học đã đăng ký trên EduNext đều cho phép bạn học trọn đời, truy cập mọi lúc trên máy tính, máy tính bảng và điện thoại.',
    ],
    [
        'q' => 'Hình thức thanh toán và kích hoạt khóa học như thế nào?',
        'a' => 'Hệ thống hỗ trợ thanh toán linh hoạt qua chuyển khoản ngân hàng QR Code 24/7 và thẻ quốc tế. Khóa học được kích hoạt tự động ngay sau khi hoàn tất giao dịch.',
    ],
];
?>

<section class="edn-im-faq">
    <div class="edn-im-shell edn-im-faq-layout">
        <div class="edn-im-faq-intro">
            <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Hỏi đáp & Trợ giúp</span>
            <h2>Góc Giải Đáp</h2>
            <p>Những điều bạn cần biết trước khi bắt đầu học tập cùng EduNext.</p>
            <a class="edn-im-text-link" href="#/faq">
                Tới trang hỏi đáp đầy đủ <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
            </a>
        </div>

        <div class="edn-im-faq-list">
            <?php foreach ($faqs as $faq): ?>
                <details class="edn-im-faq-item">
                    <summary>
                        <?php echo esc_html($faq['q']); ?>
                        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                    </summary>
                    <p><?php echo esc_html($faq['a']); ?></p>
                </details>
            <?php endforeach; ?>
        </div>
    </div>
</section>

