<?php
/**
 * Student Account, Authentication and Profile Management
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_ajax_require_nonce(): void {
    check_ajax_referer('edunext_user_action', 'nonce');
}

function edunext_ajax_error(string $message, int $status = 400): void {
    wp_send_json_error(['message' => $message], $status);
}

function edunext_frontend_user_payload(): ?array {
    if (!is_user_logged_in()) {
        return null;
    }

    $user = wp_get_current_user();
    $profile = [
        'headline' => (string) get_user_meta($user->ID, 'edunext_headline', true),
        'bio' => (string) get_user_meta($user->ID, 'description', true),
        'language' => (string) (get_user_meta($user->ID, 'edunext_language', true) ?: 'vi'),
        'website' => (string) get_user_meta($user->ID, 'edunext_website', true),
        'linkedin' => (string) get_user_meta($user->ID, 'edunext_linkedin', true),
        'facebook' => (string) get_user_meta($user->ID, 'edunext_facebook', true),
        'avatar' => (string) get_user_meta($user->ID, 'edunext_avatar_url', true),
    ];

    return [
        'id' => (int) $user->ID,
        'name' => (string) $user->display_name,
        'email' => (string) $user->user_email,
        'profile' => $profile,
    ];
}

function edunext_ajax_register(): void {
    edunext_ajax_require_nonce();

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $password = (string) wp_unslash($_POST['password'] ?? '');
    $accepted = sanitize_text_field(wp_unslash($_POST['accepted'] ?? ''));

    if ($name === '' || !is_email($email)) {
        edunext_ajax_error('Vui lòng nhập họ tên và địa chỉ email hợp lệ.');
    }
    if (strlen($password) < 8) {
        edunext_ajax_error('Mật khẩu cần tối thiểu 8 ký tự.');
    }
    if ($accepted !== '1') {
        edunext_ajax_error('Bạn cần đồng ý với điều khoản sử dụng.');
    }
    if (email_exists($email)) {
        edunext_ajax_error('Email này đã được đăng ký. Hãy đăng nhập.');
    }

    $local_part = (string) current(explode('@', $email));
    $login = sanitize_user($local_part, true);
    if ($login === '') {
        $login = 'edunext-user';
    }
    $base_login = $login;
    $counter = 1;
    while (username_exists($login)) {
        $login = $base_login . '-' . $counter;
        $counter++;
    }

    $user_id = wp_create_user($login, $password, $email);
    if (is_wp_error($user_id)) {
        edunext_ajax_error('Không thể tạo tài khoản lúc này. Vui lòng kiểm tra thông tin và thử lại.');
    }

    wp_update_user([
        'ID' => (int) $user_id,
        'display_name' => $name,
        'first_name' => $name,
    ]);
    wp_set_current_user((int) $user_id);
    wp_set_auth_cookie((int) $user_id, true, is_ssl());

    wp_send_json_success(['message' => 'Tài khoản đã được tạo.', 'redirect' => '#/dashboard']);
}
add_action('wp_ajax_nopriv_edunext_register', 'edunext_ajax_register');

function edunext_ajax_login(): void {
    edunext_ajax_require_nonce();

    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $password = (string) wp_unslash($_POST['password'] ?? '');
    if (!is_email($email) || $password === '') {
        edunext_ajax_error('Vui lòng nhập email và mật khẩu.');
    }

    $user = get_user_by('email', $email);
    if (!$user) {
        edunext_ajax_error('Email hoặc mật khẩu chưa chính xác.');
    }

    $signed_in = wp_signon([
        'user_login' => $user->user_login,
        'user_password' => $password,
        'remember' => true,
    ], is_ssl());

    if (is_wp_error($signed_in)) {
        edunext_ajax_error('Email hoặc mật khẩu chưa chính xác.', 401);
    }

    wp_send_json_success(['message' => 'Đăng nhập thành công.', 'redirect' => '#/dashboard']);
}
add_action('wp_ajax_nopriv_edunext_login', 'edunext_ajax_login');

function edunext_ajax_logout(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        wp_send_json_success(['redirect' => '#/']);
    }
    wp_logout();
    wp_send_json_success(['redirect' => '#/']);
}
add_action('wp_ajax_edunext_logout', 'edunext_ajax_logout');

function edunext_ajax_profile_save(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để cập nhật hồ sơ.', 401);
    }

    $user_id = get_current_user_id();
    $first = sanitize_text_field(wp_unslash($_POST['firstName'] ?? ''));
    $last = sanitize_text_field(wp_unslash($_POST['lastName'] ?? ''));
    $headline = sanitize_text_field(wp_unslash($_POST['headline'] ?? ''));
    $bio = sanitize_textarea_field(wp_unslash($_POST['bio'] ?? ''));
    $language = sanitize_key(wp_unslash($_POST['language'] ?? 'vi'));
    $links = [];
    foreach (['website', 'linkedin', 'facebook'] as $key) {
        $raw = trim((string) wp_unslash($_POST[$key] ?? ''));
        $url = $raw === '' ? '' : esc_url_raw($raw, ['http', 'https']);
        if ($raw !== '' && $url === '') {
            edunext_ajax_error('Các liên kết phải là URL bắt đầu bằng http:// hoặc https://.');
        }
        $links[$key] = $url;
    }

    if ($first === '' || $last === '') {
        edunext_ajax_error('Vui lòng nhập cả họ và tên.');
    }
    $updated = wp_update_user([
        'ID' => $user_id,
        'first_name' => $first,
        'last_name' => $last,
        'display_name' => trim($last . ' ' . $first),
    ]);
    if (is_wp_error($updated)) {
        edunext_ajax_error('Không thể cập nhật hồ sơ lúc này.');
    }

    update_user_meta($user_id, 'edunext_headline', $headline);
    update_user_meta($user_id, 'description', $bio);
    update_user_meta($user_id, 'edunext_language', in_array($language, ['vi', 'en'], true) ? $language : 'vi');
    update_user_meta($user_id, 'edunext_website', $links['website']);
    update_user_meta($user_id, 'edunext_linkedin', $links['linkedin']);
    update_user_meta($user_id, 'edunext_facebook', $links['facebook']);

    wp_send_json_success(['message' => 'Đã lưu hồ sơ.']);
}
add_action('wp_ajax_edunext_profile_save', 'edunext_ajax_profile_save');

function edunext_ajax_profile_password(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để đổi mật khẩu.', 401);
    }

    $user = wp_get_current_user();
    $current = (string) wp_unslash($_POST['currentPassword'] ?? '');
    $new = (string) wp_unslash($_POST['newPassword'] ?? '');
    $confirm = (string) wp_unslash($_POST['confirmPassword'] ?? '');

    if ($current === '' || !wp_check_password($current, $user->user_pass, $user->ID)) {
        edunext_ajax_error('Mật khẩu hiện tại chưa chính xác.');
    }
    if (strlen($new) < 8) {
        edunext_ajax_error('Mật khẩu mới cần tối thiểu 8 ký tự.');
    }
    if (!hash_equals($new, $confirm)) {
        edunext_ajax_error('Hai mật khẩu mới chưa trùng khớp.');
    }

    $updated = wp_update_user(['ID' => $user->ID, 'user_pass' => $new]);
    if (is_wp_error($updated)) {
        edunext_ajax_error('Không thể đổi mật khẩu lúc này.');
    }
    wp_set_auth_cookie($user->ID, true, is_ssl());
    wp_send_json_success(['message' => 'Đã cập nhật mật khẩu.']);
}
add_action('wp_ajax_edunext_profile_password', 'edunext_ajax_profile_password');

function edunext_ajax_profile_avatar(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để cập nhật ảnh hồ sơ.', 401);
    }
    if (empty($_FILES['avatar']) || !is_array($_FILES['avatar'])) {
        edunext_ajax_error('Vui lòng chọn một ảnh.');
    }
    $file = $_FILES['avatar'];
    if (!empty($file['size']) && (int) $file['size'] > 2 * MB_IN_BYTES) {
        edunext_ajax_error('Ảnh cần có dung lượng không quá 2 MB.');
    }
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    $detected = wp_check_filetype_and_ext($file['tmp_name'] ?? '', $file['name'] ?? '');
    if (empty($detected['type']) || !in_array($detected['type'], $allowed, true)) {
        edunext_ajax_error('Chỉ chấp nhận ảnh JPG, PNG hoặc WebP.');
    }

    require_once ABSPATH . 'wp-admin/includes/file.php';
    $uploaded = wp_handle_upload($file, ['test_form' => false, 'mimes' => [
        'jpg|jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'webp' => 'image/webp',
    ]]);
    if (isset($uploaded['error']) || empty($uploaded['url'])) {
        edunext_ajax_error('Không thể lưu ảnh đã chọn.');
    }

    update_user_meta(get_current_user_id(), 'edunext_avatar_url', esc_url_raw($uploaded['url']));
    wp_send_json_success(['message' => 'Đã cập nhật ảnh hồ sơ.']);
}
add_action('wp_ajax_edunext_profile_avatar', 'edunext_ajax_profile_avatar');

function edunext_ajax_profile_avatar_remove(): void {
    edunext_ajax_require_nonce();
    if (!is_user_logged_in()) {
        edunext_ajax_error('Vui lòng đăng nhập để xóa ảnh đại diện.', 401);
    }

    delete_user_meta(get_current_user_id(), 'edunext_avatar_url');
    wp_send_json_success(['message' => 'Đã xóa ảnh đại diện.']);
}
add_action('wp_ajax_edunext_profile_avatar_remove', 'edunext_ajax_profile_avatar_remove');

