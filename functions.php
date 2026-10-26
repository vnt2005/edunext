<?php
/**
 * EduNext Theme Functions and Definitions
 *
 * Standardized WordPress theme architecture:
 * - inc/setup.php: Theme supports and setup
 * - inc/queries/db-queries.php: Native WordPress Database Queries for Courses & Fields
 * - inc/helpers.php: Catalog queries, images, and validation helpers
 * - inc/features/student-account.php: Account, auth, and profile AJAX handlers
 * - inc/features/learning-progress.php: Progress tracking and certificate issuance
 * - inc/features/contact.php: Contact settings and Customizer integration
 * - inc/enqueue-assets.php: Assets loading and frontend localization
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once get_theme_file_path('inc/security.php');
require_once get_theme_file_path('inc/setup.php');
require_once get_theme_file_path('inc/queries/db-queries.php');
require_once get_theme_file_path('inc/helpers.php');
require_once get_theme_file_path('inc/queries/courses.php');
require_once get_theme_file_path('inc/queries/fields.php');
require_once get_theme_file_path('inc/queries/blog.php');
require_once get_theme_file_path('inc/queries/learning.php');
require_once get_theme_file_path('inc/template-functions.php');
require_once get_theme_file_path('inc/template-tags.php');
require_once get_theme_file_path('inc/features/search.php');
require_once get_theme_file_path('inc/features/contact.php');
require_once get_theme_file_path('inc/features/cart.php');
require_once get_theme_file_path('inc/features/checkout.php');
require_once get_theme_file_path('inc/features/student-account.php');
require_once get_theme_file_path('inc/features/learning-progress.php');
require_once get_theme_file_path('inc/enqueue-assets.php');
