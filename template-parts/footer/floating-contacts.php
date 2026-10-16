<?php
/**
 * Footer Floating Contact Component
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

if ($edunext_has_contact) :
?>
<div class="floating-contact" aria-label="Kênh liên hệ">
    <?php if ($edunext_zalo_url) : ?>
        <a class="floating-contact-item floating-zalo" href="<?php echo $edunext_zalo_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua Zalo" title="Zalo">Z</a>
    <?php endif; ?>
    <?php if ($edunext_facebook_url) : ?>
        <a class="floating-contact-item floating-facebook" href="<?php echo $edunext_facebook_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook EduNext" title="Facebook">f</a>
    <?php endif; ?>
    <?php if ($edunext_phone) : ?>
        <a class="floating-contact-item floating-phone" href="tel:<?php echo esc_attr($edunext_phone); ?>" aria-label="Gọi điện cho EduNext" title="Điện thoại">☎</a>
    <?php endif; ?>
</div>
<?php endif; ?>

