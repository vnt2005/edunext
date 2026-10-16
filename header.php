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
            <?php get_template_part('template-parts/header/brand'); ?>
            <?php get_template_part('template-parts/header/navigation'); ?>
            <?php get_template_part('template-parts/header/tools'); ?>
        </div>
    </div>
</header>

<!-- Global Ambient Background Video for entire site -->
<?php get_template_part('template-parts/header/background-video'); ?>

<span id="lms-breadcrumb-current" class="edunext-route-context" aria-live="polite">Trang chủ</span>
