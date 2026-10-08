<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * EduNext WordPress administration layer.
 *
 * The public website remains in the theme, while platform management lives
 * inside wp-admin using real WordPress users, roles, capabilities and posts.
 */

function edunext_sync_roles(): void {
    $teacher_caps = [
        'read' => true,
        'upload_files' => true,
        'edit_edunext_course' => true,
        'read_edunext_course' => true,
        'delete_edunext_course' => true,
        'edit_edunext_courses' => true,
        'edit_others_edunext_courses' => false,
        'publish_edunext_courses' => true,
        'read_private_edunext_courses' => true,
        'delete_edunext_courses' => true,
        'delete_private_edunext_courses' => true,
        'delete_published_edunext_courses' => true,
        'delete_others_edunext_courses' => false,
        'view_edunext_reports' => true,
    ];

    $student_caps = [
        'read' => true,
    ];

    $teacher = get_role('teacher');
    if (!$teacher) {
        add_role('teacher', 'Giảng viên', $teacher_caps);
    } else {
        foreach ($teacher_caps as $cap => $grant) {
            $teacher->add_cap($cap, $grant);
        }
    }

    if (!get_role('student')) {
        add_role('student', 'Học viên', $student_caps);
    }

    $administrator = get_role('administrator');
    if ($administrator) {
        $admin_caps = [
            'manage_edunext' => true,
            'manage_edunext_users' => true,
            'view_edunext_reports' => true,
            'edit_edunext_course' => true,
            'read_edunext_course' => true,
            'delete_edunext_course' => true,
            'edit_edunext_courses' => true,
            'edit_others_edunext_courses' => true,
            'publish_edunext_courses' => true,
            'delete_edunext_courses' => true,
            'delete_others_edunext_courses' => true,
            'delete_private_edunext_courses' => true,
            'delete_published_edunext_courses' => true,
            'read_private_edunext_courses' => true,
        ];

        foreach ($admin_caps as $cap => $grant) {
            $administrator->add_cap($cap, $grant);
        }
    }
}
add_action('init', 'edunext_sync_roles', 5);

function edunext_register_course_content(): void {
    register_taxonomy(
        'edunext_course_category',
        ['edunext_course'],
        [
            'labels' => [
                'name' => 'Danh mục khóa học',
                'singular_name' => 'Danh mục',
                'search_items' => 'Tìm danh mục',
                'all_items' => 'Tất cả danh mục',
                'edit_item' => 'Sửa danh mục',
                'add_new_item' => 'Thêm danh mục',
                'menu_name' => 'Danh mục',
            ],
            'public' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'hierarchical' => true,
            'rewrite' => false,
        ]
    );

    register_post_type(
        'edunext_course',
        [
            'labels' => [
                'name' => 'Khóa học',
                'singular_name' => 'Khóa học',
                'menu_name' => 'Khóa học',
                'add_new' => 'Thêm khóa học',
                'add_new_item' => 'Thêm khóa học',
                'edit_item' => 'Sửa khóa học',
                'new_item' => 'Khóa học mới',
                'view_item' => 'Xem khóa học',
                'search_items' => 'Tìm khóa học',
                'not_found' => 'Chưa có khóa học',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions'],
            'taxonomies' => ['edunext_course_category'],
            'capability_type' => ['edunext_course', 'edunext_courses'],
            'map_meta_cap' => true,
            'has_archive' => false,
            'query_var' => false,
        ]
    );
}
add_action('init', 'edunext_register_course_content');

function edunext_course_meta_box(): void {
    add_meta_box(
        'edunext_course_details',
        'Thông tin khóa học',
        'edunext_render_course_meta_box',
        'edunext_course',
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'edunext_course_meta_box');

function edunext_render_course_meta_box(WP_Post $post): void {
    wp_nonce_field('edunext_save_course', 'edunext_course_nonce');

    $price = get_post_meta($post->ID, '_edunext_price', true);
    $original_price = get_post_meta($post->ID, '_edunext_original_price', true);
    $level = get_post_meta($post->ID, '_edunext_level', true);
    $hours = get_post_meta($post->ID, '_edunext_hours', true);
    ?>
    <p>
        <label for="edunext_price"><strong>Giá hiện tại</strong></label>
        <input id="edunext_price" name="edunext_price" type="number" min="0" step="1000" value="<?php echo esc_attr($price); ?>" style="width:100%;">
    </p>
    <p>
        <label for="edunext_original_price"><strong>Giá gốc</strong></label>
        <input id="edunext_original_price" name="edunext_original_price" type="number" min="0" step="1000" value="<?php echo esc_attr($original_price); ?>" style="width:100%;">
    </p>
    <p>
        <label for="edunext_level"><strong>Cấp độ</strong></label>
        <select id="edunext_level" name="edunext_level" style="width:100%;">
            <?php foreach (['Cơ bản', 'Trung cấp', 'Nâng cao'] as $option) : ?>
                <option value="<?php echo esc_attr($option); ?>" <?php selected($level, $option); ?>><?php echo esc_html($option); ?></option>
            <?php endforeach; ?>
        </select>
    </p>
    <p>
        <label for="edunext_hours"><strong>Thời lượng (giờ)</strong></label>
        <input id="edunext_hours" name="edunext_hours" type="number" min="0" step="0.5" value="<?php echo esc_attr($hours); ?>" style="width:100%;">
    </p>
    <?php
}

function edunext_save_course_meta(int $post_id): void {
    if (
        !isset($_POST['edunext_course_nonce']) ||
        !wp_verify_nonce(
            sanitize_text_field(wp_unslash($_POST['edunext_course_nonce'])),
            'edunext_save_course'
        )
    ) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (wp_is_post_revision($post_id)) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'edunext_price' => '_edunext_price',
        'edunext_original_price' => '_edunext_original_price',
        'edunext_level' => '_edunext_level',
        'edunext_hours' => '_edunext_hours',
    ];

    foreach ($fields as $input => $meta_key) {
        if (!isset($_POST[$input])) {
            continue;
        }

        $value = wp_unslash($_POST[$input]);
        $value = in_array($input, ['edunext_price', 'edunext_original_price', 'edunext_hours'], true)
            ? (float) $value
            : sanitize_text_field($value);

        update_post_meta($post_id, $meta_key, $value);
    }
}
add_action('save_post_edunext_course', 'edunext_save_course_meta');

function edunext_admin_menu(): void {
    add_menu_page(
        'EduNext',
        'EduNext',
        'edit_edunext_courses',
        'edunext',
        'edunext_render_dashboard',
        'dashicons-welcome-learn-more',
        3
    );

    add_submenu_page(
        'edunext',
        'Bảng điều khiển',
        'Bảng điều khiển',
        'edit_edunext_courses',
        'edunext',
        'edunext_render_dashboard'
    );

    add_submenu_page(
        'edunext',
        'Khóa học',
        'Khóa học',
        'edit_edunext_courses',
        'edunext-courses',
        'edunext_redirect_to_courses'
    );

    if (current_user_can('manage_edunext_users')) {
        add_submenu_page(
            'edunext',
            'Học viên',
            'Học viên',
            'manage_edunext_users',
            'users.php?role=student'
        );

        add_submenu_page(
            'edunext',
            'Giảng viên',
            'Giảng viên',
            'manage_edunext_users',
            'users.php?role=teacher'
        );
    }

    add_submenu_page(
        'edunext',
        'Báo cáo',
        'Báo cáo',
        'view_edunext_reports',
        'edunext-reports',
        'edunext_render_reports'
    );
}
function edunext_redirect_to_courses(): void {
    if (!current_user_can('edit_edunext_courses')) {
        wp_die('Bạn không có quyền quản lý khóa học.');
    }

    wp_safe_redirect(admin_url('edit.php?post_type=edunext_course'));
    exit;
}

add_action('admin_menu', 'edunext_admin_menu', 20);

function edunext_render_dashboard(): void {
    if (!current_user_can('edit_edunext_courses')) {
        wp_die('Bạn không có quyền truy cập khu vực EduNext.');
    }

    $course_counts = wp_count_posts('edunext_course');
    $published_courses = isset($course_counts->publish) ? (int) $course_counts->publish : 0;
    $draft_courses = isset($course_counts->draft) ? (int) $course_counts->draft : 0;

    $student_query = new WP_User_Query([
        'role' => 'student',
        'fields' => 'ID',
        'number' => 1,
        'count_total' => true,
    ]);
    $teacher_query = new WP_User_Query([
        'role' => 'teacher',
        'fields' => 'ID',
        'number' => 1,
        'count_total' => true,
    ]);

    $students = (int) $student_query->get_total();
    $teachers = (int) $teacher_query->get_total();

    $is_teacher = !current_user_can('manage_edunext_users');
    $recent_args = [
        'post_type' => 'edunext_course',
        'post_status' => ['publish', 'draft', 'pending'],
        'posts_per_page' => 6,
        'orderby' => 'date',
        'order' => 'DESC',
    ];

    if ($is_teacher) {
        $recent_args['author'] = get_current_user_id();
    }

    $recent_courses = get_posts($recent_args);
    ?>
    <div class="wrap edunext-admin">
        <div class="edunext-admin-hero">
            <div>
                <span class="edunext-kicker"><?php echo $is_teacher ? 'Teacher Workspace' : 'Admin Workspace'; ?></span>
                <h1><?php echo $is_teacher ? 'Xin chào, ' . esc_html(wp_get_current_user()->display_name) : 'Tổng quan EduNext'; ?></h1>
                <p>
                    <?php
                    echo $is_teacher
                        ? 'Quản lý khóa học của bạn trực tiếp trong WordPress.'
                        : 'Quản lý nội dung và tài khoản nền tảng ngay trong wp-admin.';
                    ?>
                </p>
            </div>
            <a class="button button-primary edunext-hero-button" href="<?php echo esc_url(home_url('/')); ?>" target="_blank" rel="noopener">Xem website</a>
        </div>

        <div class="edunext-stat-grid">
            <div class="edunext-stat-card">
                <span>Khóa học xuất bản</span>
                <strong><?php echo esc_html($published_courses); ?></strong>
            </div>
            <div class="edunext-stat-card">
                <span>Khóa học bản nháp</span>
                <strong><?php echo esc_html($draft_courses); ?></strong>
            </div>
            <?php if (!$is_teacher) : ?>
                <div class="edunext-stat-card">
                    <span>Học viên</span>
                    <strong><?php echo esc_html($students); ?></strong>
                </div>
                <div class="edunext-stat-card">
                    <span>Giảng viên</span>
                    <strong><?php echo esc_html($teachers); ?></strong>
                </div>
            <?php else : ?>
                <div class="edunext-stat-card">
                    <span>Khóa học của tôi</span>
                    <strong><?php echo esc_html(count($recent_courses)); ?></strong>
                </div>
                <div class="edunext-stat-card">
                    <span>Tài khoản</span>
                    <strong>Teacher</strong>
                </div>
            <?php endif; ?>
        </div>

        <div class="edunext-admin-grid">
            <section class="edunext-panel">
                <div class="edunext-panel-head">
                    <div>
                        <h2><?php echo $is_teacher ? 'Khóa học của tôi' : 'Khóa học gần đây'; ?></h2>
                        <p><?php echo $is_teacher ? 'Các khóa học bạn đang phụ trách.' : 'Các khóa học mới được tạo hoặc cập nhật.'; ?></p>
                    </div>
                    <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=edunext_course')); ?>">Thêm khóa học</a>
                </div>

                <?php if ($recent_courses) : ?>
                    <div class="edunext-course-list">
                        <?php foreach ($recent_courses as $course) :
                            $price = get_post_meta($course->ID, '_edunext_price', true);
                            $level = get_post_meta($course->ID, '_edunext_level', true);
                            $status_label = $course->post_status === 'publish' ? 'Đang xuất bản' : 'Bản nháp';
                            ?>
                            <div class="edunext-course-row">
                                <div class="edunext-course-avatar"><?php echo esc_html(substr(wp_strip_all_tags(get_the_title($course)), 0, 1)); ?></div>
                                <div class="edunext-course-main">
                                    <strong><?php echo esc_html(get_the_title($course)); ?></strong>
                                    <span><?php echo esc_html($level ?: 'Chưa đặt cấp độ'); ?></span>
                                </div>
                                <div class="edunext-course-meta">
                                    <span><?php echo esc_html($price !== '' ? number_format((float) $price, 0, ',', '.') . 'đ' : 'Chưa đặt giá'); ?></span>
                                    <span class="edunext-status <?php echo $course->post_status === 'publish' ? 'is-live' : 'is-draft'; ?>"><?php echo esc_html($status_label); ?></span>
                                </div>
                                <a href="<?php echo esc_url(get_edit_post_link($course->ID)); ?>" class="button">Quản lý</a>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else : ?>
                    <div class="edunext-empty">
                        <strong>Chưa có khóa học nào.</strong>
                        <span>Tạo khóa học đầu tiên để bắt đầu quản lý nội dung EduNext.</span>
                        <a class="button button-primary" href="<?php echo esc_url(admin_url('post-new.php?post_type=edunext_course')); ?>">Tạo khóa học</a>
                    </div>
                <?php endif; ?>
            </section>

            <aside class="edunext-panel edunext-panel-side">
                <h2>Truy cập nhanh</h2>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=edunext_course')); ?>"><span>Khóa học</span><b>→</b></a>
                <?php if (!$is_teacher) : ?>
                    <a href="<?php echo esc_url(admin_url('users.php?role=teacher')); ?>"><span>Giảng viên</span><b>→</b></a>
                    <a href="<?php echo esc_url(admin_url('users.php?role=student')); ?>"><span>Học viên</span><b>→</b></a>
                <?php endif; ?>
                <a href="<?php echo esc_url(admin_url('profile.php')); ?>"><span>Tài khoản của tôi</span><b>→</b></a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=edunext-reports')); ?>"><span>Báo cáo</span><b>→</b></a>
            </aside>
        </div>
    </div>
    <?php
}

function edunext_render_reports(): void {
    if (!current_user_can('view_edunext_reports')) {
        wp_die('Bạn không có quyền truy cập báo cáo.');
    }

    $course_counts = wp_count_posts('edunext_course');
    $categories = get_terms([
        'taxonomy' => 'edunext_course_category',
        'hide_empty' => false,
    ]);
    ?>
    <div class="wrap edunext-admin">
        <div class="edunext-panel edunext-report-header">
            <span class="edunext-kicker">Reports</span>
            <h1>Báo cáo khóa học</h1>
            <p>Theo dõi nhanh nội dung đang có trong hệ thống. Phần doanh thu và đơn hàng sẽ dùng dữ liệu WordPress riêng khi module thanh toán được kết nối.</p>
        </div>

        <div class="edunext-stat-grid edunext-stat-grid-small">
            <div class="edunext-stat-card">
                <span>Tổng khóa học</span>
                <strong><?php echo esc_html(
                    (int) ($course_counts->publish ?? 0)
                    + (int) ($course_counts->draft ?? 0)
                    + (int) ($course_counts->pending ?? 0)
                ); ?></strong>
            </div>
            <div class="edunext-stat-card">
                <span>Đang xuất bản</span>
                <strong><?php echo esc_html((int) ($course_counts->publish ?? 0)); ?></strong>
            </div>
            <div class="edunext-stat-card">
                <span>Bản nháp</span>
                <strong><?php echo esc_html((int) ($course_counts->draft ?? 0)); ?></strong>
            </div>
        </div>

        <div class="edunext-panel">
            <div class="edunext-panel-head">
                <div>
                    <h2>Danh mục khóa học</h2>
                    <p>Số lượng nội dung trong từng danh mục.</p>
                </div>
            </div>
            <div class="edunext-report-list">
                <?php if ($categories && !is_wp_error($categories)) : ?>
                    <?php foreach ($categories as $category) : ?>
                        <div>
                            <span><?php echo esc_html($category->name); ?></span>
                            <strong><?php echo esc_html($category->count); ?></strong>
                        </div>
                    <?php endforeach; ?>
                <?php else : ?>
                    <div class="edunext-empty-inline">Chưa có danh mục khóa học.</div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
}

function edunext_admin_styles(string $hook): void {
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;

    $allowed = [
        'toplevel_page_edunext',
        'edunext_page_edunext-reports',
        'edit-edunext_course',
        'edunext_course',
    ];

    if (!$screen || !in_array($screen->id, $allowed, true)) {
        return;
    }

    wp_enqueue_style(
        'edunext-admin',
        get_theme_file_uri('assets/css/admin.css'),
        [],
        '3.0'
    );
}
add_action('admin_enqueue_scripts', 'edunext_admin_styles');

function edunext_admin_body_class(string $classes): string {
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;

    if ($screen && in_array($screen->id, ['toplevel_page_edunext', 'edunext_page_edunext-reports', 'edit-edunext_course', 'edunext_course'], true)) {
        $classes .= ' edunext-admin-screen';
    }

    return $classes;
}
add_filter('admin_body_class', 'edunext_admin_body_class');

function edunext_restrict_teacher_menu(): void {
    if (!current_user_can('manage_edunext_users') && current_user_can('edit_edunext_courses')) {
        remove_menu_page('edit.php');
        remove_menu_page('upload.php');
        remove_menu_page('edit-comments.php');
        remove_menu_page('tools.php');
        remove_menu_page('options-general.php');
    }
}
add_action('admin_menu', 'edunext_restrict_teacher_menu', 999);

function edunext_restrict_teacher_courses(WP_Query $query): void {
    if (!is_admin() || !$query->is_main_query()) {
        return;
    }

    if ($query->get('post_type') !== 'edunext_course') {
        return;
    }

    if (!current_user_can('edit_others_edunext_courses')) {
        $query->set('author', get_current_user_id());
    }
}
add_action('pre_get_posts', 'edunext_restrict_teacher_courses');

