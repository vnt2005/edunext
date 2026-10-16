<?php
/**
 * Course Catalog Filter Bar Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$active_tab = $args['active_tab'] ?? 'all';
?>
<div class="edn-courses-filter-bar" role="toolbar" aria-label="Bộ lọc chuyên ngành">
    <button type="button" class="edn-course-filter-pill <?php echo $active_tab === 'all' ? 'is-active' : ''; ?>" data-category="all">
        Tất cả khóa học
    </button>
    <button type="button" class="edn-course-filter-pill <?php echo $active_tab === 'cntt' ? 'is-active' : ''; ?>" data-category="cntt">
        Công nghệ thông tin
    </button>
    <button type="button" class="edn-course-filter-pill <?php echo $active_tab === 'thiet-ke' ? 'is-active' : ''; ?>" data-category="thiet-ke">
        Thiết kế & Sáng tạo
    </button>
    <button type="button" class="edn-course-filter-pill <?php echo $active_tab === 'marketing' ? 'is-active' : ''; ?>" data-category="marketing">
        Marketing & Kinh doanh
    </button>
</div>

