<?php
/**
 * FAQ Accordion List Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$faqs = $args['faqs'] ?? [
    [
        'q' => 'EduNext hiện có những lĩnh vực nào?',
        'a' => 'EduNext chuẩn hóa 50 lĩnh vực từ Công nghệ thông tin, Thiết kế, Marketing, Kinh doanh đến Ngoại ngữ và Kỹ năng mềm.',
    ],
    [
        'q' => 'Tất cả khóa học đã mở bán chưa?',
        'a' => 'Các khóa học có trạng thái "Đang mở bán" kèm mức giá niêm yết đều có thể đăng ký học ngay lập tức.',
    ],
    [
        'q' => 'Tiến độ học có gắn với tài khoản không?',
        'a' => 'Có, toàn bộ tiến độ bài học, ghi chú thực hành và chứng chỉ số đều được lưu trữ vĩnh viễn trên tài khoản của bạn.',
    ],
    [
        'q' => 'Khi nào tôi nhận được chứng chỉ tốt nghiệp?',
        'a' => 'Ngay khi bạn hoàn thành 100% các bài học và bài kiểm tra thực hành, hệ thống sẽ tự động cấp chứng chỉ số định danh có mã xác thực.',
    ],
];
?>
<div class="edn-faq-list" role="region" aria-label="Danh sách câu hỏi thường gặp">
    <?php foreach ($faqs as $item) : ?>
        <details class="edn-faq-item">
            <summary><?php echo esc_html($item['q']); ?></summary>
            <p><?php echo esc_html($item['a']); ?></p>
        </details>
    <?php endforeach; ?>
</div>

