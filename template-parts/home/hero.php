<?php
/**
 * Template Part: Home Hero Section (Dark Glassmorphic with Global Ambient Motion Background)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$quick_topics = [
    ['slug' => 'lap-trinh-va-phat-trien-phan-mem', 'name' => 'Lập trình C#'],
    ['slug' => 'phat-trien-web', 'name' => 'Web Fullstack'],
    ['slug' => 'ai-va-machine-learning', 'name' => 'AI & LLM'],
    ['slug' => 'co-so-du-lieu', 'name' => 'SQL Server'],
    ['slug' => 'ui-ux-va-thiet-ke-san-pham-so', 'name' => 'UI/UX Design'],
    ['slug' => 'digital-marketing', 'name' => 'Marketing'],
];
?>

<section class="edn-ziro-hero">
    <div class="wrap edn-ziro-wrapper">
        <div class="edn-ziro-content">
            <div class="edn-ziro-pill">
                <span class="edn-ziro-pill-dot" aria-hidden="true"></span>
                <span>Nền tảng học kỹ năng số thực chiến</span>
            </div>

            <h1 class="edn-ziro-headline">
                Khám phá lộ trình chuẩn.<br>
                <span class="edn-ziro-gradient-text">Nâng tầm sự nghiệp số.</span>
            </h1>

            <p class="edn-ziro-paragraph">
                Hơn 100 chương trình thực hành từ chuyên gia công nghệ, dữ liệu, thiết kế và kinh doanh. Học theo dự án thực tế, tích lũy portfolio chuyên nghiệp.
            </p>

            <div class="edn-ziro-cta-row">
                <a href="#/courses" class="edn-ziro-btn-primary group">
                    <span class="edn-btn-text">Khám phá khóa học</span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>
                </a>
                <a href="#/categories" class="edn-ziro-btn-secondary group">
                    <span class="edn-btn-text">Duyệt 50 lĩnh vực</span>
                </a>
            </div>

            <div class="edn-ziro-quick-topics">
                <span>Tìm kiếm phổ biến:</span>
                <?php foreach ($quick_topics as $topic): ?>
                    <a href="#/courses" class="edn-quick-topic-pill"><?php echo esc_html($topic['name']); ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<!-- Stats and Metrics Section -->
<section class="edn-luma-stats">
    <div class="wrap edn-luma-wrap">
        <div class="edn-luma-grid">
            <div class="edn-luma-card group">
                <div class="edn-luma-glow" aria-hidden="true"></div>
                <div class="edn-luma-num edn-luma-grad-1">100+</div>
                <div class="edn-luma-card-body">
                    <h4>Khóa thực chiến</h4>
                </div>
            </div>

            <div class="edn-luma-card group">
                <div class="edn-luma-glow" aria-hidden="true"></div>
                <div class="edn-luma-num edn-luma-grad-2">50</div>
                <div class="edn-luma-card-body">
                    <h4>Chuyên ngành đào tạo</h4>
                </div>
            </div>

            <div class="edn-luma-card group">
                <div class="edn-luma-glow" aria-hidden="true"></div>
                <div class="edn-luma-num edn-luma-grad-3">15.000+</div>
                <div class="edn-luma-card-body">
                    <h4>Học viên theo học</h4>
                </div>
            </div>

            <div class="edn-luma-card group">
                <div class="edn-luma-glow" aria-hidden="true"></div>
                <div class="edn-luma-num edn-luma-grad-4">98%</div>
                <div class="edn-luma-card-body">
                    <h4>Hài lòng & Có việc</h4>
                </div>
            </div>
        </div>
    </div>
</section>

