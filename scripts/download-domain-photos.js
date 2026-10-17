/**
 * Download Curated Real Photography for All 50 EduNext Domains
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const THEME_DIR = path.resolve(__dirname, '..');
const DOMAINS_DIR = path.join(THEME_DIR, 'assets', 'images', 'domains');
const CATALOG_PATH = path.join(THEME_DIR, 'assets', 'data', 'course-catalog.json');

if (!fs.existsSync(DOMAINS_DIR)) {
  fs.mkdirSync(DOMAINS_DIR, { recursive: true });
}

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

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading real photography for all 50 EduNext domains...');
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

  for (const domain of catalog.domains) {
    const slug = domain.slug || domain.id.replace('field-', '');
    const targetFile = path.join(DOMAINS_DIR, `${slug}.jpg`);
    const photoUrl = DOMAIN_CURATED_PHOTOS[domain.id];

    if (!photoUrl) {
      console.warn(`No photo configured for ${domain.id}`);
      continue;
    }

    try {
      await downloadFile(photoUrl, targetFile);
      const size = fs.statSync(targetFile).size;
      console.log(`[OK] ${slug}.jpg (${(size / 1024).toFixed(1)} KB)`);
      // Update catalog image path to point to the real JPG
      domain.image = `assets/images/domains/${slug}.jpg`;
    } catch (err) {
      console.error(`[ERR] Failed ${slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
  console.log('Finished downloading all domain photos and updated catalog!');
}

run();

