(()=>{
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=n=>Number(n||0).toLocaleString('vi-VN')+'đ',ini=n=>String(n||'E').trim().split(/\s+/).slice(-2).map(x=>x[0]||'').join('').toUpperCase();
const CFG=window.EDUNEXT_CONFIG||{};
let CATALOG={domains:[],courses:[]};
let DOMAINS=[],C=[];
const COURSE_IMAGES={
csharp:'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
api:'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
data:'https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2',
english:'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
design:'https://miro.medium.com/v2/resize:fit:1400/1*ezbw1Z06SzRSOhShXfwOTg.png',
marketing:'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=82&w=1200'
};
const mapCourse=(raw,videoCounts={})=>{
  const lessons=Array.isArray(raw.lessons)?raw.lessons:[];
  const L=lessons.map(item=>item.title);
  const level=String(raw.level||'Chưa xác định');
  const duration=Number(raw.durationHours);
  const outcomes=Array.isArray(raw.outcomes)?raw.outcomes:[];
  const domain=DOMAINS.find(item=>item.id===raw.domainId);
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
    s:[],r:null,n:null,lvl:level,p:raw.price,o:raw.originalPrice,
    h:raw.durationHours,tag:ready?'Đã xuất bản':'Đang hoàn thiện nội dung',
    c:'',published:raw.published===true,contentStatus:raw.contentStatus||'outline',
    completionCount:Number(raw.completionRule&&raw.completionRule.requiredCount)||L.length,
    ready
  };
};
const BLOG_ARTICLES=[
{tag:'Lập trình',title:'Học C# mà cứ quên cú pháp? Thử cách học này trước',excerpt:'Không ít người mới học C# rơi vào cảnh xem xong một bài thì thấy hiểu, nhưng mở Visual Studio lên lại không biết bắt đầu từ đâu. Vấn đề thường không nằm ở trí nhớ mà ở cách mình luyện tập.',time:'6 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'ASP.NET Core',title:'REST API không khó, khó là học sai thứ tự',excerpt:'Routing, Controller, DI, EF Core, JWT… nhìn qua rất nhiều thứ. Nhưng khi xếp chúng theo đúng thứ tự, việc làm một API đầu tiên lại dễ hơn bạn nghĩ.',time:'8 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Kỹ năng học tập',title:'Một buổi tự học IT hiệu quả không cần kéo dài cả ngày',excerpt:'Thay vì ngồi trước máy tính từ sáng đến tối, hãy chia thời gian thành những phiên học ngắn và đặt một mục tiêu đủ nhỏ để chắc chắn hoàn thành.',time:'5 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'AI & Lập trình',title:'Dùng AI khi học code: lúc nào nên hỏi, lúc nào nên tự làm?',excerpt:'AI có thể giải thích lỗi rất nhanh, nhưng nếu câu trả lời lúc nào cũng đến trước lúc bạn suy nghĩ thì kỹ năng sẽ không theo kịp. Đây là cách dùng AI để học thay vì học hộ.',time:'9 phút đọc',course:'data',image:COURSE_IMAGES.data},
{tag:'Dự án',title:'Từ bài tập trên lớp đến project đầu tiên: bắt đầu thế nào?',excerpt:'Bạn không cần chờ đến khi biết hết công nghệ mới làm project. Một project nhỏ nhưng tự mình hoàn thành thường có giá trị hơn một danh sách dài những tutorial đã xem.',time:'7 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Cơ sở dữ liệu',title:'Biết C# rồi có nên học SQL ngay không?',excerpt:'Nếu bạn đang đi theo backend, câu trả lời gần như là có. SQL giúp bạn hiểu dữ liệu thật sự nằm ở đâu và vì sao code phía trên phải làm như vậy.',time:'6 phút đọc',course:'api',image:COURSE_IMAGES.data}
];
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
const F0=()=>({q:'',cat:'',domainId:'',topic:'',sort:'name',visible:12});
let f=F0(),next='',hook=null,currentCourseResults=[];
const go=p=>{location.hash=p},to=p=>location.hash==='#'+p?render():go(p);
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)}
const guard=(p)=>{next=p;toast('Vui lòng đăng nhập để tiếp tục');go('/login');return ''};

/* ---------- Views ---------- */
const courseImageMarkup=(c)=>COURSE_IMAGES[c.id]
  ? '<img src="'+esc(COURSE_IMAGES[c.id])+'" alt="'+esc(c.t)+'" loading="lazy">'
  : '<span class="edn-course-placeholder"><b>'+esc(c.cat||'EduNext')+'</b><small>Lộ trình học tập</small></span>';
const card=c=>{
  const own=!!EN()[c.id];
  const issued=Array.isArray(CFG.certificates)&&CFG.certificates.some(item=>item.courseId===c.id);
  const action=own
    ? (issued
      ? '<a class="btn btn-p btn-s" href="#/cert/'+esc(c.id)+'">Xem chứng chỉ</a>'
      : (passed(c)
        ? '<a class="btn btn-p btn-s" href="#/cert/'+esc(c.id)+'">Điều kiện chứng chỉ</a>'
        : '<a class="btn btn-p btn-s" href="#/learn/'+esc(c.id)+'/'+nextL(c)+'">Tiếp tục học</a>'))
    : '<a class="btn btn-g btn-s" href="#/course/'+esc(c.id)+'">Xem lộ trình</a>';
  const status=c.ready
    ? (typeof c.p==='number' ? money(c.p) : 'Đã xuất bản')
    : 'Đề cương · Chưa mở bán';
  return '<article class="lms-course-card edn-catalog-course">'+
    '<a href="#/course/'+esc(c.id)+'" class="lms-course-image">'+courseImageMarkup(c)+'<span class="lms-course-category">'+esc(c.cat)+'</span><span class="lms-course-badge">'+(c.ready?'Đã xuất bản':'Đang hoàn thiện nội dung')+'</span></a>'+
    '<div class="lms-course-body"><p class="lms-course-category-text">'+esc(c.cat)+'</p><h3><a href="#/course/'+esc(c.id)+'">'+esc(c.t)+'</a></h3>'+
    '<p class="edn-course-outline-meta">'+c.L.length+' bài trong đề cương</p><div class="edn-course-status-line">'+esc(status)+'</div>'+
    (own?'<div class="lms-course-progress"><div><span style="width:'+pct(c)+'%"></span></div><small>'+pct(c)+'% hoàn thành</small></div>':'')+
    '<div class="edn-course-card-action">'+action+'</div></div></article>';
};
const nf=()=>'<div class="wrap page"><div class="empty" role="status"><h2>Không tìm thấy nội dung này</h2><p>Liên kết có thể đã thay đổi hoặc nội dung chưa được xuất bản.</p><a href="#/">Về trang chủ</a></div></div>';
const slugify=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const home=()=>{
  const featured=[...C].sort((a,b)=>Number(b.ready)-Number(a.ready)).slice(0,6);
  const hero=C.find(c=>c.ready)||find('csharp')||C[0];
  const domainLinks=DOMAINS.slice(0,8).map((d,i)=>
    '<a class="edn-topic-link" href="#/domain/'+esc(d.slug)+'"><span class="edn-topic-title">'+esc(d.name)+'</span><span class="edn-topic-arrow" aria-hidden="true">↗</span></a>'
  ).join('');
  const marketCard=c=>'<article class="edn-market-course"><a class="edn-market-course-image" href="#/course/'+esc(c.id)+'">'+courseImageMarkup(c)+'<span class="edn-market-course-tag">'+(c.ready?'Đã mở bán':'Đề cương')+'</span><span class="edn-market-course-view">'+(c.ready?'Xem khóa học':'Xem lộ trình')+' ↗</span></a><div class="edn-market-course-copy"><p class="edn-market-course-category">'+esc(c.cat)+'</p><h3><a href="#/course/'+esc(c.id)+'">'+esc(c.t)+'</a></h3><p class="edn-course-outline-meta">'+(c.ready?money(c.p):c.L.length+' bài học dự kiến')+'</p><div class="edn-course-status-line">'+(c.ready?'Khóa học đã sẵn sàng để đăng ký.':'Đề cương đang được hoàn thiện; chưa mở bán.')+'</div><a class="edn-course-card-link" href="#/course/'+esc(c.id)+'">'+(c.ready?'Xem khóa học':'Xem chương trình')+' <b aria-hidden="true">↗</b></a></div></article>';
  const cards=featured.map(marketCard).join('');
  const articles=BLOG_ARTICLES.slice(0,3).map(a=>'<article class="edn-journal-item"><a class="edn-journal-image" href="#/blog/'+slugify(a.title)+'"><img src="'+esc(a.image||'')+'" alt="'+esc(a.title)+'" loading="lazy"></a><div class="edn-journal-copy"><span>'+esc(a.tag)+'</span><h3><a href="#/blog/'+slugify(a.title)+'">'+esc(a.title)+'</a></h3><p>'+esc(a.excerpt)+'</p><a class="edn-journal-link" href="#/blog/'+slugify(a.title)+'">Đọc bài viết <b aria-hidden="true">↗</b></a></div></article>').join('');
  const qa=[
    ['EduNext có những lĩnh vực nào?','Danh mục khởi đầu gồm 50 lĩnh vực và có thể mở rộng thêm. Bạn có thể chọn lĩnh vực hoặc chủ đề chuyên môn để xem các đề cương liên quan.'],
    ['Các khóa học đã mở bán chưa?','Danh mục hiện có đề cương chương trình học. Khóa học chỉ được mở bán khi nội dung giảng dạy, học liệu, giá và cơ chế thanh toán được xác minh và cấu hình.'],
    ['Tiến độ học tập có được lưu không?','Khi tài khoản có quyền truy cập một khóa học đã xuất bản, tiến độ được lưu vào tài khoản WordPress của bạn.'],
    ['Tôi có nhận chứng chỉ không?','Chứng chỉ chỉ được cấp sau khi hệ thống xác nhận bạn sở hữu khóa học và hoàn thành đầy đủ điều kiện học tập đã công bố.']
  ].map((item)=>'<details><summary>'+esc(item[0])+'</summary><p>'+esc(item[1])+'</p></details>').join('');
  return '<div class="edn-home-page">'+
    '<section class="edn-hero"><div class="edn-hero-inner">'+
      '<div class="edn-hero-copy"><span class="edn-overline"><i></i> KHÁM PHÁ · HỌC TẬP · PHÁT TRIỂN</span><h1>Tìm đúng lĩnh vực.<br><em>Đi theo lộ trình của bạn.</em></h1><p>Khám phá nhiều lĩnh vực chuyên môn, xem trước chương trình học và chọn hướng phát triển phù hợp với mục tiêu cá nhân.</p><div class="edn-hero-actions"><a class="edn-button-primary" href="#/courses">Khám phá khóa học <span aria-hidden="true">↗</span></a><a class="edn-button-text" href="#/categories">Xem 50 lĩnh vực</a></div><div class="edn-hero-note"><span class="edn-hero-note-mark">E.</span><p><strong>Biết rõ lộ trình trước khi bắt đầu.</strong><br><span>Xem các bài học dự kiến và chỉ đăng ký khi khóa học được mở bán đầy đủ.</span></p></div></div>'+
      '<div class="edn-hero-visual">'+(hero?'<a href="#/course/'+esc(hero.id)+'" class="edn-hero-image-link">'+courseImageMarkup(hero)+'<span class="edn-hero-image-shade"></span><span class="edn-hero-image-copy"><small>LỘ TRÌNH ĐỀ XUẤT</small><strong>'+esc(hero.t)+'</strong><span>Xem chương trình <b aria-hidden="true">↗</b></span></span></a>':'<div class="edn-hero-image-link edn-hero-empty"><strong>EduNext</strong><span>Danh mục đang được cập nhật</span></div>')+'<div class="edn-hero-side-note"><span>LỘ TRÌNH</span><div><strong>'+esc((find('api')||hero||{}).cat||'Khám phá lĩnh vực')+'</strong><p>'+esc((find('api')||hero||{}).t||'Tìm chương trình phù hợp')+'</p><a href="'+(hero?'#/course/'+esc(hero.id):'#/courses')+'">Xem chương trình ↗</a></div></div><span class="edn-hero-orbit edn-hero-orbit-one"></span><span class="edn-hero-orbit edn-hero-orbit-two"></span></div>'+
    '</div></section>'+
    '<section id="cats" class="edn-topic-strip"><div class="edn-public-container"><div class="edn-topic-intro"><span>BẮT ĐẦU TỪ MỘT LĨNH VỰC</span><strong>Bạn muốn học gì?</strong></div><nav class="edn-topic-links" aria-label="Khám phá lĩnh vực">'+domainLinks+'</nav><a class="edn-all-domains-link" href="#/categories">Xem tất cả '+DOMAINS.length+' lĩnh vực ↗</a></div></section>'+
    '<section class="edn-popular-section"><div class="edn-public-container"><div class="edn-editorial-heading"><div><span class="edn-overline">CHƯƠNG TRÌNH HỌC</span><h2>Các lộ trình đề xuất<span class="edn-heading-period">.</span></h2><p>Các thẻ dưới đây là đề cương chương trình, không phải cam kết rằng video hoặc khóa học đã mở bán.</p></div><a href="#/courses" class="edn-editorial-link">Xem toàn bộ danh mục <b aria-hidden="true">↗</b></a></div><div class="edn-market-course-grid">'+cards+'</div></div></section>'+
    '<section class="edn-purpose-section"><div class="edn-public-container edn-purpose-layout"><div class="edn-purpose-intro"><span class="edn-overline">KHÁM PHÁ THEO CHUYÊN MÔN</span><h2>Một lĩnh vực có nhiều <em>hướng đi.</em></h2><p>Mỗi lĩnh vực có các chủ đề chuyên môn liên quan. Bạn có thể mở chủ đề để xem những chương trình được gắn với chủ đề đó.</p><a href="#/categories">Duyệt tất cả lĩnh vực <b aria-hidden="true">↗</b></a></div><div class="edn-purpose-list">'+DOMAINS.slice(0,8).map((d,i)=>'<a href="#/domain/'+esc(d.slug)+'" class="edn-purpose-row"><span class="edn-purpose-index">'+String(i+1).padStart(2,'0')+'</span><span class="edn-purpose-name">'+esc(d.name)+'</span><span class="edn-purpose-count">'+C.filter(c=>c.domainId===d.id).length+' đề cương</span><b aria-hidden="true">↗</b></a>').join('')+'</div></div></section>'+
    '<section class="edn-method-section"><div class="edn-public-container"><div class="edn-method-heading"><span class="edn-overline">TRẢI NGHIỆM HỌC TẬP</span><h2>Lộ trình rõ ràng. Từng bước tiến bộ.</h2></div><div class="edn-method-columns"><article><span class="edn-method-number">01</span><h3>Khám phá</h3><p>Tìm theo lĩnh vực, chủ đề chuyên môn hoặc từ khóa.</p></article><article><span class="edn-method-number">02</span><h3>Xem trước</h3><p>Đọc mục tiêu và chương trình học trước khi chọn khóa học.</p></article><article><span class="edn-method-number">03</span><h3>Theo dõi tiến độ</h3><p>Khi khóa học đã được mở và bạn có quyền truy cập, tiếp tục học từ bài chưa hoàn thành.</p></article></div></div></section>'+
    '<section class="edn-journal-section"><div class="edn-public-container"><div class="edn-editorial-heading"><div><span class="edn-overline">GÓC KIẾN THỨC</span><h2>Ý tưởng cho bước tiếp theo<span class="edn-heading-period">.</span></h2><p>Bài viết hướng dẫn và chia sẻ kinh nghiệm học tập.</p></div><a href="#/blog" class="edn-editorial-link">Đến góc kiến thức <b aria-hidden="true">↗</b></a></div><div class="edn-journal-grid">'+articles+'</div></div></section>'+
    '<section class="edn-faq-section" id="faq"><div class="edn-public-container"><div class="edn-editorial-heading"><div><span class="edn-overline">HỎI ĐÁP</span><h2>Những điều cần biết</h2></div><a href="#/faq" class="edn-editorial-link">Xem tất cả câu hỏi ↗</a></div>'+qa+'</div></section>'+
    '<section class="edn-final-cta"><div class="edn-public-container"><div><span class="edn-overline">BƯỚC TIẾP THEO</span><h2>Bắt đầu bằng lĩnh vực bạn quan tâm.</h2><p>Khám phá đề cương và xem các bài học dự kiến.</p></div><a class="edn-button-primary" href="#/categories">Khám phá lĩnh vực ↗</a></div></section>'+
  '</div>';
};const list=()=>{
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
  const shown=currentCourseResults.slice(0,f.visible);
  root.innerHTML=shown.length?shown.map(card).join(''):'<div class="empty edn-course-empty"><h3>Chưa tìm thấy đề cương phù hợp</h3><p>Thử thay đổi từ khóa hoặc xóa bộ lọc để xem toàn bộ danh mục.</p><button class="btn btn-g" type="button" data-a="clear">Xóa bộ lọc</button></div>';
  const count=$('#cnt');
  if(count)count.textContent=shown.length+' / '+currentCourseResults.length;
  const more=$('#load-more-courses');
  if(more)more.hidden=shown.length>=currentCourseResults.length;
  const summary=$('#course-filter-summary');
  if(summary){
    const terms=[];
    if(f.cat)terms.push(f.cat);
    if(f.topic)terms.push(f.topic);
    if(q)terms.push('Từ khóa: '+q);
    summary.textContent=terms.length?'Đang lọc: '+terms.join(' · '):'Tất cả lĩnh vực và chủ đề';
  }
};
const courses=()=>{
  hook=list;
  const selectedTopics=[...new Set(DOMAINS.flatMap(d=>d.topics||[]))].sort((a,b)=>a.localeCompare(b,'vi'));
  return '<div class="wrap page cio-courses-page edn-course-catalog-page">'+
    '<div class="cio-page-head"><div><span class="cio-eyebrow">EDUNEXT · KHÁM PHÁ</span><h1>Khóa học và lộ trình</h1><p>Khám phá toàn bộ đề cương theo lĩnh vực và chủ đề chuyên môn. Chương trình đang được hoàn thiện sẽ được ghi rõ, không hiển thị giá hay số liệu chưa xác minh.</p></div><a class="btn btn-g" href="#/categories">Tất cả lĩnh vực</a></div>'+
    '<div class="cio-course-toolbar"><div class="cio-search-local"><span aria-hidden="true">⌕</span><input data-f="q" value="'+esc(f.q)+'" placeholder="Tìm tên khóa học, lĩnh vực hoặc kỹ năng" aria-label="Tìm trong danh mục"></div>'+
    '<div class="cio-toolbar-right"><select data-f="cat" aria-label="Lọc lĩnh vực"><option value="">Tất cả lĩnh vực</option>'+DOMAINS.map(d=>'<option value="'+esc(d.name)+'" '+(f.cat===d.name?'selected':'')+'>'+esc(d.name)+'</option>').join('')+'</select>'+
    '<select data-f="topic" aria-label="Lọc chủ đề"><option value="">Tất cả chủ đề</option>'+selectedTopics.map(t=>'<option value="'+esc(t)+'" '+(f.topic===t?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select>'+
    '<select data-f="sort" aria-label="Sắp xếp"><option value="name" '+(f.sort==='name'?'selected':'')+'>Tên A–Z</option><option value="name-desc" '+(f.sort==='name-desc'?'selected':'')+'>Tên Z–A</option><option value="domain" '+(f.sort==='domain'?'selected':'')+'>Theo lĩnh vực</option></select></div></div>'+
    '<div class="edn-course-filter-meta"><span id="course-filter-summary">Tất cả lĩnh vực và chủ đề</span><button type="button" class="edn-clear-filters" data-a="clear">Xóa bộ lọc</button></div>'+
    '<div class="cio-count-row"><span id="cnt"></span><span>đề cương trong danh mục</span></div>'+
    '<div class="grid cio-course-grid" id="list" aria-live="polite"></div>'+
    '<div class="edn-load-more-wrap"><button id="load-more-courses" class="btn btn-g" type="button" data-a="load-more">Xem thêm</button></div>'+
  '</div>';
};
const domainsPage=()=>{
  return '<div class="wrap page edn-domain-page"><div class="edn-page-intro"><span class="edn-overline">DANH MỤC</span><h1>Khám phá theo lĩnh vực</h1><p>Chọn một lĩnh vực để xem mô tả, các chủ đề chuyên môn liên quan và đề cương học tập được liên kết với lĩnh vực đó.</p><div class="edn-domain-count">'+DOMAINS.length+' lĩnh vực khởi đầu · Danh mục có thể mở rộng</div></div>'+
  '<div class="edn-domain-grid">'+DOMAINS.map(d=>'<a class="edn-domain-card" href="#/domain/'+esc(d.slug)+'"><span class="edn-domain-index">'+String(d.number).padStart(2,'0')+'</span><h2>'+esc(d.name)+'</h2><p>'+esc(d.description||'Khám phá các chủ đề chuyên môn trong lĩnh vực này.')+'</p><div class="edn-domain-card-foot"><span>'+C.filter(c=>c.domainId===d.id).length+' đề cương chương trình</span><b aria-hidden="true">↗</b></div></a>').join('')+'</div></div>';
};
const domainDetail=slug=>{
  const d=DOMAINS.find(item=>item.slug===slug);
  if(!d)return nf();
  const related=(d.topics||[]).map(topic=>'<button type="button" class="edn-topic-chip" data-a="topic" data-v="'+esc(topic)+'">'+esc(topic)+'</button>').join('');
  const coursesInDomain=C.filter(c=>c.domainId===d.id);
  return '<div class="wrap page edn-domain-detail"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Lĩnh vực</a><span>›</span><span>'+esc(d.name)+'</span></nav>'+
    '<header class="edn-domain-hero"><span class="edn-overline">LĨNH VỰC '+String(d.number).padStart(2,'0')+'</span><h1>'+esc(d.name)+'</h1><p>'+esc(d.description||'Khám phá các chủ đề chuyên môn trong lĩnh vực này.')+'</p><div class="edn-domain-hero-meta">'+coursesInDomain.length+' đề cương chương trình đang được phát triển</div></header>'+
    '<section class="edn-related-topics"><div class="edn-section-heading"><div><span class="edn-overline">CHỦ ĐỀ CHUYÊN MÔN</span><h2>Các hướng học liên quan</h2></div><p>Bấm vào một chủ đề để xem những chương trình được liên kết với chủ đề đó.</p></div><div class="edn-topic-chip-row">'+related+'</div></section>'+
    '<section class="edn-domain-programs"><div class="edn-section-heading"><div><span class="edn-overline">CHƯƠNG TRÌNH HỌC</span><h2>Đề cương trong lĩnh vực</h2></div><a href="#/courses" data-a="domain" data-v="'+esc(d.id)+'">Xem trong danh mục ↗</a></div><div class="grid cio-course-grid">'+coursesInDomain.map(card).join('')+'</div></section></div>';
};
const videoMarkup=(url,title)=>{
  if(!url)return '<div class="edn-media-unavailable" role="status"><strong>Học liệu video chưa được cung cấp</strong><p>Bài này chưa thể mở học cho đến khi có video hoặc nội dung giảng dạy đã xác minh.</p></div>';
  const yt=String(url).match(/(?:youtube-nocookie\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if(yt)return '<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(yt[1])+'?rel=0&playsinline=1" title="'+esc(title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  if(/^https:\/\/.+\.mp4(?:\?.*)?$/i.test(url))return '<video controls preload="metadata" src="'+esc(url)+'" aria-label="'+esc(title)+'"></video>';
  return '<div class="edn-media-unavailable" role="status"><strong>Định dạng học liệu chưa hỗ trợ</strong><p>Học liệu cần được kiểm tra trước khi xuất bản.</p></div>';
};
const detail=id=>{
  const c=find(id);
  if(!c)return nf();
  const owned=!!EN()[id];
  const domain=DOMAINS.find(d=>d.id===c.domainId);
  const topics=(c.topics||[]).map(topic=>'<button type="button" class="edn-topic-chip" data-a="topic" data-v="'+esc(topic)+'">'+esc(topic)+'</button>').join('');
  const lessonRows=c.lessons.map((lesson,i)=>{
    const lessonLabel=owned?'<a href="#/learn/'+esc(id)+'/'+i+'">Mở bài học →</a>':'<span>Chỉ xem đề cương</span>';
    const mediaLabel=lesson.videoUrl?'Có học liệu':'Đang bổ sung học liệu';
    return '<div class="edn-curriculum-row"><span class="edn-curriculum-number">'+String(i+1).padStart(2,'0')+'</span><span class="edn-curriculum-play" aria-hidden="true">'+(lesson.videoUrl?'▶':'○')+'</span><div class="edn-curriculum-copy"><b>'+esc(lesson.title)+'</b><small>'+mediaLabel+'</small></div><div class="edn-curriculum-duration">'+lessonLabel+'</div></div>';
  }).join('');
  const visual=COURSE_IMAGES[c.id]
    ? '<img src="'+esc(COURSE_IMAGES[c.id])+'" alt="'+esc(c.t)+'" loading="lazy">'
    : '<div class="edn-course-placeholder edn-course-placeholder-large"><b>'+esc(c.cat)+'</b><small>Chương trình học</small></div>';
  const buyContent=owned
    ? '<div class="cio-owned">✓ Tài khoản đã có quyền truy cập khóa học này.</div><a class="btn btn-p w edn-course-buy-button" href="#/learn/'+esc(id)+'/'+nextL(c)+'">Tiếp tục học</a>'
    : '<div class="edn-course-not-for-sale"><strong>Chưa mở bán</strong><p>Đề cương đang được xây dựng. Khóa học chỉ mở đăng ký khi nội dung giảng dạy, học liệu, giá và thanh toán được cấu hình và kiểm tra.</p></div>';
  const outcomes=Array.isArray(c.outcomes)?c.outcomes:[];
  return '<div class="edn-course-detail-page"><section class="edn-course-hero"><div class="wrap edn-course-hero-inner">'+
    '<div class="edn-course-intro"><nav class="edn-course-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Lĩnh vực</a><span>›</span><a href="#/domain/'+esc(domain?domain.slug:'')+'">'+esc(c.cat)+'</a></nav>'+
    '<div class="edn-course-eyebrow">'+esc(c.cat)+' <span>·</span> Đề cương chương trình</div><h1>'+esc(c.t)+'</h1><p class="edn-course-subtitle">'+esc(c.shortDescription||c.description||'Đề cương chương trình đang được hoàn thiện.')+'</p>'+
    '<div class="edn-course-tag-row"><span class="edn-course-tag">'+(c.ready?'Đã xuất bản':'Đang hoàn thiện nội dung')+'</span><span class="edn-course-language">Ngôn ngữ: chưa cấu hình</span></div>'+
    '<div class="edn-course-date-row"><span>'+c.L.length+' bài học dự kiến</span><span>'+(c.h?esc(c.h)+' giờ':'Thời lượng đang cập nhật')+'</span></div>'+
    '<div class="edn-course-status-line">Đây là khung chương trình; chỉ các bài có học liệu đã xác minh mới được mở học.</div></div>'+
    '<aside class="edn-course-buy-card" aria-label="Trạng thái khóa học"><div class="edn-course-preview edn-course-preview-static">'+visual+'<span class="edn-preview-shade"></span><strong>'+esc(c.cat)+'</strong></div>'+
    (c.previewVideoUrl?'<button class="btn btn-g w edn-preview-course-button" type="button" data-a="preview" data-v="'+esc(id)+'">Xem trước khóa học</button>':'')+
    '<div class="edn-course-buy-content">'+
    '<div class="edn-course-price-line"><strong>'+(typeof c.p==='number'?money(c.p):'Chưa có giá')+'</strong></div><p class="edn-course-purchase-note">'+(owned?'Bạn đã có quyền truy cập khóa học này.':'Khóa học chưa được mở bán.')+'</p>'+buyContent+
    '<div class="edn-course-includes"><strong>Thông tin chương trình</strong><span>✓ '+c.L.length+' bài học trong đề cương</span><span>✓ Có thứ tự bài học rõ ràng</span><span>✓ Lĩnh vực và chủ đề liên quan</span></div></div></aside></div></section>'+
    '<div class="wrap edn-course-content-grid"><main class="edn-course-main">'+
    '<section class="edn-course-outcomes" aria-labelledby="edn-outcomes-title"><h2>Mục tiêu dự kiến</h2><p class="edn-course-meta-note">Các mục tiêu dưới đây được phác thảo từ đề cương bài học và cần được xác nhận khi nội dung giảng dạy hoàn chỉnh.</p><div class="edn-course-outcomes-grid">'+outcomes.map(item=>'<div class="edn-course-outcome"><span>✓</span><p>'+esc(item)+'</p></div>').join('')+'</div></section>'+
    '<section class="edn-course-curriculum" id="course-curriculum"><div class="edn-course-section-heading"><div><h2>Toàn bộ bài học</h2><p>'+c.L.length+' bài trong khung chương trình hiện tại</p></div><span class="edn-curriculum-total">'+c.L.length+' bài</span></div><div class="edn-curriculum-list">'+lessonRows+'</div><p class="edn-curriculum-footnote">Tên bài học là đề cương. Video, tài liệu, bài tập và hướng dẫn cần được bổ sung, kiểm tra trước khi khóa học mở bán.</p></section>'+
    '<section class="edn-course-about"><h2>Đối tượng và kiến thức đầu vào</h2><div class="edn-course-requirements-grid"><div><small>Đối tượng dự kiến</small><p>'+esc(c.audience||'Đang được xác định.')+'</p></div><div><small>Kiến thức đầu vào</small><p>'+esc(c.prerequisites||'Sẽ được công bố khi khóa học hoàn thiện.')+'</p></div></div><div class="edn-course-facts"><div><small>Lĩnh vực</small><strong>'+esc(c.cat)+'</strong></div><div><small>Số bài dự kiến</small><strong>'+c.L.length+'</strong></div><div><small>Cấp độ</small><strong>'+esc(c.lvl||'Chưa xác định')+'</strong></div></div><p class="edn-course-meta-note">Thông tin đối tượng và đầu vào ở trên là bản dự kiến, chưa phải yêu cầu đã xác nhận.</p></section>'+
    '<section class="edn-related-topics"><div class="edn-section-heading"><div><span class="edn-overline">KHÁM PHÁ THÊM</span><h2>Lĩnh vực và chủ đề liên quan</h2></div><a href="#/domain/'+esc(domain?domain.slug:'')+'">Xem lĩnh vực ↗</a></div><div class="edn-topic-chip-row">'+topics+'</div></section>'+
    '</main><div class="edn-course-right-space" aria-hidden="true"></div></div></div>';
};
const checkout=id=>{
  const c=find(id);
  if(!c)return nf();
  if(!D.me)return guard('/checkout/'+id);
  if(EN()[id]){go('/learn/'+id+'/'+nextL(c));return '';}
  return '<div class="wrap page narrow edn-checkout-unavailable"><nav class="edn-breadcrumb"><a href="#/courses">Khóa học</a><span>›</span><span>Đăng ký</span></nav><div class="cio-empty"><span class="edn-overline">CHƯA MỞ BÁN</span><h1>'+esc(c.t)+'</h1><p>Khóa học này vẫn đang ở giai đoạn đề cương. EduNext chưa ghi nhận thanh toán hoặc cấp quyền học cho khóa học này. Khi nội dung, giá và cổng thanh toán thực tế được cấu hình, trạng thái sẽ được cập nhật.</p><a class="btn btn-g" href="#/course/'+esc(c.id)+'">Quay lại chi tiết khóa học</a><a class="btn btn-p" href="#/courses">Khám phá chương trình khác</a></div></div>';
};
const learn=(id,index)=>{
  const c=find(id);
  if(!c)return nf();
  if(!D.me)return guard('/learn/'+id+'/'+index);
  const e=EN()[id];
  if(!e){toast('Tài khoản chưa có quyền truy cập khóa học này.');go('/course/'+id);return '';}
  const i=Math.min(Math.max(Number(index)||0,0),Math.max(c.lessons.length-1,0));
  const lesson=c.lessons[i];
  if(!lesson)return nf();
  const done=e.done.includes(i),all=e.done.length>=c.completionCount;
  const prev=i>0?'<a class="btn btn-g" href="#/learn/'+esc(id)+'/'+(i-1)+'">← Bài trước</a>':'';
  const mark='<button class="btn '+(done?'btn-g':'btn-p')+'" type="button" data-a="done" data-v="'+esc(id)+','+i+'">'+(done?'Bỏ đánh dấu hoàn thành':'Đánh dấu đã học')+'</button>';
  const after=i<c.lessons.length-1?'<a class="btn btn-g" href="#/learn/'+esc(id)+'/'+(i+1)+'">Bài tiếp →</a>':'';
  const final=all?'<a class="btn btn-p" href="#/cert/'+esc(id)+'">Kiểm tra điều kiện chứng chỉ</a>':'';
  return '<div class="cio-learn-shell"><div class="cio-learn-top"><a href="#/dashboard">← Trang học tập</a><strong>'+esc(c.t)+'</strong><span>'+pct(c)+'% hoàn thành</span></div>'+
    '<div class="cio-learn-layout"><aside class="cio-lesson-sidebar"><div class="cio-lesson-head"><span>'+esc(c.cat)+'</span><h2>'+esc(c.t)+'</h2><div class="cio-progress-line"><span style="width:'+pct(c)+'%"></span></div></div><div class="cio-lesson-list">'+c.lessons.map((item,k)=>'<a class="'+(k===i?'active ':'')+(e.done.includes(k)?'done':'')+'" href="#/learn/'+esc(id)+'/'+k+'"><span>'+String(k+1).padStart(2,'0')+'</span><b>'+esc(item.title)+'</b><small>'+(e.done.includes(k)?'Đã học':'Bài học')+'</small></a>').join('')+'</div></aside>'+
    '<main class="cio-learn-content"><div class="cio-video-wrap">'+videoMarkup(lesson.videoUrl,lesson.title)+'</div><div class="cio-lesson-content"><div class="cio-lesson-heading"><div><span class="cio-eyebrow">BÀI '+(i+1)+'/'+c.lessons.length+'</span><h1>'+esc(lesson.title)+'</h1></div><span class="cio-lesson-badge">'+(done?'Đã hoàn thành':'Đang học')+'</span></div>'+
    (lesson.content?'<div class="edn-lesson-material">'+esc(lesson.content).replace(/\n/g,'<br>')+'</div>':'<p class="edn-material-pending">Nội dung hướng dẫn chi tiết chưa được bổ sung cho bài này.</p>')+
    (lesson.resourceUrl?'<p class="edn-lesson-resource"><a class="btn btn-g" href="'+esc(lesson.resourceUrl)+'" target="_blank" rel="noopener noreferrer">Mở học liệu của bài học ↗</a></p>':'')+
    (lesson.exercise?'<section class="edn-lesson-exercise"><h2>Thực hành</h2><p>'+esc(lesson.exercise)+'</p></section>':'')+
    '<div class="cio-lesson-actions">'+prev+mark+after+final+'</div></div></main></div></div>';
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
const dash=()=>{if(!D.me)return guard('/dashboard');const u=me(),mine=C.filter(c=>EN()[c.id]),completed=mine.filter(c=>pct(c)===100),active=mine.filter(c=>pct(c)<100);
return `<div class="wrap page cio-student-page">
<div class="cio-page-head"><div><span class="cio-eyebrow">TRANG HỌC TẬP</span><h1>Xin chào, ${esc(u.name)}</h1><p>Theo dõi các khóa học bạn đã mua và tiếp tục bài học đang dang dở.</p></div><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>
<div class="cio-stat-grid"><div><span>Đang học</span><b>${active.length}</b></div><div><span>Hoàn thành</span><b>${completed.length}</b></div><div><span>Bài đã học</span><b>${mine.reduce((s,c)=>s+EN()[c.id].done.length,0)}</b></div><div><span>Đơn hàng</span><b>${(D.orders||[]).length}</b></div></div>
<div class="edn-dashboard-section-heading"><h2>Khóa học của bạn</h2><span>${active.length} đang học · ${completed.length} hoàn thành</span></div>
${active.length?'<section class="cio-dashboard-grid">'+active.map(c=>'<article class="cio-learning-card"><a href="#/learn/'+c.id+'/'+nextL(c)+'" class="cio-learning-image">'+courseImageMarkup(c)+'</a><div class="cio-learning-body"><div class="cio-card-status">ĐANG HỌC</div><h3><a href="#/learn/'+c.id+'/'+nextL(c)+'">'+c.t+'</a></h3><p>'+c.cat+' · '+c.L.length+' bài · '+c.h+' giờ</p><div class="cio-progress-line"><span style="width:'+pct(c)+'%"></span></div><div class="cio-learning-foot"><span>'+pct(c)+'% hoàn thành</span><a href="#/learn/'+c.id+'/'+nextL(c)+'">Tiếp tục →</a></div></div></article>').join('')+'</section>':'<div class="cio-empty"><h3>Chưa có khóa học đang học</h3><p>Khi tài khoản có quyền truy cập một khóa học đã xuất bản, khóa học đó sẽ xuất hiện tại đây.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>'}
${completed.length?'<section class="cio-completed-section"><div class="cio-section-title"><h2>Đã hoàn thành</h2><a href="#/courses">Khám phá thêm →</a></div><div class="grid cio-course-grid">'+completed.map(card).join('')+'</div></section>':''}
</div>`};const BLOG_ARTICLE_BODY=[
[
'Bắt đầu bằng một chương trình nhỏ thay vì cố ghi nhớ mọi cú pháp. Sau khi học một khái niệm, hãy đóng tài liệu lại và tự viết lại ví dụ bằng cách hiểu của mình.',
'Chia bài học thành ba bước: đọc khái niệm, tự viết ví dụ, rồi thay đổi yêu cầu để xem mình đã hiểu thật chưa. Khi gặp lỗi, đọc thông báo và kiểm tra giả định thay vì chạy lại một cách ngẫu nhiên.',
'Giữ một danh sách ngắn những điều thường quên và quay lại giải quyết chúng bằng bài tập mới. Mục tiêu không phải nhớ từng dòng code mà là biết cách tìm ra lời giải.'
],
[
'Một REST API sẽ dễ học hơn nếu xếp kiến thức theo thứ tự. Bắt đầu từ HTTP, route và controller; sau đó tách logic, cấu hình dependency injection rồi mới truy cập dữ liệu.',
'Khi thêm Entity Framework Core, hãy thử từng thao tác CRUD qua công cụ kiểm thử API. Khi luồng cơ bản đã rõ, hãy thêm xác thực và phân quyền, đồng thời kiểm tra cả trường hợp thiếu token hoặc dữ liệu không hợp lệ.',
'Đừng nhảy thẳng vào nhiều kiến trúc cùng lúc. Một API nhỏ hoạt động đúng, có kiểm tra dữ liệu và xử lý lỗi rõ ràng là nền tảng tốt để mở rộng.'
],
[
'Một buổi tự học nên bắt đầu bằng kết quả có thể kiểm tra được: giải một bài, hoàn thiện một màn hình, hoặc hiểu và ghi lại một khái niệm.',
'Thử chia thời gian thành phiên tập trung ngắn. Trong mỗi phiên chỉ chọn một mục tiêu, tắt những thông báo không cần thiết và dành vài phút cuối để ghi lại việc đã làm cùng bước tiếp theo.',
'Điều quan trọng là tính đều đặn và phản hồi. Nếu mục tiêu quá lớn khiến bạn liên tục bỏ dở, hãy thu nhỏ việc cần làm thay vì kéo dài thời gian ngồi trước máy.'
],
[
'AI có thể giúp diễn giải thông báo lỗi, gợi ý trường hợp biên và so sánh các cách giải quyết. Hãy đặt câu hỏi về lý do và trade-off, không chỉ yêu cầu đưa ra đoạn code hoàn chỉnh.',
'Sau khi nhận câu trả lời, hãy kiểm tra tài liệu chính thức, chạy thử trong môi trường của mình và viết lại giải pháp bằng cách hiểu của bạn. Mã do AI đề xuất cũng có thể sai hoặc không an toàn.',
'Một quy tắc hữu ích là tự thử trước, nhờ AI giải thích sau, rồi tự kiểm chứng. Cách làm này biến AI thành công cụ học tập thay vì làm thay quá trình suy nghĩ.'
],
[
'Một dự án đầu tiên không cần thật lớn. Hãy chọn bài toán quen thuộc như quản lý công việc, danh sách chi tiêu hoặc ghi chú, rồi xác định một nhóm chức năng nhỏ nhất có thể hoàn thành.',
'Viết yêu cầu bằng ngôn ngữ dễ hiểu trước khi chọn framework. Sau đó phác thảo dữ liệu, chia công việc thành từng bước, làm phiên bản đơn giản và kiểm tra bằng các trường hợp sử dụng thực tế.',
'Khi dự án chạy ổn định, hãy cải thiện cấu trúc, xử lý lỗi và viết README hướng dẫn chạy. Một sản phẩm nhỏ do bạn hiểu rõ thường thể hiện năng lực tốt hơn một project lớn chỉ sao chép theo hướng dẫn.'
],
[
'SQL giúp bạn hiểu dữ liệu được lưu ra sao và ứng dụng lấy dữ liệu như thế nào. Bắt đầu từ SELECT, điều kiện lọc, sắp xếp và phân nhóm trước khi chuyển sang các truy vấn kết hợp bảng.',
'Tiếp theo hãy học khóa chính, khóa ngoại, quan hệ dữ liệu và cách tránh lưu lặp thông tin. Viết nhiều truy vấn nhỏ trên một bộ dữ liệu thử nghiệm sẽ giúp bạn nhận ra lỗi nhanh hơn.',
'Với người phát triển backend, SQL không chỉ là cú pháp. Đó là cách hiểu tính nhất quán, hiệu suất và mối quan hệ giữa các phần của ứng dụng.'
]
];
const blogPage=()=>{
  const cards=BLOG_ARTICLES.map((a,i)=>'<article class="blog-page-card" data-blog-tag="'+esc(a.tag)+'"><a class="blog-page-card-image" href="#/blog/'+slugify(a.title)+'"><img src="'+esc(a.image||'')+'" alt="'+esc(a.title)+'" loading="lazy"><span>'+esc(a.tag)+'</span></a><div class="blog-page-card-body"><div class="blog-home-meta"><span>'+esc(a.time)+'</span><span>EduNext</span></div><h2><a href="#/blog/'+slugify(a.title)+'">'+esc(a.title)+'</a></h2><p>'+esc(a.excerpt)+'</p><a class="blog-read-link" href="#/blog/'+slugify(a.title)+'">Đọc bài viết →</a></div></article>').join('');
  const topics=['Tất cả','Lập trình','ASP.NET Core','AI','Kỹ năng học tập','Dự án','Cơ sở dữ liệu'];
  return '<div class="wrap page blog-page"><div class="blog-page-head"><div><span class="content-kicker">EduNext Blog</span><h1>Góc kiến thức</h1><p>Bài viết hướng dẫn, kinh nghiệm tự học và gợi ý thực hành. Mỗi bài có trang đọc riêng để bạn quay lại đúng nội dung cần tham khảo.</p></div><a class="btn btn-p" href="#/courses">Xem chương trình học</a></div>'+
    '<div class="blog-topic-row">'+topics.map((t,i)=>'<button type="button" class="topic '+(i===0?'active':'')+'" data-blog-topic="'+esc(t)+'" aria-pressed="'+(i===0?'true':'false')+'">'+esc(t)+'</button>').join('')+'</div>'+
    '<div class="blog-page-grid">'+cards+'</div><div class="blog-page-footer"><div><span class="eyebrow">GỢI Ý ĐỂ BẮT ĐẦU</span><h2>Đọc một bài, rồi tự làm thử.</h2><p>Chọn một ý tưởng từ bài viết và biến nó thành một bài tập nhỏ để củng cố kiến thức.</p></div><a class="btn btn-p" href="#/courses">Khám phá lĩnh vực</a></div></div>';
};
const blogDetail=slug=>{
  const index=BLOG_ARTICLES.findIndex(a=>slugify(a.title)===slug);
  if(index<0)return nf();
  const article=BLOG_ARTICLES[index];
  const paragraphs=BLOG_ARTICLE_BODY[index]||[article.excerpt];
  return '<article class="wrap page edn-blog-article"><nav class="edn-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/blog">Góc kiến thức</a><span>›</span><span>'+esc(article.tag)+'</span></nav>'+
    '<header class="edn-blog-article-head"><span class="content-kicker">'+esc(article.tag)+'</span><h1>'+esc(article.title)+'</h1><p>'+esc(article.excerpt)+'</p><span class="edn-blog-meta">'+esc(article.time)+' · EduNext</span></header>'+
    (article.image?'<figure class="edn-blog-article-image"><img src="'+esc(article.image)+'" alt="'+esc(article.title)+'"></figure>':'')+
    '<div class="edn-blog-article-body">'+paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>'+
    '<div class="edn-blog-article-related"><h2>Muốn tìm hiểu sâu hơn?</h2><p>Khám phá lĩnh vực và đề cương học tập phù hợp với chủ đề này.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a><a class="btn btn-g" href="#/blog">Quay lại Góc kiến thức</a></div></article>';
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
const aboutPage=()=>'<div class="wrap page content-page edn-about-page"><div class="content-hero"><span class="content-kicker">Về EduNext</span><h1>Khám phá kiến thức theo lộ trình của riêng bạn</h1><p class="muted">EduNext tập trung giúp người học khám phá lĩnh vực, xem chương trình học rõ ràng và theo dõi tiến độ trên tài khoản cá nhân.</p></div><section class="about-grid"><div class="box about-main"><h2>Mục tiêu của EduNext</h2><p>Danh mục được tổ chức theo lĩnh vực chính và các chủ đề chuyên môn liên quan. Mỗi chương trình có thứ tự bài học để người học hiểu phạm vi trước khi bắt đầu.</p><p>Khóa học chỉ được mở khi nội dung giảng dạy và học liệu được chuẩn bị, giá được cấu hình và thanh toán có cơ chế xác nhận thực tế. EduNext không giả lập giao dịch hoặc chứng chỉ.</p></div><div class="box about-values"><h2>Nguyên tắc học tập</h2><div><b>Rõ ràng</b><span>Biết lĩnh vực, chủ đề và các bài học dự kiến.</span></div><div><b>Thực hành</b><span>Ưu tiên học liệu và bài tập phù hợp với khóa học.</span></div><div><b>Theo dõi</b><span>Tiến độ gắn với tài khoản người học.</span></div><div><b>Trung thực</b><span>Không hiển thị nội dung, giá hoặc trạng thái chưa được xác minh như dữ liệu thật.</span></div></div></section><section class="box about-mission"><span class="content-kicker">Khám phá</span><h2>Bắt đầu từ lĩnh vực bạn quan tâm.</h2><p class="muted">Xem danh mục và mở các lĩnh vực hoặc chủ đề liên quan để tìm chương trình phù hợp.</p><a class="btn btn-p" href="#/categories">Xem lĩnh vực</a></section></div>';

const profilePage=section=>{
  if(!D.me)return guard('/profile');
  const u=me(),meta=u.profile||{};
  const parts=String(u.name||'').trim().split(/\s+/);
  const defaultFirst=parts.length>1?parts[parts.length-1]:(parts[0]||'');
  const defaultLast=parts.length>1?parts.slice(0,-1).join(' '):'';
  const first=meta.firstName!==undefined?meta.firstName:defaultFirst;
  const last=meta.lastName!==undefined?meta.lastName:defaultLast;
  const full=[first,last].filter(Boolean).join(' ')||u.name||'Học viên EduNext';
  const avatar=meta.avatar?'<img src="'+esc(meta.avatar)+'" alt="Ảnh hồ sơ">':'<span>'+esc(ini(full))+'</span>';
  const navItems=[['profile','Thông tin cá nhân'],['photo','Ảnh đại diện'],['security','Mật khẩu']];
  const nav=navItems.map(([id,label])=>'<a class="edn-profile-menu-item '+(section===id?'is-active':'')+'" '+(section===id?'aria-current="page"':'')+' href="#/profile/'+id+'">'+label+'</a>').join('');
  let title='Thông tin cá nhân',subtitle='Cập nhật thông tin cơ bản cho tài khoản EduNext.',content='';
  if(section==='photo'){
    title='Ảnh đại diện';subtitle='Tải ảnh lên để cập nhật ảnh hồ sơ tài khoản.';
    content='<div class="edn-setting-card"><div class="edn-avatar-editor"><div class="edn-profile-avatar-large">'+avatar+'</div><div><h3>Ảnh đại diện</h3><p>Hỗ trợ JPG, PNG hoặc WebP, tối đa 2 MB. Ảnh sẽ được tải lên máy chủ WordPress.</p><label class="btn btn-g" for="edn-profile-avatar-file">Chọn ảnh</label><input id="edn-profile-avatar-file" type="file" accept="image/jpeg,image/png,image/webp" class="edn-visually-hidden"><p class="edn-profile-error" id="edn-profile-error" role="alert"></p></div></div></div>';
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
  [/^\/best-sellers$/,courses],
  [/^\/categories$/,domainsPage],
  [/^\/domain\/([a-z0-9-]+)$/i,domainDetail],
  [/^\/course\/([a-z0-9-]+)$/i,detail],
  [/^\/checkout\/([a-z0-9-]+)$/i,checkout],
  [/^\/learn\/([a-z0-9-]+)\/([0-9]+)$/i,learn],
  [/^\/certificates$/,certificates],
  [/^\/cert\/([a-z0-9-]+)$/i,cert],
  [/^\/orders$/,ordersPage],
  [/^\/profile(?:\/(profile|public|photo|security))?$/i,section=>profilePage(section||'profile')],
  [/^\/(login|register)$/i,auth],
  [/^\/dashboard$/,dash],
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

function nav(){
  const user=me(),path=location.hash.slice(1)||'/';
  document.body.classList.add('edunext-ready');
  document.body.classList.remove('lms-mobile-open');
  const auth=$('#auth');
  if(auth){
    auth.innerHTML=user
      ? '<a class="edn-account-study-link" href="#/dashboard">Trang học tập</a><a class="edunext-profile-link" href="#/profile" aria-label="Mở trực tiếp hồ sơ cá nhân"><span class="edunext-profile-avatar">'+esc(ini(user.name))+'</span><span class="edunext-profile-copy"><strong>'+esc(user.name)+'</strong><small>Hồ sơ</small></span></a>'
      : '<a class="btn btn-g btn-s" href="#/login">Đăng nhập</a><a class="btn btn-p btn-s" href="#/register">Đăng ký</a>';
  }
  const activePath=path.startsWith('/domain/')?'/categories':(path.startsWith('/course/')||path.startsWith('/checkout/')||path.startsWith('/learn/')?'/courses':(path.startsWith('/blog/')?'/blog':path));
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+activePath));
  const labels={
    '/':'Trang chủ','/courses':'Khóa học','/best-sellers':'Khóa học','/categories':'Lĩnh vực','/blog':'Góc kiến thức','/faq':'Hỏi đáp',
    '/dashboard':'Trang học tập','/orders':'Lịch sử mua hàng','/profile':'Hồ sơ','/profile/profile':'Hồ sơ','/profile/public':'Hồ sơ',
    '/profile/photo':'Ảnh đại diện','/profile/security':'Mật khẩu','/certificates':'Chứng chỉ','/login':'Đăng nhập','/register':'Đăng ký','/about':'Về EduNext'
  };
  const current=$('#lms-breadcrumb-current');
  if(current)current.textContent=labels[path]||(path.startsWith('/domain/')?'Lĩnh vực':path.startsWith('/course/')?'Chi tiết khóa học':path.startsWith('/learn/')?'Bài học':path.startsWith('/blog/')?'Góc kiến thức':'EduNext');
  const menu=$('.lms-mobile-menu');
  if(menu)menu.setAttribute('aria-expanded',String(document.body.classList.contains('lms-mobile-open')));
}

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
  if(!keep)window.scrollTo(0,0);
}

/* User-facing interactions only. */
const A={
  'retry-catalog':()=>initializeEduNext(),
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
  clear:()=>{f=F0();render(true);},
  'load-more':()=>{f.visible+=12;list();},
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
  logout:async()=>{
    try{
      await request('edunext_logout',{});
      window.location.hash='#/';
      window.location.reload();
    }catch(error){toast(error.message);}
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
  const matches=tag=>{
    const normalized=String(tag||'').toLocaleLowerCase('vi-VN');
    if(topic==='Tất cả')return true;
    if(topic==='AI')return normalized.includes('ai');
    if(topic==='Lập trình')return normalized.includes('lập trình')||tag==='Dự án'||tag==='Cơ sở dữ liệu';
    return normalized.includes(topic.toLocaleLowerCase('vi-VN'));
  };
  document.querySelectorAll('.blog-page-card[data-blog-tag]').forEach(item=>{
    item.style.display=matches(item.dataset.blogTag||'')?'':'none';
  });
  document.querySelectorAll('.blog-topic-row [data-blog-topic]').forEach(item=>{
    const active=item.dataset.blogTopic===topic;
    item.classList.toggle('active',active);
    item.setAttribute('aria-pressed',String(active));
  });
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
    if(!/^image\/(png|jpeg|webp)$/.test(file.type)){if(error)error.textContent='Chỉ chấp nhận ảnh JPG, PNG hoặc WebP.';return;}
    if(file.size>2*1024*1024){if(error)error.textContent='Ảnh cần có dung lượng không quá 2 MB.';return;}
    const form=new FormData();form.append('avatar',file);
    request('edunext_profile_avatar',form).then(data=>{
      toast(data.message||'Đã cập nhật ảnh hồ sơ.');
      window.location.reload();
    }).catch(err=>{const message=$('#edn-profile-error');if(message)message.textContent=err.message;});
    return;
  }
  if(target.dataset.f&&$('#list')){
    f[target.dataset.f]=target.value;
    f.visible=12;
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
  if(event.key==='Escape')$('#edn-preview-modal')?.remove();
  if(event.key==='Escape'&&document.body.classList.contains('lms-mobile-open')){
    document.body.classList.remove('lms-mobile-open');
    const menu=$('.lms-mobile-menu');
    if(menu)menu.setAttribute('aria-expanded','false');
  }
});
let catalogLoaded=false;
window.addEventListener('hashchange',()=>{if(catalogLoaded)render();});
const initializeEduNext=async()=>{
  app.innerHTML='<div class="wrap page edn-app-loading" role="status"><span class="edn-loading-mark">E</span><h1>Đang tải EduNext</h1><p>Đang chuẩn bị danh mục lĩnh vực và chương trình học.</p></div>';
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
    catalogLoaded=true;
    render();
  }catch(error){
    app.innerHTML='<div class="wrap page"><div class="empty" role="alert"><h1>Chưa thể tải danh mục EduNext</h1><p>Hãy tải lại trang. Nếu lỗi tiếp tục xảy ra, quản trị viên cần kiểm tra tệp danh mục chương trình.</p><button class="btn btn-g" type="button" data-a="retry-catalog">Thử lại</button></div></div>';
    nav();
  }
};
initializeEduNext();
})();