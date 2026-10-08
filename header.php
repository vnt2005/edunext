<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#10223F">
    <meta name="description" content="EduNext - nền tảng học trực tuyến: học theo lộ trình, làm quiz, nhận chứng chỉ.">
    <?php wp_head(); ?>
</head>
<body <?php body_class('edunext-app'); ?>>
<?php wp_body_open(); ?>

<header class="topbar topbar-new">
    <div class="wrap hd">
        <a class="brand" href="<?php echo esc_url(home_url('/#/' )); ?>">
            <span class="mark">E</span>
            <span class="brand-copy"><strong>EduNext</strong><small>Learning platform</small></span>
        </a>

        <nav id="nav" aria-label="Điều hướng chính">
            <a href="#/">Trang chủ</a>
            <a href="#/courses">Khóa học</a>
            <a href="#/courses">Lộ trình</a>
            <a href="#/courses">Danh mục</a>
            <a href="#/">Hỏi đáp</a>
            <a href="#/blog">Blog</a>
        </nav>

        <form class="sf" data-form="search">
            <span aria-hidden="true">⌕</span>
            <input name="q" placeholder="Tìm khóa học..." aria-label="Tìm khóa học">
        </form>

        <div id="auth" class="au"></div>
        <button class="mb" data-a="menu" aria-label="Mở menu">☰</button>
    </div>
</header>
