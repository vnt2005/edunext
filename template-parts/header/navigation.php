<?php
/**
 * Header Main Navigation Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
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

