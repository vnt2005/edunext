<?php
/**
 * Fields / Categories Query Functions
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_all_fields(): array {
    $catalog = edunext_catalog_data();
    return $catalog['domains'] ?? [];
}

function edunext_get_field_by_id(string $domain_id): ?array {
    foreach (edunext_get_all_fields() as $domain) {
        if (isset($domain['id']) && $domain['id'] === $domain_id) {
            return $domain;
        }
    }
    return null;
}

