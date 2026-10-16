<?php
/**
 * Student Register Form Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<form class="edn-auth-form" id="edn-register-form" method="post">
    <div class="edn-form-group">
        <label for="edn-reg-name">Họ và tên</label>
        <input type="text" id="edn-reg-name" name="name" required placeholder="Nguyễn Văn A">
    </div>
    <div class="edn-form-group">
        <label for="edn-reg-email">Địa chỉ Email</label>
        <input type="email" id="edn-reg-email" name="email" required autocomplete="email" placeholder="nguyenvana@gmail.com">
    </div>
    <div class="edn-form-group">
        <label for="edn-reg-pass">Mật khẩu</label>
        <input type="password" id="edn-reg-pass" name="pass" required autocomplete="new-password" placeholder="Tối thiểu 6 ký tự">
    </div>
    <button type="submit" class="btn btn-p btn-block" id="edn-register-submit">Tạo tài khoản</button>
    <div class="edn-auth-switch">
        <span>Đã có tài khoản?</span>
        <a href="#/login">Đăng nhập</a>
    </div>
</form>

