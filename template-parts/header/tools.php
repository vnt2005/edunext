<?php
/**
 * Header Student Tools Component (Cart & Auth)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="edn-header-tools" role="group" aria-label="Tiện ích học viên">
    <a id="edn-cart-trigger" class="edn-cart-trigger" href="#/cart" aria-label="Giỏ hàng, 0 khóa học" title="Giỏ hàng">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>
        <span id="edn-cart-count" class="edn-cart-count" hidden>0</span>
    </a>
    <div id="auth" class="lms-auth edunext-account-actions"></div>
</div>

<button class="mb lms-mobile-menu" data-a="menu" type="button" aria-label="Mở menu" aria-controls="nav" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
</button>

