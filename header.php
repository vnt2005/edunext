<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#2457D6">
    <meta name="description" content="EduNext - nền tảng học trực tuyến: học theo lộ trình, làm quiz, nhận chứng chỉ.">
    <?php wp_head(); ?>
</head>
<body <?php body_class('edunext-app'); ?>>
<?php wp_body_open(); ?>

<header class="topbar">
    <div class="wrap hd">
        <a class="brand" href="<?php echo esc_url(home_url('/#/' )); ?>">
            <span class="mark">E</span>EduNext
        </a>

        <nav id="nav" aria-label="Điều hướng chính">
            <a href="#/courses">Khóa học</a>
            <button data-a="sc" data-v="cats">Danh mục</button>
            <button data-a="sc" data-v="faq">Hỏi đáp</button>
            <a href="#/blog">Blog</a>
            <a href="#/about">Giới thiệu</a>
            <a href="#/contact">Liên hệ</a>
            <form class="sf" data-form="search">
                <input name="q" placeholder="Tìm khóa học..." aria-label="Tìm khóa học">
            </form>
        </nav>

        <div id="auth" class="au"></div>
        <button class="mb" data-a="menu" aria-label="Mở menu">☰</button>
    </div>
</header>
