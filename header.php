<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="EduNext - khóa học trực tuyến, mua một lần và học theo tiến độ của bạn.">
    <?php wp_head(); ?>
</head>
<body <?php body_class('edunext-app'); ?>>
<?php wp_body_open(); ?>

<aside class="lms-sidebar" aria-label="Điều hướng EduNext">
    <div class="lms-brand-wrap">
        <a class="lms-brand" href="<?php echo esc_url(home_url('/#/' )); ?>">
            <span class="lms-brand-mark">E</span>
            <span><strong>EduNext</strong><small>Course store</small></span>
        </a>
    </div>

    <nav id="nav" class="lms-nav" aria-label="Điều hướng chính">
        <a href="#/" class="lms-nav-item"><span class="lms-nav-icon">⌂</span><span>Trang chủ</span></a>
        <a href="#/courses" class="lms-nav-item"><span class="lms-nav-icon">▦</span><span>Khóa học</span></a>
        <a href="#/best-sellers" class="lms-nav-item"><span class="lms-nav-icon">↗</span><span>Khóa bán chạy</span></a>
        <a href="#/categories" class="lms-nav-item"><span class="lms-nav-icon">◫</span><span>Danh mục</span></a>
        <a href="#/blog" class="lms-nav-item"><span class="lms-nav-icon">▤</span><span>Blog</span></a>
        <a href="#/faq" class="lms-nav-item"><span class="lms-nav-icon">?</span><span>Hỏi đáp</span></a>
    </nav>

    <div class="lms-sidebar-bottom">
        <a href="#/dashboard" class="lms-nav-item"><span class="lms-nav-icon">◎</span><span>Trang học tập</span></a>
    </div>
</aside>

<header class="topbar-reference">
    <div class="topbar-inner-reference">
        <button class="mb lms-mobile-menu" data-a="menu" aria-label="Mở menu">☰</button>
        <form class="sf lms-search" data-form="search">
            <span class="lms-search-icon" aria-hidden="true">⌕</span>
            <input name="q" placeholder="Tìm khóa học..." aria-label="Tìm khóa học">
        </form>
        <div id="auth" class="au lms-auth"></div>
    </div>
</header>
