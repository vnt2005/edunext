<?php
/**
 * Student Login Form Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<form class="edn-auth-form" id="edn-login-form" method="post">
    <div class="edn-form-group">
        <label for="edn-login-user">Tên tài khoản hoặc Email</label>
        <input type="text" id="edn-login-user" name="log" required autocomplete="username" placeholder="nguyenvana@gmail.com">
    </div>
    <div class="edn-form-group">
        <label for="edn-login-pass">Mật khẩu</label>
        <input type="password" id="edn-login-pass" name="pwd" required autocomplete="current-password" placeholder="••••••••">
    </div>
    <button type="submit" class="btn btn-p btn-block" id="edn-login-submit">Đăng nhập</button>
    <div class="edn-auth-switch">
        <span>Chưa có tài khoản?</span>
        <a href="#/register">Đăng ký ngay</a>
    </div>
</form>

