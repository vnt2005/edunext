<?php
/**
 * Database Query Functions for EduNext Native Architecture
 *
 * Replaces JSON file reading with direct WordPress Database queries (CPT & Meta).
 */

if (!defined('ABSPATH')) {
    exit;
}

function edunext_db_get_all_fields(): array {
    $terms = get_terms([
        'taxonomy'   => 'edunext_field',
        'hide_empty' => false,
    ]);

    if (is_wp_error($terms) || empty($terms)) {
        return [];
    }

    $fields = [];
    foreach ($terms as $t) {
        $domain_id = get_term_meta($t->term_id, '_edunext_domain_id', true) ?: $t->slug;
        $image = get_term_meta($t->term_id, '_edunext_image', true);
        $fields[] = [
            'id'          => $domain_id,
            'name'        => $t->name,
            'slug'        => $t->slug,
            'description' => $t->description,
            'image'       => $image ?: '',
        ];
    }

    return $fields;
}

function edunext_db_get_all_courses(bool $ready_only = false): array {
    $args = [
        'post_type'      => 'edunext_course',
        'post_status'    => $ready_only ? 'publish' : ['publish', 'draft'],
        'posts_per_page' => -1,
        'orderby'        => 'ID',
        'order'          => 'ASC',
    ];

    $query = new WP_Query($args);
    $courses = [];

    if ($query->have_posts()) {
        foreach ($query->posts as $p) {
            $course = edunext_format_course_post($p);
            if ($course) {
                if ($ready_only && !edunext_course_is_ready($course)) {
                    continue;
                }
                $courses[] = $course;
            }
        }
    }

    return $courses;
}

function edunext_get_course_by_catalog_id(string $catalog_id): ?array {
    $query = new WP_Query([
        'post_type'      => 'edunext_course',
        'post_status'    => 'any',
        'meta_key'       => '_edunext_catalog_id',
        'meta_value'     => $catalog_id,
        'posts_per_page' => 1,
    ]);

    if (!$query->have_posts()) {
        return null;
    }

    return edunext_format_course_post($query->posts[0]);
}

function edunext_format_course_post(WP_Post $p): array {
    $catalog_id = get_post_meta($p->ID, '_edunext_catalog_id', true) ?: $p->post_name;
    $terms = wp_get_post_terms($p->ID, 'edunext_field');
    $domain_id = '';
    $domain_name = '';
    if (!empty($terms) && !is_wp_error($terms)) {
        $domain_id = get_term_meta($terms[0]->term_id, '_edunext_domain_id', true) ?: $terms[0]->slug;
        $domain_name = $terms[0]->name;
    }

    // Retrieve lessons
    $lessons_query = new WP_Query([
        'post_type'      => 'edunext_lesson',
        'post_status'    => 'publish',
        'meta_key'       => '_edunext_course_catalog_id',
        'meta_value'     => $catalog_id,
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    ]);

    $lessons = [];
    if ($lessons_query->have_posts()) {
        foreach ($lessons_query->posts as $lp) {
            $lessons[] = [
                'id'          => get_post_meta($lp->ID, '_edunext_lesson_id', true) ?: (string)$lp->ID,
                'order'       => $lp->menu_order,
                'title'       => $lp->post_title,
                'content'     => $lp->post_content,
                'videoUrl'    => get_post_meta($lp->ID, '_edunext_video_url', true) ?: '',
                'exercise'    => get_post_meta($lp->ID, '_edunext_exercise', true) ?: '',
                'image'       => get_post_meta($lp->ID, '_edunext_image', true) ?: '',
            ];
        }
    }

    return [
        'id'               => $catalog_id,
        'code'             => get_post_meta($p->ID, '_edunext_code', true) ?: '',
        'title'            => $p->post_title,
        'slug'             => $p->post_name,
        'domainId'         => $domain_id,
        'domain'           => $domain_name,
        'description'      => $p->post_content,
        'shortDescription' => $p->post_excerpt,
        'price'            => (float) get_post_meta($p->ID, '_edunext_price', true),
        'originalPrice'    => (float) get_post_meta($p->ID, '_edunext_original_price', true),
        'level'            => get_post_meta($p->ID, '_edunext_level', true) ?: 'Tất cả cấp độ',
        'durationHours'    => (float) get_post_meta($p->ID, '_edunext_duration_hours', true),
        'previewVideoUrl'  => get_post_meta($p->ID, '_edunext_preview_video', true) ?: '',
        'audience'         => get_post_meta($p->ID, '_edunext_audience', true) ?: '',
        'prerequisites'    => get_post_meta($p->ID, '_edunext_prerequisites', true) ?: '',
        'outcomes'         => get_post_meta($p->ID, '_edunext_outcomes', true) ?: [],
        'metadataStatus'   => get_post_meta($p->ID, '_edunext_metadata_status', true) ?: 'verified',
        'published'        => $p->post_status === 'publish',
        'image'            => get_post_meta($p->ID, '_edunext_image', true) ?: '',
        'hasAiFlagship'    => (bool) get_post_meta($p->ID, '_edunext_has_ai_flagship', true),
        'lessons'          => $lessons,
    ];
}
