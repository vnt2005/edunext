<footer class="site-footer footer-new">
    <div class="wrap">
        <div class="footer-topline">
            <div>
                <a class="ft-logo" href="<?php echo esc_url(home_url('/#/' )); ?>">
                    <span class="mark">E</span><span><strong>EduNext</strong><small>Course store</small></span>
                </a>
                <p>Khám phá, mua và học những khóa học phù hợp với mục tiêu của bạn.</p>
            </div>
            <div class="footer-links">
                <div><h3>Mua khóa học</h3><a href="#/courses">Tất cả khóa học</a><a href="#/courses">Danh mục</a><a href="#/blog">Blog</a></div>
                <div><h3>Hỗ trợ</h3><a href="#/faq">Hỏi đáp</a><a href="#/dashboard">Khóa học đã mua</a></div>
                <div><h3>Tài khoản</h3><a href="#/login">Đăng nhập</a><a href="#/register">Đăng ký</a><a href="#/dashboard">Trang học tập</a></div>
            </div>
        </div>
        <div class="ft-bottom"><span>© <?php echo esc_html(wp_date('Y')); ?> EduNext.</span><span>Khóa học rõ ràng · quyết định dễ dàng</span></div>
    </div>
</footer>

<div class="floating-contact" aria-label="Kênh liên hệ">
    <span class="floating-contact-item floating-zalo" aria-label="Zalo" title="Zalo">
        <span class="floating-zalo-mark">Z</span>
    </span>
    <span class="floating-contact-item floating-facebook" aria-label="Facebook" title="Facebook">
        <span class="floating-facebook-mark">f</span>
    </span>
    <span class="floating-contact-item floating-phone" aria-label="Điện thoại" title="Điện thoại">
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 3.5h2.1l1.2 4.1-1.8 1.5a16.2 16.2 0 0 0 6.8 6.8l1.5-1.8 4.1 1.2v2.1c0 1.1-.9 2-2 2C10.1 19.4 4.6 13.9 4.6 7.5c0-1.1.9-2 2-2Z"></path>
        </svg>
    </span>
</div>

<div id="toast" class="toast" role="status" aria-live="polite"></div>

<?php wp_footer(); ?>
</body>
</html>
