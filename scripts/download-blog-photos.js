/**
 * Download Curated High-Resolution Photography For All 11 EduNext Blog Articles
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const THEME_DIR = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(THEME_DIR, 'assets', 'images', 'blog');

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// 11 high-quality curated photographs tailored precisely to the actual content of each blog article
const BLOG_PHOTOS = {
  // 1. C# Coding & Data Flow
  'hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap':
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=82&w=1200',

  // 2. REST API & Backend Architecture
  'xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung':
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=82&w=1200',

  // 3. AutoCAD 2D Engineering Blueprints
  'ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer':
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=82&w=1200',

  // 4. SQL Server & Database Optimization
  'truoc-khi-toi-uu-sql-hay-hoi-ba-cau-ve-du-lieu':
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=82&w=1200',

  // 5. AI & Machine Learning in Coding
  'dung-ai-de-hoc-code-ma-khong-giao-luon-bai-tap-cho-ai':
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=82&w=1200',

  // 6. UI/UX Interface Design Beyond Color
  'mot-giao-dien-de-dung-khong-bat-dau-tu-mau-sac':
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=82&w=1200',

  // 7. SEO Content Writing & Strategy
  'viet-bai-seo-ma-khong-bien-noi-dung-thanh-danh-sach-tu-khoa':
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=82&w=1200',

  // 8. Digital Marketing Analytics & Ad Conversions
  'doc-so-lieu-quang-cao-luot-nhap-chua-phai-ket-qua-cuoi-cung':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=82&w=1200',

  // 9. IT English Technical Reading & Documentation
  'doc-tai-lieu-tieng-anh-khi-von-tu-chuyen-nganh-con-it':
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=82&w=1200',

  // 10. Computer Network & System Diagnostics
  'khi-mang-loi-dung-doi-thiet-lap-lien-tuc-hay-kiem-tra-theo-thu-tu':
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=82&w=1200',

  // 11. Project Management & MVP First Step
  'du-an-dau-tien-nen-nho-den-muc-nao':
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=82&w=1200'
};

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return reject(new Error(`Status ${res.statusCode} for ${u}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(destPath));
        });
      }).on('error', (err) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function run() {
  console.log('Downloading curated photographs for 11 EduNext Blog articles...');
  const entries = Object.entries(BLOG_PHOTOS);
  let successCount = 0;

  for (const [slug, url] of entries) {
    const filename = `${slug}.jpg`;
    const destPath = path.join(BLOG_DIR, filename);
    try {
      process.stdout.write(`Downloading ${filename}... `);
      await downloadImage(url, destPath);
      const stats = fs.statSync(destPath);
      console.log(`OK (${Math.round(stats.size / 1024)} KB)`);
      successCount++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
    }
  }

  console.log(`\nSuccessfully downloaded ${successCount}/${entries.length} blog article images.`);
}

run();
