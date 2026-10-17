/**
 * EduNext Asset Generator
 * Generates custom, theme-consistent SVG illustration banners for:
 * - 50 Domains (assets/images/domains/<slug>.svg)
 * - 100 Courses (assets/images/courses/<id>.svg)
 * - 800 Lessons (assets/images/lessons/<course_id>-lesson-<order>.svg)
 *
 * Integrates flagship AI-generated JPGs where available.
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(THEME_DIR, 'assets', 'data', 'course-catalog.json');
const DOMAINS_DIR = path.join(THEME_DIR, 'assets', 'images', 'domains');
const COURSES_DIR = path.join(THEME_DIR, 'assets', 'images', 'courses');
const LESSONS_DIR = path.join(THEME_DIR, 'assets', 'images', 'lessons');

// Ensure output directories exist
[DOMAINS_DIR, COURSES_DIR, LESSONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Flagship AI images already created
const FLAGSHIP_IMAGES = {
  'csharp': 'assets/images/courses/csharp.jpg',
  'api': 'assets/images/courses/api.jpg',
  'xay-dung-ung-dung-voi-generative-ai-va-llm': 'assets/images/courses/xay-dung-ung-dung-voi-generative-ai-va-llm.jpg',
  'sql-server-va-sql-tu-co-ban-den-thuc-hanh': 'assets/images/courses/sql-server-va-sql-tu-co-ban-den-thuc-hanh.jpg',
  'autocad-2d-cho-ban-ve-ky-thuat': 'assets/images/courses/autocad-2d-cho-ban-ve-ky-thuat.jpg',
  'blender-3d-tu-modeling-den-rendering': 'assets/images/courses/blender-3d-tu-modeling-den-rendering.jpg',
  'lap-trinh-flutter-tu-dau': 'assets/images/courses/lap-trinh-flutter-tu-dau.jpg',
  'phat-trien-ung-dung-android-voi-kotlin': 'assets/images/courses/phat-trien-ung-dung-android-voi-kotlin.jpg',
  'english': 'assets/images/courses/english.jpg',
  'marketing': 'assets/images/courses/marketing.jpg',
  'data': 'assets/images/courses/data.jpg',
  'design': 'assets/images/courses/design.jpg'
};

// Curated unique Unsplash images for all 50 domains (no duplicates)
const DOMAIN_CURATED_PHOTOS = {
  'field-lap-trinh-va-phat-trien-phan-mem': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  'field-phat-trien-web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
  'field-phat-trien-ung-dung-di-dong': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
  'field-co-so-du-lieu': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
  'field-ai-va-machine-learning': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  'field-khoa-hoc-du-lieu-va-phan-tich-du-lieu': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  'field-an-ninh-mang': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
  'field-mang-may-tinh-va-he-thong': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
  'field-cloud-computing-va-devops': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  'field-kiem-thu-phan-mem': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
  'field-kien-truc-va-thiet-ke-phan-mem': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
  'field-phat-trien-game': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
  'field-blockchain-va-web3': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
  'field-iot-va-he-thong-nhung': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'field-ui-ux-va-thiet-ke-san-pham-so': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
  'field-thiet-ke-do-hoa': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  'field-thiet-ke-3d-va-kien-truc': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  'field-nhiep-anh': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
  'field-video-va-san-xuat-noi-dung': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
  'field-sang-tao-noi-dung-so': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
  'field-digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'field-content-marketing-va-copywriting': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
  'field-kinh-doanh-va-ban-hang': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  'field-thuong-mai-dien-tu': 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
  'field-quan-tri-doanh-nghiep': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'field-quan-ly-du-an': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
  'field-tai-chinh-va-dau-tu': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
  'field-ke-toan-va-kiem-toan': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
  'field-nhan-su': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
  'field-logistics-va-chuoi-cung-ung': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  'field-tieng-anh': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
  'field-ngoai-ngu-khac': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  'field-giao-duc-va-dao-tao': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  'field-ky-nang-mem': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'field-nang-suat-va-phat-trien-ca-nhan': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
  'field-tin-hoc-van-phong': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  'field-phan-tich-nghiep-vu': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
  'field-khoa-hoc-va-toan-hoc': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
  'field-ky-thuat-va-cong-nghe': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
  'field-khoi-nghiep': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
  'field-am-nhac': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
  'field-my-thuat-va-minh-hoa': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
  'field-thoi-trang': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
  'field-nau-an-va-am-thuc': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
  'field-suc-khoe-va-the-chat': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
  'field-lam-dep': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
  'field-bat-dong-san': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
  'field-phap-luat-va-tuan-thu': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  'field-nong-nghiep-va-moi-truong': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
  'field-du-lich-va-dich-vu': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'
};

// Color palettes for topics
const PALETTES = [
  { bg1: '#070b19', bg2: '#0d1b3e', accent: '#00f2fe', secondary: '#4facfe', glow: 'rgba(0, 242, 254, 0.4)' },
  { bg1: '#0a091e', bg2: '#1b1238', accent: '#a855f7', secondary: '#ec4899', glow: 'rgba(168, 85, 247, 0.4)' },
  { bg1: '#06131d', bg2: '#0b263b', accent: '#38bdf8', secondary: '#2dd4bf', glow: 'rgba(56, 189, 248, 0.4)' },
  { bg1: '#081412', bg2: '#0f2922', accent: '#10b981', secondary: '#34d399', glow: 'rgba(16, 185, 129, 0.4)' },
  { bg1: '#180d09', bg2: '#2d180f', accent: '#f59e0b', secondary: '#fb923c', glow: 'rgba(245, 158, 11, 0.4)' },
  { bg1: '#110a1f', bg2: '#20113c', accent: '#8b5cf6', secondary: '#c084fc', glow: 'rgba(139, 92, 246, 0.4)' },
  { bg1: '#190a12', bg2: '#2f1220', accent: '#f43f5e', secondary: '#fb7185', glow: 'rgba(244, 63, 94, 0.4)' },
  { bg1: '#07151e', bg2: '#0f2738', accent: '#06b6d4', secondary: '#22d3ee', glow: 'rgba(6, 182, 212, 0.4)' }
];

function getPalette(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return PALETTES[Math.abs(hash) % PALETTES.length];
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(str, max) {
  if (!str) return '';
  return str.length > max ? str.substring(0, max - 1) + '…' : str;
}

// Generate Domain SVG
function generateDomainSvg(domain) {
  const p = getPalette(domain.id);
  const title = escapeXml(domain.name);
  const num = String(domain.number || 1).padStart(2, '0');
  const topics = (domain.topics || []).slice(0, 4).map(escapeXml);
  const desc = escapeXml(truncate(domain.description || 'Chuyên ngành thực chiến', 80));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}" />
      <stop offset="100%" stop-color="${p.bg2}" />
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}" />
      <stop offset="100%" stop-color="${p.secondary}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <radialGradient id="nebula" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${p.bg1}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#bg)" />
  <rect width="800" height="450" fill="url(#nebula)" />
  <rect width="800" height="450" fill="url(#grid)" />

  <!-- Constellation Accent Lines -->
  <g opacity="0.3" stroke="${p.accent}" stroke-width="1" fill="none">
    <circle cx="680" cy="90" r="4" fill="${p.accent}" />
    <circle cx="730" cy="160" r="3" fill="${p.secondary}" />
    <circle cx="620" cy="180" r="2" fill="${p.accent}" />
    <circle cx="650" cy="270" r="4" fill="${p.secondary}" />
    <circle cx="720" cy="330" r="2" fill="${p.accent}" />
    <line x1="680" y1="90" x2="730" y2="160" />
    <line x1="730" y1="160" x2="620" y2="180" />
    <line x1="620" y1="180" x2="650" y2="270" />
    <line x1="650" y1="270" x2="720" y2="330" />
  </g>

  <!-- Glowing Geometric Aura -->
  <circle cx="680" cy="200" r="140" fill="none" stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" />
  <circle cx="680" cy="200" r="90" fill="none" stroke="${p.secondary}" stroke-width="1" opacity="0.3" />

  <!-- Left Content Block -->
  <!-- Domain Badge -->
  <rect x="60" y="55" width="145" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="${p.accent}" stroke-width="1.2" />
  <circle cx="78" cy="71" r="4" fill="${p.accent}" />
  <text x="92" y="77" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="12" font-weight="700" fill="${p.accent}" letter-spacing="1.5">LĨNH VỰC ${num}</text>

  <!-- Big Title -->
  <text x="60" y="145" font-family="'Be Vietnam Pro', sans-serif" font-size="34" font-weight="800" fill="#ffffff" width="560">
    ${title}
  </text>

  <!-- Subtitle -->
  <text x="60" y="185" font-family="'Be Vietnam Pro', sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.7)">
    ${desc}
  </text>

  <!-- Topic Pills -->
  <g transform="translate(60, 235)">
    ${topics.map((t, idx) => `
      <g transform="translate(${idx * 130}, 0)">
        <rect width="120" height="34" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
        <text x="60" y="21" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="500" fill="rgba(255,255,255,0.85)" text-anchor="middle">${t}</text>
      </g>
    `).join('')}
  </g>

  <!-- Footer Brand -->
  <line x1="60" y1="385" x2="740" y2="385" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  <text x="60" y="415" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="url(#acc)" letter-spacing="2">EDUNEXT · HỆ SINH THÁI KHÓA HỌC THỰC CHIẾN</text>
  <text x="740" y="415" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="500" fill="rgba(255,255,255,0.4)" text-anchor="end">Chuẩn kỹ năng số 2026</text>
</svg>`;
}

// Generate Course SVG
function generateCourseSvg(course) {
  const p = getPalette(course.id);
  const title = escapeXml(course.title);
  const domainName = escapeXml(course.domain || 'Công nghệ thực chiến');
  const code = escapeXml(course.code || '1.1');
  const lessonsCount = Array.isArray(course.lessons) ? course.lessons.length : 8;
  const level = escapeXml(course.level || 'Thực chiến');
  const duration = course.durationHours ? `${course.durationHours} giờ học` : `${lessonsCount} bài giảng`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="c_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}" />
      <stop offset="100%" stop-color="${p.bg2}" />
    </linearGradient>
    <linearGradient id="c_acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}" />
      <stop offset="100%" stop-color="${p.secondary}" />
    </linearGradient>
    <filter id="c_glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <radialGradient id="c_orb" cx="85%" cy="30%" r="55%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.32" />
      <stop offset="60%" stop-color="${p.secondary}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${p.bg1}" stop-opacity="0" />
    </radialGradient>
    <pattern id="c_grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background Layer -->
  <rect width="1280" height="720" fill="url(#c_bg)" />
  <rect width="1280" height="720" fill="url(#c_orb)" />
  <rect width="1280" height="720" fill="url(#c_grid)" />

  <!-- Outer Neon Border Frame -->
  <rect x="24" y="24" width="1232" height="672" rx="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
  <rect x="24" y="24" width="1232" height="672" rx="28" fill="none" stroke="${p.accent}" stroke-width="1" stroke-dasharray="16 12" opacity="0.3" />

  <!-- Thematic Right-Hand Diagram (Cyber Tech Isometric Schematics) -->
  <g transform="translate(860, 240)">
    <!-- Central Hexagonal Energy Core -->
    <polygon points="120,40 220,100 220,210 120,270 20,210 20,100" fill="rgba(255,255,255,0.02)" stroke="${p.accent}" stroke-width="2.5" opacity="0.8" />
    <polygon points="120,65 195,110 195,195 120,245 45,195 45,110" fill="none" stroke="${p.secondary}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6" />
    <circle cx="120" cy="155" r="36" fill="${p.accent}" opacity="0.15" />
    <circle cx="120" cy="155" r="16" fill="url(#c_acc)" />

    <!-- Circuit traces connecting nodes -->
    <path d="M 220 100 L 320 60 L 360 60" stroke="${p.accent}" stroke-width="2" fill="none" opacity="0.7" />
    <circle cx="360" cy="60" r="6" fill="${p.accent}" />

    <path d="M 220 210 L 300 260 L 340 260" stroke="${p.secondary}" stroke-width="2" fill="none" opacity="0.7" />
    <circle cx="340" cy="260" r="5" fill="${p.secondary}" />

    <path d="M 20 100 L -60 70 L -100 70" stroke="${p.accent}" stroke-width="2" fill="none" opacity="0.6" />
    <circle cx="-100" cy="70" r="5" fill="${p.accent}" />

    <path d="M 120 270 L 120 340 L 160 380" stroke="${p.secondary}" stroke-width="2" fill="none" opacity="0.5" />
    <circle cx="160" cy="380" r="4" fill="${p.secondary}" />

    <!-- Floating HUD card -->
    <rect x="220" y="110" width="130" height="65" rx="10" fill="rgba(10,15,30,0.85)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    <text x="235" y="135" font-family="'Space Grotesk', monospace" font-size="11" font-weight="700" fill="${p.accent}">STATUS: VERIFIED</text>
    <text x="235" y="155" font-family="'Space Grotesk', monospace" font-size="13" font-weight="600" fill="#ffffff">8/8 MODULES</text>
  </g>

  <!-- Left Main Content -->
  <!-- Eyebrow Pill -->
  <g transform="translate(80, 110)">
    <rect width="260" height="38" rx="19" fill="rgba(255,255,255,0.06)" stroke="${p.accent}" stroke-width="1.4" />
    <circle cx="20" cy="19" r="5" fill="${p.accent}" />
    <text x="36" y="24" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="${p.accent}" letter-spacing="1.5">MÃ ${code} · ${domainName.toUpperCase()}</text>
  </g>

  <!-- Course Title (Multline support) -->
  <g transform="translate(80, 210)">
    <text font-family="'Be Vietnam Pro', sans-serif" font-size="44" font-weight="800" fill="#ffffff" line-height="1.2">
      ${title.length > 38 ? `
        <tspan x="0" y="0">${escapeXml(title.substring(0, 36))}...</tspan>
        <tspan x="0" y="58">${escapeXml(title.substring(36))}</tspan>
      ` : `
        <tspan x="0" y="0">${title}</tspan>
      `}
    </text>
  </g>

  <!-- Meta Badges (Lessons, Level, Lifetime) -->
  <g transform="translate(80, 440)">
    <!-- Badge 1: Lessons -->
    <g transform="translate(0, 0)">
      <rect width="170" height="46" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <text x="20" y="28" font-family="'Be Vietnam Pro', sans-serif" font-size="14" font-weight="600" fill="#ffffff">📚 ${lessonsCount} bài giảng HD</text>
    </g>

    <!-- Badge 2: Level -->
    <g transform="translate(186, 0)">
      <rect width="150" height="46" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <text x="20" y="28" font-family="'Be Vietnam Pro', sans-serif" font-size="14" font-weight="600" fill="#ffffff">⚡ ${level}</text>
    </g>

    <!-- Badge 3: Duration -->
    <g transform="translate(352, 0)">
      <rect width="160" height="46" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <text x="20" y="28" font-family="'Be Vietnam Pro', sans-serif" font-size="14" font-weight="600" fill="#ffffff">⏱ ${duration}</text>
    </g>
  </g>

  <!-- Bottom Brand Footnote -->
  <line x1="80" y1="620" x2="1200" y2="620" stroke="rgba(255,255,255,0.08)" stroke-width="1.2" />
  <g transform="translate(80, 655)">
    <text font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="800" fill="url(#c_acc)" letter-spacing="2.5">EDUNEXT MASTERCLASS</text>
    <text x="1120" y="0" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.4)" text-anchor="end">Kiến trúc giáo dục trực tuyến chuẩn quốc tế</text>
  </g>
</svg>`;
}

// Generate Lesson SVG
function generateLessonSvg(course, lesson, index) {
  const p = getPalette(course.id + '-' + index);
  const lessonOrder = String(lesson.order || index + 1).padStart(2, '0');
  const totalLessons = Array.isArray(course.lessons) ? String(course.lessons.length).padStart(2, '0') : '08';
  const title = escapeXml(lesson.title || `Bài học ${lessonOrder}`);
  const courseTitle = escapeXml(truncate(course.title, 45));

  // Determine technical icon schematic based on lesson index
  const icons = [
    // 0: Concept & Setup
    `<rect x="0" y="0" width="180" height="110" rx="12" fill="rgba(10,18,36,0.9)" stroke="${p.accent}" stroke-width="2" />
     <circle cx="20" cy="18" r="4" fill="#ff5f56" /><circle cx="34" cy="18" r="4" fill="#ffbd2e" /><circle cx="48" cy="18" r="4" fill="#27c93f" />
     <path d="M 20 45 L 80 45 M 20 65 L 140 65 M 20 85 L 110 85" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />`,
    // 1: Syntax & Variables
    `<polygon points="90,10 160,50 160,130 90,170 20,130 20,50" fill="none" stroke="${p.accent}" stroke-width="2" />
     <circle cx="90" cy="90" r="28" fill="${p.secondary}" opacity="0.25" />
     <text x="90" y="96" font-family="monospace" font-size="18" font-weight="700" fill="${p.accent}" text-anchor="middle">&lt;/&gt;</text>`,
    // 2: Control flow
    `<rect x="40" y="15" width="100" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="${p.accent}" stroke-width="2" />
     <path d="M 90 55 L 90 90 L 40 120 M 90 90 L 140 120" stroke="${p.secondary}" stroke-width="2" fill="none" />
     <rect x="10" y="120" width="60" height="30" rx="6" fill="${p.accent}" opacity="0.3" stroke="${p.accent}" />
     <rect x="110" y="120" width="60" height="30" rx="6" fill="${p.secondary}" opacity="0.3" stroke="${p.secondary}" />`,
    // 3: Functions & Modules
    `<circle cx="90" cy="85" r="45" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="8 6" />
     <circle cx="90" cy="85" r="22" fill="url(#l_acc)" />
     <line x1="90" y1="20" x2="90" y2="40" stroke="${p.accent}" stroke-width="2" />
     <line x1="90" y1="130" x2="90" y2="150" stroke="${p.accent}" stroke-width="2" />
     <line x1="25" y1="85" x2="45" y2="85" stroke="${p.accent}" stroke-width="2" />
     <line x1="135" y1="85" x2="155" y2="85" stroke="${p.accent}" stroke-width="2" />`,
    // 4: Object-Oriented / Components
    `<rect x="25" y="25" width="85" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="${p.accent}" stroke-width="1.8" />
     <rect x="70" y="65" width="85" height="60" rx="8" fill="rgba(10,20,40,0.85)" stroke="${p.secondary}" stroke-width="2" />
     <line x1="68" y1="55" x2="70" y2="65" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 4" />`,
    // 5: Database & Logic
    `<ellipse cx="90" cy="35" rx="60" ry="20" fill="none" stroke="${p.accent}" stroke-width="2" />
     <ellipse cx="90" cy="75" rx="60" ry="20" fill="none" stroke="${p.accent}" stroke-width="2" />
     <ellipse cx="90" cy="115" rx="60" ry="20" fill="none" stroke="${p.accent}" stroke-width="2" />
     <path d="M 30 35 L 30 115 M 150 35 L 150 115" stroke="${p.accent}" stroke-width="2" fill="none" />`,
    // 6: Debugging & Optimization
    `<circle cx="90" cy="85" r="50" fill="none" stroke="${p.accent}" stroke-width="2" />
     <circle cx="90" cy="85" r="30" fill="none" stroke="${p.secondary}" stroke-width="1.5" stroke-dasharray="6 4" />
     <line x1="90" y1="45" x2="90" y2="85" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round" />
     <line x1="90" y1="85" x2="115" y2="85" stroke="${p.accent}" stroke-width="2" stroke-linecap="round" />`,
    // 7: Capstone & Review
    `<polygon points="90,15 110,65 165,65 120,100 138,150 90,120 42,150 60,100 15,65 70,65" fill="${p.accent}" opacity="0.3" stroke="${p.accent}" stroke-width="2" />
     <circle cx="90" cy="85" r="18" fill="url(#l_acc)" />`
  ];

  const schematicSvg = icons[index % icons.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="l_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}" />
      <stop offset="100%" stop-color="${p.bg2}" />
    </linearGradient>
    <linearGradient id="l_acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}" />
      <stop offset="100%" stop-color="${p.secondary}" />
    </linearGradient>
    <radialGradient id="l_nebula" cx="80%" cy="25%" r="65%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${p.bg1}" stop-opacity="0" />
    </radialGradient>
    <pattern id="l_grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="960" height="540" fill="url(#l_bg)" />
  <rect width="960" height="540" fill="url(#l_nebula)" />
  <rect width="960" height="540" fill="url(#l_grid)" />

  <!-- Outer Glass Frame -->
  <rect x="20" y="20" width="920" height="500" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

  <!-- Right Schematic Art -->
  <g transform="translate(680, 180)">
    ${schematicSvg}
  </g>

  <!-- Lesson Eyebrow Pill -->
  <g transform="translate(60, 70)">
    <rect width="180" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="${p.accent}" stroke-width="1.4" />
    <circle cx="20" cy="17" r="4.5" fill="${p.accent}" />
    <text x="36" y="22" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="700" fill="${p.accent}" letter-spacing="1.5">BÀI ${lessonOrder} / ${totalLessons}</text>
  </g>

  <!-- Course Context Subtitle -->
  <text x="60" y="145" font-family="'Be Vietnam Pro', sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.6)">
    ${courseTitle}
  </text>

  <!-- Big Lesson Title -->
  <g transform="translate(60, 205)">
    <text font-family="'Be Vietnam Pro', sans-serif" font-size="32" font-weight="800" fill="#ffffff" line-height="1.25">
      ${title.length > 34 ? `
        <tspan x="0" y="0">${escapeXml(title.substring(0, 32))}...</tspan>
        <tspan x="0" y="44">${escapeXml(title.substring(32))}</tspan>
      ` : `
        <tspan x="0" y="0">${title}</tspan>
      `}
    </text>
  </g>

  <!-- Learning Module Features -->
  <g transform="translate(60, 340)">
    <g transform="translate(0,0)">
      <rect width="150" height="38" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <text x="16" y="24" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="500" fill="rgba(255,255,255,0.85)">▶ Video bài giảng HD</text>
    </g>
    <g transform="translate(162,0)">
      <rect width="145" height="38" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <text x="16" y="24" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="500" fill="rgba(255,255,255,0.85)">📝 Bài tập thực hành</text>
    </g>
    <g transform="translate(319,0)">
      <rect width="140" height="38" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <text x="16" y="24" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="500" fill="rgba(255,255,255,0.85)">💾 Mã nguồn &amp; Slide</text>
    </g>
  </g>

  <!-- Footer Brand -->
  <line x1="60" y1="450" x2="900" y2="450" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  <g transform="translate(60, 485)">
    <text font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="url(#l_acc)" letter-spacing="2">EDUNEXT · HỌC PHẦN THỰC CHIẾN</text>
    <text x="840" y="0" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="500" fill="rgba(255,255,255,0.4)" text-anchor="end">Tiến độ lưu tự động</text>
  </g>
</svg>`;
}

// MAIN EXECUTION
function main() {
  console.log('--- Starting EduNext Complete Asset Generation ---');
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

  let domainCount = 0;
  let courseCount = 0;
  let lessonCount = 0;

  // 1. Process 50 Domains
  console.log(`Processing ${catalog.domains.length} Domains...`);
  catalog.domains.forEach(domain => {
    const slug = domain.slug || domain.id.replace('field-', '');
    const svgContent = generateDomainSvg(domain);
    const svgPath = path.join(DOMAINS_DIR, `${slug}.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf8');

    // Attach image path to domain in catalog
    domain.image = `assets/images/domains/${slug}.svg`;
    domain.photoUrl = DOMAIN_CURATED_PHOTOS[domain.id] || DOMAIN_CURATED_PHOTOS['field-lap-trinh-va-phat-trien-phan-mem'];
    domainCount++;
  });

  // 2. Process 100 Courses
  console.log(`Processing ${catalog.courses.length} Courses...`);
  catalog.courses.forEach(course => {
    // Generate SVG for all courses
    const svgContent = generateCourseSvg(course);
    const svgPath = path.join(COURSES_DIR, `${course.id}.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf8');

    // If flagship JPG exists, set course.image to the flagship JPG! Otherwise to SVG
    if (FLAGSHIP_IMAGES[course.id] && fs.existsSync(path.join(THEME_DIR, FLAGSHIP_IMAGES[course.id]))) {
      course.image = FLAGSHIP_IMAGES[course.id];
      course.hasAiFlagship = true;
    } else {
      course.image = `assets/images/courses/${course.id}.svg`;
      course.hasAiFlagship = false;
    }
    courseCount++;

    // 3. Process Lessons (8 per course = 800 total)
    if (Array.isArray(course.lessons)) {
      course.lessons.forEach((lesson, lIdx) => {
        const order = lesson.order || (lIdx + 1);
        const lSvgContent = generateLessonSvg(course, lesson, lIdx);
        const lSvgPath = path.join(LESSONS_DIR, `${course.id}-lesson-${order}.svg`);
        fs.writeFileSync(lSvgPath, lSvgContent, 'utf8');

        // Attach image to lesson
        lesson.image = `assets/images/lessons/${course.id}-lesson-${order}.svg`;
        lessonCount++;
      });
    }
  });

  // Save updated catalog
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Successfully generated:`);
  console.log(`  • ${domainCount} Domain illustration banners in assets/images/domains/`);
  console.log(`  • ${courseCount} Course cover banners (12 AI Flagship JPGs + 88 SVGs) in assets/images/courses/`);
  console.log(`  • ${lessonCount} Lesson illustrations in assets/images/lessons/`);
  console.log(`Total generated assets: ${domainCount + courseCount + lessonCount}`);
  console.log(`Updated ${CATALOG_PATH} with image properties!`);
}

main();
