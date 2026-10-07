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
  <link rel="stylesheet" href="<?= htmlspecialchars($css) ?>?v=2.2">
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

  <footer>
    <div class="wrap">
      <div><b>EduNext</b><br>Học từng bước, theo dõi tiến độ, nhận chứng chỉ.</div>
      <div>© <?= date('Y') ?> EduNext. Bản demo.</div>
    </div>
  </footer>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script src="<?= htmlspecialchars($base) ?>/app.js?v=2.1" defer></script>
  <?php if ($wp) wp_footer(); ?>
</body>
</html>
