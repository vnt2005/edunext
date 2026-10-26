<?php
/**
 * Footer Floating Contact Component
 *
 * Displays fixed floating contact channels on the right side of the screen:
 * 1. Zalo
 * 2. Hotline (Phone)
 * 3. Facebook
 *
 * Fully integrated with backend settings and WordPress Customizer.
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$edunext_contact = function_exists('edunext_get_contact_config') ? edunext_get_contact_config() : [
    'zalo_url'        => esc_url_raw((string) get_theme_mod('edunext_zalo_url', 'https://zalo.me/0988888888')),
    'phone'           => preg_replace('/[^0-9+]/', '', (string) get_theme_mod('edunext_phone_number', '0988888888')),
    'phone_display'   => (string) get_theme_mod('edunext_phone_number', '0988 888 888'),
    'facebook_url'    => esc_url_raw((string) get_theme_mod('edunext_facebook_url', 'https://facebook.com')),
    'enable_floating' => (bool) get_theme_mod('edunext_enable_floating_contact', true),
];

if (!$edunext_contact['enable_floating']) {
    return;
}

$has_zalo = !empty($edunext_contact['zalo_url']);
$has_phone = !empty($edunext_contact['phone']);
$has_fb = !empty($edunext_contact['facebook_url']);

if ($has_zalo || $has_phone || $has_fb) :
?>
<div class="edn-floating-contact" id="edn-floating-contact" role="region" aria-label="Kênh liên hệ hỗ trợ EduNext">
    <?php if ($has_zalo) : ?>
        <a class="edn-floating-item edn-floating-zalo"
           href="<?php echo esc_url($edunext_contact['zalo_url']); ?>"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat qua Zalo"
           data-tooltip="Chat Zalo">
            <span class="edn-floating-icon">
                <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <circle cx="24" cy="24" r="23" fill="#0068FF"/>
                    <path d="M12.5 28.5L12 36L19 32.5C20.6 33.1 22.3 33.5 24 33.5C30.6 33.5 36 28.6 36 22.5C36 16.4 30.6 11.5 24 11.5C17.4 11.5 12 16.4 12 22.5C12 24.7 12.7 26.7 14 28.4L12.5 28.5Z" fill="#0068FF"/>
                    <path d="M17 19.5H23.5L17.5 27.5H24.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M26.5 27.5V19.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="29" cy="25" r="2.5" stroke="#FFFFFF" stroke-width="2"/>
                </svg>
            </span>
            <span class="edn-floating-tooltip">Chat Zalo</span>
        </a>
    <?php endif; ?>

    <?php if ($has_phone) : ?>
        <a class="edn-floating-item edn-floating-phone"
           href="tel:<?php echo esc_attr($edunext_contact['phone']); ?>"
           aria-label="Gọi hotline: <?php echo esc_attr($edunext_contact['phone_display']); ?>"
           data-tooltip="Hotline: <?php echo esc_attr($edunext_contact['phone_display']); ?>">
            <span class="edn-floating-pulse" aria-hidden="true"></span>
            <span class="edn-floating-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
            </span>
            <span class="edn-floating-tooltip">Hotline: <?php echo esc_html($edunext_contact['phone_display']); ?></span>
        </a>
    <?php endif; ?>

    <?php if ($has_fb) : ?>
        <a class="edn-floating-item edn-floating-facebook"
           href="<?php echo esc_url($edunext_contact['facebook_url']); ?>"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Fanpage Facebook EduNext"
           data-tooltip="Facebook">
            <span class="edn-floating-icon">
                <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <circle cx="24" cy="24" r="23" fill="#1877F2"/>
                    <path d="M29.5 25.5H25V35H20.5V25.5H18V21.5H20.5V18.5C20.5 15.7 22.2 14 25.2 14C26.4 14 27.5 14.1 27.8 14.2V17.5H26.1C24.7 17.5 24.5 18.2 24.5 19.2V21.5H29L28.5 25.5H29.5Z" fill="#FFFFFF"/>
                </svg>
            </span>
            <span class="edn-floating-tooltip">Facebook</span>
        </a>
    <?php endif; ?>
</div>
<?php endif; ?>
