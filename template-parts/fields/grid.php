<?php
/**
 * Fields Grid Component
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$domains = $args['domains'] ?? edunext_get_all_fields();
?>
<div class="edn-top-categories-grid">
    <?php
    foreach ($domains as $domain) {
        get_template_part('template-parts/fields/field-card', null, ['domain' => $domain]);
    }
    ?>
</div>

