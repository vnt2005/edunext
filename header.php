<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="EduNext — khám phá lĩnh vực, chọn khóa học và học theo lộ trình của bạn.">
    <?php wp_head(); ?>
</head>
<body <?php body_class('edunext-app'); ?>>
<?php wp_body_open(); ?>

<a class="edunext-skip-link" href="#app">Bỏ qua điều hướng</a>

<header class="edunext-site-header edn-im-header">
    <div class="edunext-header-main">
        <div class="wrap edunext-header-inner edn-im-header-inner">
            <a class="edunext-brand" href="#/" aria-label="EduNext - Trang chủ">
                <span class="edunext-brand-mark">E</span>
                <span class="edunext-brand-copy"><strong>EduNext</strong><small>Học điều bạn cần</small></span>
            </a>

            <nav id="nav" class="edunext-main-nav" aria-label="Điều hướng chính">
                <a href="#/" class="edunext-nav-link">Trang chủ</a>
                <div class="edn-course-menu-wrap" id="edn-course-menu-wrap">
                    <a href="#/courses" class="edunext-nav-link edn-course-nav-link">Khóa học</a>
                    <div class="edn-course-mega-menu" id="edn-course-mega-menu">
                        <div class="edn-domain-mega-head"><strong>Khám phá chương trình học</strong></div>
                        <nav class="edn-course-mega-list" id="edn-course-mega-list" aria-label="Tất cả khóa học"></nav>
                    </div>
                </div>
                <div class="edn-domain-menu-wrap" id="edn-domain-menu-wrap">
                    <a href="#/categories" class="edunext-nav-link edn-domain-nav-link">Lĩnh vực</a>
                    <div class="edn-domain-mega-menu" id="edn-domain-mega-menu">
                        <div class="edn-domain-mega-head"><strong>Khám phá 50 lĩnh vực</strong></div>
                        <nav class="edn-domain-mega-list" id="edn-domain-mega-list" aria-label="Tất cả lĩnh vực"></nav>
                    </div>
                </div>
                <a id="edn-nav-dashboard" href="#/dashboard" class="edunext-nav-link edn-nav-dashboard" hidden>Trang học tập</a>
                <a href="#/blog" class="edunext-nav-link">Blog</a>
                <a href="#/faq" class="edunext-nav-link">Hỏi đáp</a>
            </nav>

            <form class="sf lms-search edunext-header-search" data-form="search" role="search">
                <button type="submit" class="lms-search-icon" aria-label="Tìm kiếm"></button>
                <input name="q" placeholder="Tìm khóa học hoặc lĩnh vực..." aria-label="Tìm khóa học hoặc lĩnh vực">
            </form>

            <div class="edn-header-tools" role="group" aria-label="Tiện ích học viên">
                <a id="edn-cart-trigger" class="edn-cart-trigger" href="#/cart" aria-label="Giỏ hàng, 0 khóa học" title="Giỏ hàng">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>
                    <span id="edn-cart-count" class="edn-cart-count" hidden>0</span>
                </a>
                <div id="auth" class="lms-auth edunext-account-actions"></div>
            </div>

            <button class="mb lms-mobile-menu" data-a="menu" type="button" aria-label="Mở menu" aria-controls="nav" aria-expanded="false">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
    </div>
</header>

<span id="lms-breadcrumb-current" class="edunext-route-context" aria-live="polite">Trang chủ</span>
