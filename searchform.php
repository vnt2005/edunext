<?php
/**
 * The template for displaying search forms
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<form role="search" method="get" class="edn-search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label>
        <span class="screen-reader-text"><?php echo esc_html_x('Tìm kiếm:', 'label', 'edunext'); ?></span>
        <input type="search" class="search-field" placeholder="<?php echo esc_attr_x('Tìm kiếm khóa học hoặc bài viết...', 'placeholder', 'edunext'); ?>" value="<?php echo get_search_query(); ?>" name="s" />
    </label>
    <button type="submit" class="search-submit" aria-label="Tìm kiếm">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </button>
</form>

