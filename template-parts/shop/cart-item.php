<?php
/**
 * Cart Item Row Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$course = $args['course'] ?? null;
if (!$course) {
    return;
}

$id = $course['id'] ?? '';
$title = $course['title'] ?? '';
$price = isset($course['price']) ? number_format((float) $course['price'], 0, ',', '.') . 'đ' : '0đ';
$image = edunext_course_image_url($course);
?>
<div class="edn-cart-item" data-course-id="<?php echo esc_attr($id); ?>">
    <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>" class="edn-cart-item-thumb">
    <div class="edn-cart-item-details">
        <h4><a href="#/courses/<?php echo esc_attr($id); ?>"><?php echo esc_html($title); ?></a></h4>
        <span class="edn-cart-item-level">Thực chiến · Cấp chứng chỉ</span>
    </div>
    <div class="edn-cart-item-price"><?php echo esc_html($price); ?></div>
    <button type="button" class="edn-cart-item-remove" data-id="<?php echo esc_attr($id); ?>" aria-label="Xóa khỏi giỏ hàng">✕</button>
</div>

