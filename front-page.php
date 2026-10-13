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

// 3. Course images dictionary
$course_images = [
    'csharp' => 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
    'api' => 'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
    'data' => 'https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2',
    'english' => 'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
    'design' => 'https://miro.medium.com/v2/resize:fit:1400/1*ezbw1Z06SzRSOhShXfwOTg.png',
    'marketing' => 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=82&w=1200',
];

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

    $image_url = $course_images[$c_id] ?? '';

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

// Featured Lead Course + Subsequent Rows
$lead_course = $mapped_courses[0] ?? null;
$course_rows = array_slice($mapped_courses, 1, 5);

// Visual Courses for Hero Art
$visual_courses = [];
foreach (['csharp', 'design', 'marketing'] as $vid) {
    foreach ($mapped_courses as $mc) {
        if ($mc['id'] === $vid) {
            $visual_courses[] = $mc;
            break;
        }
    }
}
if (count($visual_courses) < 3) {
    foreach ($mapped_courses as $mc) {
        if (count($visual_courses) >= 3) {
            break;
        }
        if (!in_array($mc['id'], array_column($visual_courses, 'id'), true)) {
            $visual_courses[] = $mc;
        }
    }
}

// SVG Arrow Icon reusable
$arrow_svg = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
$cart_svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>';
?>

<main id="app">
    <div class="edn-home-page edn-im-home">
        <!-- 1. Hero Section -->
        <section class="edn-im-hero">
            <div class="edn-im-shell">
                <div class="edn-im-hero-layout">
                    <div class="edn-im-hero-copy">
                        <h1>Học điều bạn muốn.<br><span>Làm được điều bạn cần.</span></h1>
                        <p>Khám phá những chương trình học có đề cương rõ ràng, chọn lĩnh vực phù hợp và xây dựng kỹ năng theo nhịp độ của riêng bạn.</p>
                        <div class="edn-im-hero-actions">
                            <a class="edn-im-button-primary" href="#/courses">
                                Khám phá khóa học <?php echo $arrow_svg; ?>
                            </a>
                            <a class="edn-im-button-secondary" href="#/categories">
                                Duyệt theo lĩnh vực
                            </a>
                        </div>
                        <p class="edn-im-hero-note">Từ lập trình và dữ liệu đến thiết kế, marketing, kinh doanh và nhiều chuyên ngành khác.</p>
                    </div>

                    <div class="edn-im-hero-art" aria-label="Một vài lĩnh vực học tập tiêu biểu">
                        <?php foreach (array_slice($visual_courses, 0, 3) as $vc): ?>
                            <div class="edn-im-visual-tile">
                                <?php if (!empty($vc['image'])): ?>
                                    <img src="<?php echo esc_url($vc['image']); ?>" alt="<?php echo esc_attr($vc['title']); ?>" loading="eager">
                                <?php else: ?>
                                    <div class="edn-course-placeholder">
                                        <b><?php echo esc_html($vc['title']); ?></b>
                                        <small><?php echo esc_html($vc['domain_name']); ?></small>
                                    </div>
                                <?php endif; ?>
                                <span><?php echo esc_html($vc['domain_name']); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Topic Rail -->
                <div class="edn-im-topic-rail">
                    <strong>Bắt đầu từ mối quan tâm của bạn</strong>
                    <?php foreach (array_slice($domain_groups, 0, 5) as $dg): ?>
                        <a href="#/group/<?php echo esc_attr($dg['slug']); ?>">
                            <?php echo esc_html($dg['name']); ?> <?php echo $arrow_svg; ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- 2. Course Catalog Index Section -->
        <section class="edn-im-courses">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Một kỹ năng mới bắt đầu từ đây.</h2>
                        <p>Xem đề cương và tình trạng mở bán để biết rõ điều gì đang sẵn sàng trước khi đăng ký.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/courses">
                        Tất cả khóa học <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-im-course-layout">
                    <!-- Featured Lead Course -->
                    <?php if ($lead_course): ?>
                        <article class="edn-im-featured-course">
                            <a class="edn-im-featured-link" href="#/course/<?php echo esc_attr($lead_course['id']); ?>">
                                <div class="edn-im-featured-media">
                                    <?php if (!empty($lead_course['image'])): ?>
                                        <img src="<?php echo esc_url($lead_course['image']); ?>" alt="<?php echo esc_attr($lead_course['title']); ?>" loading="lazy">
                                    <?php else: ?>
                                        <div class="edn-course-placeholder">
                                            <b><?php echo esc_html($lead_course['title']); ?></b>
                                            <small><?php echo esc_html($lead_course['domain_name']); ?></small>
                                        </div>
                                    <?php endif; ?>
                                    <span class="edn-im-course-status">
                                        <?php echo $lead_course['ready'] ? 'Đã mở bán' : 'Đề cương đang hoàn thiện'; ?>
                                    </span>
                                </div>
                                <div class="edn-im-featured-copy">
                                    <span class="edn-im-course-category"><?php echo esc_html($lead_course['domain_name']); ?></span>
                                    <h3><?php echo esc_html($lead_course['title']); ?></h3>
                                    <p><?php echo esc_html($lead_course['short_desc']); ?></p>
                                </div>
                            </a>
                            <div class="edn-im-featured-meta">
                                <span>
                                    <?php echo esc_html($lead_course['lesson_count']); ?> bài học dự kiến
                                    <?php if ($lead_course['duration']): ?>
                                        · <?php echo esc_html($lead_course['duration']); ?> giờ
                                    <?php endif; ?>
                                </span>
                                <div class="edn-im-featured-price">
                                    <div class="edn-course-pricing">
                                        <strong class="edn-course-price-current">
                                            <?php echo esc_html(number_format($lead_course['price'], 0, ',', '.')); ?>đ
                                        </strong>
                                        <?php if (!empty($lead_course['orig_price'])): ?>
                                            <del class="edn-course-price-original">
                                                <?php echo esc_html(number_format($lead_course['orig_price'], 0, ',', '.')); ?>đ
                                            </del>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ($lead_course['demo_price']): ?>
                                        <span class="edn-im-price-note">Giá tham khảo</span>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="edn-im-featured-actions">
                                <button class="edn-im-cart-add edn-add-to-cart" type="button" data-a="cart-add" data-v="<?php echo esc_attr($lead_course['id']); ?>" aria-label="Thêm vào giỏ hàng">
                                    <?php echo $cart_svg; ?>
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                            </div>
                        </article>
                    <?php endif; ?>

                    <!-- Course Line Index Rows -->
                    <div class="edn-im-course-list">
                        <?php foreach ($course_rows as $row): ?>
                            <article class="edn-im-course-row">
                                <a class="edn-im-course-row-main" href="#/course/<?php echo esc_attr($row['id']); ?>">
                                    <span class="edn-im-course-thumb">
                                        <?php if (!empty($row['image'])): ?>
                                            <img src="<?php echo esc_url($row['image']); ?>" alt="<?php echo esc_attr($row['title']); ?>" loading="lazy">
                                        <?php else: ?>
                                            <span class="edn-course-placeholder">
                                                <b><?php echo esc_html(mb_substr($row['title'], 0, 15)); ?></b>
                                            </span>
                                        <?php endif; ?>
                                    </span>
                                    <span class="edn-im-course-row-copy">
                                        <small><?php echo esc_html($row['domain_name']); ?></small>
                                        <strong><?php echo esc_html($row['title']); ?></strong>
                                        <span>
                                            <?php echo esc_html($row['lesson_count']); ?> bài học dự kiến
                                            <?php if ($row['duration']): ?>
                                                · <?php echo esc_html($row['duration']); ?> giờ
                                            <?php endif; ?>
                                            · <?php echo $row['ready'] ? 'Đã mở bán' : 'Đề cương'; ?>
                                        </span>
                                    </span>
                                </a>
                                <div class="edn-im-course-row-side">
                                    <div class="edn-course-pricing">
                                        <strong class="edn-course-price-current">
                                            <?php echo esc_html(number_format($row['price'], 0, ',', '.')); ?>đ
                                        </strong>
                                    </div>
                                    <?php if ($row['demo_price']): ?>
                                        <span class="edn-new-price-note">Giá tham khảo</span>
                                    <?php endif; ?>
                                    <button class="edn-im-cart-compact edn-add-to-cart" type="button" data-a="cart-add" data-v="<?php echo esc_attr($row['id']); ?>" aria-label="Thêm vào giỏ hàng" title="Thêm vào giỏ hàng">
                                        <?php echo $cart_svg; ?>
                                    </button>
                                </div>
                            </article>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Course Pagination Bar -->
                <div class="edn-pagination" role="navigation" aria-label="Phân trang khóa học trang chủ">
                    <button type="button" class="edn-pagination-button is-active" data-a="page-change" data-v="home,1" aria-current="page" aria-label="Trang 1">1</button>
                    <button type="button" class="edn-pagination-button" data-a="page-change" data-v="home,2" aria-label="Trang 2">2</button>
                    <button type="button" class="edn-pagination-button" data-a="page-change" data-v="home,3" aria-label="Trang 3">3</button>
                    <button type="button" class="edn-pagination-next" data-a="page-change" data-v="home,2" aria-label="Trang tiếp theo">
                        <span>Trang tiếp</span> <?php echo $arrow_svg; ?>
                    </button>
                </div>
            </div>
        </section>

        <!-- 3. Unboxed Domain Links Section -->
        <section class="edn-im-domains">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Tìm lối đi qua từng lĩnh vực.</h2>
                        <p>Những nhóm chuyên ngành giúp bạn thu hẹp lựa chọn rồi tìm hiểu sâu hơn khi đã xác định hướng đi.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/categories">
                        Tất cả lĩnh vực <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-im-domain-grid">
                    <?php foreach (array_slice($domain_groups, 0, 6) as $group):
                        $group_domain_ids = array_column($group['domains'], 'id');
                        $group_course_count = 0;
                        foreach ($mapped_courses as $mc) {
                            if (in_array($mc['domain_id'], $group_domain_ids, true)) {
                                $group_course_count++;
                            }
                        }
                    ?>
                        <a class="edn-im-domain-link" href="#/group/<?php echo esc_attr($group['slug']); ?>">
                            <span class="edn-im-domain-copy">
                                <strong><?php echo esc_html($group['name']); ?></strong>
                                <small><?php echo count($group['domains']); ?> chuyên ngành · <?php echo $group_course_count; ?> chương trình</small>
                            </span>
                            <span class="edn-im-domain-arrow"><?php echo $arrow_svg; ?></span>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- 4. Concise Learning Sequence (Steps) -->
        <section class="edn-im-steps">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Rõ ràng từ bước đầu tiên.</h2>
                        <p>Không cần chọn tất cả ngay hôm nay. Hãy bắt đầu bằng điều hữu ích nhất với bạn.</p>
                    </div>
                </div>

                <div class="edn-im-step-grid">
                    <article class="edn-im-step">
                        <span class="edn-im-step-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5M8 10.5h5M10.5 8v5"></path></svg>
                        </span>
                        <div>
                            <h3>Tìm lĩnh vực</h3>
                            <p>Bắt đầu bằng một chủ đề bạn quan tâm hoặc tìm kiếm kỹ năng bạn muốn phát triển.</p>
                            <a href="#/categories">Khám phá lĩnh vực <?php echo $arrow_svg; ?></a>
                        </div>
                    </article>

                    <article class="edn-im-step">
                        <span class="edn-im-step-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 4.5h10a4 4 0 0 1 4 4v11H9a4 4 0 0 0-4 0z"></path><path d="M5 4.5v15M9 8h6M9 11h6"></path></svg>
                        </span>
                        <div>
                            <h3>Xem đề cương</h3>
                            <p>Đọc mục tiêu, bài học dự kiến và thông tin chương trình trước khi quyết định.</p>
                            <a href="#/courses">Xem khóa học <?php echo $arrow_svg; ?></a>
                        </div>
                    </article>

                    <article class="edn-im-step">
                        <span class="edn-im-step-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.5 4.5L19 7"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        </span>
                        <div>
                            <h3>Tiếp tục tiến bộ</h3>
                            <p>Khi có quyền học, quay lại bài còn dang dở và theo dõi tiến độ trong tài khoản.</p>
                            <a href="#/dashboard">Mở trang học tập <?php echo $arrow_svg; ?></a>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- 5. Knowledge Journal (Blog) Section -->
        <section class="edn-im-journal">
            <div class="edn-im-shell">
                <div class="edn-im-section-heading">
                    <div>
                        <h2>Góc kiến thức.</h2>
                        <p>Bài viết và gợi ý thực hành để bạn tiếp tục khám phá ngoài chương trình học.</p>
                    </div>
                    <a class="edn-im-text-link" href="#/blog">
                        Đọc tất cả bài viết <?php echo $arrow_svg; ?>
                    </a>
                </div>

                <div class="edn-im-journal-layout">
                    <!-- Lead Article -->
                    <article class="edn-im-journal-lead">
                        <a class="edn-im-journal-image" href="#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap" aria-label="Đọc bài: Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp">
                            <img src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200" alt="Học C# bằng cách lần theo dữ liệu" loading="lazy">
                        </a>
                        <div class="edn-im-journal-lead-copy">
                            <div class="edn-im-journal-meta">
                                <span>Lập trình</span>
                                <span>7 phút đọc</span>
                            </div>
                            <h3>
                                <a href="#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap">
                                    Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp
                                </a>
                            </h3>
                            <p>Có thể bạn đã xem khá nhiều video C# nhưng khi mở Visual Studio lên vẫn lúng túng. Một cách học dễ bám hơn là theo dõi dữ liệu đi qua từng dòng chương trình, rồi tự thay đổi bài toán.</p>
                            <a class="edn-im-read-link" href="#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap">
                                Đọc bài viết <?php echo $arrow_svg; ?>
                            </a>
                        </div>
                    </article>

                    <!-- Journal Rows -->
                    <div class="edn-im-journal-list">
                        <article class="edn-im-journal-row">
                            <a class="edn-im-journal-thumb" href="#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung" aria-label="Đọc bài: Xây dựng REST API">
                                <img src="https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200" alt="Xây dựng REST API" loading="lazy">
                            </a>
                            <div>
                                <div class="edn-im-journal-meta">
                                    <span>ASP.NET Core</span>
                                    <span>8 phút đọc</span>
                                </div>
                                <h3>
                                    <a href="#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung">
                                        Xây dựng REST API: bắt đầu từ một endpoint chạy đúng
                                    </a>
                                </h3>
                                <p>Routing, controller, dependency injection và cơ sở dữ liệu dễ thành một mớ khái niệm nếu học cùng lúc. Hãy tạo một endpoint nhỏ, kiểm tra kết quả rồi mới nối thêm từng lớp.</p>
                                <a class="edn-im-read-link" href="#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung">
                                    Đọc tiếp <?php echo $arrow_svg; ?>
                                </a>
                            </div>
                        </article>

                        <article class="edn-im-journal-row">
                            <a class="edn-im-journal-thumb" href="#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer" aria-label="Đọc bài: Bản vẽ AutoCAD rõ ràng">
                                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=1200" alt="Bản vẽ AutoCAD rõ ràng" loading="lazy">
                            </a>
                            <div>
                                <div class="edn-im-journal-meta">
                                    <span>AutoCAD 2D</span>
                                    <span>7 phút đọc</span>
                                </div>
                                <h3>
                                    <a href="#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer">
                                        Bản vẽ AutoCAD rõ ràng bắt đầu từ đơn vị và layer
                                    </a>
                                </h3>
                                <p>Trước khi vẽ nhanh, hãy làm cho bản vẽ đúng đơn vị, dễ đọc và có thể in ra đúng tỷ lệ. Vài thiết lập đầu buổi sẽ giúp bạn tránh nhiều lỗi ở cuối.</p>
                                <a class="edn-im-read-link" href="#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer">
                                    Đọc tiếp <?php echo $arrow_svg; ?>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. Plain FAQ Section -->
        <section class="edn-im-faq">
            <div class="edn-im-shell edn-im-faq-layout">
                <div class="edn-im-faq-intro">
                    <h2>Trước khi bắt đầu.</h2>
                    <p>Thông tin cơ bản về nội dung chương trình, quyền học và tiến độ trên EduNext.</p>
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
                        <p>Danh mục được chia thành các nhóm lĩnh vực và chuyên ngành. Bạn có thể chọn nhóm mình quan tâm hoặc dùng ô tìm kiếm trên đầu trang để tìm theo tên khóa học, lĩnh vực hay kỹ năng.</p>
                    </details>

                    <details class="edn-im-faq-item">
                        <summary>
                            Làm sao biết một khóa học đã mở bán?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Trạng thái được hiển thị trên thẻ và trang chi tiết. Những chương trình còn ở dạng đề cương sẽ được ghi rõ là chưa mở bán.</p>
                    </details>

                    <details class="edn-im-faq-item">
                        <summary>
                            Tôi có thể xem nội dung trước khi đăng ký không?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Bạn có thể xem mục tiêu, các bài học dự kiến và thông tin chương trình. Những nội dung đã sẵn sàng sẽ được mở theo trạng thái thực tế của từng khóa học.</p>
                    </details>

                    <details class="edn-im-faq-item">
                        <summary>
                            Tiến độ học tập và chứng chỉ được lưu như thế nào?
                            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3v10M3 8h10"></path></svg>
                        </summary>
                        <p>Khi tài khoản có quyền học một khóa đã xuất bản, tiến độ được lưu theo tài khoản. Chứng chỉ chỉ được cấp khi hệ thống xác nhận bạn đáp ứng các điều kiện hoàn thành.</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- 7. Bottom CTA Section -->
        <section class="edn-im-cta">
            <div class="edn-im-shell edn-im-cta-inner">
                <div>
                    <h2>Chọn điều bạn muốn học tiếp theo.</h2>
                    <p>Khám phá lĩnh vực phù hợp và tìm chương trình giúp bạn tiến gần hơn tới mục tiêu của mình.</p>
                </div>
                <a class="edn-im-button-primary" href="#/courses">
                    Tìm khóa học phù hợp <?php echo $arrow_svg; ?>
                </a>
            </div>
        </section>
    </div>

    <noscript>
        <div class="wrap page edn-noscript-note">
            <p>Trình duyệt của bạn đang tắt JavaScript. Bạn vẫn có thể xem toàn bộ đề cương và thông tin khóa học trên trang này.</p>
        </div>
    </noscript>
</main>

<?php
get_footer();
