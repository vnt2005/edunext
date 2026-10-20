<?php
/**
 * Course Query Functions - Powered by EduNext Native Database (WordPress CPT & Meta)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_all_courses(): array {
    return edunext_db_get_all_courses(false);
}

function edunext_get_ready_courses(): array {
    return edunext_db_get_all_courses(true);
}

function edunext_get_courses_by_domain(string $domain_id): array {
    return array_values(array_filter(edunext_get_ready_courses(), function ($course) use ($domain_id) {
        return isset($course['domainId']) && $course['domainId'] === $domain_id;
    }));
}
