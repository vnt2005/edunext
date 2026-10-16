<?php
/**
 * Student Profile Sidebar Navigation Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$active_tab = $args['active_tab'] ?? 'profile';
?>
<nav class="edn-profile-nav" aria-label="Menu tài khoản">
    <a href="#/profile" class="<?php echo $active_tab === 'profile' ? 'is-active' : ''; ?>">
        Thông tin cá nhân
    </a>
    <a href="#/profile/photo" class="<?php echo $active_tab === 'photo' ? 'is-active' : ''; ?>">
        Ảnh đại diện
    </a>
    <a href="#/profile/security" class="<?php echo $active_tab === 'security' ? 'is-active' : ''; ?>">
        Mật khẩu & Bảo mật
    </a>
</nav>

