<?php
/**
 * Contact Settings & Customizer
 *
 * Backend settings & WordPress Customizer integration for contact channels:
 * - Zalo URL / Phone
 * - Hotline / Phone Number
 * - Facebook Messenger / Page URL
 *
 * Provides fallback defaults so buttons appear out-of-the-box,
 * and allows site administrators to easily configure them from:
 * 1. WordPress Admin Dashboard -> EduNext -> Kênh liên hệ
 * 2. Appearance -> Customize -> Kênh liên hệ EduNext
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get contact configuration with sensible default fallbacks.
 *
 * @return array{zalo_url: string, phone: string, phone_display: string, facebook_url: string, enable_floating: bool}
 */
function edunext_get_contact_config(): array {
    $default_zalo = 'https://zalo.me/0988888888';
    $default_phone = '0988888888';
    $default_fb = 'https://facebook.com';

    $zalo = (string) get_theme_mod('edunext_zalo_url', get_option('edunext_zalo_url', $default_zalo));
    $phone = (string) get_theme_mod('edunext_phone_number', get_option('edunext_phone_number', $default_phone));
    $fb = (string) get_theme_mod('edunext_facebook_url', get_option('edunext_facebook_url', $default_fb));
    $enable = (bool) get_theme_mod('edunext_enable_floating_contact', get_option('edunext_enable_floating_contact', true));

    // Normalize phone
    $phone_clean = preg_replace('/[^0-9+]/', '', $phone);
    if ($phone_clean === '') {
        $phone_clean = '0988888888';
    }

    return [
        'zalo_url'        => esc_url_raw($zalo !== '' ? $zalo : $default_zalo),
        'phone'           => $phone_clean,
        'phone_display'   => $phone !== '' ? $phone : '0988 888 888',
        'facebook_url'    => esc_url_raw($fb !== '' ? $fb : $default_fb),
        'enable_floating' => $enable,
    ];
}

/**
 * Register WordPress Customizer Section and Controls
 */
function edunext_customize_register_contact(WP_Customize_Manager $wp_customize): void {
    $wp_customize->add_section('edunext_contact_section', [
        'title'       => __('Kênh liên hệ EduNext (Nút nổi & Footer)', 'edunext'),
        'description' => __('Cấu hình 3 kênh liên hệ nổi bên phải màn hình: Zalo, Số điện thoại (Hotline), và Facebook.', 'edunext'),
        'priority'    => 120,
    ]);

    // Bật/tắt nút nổi
    $wp_customize->add_setting('edunext_enable_floating_contact', [
        'default'           => true,
        'type'              => 'theme_mod',
        'sanitize_callback' => 'rest_sanitize_boolean',
    ]);
    $wp_customize->add_control('edunext_enable_floating_contact', [
        'label'    => __('Hiển thị cụm nút liên hệ nổi bên phải', 'edunext'),
        'section'  => 'edunext_contact_section',
        'type'     => 'checkbox',
    ]);

    // Zalo URL
    $wp_customize->add_setting('edunext_zalo_url', [
        'default'           => 'https://zalo.me/0988888888',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control('edunext_zalo_url', [
        'label'       => __('Đường dẫn Zalo (URL / zalo.me)', 'edunext'),
        'description' => __('Ví dụ: https://zalo.me/0988888888', 'edunext'),
        'section'     => 'edunext_contact_section',
        'type'        => 'url',
    ]);

    // Số điện thoại / Hotline
    $wp_customize->add_setting('edunext_phone_number', [
        'default'           => '0988 888 888',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('edunext_phone_number', [
        'label'       => __('Số điện thoại Hotline', 'edunext'),
        'description' => __('Ví dụ: 0988 888 888 hoặc 1900 xxxx', 'edunext'),
        'section'     => 'edunext_contact_section',
        'type'        => 'text',
    ]);

    // Facebook URL
    $wp_customize->add_setting('edunext_facebook_url', [
        'default'           => 'https://facebook.com',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control('edunext_facebook_url', [
        'label'       => __('Đường dẫn Facebook (Page / Profile / Messenger)', 'edunext'),
        'description' => __('Ví dụ: https://facebook.com/edunext hoặc https://m.me/...', 'edunext'),
        'section'     => 'edunext_contact_section',
        'type'        => 'url',
    ]);
}
add_action('customize_register', 'edunext_customize_register_contact');

/**
 * Register Admin Menu for Contact Settings under "EduNext" (or Settings if edunext-dashboard not available)
 */
function edunext_admin_register_contact_page(): void {
    $parent = 'edunext-dashboard';
    // Fallback if core plugin not loaded
    if (!menu_page_url('edunext-dashboard', false)) {
        $parent = 'options-general.php';
    }

    add_submenu_page(
        $parent,
        __('Cấu hình Kênh liên hệ', 'edunext'),
        __('Kênh liên hệ', 'edunext'),
        'manage_options',
        'edunext-contact-settings',
        'edunext_render_contact_settings_page'
    );
}
add_action('admin_menu', 'edunext_admin_register_contact_page', 99);

/**
 * Render Backend Contact Settings Page
 */
function edunext_render_contact_settings_page(): void {
    if (!current_user_can('manage_options')) {
        return;
    }

    $message = '';
    if (isset($_POST['edunext_contact_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['edunext_contact_nonce'])), 'edunext_save_contact_settings')) {
        $enable = isset($_POST['edunext_enable_floating_contact']);
        $zalo = sanitize_text_field(wp_unslash($_POST['edunext_zalo_url'] ?? ''));
        $phone = sanitize_text_field(wp_unslash($_POST['edunext_phone_number'] ?? ''));
        $fb = sanitize_text_field(wp_unslash($_POST['edunext_facebook_url'] ?? ''));

        set_theme_mod('edunext_enable_floating_contact', $enable);
        set_theme_mod('edunext_zalo_url', esc_url_raw($zalo));
        set_theme_mod('edunext_phone_number', $phone);
        set_theme_mod('edunext_facebook_url', esc_url_raw($fb));

        update_option('edunext_enable_floating_contact', $enable);
        update_option('edunext_zalo_url', esc_url_raw($zalo));
        update_option('edunext_phone_number', $phone);
        update_option('edunext_facebook_url', esc_url_raw($fb));

        $message = '<div class="notice notice-success is-dismissible"><p><strong>Đã lưu thành công cấu hình kênh liên hệ!</strong></p></div>';
    }

    $config = edunext_get_contact_config();
    ?>
    <div class="wrap">
        <h1 style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <span class="dashicons dashicons-phone" style="font-size:28px;width:28px;height:28px;"></span>
            Cấu hình Kênh liên hệ EduNext (Nút nổi & Hỗ trợ)
        </h1>
        <?php echo $message; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

        <div style="background:#fff;border:1px solid #ccd0d4;box-shadow:0 1px 3px rgba(0,0,0,.04);border-radius:10px;padding:24px 30px;max-width:850px;">
            <p style="font-size:14px;color:#646970;margin-top:0;line-height:1.6;">
                Cấu hình thông tin 3 kênh liên hệ nhanh xuất hiện cố định ở <strong>góc phải màn hình (Zalo, Gọi điện thoại, Facebook)</strong> và chân trang website.
            </p>

            <form method="post" action="">
                <?php wp_nonce_field('edunext_save_contact_settings', 'edunext_contact_nonce'); ?>

                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">Hiển thị nút nổi</th>
                            <td>
                                <label for="edunext_enable_floating_contact">
                                    <input type="checkbox" name="edunext_enable_floating_contact" id="edunext_enable_floating_contact" value="1" <?php checked($config['enable_floating']); ?>>
                                    <strong>Bật hiển thị cụm 3 nút liên hệ nổi bên phải website</strong>
                                </label>
                                <p class="description">Khi bật, biểu tượng Zalo, Số điện thoại và Facebook sẽ luôn ghim ở góc phải màn hình của học viên.</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="edunext_zalo_url" style="display:flex;align-items:center;gap:6px;">
                                    <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#0068FF;"></span>
                                    Link Zalo
                                </label>
                            </th>
                            <td>
                                <input name="edunext_zalo_url" type="url" id="edunext_zalo_url" value="<?php echo esc_attr($config['zalo_url']); ?>" class="regular-text" placeholder="https://zalo.me/0988888888" style="width:100%;max-width:480px;">
                                <p class="description">Đường dẫn mở chat Zalo (thường dùng định dạng: <code>https://zalo.me/số_điện_thoại</code>).</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="edunext_phone_number" style="display:flex;align-items:center;gap:6px;">
                                    <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#10B981;"></span>
                                    Số điện thoại Hotline
                                </label>
                            </th>
                            <td>
                                <input name="edunext_phone_number" type="text" id="edunext_phone_number" value="<?php echo esc_attr($config['phone_display']); ?>" class="regular-text" placeholder="0988 888 888" style="width:100%;max-width:480px;">
                                <p class="description">Số hotline nhận cuộc gọi tư vấn trực tiếp khi bấm vào icon điện thoại (hỗ trợ liên kết <code>tel:</code>).</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="edunext_facebook_url" style="display:flex;align-items:center;gap:6px;">
                                    <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#1877F2;"></span>
                                    Link Facebook / Messenger
                                </label>
                            </th>
                            <td>
                                <input name="edunext_facebook_url" type="url" id="edunext_facebook_url" value="<?php echo esc_attr($config['facebook_url']); ?>" class="regular-text" placeholder="https://facebook.com/edunext" style="width:100%;max-width:480px;">
                                <p class="description">Đường dẫn Fanpage hoặc Messenger kết nối học viên (ví dụ: <code>https://facebook.com/trang_cua_ban</code> hoặc <code>https://m.me/trang_cua_ban</code>).</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f0f0f1;display:flex;align-items:center;gap:12px;">
                    <?php submit_button('Lưu cấu hình liên hệ', 'primary', 'submit', false); ?>
                    <a href="<?php echo esc_url(admin_url('customize.php?autofocus[section]=edunext_contact_section')); ?>" class="button button-secondary" target="_blank">
                        Tùy biến trực quan trong Customizer &rarr;
                    </a>
                </div>
            </form>
        </div>
    </div>
    <?php
}
