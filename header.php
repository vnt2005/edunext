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

<header class="edunext-site-header">
    <div class="edunext-header-main">
        <div class="wrap edunext-header-inner">
            <a class="edunext-brand" href="#/" aria-label="EduNext - Trang chủ">
                <span class="edunext-brand-mark">E</span>
                <span class="edunext-brand-copy"><strong>EduNext</strong><small>Học điều bạn cần</small></span>
            </a>

            <nav id="nav" class="edunext-main-nav" aria-label="Điều hướng chính">
                <a href="#/" class="edunext-nav-link">Trang chủ</a>
                <div class="edn-course-menu-wrap" id="edn-course-menu-wrap">
                    <a href="#/courses" class="edunext-nav-link edn-course-nav-link">Khóa học</a>
                    <div class="edn-course-mega-menu" id="edn-course-mega-menu">
                        <div class="edn-domain-mega-head">
                            <strong>Khám phá các chương trình học</strong>
                        </div>
                        <nav class="edn-course-mega-list" id="edn-course-mega-list" aria-label="Tất cả khóa học"></nav>
                    </div>
                </div>
                <div class="edn-domain-menu-wrap" id="edn-domain-menu-wrap">
                    <a href="#/categories" class="edunext-nav-link edn-domain-nav-link">Lĩnh vực</a>
                    <div class="edn-domain-mega-menu" id="edn-domain-mega-menu">
                        <div class="edn-domain-mega-head">
                            <strong>Khám phá 50 lĩnh vực</strong>
                        </div>
                        <nav class="edn-domain-mega-list" id="edn-domain-mega-list" aria-label="Tất cả lĩnh vực"></nav>
                    </div>
                </div>
                <a href="#/blog" class="edunext-nav-link">Góc kiến thức</a>
                <a href="#/faq" class="edunext-nav-link">Hỏi đáp</a>
                <a id="edn-nav-dashboard" href="#/dashboard" class="edunext-nav-link edn-nav-dashboard" hidden>Trang học tập</a>
            </nav>

            <form class="sf lms-search edunext-header-search" data-form="search" role="search">
                <span class="lms-search-icon" aria-hidden="true"></span>
                <input name="q" placeholder="Tìm khóa học hoặc lĩnh vực..." aria-label="Tìm khóa học hoặc lĩnh vực">
                <button type="submit" aria-label="Tìm kiếm">Tìm</button>
            </form>

            <div class="edn-header-tools" role="group" aria-label="Tiện ích học viên">
            <a id="edn-cart-trigger" class="edn-cart-trigger" href="#/cart" aria-label="Giỏ hàng, 0 khóa học" title="Giỏ hàng">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>
                <span id="edn-cart-count" class="edn-cart-count" hidden>0</span>
            </a>

            <span class="edn-notification-trigger" role="img" aria-label="Thông báo" title="Thông báo">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg>
            </span>
            <div id="auth" class="lms-auth edunext-account-actions"></div>
            </div>
            <button class="mb lms-mobile-menu" data-a="menu" type="button" aria-label="Mở menu" aria-controls="nav" aria-expanded="false">☰</button>
        </div>
    </div>
</header>

<span id="lms-breadcrumb-current" class="edunext-route-context" aria-live="polite">Trang chủ</span>
