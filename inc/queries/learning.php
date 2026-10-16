<?php
/**
 * Learning and Progress Query Functions
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_get_student_courses(int $user_id): array {
    $owned_ids = get_user_meta($user_id, 'edunext_owned_course_ids', true);
    if (!is_array($owned_ids)) {
        return [];
    }

    $courses = [];
    foreach ($owned_ids as $course_id) {
        $c = edunext_catalog_course((string) $course_id);
        if ($c) {
            $courses[] = $c;
        }
    }
    return $courses;
}

