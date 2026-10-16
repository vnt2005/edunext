<?php
/**
 * Common Star Rating Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$score = $args['score'] ?? '4.9';
$reviews_count = $args['reviews'] ?? null;
?>
<div class="edn-star-rating" aria-label="Đánh giá <?php echo esc_attr($score); ?> sao">
    <span class="edn-stars-icon">★★★★★</span>
    <strong class="edn-rating-score"><?php echo esc_html($score); ?></strong>
    <?php if ($reviews_count) : ?>
        <small class="edn-reviews-count">(<?php echo esc_html($reviews_count); ?> đánh giá)</small>
    <?php endif; ?>
</div>

