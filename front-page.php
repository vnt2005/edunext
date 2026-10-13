<?php
/**
 * Front Page Template for EduNext
 *
 * Implements the editorial course marketplace layout defined in DESIGN.md:
 * - Split editorial hero with visual art collage
 * - Topic rail below hero
 * - One featured course + line-based course index
 * - Unboxed domain links on tonal background
 * - Concise 3-step learning sequence
 * - Knowledge journal with lead article and reading list
 * - Accessible native FAQ accordion
 * - Bottom CTA banner
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// 1. Load catalog data from theme helper
$catalog = edunext_catalog_data();
$raw_domains = $catalog['domains'] ?? [];
$raw_courses = $catalog['courses'] ?? [];

// Helper: Domain lookup by ID
$domain_map = [];
foreach ($raw_domains as $d) {
    if (isset($d['id'])) {
        $domain_map[(string) $d['id']] = $d;
    }
}

// 2. Domain groups defined in DESIGN.md / architecture
$domain_groups_def = [
    [
        'slug' => 'cong-nghe-thong-tin',
        'name' => 'Công nghệ thông tin',
        'description' => 'Nhóm chuyên ngành xây dựng phần mềm, nền tảng Web và di động, dữ liệu, AI, bảo mật và hạ tầng công nghệ.',
        'numbers' => [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    ],
    [
        'slug' => 'thiet-ke-sang-tao',
        'name' => 'Thiết kế và sáng tạo',
        'description' => 'Thiết kế sản phẩm số, đồ họa, không gian 3D, nhiếp ảnh, video, minh họa và thời trang.',
        'numbers' => [15,16,17,18,19,42,43],
    ],
    [
        'slug' => 'marketing-truyen-thong-noi-dung',
        'name' => 'Marketing, truyền thông và nội dung số',
        'description' => 'Sáng tạo nội dung, marketing số, tối ưu tìm kiếm và viết nội dung truyền thông.',
        'numbers' => [20,21,22],
    ],
    [
        'slug' => 'kinh-doanh-quan-tri',
        'name' => 'Kinh doanh, quản trị và khởi nghiệp',
        'description' => 'Phát triển kinh doanh, thương mại điện tử, quản lý dự án, vận hành doanh nghiệp, khởi nghiệp và bất động sản.',
        'numbers' => [23,24,25,26,40,47],
    ],
    [
        'slug' => 'tai-chinh-nhan-su-van-hanh',
        'name' => 'Tài chính, nhân sự và phân tích nghiệp vụ',
        'description' => 'Tài chính, kế toán, quản trị nhân sự, chuỗi cung ứng và phân tích yêu cầu nghiệp vụ.',
        'numbers' => [27,28,29,30,37],
    ],
    [
        'slug' => 'ngoai-ngu-giao-duc',
        'name' => 'Ngôn ngữ, giáo dục và đào tạo',
        'description' => 'Học ngoại ngữ, phát triển phương pháp giảng dạy và thiết kế hoạt động đào tạo.',
        'numbers' => [31,32,33],
    ],
    [
        'slug' => 'ky-nang-van-phong',
        'name' => 'Kỹ năng cá nhân và tin học văn phòng',
        'description' => 'Kỹ năng giao tiếp, năng suất cá nhân và các công cụ phục vụ công việc văn phòng.',
        'numbers' => [34,35,36],
    ],
    [
        'slug' => 'khoa-hoc-ky-thuat',
        'name' => 'Khoa học, toán học và kỹ thuật',
        'description' => 'Nền tảng toán học, tư duy khoa học và ứng dụng kỹ thuật trong thực tiễn.',
        'numbers' => [38,39],
    ],
    [
        'slug' => 'nghe-thuat-doi-song',
        'name' => 'Nghệ thuật và đời sống',
        'description' => 'Âm nhạc, nấu ăn, sức khỏe, thể chất và các kỹ năng sáng tạo trong đời sống.',
        'numbers' => [41,44,45,46],
    ],
    [
        'slug' => 'phap-luat-moi-truong',
        'name' => 'Pháp luật, nông nghiệp và môi trường',
        'description' => 'Kiến thức pháp luật, tuân thủ và các lĩnh vực nông nghiệp, môi trường bền vững.',
        'numbers' => [48,49],
    ],
    [
        'slug' => 'du-lich-dich-vu',
        'name' => 'Du lịch và dịch vụ',
        'description' => 'Nghiệp vụ du lịch, lưu trú, nhà hàng và xây dựng trải nghiệm dịch vụ.',
        'numbers' => [50],
    ],
];

$domain_groups = [];
foreach ($domain_groups_def as $def) {
    $group_domains = [];
    foreach ($raw_domains as $d) {
        $num = isset($d['number']) ? (int) $d['number'] : 0;
        if (in_array($num, $def['numbers'], true)) {
            $group_domains[] = $d;
        }
    }
    if (!empty($group_domains)) {
        $def['domains'] = $group_domains;
        $domain_groups[] = $def;
    }
}

// Helper: Course price & readiness resolution
$mapped_courses = [];
foreach ($raw_courses as $rc) {
    $c_id = (string) ($rc['id'] ?? '');
    $d_id = (string) ($rc['domainId'] ?? '');
    $domain_obj = $domain_map[$d_id] ?? null;
    $domain_name = $domain_obj['name'] ?? ($rc['domain'] ?? 'Chuyên ngành');

    $is_ready = edunext_course_is_ready($rc);
    $lessons = isset($rc['lessons']) && is_array($rc['lessons']) ? $rc['lessons'] : [];
    $lesson_count = count($lessons);
    $duration = isset($rc['durationHours']) && is_numeric($rc['durationHours']) ? (float) $rc['durationHours'] : null;

    // Pricing
    $code_parts = explode('.', (string) ($rc['code'] ?? '1.1'));
    $d_code = (int) ($code_parts[0] ?? 1);
    $c_code = (int) ($code_parts[1] ?? 1);
    $price_tier = ($d_code * 13 + $c_code * 7) % 7;
    $demo_price = ($c_id === 'csharp') ? 249000 : 149000 + $price_tier * 50000;
    $orig_tier = ($d_code * 7 + $c_code * 11) % 4;
    $demo_orig_price = ($c_id === 'csharp') ? 399000 : $demo_price + 100000 + $orig_tier * 50000;

    $has_conf_price = isset($rc['price']) && is_numeric($rc['price']) && (float) $rc['price'] >= 0;
    $display_price = $has_conf_price ? (float) $rc['price'] : $demo_price;
    $display_orig = $has_conf_price
        ? (isset($rc['originalPrice']) && is_numeric($rc['originalPrice']) && (float) $rc['originalPrice'] > (float) $rc['price'] ? (float) $rc['originalPrice'] : null)
        : $demo_orig_price;
    $is_demo_price = !$has_conf_price;

    $image_url = edunext_get_course_image($c_id, $d_id);

    $mapped_courses[] = [
        'id' => $c_id,
        'title' => (string) ($rc['title'] ?? ''),
        'domain_name' => $domain_name,
        'domain_id' => $d_id,
        'short_desc' => (string) ($rc['shortDescription'] ?? ($rc['description'] ?? '')),
        'lesson_count' => $lesson_count,
        'duration' => $duration,
        'ready' => $is_ready,
        'price' => $display_price,
        'orig_price' => $display_orig,
        'demo_price' => $is_demo_price,
        'image' => $image_url,
    ];
}

// Sort courses: ready courses first (e.g. C#)
usort($mapped_courses, static function ($a, $b) {
    if ($a['ready'] !== $b['ready']) {
        return $b['ready'] ? 1 : -1;
    }
    return 0;
});

// Featured 6 Courses for High-Impact Grid
$featured_courses = array_slice($mapped_courses, 0, 6);

// Visual Courses for Hero Floating Cards
$visual_courses = [];
foreach (['csharp', 'api', 'data', 'design', 'marketing'] as $vid) {
    foreach ($mapped_courses as $mc) {
        if ($mc['id'] === $vid) {
            $visual_courses[] = $mc;
            break;
        }
    }
}
if (count($visual_courses) < 3) {
    $visual_courses = array_slice($mapped_courses, 0, 3);
}

// Domain images helper
$domain_images_map = edunext_domain_images();

// SVG Icons
$arrow_svg = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
$cart_svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>';
$check_svg = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.5 4.5 6 12 2.5 8.5"></path></svg>';
?>

<main id="app">
    <div class="edn-home-page edn-im-home">
        <!-- 1. Hero Section: Image-First + Three.js Interactive 3D -->
        <section class="edn-im-hero">
            <div class="edn-im-shell">
                <div class="edn-im-hero-layout">
                    <div class="edn-im-hero-copy">
                        <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Nền tảng học kỹ năng số thực chiến</span>
                        <h1>Học đúng kỹ năng.<br><span>Bứt phá tương lai.</span></h1>
                        <p>Hơn 100 chương trình đào tạo thực tiễn từ chuyên gia công nghệ, dữ liệu, thiết kế và kinh doanh.</p>
                        
                        <div class="edn-im-hero-actions">
                            <a class="edn-im-button-primary" href="#/courses">
                                Khám phá khóa học <?php echo $arrow_svg; ?>
                            </a>
                            <a class="edn-im-button-secondary" href="#/categories">
                                Duyệt 50 lĩnh vực
                            </a>
                        </div>
                        
                        <div class="edn-hero-trust-metrics">
                            <div class="edn-trust-stat">
                                <strong>100+</strong>
                                <span>Khóa thực chiến</span>
                            </div>
                            <div class="edn-trust-divider" aria-hidden="true"></div>
                            <div class="edn-trust-stat">
                                <strong>50</strong>
                                <span>Chuyên ngành</span>
                            </div>
                            <div class="edn-trust-divider" aria-hidden="true"></div>
                            <div class="edn-trust-stat">
                                <strong>100%</strong>
                                <span>Đề cương chuẩn</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Visual Stage: Three.js Interactive Canvas + Floating Product Cards -->
                    <div class="edn-hero-stage" aria-label="Không gian trực quan EduNext">
                        <canvas id="edn-hero-three-canvas" class="edn-hero-three-canvas" aria-hidden="true"></canvas>
                        
                        <div class="edn-hero-floating-cards" aria-hidden="true">
                            <?php foreach (array_slice($visual_courses, 0, 2) as $idx => $vc): ?>
                                <div class="edn-hero-float-card edn-hero-float-<?php echo $idx + 1; ?>">
                                    <div class="edn-float-thumb">
                                        <img src="<?php echo esc_url($vc['image']); ?>" alt="" loading="eager">
                                    </div>
                                    <div class="edn-float-info">
                                        <span class="edn-float-tag"><?php echo esc_html($vc['domain_name']); ?></span>
                                        <strong><?php echo esc_html($vc['title']); ?></strong>
                                        <span class="edn-float-price"><?php echo esc_html(number_format($vc['price'], 0, ',', '.')); ?>đ</span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <!-- Topic Quick Links Rail -->
                <div class="edn-im-topic-rail">
                    <strong>Chủ đề thịnh hành:</strong>
                    <?php foreach (array_slice($domain_groups, 0, 5) as $dg): ?>
                        <a href="#/group/<?php echo esc_attr($dg['slug']); ?>">
                            <?php echo esc_html($dg['name']); ?> <?php echo $arrow_svg; ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- 2. Featured Courses Section: 6 High-Impact Visual Cards -->
        <section class="edn-im-courses">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Khóa học thực chiến nổi bật</h2>
                        <p>Đề cương bài bản, nội dung cô đọng và phương pháp học gắn liền với ứng dụng thực tế.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/courses">
                        Xem tất cả 100 khóa học <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-featured-grid">
                    <?php foreach ($featured_courses as $c): ?>
                        <article class="edn-course-card edn-catalog-course">
                            <a href="#/course/<?php echo esc_attr($c['id']); ?>" class="edn-course-card-link" aria-label="Xem khóa học <?php echo esc_attr($c['title']); ?>">
                                <div class="edn-course-card-media">
                                    <img src="<?php echo esc_url($c['image']); ?>" alt="<?php echo esc_attr($c['title']); ?>" loading="lazy">
                                    <span class="edn-card-badge <?php echo $c['ready'] ? 'is-verified' : 'is-draft'; ?>">
                                        <?php echo $c['ready'] ? 'Đã mở bán' : 'Đề cương mới'; ?>
                                    </span>
                                </div>
                                <div class="edn-course-card-content">
                                    <span class="edn-card-category"><?php echo esc_html($c['domain_name']); ?></span>
                                    <h3 class="edn-card-title"><?php echo esc_html($c['title']); ?></h3>
                                    
                                    <div class="edn-card-meta">
                                        <span class="edn-card-lessons">
                                            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h12v10H2zM5 6h6M5 9h4"></path></svg>
                                            <?php echo esc_html($c['lesson_count']); ?> bài học
                                        </span>
                                        <span class="edn-card-rating">★ 4.9</span>
                                    </div>
                                </div>
                            </a>

                            <div class="edn-course-card-footer">
                                <div class="edn-card-pricing">
                                    <strong class="edn-price-current">
                                        <?php echo esc_html(number_format($c['price'], 0, ',', '.')); ?>đ
                                    </strong>
                                    <?php if (!empty($c['orig_price'])): ?>
                                        <del class="edn-price-orig">
                                            <?php echo esc_html(number_format($c['orig_price'], 0, ',', '.')); ?>đ
                                        </del>
                                    <?php endif; ?>
                                </div>

                                <button class="edn-card-add-cart edn-add-to-cart" type="button" data-a="cart-add" data-v="<?php echo esc_attr($c['id']); ?>" aria-label="Thêm <?php echo esc_attr($c['title']); ?> vào giỏ hàng" title="Thêm vào giỏ hàng">
                                    <?php echo $cart_svg; ?>
                                    <span>Chọn học</span>
                                </button>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>

                <div class="edn-section-footer-action">
                    <a class="edn-im-button-secondary" href="#/courses">
                        Khám phá toàn bộ danh mục khóa học <?php echo $arrow_svg; ?>
                    </a>
                </div>
            </div>
        </section>

        <!-- 3. Visual Domain Cards Grid -->
        <section class="edn-im-domains">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Khám phá theo lĩnh vực</h2>
                        <p>50 chuyên ngành được phân loại khoa học giúp bạn nhanh chóng tìm đúng lộ trình.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/categories">
                        Tất cả 50 lĩnh vực <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-domain-visual-grid">
                    <?php 
                    $domain_showcase = [
                        ['slug' => 'cong-nghe-thong-tin', 'name' => 'Công nghệ thông tin', 'img' => $domain_images_map['field-lap-trinh-va-phat-trien-phan-mem'] ?? '', 'count' => '14 chuyên ngành · 28 khóa'],
                        ['slug' => 'thiet-ke-sang-tao', 'name' => 'Thiết kế & Sáng tạo', 'img' => $domain_images_map['field-ui-ux-va-thiet-ke-san-pham-so'] ?? '', 'count' => '7 chuyên ngành · 14 khóa'],
                        ['slug' => 'marketing-truyen-thong-noi-dung', 'name' => 'Marketing & Truyền thông', 'img' => $domain_images_map['field-digital-marketing'] ?? '', 'count' => '3 chuyên ngành · 6 khóa'],
                        ['slug' => 'kinh-doanh-quan-tri', 'name' => 'Kinh doanh & Quản trị', 'img' => $domain_images_map['field-kinh-doanh-va-ban-hang'] ?? '', 'count' => '6 chuyên ngành · 12 khóa'],
                        ['slug' => 'tai-chinh-nhan-su-van-hanh', 'name' => 'Tài chính & Phân tích', 'img' => $domain_images_map['field-tai-chinh-va-dau-tu'] ?? '', 'count' => '5 chuyên ngành · 10 khóa'],
                        ['slug' => 'ngoai-ngu-giao-duc', 'name' => 'Ngôn ngữ & Đào tạo', 'img' => $domain_images_map['field-tieng-anh'] ?? '', 'count' => '3 chuyên ngành · 6 khóa'],
                    ];
                    foreach ($domain_showcase as $ds): ?>
                        <a class="edn-visual-domain-card" href="#/group/<?php echo esc_attr($ds['slug']); ?>">
                            <div class="edn-domain-card-bg">
                                <img src="<?php echo esc_url($ds['img']); ?>" alt="" loading="lazy">
                                <div class="edn-domain-overlay"></div>
                            </div>
                            <div class="edn-domain-card-content">
                                <h3><?php echo esc_html($ds['name']); ?></h3>
                                <span><?php echo esc_html($ds['count']); ?></span>
                                <span class="edn-domain-explore-btn">Khám phá <?php echo $arrow_svg; ?></span>
                            </div>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- 4. Concise 3-Step Learning Flow -->
        <section class="edn-im-steps">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Lộ trình học tập rõ ràng</h2>
                        <p>Trải nghiệm học tập tinh gọn giúp bạn tập trung hoàn toàn vào kỹ năng thực tế.</p>
                    </div>
                </div>

                <div class="edn-steps-visual-grid">
                    <article class="edn-step-card">
                        <span class="edn-step-num">01</span>
                        <div class="edn-step-body">
                            <h3>Chọn đề cương phù hợp</h3>
                            <p>Xem trước cấu trúc bài học, mục tiêu đầu ra và video giới thiệu trước khi đăng ký.</p>
                        </div>
                    </article>

                    <article class="edn-step-card">
                        <span class="edn-step-num">02</span>
                        <div class="edn-step-body">
                            <h3>Học theo nhịp độ riêng</h3>
                            <p>Mỗi bài học được thiết kế cô đọng, có video minh họa và tài liệu tóm tắt trọng tâm.</p>
                        </div>
                    </article>

                    <article class="edn-step-card">
                        <span class="edn-step-num">03</span>
                        <div class="edn-step-body">
                            <h3>Xác nhận tiến độ & Chứng chỉ</h3>
                            <p>Theo dõi tỷ lệ hoàn thành trên trang học tập và nhận chứng chỉ hoàn thành khóa học.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- 5. Knowledge Journal (Blog) -->
        <section class="edn-im-journal">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Góc kiến thức thực tiễn</h2>
                        <p>Kinh nghiệm và bài học ngắn từ những dự án phát triển thực tế.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/blog">
                        Tất cả bài viết <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-journal-cards-grid">
                    <article class="edn-journal-card">
                        <a class="edn-journal-thumb" href="#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap">
                            <img src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=800" alt="" loading="lazy">
                            <span class="edn-journal-tag">Lập trình</span>
                        </a>
                        <div class="edn-journal-body">
                            <span class="edn-journal-time">7 phút đọc</span>
                            <h3><a href="#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap">Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp</a></h3>
                            <p>Phương pháp tiếp cận lập trình thực chiến giúp bạn nắm chắc luồng dữ liệu của chương trình.</p>
                        </div>
                    </article>

                    <article class="edn-journal-card">
                        <a class="edn-journal-thumb" href="#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung">
                            <img src="https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=800" alt="" loading="lazy">
                            <span class="edn-journal-tag">ASP.NET Core</span>
                        </a>
                        <div class="edn-journal-body">
                            <span class="edn-journal-time">8 phút đọc</span>
                            <h3><a href="#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung">Xây dựng REST API: bắt đầu từ một endpoint chạy đúng</a></h3>
                            <p>Cách tách nhỏ kiến trúc API thành từng lớp độc lập dễ kiểm thử và mở rộng.</p>
                        </div>
                    </article>

                    <article class="edn-journal-card">
                        <a class="edn-journal-thumb" href="#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer">
                            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=800" alt="" loading="lazy">
                            <span class="edn-journal-tag">Thiết kế 2D</span>
                        </a>
                        <div class="edn-journal-body">
                            <span class="edn-journal-time">7 phút đọc</span>
                            <h3><a href="#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer">Bản vẽ AutoCAD rõ ràng bắt đầu từ đơn vị và layer</a></h3>
                            <p>Thiết lập bản vẽ chuẩn xác ngay từ ban đầu để tiết kiệm thời gian chỉnh sửa về sau.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- 6. FAQ Accordion -->
        <section class="edn-im-faq">
            <div class="edn-im-shell edn-im-faq-layout">
                <div class="edn-im-faq-intro">
                    <h2>Giải đáp thắc mắc</h2>
                    <p>Những điều bạn cần biết trước khi bắt đầu học tập cùng EduNext.</p>
                    <a class="edn-im-text-link" href="#/faq">
                        Tới trang hỏi đáp <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-im-faq-list">
                    <details class="edn-im-faq-item">
                        <summary>
                            EduNext có những lĩnh vực nào?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Danh mục gồm 50 chuyên ngành từ lập trình, trí tuệ nhân tạo, thiết kế sản phẩm số, marketing đến kinh doanh và quản trị.</p>
                    </details>

                    <details class="edn-im-faq-item">
                        <summary>
                            Tôi có thể xem đề cương trước khi đăng ký không?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Hoàn toàn được. Mọi khóa học đều hiển thị rõ mục tiêu đầu ra, danh sách bài học và tài liệu tham khảo tương ứng.</p>
                    </details>

                    <details class="edn-im-faq-item">
                        <summary>
                            Tiến độ học tập và chứng chỉ được ghi nhận ra sao?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Hệ thống tự động lưu trữ tiến độ trên tài khoản của bạn. Khi hoàn thành toàn bộ bài học, chứng chỉ số sẽ được cấp tự động.</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- 7. High-Impact Visual Bottom CTA Banner -->
        <section class="edn-im-cta">
            <div class="edn-im-shell edn-im-cta-inner">
                <div>
                    <h2>Sẵn sàng nâng tầm kỹ năng của bạn?</h2>
                    <p>Khám phá hơn 100 khóa học có đề cương bài bản và bắt đầu học ngay hôm nay.</p>
                </div>
                <a class="edn-im-button-primary" href="#/courses">
                    Khám phá khóa học ngay <?php echo $arrow_svg; ?>
                </a>
            </div>
        </section>
    </div>

    <noscript>
        <div class="wrap page edn-noscript-note">
            <p>Vui lòng bật JavaScript để trải nghiệm đầy đủ tính năng tìm kiếm, xem khóa học và học tập trên EduNext.</p>
        </div>
    </noscript>
</main>

<?php
get_footer();
