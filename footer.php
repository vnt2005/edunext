<?php
$edunext_zalo_url = esc_url((string) get_theme_mod('edunext_zalo_url', ''));
$edunext_facebook_url = esc_url((string) get_theme_mod('edunext_facebook_url', ''));
$edunext_phone = preg_replace('/[^0-9+]/', '', (string) get_theme_mod('edunext_phone_number', ''));
$edunext_has_contact = $edunext_zalo_url || $edunext_facebook_url || $edunext_phone;
?>
<footer class="site-footer footer-reference edn-public-footer">
    <div class="wrap edn-public-footer-main">
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
        <div class="edn-public-footer-column">
            <h3>Khám phá</h3>
            <a href="#/courses">Tất cả khóa học</a>
            <a href="#/categories">Tất cả lĩnh vực</a>
            <a href="#/blog">Góc kiến thức</a>
        </div>
        <div class="edn-public-footer-column">
            <h3>Dành cho người học</h3>
            <a href="#/dashboard">Trang học tập</a>
            <a href="#/orders">Lịch sử mua hàng</a>
            <a href="#/certificates">Chứng chỉ</a>
            <a href="#/faq">Câu hỏi thường gặp</a>
        </div>
        <div class="edn-public-footer-column">
            <h3>Về EduNext</h3>
            <a href="#/about">Giới thiệu</a>
            <a href="#/login">Tài khoản</a>
        </div>
    </div>
    <div class="wrap edn-public-footer-bottom">
        <span>© <?php echo esc_html(wp_date('Y')); ?> EduNext. Học hôm nay, tiến xa ngày mai.</span>
        <span>Học theo lộ trình rõ ràng, tiến bộ từng bước.</span>
    </div>
</footer>
<?php if ($edunext_has_contact) : ?>
    <div class="floating-contact" aria-label="Kênh liên hệ">
        <?php if ($edunext_zalo_url) : ?>
            <a class="floating-contact-item floating-zalo" href="<?php echo $edunext_zalo_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua Zalo" title="Zalo">Z</a>
        <?php endif; ?>
        <?php if ($edunext_facebook_url) : ?>
            <a class="floating-contact-item floating-facebook" href="<?php echo $edunext_facebook_url; ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook EduNext" title="Facebook"><span class="floating-facebook-mark">f</span></a>
        <?php endif; ?>
        <?php if ($edunext_phone) : ?>
            <a class="floating-contact-item floating-phone" href="tel:<?php echo esc_attr($edunext_phone); ?>" aria-label="Gọi điện cho EduNext" title="Điện thoại">☎</a>
        <?php endif; ?>
    </div>
<?php endif; ?>
<div id="toast" class="toast" role="status" aria-live="polite"></div>
<?php wp_footer(); ?>
</body>
</html>
