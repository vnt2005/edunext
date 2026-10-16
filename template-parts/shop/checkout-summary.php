<?php
/**
 * Checkout Summary Panel Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$course = $args['course'] ?? null;
$title = $course['title'] ?? 'Khóa học thực chiến';
$price = isset($course['price']) ? number_format((float) $course['price'], 0, ',', '.') . 'đ' : '0đ';
?>
<div class="edn-checkout-summary-panel">
    <h3>Thông tin đăng ký</h3>
    <div class="edn-checkout-course-brief">
        <h4><?php echo esc_html($title); ?></h4>
        <div class="edn-checkout-price-tag"><?php echo esc_html($price); ?></div>
    </div>
    <ul class="edn-checkout-perks">
        <li>✓ Truy cập toàn bộ video và tài liệu vĩnh viễn</li>
        <li>✓ Hỗ trợ hỏi đáp 1-1 trực tiếp cùng Mentor</li>
        <li>✓ Cấp chứng chỉ số chính thức khi hoàn thành</li>
        <li>✓ Hoàn tiền trong 7 ngày nếu không đúng cam kết</li>
    </ul>
</div>

