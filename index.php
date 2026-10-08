<?php
/* EduNext - template chính. Chạy được trong WordPress (theme) và cả PHP thuần. */
$wp   = function_exists('wp_head');
$base = $wp ? get_stylesheet_directory_uri() : '.';
$css  = $wp ? get_stylesheet_uri() : 'style.css';
?>
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#2457D6">
  <meta name="description" content="EduNext - nền tảng học trực tuyến: học theo lộ trình, làm quiz, nhận chứng chỉ.">
  <title>EduNext - Học đúng kiến thức, phát triển đúng tương lai</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= htmlspecialchars($css) ?>?v=2.3">
  <?php if ($wp) wp_head(); ?>
</head>
<body <?php if ($wp) { body_class('edunext-app'); } else { echo 'class="edunext-app"'; } ?>>
  <header class="topbar">
    <div class="wrap hd">
      <a class="brand" href="#/"><span class="mark">E</span>EduNext</a>
      <nav id="nav" aria-label="Điều hướng chính">
        <a href="#/courses">Khóa học</a>
        <button data-a="sc" data-v="cats">Danh mục</button>
        <button data-a="sc" data-v="faq">Hỏi đáp</button>
        <form class="sf" data-form="search"><input name="q" placeholder="Tìm khóa học..." aria-label="Tìm khóa học"></form>
      </nav>
      <div id="auth" class="au"></div>
      <button class="mb" data-a="menu" aria-label="Mở menu">☰</button>
    </div>
  </header>

  <main id="app"><noscript><div class="wrap page">Trang cần bật JavaScript để hoạt động.</div></noscript></main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="ft-grid">
        <div class="ft-brand">
          <a class="ft-logo" href="#/"><span class="mark">E</span>EduNext</a>
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
          <p class="ft-muted">Theo dõi tiến độ học tập của bạn ngay trên trình duyệt.</p>
        </div>
      </div>

      <div class="ft-bottom">
        <span>© <?= date('Y') ?> EduNext. Bản demo.</span>
        <span>Học mọi lúc • Tiến bộ từng bước</span>
      </div>
    </div>
  </footer>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script src="<?= htmlspecialchars($base) ?>/app.js?v=2.3" defer></script>
  <?php /* wp_footer() omitted for this standalone demo theme to avoid WooCommerce frontend fatal. */ ?>
</body>
</html>
