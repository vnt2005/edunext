<?php
/**
 * Footer Brand and Contacts Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$edunext_zalo_url = esc_url((string) get_theme_mod('edunext_zalo_url', ''));
$edunext_facebook_url = esc_url((string) get_theme_mod('edunext_facebook_url', ''));
$edunext_phone = preg_replace('/[^0-9+]/', '', (string) get_theme_mod('edunext_phone_number', ''));
$edunext_has_contact = $edunext_zalo_url || $edunext_facebook_url || $edunext_phone;
?>
<div class="edn-public-footer-brand">
    <a class="footer-reference-brand" href="#/" aria-label="EduNext - Trang chủ">
        <span class="lms-brand-mark">E</span><span><strong>EduNext</strong><small>Học điều bạn cần</small></span>
    </a>
    <p>Khám phá kiến thức thực tế, chọn lộ trình phù hợp và học theo nhịp độ của riêng bạn.</p>
    <?php if ($edunext_has_contact) : ?>
        <div class="edn-public-footer-contact">
            <span>Kết nối với EduNext</span>
            <div class="edn-public-socials">
                <?php if ($edunext_zalo_url) : ?>
                    <a class="floating-zalo" href="<?php echo $edunext_zalo_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua Zalo" title="Zalo">Z</a>
                <?php endif; ?>
                <?php if ($edunext_facebook_url) : ?>
                    <a class="floating-facebook" href="<?php echo $edunext_facebook_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook EduNext" title="Facebook">f</a>
                <?php endif; ?>
                <?php if ($edunext_phone) : ?>
                    <a class="floating-phone" href="tel:<?php echo esc_attr($edunext_phone); ?>" aria-label="Gọi điện cho EduNext" title="Điện thoại">☎</a>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>
</div>

