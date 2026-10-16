(()=>{
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=n=>Number(n||0).toLocaleString('vi-VN')+'đ',ini=n=>String(n||'E').trim().split(/\s+/).slice(-2).map(x=>x[0]||'').join('').toUpperCase();
const CFG=window.EDUNEXT_CONFIG||{};
let CATALOG={domains:[],courses:[]};
let DOMAINS=[],C=[];
const DOMAIN_GROUPS = [{"slug":"cong-nghe-thong-tin","name":"Công nghệ thông tin","description":"Nhóm chuyên ngành xây dựng phần mềm, nền tảng Web và di động, dữ liệu, AI, bảo mật và hạ tầng công nghệ.","numbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14]},{"slug":"thiet-ke-sang-tao","name":"Thiết kế và sáng tạo","description":"Thiết kế sản phẩm số, đồ họa, không gian 3D, nhiếp ảnh, video, minh họa và thời trang.","numbers":[15,16,17,18,19,42,43]},{"slug":"marketing-truyen-thong-noi-dung","name":"Marketing, truyền thông và nội dung số","description":"Sáng tạo nội dung, marketing số, tối ưu tìm kiếm và viết nội dung truyền thông.","numbers":[20,21,22]},{"slug":"kinh-doanh-quan-tri","name":"Kinh doanh, quản trị và khởi nghiệp","description":"Phát triển kinh doanh, thương mại điện tử, quản lý dự án, vận hành doanh nghiệp, khởi nghiệp và bất động sản.","numbers":[23,24,25,26,40,47]},{"slug":"tai-chinh-nhan-su-van-hanh","name":"Tài chính, nhân sự và phân tích nghiệp vụ","description":"Tài chính, kế toán, quản trị nhân sự, chuỗi cung ứng và phân tích yêu cầu nghiệp vụ.","numbers":[27,28,29,30,37]},{"slug":"ngoai-ngu-giao-duc","name":"Ngôn ngữ, giáo dục và đào tạo","description":"Học ngoại ngữ, phát triển phương pháp giảng dạy và thiết kế hoạt động đào tạo.","numbers":[31,32,33]},{"slug":"ky-nang-van-phong","name":"Kỹ năng cá nhân và tin học văn phòng","description":"Kỹ năng giao tiếp, năng suất cá nhân và các công cụ phục vụ công việc văn phòng.","numbers":[34,35,36]},{"slug":"khoa-hoc-ky-thuat","name":"Khoa học, toán học và kỹ thuật","description":"Nền tảng toán học, tư duy khoa học và ứng dụng kỹ thuật trong thực tiễn.","numbers":[38,39]},{"slug":"nghe-thuat-doi-song","name":"Nghệ thuật và đời sống","description":"Âm nhạc, nấu ăn, sức khỏe, thể chất và các kỹ năng sáng tạo trong đời sống.","numbers":[41,44,45,46]},{"slug":"phap-luat-moi-truong","name":"Pháp luật, nông nghiệp và môi trường","description":"Kiến thức pháp luật, tuân thủ và các lĩnh vực nông nghiệp, môi trường bền vững.","numbers":[48,49]},{"slug":"du-lich-dich-vu","name":"Du lịch và dịch vụ","description":"Nghiệp vụ du lịch, lưu trú, nhà hàng và xây dựng trải nghiệm dịch vụ.","numbers":[50]}];
const domainGroups=()=>DOMAIN_GROUPS.map(group=>({...group,domains:DOMAINS.filter(domain=>group.numbers.includes(Number(domain.number)))})).filter(group=>group.domains.length);
const findDomainGroup=domain=>domain?domainGroups().find(group=>group.domains.some(item=>item.id===domain.id))||null:null;
const COURSE_IMAGES = Object.assign({
  csharp: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
  api: 'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=82&w=1200',
  english: 'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
  design: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=82&w=1200',
  marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=82&w=1200',
  'autocad-2d-cho-ban-ve-ky-thuat': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=1200',
  'sql-server-va-sql-tu-co-ban-den-thuc-hanh': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=82&w=1200',
  'xay-dung-ung-dung-voi-generative-ai-va-llm': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=82&w=1200',
  'lap-trinh-flutter-tu-dau': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=82&w=1200',
  'phat-trien-ung-dung-android-voi-kotlin': 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=82&w=1200',
  'blender-3d-tu-modeling-den-rendering': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=82&w=1200'
}, CFG.courseImages || {});

const DOMAIN_IMAGES = Object.assign({
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
  'field-iot-va-he-thong-nhung': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'field-blockchain-va-web3': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
  'field-phat-trien-game': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
  'field-quan-tri-he-thong-va-ha-tang': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
  'field-ui-ux-design': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
  'field-ui-ux-va-thiet-ke-san-pham-so': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
  'field-thiet-ke-do-hoa': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  'field-3d-animation-va-ky-xao': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  'field-thiet-ke-noi-that-va-kien-truc': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
  'field-nhiep-anh-va-chinh-sua-anh': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
  'field-video-va-san-xuat-noi-dung': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
  'field-sang-tao-noi-dung-so': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
  'field-digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'field-content-marketing-va-copywriting': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
  'field-kinh-doanh-va-ban-hang': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  'field-thuong-mai-dien-tu': 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
  'field-quan-tri-doanh-nghiep': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'field-quan-ly-du-an': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  'field-tai-chinh-va-dau-tu': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
  'field-ke-toan-va-kiem-toan': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
  'field-nhan-su': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
  'field-logistics-va-chuoi-cung-ung': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  'field-tieng-anh': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
  'field-ngoai-ngu-khac': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  'field-giao-duc-va-dao-tao': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  'field-ky-nang-mem': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'field-nang-suat-va-phat-trien-ca-nhan': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
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
}, CFG.domainImages || {});

const GROUP_IMAGES = {
  'cong-nghe-thong-tin': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  'thiet-ke-sang-tao': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
  'marketing-truyen-thong-noi-dung': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'kinh-doanh-quan-tri': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'tai-chinh-nhan-su-van-hanh': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
  'ngoai-ngu-giao-duc': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
  'ky-nang-van-phong': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  'khoa-hoc-ky-thuat': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
  'nghe-thuat-doi-song': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
  'phap-luat-moi-truong': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
  'du-lich-dich-vu': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'
};

const getCourseImage = (c) => {
  if (!c) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
  if (COURSE_IMAGES[c.id]) return COURSE_IMAGES[c.id];
  if (c.domainId && DOMAIN_IMAGES[c.domainId]) return DOMAIN_IMAGES[c.domainId];
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
};

const getDomainImage = (d) => {
  if (d && DOMAIN_IMAGES[d.id]) return DOMAIN_IMAGES[d.id];
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
};

const getGroupImage = (group) => {
  if (group && GROUP_IMAGES[group.slug]) return GROUP_IMAGES[group.slug];
  if (group && group.domains && group.domains[0] && DOMAIN_IMAGES[group.domains[0].id]) return DOMAIN_IMAGES[group.domains[0].id];
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
};
const mapCourse=(raw,videoCounts={})=>{
  const lessons=Array.isArray(raw.lessons)?raw.lessons:[];
  const L=lessons.map(item=>item.title);
  const rawLevel=String(raw.level||'').trim();
  const level=(rawLevel&&rawLevel!=='Chưa xác định'&&rawLevel!=='Chưa cấu hình')?rawLevel:'Thực chiến';
  const duration=Number(raw.durationHours);
  const outcomes=Array.isArray(raw.outcomes)?raw.outcomes:[];
  const domain=DOMAINS.find(item=>item.id===raw.domainId);
  const codeParts=String(raw.code||'1.1').split('.').map(value=>Number.parseInt(value,10)||1);
  const domainCode=codeParts[0]||1, courseCode=codeParts[1]||1;
  const priceTier=(domainCode*13+courseCode*7)%7;
  const demoPrice=String(raw.id||'')==='csharp'?249000:149000+priceTier*50000;
  const originalTier=(domainCode*7+courseCode*11)%4;
  const demoOriginalPrice=String(raw.id||'')==='csharp'?399000:demoPrice+100000+originalTier*50000;
  const hasConfiguredPrice=typeof raw.price==='number'&&Number.isFinite(raw.price)&&raw.price>=0;
  const displayPrice=hasConfiguredPrice?raw.price:demoPrice;
  const displayOriginalPrice=hasConfiguredPrice
    ? (typeof raw.originalPrice==='number'&&Number.isFinite(raw.originalPrice)&&raw.originalPrice>raw.price?raw.originalPrice:null)
    : demoOriginalPrice;
  const isDemoPrice=!hasConfiguredPrice;
  const metadataComplete=['title','domainId','shortDescription','description','audience','prerequisites'].every(key=>String(raw[key]||'').trim()!=='')&&DOMAINS.some(domain=>domain.id===raw.domainId);
  const videoKey=url=>String(url||'').trim().replace(/\/+$/,'').toLowerCase();
  const mediaValid=url=>!url||/^https:\/\/[^\s/?#]+(?:[/?#][^\s]*)?$/i.test(String(url).trim());
  const ready=raw.published===true&&raw.metadataStatus==='verified'&&metadataComplete&&
    typeof raw.price==='number'&&Number.isFinite(raw.price)&&raw.price>=0&&
    level!==''&&!['Chưa xác định','Chưa cấu hình'].includes(level)&&
    Number.isFinite(duration)&&duration>0&&outcomes.length>0&&lessons.length>0&&
    lessons.every(lesson=>{
      const videoUrl=String(lesson.videoUrl||'').trim(),resourceUrl=String(lesson.resourceUrl||'').trim();
      return !!String(lesson.title||'').trim()&&!!(String(lesson.content||'').trim()||videoUrl||resourceUrl)&&
        mediaValid(videoUrl)&&mediaValid(resourceUrl)&&(!videoUrl||videoCounts[videoKey(videoUrl)]===1);
    })&&mediaValid(raw.previewVideoUrl||'');
  return {
    id:raw.id,t:raw.title,slug:raw.slug||raw.id,cat:domain?domain.name:(raw.domain||'Lĩnh vực chưa xác định'),domainId:raw.domainId,
    topics:Array.isArray(raw.relatedTopics)?raw.relatedTopics:[],
    related:Array.isArray(raw.relatedTopics)?raw.relatedTopics:[],
    description:raw.description||'',shortDescription:raw.shortDescription||raw.description||'',
    audience:raw.audience||'Đối tượng phù hợp đang được xác định.',
    prerequisites:raw.prerequisites||'Điều kiện đầu vào đang được xác định.',
    outcomes,metadataStatus:raw.metadataStatus||'draft',
    lessons,L,v:lessons.map(item=>item.videoUrl||''),
    previewVideoUrl:mediaValid(raw.previewVideoUrl||'')?String(raw.previewVideoUrl||''):'',
    s:[],r:null,n:null,lvl:level,p:displayPrice,o:displayOriginalPrice,demoPrice:isDemoPrice,
    h:raw.durationHours,tag:ready?'Đã xuất bản':'Đang hoàn thiện nội dung',
    c:'',published:raw.published===true,contentStatus:raw.contentStatus||'outline',
    completionCount:Number(raw.completionRule&&raw.completionRule.requiredCount)||L.length,
    ready
  };
};
const BLOG_ARTICLES=[{"tag":"Lập trình","title":"Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp","excerpt":"Có thể bạn đã xem khá nhiều video C# nhưng khi mở Visual Studio lên vẫn lúng túng. Một cách học dễ bám hơn là theo dõi dữ liệu đi qua từng dòng chương trình, rồi tự thay đổi bài toán.","time":"7 phút đọc","course":"csharp","image":"https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200"},{"tag":"ASP.NET Core","title":"Xây dựng REST API: bắt đầu từ một endpoint chạy đúng","excerpt":"Routing, controller, dependency injection và cơ sở dữ liệu dễ thành một mớ khái niệm nếu học cùng lúc. Hãy tạo một endpoint nhỏ, kiểm tra kết quả rồi mới nối thêm từng lớp.","time":"8 phút đọc","course":"api","image":"https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200"},{"tag":"AutoCAD 2D","title":"Bản vẽ AutoCAD rõ ràng bắt đầu từ đơn vị và layer","excerpt":"Trước khi vẽ nhanh, hãy làm cho bản vẽ đúng đơn vị, dễ đọc và có thể in ra đúng tỷ lệ. Vài thiết lập đầu buổi sẽ giúp bạn tránh nhiều lỗi ở cuối.","time":"7 phút đọc","course":"autocad-2d-cho-ban-ve-ky-thuat","image":"https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=82&w=1200"},{"tag":"Cơ sở dữ liệu","title":"Trước khi tối ưu SQL, hãy hỏi ba câu về dữ liệu","excerpt":"Truy vấn chậm chưa chắc chỉ vì thiếu index. Hãy bắt đầu từ kết quả mong muốn, quan hệ giữa các bảng và cách ứng dụng thực sự sử dụng dữ liệu.","time":"6 phút đọc","course":"sql-server-va-sql-tu-co-ban-den-thuc-hanh","image":"https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2"},{"tag":"AI & Machine Learning","title":"Dùng AI để học code mà không giao luôn bài tập cho AI","excerpt":"AI có thể giải thích thông báo lỗi và đề xuất cách kiểm tra. Nhưng nếu nhận nguyên lời giải rồi chép vào dự án, bạn rất khó biết mình đã hiểu đến đâu.","time":"6 phút đọc","course":"xay-dung-ung-dung-voi-generative-ai-va-llm","image":"https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2"},{"tag":"UI/UX","title":"Một giao diện dễ dùng không bắt đầu từ màu sắc","excerpt":"Trước khi chọn bảng màu hay hiệu ứng, hãy xác định người dùng đến để làm việc gì, họ cần thông tin nào và bước tiếp theo có dễ nhận ra không.","time":"7 phút đọc","course":"design","image":"https://miro.medium.com/v2/resize:fit:1400/1*ezbw1Z06SzRSOhShXfwOTg.png"},{"tag":"SEO","title":"Viết bài SEO mà không biến nội dung thành danh sách từ khóa","excerpt":"Một bài viết tốt bắt đầu từ câu hỏi thật của người đọc. Từ khóa giúp bạn hiểu chủ đề cần nói, chứ không thay thế việc giải thích rõ ràng và có ích.","time":"6 phút đọc","course":"viet-noi-dung-seo-tu-nghien-cuu-den-xuat-ban","image":"https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=82&w=1200"},{"tag":"Digital Marketing","title":"Đọc số liệu quảng cáo: lượt nhấp chưa phải kết quả cuối cùng","excerpt":"Một chiến dịch có nhiều lượt nhấp chưa chắc tạo ra khách hàng. Cần nhìn tiếp trang đích, chuyển đổi và chi phí để hiểu quảng cáo đang giúp doanh nghiệp đến đâu.","time":"7 phút đọc","course":"marketing","image":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=82&w=1200"},{"tag":"Tiếng Anh IT","title":"Đọc tài liệu tiếng Anh khi vốn từ chuyên ngành còn ít","excerpt":"Không cần dịch mọi từ mới trước khi đọc. Bắt đầu bằng mục tiêu nhỏ, dùng tiêu đề và ví dụ để đoán ý, rồi chỉ tra những từ thật sự cản trở việc hiểu.","time":"5 phút đọc","course":"english","image":"https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200"},{"tag":"Mạng máy tính","title":"Khi mạng lỗi, đừng đổi thiết lập liên tục: hãy kiểm tra theo thứ tự","excerpt":"Kết nối chập chờn có thể đến từ nhiều nguyên nhân khác nhau. Kiểm tra từ kết nối vật lý đến IP, gateway và DNS sẽ giúp bạn khoanh vùng thay vì thử ngẫu nhiên.","time":"6 phút đọc","course":"mang-may-tinh-tu-nen-tang-den-cau-hinh","image":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=82&w=1200"},{"tag":"Kỹ năng dự án","title":"Dự án đầu tiên nên nhỏ đến mức nào?","excerpt":"Đừng bắt đầu bằng một danh sách tính năng dài. Chọn một vấn đề, một nhóm người dùng và một luồng hoàn chỉnh; sau đó mở rộng khi phiên bản đầu đã chạy ổn.","time":"6 phút đọc","course":"csharp","image":"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=82&w=1200"}];
const D={users:CFG.user?[CFG.user]:[],me:CFG.user&&CFG.user.email?CFG.user.email:null,en:{},orders:Array.isArray(CFG.orders)?CFG.orders:[]};
if(D.me){
  D.en[D.me]={};
  (Array.isArray(CFG.ownedCourseIds)?CFG.ownedCourseIds:[]).forEach(id=>{
    const progress=CFG.progress&&CFG.progress[id]?CFG.progress[id]:{};
    D.en[D.me][id]={done:Array.isArray(progress.done)?progress.done.map(Number).filter(Number.isInteger):[],updatedAt:progress.updatedAt||null,n:{}};
  });
}
const me=()=>D.users.find(u=>u.email===D.me);
const EN=()=>D.me?(D.en[D.me]=D.en[D.me]||{}):{};
const find=id=>C.find(c=>c.id===id);
const pct=c=>{const e=EN()[c.id];return e?Math.round(Math.min(e.done.length,c.L.length)/Math.max(c.L.length,1)*100):0};
const nextL=c=>{const e=EN()[c.id]||{done:[]},k=c.L.findIndex((_,i)=>!e.done.includes(i));return k<0?Math.max(c.L.length-1,0):k};
const passed=c=>{const e=EN()[c.id];return !!e&&e.done.length>=(c.completionCount||c.L.length)&&c.L.length>0};
const PAGE_SIZE=10;
let homeCoursePage=1,domainListPage=1;
const F0=()=>({q:'',cat:'',domainId:'',topic:'',sort:'name',page:1});
const paginationMarkup=(area,current,total,label='mục')=>{
  if(total<=1)return '';
  const pageButton=(page,text,active=false,disabled=false)=>'<button type="button" class="edn-page-button'+(active?' is-current':'')+'" data-a="page-change" data-v="'+esc(area)+','+page+'" aria-label="Trang '+page+'"'+(active?' aria-current="page"':'')+(disabled?' disabled':'')+'>'+text+'</button>';
  const numbered=Array.from({length:total},(_,index)=>index+1).map(page=>pageButton(page,String(page),page===current,false)).join('');
  return '<nav class="edn-pagination" aria-label="Phân trang '+esc(label)+'"><div class="edn-pagination-controls">'+pageButton(Math.max(1,current-1),'‹ Trước',false,current<=1)+numbered+pageButton(Math.min(total,current+1),'Sau ›',false,current>=total)+'</div></nav>';
};
const CART_STORAGE_KEY='edunext-cart-v1';
let cartIds=(()=>{
  try{
    const saved=JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY)||'[]');
    return Array.isArray(saved)?Array.from(new Set(saved.map(id=>String(id||'')).filter(Boolean))).slice(0,100):[];
  }catch(error){return [];}
})();
const persistCart=()=>{
  try{window.localStorage.setItem(CART_STORAGE_KEY,JSON.stringify(cartIds));}catch(error){}
  updateCartBadge();
};
const updateCartBadge=()=>{
  const badge=$('#edn-cart-count'),link=$('#edn-cart-trigger'),count=cartIds.length;
  if(badge){badge.textContent=count>99?'99+':String(count);badge.hidden=count===0;}
  if(link)link.setAttribute('aria-label','Giỏ hàng, '+count+' khóa học');
};
const syncCartWithCatalog=()=>{
  const validIds=new Set(C.map(course=>course.id));
  const owned=EN();
  const cleaned=cartIds.filter(id=>validIds.has(id)&&!owned[id]);
  if(cleaned.length!==cartIds.length){cartIds=cleaned;persistCart();}
  else updateCartBadge();
};
let f=F0(),next='',hook=null,currentCourseResults=[];
const go=p=>{location.hash=p},to=p=>location.hash==='#'+p?render():go(p);
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)}
const guard=(p)=>{next=p;toast('Vui lòng đăng nhập để tiếp tục');go('/login');return ''};

/* ---------- Views ---------- */
const courseImageMarkup=(c)=>'<img src="'+esc(getCourseImage(c))+'" alt="'+esc(c.t)+'" loading="lazy">';
const lessonMaterialMarkup=value=>{
  const headings=new Set([
    'MỤC TIÊU BÀI HỌC',
    'GIẢI THÍCH VÀ KIẾN THỨC TRỌNG TÂM',
    'VÍ DỤ MINH HỌA',
    'QUY TRÌNH THỰC HÀNH',
    'LỖI THƯỜNG GẶP VÀ CÁCH KIỂM TRA',
    'KẾT QUẢ CẦN LƯU'
  ]);
  const sections=String(value||'').split(/\n\s*\n/).map(item=>item.trim()).filter(Boolean);
  return '<div class="edn-lesson-material">'+sections.map(section=>{
    const lines=section.split('\n').map(line=>line.trim()).filter(Boolean);
    if(!lines.length)return '';
    const title=lines[0];
    if(headings.has(title)){
      const body=lines.slice(1);
      const isList=body.length>0&&body.every(line=>/^\d+\.\s/.test(line));
      const rendered=isList
        ? '<ol>'+body.map(line=>'<li>'+esc(line.replace(/^\d+\.\s*/,''))+'</li>').join('')+'</ol>'
        : body.map(line=>'<p>'+esc(line)+'</p>').join('');
      return '<section class="edn-lesson-content-section"><h3>'+esc(title)+'</h3>'+rendered+'</section>';
    }
    return '<p>'+lines.map(esc).join('<br>')+'</p>';
  }).join('')+'</div>';
};
const coursePriceMarkup=c=>'<div class="edn-course-pricing"'+(c.demoPrice?' title="Giá demo tham khảo"':'')+'><strong class="edn-course-price-current">'+esc(money(c.p))+'</strong>'+(typeof c.o==='number'&&c.o>c.p?'<del class="edn-course-price-original">'+esc(money(c.o))+'</del>':'')+'</div>';
const cartIconMarkup='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
const starIconMarkup='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
const animatedText=text=>'<span class="edn-animated-text"><span class="edn-text-top">'+esc(text)+'</span><span class="edn-text-bottom" aria-hidden="true">'+esc(text)+'</span></span>';

const INSTRUCTORS=[
  {name:'Nguyễn Văn Minh',role:'Senior .NET Architect',org:'VNG',avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'},
  {name:'Trần Thu Trang',role:'Head of Product Design',org:'Tiki',avatar:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'},
  {name:'Lê Hoàng Nam',role:'Lead Data Scientist',org:'FPT Software',avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'},
  {name:'Đặng Mai Phương',role:'Growth Marketing Lead',org:'Shopee',avatar:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'},
  {name:'Phạm Đức Duy',role:'Mobile Tech Lead',org:'MoMo',avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'},
  {name:'Vũ Hoàng Quân',role:'Cloud Solutions Architect',org:'Viettel',avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'}
];

const getCourseInstructor=(c)=>{
  if(!c)return INSTRUCTORS[0];
  const hash=Math.abs(String(c.id||'').split('').reduce((acc,ch)=>acc+ch.charCodeAt(0),0));
  return INSTRUCTORS[hash%INSTRUCTORS.length];
};

const getCourseStats=(c)=>{
  const hash=Math.abs(String(c.id||'').split('').reduce((acc,ch)=>acc+ch.charCodeAt(0),0));
  const rating=(4.8+((hash%3)*0.1)).toFixed(1);
  const reviews=350+(hash%15)*85;
  const students=1200+(hash%20)*350;
  return {rating,reviews,students};
};

const card=c=>{
  const own=!!EN()[c.id];
  const issued=Array.isArray(CFG.certificates)&&CFG.certificates.some(item=>item.courseId===c.id);
  const ownedAction=own
    ? (issued
      ? '<a class="edn-card-btn-action is-owned" href="#/cert/'+esc(c.id)+'"><span>Chứng chỉ</span></a>'
      : (passed(c)
        ? '<a class="edn-card-btn-action is-owned" href="#/cert/'+esc(c.id)+'"><span>Nhận chứng chỉ</span></a>'
        : '<a class="edn-card-btn-action is-owned" href="#/learn/'+esc(c.id)+'/'+nextL(c)+'"><span>Vào học</span></a>'))
    : '';
  const inCart=cartIds.includes(c.id);
  const cartAction=!own
    ? '<button class="edn-card-btn-action edn-add-to-cart'+(inCart?' is-in-cart':'')+'" type="button" data-a="cart-add" data-v="'+esc(c.id)+'" aria-label="'+(inCart?'Trong giỏ hàng':'Thêm vào giỏ')+'" title="'+(inCart?'Trong giỏ hàng':'Thêm vào giỏ')+'"'+(inCart?' aria-pressed="true"':'')+'>'+cartIconMarkup+'</button>'
    : '';

  const instructor=getCourseInstructor(c);
  const stats=getCourseStats(c);
  const discountPct=typeof c.o==='number'&&c.o>c.p?Math.round((1-c.p/c.o)*100):null;

  return '<article class="edn-course-card edn-catalog-course">'+
    '<a href="#/course/'+esc(c.id)+'" class="edn-course-card-link" aria-label="Mở khóa học '+esc(c.t)+'">'+
      '<div class="edn-course-card-media">'+
        courseImageMarkup(c)+
        '<div class="edn-card-badge-group">'+
          '<span class="edn-card-badge '+(c.ready?'is-verified':'is-draft')+'">'+(c.ready?'Bán chạy':'Đề cương')+'</span>'+
          (discountPct?'<span class="edn-card-discount-badge">-'+discountPct+'%</span>':'')+
        '</div>'+
      '</div>'+
      '<div class="edn-course-card-content">'+
        '<div class="edn-card-meta-top"><span class="edn-card-category">'+esc(c.cat)+'</span><span class="edn-card-level">'+esc(c.lvl||'Mọi cấp độ')+'</span></div>'+
        '<h3 class="edn-card-title">'+esc(c.t)+'</h3>'+
        '<div class="edn-card-instructor">'+
          '<img class="edn-instructor-thumb" src="'+esc(instructor.avatar)+'" alt="'+esc(instructor.name)+'" loading="lazy">'+
          '<span class="edn-instructor-name">'+esc(instructor.name)+' <small>· '+esc(instructor.org)+'</small></span>'+
        '</div>'+
        '<div class="edn-card-meta">'+
          '<span class="edn-card-rating">'+starIconMarkup+' <b>'+stats.rating+'</b> <small>('+stats.reviews.toLocaleString('vi-VN')+')</small></span>'+
          '<span class="edn-card-lessons"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h12v10H2zM5 6h6M5 9h4"></path></svg> '+c.L.length+' bài'+(c.h?' · '+c.h+'h':'')+'</span>'+
        '</div>'+
      '</div>'+
    '</a>'+
    '<div class="edn-course-card-footer">'+
      '<div class="edn-card-pricing"><strong class="edn-price-current">'+esc(money(c.p))+'</strong>'+(typeof c.o==='number'&&c.o>c.p?'<del class="edn-price-orig">'+esc(money(c.o))+'</del>':'')+'</div>'+
      (ownedAction||cartAction)+
    '</div>'+
  '</article>';
};

let homeFilterTab='all';
let initialServerHomeHtml='';
const nf=()=>'<div class="wrap page"><div class="empty" role="status"><h2>Không tìm thấy nội dung này</h2><p>Liên kết có thể đã thay đổi hoặc nội dung chưa được xuất bản.</p><a href="#/">Về trang chủ</a></div></div>';
const slugify=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const home=()=>{
  if(initialServerHomeHtml)return initialServerHomeHtml;
  const arrowIcon='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
  const checkIcon='<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

  // Course filtering by Tab
  const filterTabs=[
    {id:'all',label:'Tất cả khóa học'},
    {id:'cntt',label:'Lập trình & CNTT',match:c=>['field-lap-trinh-va-phat-trien-phan-mem','field-phat-trien-web','field-phat-trien-ung-dung-di-dong','field-cloud-computing-va-devops'].includes(c.domainId)},
    {id:'design',label:'Thiết kế & Sáng tạo',match:c=>['field-ui-ux-design','field-ui-ux-va-thiet-ke-san-pham-so','field-thiet-ke-do-hoa','field-3d-animation-va-ky-xao'].includes(c.domainId)},
    {id:'marketing',label:'Marketing & Sales',match:c=>['field-digital-marketing','field-content-marketing-va-copywriting','field-kinh-doanh-va-ban-hang'].includes(c.domainId)},
    {id:'data',label:'Dữ liệu & AI',match:c=>['field-co-so-du-lieu','field-ai-va-machine-learning','field-khoa-hoc-du-lieu-va-phan-tich-du-lieu'].includes(c.domainId)},
    {id:'business',label:'Kinh doanh & Quản trị',match:c=>['field-quan-tri-doanh-nghiep','field-quan-ly-du-an','field-tai-chinh-va-dau-tu','field-thuong-mai-dien-tu'].includes(c.domainId)}
  ];

  const currentTabObj=filterTabs.find(t=>t.id===homeFilterTab)||filterTabs[0];
  let filteredCourses=currentTabObj.match?C.filter(currentTabObj.match):[...C];
  if(!filteredCourses.length)filteredCourses=[...C];
  filteredCourses.sort((a,b)=>Number(b.ready)-Number(a.ready));
  const visibleCourses=filteredCourses.slice(0,8);

  const tabsMarkup=filterTabs.map(t=>
    '<button type="button" class="edn-home-tab-pill'+(t.id===homeFilterTab?' is-active':'')+'" data-a="home-filter" data-v="'+esc(t.id)+'">'+esc(t.label)+'</button>'
  ).join('');

  // Top 8 Categories
  const categoryHighlights=[
    {slug:'cong-nghe-thong-tin',name:'Công nghệ thông tin',count:'14 chuyên ngành',icon:'💻',img:DOMAIN_IMAGES['field-lap-trinh-va-phat-trien-phan-mem']},
    {slug:'thiet-ke-sang-tao',name:'Thiết kế & UI/UX',count:'7 chuyên ngành',icon:'🎨',img:DOMAIN_IMAGES['field-ui-ux-va-thiet-ke-san-pham-so']},
    {slug:'marketing-truyen-thong-noi-dung',name:'Marketing & Content',count:'3 chuyên ngành',icon:'🚀',img:DOMAIN_IMAGES['field-digital-marketing']},
    {slug:'kinh-doanh-quan-tri',name:'Kinh doanh & Quản trị',count:'6 chuyên ngành',icon:'💼',img:DOMAIN_IMAGES['field-kinh-doanh-va-ban-hang']},
    {slug:'tai-chinh-nhan-su-van-hanh',name:'Tài chính & Dữ liệu',count:'5 chuyên ngành',icon:'📊',img:DOMAIN_IMAGES['field-tai-chinh-va-dau-tu']},
    {slug:'ngoai-ngu-giao-duc',name:'Ngoại ngữ & Đào tạo',count:'3 chuyên ngành',icon:'🌐',img:DOMAIN_IMAGES['field-tieng-anh']},
    {slug:'ky-nang-van-phong',name:'Kỹ năng & Năng suất',count:'3 chuyên ngành',icon:'⚡',img:DOMAIN_IMAGES['field-tin-hoc-van-phong']},
    {slug:'khoa-hoc-ky-thuat',name:'AI & Khoa học máy tính',count:'4 chuyên ngành',icon:'🧠',img:DOMAIN_IMAGES['field-ai-va-machine-learning']}
  ];

  const categoriesMarkup=categoryHighlights.map(cat=>
    '<a class="edn-top-category-card group" href="#/group/'+esc(cat.slug)+'">'+
      '<div class="edn-top-cat-icon">'+cat.icon+'</div>'+
      '<div class="edn-top-cat-info">'+
        '<h3>'+esc(cat.name)+'</h3>'+
        '<span class="edn-top-cat-count">'+esc(cat.count)+'</span>'+
      '</div>'+
      '<div class="edn-top-cat-arrow" aria-hidden="true">'+arrowIcon+'</div>'+
    '</a>'
  ).join('');

  // Top Instructors
  const instructorsMarkup=INSTRUCTORS.slice(0,4).map(inst=>
    '<article class="edn-mentor-card group">'+
      '<div class="edn-mentor-avatar"><img src="'+esc(inst.avatar)+'" alt="'+esc(inst.name)+'" loading="lazy"><span class="edn-mentor-badge">✓ Verified</span></div>'+
      '<div class="edn-mentor-info">'+
        '<h3>'+esc(inst.name)+'</h3>'+
        '<p class="edn-mentor-role">'+esc(inst.role)+'</p>'+
        '<div class="edn-mentor-org"><span class="edn-org-pill">'+esc(inst.org)+'</span></div>'+
        '<div class="edn-mentor-metrics"><span>★ 4.95 Rating</span><span>3,500+ Học viên</span></div>'+
      '</div>'+
    '</article>'
  ).join('');

  // Testimonials
  const testimonials=[
    {quote:'Khóa C# và ASP.NET Core giúp tôi hệ thống lại kiến thức bài bản, làm được dự án API hoàn chỉnh và vượt qua phỏng vấn Backend Developer chỉ sau 3 tháng.',author:'Lê Tuấn Kiệt',title:'Backend Engineer tại VNG',avatar:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'},
    {quote:'Lộ trình UI/UX trên EduNext rất thực tế, tập trung vào design system, quy chuẩn auto-layout và tư duy sản phẩm số thay vì chỉ dạy công cụ Figma cơ bản.',author:'Nguyễn Thảo My',title:'Product Designer tại Tiki',avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'},
    {quote:'Khóa học SQL và Phân tích dữ liệu đi thẳng vào bài toán kinh doanh thật. Giờ đây mình có thể tự tin viết query phức tạp và xây dựng dashboard báo cáo cho sếp.',author:'Đỗ Minh Hoàng',title:'Data Analyst tại Shopee',avatar:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150'}
  ];

  const testimonialsMarkup=testimonials.map(t=>
    '<div class="edn-testimonial-card group">'+
      '<div class="edn-testimonial-quote-icon" aria-hidden="true">“</div>'+
      '<div class="edn-testimonial-stars">'+starIconMarkup+starIconMarkup+starIconMarkup+starIconMarkup+starIconMarkup+'</div>'+
      '<p class="edn-testimonial-quote">“'+esc(t.quote)+'”</p>'+
      '<div class="edn-testimonial-author">'+
        '<img src="'+esc(t.avatar)+'" alt="'+esc(t.author)+'" loading="lazy">'+
        '<div><strong>'+esc(t.author)+'</strong><small>'+esc(t.title)+'</small></div>'+
      '</div>'+
    '</div>'
  ).join('');

  // Quick topics
  const quickTopics=['Python','React & Next.js','UI/UX Design','Digital Marketing','Data & SQL','Flutter Mobile'];
  const quickTopicPills=quickTopics.map(topic=>
    '<button type="button" class="edn-quick-topic-btn group" data-a="topic" data-v="'+esc(topic)+'">'+animatedText(topic)+'</button>'
  ).join('');

  // Blog Highlights
  const articles=BLOG_ARTICLES.slice(0,3).map((art,idx)=>
    '<article class="edn-journal-card group'+(idx===0?' is-lead':'')+'">'+
      '<a class="edn-journal-thumb" href="#/blog/'+slugify(art.title)+'">'+
        '<img src="'+esc(art.image||'')+'" alt="" loading="lazy">'+
        '<span class="edn-journal-tag">'+esc(art.tag)+'</span>'+
      '</a>'+
      '<div class="edn-journal-body">'+
        '<span class="edn-journal-time"><svg class="edn-clock-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg> '+esc(art.time)+'</span>'+
        '<h3><a href="#/blog/'+slugify(art.title)+'">'+esc(art.title)+'</a></h3>'+
        '<p>'+esc(art.excerpt)+'</p>'+
        '<div class="edn-journal-readmore"><a href="#/blog/'+slugify(art.title)+'">'+animatedText('Đọc bài viết')+' '+arrowIcon+'</a></div>'+
      '</div>'+
    '</article>'
  ).join('');

  const qa=[
    ['EduNext có những lĩnh vực nào?','Danh mục được chia thành 11 nhóm chuyên ngành với 50 lĩnh vực đào tạo thực chiến từ CNTT, Thiết kế, Marketing đến Kinh doanh và Ngoại ngữ.'],
    ['Làm sao biết một khóa học đã mở bán?','Trạng thái được hiển thị rõ bằng huy hiệu Bán chạy hoặc Đề cương trên mỗi thẻ khóa học và trang chi tiết.'],
    ['Tôi có thể xem nội dung trước khi đăng ký không?','Có! Bạn có thể xem đề cương chi tiết từng bài học, mục tiêu đầu ra và video xem trước miễn phí.'],
    ['Tiến độ học tập và chứng chỉ được lưu như thế nào?','Khi tài khoản hoàn thành các bài học, hệ thống tự động ghi nhận tiến độ và cấp chứng chỉ số chính thức có mã định danh xác thực.']
  ].map(item=>'<details class="edn-im-faq-item"><summary><span>'+esc(item[0])+'</span><svg class="edn-faq-plus" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"></path></svg></summary><div class="edn-faq-body"><p>'+esc(item[1])+'</p></div></details>').join('');

  return '<div class="edn-home-page edn-marketplace-home">'+
    // ZiroBuild Dark Hero Section
    '<section class="edn-ziro-hero">'+
      '<div class="wrap edn-ziro-wrapper">'+
        '<div class="edn-ziro-content">'+
          '<div class="edn-ziro-pill">'+
            '<span class="edn-ziro-pill-dot" aria-hidden="true"></span>'+
            '<span>Nền tảng học kỹ năng số thực chiến</span>'+
          '</div>'+
          '<h1 class="edn-ziro-headline">'+
            'Khám phá lộ trình chuẩn.<br>'+
            '<span class="edn-ziro-gradient-text">Nâng tầm sự nghiệp số.</span>'+
          '</h1>'+
          '<p class="edn-ziro-paragraph">'+
            'Hơn 100 chương trình thực hành từ chuyên gia công nghệ, dữ liệu, thiết kế và kinh doanh. Học theo dự án thực tế, tích lũy portfolio chuyên nghiệp.'+
          '</p>'+
          '<div class="edn-ziro-cta-row">'+
            '<a href="#/courses" class="edn-ziro-btn-primary group">'+
              animatedText('Khám phá khóa học')+
            '</a>'+
            '<a href="#/categories" class="edn-ziro-btn-secondary group">'+
              animatedText('Bắt đầu ngay')+
              '<svg class="w-4 h-4 ml-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'+
            '</a>'+
          '</div>'+
          '<form class="edn-hero-search-form edn-ziro-search" data-form="search">'+
            '<div class="edn-ziro-search-box">'+
              '<svg class="edn-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>'+
              '<input name="q" placeholder="Bạn muốn học gì hôm nay? (VD: C#, React, UI/UX, AI, Python...)" aria-label="Tìm khóa học">'+
              '<button type="submit" class="edn-ziro-search-btn group">'+animatedText('Tìm kiếm')+'</button>'+
            '</div>'+
          '</form>'+
          '<div class="edn-ziro-quick-topics"><span>Tìm kiếm phổ biến:</span>'+quickTopicPills+'</div>'+
        '</div>'+
      '</div>'+
    '</section>'+

    // Stats and Metrics (Luma Dark Card Style with Original Metrics)
    '<section class="edn-luma-stats">'+
      '<div class="wrap edn-luma-wrap">'+
        '<div class="edn-luma-grid">'+
          '<div class="edn-luma-card group">'+
            '<div class="edn-luma-glow" aria-hidden="true"></div>'+
            '<div class="edn-luma-num edn-luma-grad-1">100+</div>'+
            '<div class="edn-luma-card-body">'+
              '<h4>Khóa thực chiến</h4>'+
            '</div>'+
            '<div class="edn-luma-dot-wrap" aria-hidden="true">'+
              '<div class="edn-luma-dot-anim">'+
                '<svg class="edn-luma-svg-dots" viewBox="0 0 100 100"><defs><pattern id="lumaDotGrid1" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2DD4BF"/></pattern></defs><rect width="100" height="100" fill="url(#lumaDotGrid1)"/></svg>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="edn-luma-card group">'+
            '<div class="edn-luma-glow" aria-hidden="true"></div>'+
            '<div class="edn-luma-num edn-luma-grad-2">50</div>'+
            '<div class="edn-luma-card-body">'+
              '<h4>Chuyên ngành đào tạo</h4>'+
            '</div>'+
            '<div class="edn-luma-dot-wrap" aria-hidden="true">'+
              '<div class="edn-luma-dot-anim">'+
                '<svg class="edn-luma-svg-dots" viewBox="0 0 100 100"><defs><pattern id="lumaDotGrid2" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2DD4BF"/></pattern></defs><rect width="100" height="100" fill="url(#lumaDotGrid2)"/></svg>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="edn-luma-card group">'+
            '<div class="edn-luma-glow" aria-hidden="true"></div>'+
            '<div class="edn-luma-num edn-luma-grad-3">15,000+</div>'+
            '<div class="edn-luma-card-body">'+
              '<h4>Học viên theo học</h4>'+
            '</div>'+
            '<div class="edn-luma-dot-wrap" aria-hidden="true">'+
              '<div class="edn-luma-dot-anim">'+
                '<svg class="edn-luma-svg-dots" viewBox="0 0 100 100"><defs><pattern id="lumaDotGrid3" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2DD4BF"/></pattern></defs><rect width="100" height="100" fill="url(#lumaDotGrid3)"/></svg>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="edn-luma-card group">'+
            '<div class="edn-luma-glow" aria-hidden="true"></div>'+
            '<div class="edn-luma-num edn-luma-grad-4">98%</div>'+
            '<div class="edn-luma-card-body">'+
              '<h4>Hài lòng & Có việc</h4>'+
            '</div>'+
            '<div class="edn-luma-dot-wrap" aria-hidden="true">'+
              '<div class="edn-luma-dot-anim">'+
                '<svg class="edn-luma-svg-dots" viewBox="0 0 100 100"><defs><pattern id="lumaDotGrid4" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2DD4BF"/></pattern></defs><rect width="100" height="100" fill="url(#lumaDotGrid4)"/></svg>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</section>'+

    // 1. Top Categories Grid (Jiro Build Feature Grid style)
    '<section class="edn-categories-section"><div class="wrap">'+
      '<div class="edn-section-header">'+
        '<div>'+
          '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>50 Chuyên ngành thực chiến</span></div>'+
          '<h2>Khám phá theo <span class="edn-ziro-gradient-text">lĩnh vực hàng đầu</span></h2>'+
          '<p>Chọn đúng định hướng nghề nghiệp từ 50 chuyên ngành được chuẩn hóa theo thực tế doanh nghiệp.</p>'+
        '</div>'+
        '<a class="edn-header-link group" href="#/categories">'+animatedText('Xem tất cả 50 lĩnh vực')+' '+arrowIcon+'</a>'+
      '</div>'+
      '<div class="edn-top-categories-grid">'+categoriesMarkup+'</div>'+
    '</div></section>'+

    // 2. Featured Courses with 1-Click Filter Tabs (Jiro Build Showcase style)
    '<section class="edn-courses-section"><div class="wrap">'+
      '<div class="edn-section-header">'+
        '<div>'+
          '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Chương trình chọn lọc</span></div>'+
          '<h2>Khóa học <span class="edn-ziro-gradient-text">thực chiến nổi bật</span></h2>'+
          '<p>Giáo trình cô đọng, bài tập thực hành theo dự án thật, hỗ trợ hỏi đáp trực tiếp cùng mentor.</p>'+
        '</div>'+
        '<a class="edn-header-link group" href="#/courses">'+animatedText('Xem tất cả '+C.length+' khóa học')+' '+arrowIcon+'</a>'+
      '</div>'+
      '<div class="edn-home-tabs-bar">'+tabsMarkup+'</div>'+
      '<div class="edn-featured-grid">'+visibleCourses.map(card).join('')+'</div>'+
      '<div class="edn-section-footer-cta"><a class="edn-jiro-btn-outline group" href="#/courses">'+animatedText('Xem thêm toàn bộ danh mục khóa học')+' '+arrowIcon+'</a></div>'+
    '</div></section>'+

    // 3. How It Works / Value Prop (Jiro Build Bento Split Value Proposition)
    '<section class="edn-workflow-section"><div class="wrap edn-workflow-layout">'+
      '<div class="edn-workflow-copy">'+
        '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Trải nghiệm tinh gọn</span></div>'+
        '<h2>Học tập chủ động.<br><span class="edn-ziro-gradient-text">Tiến bộ từng ngày.</span></h2>'+
        '<p class="edn-workflow-lead">EduNext loại bỏ rườm rà, tập trung 100% vào việc giúp bạn xây dựng kỹ năng và sản phẩm thật.</p>'+
        '<div class="edn-workflow-steps">'+
          '<div class="edn-wf-step group"><div class="edn-wf-num">01</div><div><h3>Lộ trình chuẩn hóa</h3><p>Xem trước đề cương chi tiết, mục tiêu đầu ra và video giới thiệu trước khi đăng ký.</p></div></div>'+
          '<div class="edn-wf-step group"><div class="edn-wf-num">02</div><div><h3>Thực hành theo dự án</h3><p>Mỗi bài giảng đều đi kèm code mẫu, tài liệu cheat sheet và bài tập áp dụng thực tế.</p></div></div>'+
          '<div class="edn-wf-step group"><div class="edn-wf-num">03</div><div><h3>Chứng chỉ số định danh</h3><p>Hoàn thành toàn bộ bài học để nhận chứng chỉ chính thức có mã tra cứu trên hệ thống.</p></div></div>'+
        '</div>'+
      '</div>'+
      '<div class="edn-workflow-preview">'+
        '<div class="edn-classroom-preview-card">'+
          '<div class="edn-prev-video-box">'+
            '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=700" alt="Video bài giảng">'+
            '<span class="edn-prev-play-btn">▶</span>'+
            '<div class="edn-prev-badge">Trải nghiệm bài giảng</div>'+
          '</div>'+
          '<div class="edn-prev-details">'+
            '<div class="edn-prev-header"><span>Bài 03 / 24</span><strong>Xây dựng REST API với ASP.NET Core</strong></div>'+
            '<div class="edn-prev-checklist">'+
              '<div>'+checkIcon+' <span>Cấu hình Controller & Dependency Injection</span></div>'+
              '<div>'+checkIcon+' <span>Kết nối CSDL Entity Framework Core</span></div>'+
              '<div>'+checkIcon+' <span>Kiểm thử tự động với Swagger & Postman</span></div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div></section>'+

    // 4. Top Mentors / Instructors (Jiro Build Mentors Monday style)
    '<section class="edn-mentors-section"><div class="wrap">'+
      '<div class="edn-section-header">'+
        '<div>'+
          '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Đội ngũ chuyên gia</span></div>'+
          '<h2>Giảng viên <span class="edn-ziro-gradient-text">hàng đầu ngành</span></h2>'+
          '<p>Học hỏi trực tiếp từ các Tech Lead, Principal Engineer và Head of Product tại các tập đoàn công nghệ lớn.</p>'+
        '</div>'+
      '</div>'+
      '<div class="edn-mentors-grid">'+instructorsMarkup+'</div>'+
    '</div></section>'+

    // 5. Testimonials (Jiro Build Testimonials style)
    '<section class="edn-testimonials-section"><div class="wrap">'+
      '<div class="edn-section-header">'+
        '<div>'+
          '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Đánh giá thực tế</span></div>'+
          '<h2>Cảm nhận từ <span class="edn-ziro-gradient-text">học viên</span></h2>'+
          '<p>Hơn 15,000 học viên đã nâng cao kỹ năng và bứt phá sự nghiệp cùng EduNext.</p>'+
        '</div>'+
      '</div>'+
      '<div class="edn-testimonials-grid">'+testimonialsMarkup+'</div>'+
    '</div></section>'+

    // 6. Knowledge Magazine / Blog (Jiro Build Blogs style)
    '<section class="edn-journal-section"><div class="wrap">'+
      '<div class="edn-section-header">'+
        '<div>'+
          '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Góc chuyên môn</span></div>'+
          '<h2>Kiến thức & <span class="edn-ziro-gradient-text">Kinh nghiệm thực tế</span></h2>'+
          '<p>Những bài học ngắn, phương pháp tư duy và kinh nghiệm đúc kết từ các dự án phát triển phần mềm.</p>'+
        '</div>'+
        '<a class="edn-header-link group" href="#/blog">'+animatedText('Xem tất cả bài viết')+' '+arrowIcon+'</a>'+
      '</div>'+
      '<div class="edn-journal-cards-grid">'+articles+'</div>'+
    '</div></section>'+

    // 7. FAQ Accordion (Jiro Build FAQ style)
    '<section class="edn-faq-section"><div class="wrap edn-faq-layout">'+
      '<div class="edn-faq-intro">'+
        '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Hỏi đáp & Hỗ trợ</span></div>'+
        '<h2>Những điều cần biết <br><span class="edn-ziro-gradient-text">trước khi học</span></h2>'+
        '<p>Giải đáp thắc mắc về lộ trình đào tạo, quyền truy cập và chính sách cấp chứng chỉ tại EduNext.</p>'+
        '<div class="edn-faq-help-box">'+
          '<h4>Bạn có câu hỏi khác?</h4>'+
          '<p>Đội ngũ cố vấn luôn sẵn sàng giải đáp thắc mắc 24/7 qua cộng đồng và live chat.</p>'+
          '<a class="edn-header-link group" href="#/faq">'+animatedText('Xem toàn bộ câu hỏi')+' '+arrowIcon+'</a>'+
        '</div>'+
      '</div>'+
      '<div class="edn-faq-accordion">'+qa+'</div>'+
    '</div></section>'+

    // 8. Final High-Converting CTA (Jiro Build Pre-Footer Cosmic CTA)
    '<section class="edn-final-cta"><div class="wrap edn-cta-box">'+
      '<div class="edn-cta-ambient" aria-hidden="true"></div>'+
      '<div class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Bắt đầu ngay hôm nay</span></div>'+
      '<h2>Sẵn sàng bắt đầu <span class="edn-ziro-gradient-text">lộ trình của bạn?</span></h2>'+
      '<p>Gia nhập cộng đồng hơn 15,000 học viên nâng tầm kỹ năng số ngay hôm nay.</p>'+
      '<div class="edn-cta-actions">'+
        '<a class="edn-ziro-btn-primary group" href="#/courses">'+animatedText('Khám phá khóa học ngay')+' '+arrowIcon+'</a>'+
        '<a class="edn-ziro-btn-secondary group" href="#/categories">'+animatedText('Duyệt 50 lĩnh vực')+'</a>'+
      '</div>'+
      '<div class="edn-cta-trust-bar">'+
        '<span>🔒 Truy cập vĩnh viễn</span>'+
        '<span class="edn-cta-trust-sep">•</span>'+
        '<span>🎓 Chứng chỉ số định danh</span>'+
        '<span class="edn-cta-trust-sep">•</span>'+
        '<span>💬 Hỏi đáp 1-1 cùng Mentor</span>'+
      '</div>'+
    '</div></section>'+
  '</div>';
};
const list=()=>{
  const root=$('#list');
  if(!root)return;
  const q=(f.q||'').trim().toLocaleLowerCase('vi-VN');
  currentCourseResults=C.filter(c=>{
    const fields=[c.t,c.cat,c.description].concat(c.topics||[]);
    const textMatch=!q||fields.some(v=>String(v||'').toLocaleLowerCase('vi-VN').includes(q));
    const domainMatch=!f.domainId||c.domainId===f.domainId;
    const catMatch=!f.cat||c.cat===f.cat;
    const topicMatch=!f.topic||(c.topics||[]).some(t=>t.toLocaleLowerCase('vi-VN')===String(f.topic).toLocaleLowerCase('vi-VN'));
    return textMatch&&domainMatch&&catMatch&&topicMatch;
  });
  if(f.sort==='name-desc')currentCourseResults.sort((a,b)=>b.t.localeCompare(a.t,'vi'));
  else if(f.sort==='domain')currentCourseResults.sort((a,b)=>a.cat.localeCompare(b.cat,'vi')||a.t.localeCompare(b.t,'vi'));
  else currentCourseResults.sort((a,b)=>a.t.localeCompare(b.t,'vi'));
  const pageCount=Math.max(1,Math.ceil(currentCourseResults.length/PAGE_SIZE));
  f.page=Math.min(Math.max(1,Number(f.page)||1),pageCount);
  const start=(f.page-1)*PAGE_SIZE;
  const shown=currentCourseResults.slice(start,start+PAGE_SIZE);
  root.innerHTML=shown.length?shown.map(card).join(''):'<div class="empty edn-course-empty"><h3>Chưa tìm thấy đề cương phù hợp</h3><p>Thử thay đổi từ khóa hoặc xóa bộ lọc để xem toàn bộ danh mục.</p><button class="btn btn-g" type="button" data-a="clear">Xóa bộ lọc</button></div>';
  const count=$('#cnt');
  if(count)count.textContent=currentCourseResults.length?(start+1)+'–'+(start+shown.length)+' / '+currentCourseResults.length:'0 / 0';
  const pagination=$('#course-pagination');
  if(pagination)pagination.innerHTML=paginationMarkup('courses',f.page,pageCount,'khóa học');
  const summary=$('#course-filter-summary');
  if(summary){
    const terms=[];
    if(f.cat)terms.push(f.cat);
    if(f.topic)terms.push(f.topic);
    if(q)terms.push('Từ khóa: '+q);
    summary.textContent=terms.length?'Đang lọc: '+terms.join(' · '):'Tất cả chuyên ngành và chủ đề';
  }
};
const courses=()=>{
  hook=list;
  const selectedTopics=[...new Set(DOMAINS.flatMap(d=>d.topics||[]))].sort((a,b)=>a.localeCompare(b,'vi'));
  const domainOptions=domainGroups().map(group=>'<optgroup label="'+esc(group.name)+'">'+group.domains.map(d=>'<option value="'+esc(d.name)+'" '+(f.cat===d.name?'selected':'')+'>'+esc(d.name)+'</option>').join('')+'</optgroup>').join('');
  const categoryPills=[
    {label:'Tất cả',cat:''},
    {label:'Lập trình phần mềm',cat:'Lập trình và phát triển phần mềm'},
    {label:'Phát triển Web',cat:'Phát triển Web'},
    {label:'Thiết kế UI/UX',cat:'UI/UX và Thiết kế sản phẩm số'},
    {label:'Digital Marketing',cat:'Digital Marketing'},
    {label:'Cơ sở dữ liệu',cat:'Cơ sở dữ liệu'},
    {label:'AI & Học máy',cat:'Trí tuệ nhân tạo (AI) và Machine Learning'},
    {label:'Quản trị kinh doanh',cat:'Quản trị doanh nghiệp'}
  ].map(p=>'<button type="button" class="edn-course-cat-pill'+(f.cat===p.cat?' is-active':'')+'" data-a="cat" data-v="'+esc(p.cat)+'">'+esc(p.label)+'</button>').join('');

  return '<div class="wrap page cio-courses-page edn-course-catalog-page">'+
    '<div class="edn-catalog-pills-row">'+categoryPills+'</div>'+
    '<div class="cio-course-toolbar"><div class="cio-search-local"><span aria-hidden="true">⌕</span><input data-f="q" value="'+esc(f.q)+'" placeholder="Tìm tên khóa học, lĩnh vực hoặc kỹ năng..." aria-label="Tìm trong danh mục"></div>'+
    '<div class="cio-toolbar-right"><select data-f="cat" aria-label="Lọc chuyên ngành"><option value="">Tất cả chuyên ngành</option>'+domainOptions+'</select>'+
    '<select data-f="topic" aria-label="Lọc chủ đề"><option value="">Tất cả chủ đề</option>'+selectedTopics.map(t=>'<option value="'+esc(t)+'" '+(f.topic===t?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select>'+
    '<select data-f="sort" aria-label="Sắp xếp"><option value="name" '+(f.sort==='name'?'selected':'')+'>Tên A–Z</option><option value="name-desc" '+(f.sort==='name-desc'?'selected':'')+'>Tên Z–A</option><option value="domain" '+(f.sort==='domain'?'selected':'')+'>Theo lĩnh vực</option></select></div></div>'+
    '<div class="edn-course-filter-meta"><span id="course-filter-summary">Tất cả chuyên ngành và chủ đề</span><button type="button" class="edn-clear-filters" data-a="clear">Xóa bộ lọc</button></div>'+
    '<div class="cio-count-row"><span id="cnt"></span><span>khóa học tìm thấy</span></div>'+
    '<div class="grid cio-course-grid edn-courses-grid" id="list" aria-live="polite"></div>'+
    '<div id="course-pagination"></div>'+
  '</div>';
};
const domainsPage=()=>{
  const groups=domainGroups();
  const arrowIcon='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
  return '<div class="wrap page edn-domain-page">'+
    '<div class="edn-page-intro"><span class="edn-hero-badge"><span class="edn-badge-dot"></span> KHÁM PHÁ THEO LĨNH VỰC</span><h1>50 Chuyên ngành đào tạo</h1><p>Tìm đúng hướng đi từ công nghệ thông tin, thiết kế, marketing, quản trị kinh doanh đến ngoại ngữ và kỹ năng số.</p></div>'+
    '<div class="edn-domain-visual-grid">'+groups.map((group,index)=>{
      const groupIds=new Set(group.domains.map(domain=>domain.id));
      const courseCount=C.filter(course=>groupIds.has(course.domainId)).length;
      const bgImg=getGroupImage(group);
      return '<a class="edn-visual-domain-card" href="#/group/'+esc(group.slug)+'">'+
        '<div class="edn-domain-card-bg"><img src="'+esc(bgImg)+'" alt="" loading="lazy"><div class="edn-domain-overlay"></div></div>'+
        '<div class="edn-domain-card-content"><h3>'+esc(group.name)+'</h3><span>'+group.domains.length+' chuyên ngành · '+courseCount+' chương trình</span><span class="edn-domain-explore-btn">Khám phá '+arrowIcon+'</span></div>'+
      '</a>';
    }).join('')+'</div></div>';
};
const groupDetail=slug=>{
  const group=domainGroups().find(item=>item.slug===slug);
  if(!group)return nf();
  const domainIds=new Set(group.domains.map(domain=>domain.id));
  const courseCount=C.filter(course=>domainIds.has(course.domainId)).length;
  const arrowIcon='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
  return '<div class="wrap page edn-domain-detail edn-domain-group-detail"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Nhóm lĩnh vực</a><span>›</span><span>'+esc(group.name)+'</span></nav>'+
    '<div class="edn-page-intro"><h1>'+esc(group.name)+'</h1></div>'+
    '<section class="edn-domain-programs"><div class="edn-domain-visual-grid">'+group.domains.map(domain=>{
      const cCount=C.filter(course=>course.domainId===domain.id).length;
      const bgImg=getDomainImage(domain);
      return '<a class="edn-visual-domain-card" href="#/domain/'+esc(domain.slug)+'">'+
        '<div class="edn-domain-card-bg"><img src="'+esc(bgImg)+'" alt="" loading="lazy"><div class="edn-domain-overlay"></div></div>'+
        '<div class="edn-domain-card-content"><h3>'+esc(domain.name)+'</h3><span>'+cCount+' khóa học</span><span class="edn-domain-explore-btn">Xem chi tiết '+arrowIcon+'</span></div>'+
      '</a>';
    }).join('')+'</div></section></div>';
};
const domainDetail=slug=>{
  const d=DOMAINS.find(item=>item.slug===slug);
  if(!d)return nf();
  const group=findDomainGroup(d);
  const related=(d.topics||[]).map(topic=>'<button type="button" class="edn-topic-chip" data-a="topic" data-v="'+esc(topic)+'">'+esc(topic)+'</button>').join('');
  const coursesInDomain=C.filter(c=>c.domainId===d.id);
  const arrowIcon='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5"></path></svg>';
  return '<div class="wrap page edn-domain-detail"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Nhóm lĩnh vực</a><span>›</span>'+(group?'<a href="#/group/'+esc(group.slug)+'">'+esc(group.name)+'</a><span>›</span>':'')+'<span>'+esc(d.name)+'</span></nav>'+
    '<div class="edn-page-intro"><h1>'+esc(d.name)+'</h1></div>'+
    '<section class="edn-domain-programs"><div class="edn-section-header"><div><h2>Các khóa học trong chuyên ngành</h2><p>Lựa chọn chương trình phù hợp với mục tiêu học tập của bạn.</p></div></div><div class="edn-courses-grid edn-domain-course-grid">'+(coursesInDomain.length?coursesInDomain.map(card).join(''):'<div class="empty"><h3>Chưa có khóa học nào</h3><p>Các khóa học trong chuyên ngành này đang được biên soạn.</p><a class="btn btn-g" href="#/courses">Xem tất cả khóa học</a></div>')+'</div></section></div>';
};
const TOPIC_VIDEOS = {
  // Công nghệ thông tin & Lập trình
  code: [
    'https://www.youtube.com/watch?v=3ST-7TP09qk',
    'https://www.youtube.com/watch?v=Kg_k0vL0dD4',
    'https://www.youtube.com/watch?v=yH-ewL_u8w8',
    'https://www.youtube.com/watch?v=F1-56lIvAQE',
    'https://www.youtube.com/watch?v=7PDNqmBdtrE',
    'https://www.youtube.com/watch?v=Vp0vVzJgJ5g',
    'https://www.youtube.com/watch?v=P1VJu5V3da8',
    'https://www.youtube.com/watch?v=aer8S1fFbNc'
  ],
  // Thiết kế, Đồ họa, UI/UX, 3D
  design: [
    'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
    'https://www.youtube.com/watch?v=70hQJ-E_s8c',
    'https://www.youtube.com/watch?v=FQ57q7Il33o',
    'https://www.youtube.com/watch?v=VZ8lInQ3wTc',
    'https://www.youtube.com/watch?v=crtlmXVrS_8',
    'https://www.youtube.com/watch?v=dFSia1LZI4Y'
  ],
  // Kinh doanh, Bán hàng B2B, Khởi nghiệp, Quản trị
  business: [
    'https://www.youtube.com/watch?v=6P_bH1sF6o8',
    'https://www.youtube.com/watch?v=O1hChU6Z5vE',
    'https://www.youtube.com/watch?v=gQ5H3hB1Zl8',
    'https://www.youtube.com/watch?v=2e6iFwP1r5g',
    'https://www.youtube.com/watch?v=3vK8r4M9Q1s',
    'https://www.youtube.com/watch?v=4d8k7wP1z3g'
  ],
  // Marketing, Content, SEO
  marketing: [
    'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    'https://www.youtube.com/watch?v=B8ofWFx525s',
    'https://www.youtube.com/watch?v=6l3z3M5G4y8',
    'https://www.youtube.com/watch?v=8q5z1X2W7v4',
    'https://www.youtube.com/watch?v=5r9t3M2N8y1'
  ],
  // Dữ liệu, AI, Database, Khoa học
  data: [
    'https://www.youtube.com/watch?v=HXV3zeQKqGY',
    'https://www.youtube.com/watch?v=7S_tz1z_5bA',
    'https://www.youtube.com/watch?v=aircAruvnKk',
    'https://www.youtube.com/watch?v=mkv5mxNj44k',
    'https://www.youtube.com/watch?v=ua-CiDNNj30'
  ],
  // Kỹ năng, Ngoại ngữ, Đời sống
  general: [
    'https://www.youtube.com/watch?v=70hQJ-E_s8c',
    'https://www.youtube.com/watch?v=FQ57q7Il33o',
    'https://www.youtube.com/watch?v=VZ8lInQ3wTc',
    'https://www.youtube.com/watch?v=3ST-7TP09qk',
    'https://www.youtube.com/watch?v=Kg_k0vL0dD4'
  ]
};

const resolveLessonVideo = (lesson, course, index = 0) => {
  if (lesson && lesson.videoUrl && String(lesson.videoUrl).trim().length > 0) {
    return String(lesson.videoUrl).trim();
  }
  const cid = String(course ? course.id || course.slug || '' : '').toLowerCase();
  const cat = String(course ? course.cat || course.domain || '' : '').toLowerCase();
  let pool = TOPIC_VIDEOS.general;
  if (/csharp|api|code|lap-trinh|flutter|kotlin|web|software|developer|devops|cloud|mang|game|an-ninh/i.test(cid + ' ' + cat)) {
    pool = TOPIC_VIDEOS.code;
  } else if (/design|ui|ux|do-hoa|3d|blender|autocad|kien-truc|video|nhiep-anh/i.test(cid + ' ' + cat)) {
    pool = TOPIC_VIDEOS.design;
  } else if (/ban-hang|b2b|kinh-doanh|quan-tri|du-an|tai-chinh|khoi-nghiep|bat-dong-san/i.test(cid + ' ' + cat)) {
    pool = TOPIC_VIDEOS.business;
  } else if (/marketing|seo|content|quang-cao|truyen-thong/i.test(cid + ' ' + cat)) {
    pool = TOPIC_VIDEOS.marketing;
  } else if (/data|sql|ai|llm|machine-learning|du-lieu|toan/i.test(cid + ' ' + cat)) {
    pool = TOPIC_VIDEOS.data;
  }
  return pool[index % pool.length];
};

const videoMarkup=(url,title)=>{
  const effectiveUrl = url || 'https://www.youtube.com/watch?v=70hQJ-E_s8c';
  const raw=String(effectiveUrl).trim();
  const startMatch=raw.match(/[?&]t=(\d+)s?/i);
  const startParam=startMatch?'&start='+String(Number(startMatch[1])):'';
  const playlist=raw.match(/(?:youtube(?:-nocookie)?\.com\/(?:playlist|embed\/videoseries)[^#]*[?&]list=)([A-Za-z0-9_-]{10,})/i);
  if(playlist){
    const idx=raw.match(/[?&]index=(\d+)/i);
    const source='https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(playlist[1])+(idx?'&index='+encodeURIComponent(idx[1]):'')+'&rel=0&playsinline=1';
    return '<iframe src="'+source+'" title="'+esc(title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  }
  const yt=raw.match(/(?:youtube-nocookie\.com\/embed\/|youtube\.com\/(?:watch\?[^#]*v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
  if(yt)return '<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(yt[1])+'?rel=0&playsinline=1'+startParam+'" title="'+esc(title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  if(/^https:\/\/.+\.mp4(?:\?.*)?$/i.test(raw))return '<video controls preload="metadata" src="'+esc(raw)+'" aria-label="'+esc(title)+'"></video>';
  return '<div class="edn-media-unavailable" role="status"><strong>Định dạng học liệu chưa hỗ trợ</strong><p>Học liệu cần được kiểm tra trước khi xuất bản.</p></div>';
};
const detail=id=>{
  const c=find(id);
  if(!c)return nf();
  const owned=!!EN()[id];
  const canViewLessons=true;
  const domain=DOMAINS.find(d=>d.id===c.domainId);
  const group=findDomainGroup(domain);
  const instructor=getCourseInstructor(c);
  const stats=getCourseStats(c);
  const discountPct=typeof c.o==='number'&&c.o>c.p?Math.round((1-c.p/c.o)*100):null;
  const topics=(c.topics||[]).map(topic=>'<button type="button" class="edn-topic-chip" data-a="topic" data-v="'+esc(topic)+'">'+esc(topic)+'</button>').join('');
  const checkIcon='<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

  // Build multi-section chapters matching Udemy layout (3 sections: Căn bản & Chuẩn bị, Thực hành chuyên sâu, Dự án thực chiến & Tối ưu)
  const totalLessons = c.lessons.length;
  const totalDuration = c.h ? c.h + ' giờ' : (totalLessons * 14) + ' phút';

  const sectionCount = totalLessons >= 6 ? 3 : (totalLessons >= 3 ? 2 : 1);
  const chunkSize = Math.ceil(totalLessons / sectionCount);

  const sectionNames = [
    'Phần 1: Giới thiệu, Tư duy nền tảng & Thiết lập ban đầu',
    'Phần 2: Kỹ năng cốt lõi & Quy trình thực hành chuyên sâu',
    'Phần 3: Triển khai dự án thực chiến, Tối ưu & Tổng kết'
  ];

  const sectionsData = [];
  for (let sIdx = 0; sIdx < sectionCount; sIdx++) {
    const start = sIdx * chunkSize;
    const end = Math.min(start + chunkSize, totalLessons);
    const sectionLessons = c.lessons.slice(start, end);
    if (!sectionLessons.length) continue;

    const sDuration = Math.round((sectionLessons.length / totalLessons) * (c.h ? c.h * 60 : totalLessons * 14)) + ' phút';
    const sRows = sectionLessons.map((lesson, lIdx) => {
      const globalIdx = start + lIdx;
      const durationText = (2 + ((globalIdx * 7) % 5)) + ':' + String((globalIdx * 17 + 12) % 60).padStart(2, '0');
      return '<div class="edn-udemy-lecture-row is-preview">' +
        '<div class="edn-lecture-left">' +
          '<span class="edn-lecture-play-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon></svg>' +
          '</span>' +
          '<span class="edn-lecture-title">' + esc(lesson.title) + '</span>' +
        '</div>' +
        '<div class="edn-lecture-right">' +
          '<button type="button" class="edn-lecture-preview-link" data-a="course-player" data-v="' + esc(id) + ',' + globalIdx + '">Xem trước</button>' +
          '<span class="edn-lecture-time">' + durationText + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    sectionsData.push({
      title: sectionNames[sIdx] || ('Phần ' + (sIdx + 1) + ': Chuyên đề ' + (sIdx + 1)),
      lessonsCount: sectionLessons.length,
      duration: sDuration,
      rows: sRows,
      isOpen: sIdx === 0
    });
  }

  // Right column lesson focus content (Ảnh 2 -> Chuyển vào Ảnh 3)
  const firstLesson = c.lessons[0] || {};
  const lessonMaterialBlock = (firstLesson && firstLesson.content)
    ? '<div class="edn-course-right-material-panel">' +
        '<div class="edn-right-material-header">' +
          '<span class="edn-jiro-badge"><span class="edn-jiro-badge-dot"></span><span>Trọng tâm bài giảng</span></span>' +
          '<h3>' + esc(firstLesson.title || 'Nội dung cốt lõi') + '</h3>' +
        '</div>' +
        '<div class="edn-right-material-body">' +
          lessonMaterialMarkup(firstLesson.content) +
        '</div>' +
        (firstLesson.exercise ? '<div class="edn-right-exercise-box"><h4>Bài tập thực hành</h4><p>' + esc(firstLesson.exercise) + '</p></div>' : '') +
        (firstLesson.resourceUrl ? '<div class="edn-right-res-link"><a class="btn btn-g w" href="' + esc(firstLesson.resourceUrl) + '" target="_blank" rel="noopener noreferrer">Mở tài liệu bổ sung ↗</a></div>' : '') +
      '</div>'
    : '';

  const visual='<img src="'+esc(getCourseImage(c))+'" alt="'+esc(c.t)+'" loading="eager">';
  const outcomes=Array.isArray(c.outcomes)?c.outcomes:[];

  return '<div class="edn-course-detail-page">'+
    '<section class="edn-course-hero"><div class="wrap edn-course-hero-inner">'+
      '<div class="edn-course-intro">'+
        '<nav class="edn-course-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Lĩnh vực</a><span>›</span>'+(group?'<a href="#/group/'+esc(group.slug)+'">'+esc(group.name)+'</a><span>›</span>':'')+'<a href="#/domain/'+esc(domain?domain.slug:'')+'">'+esc(c.cat)+'</a></nav>'+
        '<div class="edn-course-eyebrow">'+esc(c.cat)+' <span>·</span> Khóa học thực chiến</div>'+
        '<h1>'+esc(c.t)+'</h1>'+
        '<p class="edn-course-subtitle">'+esc(c.shortDescription||c.description||'Chương trình đào tạo thực tiễn giúp bạn làm chủ kỹ năng số.')+'</p>'+
        '<div class="edn-course-rating-row">'+
          '<span class="edn-rating-stars">'+starIconMarkup+' <b>'+stats.rating+'</b></span>'+
          '<span class="edn-rating-count">('+stats.reviews.toLocaleString('vi-VN')+' đánh giá)</span>'+
          '<span class="edn-student-count">👨‍🎓 '+stats.students.toLocaleString('vi-VN')+' học viên</span>'+
        '</div>'+
        '<div class="edn-course-meta-tags">'+
          '<span><b>Cấp độ:</b> '+(c.lvl||'Mọi cấp độ')+'</span>'+
          '<span><b>Thời lượng:</b> '+(c.h?c.h+' giờ học':c.L.length+' bài giảng')+'</span>'+
          '<span><b>Ngôn ngữ:</b> Tiếng Việt</span>'+
          '<span><b>Chứng chỉ:</b> Có mã xác nhận</span>'+
        '</div>'+
        '<div class="edn-instructor-compact">'+
          '<img src="'+esc(instructor.avatar)+'" alt="'+esc(instructor.name)+'">'+
          '<div><small>Giảng viên chính</small><strong>'+esc(instructor.name)+'</strong> <span>('+esc(instructor.role)+' @ '+esc(instructor.org)+')</span></div>'+
        '</div>'+
      '</div>'+

      // Sticky buy box
      '<aside class="edn-course-buy-card" aria-label="Thông tin đăng ký khóa học">'+
        '<div class="edn-course-preview edn-course-preview-static">'+
          visual+
          '<div class="edn-preview-play-icon" data-a="course-player" data-v="'+esc(id)+',0">▶</div>'+
          '<span class="edn-preview-label">Xem thử bài giảng đầu</span>'+
        '</div>'+
        '<div class="edn-course-buy-content">'+
          '<div class="edn-course-detail-pricing">'+
            '<div class="edn-detail-price-main"><strong class="edn-detail-price-curr">'+esc(money(c.p))+'</strong>'+(typeof c.o==='number'&&c.o>c.p?'<del class="edn-detail-price-old">'+esc(money(c.o))+'</del>':'')+'</div>'+
            (discountPct?'<span class="edn-detail-discount-tag">Tiết kiệm '+discountPct+'%</span>':'')+
          '</div>'+
          '<div class="edn-buy-actions-stack">'+
            (owned
              ? '<a class="btn btn-p w edn-btn-big" href="#/learn/'+esc(id)+'/'+nextL(c)+'">Vào học ngay →</a>'
              : '<a class="btn btn-p w edn-btn-big" href="#/checkout/'+esc(id)+'">Mua ngay với giá ưu đãi</a><button class="btn btn-g w" type="button" data-a="cart-add" data-v="'+esc(id)+'">'+cartIconMarkup+' Thêm vào giỏ hàng</button>')+
            '<button class="btn btn-subtle w" type="button" data-a="course-player" data-v="'+esc(id)+',0">Học thử bài giảng miễn phí</button>'+
          '</div>'+
          '<div class="edn-course-includes">'+
            '<strong>Khóa học bao gồm:</strong>'+
            '<span>'+checkIcon+' '+c.L.length+' bài giảng video chất lượng cao</span>'+
            '<span>'+checkIcon+' Tài nguyên, code mẫu & cheat sheet</span>'+
            '<span>'+checkIcon+' Quyền truy cập trọn đời trên mọi thiết bị</span>'+
            '<span>'+checkIcon+' Chứng chỉ số chính thức khi hoàn thành</span>'+
          '</div>'+
        '</div>'+
      '</aside>'+
    '</div></section>'+

    '<div class="wrap edn-course-content-grid"><main class="edn-course-main">'+
      '<section class="edn-course-outcomes">'+
        '<h2>Bạn sẽ học được gì sau khóa học?</h2>'+
        '<div class="edn-course-outcomes-grid">'+
          outcomes.map(item=>'<div class="edn-course-outcome">'+checkIcon+'<p>'+esc(item)+'</p></div>').join('')+
        '</div>'+
      '</section>'+

      // Redesigned Curriculum matching Ảnh 5
      '<section class="edn-course-curriculum" id="course-curriculum">'+
        '<div class="edn-udemy-curriculum-header">'+
          '<h2>Nội dung khóa học</h2>'+
          '<div class="edn-udemy-subline">'+
            '<div class="edn-udemy-meta">' + sectionsData.length + ' phần • ' + totalLessons + ' bài giảng • Thời lượng ' + totalDuration + '</div>'+
            '<button type="button" class="edn-udemy-toggle-all" data-a="toggle-curriculum">Mở rộng tất cả các phần</button>'+
          '</div>'+
        '</div>'+
        '<div class="edn-udemy-accordion-list">'+
          sectionsData.map(sec =>
            '<details class="edn-curriculum-accordion-item"' + (sec.isOpen ? ' open' : '') + '>'+
              '<summary class="edn-curriculum-accordion-head">'+
                '<div class="edn-accordion-head-left">'+
                  '<span class="edn-accordion-chevron" aria-hidden="true">▾</span>'+
                  '<strong class="edn-accordion-title">' + esc(sec.title) + '</strong>'+
                '</div>'+
                '<div class="edn-accordion-head-right">' + sec.lessonsCount + ' bài giảng • ' + esc(sec.duration) + '</div>'+
              '</summary>'+
              '<div class="edn-accordion-lectures-wrap">' + sec.rows + '</div>'+
            '</details>'
          ).join('')+
        '</div>'+
      '</section>'+

      '<section class="edn-instructor-full-card">'+
        '<h2>Về giảng viên</h2>'+
        '<div class="edn-inst-card-layout">'+
          '<img class="edn-inst-card-avatar" src="'+esc(instructor.avatar)+'" alt="'+esc(instructor.name)+'">'+
          '<div class="edn-inst-card-body">'+
            '<h3>'+esc(instructor.name)+'</h3>'+
            '<p class="edn-inst-title">'+esc(instructor.role)+' tại <strong>'+esc(instructor.org)+'</strong></p>'+
            '<div class="edn-inst-stats">'+
              '<span>★ 4.95 Điểm đánh giá</span>'+
              '<span>👨‍🎓 12,000+ Học viên</span>'+
              '<span>📚 5 Khóa học</span>'+
            '</div>'+
            '<p class="edn-inst-bio">Chuyên gia với hơn 10 năm kinh nghiệm thực chiến trong việc xây dựng hệ thống phần mềm và đào tạo nguồn nhân lực công nghệ cao. Phương châm giảng dạy: thực chiến, dễ hiểu và ứng dụng trực tiếp vào công việc hàng ngày.</p>'+
          '</div>'+
        '</div>'+
      '</section>'+

      '<section class="edn-course-requirements">'+
        '<h2>Yêu cầu & Đối tượng tham gia</h2>'+
        '<div class="edn-requirements-columns">'+
          '<div><h3>Đối tượng phù hợp</h3><p>'+esc(c.audience||'Bất kỳ ai muốn nâng cao kỹ năng và bứt phá sự nghiệp số.')+'</p></div>'+
          '<div><h3>Kiến thức cần có</h3><p>'+esc(c.prerequisites||'Không yêu cầu kinh nghiệm trước, khóa học hướng dẫn từ căn bản.')+'</p></div>'+
        '</div>'+
      '</section>'+

      '<section class="edn-related-topics">'+
        '<div class="edn-section-heading"><div><span class="edn-overline">CHỦ ĐỀ LIÊN QUAN</span><h2>Mở rộng kiến thức cùng lĩnh vực</h2></div><a class="edn-header-link" href="#/domain/'+esc(domain?domain.slug:'')+'">Xem lĩnh vực ↗</a></div>'+
        '<div class="edn-topic-chip-row">'+topics+'</div>'+
      '</section>'+
    '</main>' +
    '<aside class="edn-course-right-sidebar">' +
      lessonMaterialBlock +
    '</aside>' +
  '</div></div>';
};
const checkout=id=>{
  const c=find(id);
  if(!c)return nf();
  if(!D.me)return guard('/checkout/'+id);
  if(EN()[id]){go('/learn/'+id+'/'+nextL(c));return '';}

  const user=me()||{};
  const priceAvailable=typeof c.p==='number'&&Number.isFinite(c.p)&&c.p>=0;
  const priceVerified=c.ready&&priceAvailable;
  const price=priceAvailable?money(c.p):'Chưa xác định';
  const originalPrice=priceAvailable&&typeof c.o==='number'&&Number.isFinite(c.o)&&c.o>c.p?money(c.o):'';
  const originalLine=originalPrice
    ? '<div class="edn-checkout-price-line"><span>Giá gốc</span><strong>'+esc(originalPrice)+'</strong></div>'
    : '';
  const paymentMessage=priceVerified
    ? 'EduNext hiện chưa kết nối cổng thanh toán. Bạn chưa cần nhập thông tin thẻ hay tài khoản thanh toán.'
    : 'Giá đang hiển thị là giá demo tham khảo. Chương trình chưa đủ điều kiện mở bán, nên thanh toán và cấp quyền học chưa khả dụng.';
  const courseStatus=c.ready?'Nội dung và giá đã được xác minh':'Chương trình chưa mở bán';
  const courseImage='<div class="edn-checkout-course-image">'+courseImageMarkup(c)+'</div>';
  const orderPrice=priceAvailable?money(c.p):'Chưa xác định';
  return '<main class="wrap page edn-checkout-page">'+
    '<nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/courses">Khóa học</a><span>›</span><span>Thanh toán</span></nav>'+
    '<header class="edn-checkout-heading"><div><span class="edn-overline">EDUNEXT · ĐĂNG KÝ CHƯƠNG TRÌNH</span><h1>Thanh toán</h1><p>Kiểm tra lại khóa học và thông tin đơn hàng trước khi hoàn tất đăng ký.</p></div><a class="edn-checkout-back" href="#/course/'+esc(c.id)+'">← Quay lại khóa học</a></header>'+
    '<div class="edn-checkout-layout"><div class="edn-checkout-main">'+
      '<section class="edn-checkout-section"><div class="edn-checkout-section-heading"><span class="edn-checkout-step">1</span><div><h2>Thông tin người học</h2><p>Thông tin tài khoản dùng để ghi nhận quyền học.</p></div></div>'+
        '<div class="edn-checkout-learner"><div><span>Họ và tên</span><strong>'+esc(user.name||'Chưa cập nhật')+'</strong></div><div><span>Email tài khoản</span><strong>'+esc(user.email||'Chưa cập nhật')+'</strong></div></div>'+
      '</section>'+
      '<section class="edn-checkout-section"><div class="edn-checkout-section-heading"><span class="edn-checkout-step">2</span><div><h2>Phương thức thanh toán</h2><p>Thanh toán sẽ được mở khi cổng thanh toán chính thức sẵn sàng.</p></div><span class="edn-checkout-status">Chưa khả dụng</span></div>'+
        '<div class="edn-checkout-payment-notice"><span class="edn-checkout-lock" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path><path d="M12 14v3"></path></svg></span><div><strong>Cổng thanh toán chưa được cấu hình</strong><p>'+paymentMessage+'</p></div></div>'+
      '</section>'+
      '<section class="edn-checkout-section"><div class="edn-checkout-section-heading"><span class="edn-checkout-step">3</span><div><h2>Thông tin khóa học</h2><p>Khóa học bạn đang xem xét đăng ký.</p></div></div>'+
        '<article class="edn-checkout-course">'+courseImage+'<div class="edn-checkout-course-details"><span class="edn-checkout-course-domain">'+esc(c.cat)+'</span><h3>'+esc(c.t)+'</h3><p>'+c.L.length+' bài học trong đề cương'+(c.h?' · '+esc(c.h)+' giờ dự kiến':'')+'</p><span class="edn-checkout-course-state '+(c.ready?'is-ready':'is-pending')+'">'+courseStatus+'</span></div><div class="edn-checkout-course-price"><small>Giá khóa học</small><strong>'+esc(price)+'</strong></div></article>'+
      '</section>'+
    '</div>'+
    '<aside class="edn-checkout-summary"><div class="edn-checkout-summary-title"><span class="edn-overline">ĐƠN HÀNG CỦA BẠN</span><h2>Tóm tắt đơn hàng</h2></div>'+
      '<div class="edn-checkout-summary-course">'+courseImage+'<div><strong>'+esc(c.t)+'</strong><small>'+esc(c.cat)+'</small></div></div>'+
      '<div class="edn-checkout-price-line"><span>Giá khóa học</span><strong>'+esc(orderPrice)+'</strong></div>'+originalLine+
      '<div class="edn-checkout-price-line"><span>Trạng thái giá</span><strong>'+(c.demoPrice?'Giá demo':'Giá đã cấu hình')+'</strong></div>'+
      '<div class="edn-checkout-grand-total"><span>Tổng thanh toán</span><strong>'+esc(orderPrice)+'</strong></div>'+
      '<button type="button" class="btn btn-p w edn-checkout-pay-button" disabled aria-disabled="true"><span aria-hidden="true">⌑</span> Thanh toán chưa khả dụng</button>'+
      '<p class="edn-checkout-terms">Bằng việc tiếp tục, bạn sẽ đồng ý với điều khoản sử dụng của EduNext. Hiện tại chưa có giao dịch nào được tạo hoặc ghi nhận.</p>'+
      '<div class="edn-checkout-secure-note"><span aria-hidden="true">✓</span><p>Chúng tôi sẽ chỉ mở thanh toán khi giá và cổng thanh toán được xác minh. Không nhập thông tin thẻ trên trang này.</p></div>'+
    '</aside></div></main>';
};
const cartPage=()=>{
  const items=cartIds.map(find).filter(Boolean);
  const continueLink='<a class="btn btn-g" href="#/courses">Tiếp tục khám phá khóa học</a>';
  if(!items.length){
    return '<main class="wrap page edn-cart-page"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><span>Giỏ hàng</span></nav>'+
      '<section class="edn-cart-empty"><div class="edn-cart-empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.1a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg></div><span class="edn-overline">GIỎ HÀNG EDUNEXT</span><h1>Giỏ hàng của bạn đang trống</h1><p>Hãy khám phá các lĩnh vực và thêm những chương trình bạn quan tâm vào giỏ hàng để xem lại ở đây.</p>'+continueLink+'</section></main>';
  }
  const pricesAvailable=items.every(course=>typeof course.p==='number'&&Number.isFinite(course.p));
  const pricesVerified=items.every(course=>course.ready&&typeof course.p==='number'&&Number.isFinite(course.p));
  const subtotal=pricesAvailable?items.reduce((sum,course)=>sum+course.p,0):null;
  const rows=items.map(course=>{
    const price=typeof course.p==='number'&&Number.isFinite(course.p)?money(course.p):'Chưa xác định';
    const original=typeof course.o==='number'&&course.o>course.p?'<del>'+esc(money(course.o))+'</del>':'';
    const status=course.ready?'Đã xuất bản':'Đề cương · Chưa mở bán';
    return '<article class="edn-cart-item">'+
      '<a class="edn-cart-item-image" href="#/course/'+esc(course.id)+'">'+courseImageMarkup(course)+'</a>'+
      '<div class="edn-cart-item-info"><span class="edn-cart-item-domain">'+esc(course.cat)+'</span><h2><a href="#/course/'+esc(course.id)+'">'+esc(course.t)+'</a></h2><p>'+course.L.length+' bài học trong đề cương</p><span class="edn-cart-course-status '+(course.ready?'is-ready':'is-draft')+'">'+status+'</span></div>'+
      '<div class="edn-cart-item-price"><small>Giá tham khảo</small><strong>'+esc(price)+'</strong>'+original+'</div>'+
      '<button class="edn-cart-remove" type="button" data-a="cart-remove" data-v="'+esc(course.id)+'" aria-label="Xóa '+esc(course.t)+' khỏi giỏ hàng"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"></path></svg><span>Xóa</span></button>'+
    '</article>';
  }).join('');
  const totalDisplay=pricesAvailable?money(subtotal):'<span class="edn-cart-price-pending">Chưa xác định</span>';
  const totalLabel=pricesVerified?'Tổng cộng':'Tổng giá tham khảo';
  const priceNotice=pricesVerified
    ? 'Giá chương trình đã được xác minh, nhưng cổng thanh toán chưa được cấu hình.'
    : 'Giá đang hiển thị là giá demo tham khảo. Các khóa học chưa mở bán và chưa thể thanh toán.';
  return '<main class="wrap page edn-cart-page"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><span>Giỏ hàng</span></nav>'+
    '<header class="edn-cart-heading"><div><span class="edn-overline">LỰA CHỌN CỦA BẠN</span><h1>Giỏ hàng</h1><p>Xem lại những chương trình bạn đã chọn trước khi đăng ký.</p></div><span class="edn-cart-item-count">'+items.length+' chương trình</span></header>'+
    '<div class="edn-cart-layout"><section class="edn-cart-items-panel"><div class="edn-cart-panel-heading"><h2>Khóa học đã chọn</h2><button type="button" class="edn-cart-clear" data-a="cart-clear">Xóa tất cả</button></div><div class="edn-cart-items">'+rows+'</div><div class="edn-cart-continue">'+continueLink+'</div></section>'+
    '<aside class="edn-cart-summary"><h2>Tóm tắt đơn hàng</h2><div class="edn-cart-summary-line"><span>Số chương trình</span><strong>'+items.length+'</strong></div><div class="edn-cart-summary-line"><span>Tạm tính</span><strong>'+totalDisplay+'</strong></div><div class="edn-cart-summary-total"><span>'+totalLabel+'</span><strong>'+totalDisplay+'</strong></div><button type="button" class="btn btn-p w edn-cart-checkout" disabled>Thanh toán chưa khả dụng</button><p class="edn-cart-payment-note">'+priceNotice+'</p><div class="edn-cart-trust-note"><span aria-hidden="true">✓</span><p>Không tạo đơn hàng hoặc ghi nhận thanh toán khi chương trình chưa đủ điều kiện mở bán.</p></div></aside></div></main>';
};
const learn=(id,index)=>{
  const c=find(id);
  if(!c)return nf();
  document.body.classList.add('edn-classroom-active');
  const e=EN()[id]||{done:[]};
  const canTrackProgress=!!EN()[id];
  const i=Math.min(Math.max(Number(index)||0,0),Math.max(c.lessons.length-1,0));
  const lesson=c.lessons[i];
  if(!lesson)return nf();
  const done=e.done.includes(i),all=e.done.length>=c.completionCount;
  const prev=i>0?'<a class="btn btn-g edn-nav-btn" href="#/learn/'+esc(id)+'/'+(i-1)+'">← Bài trước</a>':'';
  const mark=canTrackProgress
    ? '<button class="btn '+(done?'btn-g':'btn-p')+' edn-mark-btn" type="button" data-a="done" data-v="'+esc(id)+','+i+'">'+(done?'✓ Đã hoàn thành (Bấm để hủy)':'Đánh dấu đã học')+'</button>'
    : '<span class="edn-lesson-progress-note">Đang xem bài học ở chế độ công khai. Đăng ký để lưu tiến độ.</span>';
  const after=i<c.lessons.length-1?'<a class="btn btn-g edn-nav-btn" href="#/learn/'+esc(id)+'/'+(i+1)+'">Bài tiếp →</a>':'';
  const final=all?'<a class="btn btn-p edn-cert-btn" href="#/cert/'+esc(id)+'">Nhận chứng chỉ tốt nghiệp 🎓</a>':'';

  return '<div class="edn-classroom-shell">'+
    '<header class="edn-classroom-bar">'+
      '<div class="edn-class-bar-left"><a class="edn-exit-classroom" href="#/course/'+esc(id)+'" title="Thoát phòng học">✕ <span>Thoát</span></a><strong class="edn-class-course-title">'+esc(c.t)+'</strong></div>'+
      '<div class="edn-class-bar-right"><div class="edn-class-progress-box"><span>'+(canTrackProgress?pct(c)+'% hoàn thành':'Chế độ xem thử')+'</span><div class="edn-class-progress-bar"><span style="width:'+pct(c)+'%"></span></div></div></div>'+
    '</header>'+
    '<div class="edn-classroom-body">'+
      '<main class="edn-classroom-player-column">'+
        '<div class="edn-classroom-player-wrap">'+videoMarkup(resolveLessonVideo(lesson, c, i),lesson.title)+'</div>'+
        '<div class="edn-classroom-panel-content">'+
          '<div class="edn-lesson-banner">'+
            '<div><span class="edn-overline">BÀI '+(i+1)+' / '+c.lessons.length+'</span><h1>'+esc(lesson.title)+'</h1></div>'+
            '<span class="edn-lesson-status-pill '+(done?'is-done':'')+'">'+(done?'Đã hoàn thành':'Đang học')+'</span>'+
          '</div>'+
          '<div class="edn-classroom-tabs" role="tablist">'+
            '<button type="button" class="edn-classroom-tab is-active" data-class-tab="summary">Tóm tắt bài học</button>'+
            '<button type="button" class="edn-classroom-tab" data-class-tab="resources">Tài nguyên đính kèm</button>'+
            '<button type="button" class="edn-classroom-tab" data-class-tab="qa">Hỏi đáp & Thảo luận</button>'+
          '</div>'+
          '<div class="edn-classroom-tab-panes">'+
            '<div class="edn-tab-pane is-active" id="pane-summary">'+
              (lesson.content?lessonMaterialMarkup(lesson.content):'<p class="edn-material-pending">Nội dung hướng dẫn chi tiết đang được cập nhật.</p>')+
              (lesson.exercise?'<section class="edn-lesson-exercise"><h3>Bài tập thực hành</h3><p>'+esc(lesson.exercise)+'</p></section>':'')+
            '</div>'+
            '<div class="edn-tab-pane" id="pane-resources" hidden>'+
              '<div class="edn-resource-items">'+
                '<p>Tải về học liệu, slide bài giảng và source code mẫu của bài học này:</p>'+
                (lesson.resourceUrl?'<a class="btn btn-g" href="'+esc(lesson.resourceUrl)+'" target="_blank" rel="noopener noreferrer">📥 Tải về mã nguồn bài giảng ↗</a>':'<p class="edn-material-pending">Chưa có file đính kèm cho bài này.</p>')+
              '</div>'+
            '</div>'+
            '<div class="edn-tab-pane" id="pane-qa" hidden>'+
              '<div class="edn-qa-simulated">'+
                '<div class="edn-qa-item"><div class="edn-qa-avatar">H</div><div><strong>Học viên Lê Anh:</strong><p>Thầy cho em hỏi phần kết nối database này nếu dùng PostgreSQL thì connection string cấu hình khác gì không ạ?</p><small class="edn-qa-reply">↳ <b>Giảng viên phản hồi:</b> Chào bạn, với PostgreSQL bạn chỉ cần đổi provider sang Npgsql.EntityFrameworkCore và cập nhật chuỗi kết nối theo chuẩn Host=...;Port=5432 nhé!</small></div></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="edn-lesson-nav-actions">'+prev+mark+after+final+'</div>'+
        '</div>'+
      '</main>'+
      '<aside class="edn-classroom-sidebar">'+
        '<div class="edn-sidebar-head"><strong>Danh sách bài học</strong><span>'+c.lessons.length+' bài</span></div>'+
        '<div class="edn-sidebar-lessons-list">'+
          c.lessons.map((item,k)=>{
            const isCurrent=k===i;
            const isDone=e.done.includes(k);
            return '<a class="edn-sidebar-lesson-row '+(isCurrent?'is-current ':'')+(isDone?'is-done':'')+'" href="#/learn/'+esc(id)+'/'+k+'">'+
              '<span class="edn-sidebar-num">'+(isDone?'✓':String(k+1).padStart(2,'0'))+'</span>'+
              '<div class="edn-sidebar-info"><strong>'+esc(item.title)+'</strong><small>'+(item.videoUrl?'Video HD':'Nội dung')+'</small></div>'+
            '</a>';
          }).join('')+
        '</div>'+
      '</aside>'+
    '</div>'+
  '</div>';
};
const certificates=()=>{
  if(!D.me)return guard('/certificates');
  const issued=Array.isArray(CFG.certificates)?CFG.certificates:[];
  return '<div class="wrap page cio-student-page cio-certificates-page"><div class="cio-page-head"><div><span class="cio-eyebrow">CHỨNG CHỈ</span><h1>Chứng chỉ của bạn</h1><p>Chỉ hiển thị chứng chỉ đã được hệ thống ghi nhận sau khi đủ điều kiện hoàn thành khóa học.</p></div><a class="btn btn-p" href="#/courses">Khám phá lĩnh vực</a></div>'+
    (issued.length?'<section class="cio-dashboard-grid cio-certificate-grid">'+issued.map(cert=>'<article class="cio-certificate-card"><div class="cio-certificate-mark">E</div><div><span class="cio-card-status">ĐÃ CẤP</span><h3>'+esc(cert.courseTitle||find(cert.courseId)?.t||'Khóa học')+'</h3><p>'+esc(me().name)+' · Mã '+esc(cert.code||'')+'</p><div class="cio-certificate-foot"><span>'+ (cert.issuedAt?new Date(Number(cert.issuedAt)*1000).toLocaleDateString('vi-VN'):'')+'</span><a class="btn btn-g btn-s" href="#/cert/'+esc(cert.courseId)+'">Xem chứng chỉ</a></div></div></article>').join('')+'</section>':'<div class="cio-empty"><h3>Chưa có chứng chỉ được cấp</h3><p>Chứng chỉ chỉ xuất hiện khi tài khoản sở hữu khóa học đã xuất bản và hoàn thành toàn bộ điều kiện học tập.</p><a class="btn btn-p" href="#/dashboard">Xem trang học tập</a></div>')+
    '</div>';
};
const cert=id=>{
  const c=find(id);
  if(!c)return nf();
  if(!D.me)return guard('/cert/'+id);
  if(!EN()[id])return '<div class="wrap page narrow"><div class="cio-empty"><h2>Chưa có quyền truy cập khóa học</h2><p>Chứng chỉ chỉ dành cho người sở hữu khóa học.</p><a class="btn btn-g" href="#/course/'+esc(id)+'">Xem chương trình</a></div></div>';
  const issued=(Array.isArray(CFG.certificates)?CFG.certificates:[]).find(item=>item.courseId===id);
  if(!issued){
    const complete=passed(c);
    return '<div class="wrap page narrow"><div class="cio-empty"><span class="edn-overline">CHỨNG CHỈ</span><h1>'+esc(c.t)+'</h1><p>'+(complete?'Tiến độ trên trang cho thấy các bài đã đánh dấu hoàn thành. Yêu cầu hệ thống xác minh điều kiện trước khi cấp chứng chỉ.':'Bạn cần hoàn thành '+c.completionCount+' bài học theo điều kiện của khóa học trước khi yêu cầu chứng chỉ.')+'</p>'+
      (complete?'<button class="btn btn-p" type="button" data-a="issue-cert" data-v="'+esc(id)+'">Xác minh điều kiện nhận chứng chỉ</button>':'<a class="btn btn-p" href="#/learn/'+esc(id)+'/'+nextL(c)+'">Tiếp tục học</a>')+
      '<a class="btn btn-g" href="#/certificates">Danh sách chứng chỉ</a></div></div>';
  }
  return '<div class="wrap page narrow"><div class="edn-certificate-sheet"><div class="edn-certificate-mark">E</div><span class="edn-overline">EDUNEXT · CHỨNG CHỈ HOÀN THÀNH</span><h1>'+esc(c.t)+'</h1><p>Chứng nhận được cấp cho</p><div class="edn-certificate-name">'+esc(me().name)+'</div><div class="edn-certificate-details"><div><small>Ngày cấp</small><b>'+(issued.issuedAt?new Date(Number(issued.issuedAt)*1000).toLocaleDateString('vi-VN'):'—')+'</b></div><div><small>Mã chứng chỉ</small><b>'+esc(issued.code||'—')+'</b></div></div></div><div class="acts"><button class="btn btn-p" type="button" data-a="print">In hoặc lưu PDF</button><a class="btn btn-g" href="#/certificates">Danh sách chứng chỉ</a></div></div>';
};
const ordersPage=()=>{
  if(!D.me)return guard('/orders');
  const orders=Array.isArray(CFG.orders)?CFG.orders:[];
  return '<div class="wrap page edn-orders-page"><div class="edn-page-intro"><span class="edn-overline">TÀI KHOẢN</span><h1>Lịch sử mua hàng</h1><p>Chỉ hiển thị đơn hàng được ghi nhận bởi cơ chế thanh toán đã tích hợp.</p></div>'+
    (orders.length?'<div class="edn-orders-list">'+orders.map(order=>{
      const c=find(order.courseId);
      const status=String(order.status||'pending');
      const statusLabel=({paid:'Đã thanh toán',pending:'Chờ thanh toán',failed:'Thanh toán thất bại',cancelled:'Đã hủy',refunded:'Đã hoàn tiền'})[status]||'Đang xác minh';
      return '<article class="edn-order-row"><div><strong>'+esc(c?c.t:'Khóa học')+'</strong><small>'+esc(order.id||'')+' · '+(order.createdAt?new Date(order.createdAt).toLocaleString('vi-VN'):'')+'</small></div><div><b>'+(typeof order.amount==='number'?money(order.amount):'—')+'</b><span class="edn-order-status">'+statusLabel+'</span></div></article>';
    }).join('')+'</div>':'<div class="cio-empty"><h2>Chưa có đơn hàng</h2><p>EduNext chưa có giao dịch được xác nhận cho tài khoản này. Khóa học đang ở trạng thái đề cương sẽ không tạo đơn hàng giả.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>')+
    '</div>';
};
const field=(n,l,t,placeholder,min)=>'<div class="fg"><label for="f-'+n+'">'+l+'</label><input id="f-'+n+'" name="'+n+'" type="'+t+'" '+(placeholder?'placeholder="'+esc(placeholder)+'" ':'')+(min?'minlength="'+min+'" ':'')+'autocomplete="'+(n==='pw'?(t==='password'?'current-password':'off'):n)+'" required></div>';
const auth=m=>{
  if(D.me){go('/dashboard');return '';}
  const register=m==='register';
  return '<div class="auth edn-auth-page"><form class="box ac" data-form="'+m+'" novalidate><span class="edn-overline">TÀI KHOẢN EDUNEXT</span><h1>'+(register?'Tạo tài khoản':'Đăng nhập')+'</h1><p>'+(register?'Tạo tài khoản để lưu hồ sơ và theo dõi những khóa học đã được cấp quyền.':'Đăng nhập bằng tài khoản WordPress của bạn để tiếp tục học tập.')+'</p>'+
    (register?field('name','Họ và tên','text','Tên hiển thị','2'):'')+
    field('email','Email','email','name@example.com','')+
    field('pw','Mật khẩu','password','Tối thiểu 8 ký tự','8')+
    (register?'<label class="chk"><input type="checkbox" name="ok" value="1" required> Tôi đồng ý với điều khoản sử dụng.</label>':'')+
    '<p class="err edn-auth-error" id="err" role="alert"></p><button class="btn btn-p w" type="submit">'+(register?'Tạo tài khoản':'Đăng nhập')+'</button>'+
    (register?'<p class="sw">Đã có tài khoản? <a href="#/login">Đăng nhập</a></p>':'<p class="sw"><a href="'+esc(CFG.lostPasswordUrl||'#')+'">Quên mật khẩu?</a></p><p class="sw">Chưa có tài khoản? <a href="#/register">Đăng ký</a></p>')+
    '</form></div>';
};
const dash=()=>{
  if(!D.me)return guard('/dashboard');
  const u=me();
  const mine=C.filter(c=>EN()[c.id]);
  const completed=mine.filter(c=>pct(c)===100);
  const active=mine.filter(c=>pct(c)<100);
  const cards=mine.map(c=>{
    const done=pct(c)===100,progress=pct(c),state=done?'completed':'learning';
    const updatedAt=EN()[c.id].updatedAt;
    const updatedValue=updatedAt?(Number.isFinite(Number(updatedAt))?Number(updatedAt):(Date.parse(updatedAt)||0)):0;
    return '<article class="edn-my-course-card" data-study-state="'+state+'" data-study-progress="'+progress+'" data-study-updated="'+updatedValue+'">'+
      '<a class="edn-my-course-image" href="#/learn/'+esc(c.id)+'/'+nextL(c)+'" aria-label="Mở khóa học '+esc(c.t)+'">'+courseImageMarkup(c)+'<span class="edn-my-course-image-state">'+(done?'ĐÃ HOÀN THÀNH':'ĐANG HỌC')+'</span></a>'+
      '<div class="edn-my-course-copy"><p class="edn-my-course-category">'+esc(c.cat)+'</p>'+
      '<h2><a href="#/learn/'+esc(c.id)+'/'+nextL(c)+'">'+esc(c.t)+'</a></h2>'+
      '<p class="edn-my-course-description">'+esc(c.shortDescription||'Mở khóa học để xem nội dung và tiếp tục lộ trình của bạn.')+'</p>'+
      '<div class="edn-my-course-progress-label"><span>'+(done?'Đã hoàn thành tất cả bài học':'Tiến độ khóa học')+'</span><strong>'+progress+'%</strong></div>'+
      '<div class="edn-my-course-progress" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" aria-label="Tiến độ '+esc(c.t)+'"><span style="width:'+progress+'%"></span></div>'+
      '<div class="edn-my-course-footer"><span>'+EN()[c.id].done.length+' / '+c.L.length+' bài học</span><a href="#/learn/'+esc(c.id)+'/'+nextL(c)+'">'+(done?'Học lại':'Tiếp tục học')+' <span aria-hidden="true">→</span></a></div></div></article>';
  }).join('');
  const empty='<div class="empty edn-my-learning-empty" style="text-align:center;padding:64px 24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;margin-top:24px;backdrop-filter:blur(16px);">'+
    '<div style="font-size:42px;margin-bottom:16px;">📚</div>'+
    '<h3 style="font-size:1.5rem;font-weight:700;color:#f8fafc;margin-bottom:8px;">Bạn chưa tham gia khóa học nào</h3>'+
    '<p style="color:#94a3b8;max-width:520px;margin:0 auto 24px;font-size:0.95rem;line-height:1.6;">Khám phá hơn 100 khóa học thực chiến từ chuyên gia để bắt đầu hành trình nâng cao kỹ năng nghề nghiệp ngay hôm nay.</p>'+
    '<a class="btn btn-p" href="#/courses" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:9999px;background:#14b8a6;color:#041316;font-weight:700;text-decoration:none;">Khám phá khóa học ngay →</a>'+
  '</div>';
  const tabs='<div class="edn-my-learning-tabs" role="group" aria-label="Lọc khóa học">'+
    '<button type="button" class="edn-my-learning-tab is-active" data-study-filter="all" aria-pressed="true">Tất cả khóa học <span>'+mine.length+'</span></button>'+
    '<button type="button" class="edn-my-learning-tab" data-study-filter="learning" aria-pressed="false">Đang học <span>'+active.length+'</span></button>'+
    '<button type="button" class="edn-my-learning-tab" data-study-filter="completed" aria-pressed="false">Đã hoàn thành <span>'+completed.length+'</span></button></div>';
  const toolbar=mine.length?'<div class="edn-my-learning-toolbar"><label class="edn-my-learning-search"><span aria-hidden="true">⌕</span><input type="search" id="edn-my-learning-search" placeholder="Tìm trong khóa học của bạn..." aria-label="Tìm trong khóa học của bạn"></label><label class="edn-my-learning-sort"><span>Sắp xếp</span><select id="edn-my-learning-sort" aria-label="Sắp xếp khóa học"><option value="recent">Hoạt động gần đây</option><option value="progress">Tiến độ học tập</option><option value="title">Tên khóa học A–Z</option></select></label></div>':'';
  return '<main class="wrap page cio-student-page edn-my-learning-page">'+
    tabs+toolbar+
    (mine.length?'<div class="edn-my-learning-result-line"><strong id="edn-my-learning-result-count">'+mine.length+' khóa học</strong><span>Chọn một khóa học để tiếp tục hành trình.</span></div><section class="edn-my-learning-grid" id="edn-my-learning-grid">'+cards+'</section><div id="edn-my-learning-no-results" class="edn-my-learning-no-results" hidden><h2>Không tìm thấy khóa học phù hợp</h2><p>Thử từ khóa khác hoặc chuyển sang một mục khác.</p></div>':empty)+
    '</main>';
};
const BLOG_ARTICLE_BODY=[[{"heading":"Đừng chỉ nhìn cú pháp, hãy dự đoán kết quả","paragraphs":["Khi học biến, điều kiện hay vòng lặp, nhiều người cố nhớ mẫu code. Cách đó có ích ở bước đầu nhưng thường không đủ khi bài tập thay đổi một chút. Thay vào đó, hãy tự hỏi: biến đang giữ giá trị gì, dòng tiếp theo có thể thay đổi nó ra sao và nhánh nào sẽ được chạy?","Ví dụ, với vòng lặp tính tổng một dãy số, ghi lại giá trị của biến tổng sau từng lượt sẽ giúp bạn thấy lỗi khởi tạo hoặc điều kiện dừng. Một bảng nhỏ gồm lần lặp, giá trị đầu vào và kết quả trung gian đã đủ để bắt đầu."]},{"heading":"Một vòng luyện tập có thể làm trong 20 phút","paragraphs":["Chọn một ý tưởng vừa học, tự viết ví dụ ngắn, chạy thử rồi thay đổi một điều kiện. Sau đó giải thích bằng lời vì sao kết quả đổi. Khi gặp lỗi, đọc dòng báo lỗi và kiểm tra giả định trước khi sửa.","Nếu dùng debugger trong Visual Studio, đặt breakpoint ở nơi bạn nghi ngờ, chạy từng bước và xem giá trị biến. Đây là cách tìm nguyên nhân có kiểm chứng, thay vì thêm câu lệnh in ra khắp nơi rồi đoán."]},{"heading":"Khi nào biết mình đã hiểu?","paragraphs":["Bạn đã tiến bộ khi có thể viết lại ví dụ mà không nhìn lời giải, phát hiện một trường hợp biên và giải thích cách xử lý. Nếu vẫn phải xem lại tài liệu, không sao: ghi đúng điểm mình quên và quay lại bằng một bài tập khác.","Mục tiêu không phải thuộc lòng mọi API. Quan trọng hơn là hiểu vấn đề, biết tra cứu tài liệu đáng tin cậy và kiểm tra chương trình có thật sự làm đúng điều bạn mong đợi hay không."]}],[{"heading":"Tách bài toán thành các bước nhỏ","paragraphs":["Một REST API nhận HTTP request và trả HTTP response. Trước khi thêm xác thực, phân trang hay nhiều lớp kiến trúc, hãy tạo một endpoint như GET /api/tasks trả về danh sách mẫu. Kiểm tra status code, JSON và trường hợp danh sách rỗng.","Khi endpoint đầu tiên chạy đúng, hãy tách phần xử lý nghiệp vụ ra khỏi controller bằng dependency injection. Sau đó mới kết nối cơ sở dữ liệu qua Entity Framework Core. Làm lần lượt giúp bạn biết lỗi xuất hiện ở route, logic, cấu hình hay truy vấn."]},{"heading":"Đừng bỏ qua kiểm tra dữ liệu đầu vào","paragraphs":["Một endpoint tạo mới nên kiểm tra các trường bắt buộc, giới hạn độ dài và định dạng trước khi ghi dữ liệu. Với ASP.NET Core, có thể dùng Data Annotations hoặc cơ chế validation phù hợp. Trả phản hồi lỗi nhất quán giúp frontend biết cần hiển thị thông báo gì.","Dùng Swagger UI hoặc Postman để thử ít nhất ba trường hợp: dữ liệu hợp lệ, dữ liệu thiếu hoặc sai định dạng, và tài nguyên không tồn tại. API không chỉ cần chạy được ở đường đi thuận lợi; nó còn phải trả lời rõ ràng khi có lỗi."]},{"heading":"Xác thực là bước riêng, không phải miếng vá cuối cùng","paragraphs":["Khi các luồng cơ bản đã ổn định, hãy xác định endpoint nào công khai và endpoint nào yêu cầu đăng nhập hoặc vai trò cụ thể. Không nên xem việc ẩn nút trên giao diện là bảo vệ dữ liệu: quyền truy cập cần được kiểm tra ở phía máy chủ.","Một API nhỏ, có validation, status code hợp lý và vài bài kiểm tra sẽ là nền tảng tốt hơn một dự án có nhiều công nghệ nhưng khó hiểu."]}],[{"heading":"Thiết lập bản vẽ trước khi tăng tốc","paragraphs":["Với bản vẽ kỹ thuật 2D, hãy xác định đơn vị và độ chính xác theo yêu cầu của bản vẽ trước khi dựng hình. Nếu dự án dùng milimét, hãy giữ quy ước đó nhất quán trong Model Space; đừng đợi đến lúc in mới tìm cách sửa kích thước lệch.","Bật các hỗ trợ vẽ như Object Snap khi cần bắt điểm cuối, trung điểm hoặc tâm đường tròn. Những công cụ này giúp điểm hình học chính xác hơn so với đặt chuột bằng mắt, đặc biệt ở bản vẽ có nhiều cạnh và chi tiết gần nhau."]},{"heading":"Dùng layer để người khác đọc được bản vẽ","paragraphs":["Tách đối tượng theo mục đích như nét thấy, nét tâm, kích thước và ghi chú. Đặt tên layer dễ hiểu, chọn màu và kiểu nét theo tiêu chuẩn đang áp dụng cho công việc. Layer không chỉ để tô màu; nó giúp kiểm soát hiển thị, in ấn và bàn giao.","Trước khi thêm dimension, kiểm tra lại hình học và thiết lập kiểu kích thước. Con số kích thước nên mô tả đúng hình học và quy ước của bản vẽ, không chỉnh bằng tay chỉ để làm đẹp nếu điều đó khiến thông tin sai lệch."]},{"heading":"Kiểm tra bản in bằng một trang thử","paragraphs":["Layout, viewport và tỷ lệ in cần được cấu hình phù hợp với khổ giấy và yêu cầu hồ sơ. Trước khi gửi file, xem trước bản in để kiểm tra chữ có đọc được không, nét có phân biệt không, kích thước có bị cắt và khung tên có đúng hay không.","Một checklist ngắn trước khi bàn giao: đơn vị đúng, layer rõ, kích thước đã kiểm tra, font và kiểu nét phù hợp, file tham chiếu không bị thiếu, bản in thử đạt yêu cầu. Với bản vẽ liên quan đến an toàn hoặc tiêu chuẩn chuyên ngành, luôn tuân thủ quy trình kiểm tra và phê duyệt có thẩm quyền."]}],[{"heading":"Trước tiên, hãy xác định dữ liệu cần trả về","paragraphs":["Khi một truy vấn SQL chậm hoặc khó hiểu, hãy viết rõ kết quả cuối cùng cần có: những cột nào, lọc theo điều kiện gì, và quan hệ nào giữa các bảng. Việc này giúp bạn phân biệt vấn đề mô hình dữ liệu với vấn đề cú pháp.","Ví dụ, nếu muốn liệt kê đơn hàng kèm tên khách hàng, cần hiểu bảng nào chứa đơn, bảng nào chứa khách và khóa nào liên kết hai bảng. Dùng JOIN trên quan hệ đúng giúp kết quả có ý nghĩa; nối nhầm cột có thể làm mất bản ghi hoặc nhân số dòng."]},{"heading":"Kiểm tra tính nhất quán trước khi tối ưu","paragraphs":["Khóa chính định danh một bản ghi; khóa ngoại thể hiện quan hệ giữa dữ liệu. Thiết kế cột và quan hệ rõ ràng giúp hạn chế các bản ghi mồ côi và giảm trùng lặp không cần thiết.","Sau đó mới xem execution plan, số dòng đọc và các điều kiện lọc thường dùng. Index có thể giúp một số truy vấn, nhưng cũng làm tăng chi phí ghi và chiếm dung lượng. Thêm index chỉ vì nghe rằng nó làm truy vấn nhanh hơn có thể không giải quyết đúng nguyên nhân."]},{"heading":"Một cách học thực hành hiệu quả","paragraphs":["Tạo một bộ dữ liệu thử nhỏ với vài trường hợp bình thường và trường hợp thiếu dữ liệu. Viết truy vấn, dự đoán kết quả, chạy thử rồi so sánh. Khi dùng GROUP BY, JOIN hoặc subquery, thay đổi từng phần để biết nó ảnh hưởng đến kết quả thế nào.","Hiểu dữ liệu được tạo, đọc, cập nhật và xóa ra sao sẽ giúp bạn viết phần truy cập dữ liệu ổn định hơn, chứ không chỉ nhớ được cú pháp SQL."]}],[{"heading":"Dùng AI để giải thích, không chỉ để sinh code","paragraphs":["Khi bị kẹt, hãy đưa cho AI đoạn code tối thiểu, thông báo lỗi và điều bạn đã thử. Hỏi vì sao lỗi có thể xảy ra, giả định nào cần kiểm tra hoặc cách tạo một ví dụ nhỏ để tái hiện. Câu trả lời như vậy thường giúp bạn học được phương pháp xử lý vấn đề.","Tránh gửi khóa bí mật, token, dữ liệu khách hàng hoặc mã nguồn nhạy cảm vào công cụ không được tổ chức cho phép. Khi làm việc với dự án thật, hãy tuân thủ chính sách bảo mật của bạn."]},{"heading":"Xác minh kết quả trước khi sử dụng","paragraphs":["AI có thể tạo ra API không tồn tại, lời giải thiếu trường hợp biên hoặc mã có lỗ hổng. Đối chiếu tài liệu chính thức, chạy test và xem lại luồng dữ liệu là bước không thể bỏ qua. Nếu AI đề xuất thư viện hay hàm cụ thể, hãy kiểm tra phiên bản và chữ ký thực tế.","Một mẹo hữu ích là yêu cầu AI nêu các rủi ro và bài kiểm tra có thể làm thất bại phương án của nó. Sau đó tự chọn những kiểm tra phù hợp và chạy chúng trong môi trường kiểm soát."]},{"heading":"Giữ lại phần tư duy của mình","paragraphs":["Trước khi hỏi AI, hãy thử tự giải quyết trong một khoảng thời gian có giới hạn. Sau khi tham khảo câu trả lời, đóng nó lại và tự viết lại cách giải bằng lời hoặc code. Cuối cùng, giải một bài tương tự mà không sao chép.","Mục tiêu là dùng AI để rút ngắn thời gian tìm hiểu, không bỏ qua quá trình hình thành kỹ năng."]}],[{"heading":"Bắt đầu từ việc người dùng muốn hoàn thành","paragraphs":["Một màn hình đẹp chưa chắc giúp người dùng hoàn thành việc họ đến để làm. Với trang đăng ký, chẳng hạn, người dùng cần hiểu trường nào bắt buộc, lỗi nằm ở đâu và sau khi gửi thành công thì điều gì xảy ra. Những câu hỏi đó nên được giải quyết trước khi chọn màu hay hiệu ứng.","Hãy phác thảo luồng thao tác bằng vài khung wireframe đơn giản. Chỉ ra điểm bắt đầu, các bước chính, trạng thái trống, trạng thái lỗi và kết quả thành công. Khi luồng đã rõ, việc chọn bố cục và thành phần giao diện có cơ sở hơn."]},{"heading":"Kiểm tra bằng nhiệm vụ cụ thể","paragraphs":["Mời vài người thử làm một nhiệm vụ, chẳng hạn tìm một khóa học rồi xem thông tin cần thiết. Quan sát chỗ họ dừng lại, bấm nhầm hoặc phải hỏi hướng dẫn. Đừng chỉ hỏi họ có thích giao diện hay không; hãy quan sát xem họ có làm xong việc không.","Sau đó sửa điểm gây cản trở nhiều nhất và thử lại. Một vài vòng kiểm tra ngắn thường phát hiện vấn đề sớm hơn việc hoàn thiện mọi chi tiết rồi mới đưa cho người khác xem."]},{"heading":"Đừng quên khả năng tiếp cận","paragraphs":["Chữ cần đủ tương phản, trạng thái không nên chỉ phân biệt bằng màu, và các nút cần có nhãn dễ hiểu. Kiểm tra thao tác bằng bàn phím, tiêu đề có thứ bậc rõ ràng và giao diện ở màn hình nhỏ.","UI/UX không phải chỉ là phần nhìn. Một thiết kế tốt giúp người dùng biết mình đang ở đâu, hiểu lựa chọn và dự đoán được kết quả hành động tiếp theo."]}],[{"heading":"Bắt đầu từ câu hỏi của người tìm kiếm","paragraphs":["Trước khi viết, hãy tìm hiểu người đọc đang muốn học khái niệm, so sánh lựa chọn hay làm theo hướng dẫn. Một bài hướng dẫn cài đặt và một bài giải thích khái niệm có cấu trúc khác nhau vì người đọc đang ở những bước khác nhau.","Từ khóa có ích để phát hiện ngôn ngữ mà người dùng hay sử dụng, nhưng không nên chèn lặp đi lặp lại vào mọi đoạn. Hãy trả lời trực tiếp câu hỏi chính, giải thích thuật ngữ cần thiết và đưa ví dụ đúng với tình huống của người đọc."]},{"heading":"Tạo cấu trúc giúp người đọc tìm được đáp án","paragraphs":["Tiêu đề nên mô tả đúng nội dung của mục. Mở đầu nói rõ bài sẽ giải quyết việc gì; phần thân đi từ khái niệm đến ví dụ hoặc các bước; phần cuối tóm tắt quyết định hay hành động tiếp theo. Dùng ảnh minh họa khi nó thực sự giúp hiểu nhanh hơn.","Liên kết đến tài liệu gốc, hướng dẫn liên quan và các bài có chủ đề gần nhau giúp người đọc đi sâu hơn. Với nội dung kỹ thuật, hãy thử làm theo chính các bước bạn viết và kiểm tra phiên bản."]},{"heading":"Đo chất lượng bằng giá trị, không phải mật độ từ khóa","paragraphs":["Sau khi xuất bản, xem truy vấn nào đưa người đọc tới bài, họ có tìm được thông tin chính và bài có cần cập nhật không. Lượt xem không phải chỉ số duy nhất; bài viết hữu ích có thể giúp người đọc giải quyết vấn đề ngay cả khi nó không quá dài.","Tránh hứa hẹn quá mức, sao chép nhiều bài thành một hoặc dùng tiêu đề giật gân không được nội dung hỗ trợ. SEO bền vững bắt đầu từ nội dung chính xác, có mục đích rõ và dễ sử dụng."]}],[{"heading":"Phân biệt lượt nhấp với chuyển đổi","paragraphs":["Lượt hiển thị cho biết quảng cáo đã xuất hiện bao nhiêu lần; lượt nhấp cho biết có bao nhiêu lần người xem bấm vào. Nhưng điều doanh nghiệp cần thường là một hành động sau cú nhấp: gửi biểu mẫu, đặt lịch, mua hàng hoặc để lại thông tin phù hợp.","Nếu chiến dịch nhiều lượt nhấp nhưng ít chuyển đổi, đừng vội tăng ngân sách. Hãy kiểm tra trang đích có tải tốt không, thông điệp có khớp với quảng cáo không, biểu mẫu có quá dài không và conversion tracking có được cài đúng không."]},{"heading":"Đọc các chỉ số theo mục tiêu","paragraphs":["CTR giúp nhìn mức độ người xem nhấp vào quảng cáo; CPC là chi phí trung bình cho một lượt nhấp; tỷ lệ chuyển đổi cho biết bao nhiêu lượt truy cập tạo ra hành động mong muốn. Những chỉ số này phải được đọc cùng nhau và trong đúng bối cảnh ngành, kênh và giai đoạn chiến dịch.","Nếu mục tiêu là khách hàng tiềm năng, hãy nhìn thêm chất lượng lead và chi phí cho lead đủ điều kiện. Nếu mục tiêu là doanh thu, hãy xem đơn hàng và biên lợi nhuận chứ không chỉ dựa vào lượt tương tác."]},{"heading":"Thử nghiệm có giả thuyết rõ ràng","paragraphs":["Thay một yếu tố mỗi lần khi có thể: thông điệp quảng cáo, nhóm đối tượng hoặc trang đích. Ghi lại giả thuyết và khoảng thời gian đánh giá để tránh kết luận từ vài dữ liệu ngẫu nhiên.","Số liệu chỉ có ý nghĩa khi tracking được thiết lập đúng và có đủ dữ liệu để so sánh. Hãy kiểm tra sự kiện chuyển đổi trước, rồi mới dùng nó để quyết định chi tiêu."]}],[{"heading":"Đọc để hiểu ý chính trước khi tra từ","paragraphs":["Khi mở một trang tài liệu tiếng Anh, hãy nhìn tiêu đề, đoạn giới thiệu và các ví dụ trước. Đặt mục tiêu nhỏ như hiểu cách cấu hình một tùy chọn hoặc tìm lý do của một thông báo lỗi, thay vì cố dịch toàn bộ trang.","Đừng tra mọi từ mới. Nếu từ đó lặp lại hoặc khiến bạn hiểu sai bước cần làm, hãy tra trong từ điển hoặc tài liệu chính thức. Ghi kèm một câu ví dụ giúp bạn nhớ cách dùng từ trong ngữ cảnh."]},{"heading":"Dùng tài liệu thật làm bài luyện tập","paragraphs":["Chọn một mục ngắn trong README, tài liệu API hoặc hướng dẫn cài đặt. Tóm tắt bằng tiếng Việt hai hoặc ba ý chính, sau đó quay lại văn bản để kiểm tra mình có bỏ sót điều kiện quan trọng không.","Với thông báo lỗi, học cả cấu trúc câu và từ vựng kỹ thuật. Ví dụ, phân biệt required, unsupported và deprecated có thể giúp bạn hiểu một tính năng bắt buộc, không được hỗ trợ hay đang được khuyến nghị thay thế."]},{"heading":"Tích lũy đều thay vì nhồi từ vựng","paragraphs":["Mỗi ngày chọn một đoạn ngắn và vài từ thật sự hữu ích. Ôn lại sau một khoảng thời gian, rồi thử dùng từ trong câu liên quan đến dự án của mình.","Mục tiêu không nhất thiết là đọc thật nhanh ngay từ đầu. Quan trọng là dần nhận ra cấu trúc, biết tìm đúng thông tin và đủ tự tin để kiểm tra tài liệu gốc thay vì chỉ dựa vào bản dịch."]}],[{"heading":"Khoanh vùng trước khi đổi cấu hình","paragraphs":["Khi không truy cập được một dịch vụ, trước tiên hãy xác định lỗi xảy ra ở một máy hay nhiều máy, chỉ một trang web hay toàn bộ mạng. Kiểm tra kết nối vật lý hoặc Wi-Fi và trạng thái giao diện mạng trước khi thay đổi địa chỉ IP.","Nếu có quyền quản trị, hãy kiểm tra địa chỉ IP, subnet mask và default gateway theo sơ đồ mạng được cấp. Những thông số này cần nhất quán với mạng hiện tại; thay ngẫu nhiên có thể làm mất kết nối hoặc gây xung đột địa chỉ."]},{"heading":"Phân biệt lỗi kết nối IP với lỗi tên miền","paragraphs":["Nếu kết nối tới địa chỉ IP hoạt động nhưng truy cập tên miền không được, DNS là một hướng cần kiểm tra. Nếu không kết nối được tới gateway, cần xem lại liên kết mạng, cấu hình IP hoặc thiết bị mạng trước khi kết luận do DNS.","Các công cụ như ping, ipconfig trên Windows hoặc ip addr trên Linux có thể cung cấp manh mối. Không phải mọi máy chủ đều cho phép phản hồi ping, vì vậy hãy kết hợp kết quả với kiểm tra DNS và khả năng truy cập dịch vụ thực tế."]},{"heading":"Ghi lại thay đổi và kiểm tra sau mỗi bước","paragraphs":["Thay một yếu tố mỗi lần và ghi kết quả giúp bạn biết thay đổi nào có tác dụng. Trong môi trường doanh nghiệp, không tự ý chỉnh thiết bị mạng hoặc thông số hệ thống nếu chưa được phân quyền.","Quy trình chẩn đoán có thứ tự giúp tránh những thay đổi không cần thiết và tạo ghi chú hữu ích cho người tiếp nhận xử lý tiếp theo."]}],[{"heading":"Định nghĩa phiên bản nhỏ nhất có ích","paragraphs":["Một dự án đầu tiên có thể là ứng dụng quản lý việc cần làm, ghi chú hoặc theo dõi chi tiêu. Thay vì viết danh sách hàng chục tính năng, hãy chọn một luồng hoàn chỉnh: nhập dữ liệu, lưu lại, xem danh sách và sửa hoặc xóa một mục.","Viết vài tiêu chí chấp nhận bằng ngôn ngữ bình thường. Ví dụ: khi người dùng thêm một công việc có tiêu đề hợp lệ, công việc phải xuất hiện trong danh sách; nếu tiêu đề rỗng, ứng dụng phải báo lỗi và không lưu."]},{"heading":"Làm theo lát cắt hoàn chỉnh","paragraphs":["Dựng một phần chạy được từ giao diện tới dữ liệu trước, rồi cải thiện nó. Điều này thường giúp phát hiện sớm các vấn đề về mô hình dữ liệu, luồng thao tác hoặc cách xử lý lỗi.","Chia công việc thành các bước có thể kiểm tra và lưu lịch sử thay đổi bằng Git. Khi lỗi xuất hiện, bạn có thể xác định gần đúng thay đổi nào gây ra lỗi thay vì phải đọc lại cả dự án."]},{"heading":"Một dự án hoàn thành còn cần hướng dẫn","paragraphs":["Trước khi xem là xong, hãy chạy lại các luồng chính, xử lý trường hợp thiếu hoặc sai dữ liệu và viết README gồm mục tiêu, công nghệ, cách cài đặt và cách chạy. Nếu cần cấu hình biến môi trường, giải thích rõ tên biến nhưng tuyệt đối không đưa mật khẩu hay token thật vào kho mã nguồn.","Một dự án nhỏ mà bạn có thể giải thích quyết định thiết kế, nêu giới hạn và chứng minh bằng cách chạy thử sẽ hữu ích hơn một dự án lớn chỉ hoạt động trên máy của người hướng dẫn."]}]];
const blogPage=()=>{
  const topics=['Tất cả',...new Set(BLOG_ARTICLES.map(article=>article.tag))];
  const featured=BLOG_ARTICLES[0];
  const restArticles=BLOG_ARTICLES.slice(1);

  const featuredMarkup=featured
    ? '<article class="edn-mag-lead" data-blog-tag="'+esc(featured.tag)+'">'+
        '<a class="edn-mag-lead-media" href="#/blog/'+slugify(featured.title)+'" aria-label="Đọc bài: '+esc(featured.title)+'">'+
          '<img src="'+esc(featured.image||'')+'" alt="'+esc(featured.title)+'" loading="eager">'+
          '<span class="edn-mag-badge-featured">Tiêu điểm</span>'+
        '</a>'+
        '<div class="edn-mag-lead-content">'+
          '<div class="edn-mag-meta-row"><span class="edn-mag-tag-pill">'+esc(featured.tag)+'</span><span class="edn-mag-read-time">⏱ '+esc(featured.time)+'</span></div>'+
          '<h2 class="edn-mag-lead-title"><a href="#/blog/'+slugify(featured.title)+'">'+esc(featured.title)+'</a></h2>'+
          '<p class="edn-mag-lead-excerpt">'+esc(featured.excerpt)+'</p>'+
          '<div class="edn-mag-author-row">'+
            '<div class="edn-mag-author-info"><span class="edn-mag-author-avatar">E</span><span>Biên tập viên EduNext · Chuyên mục Kỹ thuật</span></div>'+
            '<a class="btn btn-p btn-s" href="#/blog/'+slugify(featured.title)+'">Đọc bài viết ↗</a>'+
          '</div>'+
        '</div>'+
      '</article>'
    : '';

  const cards=restArticles.map(article=>{
    return '<article class="edn-mag-card" data-blog-tag="'+esc(article.tag)+'">'+
      '<a class="edn-mag-card-media" href="#/blog/'+slugify(article.title)+'" aria-label="Đọc bài: '+esc(article.title)+'">'+
        '<img src="'+esc(article.image||'')+'" alt="'+esc(article.title)+'" loading="lazy">'+
        '<span class="edn-mag-tag-pill">'+esc(article.tag)+'</span>'+
      '</a>'+
      '<div class="edn-mag-card-body">'+
        '<div class="edn-mag-meta-row"><span class="edn-mag-read-time">⏱ '+esc(article.time)+'</span><span>EduNext Magazine</span></div>'+
        '<h3 class="edn-mag-card-title"><a href="#/blog/'+slugify(article.title)+'">'+esc(article.title)+'</a></h3>'+
        '<p class="edn-mag-card-excerpt">'+esc(article.excerpt)+'</p>'+
        '<div class="edn-mag-card-footer">'+
          '<span class="edn-mag-card-author">Biên tập EduNext</span>'+
          '<a class="edn-mag-read-link" href="#/blog/'+slugify(article.title)+'">Đọc tiếp →</a>'+
        '</div>'+
      '</div>'+
    '</article>';
  }).join('');

  return '<div class="wrap page edn-magazine-page">'+
    '<div class="edn-mag-header">'+
      '<span class="edn-overline">EDUNEXT MAGAZINE · CHUYÊN MÔN & THỰC CHIẾN</span>'+
      '<h1>Kiến thức thực tế, ứng dụng ngay</h1>'+
      '<p>Ghi chép chuyên sâu về kiến trúc phần mềm, tư duy hệ thống, thiết kế sản phẩm và phương pháp làm việc hiệu quả từ các kỹ sư giàu kinh nghiệm.</p>'+
    '</div>'+
    '<div class="edn-mag-topic-row" aria-label="Lọc bài viết theo chủ đề">'+
      topics.map((topic,index)=>
        '<button type="button" class="edn-mag-topic-pill '+(index===0?'is-active':'')+'" data-blog-topic="'+esc(topic)+'" aria-pressed="'+(index===0?'true':'false')+'">'+esc(topic)+'</button>'
      ).join('')+
    '</div>'+
    featuredMarkup+
    '<div class="edn-mag-grid">'+cards+'</div>'+
    '<section class="edn-mag-cta-box">'+
      '<div>'+
        '<span class="edn-overline">HỌC ĐI ĐÔI VỚI HÀNH</span>'+
        '<h2>Sẵn sàng biến kiến thức thành kỹ năng thực tế?</h2>'+
        '<p>Khám phá hơn 50 lộ trình học tập bài bản được thiết kế cùng các chuyên gia hàng đầu.</p>'+
      '</div>'+
      '<a class="btn btn-p" href="#/courses">Xem tất cả khóa học ↗</a>'+
    '</section>'+
  '</div>';
};
const blogDetail=slug=>{
  const index=BLOG_ARTICLES.findIndex(article=>slugify(article.title)===slug);
  if(index<0)return nf();
  const article=BLOG_ARTICLES[index];
  const sections=BLOG_ARTICLE_BODY[index]||[];
  const course=find(article.course);
  const instructor=course?getCourseInstructor(course):INSTRUCTORS[0];

  const body=sections.map(section=>{
    const heading=section.heading?'<h2>'+esc(section.heading)+'</h2>':'';
    const paragraphs=(section.paragraphs||[]).map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('');
    const bullets=Array.isArray(section.bullets)&&section.bullets.length
      ?'<ul>'+section.bullets.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>':'';
    return '<section class="edn-blog-content-section">'+heading+paragraphs+bullets+'</section>';
  }).join('');

  const previous=BLOG_ARTICLES[(index-1+BLOG_ARTICLES.length)%BLOG_ARTICLES.length];
  const next=BLOG_ARTICLES[(index+1)%BLOG_ARTICLES.length];

  const relatedArticles=BLOG_ARTICLES.filter((_,i)=>i!==index).slice(0,2);
  const relatedArticlesMarkup=relatedArticles.map(a=>
    '<a class="edn-sidebar-related-item" href="#/blog/'+slugify(a.title)+'">'+
      '<img src="'+esc(a.image||'')+'" alt="" loading="lazy">'+
      '<div><strong>'+esc(a.title)+'</strong><small>'+esc(a.tag)+' · '+esc(a.time)+'</small></div>'+
    '</a>'
  ).join('');

  const courseWidget=course
    ? '<div class="edn-sidebar-course-widget">'+
        '<span class="edn-sidebar-widget-label">KHÓA HỌC THỰC CHIẾN LIÊN QUAN</span>'+
        '<div class="edn-sidebar-course-thumb"><img src="'+esc(getCourseImage(course))+'" alt="'+esc(course.t)+'"></div>'+
        '<h3>'+esc(course.t)+'</h3>'+
        '<p class="edn-sidebar-instructor-row"><img src="'+esc(instructor.avatar)+'" alt=""> <span>'+esc(instructor.name)+' · '+esc(instructor.org)+'</span></p>'+
        '<div class="edn-sidebar-course-price"><strong>'+esc(money(course.p))+'</strong>'+(typeof course.o==='number'&&course.o>course.p?'<del>'+esc(money(course.o))+'</del>':'')+'</div>'+
        '<a class="btn btn-p btn-block" href="#/course/'+esc(course.id)+'">Xem chi tiết lộ trình ↗</a>'+
      '</div>'
    : '';

  return '<article class="wrap page edn-blog-article-page">'+
    '<nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/blog">Blog</a><span>›</span><span>'+esc(article.tag)+'</span></nav>'+
    '<header class="edn-article-header">'+
      '<div class="edn-article-meta-badges"><span class="edn-mag-tag-pill">'+esc(article.tag)+'</span><span class="edn-mag-read-time">⏱ '+esc(article.time)+'</span><span class="edn-article-date">Cập nhật 2026</span></div>'+
      '<h1>'+esc(article.title)+'</h1>'+
      '<p class="edn-article-lead-summary">'+esc(article.excerpt)+'</p>'+
      '<div class="edn-article-author-byline">'+
        '<div class="edn-author-badge"><span class="edn-author-av">E</span><div><strong>Ban Biên tập EduNext</strong><small>Chuyên mục Kỹ thuật & Công nghệ</small></div></div>'+
        '<div class="edn-article-share-actions"><a class="btn btn-g btn-s" href="#/blog">← Quay lại Blog</a></div>'+
      '</div>'+
    '</header>'+
    (article.image?'<div class="edn-article-hero-cover"><img src="'+esc(article.image)+'" alt="'+esc(article.title)+'"><figcaption>Hình ảnh minh họa chuyên mục '+esc(article.tag)+' · EduNext Magazine</figcaption></div>':'')+
    '<div class="edn-article-layout-grid">'+
      '<div class="edn-article-main-content">'+
        body+
        '<div class="edn-article-callout-box">'+
          '<div class="edn-callout-icon">💡</div>'+
          '<div>'+
            '<h4>Lời khuyên từ ban biên tập EduNext</h4>'+
            '<p>Kiến thức chỉ thật sự trở thành kỹ năng khi bạn trực tiếp bắt tay vào thực hành. Hãy mở ngay môi trường phát triển của bạn, thử nghiệm một đoạn code hoặc tạo một prototype nhỏ từ các nguyên tắc trong bài viết này.</p>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<aside class="edn-article-sticky-sidebar">'+
        courseWidget+
        '<div class="edn-sidebar-related-box">'+
          '<h4>Bài viết cùng chủ đề</h4>'+
          '<div class="edn-sidebar-related-list">'+relatedArticlesMarkup+'</div>'+
        '</div>'+
      '</aside>'+
    '</div>'+
    '<nav class="edn-blog-post-nav" aria-label="Điều hướng bài viết">'+
      '<a class="edn-post-nav-card prev" href="#/blog/'+slugify(previous.title)+'">'+
        '<small>← BÀI TRƯỚC</small>'+
        '<strong>'+esc(previous.title)+'</strong>'+
      '</a>'+
      '<a class="edn-post-nav-card next" href="#/blog/'+slugify(next.title)+'">'+
        '<small>BÀI TIẾP THEO →</small>'+
        '<strong>'+esc(next.title)+'</strong>'+
      '</a>'+
    '</nav>'+
  '</article>';
};
const faqItems=[
['EduNext hiện có những lĩnh vực nào?','Danh mục khởi đầu có 50 lĩnh vực cùng các chủ đề chuyên môn liên quan. Danh mục có thể mở rộng khi có chương trình mới.'],
['Tất cả khóa học đã mở bán chưa?','Chưa. Các chương trình đang hiển thị là đề cương học tập. Chỉ khi nội dung, video hoặc học liệu, giá và cơ chế thanh toán được kiểm tra thì khóa học mới được mở bán.'],
['Tại sao tôi chưa thể thanh toán?','Hiện tại chưa có cổng thanh toán thực tế được kết nối trong theme. EduNext không tạo giao dịch hoặc mở quyền học chỉ vì người dùng bấm nút.'],
['Tiến độ học có gắn với tài khoản không?','Có. Khi khóa học đã được xuất bản và tài khoản có quyền truy cập, tiến độ được lưu phía WordPress theo người dùng và khóa học.'],
['Khi nào nhận được chứng chỉ?','Chứng chỉ chỉ được ghi nhận sau khi hệ thống xác nhận quyền học và toàn bộ điều kiện hoàn thành của khóa học.'],
['Làm thế nào để cập nhật hồ sơ?','Đăng nhập, bấm trực tiếp vào Hồ sơ ở thanh đầu trang, chỉnh sửa thông tin và lưu.']
];
const faqPage=()=>'<div class="wrap page edn-faq-page"><div class="edn-page-intro"><span class="edn-overline">HỖ TRỢ</span><h1>Câu hỏi thường gặp</h1><p>Thông tin về danh mục chương trình, tài khoản, quyền học, thanh toán và chứng chỉ trên EduNext.</p></div><div class="edn-faq-list">'+faqItems.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div></div>';
const aboutPage=()=>{
  return '<main class="wrap page edn-about-page">'+
    '<nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><span>Về EduNext</span></nav>'+
    '<section class="edn-about-hero"><div class="edn-about-hero-copy"><span class="edn-about-eyebrow"><span class="edn-about-eyebrow-dot"></span> VỀ EDUNEXT</span><h1>Học có định hướng.<br><em>Tiến bộ từng bước.</em></h1><p>Không phải lúc nào chúng ta cũng biết nên học gì tiếp theo. EduNext được xây dựng để giúp bạn khám phá lĩnh vực phù hợp, hiểu rõ lộ trình học và chủ động biến kiến thức thành kỹ năng qua thực hành.</p><div class="edn-about-hero-actions"><a class="btn btn-p" href="#/categories">Khám phá lĩnh vực <span aria-hidden="true">↗</span></a><a class="edn-about-text-link" href="#/blog">Đọc Blog <span aria-hidden="true">→</span></a></div><div class="edn-about-hero-note"><span aria-hidden="true">✳</span><span>Không cần biết tất cả ngay từ đầu. Hãy bắt đầu từ bước kế tiếp.</span></div></div>'+
    '<div class="edn-about-visual" aria-label="Ba bước trong hành trình học tập"><div class="edn-about-visual-orbit edn-about-orbit-one"></div><div class="edn-about-visual-orbit edn-about-orbit-two"></div><div class="edn-about-visual-header"><span>EDUNEXT LEARNING PATH</span><span class="edn-about-visual-live"><i></i> HÀNH TRÌNH CỦA BẠN</span></div><div class="edn-about-visual-steps"><div class="edn-about-visual-step"><span class="edn-about-step-num">01</span><span class="edn-about-step-icon" aria-hidden="true">⌕</span><div><small>BƯỚC MỘT</small><strong>Khám phá</strong><p>Tìm lĩnh vực bạn muốn hiểu sâu hơn.</p></div><span class="edn-about-step-check" aria-hidden="true">↗</span></div><div class="edn-about-visual-step is-highlighted"><span class="edn-about-step-num">02</span><span class="edn-about-step-icon" aria-hidden="true">▤</span><div><small>BƯỚC HAI</small><strong>Học theo lộ trình</strong><p>Đi từ nền tảng đến từng chủ đề cụ thể.</p></div><span class="edn-about-step-check" aria-hidden="true">↗</span></div><div class="edn-about-visual-step"><span class="edn-about-step-num">03</span><span class="edn-about-step-icon" aria-hidden="true">↗</span><div><small>BƯỚC BA</small><strong>Thực hành và nhìn lại</strong><p>Thử áp dụng, kiểm tra và tiếp tục tiến bộ.</p></div><span class="edn-about-step-check" aria-hidden="true">✓</span></div></div><div class="edn-about-visual-foot"><span>HỌC HÔM NAY</span><span>TIẾN BỘ NGÀY MAI <b aria-hidden="true">↗</b></span></div></div></section>'+
    '<section class="edn-about-intro"><div class="edn-about-section-label"><span>01</span><span>VÌ SAO CÓ EDUNEXT?</span></div><div class="edn-about-intro-copy"><h2>Kiến thức chỉ thật sự có ích khi bạn biết <em>đưa nó vào việc mình làm.</em></h2><p>Học trực tuyến có thể bắt đầu bằng một video hay một bài viết. Nhưng để đi xa hơn, người học cần biết mình đang học chủ đề gì, kiến thức đó liên quan đến đâu và có thể thử áp dụng bằng cách nào. EduNext hướng tới việc làm cho hành trình ấy mạch lạc hơn — từ lúc khám phá, đến lúc thực hành và tự đánh giá điều mình đã hiểu.</p></div></section>'+
    '<section class="edn-about-mission-grid"><article class="edn-about-mission-card edn-about-mission-main"><span class="edn-about-card-overline">SỨ MỆNH</span><div class="edn-about-card-symbol" aria-hidden="true">↗</div><h2>Giúp việc học trở nên rõ ràng và chủ động hơn.</h2><p>Chúng tôi muốn người học dễ tìm thấy lĩnh vực mình quan tâm, biết phạm vi của từng chương trình và có định hướng cụ thể cho bước học tiếp theo.</p></article><article class="edn-about-mission-card edn-about-vision-card"><span class="edn-about-card-overline">TẦM NHÌN</span><div class="edn-about-card-symbol" aria-hidden="true">✳</div><h2>Một điểm bắt đầu đáng tin cậy cho việc học suốt đời.</h2><p>EduNext hướng tới một không gian học tập có cấu trúc, gần với nhu cầu thực tế và không ngừng được cải thiện dựa trên phản hồi của người học.</p></article></section>'+
    '<section class="edn-about-goals"><header class="edn-about-section-head"><div><span class="edn-about-eyebrow">MỤC TIÊU</span><h2>Thiết kế trải nghiệm xoay quanh <em>người học.</em></h2></div><p>Ba điều EduNext ưu tiên khi phát triển danh mục, nội dung và các công cụ học tập.</p></header><div class="edn-about-goal-grid"><article class="edn-about-goal-card"><span class="edn-about-card-number">01 / ĐỊNH HƯỚNG</span><div class="edn-about-goal-icon" aria-hidden="true">⌖</div><h3>Dễ biết nên bắt đầu từ đâu</h3><p>Nhóm lĩnh vực và chuyên ngành giúp bạn thu hẹp lựa chọn, so sánh chủ đề và tìm nội dung gần với mục tiêu cá nhân.</p></article><article class="edn-about-goal-card"><span class="edn-about-card-number">02 / THỰC HÀNH</span><div class="edn-about-goal-icon" aria-hidden="true">▧</div><h3>Nối kiến thức với việc làm</h3><p>Ưu tiên bài học có cấu trúc, ví dụ cụ thể và gợi ý thực hành để bạn kiểm tra điều mình vừa học.</p></article><article class="edn-about-goal-card"><span class="edn-about-card-number">03 / TIẾN BỘ</span><div class="edn-about-goal-icon" aria-hidden="true">↗</div><h3>Nhìn thấy bước tiếp theo</h3><p>Giúp người học biết mình đã tìm hiểu gì, cần đào sâu phần nào và có thể tiếp tục theo hướng nào.</p></article></div></section>'+
    '<section class="edn-about-direction"><div class="edn-about-direction-heading"><span class="edn-about-eyebrow">ĐỊNH HƯỚNG PHÁT TRIỂN</span><h2>Rõ ràng trước.<br><em>Hoàn thiện dần.</em></h2><p>EduNext được phát triển theo từng lớp nền tảng, ưu tiên sự dễ hiểu và hữu ích thay vì thêm tính năng chỉ để làm giao diện trông phức tạp hơn.</p><a class="edn-about-text-link" href="#/blog">Khám phá các góc nhìn học tập <span aria-hidden="true">→</span></a></div><div class="edn-about-roadmap"><article><span class="edn-about-roadmap-index">01</span><div><h3>Danh mục có cấu trúc</h3><p>Sắp xếp lĩnh vực lớn và chuyên ngành hợp lý để người học tìm đúng hướng.</p></div><span class="edn-about-roadmap-mark" aria-hidden="true">✓</span></article><article><span class="edn-about-roadmap-index">02</span><div><h3>Nội dung có ích</h3><p>Phát triển bài viết, ví dụ và học liệu với giải thích rõ ràng, phù hợp từng chủ đề.</p></div><span class="edn-about-roadmap-mark" aria-hidden="true">↗</span></article><article><span class="edn-about-roadmap-index">03</span><div><h3>Công cụ hỗ trợ học tập</h3><p>Từng bước hoàn thiện trải nghiệm xem bài, quản lý tiến độ và các chức năng cho người học.</p></div><span class="edn-about-roadmap-mark" aria-hidden="true">↗</span></article><article><span class="edn-about-roadmap-index">04</span><div><h3>Cải thiện từ phản hồi</h3><p>Tiếp tục điều chỉnh nội dung và giao diện dựa trên vấn đề người học thực sự gặp.</p></div><span class="edn-about-roadmap-mark" aria-hidden="true">↗</span></article></div></section>'+
    '<section class="edn-about-values"><header class="edn-about-section-head"><div><span class="edn-about-eyebrow">GIÁ TRỊ CỐT LÕI</span><h2>Những nguyên tắc <em>chúng tôi theo đuổi.</em></h2></div><p>Đây là tiêu chuẩn để định hướng cách EduNext trình bày kiến thức và xây dựng trải nghiệm học tập.</p></header><div class="edn-about-value-grid"><article><span class="edn-about-value-symbol" aria-hidden="true">◎</span><h3>Rõ ràng</h3><p>Giải thích dễ hiểu, trình bày có thứ tự và cho biết điều gì đã hoàn thiện, điều gì còn đang phát triển.</p></article><article><span class="edn-about-value-symbol" aria-hidden="true">✳</span><h3>Thực tế</h3><p>Ưu tiên tình huống, ví dụ và kỹ năng có thể liên hệ với học tập, dự án hoặc công việc.</p></article><article><span class="edn-about-value-symbol" aria-hidden="true">↗</span><h3>Chủ động</h3><p>Khuyến khích đặt câu hỏi, tự thực hành, kiểm tra kết quả và tìm thêm tài liệu khi cần.</p></article><article><span class="edn-about-value-symbol" aria-hidden="true">◇</span><h3>Trung thực</h3><p>Không hứa hẹn kết quả học tập, chứng chỉ hay trạng thái khóa học khi chưa có cơ sở xác nhận.</p></article></div></section>'+
    '<section class="edn-about-promise"><div class="edn-about-promise-mark" aria-hidden="true">“</div><div><span class="edn-about-eyebrow">CAM KẾT VỚI NGƯỜI HỌC</span><h2>Học tốt hơn không phải học nhiều hơn bằng mọi giá.</h2><p>Mỗi bước nên giúp bạn hiểu rõ hơn một vấn đề, thực hành được một kỹ năng hoặc biết mình cần học gì tiếp theo. Đó là trải nghiệm mà EduNext đang hướng tới và sẽ tiếp tục hoàn thiện.</p></div></section>'+
    '<section class="edn-about-final-cta"><div><span class="edn-about-eyebrow">BƯỚC TIẾP THEO CỦA BẠN</span><h2>Bạn muốn khám phá điều gì hôm nay?</h2><p>Bắt đầu từ một lĩnh vực quan tâm hoặc đọc một bài viết để tìm hướng thực hành phù hợp.</p></div><div class="edn-about-final-actions"><a class="btn btn-p" href="#/categories">Xem nhóm lĩnh vực <span aria-hidden="true">↗</span></a><a class="btn btn-g" href="#/blog">Đọc Blog</a></div></section>'+
    '</main>';
};
const profilePage=section=>{
  if(!D.me)return guard('/profile');
  const u=me(),meta=u.profile||{};
  const parts=String(u.name||'').trim().split(/\s+/);
  const defaultFirst=parts.length>1?parts[parts.length-1]:(parts[0]||'');
  const defaultLast=parts.length>1?parts.slice(0,-1).join(' '):'';
  const first=meta.firstName!==undefined?meta.firstName:defaultFirst;
  const last=meta.lastName!==undefined?meta.lastName:defaultLast;
  const full=[first,last].filter(Boolean).join(' ')||u.name||'Học viên EduNext';
  const avatar=meta.avatar?'<img src="'+esc(meta.avatar)+'" alt="Ảnh hồ sơ">':'<svg class="edn-profile-avatar-placeholder" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c.5-3.3 3.2-5 7-5s6.5 1.7 7 5"></path></svg>';
  const navItems=[['profile','Thông tin cá nhân'],['photo','Ảnh đại diện'],['security','Mật khẩu']];
  const nav=navItems.map(([id,label])=>'<a class="edn-profile-menu-item '+(section===id?'is-active':'')+'" '+(section===id?'aria-current="page"':'')+' href="#/profile/'+id+'">'+label+'</a>').join('');
  let title='Thông tin cá nhân',subtitle='Cập nhật thông tin cơ bản cho tài khoản EduNext.',content='';
  if(section==='photo'){
    title='Ảnh đại diện';subtitle='Tải ảnh lên để cập nhật ảnh hồ sơ tài khoản.';
    content='<div class="edn-setting-card"><div class="edn-avatar-editor"><div class="edn-profile-avatar-large">'+avatar+'</div><div class="edn-avatar-editor-actions"><h3>Ảnh đại diện</h3><p>Hỗ trợ JPG, PNG hoặc WebP, tối đa 2 MB. Ảnh sẽ được hiển thị trong thanh điều hướng của bạn.</p><div class="edn-avatar-button-row"><label class="btn btn-g" for="edn-profile-avatar-file">Chọn ảnh</label>'+(meta.avatar?'<button class="btn btn-g edn-remove-avatar" type="button" data-a="profile-avatar-remove">Xóa ảnh đại diện</button>':'')+'</div><input id="edn-profile-avatar-file" type="file" accept="image/jpeg,image/png,image/webp" class="edn-visually-hidden"><p class="edn-profile-error" id="edn-profile-error" role="alert"></p></div></div></div>';
  }else if(section==='security'){
    title='Mật khẩu';subtitle='Đổi mật khẩu đăng nhập của tài khoản WordPress.';
    content='<form class="edn-profile-form edn-setting-card" data-form="profile-password" novalidate><div class="edn-field"><label for="edn-current-password">Mật khẩu hiện tại</label><input id="edn-current-password" name="currentPassword" type="password" autocomplete="current-password" required></div><div class="edn-field"><label for="edn-new-password">Mật khẩu mới</label><input id="edn-new-password" name="newPassword" type="password" minlength="8" autocomplete="new-password" required></div><div class="edn-field"><label for="edn-confirm-password">Nhập lại mật khẩu mới</label><input id="edn-confirm-password" name="confirmPassword" type="password" minlength="8" autocomplete="new-password" required></div><p class="edn-profile-error" id="edn-profile-error" role="alert"></p><div class="edn-profile-save-row"><span>Mật khẩu được cập nhật thông qua WordPress.</span><button type="submit" class="btn btn-p">Cập nhật mật khẩu</button></div></form>';
  }else if(section==='public'){
    title='Hồ sơ';subtitle='Thông tin hồ sơ của bạn.';
    content='<div class="edn-public-profile"><div class="edn-public-avatar">'+avatar+'</div><h2>'+esc(full)+'</h2><p class="edn-public-headline">'+esc(meta.headline||'')+'</p><p>'+esc(meta.bio||'')+'</p><div class="edn-profile-public-links">'+(meta.website?'<a href="'+esc(meta.website)+'" target="_blank" rel="noopener noreferrer">Website</a>':'')+(meta.linkedin?'<a href="'+esc(meta.linkedin)+'" target="_blank" rel="noopener noreferrer">LinkedIn</a>':'')+(meta.facebook?'<a href="'+esc(meta.facebook)+'" target="_blank" rel="noopener noreferrer">Facebook</a>':'')+'</div><a class="btn btn-g" href="#/profile/profile">Chỉnh sửa hồ sơ</a></div>';
  }else{
    section='profile';
    content='<form class="edn-profile-form" data-form="profile-save" novalidate>'+
      '<h3 class="edn-form-section-title">Thông tin cơ bản</h3><div class="edn-profile-field-grid">'+
      '<div class="edn-field"><label for="edn-first-name">Tên</label><input id="edn-first-name" name="firstName" value="'+esc(first)+'" maxlength="60" autocomplete="given-name" required></div>'+
      '<div class="edn-field"><label for="edn-last-name">Họ</label><input id="edn-last-name" name="lastName" value="'+esc(last)+'" maxlength="60" autocomplete="family-name" required></div></div>'+
      '<div class="edn-field"><div class="edn-label-line"><label for="edn-headline">Dòng giới thiệu ngắn</label><span id="edn-headline-count">'+String(meta.headline||'').length+'/60</span></div><input id="edn-headline" name="headline" maxlength="60" value="'+esc(meta.headline||'')+'" placeholder="Ví dụ: Người học phát triển Web"></div>'+
      '<div class="edn-field"><label for="edn-bio">Giới thiệu bản thân</label><textarea id="edn-bio" name="bio" rows="5" maxlength="600" placeholder="Chia sẻ ngắn gọn về mục tiêu học tập của bạn">'+esc(meta.bio||'')+'</textarea></div>'+
      '<div class="edn-profile-divider"></div><h3 class="edn-form-section-title">Đường liên kết</h3>'+
      '<div class="edn-field"><label for="edn-website">Website cá nhân</label><input id="edn-website" name="website" type="url" value="'+esc(meta.website||'')+'" placeholder="https://example.com"></div>'+
      '<div class="edn-field"><label for="edn-linkedin">LinkedIn</label><input id="edn-linkedin" name="linkedin" type="url" value="'+esc(meta.linkedin||'')+'" placeholder="https://linkedin.com/in/..."></div>'+
      '<div class="edn-field"><label for="edn-facebook">Facebook</label><input id="edn-facebook" name="facebook" type="url" value="'+esc(meta.facebook||'')+'" placeholder="https://facebook.com/..."></div>'+
      '<p class="edn-profile-error" id="edn-profile-error" role="alert"></p><div class="edn-profile-save-row"><span>Thông tin được lưu vào hồ sơ WordPress của bạn.</span><button class="btn btn-p" type="submit">Lưu hồ sơ</button></div></form>';
  }
  return '<div class="edn-profile-page wrap"><aside class="edn-profile-sidebar"><div class="edn-profile-person"><div class="edn-profile-avatar-large">'+avatar+'</div><strong>'+esc(full)+'</strong><span>Tài khoản EduNext</span></div><nav class="edn-profile-settings-nav" aria-label="Hồ sơ">'+nav+'</nav><button class="edn-profile-logout" type="button" data-a="logout">Đăng xuất</button></aside><section class="edn-profile-main"><header class="edn-profile-heading"><h1>'+title+'</h1><p>'+subtitle+'</p></header><div class="edn-profile-content">'+content+'</div></section></div>';
};
const R=[
  [/^\/?$/,home],
  [/^\/courses$/,courses],
  [/^\/cart$/,cartPage],
  [/^\/best-sellers$/,courses],
  [/^\/categories$/,domainsPage],
  [/^\/group\/(.+)$/i,s=>groupDetail(decodeURIComponent(s).trim().toLowerCase().replace(/\s+/g,'-'))],
  [/^\/domain\/(.+)$/i,s=>{
    const slug=decodeURIComponent(s).trim().toLowerCase().replace(/\s+/g,'-');
    const d=DOMAINS.find(item=>item.slug===slug);
    if(d)return domainDetail(slug);
    const g=domainGroups().find(item=>item.slug===slug);
    if(g)return groupDetail(slug);
    return domainDetail(slug);
  }],
  [/^\/courses?\/(.+)$/i,s=>detail(decodeURIComponent(s).trim().toLowerCase().replace(/\s+/g,'-'))],
  [/^\/checkout\/(.+)$/i,s=>checkout(decodeURIComponent(s).trim().toLowerCase().replace(/\s+/g,'-'))],
  [/^\/learn\/([^\/]+)\/([0-9]+)$/i,(s,l)=>learn(decodeURIComponent(s).trim().toLowerCase().replace(/\s+/g,'-'),l)],
  [/^\/certificates$/,certificates],
  [/^\/cert\/([a-z0-9-]+)$/i,cert],
  [/^\/orders$/,ordersPage],
  [/^\/profile(?:\/(profile|public|photo|security))?$/i,section=>profilePage(section||'profile')],
  [/^\/(login|register)$/i,auth],
  [/^\/(dashboard|learning)$/i,dash],
  [/^\/blog\/([a-z0-9-]+)$/i,blogDetail],
  [/^\/blog$/,blogPage],
  [/^\/about$/,aboutPage],
  [/^\/faq$/,faqPage]
];

const request=async(action,values={})=>{
  if(!CFG.ajaxUrl||!CFG.nonce)throw new Error('Chưa cấu hình kết nối tài khoản WordPress.');
  const form=values instanceof FormData?values:new FormData();
  if(!(values instanceof FormData)){
    Object.entries(values||{}).forEach(([key,value])=>{
      if(value!==undefined&&value!==null)form.append(key,String(value));
    });
  }
  form.set('action',action);
  form.set('nonce',CFG.nonce);
  let response;
  try{
    response=await fetch(CFG.ajaxUrl,{method:'POST',credentials:'same-origin',body:form});
  }catch(error){
    throw new Error('Không thể kết nối máy chủ. Vui lòng thử lại.');
  }
  let payload;
  try{payload=await response.json()}catch(error){throw new Error('Máy chủ trả về phản hồi không hợp lệ.');}
  if(!response.ok||!payload||payload.success!==true){
    const message=payload&&payload.data&&payload.data.message?payload.data.message:'Thao tác chưa thành công. Vui lòng thử lại.';
    throw new Error(message);
  }
  return payload.data||{};
};

const renderDomainMegaMenu=()=>{
  const list=$('#edn-domain-mega-list');
  const groups=domainGroups();
  if(!list||!groups.length)return;
  const catalogVersion=String(groups.length)+'-'+String(DOMAINS.length);
  if(!list.children.length||list.dataset.catalogVersion!==catalogVersion){
    list.innerHTML=groups.map((group,index)=>{
      return '<a class="edn-domain-menu-item edn-domain-menu-group" href="#/group/'+esc(group.slug)+'"><span class="edn-domain-menu-number">'+String(index+1).padStart(2,'0')+'</span><span class="edn-domain-menu-name">'+esc(group.name)+'</span><small>'+group.domains.length+' chuyên ngành</small></a>';
    }).join('');
    list.dataset.catalogVersion=catalogVersion;
  }
  const heading=$('#edn-domain-mega-menu .edn-domain-mega-head strong');
  if(heading)heading.textContent='Khám phá '+groups.length+' nhóm · '+DOMAINS.length+' chuyên ngành';
};

const renderCourseMegaMenu=()=>{
  const list=$('#edn-course-mega-list');
  if(!list||!C.length)return;
  if(!list.children.length||list.dataset.catalogVersion!==String(C.length)){
    list.innerHTML=C.map((course,index)=>{
      const domain=DOMAINS.find(item=>item.id===course.domainId);
      return '<a class="edn-course-menu-item" href="#/course/'+esc(course.id)+'"><span class="edn-course-menu-number">'+String(index+1).padStart(2,'0')+'</span><span class="edn-course-menu-copy"><strong>'+esc(course.t)+'</strong><small>'+esc(domain?domain.name:course.cat)+'</small></span></a>';
    }).join('');
    list.dataset.catalogVersion=String(C.length);
  }
  const heading=$('#edn-course-mega-menu .edn-domain-mega-head strong');
  if(heading)heading.textContent='Khám phá '+C.length+' chương trình học';
};

function nav(){
  const user=me(),path=location.hash.slice(1)||'/';
  document.body.classList.add('edunext-ready');
  document.body.classList.remove('lms-mobile-open');
  if(!path.startsWith('/learn/')){
    document.body.classList.remove('edn-classroom-active');
  }
  document.body.classList.toggle('edn-home-active',path==='/');
  const profileAvatarMarkup=user&&user.profile&&user.profile.avatar
    ? '<img class="edn-header-avatar-image" src="'+esc(user.profile.avatar)+'" alt="">'
    : '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c.5-3.3 3.2-5 7-5s6.5 1.7 7 5"></path></svg>';
  const auth=$('#auth');
  if(auth){
    auth.innerHTML=user
      ? '<div class="edn-profile-menu-wrap"><a class="edunext-profile-link" href="#/profile" aria-label="Mở hồ sơ học viên" aria-haspopup="true" title="Hồ sơ học viên"><span class="edunext-profile-avatar" aria-hidden="true">'+profileAvatarMarkup+'<span class="edn-profile-alert-dot"></span></span><span class="edunext-profile-copy"><strong>Hồ sơ học viên</strong></span></a><div class="edn-profile-dropdown" aria-label="Menu hồ sơ học viên"><div class="edn-profile-dropdown-head"><strong>'+esc(user.name||'Học viên')+'</strong><small>Tài khoản EduNext</small></div><a class="edn-profile-dropdown-item" href="#/dashboard">Trang học tập</a><a class="edn-profile-dropdown-item" href="#/profile">Hồ sơ cá nhân</a><a class="edn-profile-dropdown-item" href="#/profile/photo">Ảnh đại diện</a><a class="edn-profile-dropdown-item" href="#/profile/security">Mật khẩu</a><a class="edn-profile-dropdown-item" href="#/orders">Lịch sử mua hàng</a><div class="edn-profile-dropdown-divider"></div><button class="edn-profile-dropdown-logout" type="button" data-a="logout">Đăng xuất</button></div></div>'
      : '<a class="btn btn-g btn-s" href="#/login">Đăng nhập</a><a class="btn btn-p btn-s" href="#/register">Đăng ký</a>';
  }
  renderDomainMegaMenu();
  renderCourseMegaMenu();
  const dashboardNav=$('#edn-nav-dashboard');
  if(dashboardNav)dashboardNav.hidden=!user;
  const activePath=(path.startsWith('/group/')||path.startsWith('/domain/'))?'/categories':(path.startsWith('/course/')||path.startsWith('/checkout/')||path.startsWith('/learn/')?'/courses':(path.startsWith('/blog/')?'/blog':path));
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+activePath));
  const cartLink=$('#edn-cart-trigger');
  if(cartLink)cartLink.classList.toggle('is-active',path==='/cart');
  updateCartBadge();
  const labels={
    '/':'Trang chủ','/courses':'Khóa học','/cart':'Giỏ hàng','/best-sellers':'Khóa học','/categories':'Lĩnh vực','/blog':'Blog','/faq':'Hỏi Đáp',
    '/dashboard':'Trang học tập','/orders':'Lịch sử mua hàng','/profile':'Hồ sơ','/profile/profile':'Hồ sơ','/profile/public':'Hồ sơ',
    '/profile/photo':'Ảnh đại diện','/profile/security':'Mật khẩu','/certificates':'Chứng chỉ','/login':'Đăng nhập','/register':'Đăng ký','/about':'Về EduNext'
  };
  const current=$('#lms-breadcrumb-current');
  if(current)current.textContent=labels[path]||(path.startsWith('/domain/')?'Lĩnh vực':path.startsWith('/course/')?'Chi tiết khóa học':path.startsWith('/learn/')?'Bài học':path.startsWith('/blog/')?'Blog':'EduNext');
  const menu=$('.lms-mobile-menu');
  if(menu)menu.setAttribute('aria-expanded',String(document.body.classList.contains('lms-mobile-open')));
}

let heroThreeAnimId = null;
let heroThreeCleanup = null;

const initHeroThree = () => {
  if (heroThreeCleanup) {
    heroThreeCleanup();
    heroThreeCleanup = null;
  }
  const canvas = document.getElementById('edn-hero-three-canvas');
  if (!canvas || !window.THREE) return;

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = canvas.parentElement;
  if (!container) return;

  const width = container.clientWidth || 400;
  const height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const group = new THREE.Group();
  scene.add(group);

  const icoGeo = new THREE.IcosahedronGeometry(7.5, 2);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x0F766E,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  group.add(icoMesh);

  const particleCount = 140;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const radius = 8.8;

  const colTeal = new THREE.Color(0x0F766E);
  const colMint = new THREE.Color(0x2DD4BF);
  const colAccent = new THREE.Color(0xC2410C);

  for (let i = 0; i < particleCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / particleCount);
    const theta = Math.sqrt(particleCount * Math.PI) * phi;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    const chosenColor = i % 7 === 0 ? colAccent : (i % 2 === 0 ? colTeal : colMint);
    particleColors[i * 3] = chosenColor.r;
    particleColors[i * 3 + 1] = chosenColor.g;
    particleColors[i * 3 + 2] = chosenColor.b;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const createCircleTexture = () => {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(204,251,241,0.85)');
    grad.addColorStop(1, 'rgba(15,118,110,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(32, 32, 30, 0, Math.PI * 2); ctx.fill();
    return new THREE.CanvasTexture(c);
  };

  const pMat = new THREE.PointsMaterial({
    size: 0.9,
    vertexColors: true,
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const pointsMesh = new THREE.Points(pGeo, pMat);
  group.add(pointsMesh);

  const ringGeo = new THREE.RingGeometry(10.5, 10.6, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x14B8A6,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  group.add(ringMesh);

  const ringMesh2 = new THREE.Mesh(ringGeo, ringMat.clone());
  ringMesh2.material.color.setHex(0xC2410C);
  ringMesh2.material.opacity = 0.25;
  ringMesh2.rotation.x = -Math.PI / 4;
  ringMesh2.rotation.y = Math.PI / 6;
  group.add(ringMesh2);

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    targetX = (x / rect.width) * 0.8;
    targetY = (y / rect.height) * 0.8;
  };

  container.addEventListener('mousemove', onMouseMove, { passive: true });

  const onResize = () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(container);

  let frame = 0;
  const animate = () => {
    heroThreeAnimId = requestAnimationFrame(animate);
    if (!isVisible) return;

    frame += 0.006;
    if (!reducedMotion) {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = frame * 0.7 + mouseX;
      group.rotation.x = Math.sin(frame * 0.5) * 0.15 + mouseY;
      ringMesh.rotation.z += 0.003;
      ringMesh2.rotation.z -= 0.002;
    }

    renderer.render(scene, camera);
  };

  animate();

  heroThreeCleanup = () => {
    if (heroThreeAnimId) cancelAnimationFrame(heroThreeAnimId);
    window.removeEventListener('resize', onResize);
    container.removeEventListener('mousemove', onMouseMove);
    observer.disconnect();
    renderer.dispose();
    icoGeo.dispose();
    icoMat.dispose();
    pGeo.dispose();
    pMat.dispose();
    ringGeo.dispose();
    ringMat.dispose();
  };
};

const triggerGsapAnimations = () => {
  if (!window.gsap) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const heroCopy = document.querySelector('.edn-im-hero-copy');
  if (heroCopy) {
    gsap.fromTo(
      heroCopy.children,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out' }
    );
  }

  const floatCards = document.querySelectorAll('.edn-hero-float-card');
  if (floatCards.length) {
    gsap.fromTo(
      floatCards,
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.4)', delay: 0.3 }
    );
  }

  const cardGrids = [
    '.edn-featured-grid',
    '.edn-top-categories-grid',
    '.edn-mentors-grid',
    '.edn-testimonials-grid',
    '.edn-journal-cards-grid',
    '.edn-workflow-steps',
    '.edn-classroom-preview-card'
  ];

  cardGrids.forEach((selector) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    const targets = selector === '.edn-classroom-preview-card' ? [grid] : Array.from(grid.children);
    targets.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
};

function render(keep){
  const path=location.hash.slice(1)||'/';
  hook=null;
  let html;
  try{
    for(const [pattern,handler] of R){
      const match=path.match(pattern);
      if(match){html=handler(...match.slice(1));break;}
    }
    app.innerHTML=html===undefined?nf():html;
    if(hook)hook();
  }catch(error){
    app.innerHTML='<div class="wrap page"><div class="empty" role="alert"><h2>Trang này chưa thể hiển thị</h2><p>Đã xảy ra lỗi khi tải nội dung. Hãy quay lại trang chủ hoặc thử lại.</p><a class="btn btn-g" href="#/">Về trang chủ</a></div></div>';
  }
  nav();
  initHeroThree();
  triggerGsapAnimations();
  if(!keep)window.scrollTo(0,0);
}

/* Clicking the brand while already on home should scroll to the page top. */
document.addEventListener('click',event=>{
  const brand=event.target.closest('.edunext-brand');
  if(!brand)return;
  const path=(window.location.hash.slice(1)||'/').replace(/\/$/,'')||'/';
  if(path==='/'){
    event.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  }
});

/* User-facing interactions only. */
const openCoursePlayer=(id,index=0)=>{
  const c=find(id);
  if(!c){toast('Không tìm thấy khóa học trong danh mục.');return;}
  const requested=Number(index);
  const activeIndex=Math.min(Math.max(Number.isInteger(requested)?requested:0,0),Math.max(c.lessons.length-1,0));
  const lesson=c.lessons[activeIndex];
  if(!lesson){toast('Khóa học chưa có bài học để phát.');return;}
  $('#edn-course-player-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='edn-course-player-modal';
  modal.className='edn-preview-modal edn-course-player-modal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Trình phát bài học');
  const playlist=c.lessons.map((item,k)=>{
    const isActive=k===activeIndex;
    const lessonVid=resolveLessonVideo(item,c,k);
    return '<button type="button" class="edn-course-player-item'+(isActive?' is-active':'')+'" data-a="course-player-select" data-v="'+esc(id)+','+k+'"'+(isActive?' aria-current="true"':'')+'><span class="edn-course-player-item-number">'+(isActive?'▶':String(k+1).padStart(2,'0'))+'</span><span class="edn-course-player-item-copy"><strong>'+esc(item.title)+'</strong><small>Video bài giảng chuẩn HD</small></span><span class="edn-course-player-item-arrow" aria-hidden="true">'+(isActive?'●':'›')+'</span></button>';
  }).join('');
  const currentVideoUrl = resolveLessonVideo(lesson, c, activeIndex);
  modal.innerHTML='<section class="edn-preview-dialog edn-course-player-dialog"><header class="edn-preview-dialog-head"><div><strong>Trình phát bài học</strong><span>'+esc(c.t)+'</span></div><button type="button" data-a="course-player-close" aria-label="Đóng trình phát">×</button></header><div class="edn-course-player-now"><span>BÀI '+String(activeIndex+1).padStart(2,'0')+' / '+c.lessons.length+'</span><h2>'+esc(lesson.title)+'</h2></div><div class="edn-preview-video">'+videoMarkup(currentVideoUrl,lesson.title)+'</div><section class="edn-course-player-playlist"><div class="edn-course-player-playlist-head"><strong>Danh sách bài học</strong><span>'+c.lessons.length+' bài</span></div><div class="edn-course-player-items">'+playlist+'</div></section></section>';
  modal.addEventListener('click',event=>{if(event.target===modal)modal.remove();});
  document.body.appendChild(modal);
  modal.querySelector('[data-a="course-player-close"]')?.focus();
};

const A={
  'retry-catalog':()=>initializeEduNext(),
  'home-filter':value=>{homeFilterTab=value;render(true);},
  menu:()=>{
    document.body.classList.toggle('lms-mobile-open');
    const button=$('.lms-mobile-menu');
    if(button)button.setAttribute('aria-expanded',String(document.body.classList.contains('lms-mobile-open')));
  },
  cat:value=>{f=F0();f.cat=value;to('/courses');},
  domain:value=>{
    const domain=DOMAINS.find(item=>item.id===value||item.slug===value||item.name===value);
    f=F0();
    if(domain){f.domainId=domain.id;f.cat=domain.name;}
    to('/courses');
  },
  topic:value=>{f=F0();f.topic=value;to('/courses');},
  'cart-add':id=>{
    const course=find(id);
    if(!course){toast('Không tìm thấy chương trình trong danh mục.');return;}
    if(EN()[id]){toast('Tài khoản đã có quyền truy cập chương trình này.');return;}
    if(cartIds.includes(id)){go('/cart');return;}
    cartIds=cartIds.concat(id);
    persistCart();
    render(true);
    toast(course.ready?'Đã thêm khóa học vào giỏ hàng.':'Đã thêm đề cương vào giỏ. Khóa học hiện chưa mở bán và chưa có giá xác minh.');
  },
  'cart-remove':id=>{
    cartIds=cartIds.filter(courseId=>courseId!==id);
    persistCart();
    render(true);
    toast('Đã xóa chương trình khỏi giỏ hàng.');
  },
  'cart-clear':()=>{
    cartIds=[];
    persistCart();
    render(true);
    toast('Đã xóa toàn bộ giỏ hàng.');
  },
  clear:()=>{f=F0();render(true);},
  'page-change':value=>{
    const parts=String(value||'').split(',');
    const area=parts[0],page=Math.max(1,Number(parts[1])||1);
    if(area==='home')homeCoursePage=page;
    else if(area==='domains')domainListPage=page;
    else if(area==='courses')f.page=page;
    render(true);
    const targetSelector=area==='home'
      ? '.edn-im-courses .edn-im-section-heading, .edn-popular-section .edn-editorial-heading'
      : area==='domains'
        ? '.edn-domain-page .edn-page-intro'
        : '.edn-course-catalog-page .cio-page-head';
    const target=document.querySelector(targetSelector);
    if(target){
      const header=document.querySelector('.edunext-site-header');
      const headerHeight=header?header.getBoundingClientRect().height:0;
      const top=window.scrollY+target.getBoundingClientRect().top-headerHeight-12;
      window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
    }
  },
  enroll:id=>{
    const c=find(id);
    if(!D.me){toast('Vui lòng đăng nhập để tiếp tục.');go('/login');return;}
    if(!c||!c.ready||CFG.paymentReady!==true){toast('Khóa học chưa mở bán hoặc chưa có cổng thanh toán được xác minh.');go('/course/'+id);return;}
    toast('Thanh toán chưa được cấu hình cho website này.');
  },
  done:async value=>{
    const parts=String(value||'').split(',');
    const id=parts[0],index=Number(parts[1]),entry=EN()[id];
    if(!entry||!Number.isInteger(index)){toast('Tài khoản chưa có quyền truy cập bài học này.');return;}
    const completed=!entry.done.includes(index);
    try{
      const data=await request('edunext_progress_save',{courseId:id,lessonIndex:index,completed:completed?'1':'0'});
      const done=data.progress&&Array.isArray(data.progress.done)?data.progress.done.map(Number):[];
      entry.done=done;
      if(CFG.progress){CFG.progress[id]=data.progress;}
      toast(completed?'Đã lưu tiến độ học tập.':'Đã cập nhật tiến độ.');
      render(true);
    }catch(error){toast(error.message);}
  },
  'issue-cert':async id=>{
    try{
      await request('edunext_certificate_issue',{courseId:id});
      toast('Chứng chỉ đã được hệ thống ghi nhận.');
      window.location.reload();
    }catch(error){toast(error.message);}
  },
  preview:id=>{
    const c=find(id);
    if(!c||!c.previewVideoUrl){toast('Chưa có video xem trước đã được xác minh.');return;}
    $('#edn-preview-modal')?.remove();
    const modal=document.createElement('div');
    modal.id='edn-preview-modal';modal.className='edn-preview-modal';
    modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Xem trước khóa học');
    modal.innerHTML='<div class="edn-preview-dialog"><div class="edn-preview-dialog-head"><div><strong>Xem trước khóa học</strong><span>'+esc(c.t)+'</span></div><button type="button" data-a="preview-close" aria-label="Đóng video">×</button></div><div class="edn-preview-video">'+videoMarkup(c.previewVideoUrl,c.t)+'</div></div>';
    document.body.appendChild(modal);
    modal.querySelector('[data-a="preview-close"]')?.focus();
  },
  'preview-close':()=>$('#edn-preview-modal')?.remove(),
  'toggle-curriculum':(_value,button)=>{
    const container=button.closest('.edn-course-curriculum');
    if(!container)return;
    const items=container.querySelectorAll('.edn-curriculum-accordion-item');
    const isExpanding=!button.classList.contains('is-expanded');
    button.classList.toggle('is-expanded',isExpanding);
    button.textContent=isExpanding?'Thu gọn tất cả các phần':'Mở rộng tất cả các phần';
    items.forEach(item=>{
      if(isExpanding)item.setAttribute('open','');
      else item.removeAttribute('open');
    });
  },
  'course-player':value=>{const parts=String(value||'').split(',');openCoursePlayer(parts[0],Number(parts[1])||0);},
  'course-player-select':value=>{const parts=String(value||'').split(',');openCoursePlayer(parts[0],Number(parts[1])||0);},
  'course-player-close':()=>$('#edn-course-player-modal')?.remove(),
  logout:async(_value,button)=>{
    if(button){
      button.disabled=true;
      button.setAttribute('aria-busy','true');
      button.textContent='Đang đăng xuất…';
    }
    try{
      const result=await request('edunext_logout',{});
      const target=result.redirect||'#/';
      window.location.hash=target.startsWith('#')?target:'#'+target;
      window.location.reload();
    }catch(error){
      if(button){
        button.disabled=false;
        button.removeAttribute('aria-busy');
        button.textContent='Đăng xuất';
      }
      toast(error.message||'Chưa thể đăng xuất. Vui lòng thử lại.');
    }
  },
  'profile-avatar-remove':async(_value,button)=>{
    const errorMessage=$('#edn-profile-error');
    if(button){button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Đang xóa…';}
    try{
      const result=await request('edunext_profile_avatar_remove',{});
      toast(result.message||'Đã xóa ảnh đại diện.');
      window.location.reload();
    }catch(error){
      if(button){button.disabled=false;button.removeAttribute('aria-busy');button.textContent='Xóa ảnh đại diện';}
      if(errorMessage)errorMessage.textContent=error.message||'Không thể xóa ảnh đại diện. Vui lòng thử lại.';
      else toast(error.message||'Không thể xóa ảnh đại diện. Vui lòng thử lại.');
    }
  },
  print:()=>window.print()
};

document.addEventListener('click',event=>{
  const target=event.target.closest('[data-a]');
  if(!target)return;
  const action=target.dataset.a;
  if(!A[action])return;
  if(target.tagName==='A')event.preventDefault();
  Promise.resolve(A[action](target.dataset.v,target)).catch(error=>toast(error.message||'Thao tác chưa thành công.'));
});

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-blog-topic]');
  if(!button)return;
  const topic=button.dataset.blogTopic||'Tất cả';
  const normalizedTopic=topic.toLocaleLowerCase('vi-VN');
  const matches=tag=>topic==='Tất cả'||String(tag||'').toLocaleLowerCase('vi-VN')===normalizedTopic;
  document.querySelectorAll('.blog-page-card[data-blog-tag], .edn-mag-card[data-blog-tag], .edn-mag-lead[data-blog-tag]').forEach(item=>{
    item.style.display=matches(item.dataset.blogTag||'')?'':'none';
  });
  document.querySelectorAll('[data-blog-topic]').forEach(item=>{
    const active=item.dataset.blogTopic===topic;
    item.classList.toggle('active',active);
    item.classList.toggle('is-active',active);
    item.setAttribute('aria-pressed',String(active));
  });
});

/* Classroom tab switching listener */
document.addEventListener('click',event=>{
  const tab=event.target.closest('[data-class-tab]');
  if(!tab)return;
  const targetId=tab.dataset.classTab;
  const container=tab.closest('.edn-classroom-panel-content');
  if(!container)return;
  container.querySelectorAll('[data-class-tab]').forEach(t=>{
    t.classList.toggle('is-active',t===tab);
  });
  container.querySelectorAll('.edn-tab-pane').forEach(p=>{
    const isTarget=p.id==='pane-'+targetId;
    p.hidden=!isTarget;
    p.classList.toggle('is-active',isTarget);
  });
});


/* Interactions for the learner's Udemy-inspired course library. */
const applyMyLearningFilters=()=>{
  const page=document.querySelector('.edn-my-learning-page');
  if(!page)return;
  const selected=page.querySelector('.edn-my-learning-tab.is-active')?.dataset.studyFilter||'all';
  const query=(page.querySelector('#edn-my-learning-search')?.value||'').trim().toLocaleLowerCase('vi-VN');
  const grid=page.querySelector('#edn-my-learning-grid');
  if(!grid)return;
  const cards=Array.from(grid.querySelectorAll('.edn-my-course-card'));
  const sort=page.querySelector('#edn-my-learning-sort')?.value||'recent';
  cards.forEach(card=>{
    const status=card.dataset.studyState||'learning';
    const content=(card.querySelector('.edn-my-course-copy')?.textContent||'').toLocaleLowerCase('vi-VN');
    card.hidden=!((selected==='all'||selected===status)&&(!query||content.includes(query)));
  });
  const visible=cards.filter(card=>!card.hidden);
  visible.sort((a,b)=>{
    if(sort==='title')return (a.querySelector('h2')?.textContent||'').localeCompare(b.querySelector('h2')?.textContent||'','vi');
    if(sort==='progress')return Number(b.dataset.studyProgress||0)-Number(a.dataset.studyProgress||0);
    return Number(b.dataset.studyUpdated||0)-Number(a.dataset.studyUpdated||0);
  }).forEach(card=>grid.appendChild(card));
  const count=page.querySelector('#edn-my-learning-result-count');
  if(count)count.textContent=visible.length+' khóa học';
  const noResults=page.querySelector('#edn-my-learning-no-results');
  if(noResults)noResults.hidden=visible.length>0;
};
document.addEventListener('click',event=>{
  const tab=event.target.closest('.edn-my-learning-tab[data-study-filter]');
  if(!tab)return;
  const page=tab.closest('.edn-my-learning-page');
  if(!page)return;
  page.querySelectorAll('.edn-my-learning-tab').forEach(item=>{
    const active=item===tab;
    item.classList.toggle('is-active',active);
    item.setAttribute('aria-pressed',String(active));
  });
  applyMyLearningFilters();
});
document.addEventListener('input',event=>{
  if(event.target.matches('#edn-my-learning-search'))applyMyLearningFilters();
});
document.addEventListener('change',event=>{
  if(event.target.matches('#edn-my-learning-sort'))applyMyLearningFilters();
});

const onf=event=>{
  const target=event.target;
  if(target.id==='edn-headline'){
    const count=$('#edn-headline-count');
    if(count)count.textContent=(target.value||'').length+'/60';
    return;
  }
  if(target.id==='edn-profile-avatar-file'&&event.type==='change'&&target.files&&target.files[0]){
    const file=target.files[0];
    const error=$('#edn-profile-error');
    if(error)error.textContent='';
    if(!/^image\/(png|jpeg|webp)$/.test(file.type)){if(error)error.textContent='Chỉ chấp nhận ảnh JPG, PNG hoặc WebP.';target.value='';return;}
    if(file.size>2*1024*1024){if(error)error.textContent='Ảnh cần có dung lượng không quá 2 MB.';target.value='';return;}
    const form=new FormData();form.append('avatar',file);
    target.disabled=true;
    request('edunext_profile_avatar',form).then(data=>{
      toast(data.message||'Đã cập nhật ảnh hồ sơ.');
      window.location.reload();
    }).catch(err=>{target.disabled=false;target.value='';const message=$('#edn-profile-error');if(message)message.textContent=err.message;});
    return;
  }
  if(target.dataset.f&&$('#list')){
    f[target.dataset.f]=target.value;
    f.page=1;
    list();
  }
};
document.addEventListener('input',onf);
document.addEventListener('change',onf);

document.addEventListener('submit',async event=>{
  const form=event.target.closest('[data-form]');
  if(!form)return;
  event.preventDefault();
  const kind=form.dataset.form;
  const values=Object.fromEntries(new FormData(form));
  const error=form.querySelector('[role="alert"]');

  if(kind==='search'){
    f=F0();f.q=String(values.q||'').trim();
    const headerSearch=form.querySelector('input[name="q"]');
    if(headerSearch)headerSearch.blur();
    to('/courses');
    return;
  }

  if(kind==='login'||kind==='register'){
    const email=String(values.email||'').trim().toLowerCase();
    const password=String(values.pw||'');
    const message=text=>{if(error)error.textContent=text;};
    if(!/^\S+@\S+\.\S+$/.test(email)){message('Email chưa đúng định dạng.');return;}
    if(password.length<8){message('Mật khẩu cần tối thiểu 8 ký tự.');return;}
    if(kind==='register'&&!String(values.name||'').trim()){message('Vui lòng nhập họ và tên.');return;}
    if(kind==='register'&&!values.ok){message('Bạn cần đồng ý với điều khoản sử dụng.');return;}
    const submit=form.querySelector('button[type="submit"]');
    if(submit)submit.disabled=true;
    try{
      const action=kind==='register'?'edunext_register':'edunext_login';
      const result=await request(action,{email,password,name:String(values.name||'').trim(),accepted:values.ok?'1':'0'});
      toast(result.message||'Thành công.');
      const target=next||(result.redirect||'#/dashboard');
      next='';
      window.location.hash=target.startsWith('#')?target:'#'+target;
      window.location.reload();
    }catch(err){
      message(err.message);
      if(submit)submit.disabled=false;
    }
    return;
  }

  if(kind==='profile-save'){
    if(!String(values.firstName||'').trim()||!String(values.lastName||'').trim()){
      if(error)error.textContent='Vui lòng nhập cả tên và họ.';
      return;
    }
    try{
      const result=await request('edunext_profile_save',values);
      toast(result.message||'Đã lưu hồ sơ.');
      window.location.reload();
    }catch(err){if(error)error.textContent=err.message;}
    return;
  }

  if(kind==='profile-password'){
    if(String(values.newPassword||'').length<8){if(error)error.textContent='Mật khẩu mới cần tối thiểu 8 ký tự.';return;}
    if(values.newPassword!==values.confirmPassword){if(error)error.textContent='Hai mật khẩu mới chưa trùng khớp.';return;}
    try{
      const result=await request('edunext_profile_password',values);
      form.reset();toast(result.message||'Đã cập nhật mật khẩu.');
    }catch(err){if(error)error.textContent=err.message;}
  }
});

document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){ $('#edn-preview-modal')?.remove(); $('#edn-course-player-modal')?.remove(); }
  if(event.key==='Escape'&&document.body.classList.contains('lms-mobile-open')){
    document.body.classList.remove('lms-mobile-open');
    const menu=$('.lms-mobile-menu');
    if(menu)menu.setAttribute('aria-expanded','false');
  }
});
let catalogLoaded=false;
const initLiveSearch=()=>{
  const headerSearchInput=document.querySelector('.edunext-header-search input[name="q"], #edn-header-search-input');
  const dropdown=document.getElementById('edn-live-search-dropdown');
  if(!headerSearchInput||!dropdown)return;

  const handleSearch=()=>{
    const q=headerSearchInput.value.trim().toLocaleLowerCase('vi-VN');
    if(q.length<2){
      dropdown.hidden=true;
      dropdown.innerHTML='';
      return;
    }
    const matchedCourses=C.filter(c=>{
      const text=(c.id+' '+c.t+' '+(c.cat||'')+' '+(c.shortDescription||'')).toLocaleLowerCase('vi-VN');
      return text.includes(q);
    }).slice(0,4);

    const matchedDomains=DOMAINS.filter(d=>{
      const text=(d.name+' '+(d.groupName||'')+' '+((d.topics||[]).join(' '))).toLocaleLowerCase('vi-VN');
      return text.includes(q);
    }).slice(0,2);

    if(!matchedCourses.length&&!matchedDomains.length){
      dropdown.innerHTML='<div class="edn-search-no-result">Không tìm thấy kết quả cho "<strong>'+esc(q)+'</strong>"</div>';
      dropdown.hidden=false;
      return;
    }

    let html='';
    if(matchedDomains.length){
      html+='<div class="edn-search-group-title">Lĩnh vực & Chuyên ngành</div>'+
        matchedDomains.map(d=>
          '<a class="edn-search-domain-item" href="#/domain/'+esc(d.slug)+'">'+
            '<span class="edn-search-icon">📁</span>'+
            '<div class="edn-search-info"><strong>'+esc(d.name)+'</strong><small>'+esc(d.groupName||'Chuyên ngành')+'</small></div>'+
          '</a>'
        ).join('');
    }

    if(matchedCourses.length){
      html+='<div class="edn-search-group-title">Khóa học trực tuyến</div>'+
        matchedCourses.map(c=>
          '<a class="edn-search-course-item" href="#/course/'+esc(c.id)+'">'+
            '<img class="edn-search-course-thumb" src="'+esc(getCourseImage(c))+'" alt="">'+
            '<div class="edn-search-info"><strong>'+esc(c.t)+'</strong><small>'+esc(c.cat)+' · '+esc(money(c.p))+'</small></div>'+
          '</a>'
        ).join('');
    }

    html+='<a class="edn-search-view-all" href="#/courses" data-a="search-all">Xem tất cả kết quả cho "'+esc(q)+'" →</a>';

    dropdown.innerHTML=html;
    dropdown.hidden=false;
  };

  headerSearchInput.addEventListener('input',handleSearch);
  headerSearchInput.addEventListener('focus',handleSearch);

  dropdown.addEventListener('click',e=>{
    const link=e.target.closest('a');
    if(link){
      dropdown.hidden=true;
      if(link.dataset.a==='search-all'){
        f=F0();f.q=headerSearchInput.value.trim();
        to('/courses');
      }
    }
  });

  document.addEventListener('click',e=>{
    if(!dropdown.contains(e.target)&&!headerSearchInput.contains(e.target)){
      dropdown.hidden=true;
    }
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){dropdown.hidden=true;}
  });
};

window.addEventListener('hashchange',()=>{if(catalogLoaded)render();});
const initializeEduNext=async()=>{
  const currentPath=location.hash.slice(1)||'/';
  const hasExistingHome=!!app.querySelector('.edn-home-page');
  if(hasExistingHome){
    initialServerHomeHtml=app.innerHTML;
  }
  if(!hasExistingHome && currentPath!=='/'){
    app.innerHTML='<div class="wrap page edn-app-loading" role="status"><span class="edn-loading-mark">E</span><h1>Đang tải EduNext</h1><p>Đang chuẩn bị danh mục lĩnh vực và chương trình học.</p></div>';
  }
  try{
    if(!CFG.catalogUrl)throw new Error('Chưa cấu hình địa chỉ danh mục chương trình.');
    const response=await fetch(CFG.catalogUrl,{credentials:'same-origin',cache:'no-cache'});
    if(!response.ok)throw new Error('Không tải được danh mục chương trình.');
    const catalog=await response.json();
    if(!catalog||!Array.isArray(catalog.domains)||!Array.isArray(catalog.courses))throw new Error('Cấu trúc danh mục chương trình không hợp lệ.');
    CATALOG=catalog;
    DOMAINS=CATALOG.domains;
    const videoCounts={};
    CATALOG.courses.forEach(course=>{
      (Array.isArray(course.lessons)?course.lessons:[]).forEach(lesson=>{
        const url=String(lesson.videoUrl||'').trim();
        if(url){
          const key=url.replace(/\/+$/,'').toLowerCase();
          videoCounts[key]=(videoCounts[key]||0)+1;
        }
      });
    });
    C=CATALOG.courses.map(course=>mapCourse(course,videoCounts));
    syncCartWithCatalog();
    catalogLoaded=true;
    initLiveSearch();
    if(currentPath==='/' && hasExistingHome){
      nav();
      initHeroThree();
      triggerGsapAnimations();
    }else{
      render();
    }
  }catch(error){
    console.error('initializeEduNext error:', error);
    app.innerHTML='<div class="wrap page"><div class="empty" role="alert"><h1>Chưa thể tải danh mục EduNext</h1><p>Hãy tải lại trang. Nếu lỗi tiếp tục xảy ra, quản trị viên cần kiểm tra tệp danh mục chương trình.</p><button class="btn btn-g" type="button" data-a="retry-catalog">Thử lại</button></div></div>';
    nav();
  }
};
initializeEduNext();
})();