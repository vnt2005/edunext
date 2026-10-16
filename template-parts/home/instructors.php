<?php
/**
 * Template Part: Home Instructors / Mentors Section
 *
 * @package EduNext
 */

if (!defined('ABSPATH')) {
    exit;
}

$instructors = [
    [
        'name' => 'Nguyễn Văn Minh',
        'role' => 'Senior .NET Architect',
        'org' => 'VNG',
        'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        'rating' => '4.95',
        'students' => '3.500+ học viên',
    ],
    [
        'name' => 'Trần Thu Trang',
        'role' => 'Head of Product Design',
        'org' => 'Tiki',
        'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
        'rating' => '4.95',
        'students' => '3.500+ học viên',
    ],
    [
        'name' => 'Lê Hoàng Nam',
        'role' => 'Lead Data Scientist',
        'org' => 'FPT Software',
        'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        'rating' => '4.95',
        'students' => '3.500+ học viên',
    ],
    [
        'name' => 'Đặng Mai Phương',
        'role' => 'Growth Marketing Lead',
        'org' => 'Shopee',
        'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        'rating' => '4.95',
        'students' => '3.500+ học viên',
    ],
];
?>

<section class="edn-im-instructors">
    <div class="edn-im-shell">
        <div class="edn-im-section-heading">
            <div>
                <span class="edn-hero-badge"><span class="edn-badge-dot"></span> Đội ngũ chuyên gia</span>
                <h2>Giảng viên hàng đầu ngành</h2>
                <p>Học hỏi trực tiếp từ các Tech Lead, Principal Engineer và Head of Product tại các tập đoàn công nghệ lớn.</p>
            </div>
        </div>

        <div class="edn-mentors-grid">
            <?php foreach ($instructors as $inst): ?>
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
