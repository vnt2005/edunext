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

<header class="edunext-site-header edn-header-restructured">
    <div class="edn-utility-strip">
        <div class="wrap edn-utility-strip-inner">
            <p><span class="edn-utility-dot" aria-hidden="true"></span> Kiến thức rõ ràng, tiến bộ theo nhịp độ của bạn</p>
            <div class="edn-utility-links">
                <a href="#/about">Về EduNext</a>
                <a href="#/blog">Góc kiến thức <span aria-hidden="true">↗</span></a>
            </div>
        </div>
    </div>

    <div class="edunext-header-main">
        <div class="wrap edunext-header-inner edn-header-primary">
            <a class="edunext-brand" href="#/" aria-label="EduNext - Trang chủ">
                <span class="edunext-brand-mark">E</span>
                <span class="edunext-brand-copy"><strong>EduNext</strong><small>Học điều bạn cần</small></span>
            </a>

            <form class="sf lms-search edunext-header-search" data-form="search" role="search">
                <span class="lms-search-icon" aria-hidden="true"></span>
                <input name="q" placeholder="Bạn muốn học điều gì hôm nay?" aria-label="Tìm khóa học hoặc lĩnh vực">
                <button type="submit" aria-label="Tìm kiếm">Tìm kiếm <span aria-hidden="true">↗</span></button>
            </form>

            <div class="edn-header-tools" role="group" aria-label="Tiện ích học viên">
                <a id="edn-cart-trigger" class="edn-cart-trigger" href="#/cart" aria-label="Giỏ hàng, 0 khóa học" title="Giỏ hàng">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>
                    <span id="edn-cart-count" class="edn-cart-count" hidden>0</span>
                </a>
                <div id="auth" class="lms-auth edunext-account-actions"></div>
            </div>

            <button class="mb lms-mobile-menu" data-a="menu" type="button" aria-label="Mở menu" aria-controls="nav" aria-expanded="false">
                <span aria-hidden="true">☰</span>
            </button>
        </div>
    </div>

    <div class="edn-header-nav-row">
        <div class="wrap edn-header-nav-inner">
            <nav id="nav" class="edunext-main-nav" aria-label="Điều hướng chính">
                <a href="#/" class="edunext-nav-link">Trang chủ</a>
                <div class="edn-course-menu-wrap" id="edn-course-menu-wrap">
                    <a href="#/courses" class="edunext-nav-link edn-course-nav-link">Khóa học <span class="edn-nav-chevron" aria-hidden="true">⌄</span></a>
                    <div class="edn-course-mega-menu" id="edn-course-mega-menu">
                        <div class="edn-domain-mega-head"><strong>Khám phá các chương trình học</strong></div>
                        <nav class="edn-course-mega-list" id="edn-course-mega-list" aria-label="Tất cả khóa học"></nav>
                    </div>
                </div>
                <div class="edn-domain-menu-wrap" id="edn-domain-menu-wrap">
                    <a href="#/categories" class="edunext-nav-link edn-domain-nav-link">Lĩnh vực <span class="edn-nav-chevron" aria-hidden="true">⌄</span></a>
                    <div class="edn-domain-mega-menu" id="edn-domain-mega-menu">
                        <div class="edn-domain-mega-head"><strong>Khám phá các lĩnh vực</strong></div>
                        <nav class="edn-domain-mega-list" id="edn-domain-mega-list" aria-label="Tất cả lĩnh vực"></nav>
                    </div>
                </div>
                <a id="edn-nav-dashboard" href="#/dashboard" class="edunext-nav-link edn-nav-dashboard" hidden>Trang học tập</a>
                <a href="#/blog" class="edunext-nav-link">Blog</a>
                <a href="#/faq" class="edunext-nav-link">Hỏi đáp</a>
            </nav>
            <div class="edn-nav-note"><span class="edn-nav-note-mark" aria-hidden="true">✦</span><span>Khám phá một kỹ năng mới</span><a href="#/categories" aria-label="Khám phá lĩnh vực">Bắt đầu <b aria-hidden="true">↗</b></a></div>
        </div>
    </div>
</header>

<span id="lms-breadcrumb-current" class="edunext-route-context" aria-live="polite">Trang chủ</span>
