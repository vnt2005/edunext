<?php
/**
 * Field / Category Card Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$domain = $args['domain'] ?? null;
if (!$domain || !is_array($domain)) {
    return;
}

$domain_id = $domain['id'] ?? '';
$name = $domain['name'] ?? '';
$major_count = count($domain['majors'] ?? []);
$courses_count = 0;
foreach ($domain['majors'] ?? [] as $m) {
    $courses_count += count($m['courses'] ?? []);
}
?>
<a class="edn-category-card group" href="#/domain/<?php echo esc_attr($domain_id); ?>">
    <div class="edn-cat-top">
        <div class="edn-cat-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <span class="edn-cat-arrow" aria-hidden="true">↗</span>
    </div>
    <div class="edn-cat-body">
        <h3><?php echo esc_html($name); ?></h3>
        <p><?php echo esc_html($major_count); ?> chuyên ngành · <?php echo esc_html($courses_count > 0 ? $courses_count . ' chương trình' : 'Đang cập nhật'); ?></p>
    </div>
</a>

