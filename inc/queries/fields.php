<?php
/**
 * Fields / Categories Query Functions - Powered by EduNext Native Database (edunext_field Taxonomy)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_all_fields(): array {
    return edunext_db_get_all_fields();
}

function edunext_get_field_by_id(string $domain_id): ?array {
    foreach (edunext_get_all_fields() as $domain) {
        if (isset($domain['id']) && $domain['id'] === $domain_id) {
            return $domain;
        }
    }
    return null;
}
