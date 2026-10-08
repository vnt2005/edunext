<footer class="site-footer">
    <div class="wrap">
        <div class="ft-grid">
            <div class="ft-brand">
                <a class="ft-logo" href="<?php echo esc_url(home_url('/#/' )); ?>">
                    <span class="mark">E</span>EduNext
                </a>
                <p>Học từng bước, theo dõi tiến độ, làm quiz và nhận chứng chỉ.</p>
                <span class="ft-demo">Nền tảng học trực tuyến • Bản demo</span>
            </div>

            <div class="ft-col">
                <h3>Học tập</h3>
                <a href="#/courses">Khóa học</a>
                <button data-a="sc" data-v="cats">Danh mục</button>
                <button data-a="sc" data-v="faq">Hỏi đáp</button>
            </div>

            <div class="ft-col">
                <h3>Tài khoản</h3>
                <a href="#/login">Đăng nhập</a>
                <a href="#/register">Đăng ký</a>
                <a href="#/dashboard">Trang cá nhân</a>
                <a href="#/teacher">Giảng viên</a>
                <a href="#/admin">Quản trị</a>
            </div>

            <div class="ft-col">
                <h3>EduNext</h3>
                <p>Học đúng kiến thức, phát triển đúng tương lai.</p>
                <a href="#/blog">Blog</a>
                <a href="#/about">Giới thiệu</a>
                <a href="#/contact">Liên hệ</a>
                <p class="ft-muted">Theo dõi tiến độ học tập của bạn ngay trên trình duyệt.</p>
            </div>
        </div>

        <div class="ft-bottom">
            <span>© <?php echo esc_html(wp_date('Y')); ?> EduNext. Bản demo.</span>
            <span>Học mọi lúc • Tiến bộ từng bước</span>
        </div>
    </div>
</footer>

<div id="toast" class="toast" role="status" aria-live="polite"></div>

<?php wp_footer(); ?>
</body>
</html>
