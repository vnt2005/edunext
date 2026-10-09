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
        <div class="lms-nav-group-label">HỌC TẬP</div>
        <a href="#/" class="lms-nav-item"><span class="lms-nav-icon">⌂</span><span>Trang chủ</span></a>
        <a href="#/dashboard" class="lms-nav-item"><span class="lms-nav-icon">▣</span><span>Trang học tập</span></a>
        <a href="#/certificates" class="lms-nav-item"><span class="lms-nav-icon">◇</span><span>Chứng chỉ</span></a>

        <div class="lms-nav-group-label">KHÁM PHÁ</div>
        <a href="#/courses" class="lms-nav-item"><span class="lms-nav-icon">⌘</span><span>Khám phá</span></a>
        <a href="#/best-sellers" class="lms-nav-item"><span class="lms-nav-icon">↗</span><span>Bán chạy</span></a>
        <a href="#/categories" class="lms-nav-item"><span class="lms-nav-icon">◫</span><span>Danh mục</span></a>
        <a href="#/blog" class="lms-nav-item"><span class="lms-nav-icon">▤</span><span>Blog</span></a>

        <div class="lms-nav-group-label">HỖ TRỢ</div>
        <a href="#/faq" class="lms-nav-item"><span class="lms-nav-icon">?</span><span>Hỏi đáp</span></a>
    </nav>

</aside>

<header class="topbar-reference">
    <div class="topbar-inner-reference">
        <button class="mb lms-mobile-menu" data-a="menu" aria-label="Mở menu">☰</button>
        <div class="lms-breadcrumb"><a href="#/">EduNext</a><span>/</span><strong id="lms-breadcrumb-current">Trang chủ</strong></div>
        <span class="lms-topbar-spacer"></span>
        <form class="sf lms-search" data-form="search">
            <span class="lms-search-icon" aria-hidden="true">⌕</span>
            <input name="q" placeholder="Tìm khóa học..." aria-label="Tìm khóa học">
        </form>
        <button class="lms-notify" type="button" aria-label="Thông báo">♢</button>
    <div id="lms-topbar-profile" class="lms-topbar-profile"></div>
        <div id="auth" class="au lms-auth"></div>
    </div>
</header>
