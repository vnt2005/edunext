(()=>{
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=n=>Number(n||0).toLocaleString('vi-VN')+'đ',ini=n=>String(n||'E').trim().split(/\s+/).slice(-2).map(x=>x[0]||'').join('').toUpperCase();
const CATALOG=window.EDUNEXT_CATALOG||{domains:[],courses:[]};
const DOMAINS=Array.isArray(CATALOG.domains)?CATALOG.domains:[];
const CATS=DOMAINS.map(d=>d.name);
const COURSE_IMAGES={
csharp:'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
api:'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
data:'https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2',
english:'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
design:'https://miro.medium.com/v2/resize:fit:1400/1*ezbw1Z06SzRSOhShXfwOTg.png',
marketing:'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=82&w=1200'
};
const C=CATALOG.courses.map(raw=>{
  const lessons=Array.isArray(raw.lessons)?raw.lessons:[];
  const L=lessons.map(item=>item.title);
  return {
    id:raw.id,t:raw.title,slug:raw.slug||raw.id,cat:raw.domain,domainId:raw.domainId,
    topics:Array.isArray(raw.relatedTopics)?raw.relatedTopics:[],
    related:Array.isArray(raw.relatedTopics)?raw.relatedTopics:[],
    description:raw.description||'',prerequisites:raw.prerequisites||'',
    lessons,L,v:lessons.map(item=>item.videoUrl||''),previewVideoUrl:raw.previewVideoUrl||'',
    s:[],r:null,n:null,lvl:raw.level||'Chưa cấu hình',p:raw.price,o:raw.originalPrice,
    h:raw.durationHours,tag:raw.published?'Đã xuất bản':'Đang hoàn thiện nội dung',
    c:'',published:raw.published===true,contentStatus:raw.contentStatus||'outline',
    completionCount:Number(raw.completionRule&&raw.completionRule.requiredCount)||L.length
  };
});
const BLOG_ARTICLES=[
{tag:'Lập trình',title:'Học C# mà cứ quên cú pháp? Thử cách học này trước',excerpt:'Không ít người mới học C# rơi vào cảnh xem xong một bài thì thấy hiểu, nhưng mở Visual Studio lên lại không biết bắt đầu từ đâu. Vấn đề thường không nằm ở trí nhớ mà ở cách mình luyện tập.',time:'6 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'ASP.NET Core',title:'REST API không khó, khó là học sai thứ tự',excerpt:'Routing, Controller, DI, EF Core, JWT… nhìn qua rất nhiều thứ. Nhưng khi xếp chúng theo đúng thứ tự, việc làm một API đầu tiên lại dễ hơn bạn nghĩ.',time:'8 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Kỹ năng học tập',title:'Một buổi tự học IT hiệu quả không cần kéo dài cả ngày',excerpt:'Thay vì ngồi trước máy tính từ sáng đến tối, hãy chia thời gian thành những phiên học ngắn và đặt một mục tiêu đủ nhỏ để chắc chắn hoàn thành.',time:'5 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'AI & Lập trình',title:'Dùng AI khi học code: lúc nào nên hỏi, lúc nào nên tự làm?',excerpt:'AI có thể giải thích lỗi rất nhanh, nhưng nếu câu trả lời lúc nào cũng đến trước lúc bạn suy nghĩ thì kỹ năng sẽ không theo kịp. Đây là cách dùng AI để học thay vì học hộ.',time:'9 phút đọc',course:'data',image:COURSE_IMAGES.data},
{tag:'Dự án',title:'Từ bài tập trên lớp đến project đầu tiên: bắt đầu thế nào?',excerpt:'Bạn không cần chờ đến khi biết hết công nghệ mới làm project. Một project nhỏ nhưng tự mình hoàn thành thường có giá trị hơn một danh sách dài những tutorial đã xem.',time:'7 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Cơ sở dữ liệu',title:'Biết C# rồi có nên học SQL ngay không?',excerpt:'Nếu bạn đang đi theo backend, câu trả lời gần như là có. SQL giúp bạn hiểu dữ liệu thật sự nằm ở đâu và vì sao code phía trên phải làm như vậy.',time:'6 phút đọc',course:'api',image:COURSE_IMAGES.data}
];
const CFG=window.EDUNEXT_CONFIG||{};
const D={users:CFG.user?[CFG.user]:[],me:CFG.user&&CFG.user.email?CFG.user.email:null,en:{},orders:Array.isArray(CFG.orders)?CFG.orders:[]};
if(D.me){
  D.en[D.me]={};
  (Array.isArray(CFG.ownedCourseIds)?CFG.ownedCourseIds:[]).forEach(id=>{
    const progress=CFG.progress&&CFG.progress[id]?CFG.progress[id]:{};
    D.en[D.me][id]={done:Array.isArray(progress.done)?progress.done.map(Number).filter(Number.isInteger):[],updatedAt:progress.updatedAt||null,n:{}};
  });
}
const save=()=>{};
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
  const action=own
    ? '<a class="btn btn-p btn-s" href="#/learn/'+esc(c.id)+'/'+nextL(c)+'">Tiếp tục học</a>'
    : '<a class="btn btn-g btn-s" href="#/course/'+esc(c.id)+'">Xem lộ trình</a>';
  const status=c.published
    ? (typeof c.p==='number' ? money(c.p) : 'Đã xuất bản')
    : 'Đề cương · Chưa mở bán';
  return '<article class="lms-course-card edn-catalog-course">'+
    '<a href="#/course/'+esc(c.id)+'" class="lms-course-image">'+courseImageMarkup(c)+'<span class="lms-course-category">'+esc(c.cat)+'</span><span class="lms-course-badge">'+(c.published?'Đã xuất bản':'Đang hoàn thiện')+'</span></a>'+
    '<div class="lms-course-body"><p class="lms-course-category-text">'+esc(c.cat)+'</p><h3><a href="#/course/'+esc(c.id)+'">'+esc(c.t)+'</a></h3>'+
    '<p class="edn-course-outline-meta">'+c.L.length+' bài trong đề cương</p><div class="edn-course-status-line">'+esc(status)+'</div>'+
    (own?'<div class="lms-course-progress"><div><span style="width:'+pct(c)+'%"></span></div><small>'+pct(c)+'% hoàn thành</small></div>':'')+
    '<div class="edn-course-card-action">'+action+'</div></div></article>';
};
const nf=()=>'<div class="wrap page"><div class="empty" role="status"><h2>Không tìm thấy nội dung này</h2><p>Liên kết có thể đã thay đổi hoặc nội dung chưa được xuất bản.</p><a href="#/">Về trang chủ</a></div></div>';
const OUTCOMES={
"Lập trình":["Nắm vững kiến thức nền tảng và tư duy lập trình","Thực hành qua các bài học theo từng bước","Xây dựng nền tảng để tiếp tục học chuyên môn","Theo dõi tiến độ và hoàn thành quiz, chứng chỉ"],
"Data / AI":["Hiểu quy trình làm việc với dữ liệu từ cơ bản","Làm quen công cụ và phương pháp phân tích","Thực hành qua các bài tập và dự án mẫu","Xây dựng nền tảng để học AI nâng cao"],
"Thiết kế":["Nắm nguyên lý và quy trình thiết kế","Luyện wireframe và prototype từng bước","Áp dụng vào bài tập gần với thực tế","Hoàn thiện nền tảng để xây dựng portfolio"],
"Ngoại ngữ":["Cải thiện giao tiếp trong môi trường công việc","Luyện các tình huống thực tế thường gặp","Phát triển kỹ năng viết và thuyết trình","Tự tin hơn khi sử dụng tiếng Anh chuyên môn"],
"Marketing":["Hiểu các khái niệm quan trọng trong lĩnh vực","Học theo ví dụ và tình huống thực tế","Luyện tập theo từng mục tiêu nhỏ","Xây dựng nền tảng để học chuyên sâu"]
};

const slugify=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const home=()=>{
  const featured=C.slice(0,6);
  const hero=find('csharp')||C[0];
  const domainLinks=DOMAINS.slice(0,8).map((d,i)=>
    '<a class="edn-topic-link" href="#/domain/'+esc(d.slug)+'"><span class="edn-topic-title">'+esc(d.name)+'</span><span class="edn-topic-arrow" aria-hidden="true">↗</span></a>'
  ).join('');
  const marketCard=c=>'<article class="edn-market-course"><a class="edn-market-course-image" href="#/course/'+esc(c.id)+'">'+courseImageMarkup(c)+'<span class="edn-market-course-tag">Đề cương</span><span class="edn-market-course-view">Xem lộ trình ↗</span></a><div class="edn-market-course-copy"><p class="edn-market-course-category">'+esc(c.cat)+'</p><h3><a href="#/course/'+esc(c.id)+'">'+esc(c.t)+'</a></h3><p class="edn-course-outline-meta">'+c.L.length+' bài học dự kiến</p><div class="edn-course-status-line">Nội dung đang được hoàn thiện</div><a class="edn-course-card-link" href="#/course/'+esc(c.id)+'">Xem chương trình <b aria-hidden="true">↗</b></a></div></article>';
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
};const grp=(t,k,o)=>`<div><h4>${t}</h4>${o.map(x=>Array.isArray(x)?x:[x,x||'Tất cả']).map(([v,l])=>`<label><input type="radio" name="${k}" data-f="${k}" value="${v}" ${f[k]===v?'checked':''}> ${l}</label>`).join('')}</div>`;
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
  const outcomes=['Xem trước đầy đủ các chủ đề trong đề cương','Nắm trình tự học từ nền tảng đến thực hành','Theo dõi trạng thái học liệu và điều kiện hoàn thành'];
  return '<div class="edn-course-detail-page"><section class="edn-course-hero"><div class="wrap edn-course-hero-inner">'+
    '<div class="edn-course-intro"><nav class="edn-course-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/categories">Lĩnh vực</a><span>›</span><a href="#/domain/'+esc(domain?domain.slug:'')+'">'+esc(c.cat)+'</a></nav>'+
    '<div class="edn-course-eyebrow">'+esc(c.cat)+' <span>·</span> Đề cương chương trình</div><h1>'+esc(c.t)+'</h1><p class="edn-course-subtitle">'+esc(c.description||'Chương trình học được tổ chức theo các bước từ kiến thức nền tảng đến thực hành.')+'</p>'+
    '<div class="edn-course-tag-row"><span class="edn-course-tag">'+(c.published?'Đã xuất bản':'Đang hoàn thiện nội dung')+'</span><span class="edn-course-language">Ngôn ngữ: chưa cấu hình</span></div>'+
    '<div class="edn-course-date-row"><span>'+c.L.length+' bài học dự kiến</span><span>'+(c.h?esc(c.h)+' giờ':'Thời lượng đang cập nhật')+'</span></div>'+
    '<div class="edn-course-status-line">Đây là khung chương trình; chỉ các bài có học liệu đã xác minh mới được mở học.</div></div>'+
    '<aside class="edn-course-buy-card" aria-label="Trạng thái khóa học"><div class="edn-course-preview edn-course-preview-static">'+visual+'<span class="edn-preview-shade"></span><strong>'+esc(c.cat)+'</strong></div><div class="edn-course-buy-content">'+
    '<div class="edn-course-price-line"><strong>'+(typeof c.p==='number'?money(c.p):'Chưa có giá')+'</strong></div><p class="edn-course-purchase-note">'+(owned?'Bạn đã có quyền truy cập khóa học này.':'Khóa học chưa được mở bán.')+'</p>'+buyContent+
    '<div class="edn-course-includes"><strong>Thông tin chương trình</strong><span>✓ '+c.L.length+' bài học trong đề cương</span><span>✓ Có thứ tự bài học rõ ràng</span><span>✓ Lĩnh vực và chủ đề liên quan</span></div></div></aside></div></section>'+
    '<div class="wrap edn-course-content-grid"><main class="edn-course-main">'+
    '<section class="edn-course-outcomes" aria-labelledby="edn-outcomes-title"><h2>Mục tiêu của đề cương</h2><div class="edn-course-outcomes-grid">'+outcomes.map(item=>'<div class="edn-course-outcome"><span>✓</span><p>'+esc(item)+'</p></div>').join('')+'</div></section>'+
    '<section class="edn-course-curriculum" id="course-curriculum"><div class="edn-course-section-heading"><div><h2>Toàn bộ bài học</h2><p>'+c.L.length+' bài trong khung chương trình hiện tại</p></div><span class="edn-curriculum-total">'+c.L.length+' bài</span></div><div class="edn-curriculum-list">'+lessonRows+'</div><p class="edn-curriculum-footnote">Tên bài học là đề cương. Video, tài liệu, bài tập và hướng dẫn cần được bổ sung, kiểm tra trước khi khóa học mở bán.</p></section>'+
    '<section class="edn-course-about"><h2>Điều kiện và thông tin</h2><p>'+esc(c.description||'Nội dung chi tiết đang được chuẩn bị.')+'</p><div class="edn-course-facts"><div><small>Lĩnh vực</small><strong>'+esc(c.cat)+'</strong></div><div><small>Số bài dự kiến</small><strong>'+c.L.length+'</strong></div><div><small>Cấp độ</small><strong>'+esc(c.lvl||'Chưa cấu hình')+'</strong></div></div></section>'+
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
const field=(n,l,t)=>`<div class="fg"><label for="f-${n}">${l}</label><input id="f-${n}" name="${n}" type="${t}" autocomplete="${n==='pw'?'current-password':n}"></div>`;
const auth=m=>{if(D.me){go('/dashboard');return ''}const r=m==='register';return `<div class="auth"><form class="box ac" data-form="${m}" novalidate><h2>${r?'Tạo tài khoản miễn phí':'Đăng nhập'}</h2>${r?field('name','Họ và tên','text'):''}${field('email','Email','email')}${field('pw','Mật khẩu (tối thiểu 6 ký tự)','password')}${r?'<label class="chk"><input type="checkbox" name="ok"> Tôi đồng ý với điều khoản sử dụng</label>':''}<p class="err" id="err" role="alert"></p><button class="btn btn-p w">${r?'Tạo tài khoản':'Đăng nhập'}</button><p class="sw">${r?'Đã có tài khoản? <a href="#/login">Đăng nhập</a>':'Chưa có tài khoản? <a href="#/register">Tạo tài khoản</a>'}</p></form></div>`};



const dash=()=>{if(!D.me)return guard('/dashboard');const u=me(),mine=C.filter(c=>EN()[c.id]),completed=mine.filter(c=>pct(c)===100),active=mine.filter(c=>pct(c)<100);
return `<div class="wrap page cio-student-page">
<div class="cio-page-head"><div><span class="cio-eyebrow">TRANG HỌC TẬP</span><h1>Xin chào, ${esc(u.name)}</h1><p>Theo dõi các khóa học bạn đã mua và tiếp tục bài học đang dang dở.</p></div><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>
<div class="cio-stat-grid"><div><span>Đang học</span><b>${active.length}</b></div><div><span>Hoàn thành</span><b>${completed.length}</b></div><div><span>Bài đã học</span><b>${mine.reduce((s,c)=>s+EN()[c.id].done.length,0)}</b></div><div><span>Đơn hàng</span><b>${(D.orders||[]).filter(o=>o.email===D.me).length}</b></div></div>
<div class="cio-tabs"><span class="active">Đang học (${active.length})</span><span>Hoàn thành (${completed.length})</span></div>
${active.length?'<section class="cio-dashboard-grid">'+active.map(c=>'<article class="cio-learning-card"><a href="#/learn/'+c.id+'/'+nextL(c)+'" class="cio-learning-image">'+courseImageMarkup(c)+'</a><div class="cio-learning-body"><div class="cio-card-status">ĐANG HỌC</div><h3><a href="#/learn/'+c.id+'/'+nextL(c)+'">'+c.t+'</a></h3><p>'+c.cat+' · '+c.L.length+' bài · '+c.h+' giờ</p><div class="cio-progress-line"><span style="width:'+pct(c)+'%"></span></div><div class="cio-learning-foot"><span>'+pct(c)+'% hoàn thành</span><a href="#/learn/'+c.id+'/'+nextL(c)+'">Tiếp tục →</a></div></div></article>').join('')+'</section>':'<div class="cio-empty"><h3>Chưa có khóa học đang học</h3><p>Mua một khóa học để nó xuất hiện trong Trang học tập.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>'}
${completed.length?'<section class="cio-completed-section"><div class="cio-section-title"><h2>Đã hoàn thành</h2><a href="#/courses">Khám phá thêm →</a></div><div class="grid cio-course-grid">'+completed.map(card).join('')+'</div></section>':''}
</div>`};const blogPage=()=>`<div class="wrap page blog-page">
<div class="blog-page-head"><div><span class="content-kicker">EduNext Blog</span><h1>Học một chút, làm được một chút</h1><p>Các bài viết ngắn về lập trình, dự án và cách tự học. Viết để giải quyết những câu hỏi thật trong lúc học, không phải để nhồi thêm lý thuyết.</p></div><a class="btn btn-p" href="#/courses">Xem khóa học</a></div>
<div class="blog-topic-row"><button type="button" class="topic active" data-blog-topic="Tất cả" aria-pressed="true">Tất cả</button><button type="button" class="topic" data-blog-topic="Lập trình" aria-pressed="false">Lập trình</button><button type="button" class="topic" data-blog-topic="ASP.NET Core" aria-pressed="false">ASP.NET Core</button><button type="button" class="topic" data-blog-topic="AI" aria-pressed="false">AI</button><button type="button" class="topic" data-blog-topic="Kỹ năng học tập" aria-pressed="false">Kỹ năng học tập</button></div>
<section class="blog-page-feature" data-blog-tag="${esc(BLOG_ARTICLES[0].tag)}"><a class="blog-page-feature-image" href="#/blog"><img src="${BLOG_ARTICLES[0].image}" alt="${esc(BLOG_ARTICLES[0].title)}"><span>${BLOG_ARTICLES[0].tag}</span></a><div class="blog-page-feature-body"><div class="blog-home-meta"><span>${BLOG_ARTICLES[0].time}</span><span>EduNext</span></div><h2>${BLOG_ARTICLES[0].title}</h2><p>${BLOG_ARTICLES[0].excerpt}</p><p class="blog-page-note">Một bài viết phù hợp nếu bạn đang học C# nhưng cảm giác kiến thức cứ trôi đi sau mỗi buổi học.</p><a class="btn btn-g" href="#/course/${BLOG_ARTICLES[0].course}">Xem khóa học liên quan</a></div></section>
<div class="blog-page-grid">${BLOG_ARTICLES.slice(1).map(a=>'<article class="blog-page-card" data-blog-tag="'+esc(a.tag)+'"><a class="blog-page-card-image" href="#/blog"><img src="'+a.image+'" alt="'+esc(a.title)+'" loading="lazy"><span>'+a.tag+'</span></a><div class="blog-page-card-body"><div class="blog-home-meta"><span>'+a.time+'</span><span>EduNext</span></div><h2>'+a.title+'</h2><p>'+a.excerpt+'</p><a class="blog-read-link" href="#/course/'+a.course+'">Học phần liên quan →</a></div></article>').join('')}</div>
<div class="blog-page-footer"><div><span class="eyebrow">GỢI Ý ĐỂ BẮT ĐẦU</span><h2>Đọc một bài, rồi quay lại làm thử.</h2><p>Bài viết chỉ có ý nghĩa khi nó giúp bạn hiểu thêm một điều và làm được thêm một việc.</p></div><a class="btn btn-p" href="#/courses">Xem khóa học</a></div>
</div>`;

const aboutPage=()=>`<div class="wrap page content-page"><div class="content-hero"><span class="content-kicker">Về EduNext</span><h1>Học đúng kiến thức, phát triển đúng tương lai</h1><p class="muted">EduNext là bản demo nền tảng học trực tuyến tập trung vào lộ trình rõ ràng, tiến độ học tập và trải nghiệm học thực tế.</p></div><section class="about-grid"><div class="box about-main"><h2>EduNext hướng đến điều gì?</h2><p>Thay vì đưa quá nhiều nội dung cùng lúc, EduNext tổ chức khóa học theo từng bước để người học dễ bắt đầu, dễ theo dõi và dễ quay lại đúng phần đang học.</p><p>Nền tảng kết hợp khóa học, video, quiz, chứng chỉ, dashboard và các công cụ dành cho giảng viên và quản trị viên trong một trải nghiệm thống nhất.</p></div><div class="box about-values"><h2>Giá trị cốt lõi</h2><div><b>Học có lộ trình</b><span>Mỗi bước đều có mục tiêu rõ ràng.</span></div><div><b>Thực hành</b><span>Ưu tiên kiến thức có thể áp dụng vào dự án.</span></div><div><b>Theo dõi tiến độ</b><span>Biết mình đang ở đâu và nên học gì tiếp.</span></div><div><b>Trải nghiệm đơn giản</b><span>Giao diện dễ dùng trên máy tính và điện thoại.</span></div></div></section><section class="box about-mission"><span class="content-kicker">Tầm nhìn</span><h2>Xây dựng một không gian học tập rõ ràng, thực tế và dễ tiếp cận.</h2><p class="muted">Từ người mới bắt đầu đến người muốn bổ sung kỹ năng, EduNext hướng tới việc biến mục tiêu lớn thành những bước học nhỏ có thể hoàn thành mỗi ngày.</p><a class="btn btn-p" href="#/courses">Xem khóa học</a></section></div>`;

const profilePage=section=>{
if(!D.me)return guard('/profile');
const u=me(),meta=u.profile||(u.profile={});
const parts=(u.name||'').trim().split(/\s+/),defaultFirst=parts.length>1?parts.slice(0,-1).join(' '):(parts[0]||''),defaultLast=parts.length>1?parts[parts.length-1]:'';
const first=meta.firstName!==undefined?meta.firstName:defaultFirst,last=meta.lastName!==undefined?meta.lastName:defaultLast;
const full=[first,last].filter(Boolean).join(' ')||u.name||'Học viên EduNext';
const settings=[
['public','Xem hồ sơ công khai'],['profile','Hồ sơ'],['photo','Ảnh'],
['security','Bảo mật tài khoản'],['subscriptions','Thuê bao'],
['payments','Phương thức thanh toán'],['privacy','Quyền riêng tư'],
['notifications','Tùy chọn thông báo'],['api','Ứng dụng API'],['close-account','Đóng tài khoản']];
const menu=settings.map(([id,label])=>'<a class="edn-profile-menu-item '+(section===id?'is-active':'')+'" '+(section===id?'aria-current="page"':'')+' href="#/profile/'+id+'">'+esc(label)+'</a>').join('');
let title='Hồ sơ công khai',subtitle='Thêm thông tin về bản thân bạn',content='';
const avatar=meta.avatar?'<img src="'+meta.avatar+'" alt="Ảnh hồ sơ">':'<span>'+esc(ini(full))+'</span>';
if(section==='profile'){
content='<form class="edn-profile-form" data-form="profile-save" novalidate>'+
'<h3 class="edn-form-section-title">Thông tin cơ bản</h3>'+
'<div class="edn-profile-field-grid">'+
'<div class="edn-field"><label for="edn-first-name">Tên</label><input id="edn-first-name" name="firstName" value="'+esc(first)+'" maxlength="60" autocomplete="given-name" required></div>'+
'<div class="edn-field"><label for="edn-last-name">Họ</label><input id="edn-last-name" name="lastName" value="'+esc(last)+'" maxlength="60" autocomplete="family-name" required></div>'+
'</div>'+
'<div class="edn-field"><div class="edn-label-line"><label for="edn-headline">Dòng tiêu đề</label><span id="edn-headline-count">'+((meta.headline||'').length)+'/60</span></div><input id="edn-headline" name="headline" value="'+esc(meta.headline||'')+'" maxlength="60" placeholder="Ví dụ: Sinh viên Công nghệ thông tin | .NET Developer"><small>Viết ngắn gọn về công việc, lĩnh vực hoặc điều bạn đang theo đuổi.</small></div>'+
'<div class="edn-field"><label for="edn-bio">Tiểu sử</label><div class="edn-bio-editor"><div class="edn-bio-toolbar"><button type="button" data-a="bio-bold" aria-label="In đậm"><strong>B</strong></button><button type="button" data-a="bio-italic" aria-label="In nghiêng"><em>I</em></button></div><textarea id="edn-bio" name="bio" maxlength="1000" rows="4" placeholder="Chia sẻ một chút về bản thân, kinh nghiệm và điều bạn quan tâm...">'+esc(meta.bio||'')+'</textarea></div><small>Không cần chia sẻ thông tin cá nhân nhạy cảm.</small></div>'+
'<div class="edn-field"><label for="edn-language">Ngôn ngữ</label><select id="edn-language" name="language"><option value="vi" '+((meta.language||'vi')==='vi'?'selected':'')+'>Tiếng Việt</option><option value="en" '+(meta.language==='en'?'selected':'')+'>English</option></select></div>'+
'<div class="edn-profile-divider"></div><h3 class="edn-form-section-title">Đường liên kết</h3><p class="edn-form-section-copy">Thêm các trang cá nhân bạn muốn chia sẻ trên hồ sơ công khai.</p>'+
'<div class="edn-field"><label for="edn-website">Website cá nhân</label><input id="edn-website" name="website" type="url" value="'+esc(meta.website||'')+'" placeholder="https://example.com"></div>'+
'<div class="edn-field"><label for="edn-linkedin">LinkedIn</label><input id="edn-linkedin" name="linkedin" type="url" value="'+esc(meta.linkedin||'')+'" placeholder="https://linkedin.com/in/your-profile"></div>'+
'<div class="edn-field"><label for="edn-facebook">Facebook</label><input id="edn-facebook" name="facebook" type="url" value="'+esc(meta.facebook||'')+'" placeholder="https://facebook.com/your-profile"></div>'+
'<p class="edn-profile-error" id="edn-profile-error" role="alert"></p><div class="edn-profile-save-row"><span>Thông tin chỉ được lưu trong bản demo trên trình duyệt này.</span><button class="btn btn-p" type="submit">Lưu hồ sơ</button></div></form>';
}else if(section==='public'){
title='Xem hồ sơ công khai';subtitle='Đây là cách thông tin hồ sơ của bạn được trình bày.';
content='<div class="edn-public-profile"><div class="edn-public-avatar">'+avatar+'</div><h2>'+esc(full)+'</h2><p class="edn-public-headline">'+esc(meta.headline||'Chưa thêm dòng tiêu đề.')+'</p><div class="edn-profile-divider"></div><h3>Giới thiệu</h3><p class="edn-public-bio">'+(meta.bio?esc(meta.bio).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>'):'Bạn chưa thêm tiểu sử. Hãy cập nhật để mọi người hiểu thêm về bạn.')+'</p><div class="edn-public-links">'+(meta.website?'<a href="'+esc(meta.website)+'" target="_blank" rel="noopener noreferrer">Website ↗</a>':'')+(meta.linkedin?'<a href="'+esc(meta.linkedin)+'" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>':'')+(meta.facebook?'<a href="'+esc(meta.facebook)+'" target="_blank" rel="noopener noreferrer">Facebook ↗</a>':'')+'</div><a href="#/profile/profile" class="btn btn-p">Chỉnh sửa hồ sơ</a></div>';
}else if(section==='photo'){
title='Ảnh hồ sơ';subtitle='Chọn ảnh đại diện để mọi người dễ nhận ra bạn.';
content='<div class="edn-setting-card"><div class="edn-avatar-editor"><div class="edn-profile-avatar-large">'+avatar+'</div><div><h3>Ảnh đại diện</h3><p>Ảnh vuông sẽ hiển thị đẹp nhất. Ảnh được thu nhỏ và lưu ở trình duyệt trong bản demo.</p><label class="btn btn-g edn-upload-label" for="edn-profile-avatar-file">Chọn ảnh</label><input class="edn-visually-hidden" id="edn-profile-avatar-file" type="file" accept="image/png,image/jpeg,image/webp"></div></div><p class="edn-setting-note">Định dạng hỗ trợ: JPG, PNG hoặc WebP.</p></div>';
}else if(section==='security'){
title='Bảo mật tài khoản';subtitle='Đổi mật khẩu đăng nhập của bạn.';
content='<form class="edn-profile-form edn-setting-card" data-form="profile-password" novalidate><div class="edn-field"><label for="edn-current-password">Mật khẩu hiện tại</label><input id="edn-current-password" name="currentPassword" type="password" autocomplete="current-password" required></div><div class="edn-field"><label for="edn-new-password">Mật khẩu mới</label><input id="edn-new-password" name="newPassword" type="password" minlength="6" autocomplete="new-password" required></div><div class="edn-field"><label for="edn-confirm-password">Xác nhận mật khẩu mới</label><input id="edn-confirm-password" name="confirmPassword" type="password" minlength="6" autocomplete="new-password" required></div><p class="edn-profile-error" id="edn-profile-error" role="alert"></p><div class="edn-profile-save-row"><span>Bản demo hiện lưu tài khoản ở trình duyệt, chưa có máy chủ xác thực.</span><button type="submit" class="btn btn-p">Cập nhật mật khẩu</button></div></form>';
}else if(section==='subscriptions'){
title='Thuê bao';subtitle='Quản lý các gói dịch vụ của bạn.';
content='<div class="edn-setting-empty"><span class="edn-setting-empty-icon">↻</span><h3>Bạn chưa có gói thuê bao</h3><p>EduNext hiện tập trung vào các khóa học mua riêng lẻ, không yêu cầu thuê bao định kỳ.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>';
}else if(section==='payments'){
title='Phương thức thanh toán';subtitle='Quản lý phương thức thanh toán của bạn.';
content='<div class="edn-setting-empty"><span class="edn-setting-empty-icon">▤</span><h3>Chưa có phương thức thanh toán được lưu</h3><p>Khi thanh toán khóa học trong bản demo, bạn có thể chọn phương thức tại bước xác nhận đơn hàng.</p><a class="btn btn-p" href="#/courses">Xem khóa học</a></div>';
}else if(section==='privacy'){
title='Quyền riêng tư';subtitle='Kiểm soát cách một số thông tin hồ sơ được hiển thị.';
const privacy=meta.privacy||{};
content='<form class="edn-profile-form edn-setting-card" data-form="profile-prefs"><label class="edn-toggle-row"><span><strong>Cho phép hiển thị hồ sơ công khai</strong><small>Người khác có thể xem tên và các thông tin hồ sơ bạn đã điền.</small></span><input type="checkbox" name="publicProfile" '+(privacy.publicProfile!==false?'checked':'')+'></label><label class="edn-toggle-row"><span><strong>Hiển thị các liên kết cá nhân</strong><small>Cho phép hiển thị website và liên kết mạng xã hội trên hồ sơ công khai.</small></span><input type="checkbox" name="showLinks" '+(privacy.showLinks!==false?'checked':'')+'></label><div class="edn-profile-save-row"><span>Cài đặt áp dụng cho bản demo này.</span><button type="submit" class="btn btn-p">Lưu tùy chọn</button></div></form>';
}else if(section==='notifications'){
title='Tùy chọn thông báo';subtitle='Chọn nội dung bạn muốn nhận thông báo.';
const notices=meta.notifications||{};
content='<form class="edn-profile-form edn-setting-card" data-form="profile-prefs"><label class="edn-toggle-row"><span><strong>Thông tin khóa học mới</strong><small>Cập nhật về khóa học và nội dung mới trên EduNext.</small></span><input type="checkbox" name="newCourses" '+(notices.newCourses!==false?'checked':'')+'></label><label class="edn-toggle-row"><span><strong>Mẹo học tập</strong><small>Gợi ý để duy trì tiến độ học tập.</small></span><input type="checkbox" name="learningTips" '+(notices.learningTips!==false?'checked':'')+'></label><label class="edn-toggle-row"><span><strong>Tin tức và ưu đãi</strong><small>Thông tin về sự kiện và chương trình ưu đãi.</small></span><input type="checkbox" name="offers" '+(notices.offers===true?'checked':'')+'></label><div class="edn-profile-save-row"><span>Đây là tùy chọn giao diện demo, chưa gửi email thật.</span><button type="submit" class="btn btn-p">Lưu tùy chọn</button></div></form>';
}else if(section==='api'){
title='Ứng dụng API';subtitle='Quản lý các ứng dụng được kết nối với tài khoản.';
content='<div class="edn-setting-empty"><span class="edn-setting-empty-icon">⌘</span><h3>Chưa kết nối ứng dụng nào</h3><p>EduNext demo chưa phát hành kết nối ứng dụng bên thứ ba.</p></div>';
}else{
title='Đóng tài khoản';subtitle='Thông tin về việc đóng tài khoản EduNext.';
content='<div class="edn-setting-warning"><h3>Đóng tài khoản</h3><p>Tài khoản trên bản demo đang được lưu cục bộ trên trình duyệt. Trang này chưa xóa tài khoản hoặc dữ liệu thật.</p><p>Nếu chỉ muốn kết thúc phiên hiện tại, hãy đăng xuất khỏi tài khoản.</p><button type="button" class="btn btn-g" data-a="logout">Đăng xuất</button></div>';
}
return '<div class="edn-profile-page wrap"><aside class="edn-profile-sidebar"><div class="edn-profile-person"><div class="edn-profile-avatar-large">'+avatar+'</div><strong>'+esc(full)+'</strong><span>Thành viên EduNext</span></div><nav class="edn-profile-settings-nav" aria-label="Cài đặt tài khoản">'+menu+'</nav><button class="edn-profile-logout" type="button" data-a="logout">Đăng xuất</button></aside><section class="edn-profile-main"><header class="edn-profile-heading"><h1>'+title+'</h1><p>'+subtitle+'</p></header><div class="edn-profile-content">'+content+'</div></section></div>';
};
const R=[[/^\/?$/,home],[/^\/courses$/,courses],[/^\/best-sellers$/,()=>{f=F0();f.sort='pop';return courses()}],[/^\/categories$/,()=>{go('/');setTimeout(()=>document.getElementById('cats')?.scrollIntoView({behavior:'smooth'}),30);return home()}],[/^\/course\/(\w+)$/,detail],[/^\/checkout\/(\w+)$/,checkout],[/^\/learn\/(\w+)\/(\d+)$/,learn],[/^\/quiz\/(\w+)$/,quiz],[/^\/certificates$/,certificates],[/^\/cert\/(\w+)$/,cert],[/^\/profile(?:\/([\w-]+))?$/,section=>profilePage(section||'profile')],[/^\/(login|register)$/,auth],[/^\/dashboard$/,dash],[/^\/teacher$/,teacher],[/^\/admin$/,admin],[/^\/blog$/,blogPage],[/^\/about$/,aboutPage],[/^\/faq$/,()=>{go('/');setTimeout(()=>document.getElementById('faq')?.scrollIntoView({behavior:'smooth'}),30);return home()}]];
function nav(){const m=me(),p=location.hash.slice(1)||'/';document.body.classList.add('edunext-ready');document.body.classList.toggle('lms-admin-mode',p==='/admin');document.body.classList.toggle('lms-builder-mode',p==='/teacher');$('#auth').innerHTML=m?'<a class="edunext-profile-link" href="#/profile" aria-label="Mở hồ sơ cá nhân"><span class="edunext-profile-avatar">'+esc(ini(m.name))+'</span><span class="edunext-profile-copy"><strong>'+esc(m.name)+'</strong><small>Hồ sơ cá nhân</small></span></a>':'<a class="btn btn-g btn-s" href="#/login">Đăng nhập</a><a class="btn btn-p btn-s" href="#/register">Đăng ký</a>';document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+p));const labels={'/':'Trang chủ','/courses':'Khóa học','/best-sellers':'Bán chạy','/categories':'Danh mục','/blog':'Blog','/faq':'Hỏi đáp','/dashboard':'Trang học tập','/profile':'Hồ sơ','/profile/profile':'Hồ sơ','/profile/public':'Hồ sơ công khai','/profile/photo':'Ảnh hồ sơ','/profile/security':'Bảo mật tài khoản','/profile/subscriptions':'Thuê bao','/profile/payments':'Phương thức thanh toán','/profile/privacy':'Quyền riêng tư','/profile/notifications':'Tùy chọn thông báo','/profile/api':'Ứng dụng API','/profile/close-account':'Đóng tài khoản','/certificates':'Chứng chỉ','/login':'Đăng nhập','/register':'Đăng ký','/about':'Về EduNext','/teacher':'Course Builder','/admin':'Courses'};const current=$('#lms-breadcrumb-current');if(current)current.textContent=labels[p]||'Khóa học';$('#nav').classList.remove('open');document.body.classList.remove('lms-mobile-open')}
function render(keep){const p=location.hash.slice(1)||'/';hook=null;let h;for(const[re,fn]of R){const m=p.match(re);if(m){h=fn(...m.slice(1));break}}
app.innerHTML=h===undefined?nf():h;if(hook)hook();nav();if(!keep)scrollTo(0,0)}

/* ---------- Actions ---------- */
const A={
preview:id=>{const c=find(id);if(!c)return;const v=Array.isArray(c.v)?c.v[0]:c.v;if(!v){toast('Video xem trước chưa có sẵn');return}$('#edn-preview-modal')?.remove();const modal=document.createElement('div');modal.id='edn-preview-modal';modal.className='edn-preview-modal';modal.dataset.a='preview-close';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Xem trước khóa học');modal.innerHTML='<div class="edn-preview-dialog"><div class="edn-preview-dialog-head"><div><strong>Xem trước khóa học</strong><span>'+esc(c.t)+'</span></div><button type="button" data-a="preview-close" aria-label="Đóng video">×</button></div><div class="edn-preview-video"><iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(v)+'?autoplay=1&rel=0&playsinline=1" title="Xem trước '+esc(c.t)+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div>';document.body.appendChild(modal);modal.querySelector('[data-a="preview-close"]').focus()},
'preview-close':()=>$('#edn-preview-modal')?.remove(),
'bio-bold':()=>{const t=$('#edn-bio');if(!t)return;const s=t.selectionStart,e=t.selectionEnd,v=t.value;t.setRangeText('**'+v.slice(s,e)+'**',s,e,'select');t.focus()},
'bio-italic':()=>{const t=$('#edn-bio');if(!t)return;const s=t.selectionStart,e=t.selectionEnd,v=t.value;t.setRangeText('*'+v.slice(s,e)+'*',s,e,'select');t.focus()},
menu:()=>document.body.classList.toggle('lms-mobile-open'),
sc:id=>{$('#nav').classList.remove('open');const s=()=>{const el=document.getElementById(id);el&&el.scrollIntoView({behavior:'smooth'})};const p=location.hash.slice(1);if(!p||p==='/')s();else{go('/');setTimeout(s,80)}},
cat:v=>{f=F0();f.cat=v;to('/courses')},
clear:()=>{f=F0();render(true)},
enroll:id=>{if(!D.me){next='/checkout/'+id;toast('Đăng nhập để tiếp tục thanh toán');return go('/login')}go('/checkout/'+id)},
done:v=>{const[id,i]=v.split(','),e=EN()[id],k=+i,x=e.done.indexOf(k);x<0?e.done.push(k):e.done.splice(x,1);save();toast(x<0?'Đã lưu tiến độ':'Đã bỏ đánh dấu');render(true)},
tab:(v,t)=>{document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b===t));document.querySelectorAll('.pn').forEach(p=>p.classList.toggle('hidden',p.dataset.p!==v))},
opt:v=>{const[k,id]=v.split(',');qz.a[qz.i]=+k;qr(id)},
qgo:v=>{const[d,id]=v.split(','),n=Q[id].length;if(+d>0&&qz.a[qz.i]==null)return toast('Hãy chọn một đáp án');
if(+d>0&&qz.i===n-1){qz.res=Math.round(Q[id].filter((q,i)=>qz.a[i]===q.a).length/n*100);const e=EN()[id];e.q=Math.max(e.q||0,qz.res);save()}else qz.i+=+d;qr(id)},
qretry:id=>{qz={i:0,a:[],res:null};qr(id)},
logout:()=>{D.me=null;save();toast('Đã đăng xuất');to('/')},
'teacher-demo':()=>toast('Tính năng giảng viên đang ở chế độ demo'),'adminDemo':()=>toast('Tính năng quản trị đang ở chế độ demo'),print:()=>print(),pay:id=>{const c=find(id);if(!c||!D.me)return;D.orders=D.orders||[];const method=(document.querySelector('input[name="payment"]:checked')||{}).value||'bank';D.orders.push({id:'EDN-'+Date.now().toString().slice(-8),courseId:id,email:D.me,amount:c.p,method,status:'paid',createdAt:new Date().toISOString()});EN()[id]={done:[],q:null,n:{}};save();toast('Thanh toán thành công');go('/learn/'+id+'/0')}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&A[t.dataset.a])A[t.dataset.a](t.dataset.v,t)});
document.addEventListener('click',e=>{
const button=e.target.closest('[data-blog-topic]');
if(!button)return;
const topic=button.dataset.blogTopic||'Tất cả';
const matches=tag=>{
  const normalized=tag.toLocaleLowerCase('vi-VN');
  if(topic==='Tất cả')return true;
  if(topic==='AI')return normalized.includes('ai');
  if(topic==='Lập trình')return normalized.includes('lập trình')||tag==='Dự án'||tag==='Cơ sở dữ liệu';
  return normalized.includes(topic.toLocaleLowerCase('vi-VN'));
};
document.querySelectorAll('.blog-page-feature[data-blog-tag],.blog-page-card[data-blog-tag]').forEach(item=>{
  item.style.display=matches(item.dataset.blogTag||'')?'':'none';
});
document.querySelectorAll('.blog-topic-row [data-blog-topic]').forEach(item=>{
  const active=item.dataset.blogTopic===topic;
  item.classList.toggle('active',active);
  item.setAttribute('aria-pressed',String(active));
});
});

const onf=e=>{const t=e.target;if(t.id==='edn-headline'){const n=$('#edn-headline-count');if(n)n.textContent=(t.value||'').length+'/60';return}if(t.id==='edn-profile-avatar-file'&&e.type==='change'&&t.files&&t.files[0]){const file=t.files[0];if(!/^image\/(png|jpeg|webp)$/.test(file.type)){toast('Vui lòng chọn ảnh JPG, PNG hoặc WebP');return}const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{try{const canvas=document.createElement('canvas'),max=320,scale=Math.min(1,max/Math.max(img.width,img.height));canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);const u=me();if(!u)return;u.profile=u.profile||{};u.profile.avatar=canvas.toDataURL('image/jpeg',0.78);save();toast('Đã cập nhật ảnh hồ sơ');render(true)}catch(err){toast('Không thể xử lý ảnh này')}};img.onerror=()=>toast('Không thể mở ảnh đã chọn');img.src=reader.result};reader.readAsDataURL(file);return}if(t.id==='note'){const en=EN()[t.dataset.c];(en.n=en.n||{})[t.dataset.i]=t.value;save();return}if(t.dataset.f&&$('#list')){f[t.dataset.f]=t.value;list()}};
document.addEventListener('input',onf);document.addEventListener('change',onf);
document.addEventListener('submit',e=>{const fm=e.target.closest('[data-form]');if(!fm)return;e.preventDefault();const k=fm.dataset.form,v=Object.fromEntries(new FormData(fm));
if(k==='search'){f=F0();f.q=(v.q||'').trim();fm.reset();$('#nav').classList.remove('open');return to('/courses')}
if(k==='profile-save'){
const u=me();if(!u)return go('/login');
const first=(v.firstName||'').trim(),last=(v.lastName||'').trim();
const error=$('#edn-profile-error');
if(!first||!last){if(error)error.textContent='Vui lòng nhập cả tên và họ.';return}
for(const field of ['website','linkedin','facebook']){if(v[field]&&!/^https?:\/\/\S+/i.test(v[field])){if(error)error.textContent='Các liên kết cần bắt đầu bằng http:// hoặc https://.';return}}
u.profile=u.profile||{};Object.assign(u.profile,{firstName:first,lastName:last,headline:(v.headline||'').trim(),bio:(v.bio||'').trim(),language:v.language||'vi',website:(v.website||'').trim(),linkedin:(v.linkedin||'').trim(),facebook:(v.facebook||'').trim()});
u.name=[first,last].join(' ');save();toast('Đã lưu hồ sơ cá nhân');render(true);return}
if(k==='profile-password'){
const u=me();if(!u)return go('/login');const error=$('#edn-profile-error');
if(v.currentPassword!==u.pw){if(error)error.textContent='Mật khẩu hiện tại chưa đúng.';return}
if((v.newPassword||'').length<6){if(error)error.textContent='Mật khẩu mới cần tối thiểu 6 ký tự.';return}
if(v.newPassword!==v.confirmPassword){if(error)error.textContent='Hai mật khẩu mới chưa trùng khớp.';return}
u.pw=v.newPassword;save();fm.reset();toast('Đã cập nhật mật khẩu trong bản demo');return}
if(k==='profile-prefs'){
const u=me();if(!u)return go('/login');u.profile=u.profile||{};
if(fm.querySelector('[name="publicProfile"]'))u.profile.privacy={publicProfile:!!v.publicProfile,showLinks:!!v.showLinks};
else u.profile.notifications={newCourses:!!v.newCourses,learningTips:!!v.learningTips,offers:!!v.offers};
save();toast('Đã lưu tùy chọn');return}
const err=m=>{$('#err').textContent=m},email=(v.email||'').trim().toLowerCase();
if(!/^\S+@\S+\.\S+$/.test(email))return err('Email chưa đúng định dạng.');
if((v.pw||'').length<6)return err('Mật khẩu cần tối thiểu 6 ký tự.');
if(k==='register'){if(!(v.name||'').trim())return err('Vui lòng nhập họ và tên.');if(!v.ok)return err('Bạn cần đồng ý với điều khoản sử dụng.');if(D.users.some(u=>u.email===email))return err('Email này đã đăng ký. Hãy đăng nhập.');D.users.push({name:v.name.trim(),email,pw:v.pw})}
else if(!D.users.some(u=>u.email===email&&u.pw===v.pw))return err('Sai email hoặc mật khẩu.');
D.me=email;save();toast('Xin chào '+me().name);const n=next||'/dashboard';next='';go(n)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#edn-preview-modal')?.remove()});
addEventListener('hashchange',()=>render());
render();
})();
