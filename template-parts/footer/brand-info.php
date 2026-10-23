<?php
/**
 * Footer Brand and Contacts Component
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
    'enable_floating' => true,
];

$has_zalo = !empty($edunext_contact['zalo_url']);
$has_phone = !empty($edunext_contact['phone']);
$has_fb = !empty($edunext_contact['facebook_url']);
?>
<div class="edn-public-footer-brand">
    <a class="footer-reference-brand" href="#/" aria-label="EduNext - Trang chủ">
        <span class="lms-brand-mark">E</span><span><strong>EduNext</strong><small>Học điều bạn cần</small></span>
    </a>
    <p>Khám phá kiến thức thực tế, chọn lộ trình phù hợp và học theo nhịp độ của riêng bạn.</p>
    <?php if ($has_zalo || $has_fb || $has_phone) : ?>
        <div class="edn-public-footer-contact">
            <span>Kết nối với EduNext</span>
            <div class="edn-public-socials">
                <?php if ($has_zalo) : ?>
                    <a class="floating-zalo" href="<?php echo esc_url($edunext_contact['zalo_url']); ?>" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua Zalo" title="Zalo">Z</a>
                <?php endif; ?>
                <?php if ($has_fb) : ?>
                    <a class="floating-facebook" href="<?php echo esc_url($edunext_contact['facebook_url']); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook EduNext" title="Facebook">f</a>
                <?php endif; ?>
                <?php if ($has_phone) : ?>
                    <a class="floating-phone" href="tel:<?php echo esc_attr($edunext_contact['phone']); ?>" aria-label="Gọi điện cho EduNext (<?php echo esc_attr($edunext_contact['phone_display']); ?>)" title="Hotline: <?php echo esc_attr($edunext_contact['phone_display']); ?>">☎</a>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>
</div>
