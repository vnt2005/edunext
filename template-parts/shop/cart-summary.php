<?php
/**
 * Cart Summary Sidebar Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$total_price = $args['total_price'] ?? 0;
$formatted_total = number_format((float) $total_price, 0, ',', '.') . 'đ';
?>
<aside class="edn-cart-summary">
    <h3>Tóm tắt đơn hàng</h3>
    <div class="edn-cart-summary-row">
        <span>Tạm tính</span>
        <strong><?php echo esc_html($formatted_total); ?></strong>
    </div>
    <div class="edn-cart-summary-row">
        <span>Ưu đãi học viên mới</span>
        <span class="edn-cart-discount">Miễn phí kích hoạt</span>
    </div>
    <div class="edn-cart-summary-total">
        <span>Tổng thanh toán</span>
        <strong><?php echo esc_html($formatted_total); ?></strong>
    </div>
    <a href="#/checkout" class="btn btn-p btn-block edn-cart-checkout-btn">Tiến hành thanh toán ↗</a>
    <p class="edn-cart-guarantee">🔒 Hoàn tiền 100% trong 7 ngày nếu không hài lòng</p>
</aside>

