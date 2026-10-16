<?php
/**
 * Common Glow Badge Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$text = $args['text'] ?? 'EduNext';
$dot = $args['dot'] ?? true;
?>
<div class="edn-jiro-badge">
    <?php if ($dot) : ?>
        <span class="edn-jiro-badge-dot" aria-hidden="true"></span>
    <?php endif; ?>
    <span><?php echo esc_html($text); ?></span>
</div>

