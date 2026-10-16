<?php
/**
 * Verified Certificate Item Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$cert = $args['cert'] ?? [];
$code = $cert['code'] ?? 'EDN-CERT-2026';
$course_title = $cert['course_title'] ?? 'Khóa học thực chiến EduNext';
$date = $cert['date'] ?? wp_date('d/m/Y');
?>
<div class="edn-cert-card">
    <div class="edn-cert-icon">🎓</div>
    <div class="edn-cert-details">
        <h4><?php echo esc_html($course_title); ?></h4>
        <p>Mã định danh: <code><?php echo esc_html($code); ?></code> · Cấp ngày: <?php echo esc_html($date); ?></p>
    </div>
    <a href="#/cert/<?php echo esc_attr(sanitize_title($code)); ?>" class="btn btn-outline btn-s">Xem chứng chỉ</a>
</div>

