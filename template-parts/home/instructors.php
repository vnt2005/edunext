<?php
/**
 * Template Part: Home Instructors / Mentors Section
 *
 * Powered by EduNext Native Database (edunext_instructor CPT)
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$instructors = function_exists('edunext_db_get_all_instructors') ? edunext_db_get_all_instructors() : [];

if (empty($instructors)) {
    $instructors = [
        [
            'name' => 'Nguyễn Thị Ánh',
            'role' => 'Senior .NET Architect',
            'org' => 'VNG',
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
            'rating' => '4.50',
            'students' => '500+ học viên',
        ],
        [
            'name' => 'Trần Thu Trang',
            'role' => 'Head of Product Design',
            'org' => 'Tiki',
            'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
            'rating' => '4.45',
            'students' => '400+ học viên',
        ],
        [
            'name' => 'Lê Hoàng Nam',
            'role' => 'Lead Data Scientist',
            'org' => 'FPT Software',
            'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
            'rating' => '4.60',
            'students' => '1000+ học viên',
        ],
        [
            'name' => 'Đặng Mai Phương',
            'role' => 'Growth Marketing Lead',
            'org' => 'Shopee',
            'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
            'rating' => '4.95',
            'students' => '2000+ học viên',
        ],
    ];
}

$display_instructors = array_slice($instructors, 0, 4);
?>

<section class="edn-im-instructors">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Đội ngũ chuyên gia</span>
                <h2>Giảng Viên</h2>
            </div>
        </div>

        <div class="edn-mentors-grid">
            <?php foreach ($display_instructors as $inst): ?>
                <article class="edn-mentor-card">
                    <div class="edn-mentor-avatar">
                        <img src="<?php echo esc_url($inst['avatar']); ?>" alt="<?php echo esc_attr($inst['name']); ?>" loading="lazy">
                        <span class="edn-mentor-badge">✓ Verified</span>
                    </div>
                    <div class="edn-mentor-info">
                        <h3><?php echo esc_html($inst['name']); ?></h3>
                        <p class="edn-mentor-role"><?php echo esc_html($inst['role']); ?></p>
                        <div class="edn-mentor-org">
                            <span class="edn-org-pill"><?php echo esc_html($inst['org']); ?></span>
                        </div>
                    </div>
                    <div class="edn-mentor-metrics">
                        <span>★ <?php echo esc_html($inst['rating']); ?></span>
                        <span><?php echo esc_html($inst['students']); ?></span>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
