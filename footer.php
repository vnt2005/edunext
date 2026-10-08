<footer class="site-footer footer-new">
    <div class="wrap">
        <div class="footer-topline">
            <div>
                <a class="ft-logo" href="<?php echo esc_url(home_url('/#/' )); ?>">
                    <span class="mark">E</span><span><strong>EduNext</strong><small>Learning platform</small></span>
                </a>
                <p>Học theo lộ trình rõ ràng, theo dõi tiến độ và tiếp tục đúng nơi bạn đã dừng lại.</p>
            </div>
            <div class="footer-links">
                <div><h3>Học tập</h3><a href="#/courses">Khóa học</a><a href="#/dashboard">Trang học tập</a><a href="#/login">Đăng nhập</a></div>
                <div><h3>Khám phá</h3><a href="#/">Lộ trình</a><a href="#/">Hỏi đáp</a><a href="#/blog">Blog</a></div>
                <div><h3>EduNext</h3><a href="#/about">Giới thiệu</a><a href="#/contact">Liên hệ</a></div>
            </div>
        </div>
        <div class="ft-bottom"><span>© <?php echo esc_html(wp_date('Y')); ?> EduNext.</span><span>Học đều · tiến bộ rõ ràng</span></div>
    </div>
</footer>

<div id="toast" class="toast" role="status" aria-live="polite"></div>

<?php wp_footer(); ?>
</body>
</html>
