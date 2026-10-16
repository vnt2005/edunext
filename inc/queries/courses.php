<?php
/**
 * Course Query Functions
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_all_courses(): array {
    $catalog = edunext_catalog_data();
    return $catalog['courses'] ?? [];
}

function edunext_get_ready_courses(): array {
    return array_values(array_filter(edunext_get_all_courses(), 'edunext_course_is_ready'));
}

function edunext_get_courses_by_domain(string $domain_id): array {
    return array_values(array_filter(edunext_get_ready_courses(), function ($course) use ($domain_id) {
        return isset($course['domainId']) && $course['domainId'] === $domain_id;
    }));
}

