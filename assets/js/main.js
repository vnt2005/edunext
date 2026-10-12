(()=>{
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=n=>n.toLocaleString('vi-VN')+'đ',ini=n=>n.split(' ').slice(-2).map(x=>x[0]).join('');
const CATS=['Lập trình','Data / AI','Thiết kế','Ngoại ngữ','Marketing'];
const C=[
{id:'csharp',t:'Lập trình C# từ cơ bản đến nâng cao',cat:'Lập trình',tc:'Nguyễn Văn Minh',r:4.9,n:1245,lvl:'Cơ bản',p:599000,o:799000,h:24,tag:'Bán chạy',c:'',L:['Cài đặt và Hello World','Biến và kiểu dữ liệu','Rẽ nhánh và vòng lặp','Class và OOP','Kế thừa và đa hình'],v:['GhQdlIFylQ8','yquQ9mLtkN8','E4RObAcqvE0','WKmDq62x_rE','t8kkigBSPzc'],s:[0,300,1200,2100,3000]},
{id:'api',t:'Xây dựng REST API với ASP.NET Core',cat:'Lập trình',tc:'Trần Quốc Huy',r:4.8,n:986,lvl:'Trung cấp',p:699000,o:899000,h:18,tag:'Thực chiến',c:'a',L:['Routing và Controller','Dependency Injection','Entity Framework Core','Xác thực JWT','Triển khai API'],v:['AhAxLiGC7Pc','TNqSTYcVyCY','39rSVOScx9c','8FvN5bhVYxY','OE0_9c-K-Ow'],s:[0,300,1100,1700,2400]},
{id:'data',t:'Data Analytics & AI cho người mới',cat:'Data / AI',tc:'Lê Hoàng Nam',r:4.9,n:2130,lvl:'Cơ bản',p:799000,o:1099000,h:32,tag:'Mới',c:'g',L:['Tư duy dữ liệu','Excel và SQL cơ bản','Trực quan hóa dữ liệu','Machine Learning nhập môn','Dự án phân tích'],v:['v2oNWja7M2E','7mz73uXD9DA','P9texQKZtG4','OmW9YvxSl1E','-rbJV1_krGE'],s:[0,240,480,720,960]},
{id:'english',t:'English Communication for Work',cat:'Ngoại ngữ',tc:'Emily Tran',r:4.8,n:1560,lvl:'Trung cấp',p:499000,o:649000,h:16,tag:'Top rated',c:'',L:['Họp và giao tiếp xã giao','Viết email chuyên nghiệp','Thuyết trình','Đàm phán','Phỏng vấn'],v:['iqmOQ4_M3u0','jCYLhRKMk8A','bSTVMAP-UyM','lQJKmRD1gYg','UzFm6AwGHJE'],s:[0,600,1500,2400,3300]},
{id:'design',t:'UI/UX Design từ Zero đến Portfolio',cat:'Thiết kế',tc:'Phạm Minh Anh',r:4.7,n:870,lvl:'Cơ bản',p:649000,o:849000,h:20,tag:'Portfolio',c:'a',L:['Nguyên lý thiết kế','Nghiên cứu người dùng','Wireframe','Prototype trên Figma','Dựng portfolio'],v:['mmgxspm9JWs','1ucLq6JTxac','BkKCtCGzZiA','FfeuWbZSRj4','MBblN98-5lg'],s:[0,715,3600,7200,10800]},
{id:'marketing',t:'Digital Marketing thực chiến',cat:'Marketing',tc:'Đỗ Gia Bảo',r:4.9,n:1020,lvl:'Trung cấp',p:549000,o:749000,h:14,tag:'Bán chạy',c:'g',L:['Chiến lược nội dung','SEO cơ bản','Quảng cáo trả phí','Email marketing','Đo lường hiệu quả'],v:['Ea1hFxPx3JA','MD5-HByRxoA','szSiTVQqvGs','2I6JqAHvFAw','gIDE-jfIQtc'],s:[0,300,600,900,1200]}];
const COURSE_IMAGES={
csharp:'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=1200',
api:'https://images.unsplash.com/photo-1637044527362-5ac1dc1d7446?auto=format&fit=crop&q=82&w=1200',
data:'https://worldbank.scene7.com/is/image/worldbankprod/shutterstock_2588443437?qlt=88&resMode=sharp2',
english:'https://images.unsplash.com/photo-1672248652488-73f8a07e3307?auto=format&fit=crop&q=82&w=1200',
design:'https://miro.medium.com/v2/resize:fit:1400/1*ezbw1Z06SzRSOhShXfwOTg.png',
marketing:'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=82&w=1200'
};
const BLOG_ARTICLES=[
{tag:'Lập trình',title:'Học C# mà cứ quên cú pháp? Thử cách học này trước',excerpt:'Không ít người mới học C# rơi vào cảnh xem xong một bài thì thấy hiểu, nhưng mở Visual Studio lên lại không biết bắt đầu từ đâu. Vấn đề thường không nằm ở trí nhớ mà ở cách mình luyện tập.',time:'6 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'ASP.NET Core',title:'REST API không khó, khó là học sai thứ tự',excerpt:'Routing, Controller, DI, EF Core, JWT… nhìn qua rất nhiều thứ. Nhưng khi xếp chúng theo đúng thứ tự, việc làm một API đầu tiên lại dễ hơn bạn nghĩ.',time:'8 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Kỹ năng học tập',title:'Một buổi tự học IT hiệu quả không cần kéo dài cả ngày',excerpt:'Thay vì ngồi trước máy tính từ sáng đến tối, hãy chia thời gian thành những phiên học ngắn và đặt một mục tiêu đủ nhỏ để chắc chắn hoàn thành.',time:'5 phút đọc',course:'csharp',image:COURSE_IMAGES.csharp},
{tag:'AI & Lập trình',title:'Dùng AI khi học code: lúc nào nên hỏi, lúc nào nên tự làm?',excerpt:'AI có thể giải thích lỗi rất nhanh, nhưng nếu câu trả lời lúc nào cũng đến trước lúc bạn suy nghĩ thì kỹ năng sẽ không theo kịp. Đây là cách dùng AI để học thay vì học hộ.',time:'9 phút đọc',course:'data',image:COURSE_IMAGES.data},
{tag:'Dự án',title:'Từ bài tập trên lớp đến project đầu tiên: bắt đầu thế nào?',excerpt:'Bạn không cần chờ đến khi biết hết công nghệ mới làm project. Một project nhỏ nhưng tự mình hoàn thành thường có giá trị hơn một danh sách dài những tutorial đã xem.',time:'7 phút đọc',course:'api',image:COURSE_IMAGES.api},
{tag:'Cơ sở dữ liệu',title:'Biết C# rồi có nên học SQL ngay không?',excerpt:'Nếu bạn đang đi theo backend, câu trả lời gần như là có. SQL giúp bạn hiểu dữ liệu thật sự nằm ở đâu và vì sao code phía trên phải làm như vậy.',time:'6 phút đọc',course:'api',image:COURSE_IMAGES.data}
];
const Q={csharp:[
{q:'Từ khóa nào dùng để khai báo một class trong C#?',o:['function','class','object','def'],a:1},
{q:'Kiểu dữ liệu nào lưu số nguyên?',o:['string','int','bool','char'],a:1},
{q:'Cách viết đúng để class Dog kế thừa class Animal?',o:['class Dog : Animal','class Dog extends Animal','class Dog inherits Animal','class Dog -> Animal'],a:0},
{q:'Tính chất OOP nào cho phép cùng một phương thức có hành vi khác nhau ở các lớp con?',o:['Đóng gói','Đa hình','Khai báo','Biên dịch'],a:1}]};

let D;try{D=JSON.parse(localStorage.getItem('edn'))}catch(e){}D=D||{users:[],me:null,en:{}};
const save=()=>{try{localStorage.setItem('edn',JSON.stringify(D))}catch(e){}};
const me=()=>D.users.find(u=>u.email===D.me);
const EN=()=>D.me?(D.en[D.me]=D.en[D.me]||{}):{};
const find=id=>C.find(c=>c.id===id);
const pct=c=>{const e=EN()[c.id];return e?Math.round(e.done.length/c.L.length*100):0};
const nextL=c=>{const e=EN()[c.id],k=c.L.findIndex((_,i)=>!e.done.includes(i));return k<0?0:k};
const passed=c=>{const e=EN()[c.id];return e&&e.done.length===c.L.length&&(!Q[c.id]||e.q>=70)};
const F0=()=>({q:'',cat:'',lvl:'',price:'',sort:'pop'});
let f=F0(),next='',qz={i:0,a:[],res:null},hook=null;
const go=p=>{location.hash=p},to=p=>location.hash==='#'+p?render():go(p);
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)}
const guard=(p)=>{next=p;toast('Vui lòng đăng nhập để tiếp tục');go('/login');return ''};

/* ---------- Views ---------- */
const card=c=>'<article class="lms-course-card"><a href="#/course/'+c.id+'" class="lms-course-image"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'" loading="lazy"><span class="lms-course-category">'+esc(c.cat)+'</span><span class="lms-course-badge">'+esc(c.tag||'Khóa học')+'</span></a><div class="lms-course-body"><p class="lms-course-category-text">'+esc(c.cat)+'</p><h3><a href="#/course/'+c.id+'">'+esc(c.t)+'</a></h3><p class="lms-course-instructor">'+esc(c.tc)+'</p><div class="lms-course-rating"><strong>★ '+c.r+'</strong><span>'+c.n.toLocaleString('vi-VN')+' học viên</span></div><div class="lms-course-meta"><span>▣ '+c.L.length+' bài</span><span>'+c.h+' giờ</span><span>'+esc(c.lvl)+'</span></div>'+(EN()[c.id]?'<div class="lms-course-progress"><div><span style="width:'+pct(c)+'%"></span></div><small>'+pct(c)+'% hoàn thành</small></div>':'<div class="lms-course-price-row"><strong>'+money(c.p)+'</strong><del>'+money(c.o)+'</del></div>')+'</div></article>';const nf=()=>'<div class="wrap page"><div class="empty">Không tìm thấy trang này. <a href="#/">Về trang chủ</a></div></div>';
const OUTCOMES={
"Lập trình":["Nắm vững kiến thức nền tảng và tư duy lập trình","Thực hành qua các bài học theo từng bước","Xây dựng nền tảng để tiếp tục học chuyên môn","Theo dõi tiến độ và hoàn thành quiz, chứng chỉ"],
"Data / AI":["Hiểu quy trình làm việc với dữ liệu từ cơ bản","Làm quen công cụ và phương pháp phân tích","Thực hành qua các bài tập và dự án mẫu","Xây dựng nền tảng để học AI nâng cao"],
"Thiết kế":["Nắm nguyên lý và quy trình thiết kế","Luyện wireframe và prototype từng bước","Áp dụng vào bài tập gần với thực tế","Hoàn thiện nền tảng để xây dựng portfolio"],
"Ngoại ngữ":["Cải thiện giao tiếp trong môi trường công việc","Luyện các tình huống thực tế thường gặp","Phát triển kỹ năng viết và thuyết trình","Tự tin hơn khi sử dụng tiếng Anh chuyên môn"],
"Marketing":["Hiểu các khái niệm quan trọng trong lĩnh vực","Học theo ví dụ và tình huống thực tế","Luyện tập theo từng mục tiêu nhỏ","Xây dựng nền tảng để học chuyên sâu"]
};

const home=()=>{
const popular=[...C].sort((a,b)=>b.n-a.n);
const hero=find('api')||C[0],secondary=find('csharp')||C[1];
const categoryLinks=CATS.map(cat=>'<a class="edn-topic-link" href="#/courses" data-a="cat" data-v="'+cat+'"><span class="edn-topic-title">'+esc(cat)+'</span><span class="edn-topic-arrow" aria-hidden="true">↗</span></a>').join('');
const marketCard=c=>'<article class="edn-market-course"><a class="edn-market-course-image" href="#/course/'+c.id+'"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'" loading="lazy"><span class="edn-market-course-tag">'+esc(c.tag||c.cat)+'</span><span class="edn-market-course-view">Xem khóa học ↗</span></a><div class="edn-market-course-copy"><p class="edn-market-course-category">'+esc(c.cat)+' <span>·</span> '+esc(c.lvl)+'</p><h3><a href="#/course/'+c.id+'">'+esc(c.t)+'</a></h3><p class="edn-market-course-instructor">'+esc(c.tc)+'</p><div class="edn-market-course-rating"><strong>★ '+c.r.toFixed(1)+'</strong><span>'+c.n.toLocaleString('vi-VN')+' học viên</span><span>· '+c.h+' giờ</span></div><div class="edn-market-course-price"><strong>'+money(c.p)+'</strong>'+(c.o>c.p?'<del>'+money(c.o)+'</del>':'')+'</div></div></article>';
const cards=popular.slice(0,6).map(marketCard).join('');
const articles=BLOG_ARTICLES.slice(0,3).map(a=>'<article class="edn-journal-item"><a class="edn-journal-image" href="#/blog"><img src="'+a.image+'" alt="'+esc(a.title)+'" loading="lazy"></a><div class="edn-journal-copy"><span>'+esc(a.tag)+'</span><h3><a href="#/blog">'+esc(a.title)+'</a></h3><p>'+esc(a.excerpt)+'</p><a class="edn-journal-link" href="#/blog">Đọc bài viết <b aria-hidden="true">↗</b></a></div></article>').join('');
return '<div class="edn-home-page">'+
'<section class="edn-hero"><div class="edn-hero-inner">'+
'<div class="edn-hero-copy"><span class="edn-overline"><i></i> HỌC ĐIỀU CÓ ÍCH · LÀM ĐƯỢC ĐIỀU LỚN</span><h1>Đừng chỉ xem thêm một bài học.<br><em>Hãy mở ra một khả năng mới.</em></h1><p>Khóa học thực tế giúp bạn biến điều đang học thành kỹ năng có thể dùng trong công việc và dự án của mình.</p><div class="edn-hero-actions"><a class="edn-button-primary" href="#/courses">Tìm khóa học của bạn <span aria-hidden="true">↗</span></a><a class="edn-button-text" href="#/categories">Khám phá theo chủ đề</a></div><div class="edn-hero-note"><span class="edn-hero-note-mark">E.</span><p><strong>Học theo mục tiêu của bạn.</strong><br><span>Xem rõ nội dung, lựa chọn lộ trình, tiến bộ theo nhịp riêng.</span></p></div></div>'+
'<div class="edn-hero-visual"><a href="#/course/'+hero.id+'" class="edn-hero-image-link"><img src="'+COURSE_IMAGES[hero.id]+'" alt="Khóa học '+esc(hero.t)+'" fetchpriority="high"><span class="edn-hero-image-shade"></span><span class="edn-hero-image-copy"><small>KHÓA HỌC ĐƯỢC GỢI Ý</small><strong>'+esc(hero.t)+'</strong><span>Khám phá nội dung <b aria-hidden="true">↗</b></span></span></a><div class="edn-hero-side-note"><span>GỢI Ý</span><div><strong>'+esc(secondary.cat)+' · '+esc(secondary.lvl)+'</strong><p>'+esc(secondary.t)+'</p><a href="#/course/'+secondary.id+'">Xem khóa học ↗</a></div></div><span class="edn-hero-orbit edn-hero-orbit-one"></span><span class="edn-hero-orbit edn-hero-orbit-two"></span></div>'+
'</div></section>'+
'<section id="cats" class="edn-topic-strip"><div class="edn-public-container"><div class="edn-topic-intro"><span>ĐIỂM BẮT ĐẦU</span><strong>Bạn muốn học gì?</strong></div><nav class="edn-topic-links" aria-label="Khám phá chủ đề">'+categoryLinks+'</nav></div></section>'+
'<section class="edn-popular-section"><div class="edn-public-container"><div class="edn-editorial-heading"><div><span class="edn-overline">ĐƯỢC CHỌN CHO HÀNH TRÌNH CỦA BẠN</span><h2>Khóa học nổi bật<span class="edn-heading-period">.</span></h2><p>Nội dung rõ ràng, người dạy cụ thể, mức học phí hiển thị trước khi bạn quyết định.</p></div><a href="#/courses" class="edn-editorial-link">Xem tất cả khóa học <b aria-hidden="true">↗</b></a></div><div class="edn-market-course-grid">'+cards+'</div></div></section>'+
'<section class="edn-purpose-section"><div class="edn-public-container edn-purpose-layout"><div class="edn-purpose-intro"><span class="edn-overline">KHÔNG CÓ MỘT LỘ TRÌNH CHUNG CHO TẤT CẢ</span><h2>Bắt đầu từ điều bạn muốn <em>làm được.</em></h2><p>Từ dòng code đầu tiên đến một dự án hoàn chỉnh, hãy chọn nội dung phù hợp với bước tiếp theo của bạn.</p><a href="#/courses">Tìm hướng đi của bạn <b aria-hidden="true">↗</b></a></div><div class="edn-purpose-list">'+CATS.map((cat,i)=>'<a href="#/courses" data-a="cat" data-v="'+cat+'" class="edn-purpose-row"><span class="edn-purpose-index">0'+(i+1)+'</span><span class="edn-purpose-name">'+esc(cat)+'</span><span class="edn-purpose-count">'+C.filter(c=>c.cat===cat).length+' khóa học</span><b aria-hidden="true">↗</b></a>').join('')+'</div></div></section>'+
'<section class="edn-method-section"><div class="edn-public-container"><div class="edn-method-heading"><span class="edn-overline">TRẢI NGHIỆM HỌC TẬP</span><h2>Ít nhiễu hơn. Nhiều tiến bộ hơn.</h2></div><div class="edn-method-columns"><article><span class="edn-method-number">01</span><h3>Biết mình sắp học gì</h3><p>Chương trình và bài học được trình bày trước để bạn hiểu khóa học có phù hợp hay không.</p></article><article><span class="edn-method-number">02</span><h3>Học theo nhịp của bạn</h3><p>Quay lại khóa học, đánh dấu bài đã học và tiếp tục từ nơi mình dừng lại.</p></article><article><span class="edn-method-number">03</span><h3>Đưa kiến thức vào thực tế</h3><p>Chọn chủ đề sát với dự án, công việc hoặc kỹ năng bạn muốn phát triển.</p></article></div></div></section>'+
'<section class="edn-journal-section"><div class="edn-public-container"><div class="edn-editorial-heading"><div><span class="edn-overline">GÓC KIẾN THỨC</span><h2>Ý tưởng cho bước tiếp theo<span class="edn-heading-period">.</span></h2><p>Bài viết chia sẻ kinh nghiệm và lời giải cho những câu hỏi thường gặp khi tự học.</p></div><a href="#/blog" class="edn-editorial-link">Đến góc học tập <b aria-hidden="true">↗</b></a></div><div class="edn-journal-grid">'+articles+'</div></div></section>'+
'</div>';
};const grp=(t,k,o)=>`<div><h4>${t}</h4>${o.map(x=>Array.isArray(x)?x:[x,x||'Tất cả']).map(([v,l])=>`<label><input type="radio" name="${k}" data-f="${k}" value="${v}" ${f[k]===v?'checked':''}> ${l}</label>`).join('')}</div>`;
const list=()=>{const root=$('#list');if(!root)return;let rows=C.filter(c=>{const q=(f.q||'').trim().toLowerCase();return (!q||[c.t,c.cat,c.tc,c.lvl].some(v=>String(v).toLowerCase().includes(q)))&&(!f.cat||c.cat===f.cat)});if(f.sort==='lo')rows.sort((a,b)=>a.p-b.p);else if(f.sort==='hi')rows.sort((a,b)=>b.p-a.p);else rows.sort((a,b)=>b.n-a.n);root.innerHTML=rows.map(card).join('');const count=$('#cnt');if(count)count.textContent=rows.length;};const courses=()=>{hook=list;return `<div class="wrap page cio-courses-page">
<div class="cio-page-head">
  <div><span class="cio-eyebrow">EDUNEXT</span><h1>Khóa học</h1><p>Khám phá các khóa học và chọn nội dung phù hợp với mục tiêu của bạn.</p></div>
  <a class="btn btn-p cio-create-btn" href="#/categories">Danh mục</a>
</div>
<div class="cio-course-toolbar">
  <div class="cio-search-local"><span>⌕</span><input data-f="q" value="${esc(f.q)}" placeholder="Tìm khóa học" aria-label="Tìm khóa học"></div>
  <div class="cio-toolbar-right"><select data-f="sort" aria-label="Sắp xếp">${[['pop','Phổ biến'],['lo','Giá thấp'],['hi','Giá cao']].map(([v,l])=>'<option value="'+v+'" '+(f.sort===v?'selected':'')+'>'+l+'</option>').join('')}</select></div>
</div>
<div class="cio-filter-row"><button class="cio-filter-chip '+(!f.cat?'active':'')+'" data-a="clear">Tất cả</button>${CATS.map(x=>'<button class="cio-filter-chip '+(f.cat===x?'active':'')+'" data-a="cat" data-v="'+x+'">'+x+'</button>').join('')}</div>
<div class="cio-count-row"><span id="cnt"></span><span>Khóa học được chọn</span></div>
<div class="grid cio-course-grid" id="list"></div>
</div>`};const detail=id=>{
const c=find(id);if(!c)return nf();
const e=EN()[id],outcomes=OUTCOMES[c.cat]||OUTCOMES['Lập trình'];
const lessonRows=c.L.map((lesson,i)=>'<div class="edn-curriculum-row"><span class="edn-curriculum-number">'+String(i+1).padStart(2,'0')+'</span><span class="edn-curriculum-play" aria-hidden="true">▶</span><div class="edn-curriculum-copy"><b>'+esc(lesson)+'</b><small>Video bài học</small></div><span class="edn-curriculum-duration">'+(c.s&&c.s[i+1]!==undefined?Math.max(4,Math.round((c.s[i+1]-(c.s[i]||0))/60))+' phút':'Bài học')+'</span></div>').join('');
const oldPrice=c.o>c.p?'<del>'+money(c.o)+'</del>':'';
const discount=c.o>c.p?Math.round((1-c.p/c.o)*100):0;
return `<div class="edn-course-detail-page">
<section class="edn-course-hero">
<div class="wrap edn-course-hero-inner">
<div class="edn-course-intro">
<nav class="edn-course-breadcrumb" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span>›</span><a href="#/courses">Khóa học</a><span>›</span><a href="#/categories">${esc(c.cat)}</a></nav>
<div class="edn-course-eyebrow">${esc(c.cat)} <span>·</span> ${esc(c.lvl)}</div>
<h1>${esc(c.t)}</h1>
<p class="edn-course-subtitle">${esc(c.t)} — học theo từng bước, thực hành với nội dung bài học và theo dõi tiến độ ngay trong EduNext.</p>
<div class="edn-course-tag-row"><span class="edn-course-tag">${esc(c.tag||'Khóa học nổi bật')}</span><span class="edn-course-language">◉ Tiếng Việt</span></div>
<p class="edn-course-instructor-line">Được tạo bởi <a href="#/about">${esc(c.tc)}</a></p>
<div class="edn-course-date-row"><span>↻ Cập nhật gần đây</span><span>◷ ${c.h} giờ nội dung</span></div>
<div class="edn-course-rating-row"><strong>${c.r.toFixed(1)}</strong><span class="edn-course-stars" aria-label="${c.r} trên 5 sao">★★★★★</span><a href="#course-curriculum">${c.n.toLocaleString('vi-VN')} lượt quan tâm</a><span>·</span><span>${c.L.length} bài học</span></div>
</div>
<aside class="edn-course-buy-card" aria-label="Thông tin mua khóa học">
<button type="button" class="edn-course-preview" data-a="preview" data-v="${id}" aria-label="Xem trước khóa học ${esc(c.t)}">
<img src="${COURSE_IMAGES[c.id]}" alt="Ảnh xem trước khóa học ${esc(c.t)}">
<span class="edn-preview-shade"></span><span class="edn-preview-play" aria-hidden="true">▶</span><strong>Xem trước khóa học này</strong>
</button>
<div class="edn-course-buy-content">
<div class="edn-course-price-line"><strong>${money(c.p)}</strong>${oldPrice}</div>
${discount?'<div class="edn-course-discount">Tiết kiệm '+discount+'%</div>':''}
<p class="edn-course-purchase-note">${e?'Bạn đã có quyền truy cập khóa học này.':'Mua một lần, học theo tiến độ của bạn.'}</p>
${e?'<div class="cio-owned">✓ Bạn đã mua khóa học này</div><a class="btn btn-p w edn-course-buy-button" href="#/learn/'+id+'/'+nextL(c)+'">Tiếp tục học</a>':'<button type="button" class="btn btn-p w edn-course-buy-button" data-a="enroll" data-v="'+id+'">Mua khóa học</button>'}
<div class="edn-course-money-note">Thanh toán một lần · Không tự động gia hạn</div>
<div class="edn-course-includes"><strong>Khóa học bao gồm:</strong><span>✓ Truy cập toàn bộ ${c.L.length} bài học</span><span>✓ Lưu tiến độ học tập</span><span>✓ Quiz và chứng chỉ khi đủ điều kiện</span></div>
</div>
</aside>
</div>
</section>
<div class="wrap edn-course-content-grid">
<main class="edn-course-main">
<section class="edn-course-outcomes" aria-labelledby="edn-outcomes-title">
<h2 id="edn-outcomes-title">Bạn sẽ học được gì</h2>
<div class="edn-course-outcomes-grid">${outcomes.map(item=>'<div class="edn-course-outcome"><span>✓</span><p>'+esc(item)+'</p></div>').join('')}</div>
</section>
<section class="edn-course-curriculum" id="course-curriculum">
<div class="edn-course-section-heading"><div><h2>Nội dung bài học</h2><p>${c.L.length} bài học · Khoảng ${c.h} giờ nội dung</p></div><span class="edn-curriculum-total">${c.L.length} bài</span></div>
<div class="edn-curriculum-list">${lessonRows}</div>
<p class="edn-curriculum-footnote">Bạn có thể xem trước nội dung khóa học trước khi mua. Bài học đầy đủ sẽ mở sau khi đăng ký.</p>
</section>
<section class="edn-course-about">
<h2>Về khóa học này</h2>
<p>Khóa học <strong>${esc(c.t)}</strong> được chia thành từng bài nhỏ để bạn dễ theo dõi. Xem chương trình học, chọn khóa học phù hợp với mục tiêu và tiếp tục học theo thời gian của bạn.</p>
<div class="edn-course-facts"><div><small>Lĩnh vực</small><strong>${esc(c.cat)}</strong></div><div><small>Cấp độ</small><strong>${esc(c.lvl)}</strong></div><div><small>Thời lượng</small><strong>${c.h} giờ</strong></div></div>
</section>
<section class="edn-course-instructor-card">
<div class="edn-course-instructor-avatar">${esc(ini(c.tc))}</div><div><span class="edn-course-instructor-kicker">GIẢNG VIÊN</span><h3>${esc(c.tc)}</h3><p>Giảng viên khóa học ${esc(c.cat)} trên EduNext.</p></div>
</section>
<section class="edn-related-courses"><div class="edn-course-section-heading"><div><h2>Khóa học có thể bạn quan tâm</h2><p>Khám phá thêm các chủ đề khác trên EduNext.</p></div><a href="#/courses">Tất cả khóa học →</a></div><div class="grid cio-course-grid">${C.filter(x=>x.id!==c.id).slice(0,3).map(card).join('')}</div></section>
</main>
<div class="edn-course-right-space" aria-hidden="true"></div>
</div>
</div>`;
};const checkout=id=>{const c=find(id);if(!c)return nf();if(!D.me)return guard('/checkout/'+id);if(EN()[id]){go('/course/'+id);return ''}
const u=me(),discount=c.o>c.p?c.o-c.p:0,orderId='EDN-'+Date.now().toString().slice(-8);
return `<div class="wrap page"><div class="bc"><a href="#/courses">Khóa học</a> / Thanh toán</div><div class="checkout-grid"><section><h1>Thanh toán khóa học</h1><p class="muted">Học ngay thông tin trước khi xác nhận đăng ký.</p><div class="box checkout-box"><h2>Thông tin học viên</h2><div class="checkout-user"><div class="av">${ini(u.name)}</div><div><b>${esc(u.name)}</b><span>${esc(u.email)}</span></div></div></div><div class="box checkout-box"><h2>Phương thức thanh toán</h2><label class="pay-option"><input type="radio" name="payment" value="bank" checked><span><b>Chuyển khoản ngân hàng</b><small>Thanh toán qua tài khoản ngân hàng — bản demo.</small></span></label><label class="pay-option"><input type="radio" name="payment" value="wallet"><span><b>Ví điện tử</b><small>Thanh toán nhanh bằng ví điện tử — bản demo.</small></span></label><label class="pay-option"><input type="radio" name="payment" value="card"><span><b>Thẻ ngân hàng</b><small>Visa / Mastercard / ATM — bản demo.</small></span></label><div class="pay-note">Đây là giao diện mô phỏng. Chưa kết nối cổng thanh toán thật.</div></div></section><aside class="box checkout-summary"><h2>Đơn hàng</h2><div class="checkout-course"><div class="thumb ${c.c}"><b>${c.cat}</b></div><div><span class="cat">${c.cat}</span><h3>${c.t}</h3><p class="muted">${c.h} giờ · ${c.L.length} bài · ${c.lvl}</p></div></div><div class="sum-row"><span>Giá niêm yết</span><del>${money(c.o)}</del></div><div class="sum-row"><span>Ưu đãi</span><strong class="discount">-${money(discount)}</strong></div><div class="sum-total"><span>Tổng thanh toán</span><b>${money(c.p)}</b></div><button class="btn btn-p w" data-a="pay" data-v="${id}">Xác nhận thanh toán</button><p class="checkout-safe">Mã đơn hàng: ${orderId}<br>Thanh toán an toàn trong bản demo.</p></aside></div></div>`;
};

const learn=(id,i)=>{
  const c=find(id),e=EN()[id];
  if(!c)return nf();
  if(!D.me)return guard('/learn/'+id+'/'+i);
  if(!e){toast('Hãy mua khóa học trước');go('/course/'+id);return ''}
  i=Math.min(Math.max(+i,0),c.L.length-1);
  const d=e.done.includes(i),all=e.done.length===c.L.length;
  const videoId=Array.isArray(c.v)?c.v[i]:c.v;
  const video=videoId
    ? '<iframe src="https://www.youtube-nocookie.com/embed/'+videoId+'?rel=0&modestbranding=1&playsinline=1" title="'+esc(c.L[i])+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    : '<div>Video bài '+(i+1)+': '+esc(c.L[i])+'</div>';

  const prev=i>0?'<a class="btn btn-g" href="#/learn/'+id+'/'+(i-1)+'">← Bài trước</a>':'';
  const doneBtn='<button class="btn '+(d?'btn-g':'btn-p')+'" data-a="done" data-v="'+id+','+i+'">'+(d?'Bỏ đánh dấu':'Đánh dấu đã học')+'</button>';
  const next=i<c.L.length-1?'<a class="btn btn-g" href="#/learn/'+id+'/'+(i+1)+'">Bài tiếp →</a>':'';
  const final=all?'<a class="btn btn-p" href="#/'+(Q[id]&&!(e.q>=70)?'quiz':'cert')+'/'+id+'">'+(Q[id]&&!(e.q>=70)?'Làm quiz':'Xem chứng chỉ')+'</a>':'';

  return `<div class="cio-learn-shell">
<div class="cio-learn-top"><a href="#/dashboard">← Trang học tập</a><strong>${esc(c.t)}</strong><span>${pct(c)}% hoàn thành</span></div>
<div class="cio-learn-layout">
<aside class="cio-lesson-sidebar">
  <div class="cio-lesson-head">
    <span>${esc(c.cat)}</span>
    <h2>${esc(c.t)}</h2>
    <div class="cio-progress-line"><span style="width:${pct(c)}%"></span></div>
  </div>
  <div class="cio-lesson-list">
    ${c.L.map((l,k)=>'<a class="'+(k===i?'active ':'')+(e.done.includes(k)?'done':'')+'" href="#/learn/'+id+'/'+k+'"><span>'+String(k+1).padStart(2,'0')+'</span><b>'+esc(l)+'</b><small>'+(e.done.includes(k)?'Đã học':'Bài học')+'</small></a>').join('')}
  </div>
</aside>
<main class="cio-learn-content">
  <div class="cio-video-wrap">${video}</div>
  <div class="cio-lesson-content">
    <div class="cio-lesson-heading">
      <div><span class="cio-eyebrow">BÀI ${i+1}/${c.L.length}</span><h1>${esc(c.L[i])}</h1></div>
      <span class="cio-lesson-badge">${d?'Đã hoàn thành':'Đang học'}</span>
    </div>
    <p>Nội dung bài học tập trung vào <strong>${esc(c.L[i])}</strong>. Xem video và đánh dấu hoàn thành để cập nhật tiến độ.</p>
    <div class="cio-lesson-actions">${prev}${doneBtn}${next}${final}</div>
  </div>
</main>
</div>
</div>`;
};const quiz=id=>{const c=find(id),e=EN()[id];if(!c||!Q[id])return nf();if(!D.me)return guard('/quiz/'+id);if(!e){go('/course/'+id);return ''}
if(e.done.length<c.L.length){toast('Hãy học hết các bài trước khi làm kiểm tra');go('/learn/'+id+'/'+nextL(c));return ''}
qz={i:0,a:[],res:null};hook=()=>qr(id);return `<div class="wrap page narrow"><div class="bc"><a href="#/course/${id}">${c.t}</a> / Bài kiểm tra</div><h1>Bài kiểm tra cuối khóa</h1><div class="box" id="qz"></div></div>`};
function qr(id){const qs=Q[id],box=$('#qz');if(qz.res!==null){const ok=qz.res>=70;box.innerHTML=`<div class="res"><div class="score">${qz.res}/100</div><h2>${ok?'Bạn đã đạt bài kiểm tra':'Chưa đạt, cần tối thiểu 70 điểm'}</h2>${ok?`<a class="btn btn-p" href="#/cert/${id}">Hoàn thành</a>`:''}<button class="btn btn-g" data-a="qretry" data-v="${id}">Làm lại</button></div>`;return}
const q=qs[qz.i];box.innerHTML=`<div class="qh"><span>Câu ${qz.i+1}/${qs.length}</span></div><div class="bar"><span style="width:${(qz.i+1)/qs.length*100}%"></span></div><div class="qq">${q.q}</div>${q.o.map((o,k)=>`<button class="opt ${qz.a[qz.i]===k?'sel':''}" data-a="opt" data-v="${k},${id}">${o}</button>`).join('')}<div class="qf"><button class="btn btn-g" data-a="qgo" data-v="-1,${id}" ${qz.i?'':'disabled'}>Câu trước</button><button class="btn btn-p" data-a="qgo" data-v="1,${id}">${qz.i===qs.length-1?'Nộp bài':'Câu tiếp'}</button></div>`}

const certificates=()=>{if(!D.me)return guard('/certificates');const u=me(),earned=C.filter(c=>passed(c));return `<div class="wrap page cio-student-page cio-certificates-page">
<div class="cio-page-head"><div><span class="cio-eyebrow">CHỨNG CHỈ</span><h1>Chứng chỉ của bạn</h1><p>Các khóa học bạn đã hoàn thành đầy đủ và đủ điều kiện nhận chứng chỉ.</p></div><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>
<div class="cio-stat-grid"><div><span>Đã cấp</span><b>${earned.length}</b></div><div><span>Học viên</span><b>1</b></div><div><span>Tên tài khoản</span><b>${esc(u.name)}</b></div><div><span>Trạng thái</span><b>${earned.length?'Đủ điều kiện':'Đang học'}</b></div></div>
${earned.length?`<section class="cio-dashboard-grid cio-certificate-grid">${earned.map(c=>{const code='EDU-'+new Date().getFullYear()+'-'+String(Math.abs([...(u.email+c.id)].reduce((h,ch)=>(h*31+ch.charCodeAt(0))|0,7))%1000000).padStart(6,'0');return '<article class="cio-certificate-card"><div class="cio-certificate-mark">E</div><div><span class="cio-card-status">ĐÃ CẤP</span><h3>${esc(c.t)}</h3><p>${esc(u.name)} · Mã ${code}</p><div class="cio-certificate-foot"><span>Hoàn thành 100%</span><a class="btn btn-g btn-s" href="#/cert/${c.id}">Xem chứng chỉ</a></div></div></article>'}).join('')}</section>`:`<div class="cio-empty"><h3>Chưa có chứng chỉ</h3><p>Hoàn thành toàn bộ bài học và quiz cuối khóa để nhận chứng chỉ.</p><a class="btn btn-p" href="#/dashboard">Về trang học tập</a></div>`}
</div>`;};const cert=id=>{const c=find(id);if(!c)return nf();if(!D.me)return guard('/cert/'+id);if(!EN()[id]){go('/course/'+id);return ''}
if(!passed(c)){toast('Hoàn thành khóa học và bài kiểm tra để nhận chứng chỉ');go('/learn/'+id+'/'+nextL(c));return ''}
const u=me(),code='EDU-'+new Date().getFullYear()+'-'+String(Math.abs([...(u.email+id)].reduce((h,ch)=>(h*31+ch.charCodeAt(0))|0,7))%1000000).padStart(6,'0');
return `<div class="wrap page narrow"><div class="bc"><a href="#/dashboard">Của tôi</a> / Chứng chỉ</div><div class="cert"><div class="mark">E</div><p class="muted">Chứng chỉ hoàn thành khóa học</p><h2>${c.t}</h2><p class="muted">Cấp cho</p><div class="cname">${esc(u.name)}</div><div class="cmeta"><div><small class="muted">Ngày cấp</small><br><b>${new Date().toLocaleDateString('vi-VN')}</b></div><div><small class="muted">Mã chứng chỉ</small><br><b>${code}</b></div></div></div><div class="acts"><button class="btn btn-p" data-a="print">In hoặc lưu PDF</button><a class="btn btn-g" href="#/dashboard">Về trang cá nhân</a></div></div>`};

const field=(n,l,t)=>`<div class="fg"><label for="f-${n}">${l}</label><input id="f-${n}" name="${n}" type="${t}" autocomplete="${n==='pw'?'current-password':n}"></div>`;
const auth=m=>{if(D.me){go('/dashboard');return ''}const r=m==='register';return `<div class="auth"><form class="box ac" data-form="${m}" novalidate><h2>${r?'Tạo tài khoản miễn phí':'Đăng nhập'}</h2>${r?field('name','Họ và tên','text'):''}${field('email','Email','email')}${field('pw','Mật khẩu (tối thiểu 6 ký tự)','password')}${r?'<label class="chk"><input type="checkbox" name="ok"> Tôi đồng ý với điều khoản sử dụng</label>':''}<p class="err" id="err" role="alert"></p><button class="btn btn-p w">${r?'Tạo tài khoản':'Đăng nhập'}</button><p class="sw">${r?'Đã có tài khoản? <a href="#/login">Đăng nhập</a>':'Chưa có tài khoản? <a href="#/register">Tạo tài khoản</a>'}</p></form></div>`};



const teacher=()=>{if(!D.me)return guard('/teacher');const teacherName='Nguyễn Văn Minh',owned=C.filter(c=>c.tc===teacherName),courses=owned.length?owned:[C[0]],students=[...new Set(courses.flatMap(c=>Object.keys(D.en||{}).filter(email=>D.en[email]&&D.en[email][c.id])))],orders=(D.orders||[]).filter(o=>courses.some(c=>c.id===o.courseId));const first=courses[0];return `<div class="edn-console-layout"><aside class="edn-console-sidebar"><a class="edn-console-brand" href="#/"><span>E</span><strong>EduNext <small>STUDIO</small></strong></a><div class="edn-console-label">KHÔNG GIAN GIẢNG DẠY</div><nav><a href="#/admin"><span>▦</span> Quản lý khóa học</a><a class="is-active" href="#/teacher"><span>▤</span> Trình tạo khóa học</a><a href="#/dashboard"><span>◷</span> Trang học tập</a></nav><div class="edn-console-sidebar-bottom"><a href="#/"><span>↗</span> Xem website công khai</a><button type="button" data-a="logout"><span>↪</span> Đăng xuất</button></div></aside><main class="edn-console-main"><div class="wrap page cio-builder">
<div class="cio-builder-head"><div><a href="#/courses" class="cio-back">← Courses</a><span class="cio-eyebrow">COURSE BUILDER</span><h1>${esc(first.t)}</h1></div><div><button class="btn btn-g" data-a="teacher-demo">Preview</button><button class="btn btn-p" data-a="teacher-demo">Publish</button></div></div>
<div class="cio-builder-stats"><div><span>Sections</span><b>4</b></div><div><span>Lessons</span><b>${first.L.length}</b></div><div><span>Quizzes</span><b>${Q[first.id]?1:0}</b></div><div><span>Students</span><b>${students.length}</b></div></div>
<div class="cio-builder-grid">
<section class="cio-builder-main"><div class="cio-panel-head"><div><h2>Content</h2><p>Quản lý nội dung khóa học và bài học.</p></div><button class="btn btn-p btn-s" data-a="teacher-demo">Thêm nội dung</button></div>
<div class="cio-builder-section"><div class="cio-section-bar"><b>Section 01 · Nền tảng</b><span>+</span></div>${first.L.slice(0,3).map((l,i)=>'<div class="cio-builder-item"><span>'+String(i+1).padStart(2,'0')+'</span><div><b>'+l+'</b><small>Video lesson</small></div><span>⋮</span></div>').join('')}</div>
<div class="cio-builder-section"><div class="cio-section-bar"><b>Section 02 · Thực hành</b><span>+</span></div>${first.L.slice(3).map((l,i)=>'<div class="cio-builder-item"><span>'+String(i+4).padStart(2,'0')+'</span><div><b>'+l+'</b><small>Video lesson</small></div><span>⋮</span></div>').join('')}${Q[first.id]?'<div class="cio-builder-item quiz-item"><span>Q</span><div><b>Quiz cuối khóa</b><small>'+Q[first.id].length+' câu hỏi</small></div><span>⋮</span></div>':''}</div></section>
<aside class="cio-builder-side"><div class="cio-builder-side-card"><span class="cio-eyebrow">COURSE INFO</span><h2>Thông tin khóa học</h2><div><small>Giá</small><b>${money(first.p)}</b></div><div><small>Thời lượng</small><b>${first.h} giờ</b></div><div><small>Đánh giá</small><b>★ ${first.r}</b></div><div><small>Trạng thái</small><em>Published</em></div><a class="btn btn-g w" href="#/course/${first.id}">Xem khóa học</a></div><div class="cio-builder-side-card"><span class="cio-eyebrow">STUDENTS</span><h2>Học viên</h2><b class="cio-big-number">${students.length}</b><p>${orders.length} đơn hàng trong dữ liệu demo.</p></div></aside>
</div></div></main></div>`};;const dash=()=>{if(!D.me)return guard('/dashboard');const u=me(),mine=C.filter(c=>EN()[c.id]),completed=mine.filter(c=>pct(c)===100),active=mine.filter(c=>pct(c)<100);
return `<div class="wrap page cio-student-page">
<div class="cio-page-head"><div><span class="cio-eyebrow">TRANG HỌC TẬP</span><h1>Xin chào, ${esc(u.name)}</h1><p>Theo dõi các khóa học bạn đã mua và tiếp tục bài học đang dang dở.</p></div><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>
<div class="cio-stat-grid"><div><span>Đang học</span><b>${active.length}</b></div><div><span>Hoàn thành</span><b>${completed.length}</b></div><div><span>Bài đã học</span><b>${mine.reduce((s,c)=>s+EN()[c.id].done.length,0)}</b></div><div><span>Đơn hàng</span><b>${(D.orders||[]).filter(o=>o.email===D.me).length}</b></div></div>
<div class="cio-tabs"><span class="active">Đang học (${active.length})</span><span>Hoàn thành (${completed.length})</span></div>
${active.length?'<section class="cio-dashboard-grid">'+active.map(c=>'<article class="cio-learning-card"><a href="#/learn/'+c.id+'/'+nextL(c)+'" class="cio-learning-image"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'"></a><div class="cio-learning-body"><div class="cio-card-status">ĐANG HỌC</div><h3><a href="#/learn/'+c.id+'/'+nextL(c)+'">'+c.t+'</a></h3><p>'+c.cat+' · '+c.L.length+' bài · '+c.h+' giờ</p><div class="cio-progress-line"><span style="width:'+pct(c)+'%"></span></div><div class="cio-learning-foot"><span>'+pct(c)+'% hoàn thành</span><a href="#/learn/'+c.id+'/'+nextL(c)+'">Tiếp tục →</a></div></div></article>').join('')+'</section>':'<div class="cio-empty"><h3>Chưa có khóa học đang học</h3><p>Mua một khóa học để nó xuất hiện trong Trang học tập.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>'}
${completed.length?'<section class="cio-completed-section"><div class="cio-section-title"><h2>Đã hoàn thành</h2><a href="#/courses">Khám phá thêm →</a></div><div class="grid cio-course-grid">'+completed.map(card).join('')+'</div></section>':''}
</div>`};const admin=()=>{window.location.assign(document.body.dataset.adminUrl||'/wp-admin/');return '<div class="edn-admin-redirect" role="status">Đang chuyển đến khu vực quản trị WordPress…</div>'};const blogPage=()=>`<div class="wrap page blog-page">
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
