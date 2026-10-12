<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="EduNext — khám phá khóa học thực tế, xem nội dung rõ ràng và học theo tiến độ của bạn.">
    <?php wp_head(); ?>
</head>
<body <?php body_class('edunext-app'); ?>>
<?php wp_body_open(); ?>

<a class="edunext-skip-link" href="#app">Bỏ qua điều hướng</a>

<header class="edunext-site-header">
    <div class="edunext-header-main">
        <div class="wrap edunext-header-inner">
            <a class="edunext-brand" href="#/" aria-label="EduNext - Trang chủ">
                <span class="edunext-brand-mark">E</span>
                <span class="edunext-brand-copy"><strong>EduNext</strong><small>Học điều bạn cần</small></span>
            </a>

            <nav id="nav" class="edunext-main-nav" aria-label="Điều hướng chính">
                <a href="#/courses" class="edunext-nav-link">Khóa học</a>
                <a href="#/categories" class="edunext-nav-link">Danh mục</a>
                <a href="#/best-sellers" class="edunext-nav-link">Bán chạy</a>
                <a href="#/blog" class="edunext-nav-link">Blog</a>
                <a href="#/about" class="edunext-nav-link">Về EduNext</a>
            </nav>

            <form class="sf lms-search edunext-header-search" data-form="search" role="search">
                <span class="lms-search-icon" aria-hidden="true"></span>
                <input name="q" placeholder="Bạn muốn học điều gì?" aria-label="Tìm khóa học">
                <button type="submit" aria-label="Tìm kiếm">Tìm</button>
            </form>

            <div id="auth" class="lms-auth edunext-account-actions"></div>
            <button class="mb lms-mobile-menu" data-a="menu" type="button" aria-label="Mở menu" aria-controls="nav">☰</button>
        </div>
    </div>

    <div class="edunext-category-rail">
        <div class="wrap edunext-category-inner">
            <span class="edunext-category-label">Khám phá theo chủ đề</span>
            <button type="button" data-a="cat" data-v="Lập trình">Lập trình</button>
            <button type="button" data-a="cat" data-v="Data / AI">Data &amp; AI</button>
            <button type="button" data-a="cat" data-v="Thiết kế">Thiết kế</button>
            <button type="button" data-a="cat" data-v="Ngoại ngữ">Ngoại ngữ</button>
            <button type="button" data-a="cat" data-v="Marketing">Marketing</button>
        </div>
    </div>
</header>

<span id="lms-breadcrumb-current" class="edunext-route-context" aria-live="polite">Trang chủ</span>

