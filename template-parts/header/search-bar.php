<?php
/**
 * Header Search Bar Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<form class="sf lms-search edunext-header-search" data-form="search" role="search">
    <button type="submit" class="lms-search-icon" aria-label="Tìm kiếm"></button>
    <input name="q" placeholder="Tìm khóa học hoặc lĩnh vực..." aria-label="Tìm khóa học hoặc lĩnh vực" autocomplete="off">
    <div class="edn-live-search-dropdown" id="edn-live-search-dropdown" hidden></div>
</form>

