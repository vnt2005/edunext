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
const card=c=>'<article class="lms-course-card"><a href="#/course/'+c.id+'" class="lms-course-image"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'" loading="lazy"><span class="lms-course-category">'+esc(c.cat)+'</span></a><div class="lms-course-body"><h3><a href="#/course/'+c.id+'">'+c.t+'</a></h3><p class="lms-course-category-text">'+esc(c.cat)+'</p><div class="lms-course-meta"><span>▣ '+c.L.length+' bài</span><span>'+c.h+' giờ</span></div>'+(EN()[c.id]?'<div class="lms-course-progress"><div><span style="width:'+pct(c)+'%"></span></div><small>'+pct(c)+'% hoàn thành</small></div>':'<div class="lms-course-price">'+money(c.p)+'<del>'+money(c.o)+'</del></div>')+'</div></article>';const nf=()=>'<div class="wrap page"><div class="empty">Không tìm thấy trang này. <a href="#/">Về trang chủ</a></div></div>';
const OUTCOMES={
"Lập trình":["Nắm vững kiến thức nền tảng và tư duy lập trình","Thực hành qua các bài học theo từng bước","Xây dựng nền tảng để tiếp tục học chuyên môn","Theo dõi tiến độ và hoàn thành quiz, chứng chỉ"],
"Data / AI":["Hiểu quy trình làm việc với dữ liệu từ cơ bản","Làm quen công cụ và phương pháp phân tích","Thực hành qua các bài tập và dự án mẫu","Xây dựng nền tảng để học AI nâng cao"],
"Thiết kế":["Nắm nguyên lý và quy trình thiết kế","Luyện wireframe và prototype từng bước","Áp dụng vào bài tập gần với thực tế","Hoàn thiện nền tảng để xây dựng portfolio"],
"Ngoại ngữ":["Cải thiện giao tiếp trong môi trường công việc","Luyện các tình huống thực tế thường gặp","Phát triển kỹ năng viết và thuyết trình","Tự tin hơn khi sử dụng tiếng Anh chuyên môn"],
"Marketing":["Hiểu các khái niệm quan trọng trong lĩnh vực","Học theo ví dụ và tình huống thực tế","Luyện tập theo từng mục tiêu nhỏ","Xây dựng nền tảng để học chuyên sâu"]
};

const home=()=>{const popular=[...C].sort((a,b)=>b.n-a.n),owned=C.filter(x=>EN()[x.id]).slice(0,4),avgRating=(C.reduce((sum,c)=>sum+c.r,0)/C.length).toFixed(1);
const categoryItems=[
{name:'Lập trình',desc:'Xây dựng kỹ năng và dự án thực tế',image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=85&w=900'},
{name:'Data / AI',desc:'Khám phá dữ liệu và trí tuệ nhân tạo',image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=900'},
{name:'Thiết kế',desc:'Biến ý tưởng thành trải nghiệm đẹp',image:'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=85&w=900'},
{name:'Ngoại ngữ',desc:'Tự tin giao tiếp trong công việc',image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=85&w=900'},
{name:'Marketing',desc:'Tiếp cận khách hàng và phát triển thương hiệu',image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=900'}
];
const categoryMarkup=categoryItems.map(x=>'<button class="edn-category-card" type="button" data-a="cat" data-v="'+x.name+'"><span class="edn-category-photo"><img src="'+x.image+'" alt="'+x.name+'" loading="lazy"><span class="edn-category-arrow">↗</span></span><span class="edn-category-name">'+x.name+'</span><span class="edn-category-desc">'+x.desc+'</span></button>').join('');
const stories=[
{image:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=85&w=700',label:'HỌC TẬP',title:'Từng bước làm chủ kỹ năng mới'},
{image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=85&w=700',label:'THỰC HÀNH',title:'Biến kiến thức thành sản phẩm'},
{image:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=85&w=700',label:'PHÁT TRIỂN',title:'Học theo nhịp độ của riêng bạn'},
{image:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=700',label:'CỘNG ĐỒNG',title:'Cùng nhau tiến bộ mỗi ngày'}
];
return `<div class="lms-store-home edn-home">
<section class="edn-hero">
  <div class="edn-hero-copy">
    <span class="edn-hero-eyebrow"><span>✦</span> HỌC CÙNG CHUYÊN GIA</span>
    <h1>Học mọi lúc, mọi nơi.<br><span>Kiến tạo tương lai.</span></h1>
    <p>Khám phá kiến thức mới, phát triển kỹ năng và tự tin tiến xa hơn với những khóa học phù hợp dành cho bạn.</p>
    <form class="edn-hero-search" data-form="search">
      <span aria-hidden="true">⌕</span>
      <input name="q" type="search" placeholder="Tìm khóa học của bạn..." aria-label="Tìm khóa học">
      <button type="submit">Tìm kiếm <span>→</span></button>
    </form>
    <div class="edn-hero-actions"><a class="edn-hero-primary" href="#/courses">Khám phá khóa học <span>↗</span></a><a class="edn-hero-secondary" href="#/categories">Xem danh mục</a></div>
    <div class="edn-hero-trust"><span class="edn-trust-stars">★★★★★</span><span><strong>${avgRating}/5</strong> điểm đánh giá khóa học</span><i></i><span><strong>${C.length}</strong> khóa học để khám phá</span></div>
  </div>
  <div class="edn-hero-visual" aria-label="Không gian học tập">
    <div class="edn-hero-orbit edn-hero-orbit-one"></div><div class="edn-hero-orbit edn-hero-orbit-two"></div>
    <span class="edn-hero-spark edn-spark-one">✦</span><span class="edn-hero-spark edn-spark-two">✳</span>
    <img class="edn-hero-person" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=90&w=1000" alt="Học viên đang học tập" fetchpriority="high">
    <div class="edn-floating-stat edn-floating-rating"><strong>${avgRating}</strong><span class="edn-stat-stars">★★★★★</span><small>Đánh giá khóa học</small></div>
    <div class="edn-floating-stat edn-floating-topics"><span class="edn-topic-symbol">✦</span><div><strong>${CATS.length} chủ đề</strong><small>Khám phá lĩnh vực bạn yêu thích</small></div></div>
  </div>
</section>
<section id="cats" class="edn-categories-section">
  <div class="edn-section-heading"><div><span class="edn-section-kicker">KHÁM PHÁ ĐIỀU BẠN YÊU THÍCH</span><h2>Khám phá danh mục nổi bật</h2><p>Bắt đầu từ lĩnh vực phù hợp với mục tiêu của bạn.</p></div><a class="edn-text-link" href="#/courses">Tất cả khóa học <span>→</span></a></div>
  <div class="edn-category-grid">${categoryMarkup}</div>
</section>
${D.me&&owned.length?'<section class="edn-owned-section"><div class="edn-section-heading"><div><span class="edn-section-kicker">TIẾP TỤC HÀNH TRÌNH</span><h2>Chào mừng bạn quay trở lại</h2><p>Tiếp tục từ nơi bạn đã dừng lại.</p></div><a class="edn-text-link" href="#/dashboard">Trang học tập <span>→</span></a></div><div class="grid lms-course-grid edn-popular-grid">'+owned.map(card).join('')+'</div></section>':''}
<section class="edn-popular-section">
  <div class="edn-section-heading"><div><span class="edn-section-kicker">ĐƯỢC QUAN TÂM NHIỀU</span><h2>Khóa học nổi bật</h2><p>Lựa chọn kiến thức thực tế và bắt đầu nâng cấp bản thân ngay hôm nay.</p></div><a class="edn-text-link" href="#/best-sellers">Xem bán chạy <span>→</span></a></div>
  <div class="edn-course-tabs"><button type="button" class="edn-course-tab is-active" data-a="clear">Tất cả</button>${CATS.map(x=>'<button type="button" class="edn-course-tab" data-a="cat" data-v="'+x+'">'+x+'</button>').join('')}</div>
  <div class="grid lms-course-grid edn-popular-grid">${popular.slice(0,6).map(card).join('')}</div>
  <div class="edn-popular-footer"><a class="edn-outline-link" href="#/courses">Khám phá tất cả khóa học <span>→</span></a></div>
</section>
<section class="edn-learning-banner">
  <div class="edn-learning-banner-content"><span class="edn-section-kicker">LỘ TRÌNH CỦA RIÊNG BẠN</span><h2>Tiến bộ từng ngày,<br><span>theo cách của bạn.</span></h2><p>Lưu lại tiến độ, quay lại bài học gần nhất và theo dõi những gì bạn đã hoàn thành.</p><a class="edn-light-button" href="${D.me?'#/dashboard':'#/register'}">${D.me?'Tiếp tục học':'Bắt đầu hành trình'} <span>→</span></a></div>
  <div class="edn-learning-graphic"><div class="edn-progress-card"><div class="edn-progress-card-head"><span class="edn-progress-icon">✓</span><span><strong>Lộ trình học tập</strong><small>Chia nhỏ mục tiêu của bạn</small></span></div><div class="edn-progress-row"><span>Kiến thức nền tảng</span><strong>01</strong></div><div class="edn-progress-bar"><span style="width:78%"></span></div><div class="edn-progress-row"><span>Thực hành dự án</span><strong>02</strong></div><div class="edn-progress-bar blue"><span style="width:54%"></span></div><div class="edn-progress-card-foot"><span>✦</span> Mỗi bước tiến đều đáng giá</div></div><span class="edn-graphic-dot edn-graphic-dot-one"></span><span class="edn-graphic-dot edn-graphic-dot-two"></span></div>
</section>
<section class="edn-stories-section">
  <div class="edn-section-heading"><div><span class="edn-section-kicker">HỌC TẬP • THỰC HÀNH • PHÁT TRIỂN</span><h2>Cùng nhau tiến bộ mỗi ngày</h2><p>Mỗi hành trình bắt đầu bằng một bài học và lớn dần qua từng lần thực hành.</p></div><a class="edn-text-link" href="#/blog">Đọc chia sẻ học tập <span>→</span></a></div>
  <div class="edn-stories-grid">${stories.map(s=>'<a class="edn-story-card" href="#/blog"><img src="'+s.image+'" alt="" loading="lazy"><span class="edn-story-shade"></span><span class="edn-story-label">'+s.label+'</span><span class="edn-story-content"><strong>'+s.title+'</strong><small>Khám phá bài viết <b>↗</b></small></span></a>').join('')}</div>
</section>
<section class="edn-blog-section">
  <div class="edn-section-heading"><div><span class="edn-section-kicker">GÓC KIẾN THỨC EDUNEXT</span><h2>Ý tưởng hay cho hành trình học tập</h2><p>Chia sẻ ngắn gọn để bạn học tốt hơn và áp dụng được nhiều hơn.</p></div><a class="edn-text-link" href="#/blog">Tất cả bài viết <span>→</span></a></div>
  <div class="lms-blog-grid edn-home-blog-grid">${BLOG_ARTICLES.slice(0,3).map(a=>'<article class="lms-blog-card"><a href="#/blog"><img src="'+a.image+'" alt="'+esc(a.title)+'" loading="lazy"></a><div><span>'+a.tag+'</span><h3><a href="#/blog">'+a.title+'</a></h3><p>'+a.excerpt+'</p><a class="edn-blog-read" href="#/course/'+a.course+'">Tìm hiểu khóa học liên quan <span>→</span></a></div></article>').join('')}</div>
</section>
<section class="edn-bottom-cta"><div><span class="edn-section-kicker">BƯỚC TIẾP THEO BẮT ĐẦU TỪ BẠN</span><h2>Sẵn sàng khám phá điều mới?</h2><p>Chọn một khóa học phù hợp và bắt đầu hành trình của bạn cùng EduNext.</p></div><a href="#/courses">Tìm khóa học phù hợp <span>→</span></a></section>
</div>`};const grp=(t,k,o)=>`<div><h4>${t}</h4>${o.map(x=>Array.isArray(x)?x:[x,x||'Tất cả']).map(([v,l])=>`<label><input type="radio" name="${k}" data-f="${k}" value="${v}" ${f[k]===v?'checked':''}> ${l}</label>`).join('')}</div>`;
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
</div>`};const detail=id=>{const c=find(id);if(!c)return nf();const e=EN()[id],favKey=D.me||'guest',favorites=(D.favorites&&Array.isArray(D.favorites[favKey]))?D.favorites[favKey]:[],isFav=favorites.includes(id),goals=OUTCOMES[c.cat]||["Nắm kiến thức nền tảng của khóa học","Thực hành qua các bài học có hướng dẫn","Áp dụng kiến thức vào tình huống thực tế","Theo dõi tiến độ và ôn tập nội dung"];
const quizCount=Q[c.id]?Q[c.id].length:null;
return `<div class="wrap page edn-course-page">
<div class="cio-course-crumb edn-course-crumb"><a href="#/courses">Khóa học</a><span>/</span><span>${esc(c.t)}</span></div>
<section class="edn-course-hero" style="--edn-course-image:url('${COURSE_IMAGES[c.id]}')">
  <div class="edn-course-hero-overlay"></div>
  <div class="edn-course-hero-content">
    <span class="edn-course-eyebrow">${esc(c.cat)} <i></i> ${esc(c.lvl)}</span>
    <h1>${esc(c.t)}</h1>
    <p>Phát triển kỹ năng với ${c.L.length} bài học được sắp xếp theo lộ trình rõ ràng, cùng ${c.h} giờ nội dung học tập để bạn tiến bộ từng bước.</p>
    <div class="edn-course-hero-actions">
      ${e?'<a class="edn-course-buy" href="#/learn/'+id+'/'+nextL(c)+'"><span>TIẾP TỤC HỌC</span><strong>Vào bài học <b>→</b></strong></a>':'<button class="edn-course-buy" type="button" data-a="enroll" data-v="'+id+'"><span>ĐĂNG KÝ KHÓA HỌC</span><strong>'+money(c.p)+' <b>⌄</b></strong></button>'}
      <button class="edn-course-favorite ${isFav?'is-favorite':''}" type="button" data-a="favorite" data-v="${id}" aria-pressed="${isFav}" aria-label="${isFav?'Bỏ khỏi yêu thích':'Thêm vào yêu thích'}" title="${isFav?'Bỏ khỏi yêu thích':'Thêm vào yêu thích'}">${isFav?'♥':'♡'}</button>
      <button class="edn-course-learn-more" type="button" data-a="scrollCourseContent">XEM NỘI DUNG</button>
    </div>
    <div class="edn-course-social-proof"><span class="edn-course-rating-stars">★★★★★</span><strong>${c.r}/5</strong><span>${c.n.toLocaleString("vi-VN")} lượt đăng ký quan tâm</span></div>
  </div>
  <span class="edn-course-hero-tag">${esc(c.tag)}</span>
</section>
<section class="edn-course-facts" aria-label="Thông tin khóa học">
  <div class="edn-course-fact"><span class="edn-fact-icon">▤</span><span>Bài học</span><strong>${c.L.length}</strong></div>
  <div class="edn-course-fact"><span class="edn-fact-icon">▷</span><span>Thời lượng video</span><strong>${c.h} giờ</strong></div>
  <div class="edn-course-fact"><span class="edn-fact-icon">☑</span><span>Câu hỏi quiz</span><strong>${quizCount===null?'Chưa có':quizCount}</strong></div>
  <div class="edn-course-fact"><span class="edn-fact-icon">▣</span><span>Trình độ</span><strong>${esc(c.lvl)}</strong></div>
  <div class="edn-course-fact"><span class="edn-fact-icon">▧</span><span>Chứng chỉ</span><strong>PDF khi hoàn thành</strong></div>
  <div class="edn-course-fact"><span class="edn-fact-icon">◷</span><span>Quyền truy cập</span><strong>Không giới hạn</strong></div>
</section>
<div class="edn-course-detail-grid">
  <section class="edn-course-main">
    <div class="edn-course-section-head"><span class="edn-course-section-kicker">TỔNG QUAN KHÓA HỌC</span><h2>Bạn sẽ học được gì?</h2><p>Nội dung được chia thành từng bước để bạn dễ theo dõi và chủ động thực hành.</p></div>
    <div class="edn-course-outcomes">${goals.map((g,i)=>'<div class="edn-course-outcome"><span>✓</span><p>'+esc(g)+'</p></div>').join('')}</div>
    <section id="edn-course-content" class="edn-course-outline">
      <div class="edn-course-section-head"><span class="edn-course-section-kicker">CHƯƠNG TRÌNH HỌC</span><h2>Nội dung khóa học</h2><p>${c.L.length} bài học <span>·</span> ${c.h} giờ nội dung</p></div>
      <div class="edn-course-lessons">${c.L.map((l,i)=>'<div class="edn-course-lesson"><span class="edn-course-lesson-number">'+String(i+1).padStart(2,'0')+'</span><span class="edn-course-lesson-play">▷</span><div class="edn-course-lesson-copy"><strong>'+esc(l)+'</strong><small>Bài học video</small></div><span class="edn-course-lesson-duration">Bài '+(i+1)+'</span></div>').join('')}</div>
    </section>
  </section>
  <aside class="edn-course-side">
    <div class="edn-course-side-card">
      <span class="edn-course-section-kicker">BẮT ĐẦU NGAY HÔM NAY</span>
      <div class="edn-course-side-price">${money(c.p)} <del>${money(c.o)}</del></div>
      <p>${e?'Khóa học đã có trong tài khoản của bạn.':'Thanh toán một lần để mở toàn bộ nội dung khóa học.'}</p>
      ${e?'<div class="cio-owned">✓ Bạn đã mua khóa học này</div><a class="edn-course-side-cta" href="#/learn/'+id+'/'+nextL(c)+'">Tiếp tục học <span>→</span></a>':'<button class="edn-course-side-cta" type="button" data-a="enroll" data-v="'+id+'">Đăng ký khóa học <span>→</span></button>'}
      <div class="edn-course-includes"><strong>Khóa học bao gồm</strong><span>✓ ${c.L.length} bài học video</span><span>✓ ${c.h} giờ nội dung</span><span>✓ Theo dõi tiến độ học tập</span><span>✓ Chứng chỉ PDF khi hoàn thành</span></div>
    </div>
    <div class="edn-course-support-card"><span>✦</span><div><strong>Cần trợ giúp lựa chọn?</strong><p>Xem hướng dẫn và các câu hỏi thường gặp trước khi bắt đầu.</p><a href="#/faq">Trung tâm hỗ trợ →</a></div></div>
  </aside>
</div>
</div>`};const checkout=id=>{const c=find(id);if(!c)return nf();if(!D.me)return guard('/checkout/'+id);if(EN()[id]){go('/course/'+id);return ''}
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



const teacher=()=>{if(!D.me)return guard('/teacher');const teacherName='Nguyễn Văn Minh',owned=C.filter(c=>c.tc===teacherName),courses=owned.length?owned:[C[0]],students=[...new Set(courses.flatMap(c=>Object.keys(D.en||{}).filter(email=>D.en[email]&&D.en[email][c.id])))],orders=(D.orders||[]).filter(o=>courses.some(c=>c.id===o.courseId));const first=courses[0];return `<div class="wrap page cio-builder">
<div class="cio-builder-head"><div><a href="#/courses" class="cio-back">← Courses</a><span class="cio-eyebrow">COURSE BUILDER</span><h1>${esc(first.t)}</h1></div><div><button class="btn btn-g" data-a="teacher-demo">Preview</button><button class="btn btn-p" data-a="teacher-demo">Publish</button></div></div>
<div class="cio-builder-stats"><div><span>Sections</span><b>4</b></div><div><span>Lessons</span><b>${first.L.length}</b></div><div><span>Quizzes</span><b>${Q[first.id]?1:0}</b></div><div><span>Students</span><b>${students.length}</b></div></div>
<div class="cio-builder-grid">
<section class="cio-builder-main"><div class="cio-panel-head"><div><h2>Content</h2><p>Quản lý nội dung khóa học và bài học.</p></div><button class="btn btn-p btn-s" data-a="teacher-demo">Thêm nội dung</button></div>
<div class="cio-builder-section"><div class="cio-section-bar"><b>Section 01 · Nền tảng</b><span>+</span></div>${first.L.slice(0,3).map((l,i)=>'<div class="cio-builder-item"><span>'+String(i+1).padStart(2,'0')+'</span><div><b>'+l+'</b><small>Video lesson</small></div><span>⋮</span></div>').join('')}</div>
<div class="cio-builder-section"><div class="cio-section-bar"><b>Section 02 · Thực hành</b><span>+</span></div>${first.L.slice(3).map((l,i)=>'<div class="cio-builder-item"><span>'+String(i+4).padStart(2,'0')+'</span><div><b>'+l+'</b><small>Video lesson</small></div><span>⋮</span></div>').join('')}${Q[first.id]?'<div class="cio-builder-item quiz-item"><span>Q</span><div><b>Quiz cuối khóa</b><small>'+Q[first.id].length+' câu hỏi</small></div><span>⋮</span></div>':''}</div></section>
<aside class="cio-builder-side"><div class="cio-builder-side-card"><span class="cio-eyebrow">COURSE INFO</span><h2>Thông tin khóa học</h2><div><small>Giá</small><b>${money(first.p)}</b></div><div><small>Thời lượng</small><b>${first.h} giờ</b></div><div><small>Đánh giá</small><b>★ ${first.r}</b></div><div><small>Trạng thái</small><em>Published</em></div><a class="btn btn-g w" href="#/course/${first.id}">Xem khóa học</a></div><div class="cio-builder-side-card"><span class="cio-eyebrow">STUDENTS</span><h2>Học viên</h2><b class="cio-big-number">${students.length}</b><p>${orders.length} đơn hàng trong dữ liệu demo.</p></div></aside>
</div></div>`};const dash=()=>{if(!D.me)return guard('/dashboard');const u=me(),mine=C.filter(c=>EN()[c.id]),completed=mine.filter(c=>pct(c)===100),active=mine.filter(c=>pct(c)<100);
return `<div class="wrap page cio-student-page">
<div class="cio-page-head"><div><span class="cio-eyebrow">TRANG HỌC TẬP</span><h1>Xin chào, ${esc(u.name)}</h1><p>Theo dõi các khóa học bạn đã mua và tiếp tục bài học đang dang dở.</p></div><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>
<div class="cio-stat-grid"><div><span>Đang học</span><b>${active.length}</b></div><div><span>Hoàn thành</span><b>${completed.length}</b></div><div><span>Bài đã học</span><b>${mine.reduce((s,c)=>s+EN()[c.id].done.length,0)}</b></div><div><span>Đơn hàng</span><b>${(D.orders||[]).filter(o=>o.email===D.me).length}</b></div></div>
<div class="cio-tabs"><span class="active">Đang học (${active.length})</span><span>Hoàn thành (${completed.length})</span></div>
${active.length?'<section class="cio-dashboard-grid">'+active.map(c=>'<article class="cio-learning-card"><a href="#/learn/'+c.id+'/'+nextL(c)+'" class="cio-learning-image"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'"></a><div class="cio-learning-body"><div class="cio-card-status">ĐANG HỌC</div><h3><a href="#/learn/'+c.id+'/'+nextL(c)+'">'+c.t+'</a></h3><p>'+c.cat+' · '+c.L.length+' bài · '+c.h+' giờ</p><div class="cio-progress-line"><span style="width:'+pct(c)+'%"></span></div><div class="cio-learning-foot"><span>'+pct(c)+'% hoàn thành</span><a href="#/learn/'+c.id+'/'+nextL(c)+'">Tiếp tục →</a></div></div></article>').join('')+'</section>':'<div class="cio-empty"><h3>Chưa có khóa học đang học</h3><p>Mua một khóa học để nó xuất hiện trong Trang học tập.</p><a class="btn btn-p" href="#/courses">Khám phá khóa học</a></div>'}
${completed.length?'<section class="cio-completed-section"><div class="cio-section-title"><h2>Đã hoàn thành</h2><a href="#/courses">Khám phá thêm →</a></div><div class="grid cio-course-grid">'+completed.map(card).join('')+'</div></section>':''}
</div>`};const admin=()=>{if(!D.me)return guard('/admin');const users=D.users||[],orders=D.orders||[],paidOrders=orders.filter(o=>o.status==='paid'),revenue=paidOrders.reduce((s,o)=>s+o.amount,0);return `<div class="wrap page cio-admin">
<div class="cio-admin-head"><div><span class="cio-eyebrow">ADMIN</span><h1>Courses</h1><p>Quản lý khóa học, đơn hàng và học viên của EduNext.</p></div><button class="btn btn-p" data-a="adminDemo">Create Course</button></div>
<div class="cio-admin-toolbar"><div class="cio-search-local"><span>⌕</span><input placeholder="Find Course" aria-label="Find Course"></div><select><option>Published</option><option>All courses</option></select></div>
<div class="grid cio-admin-grid">${C.map(c=>'<article class="cio-admin-card"><div class="cio-admin-image"><img src="'+COURSE_IMAGES[c.id]+'" alt="'+esc(c.t)+'"><span>EduNext</span></div><div class="cio-admin-body"><h3>'+c.t+'</h3><p>'+c.cat+' · '+c.lvl+'</p><div class="cio-admin-meta"><span>'+c.L.length+' lessons</span><span>'+c.n.toLocaleString('vi-VN')+' học viên</span></div><div class="cio-admin-footer"><em>Published</em><b>'+money(c.p)+'</b></div></div></article>').join('')}</div>
<div class="cio-admin-summary"><div><span>Students</span><b>${users.length}</b></div><div><span>Paid orders</span><b>${paidOrders.length}</b></div><div><span>Revenue</span><b>${money(revenue)}</b></div></div>
</div>`};const blogPage=()=>`<div class="wrap page blog-page">
<div class="blog-page-head"><div><span class="content-kicker">EduNext Blog</span><h1>Học một chút, làm được một chút</h1><p>Các bài viết ngắn về lập trình, dự án và cách tự học. Viết để giải quyết những câu hỏi thật trong lúc học, không phải để nhồi thêm lý thuyết.</p></div><a class="btn btn-p" href="#/courses">Xem khóa học</a></div>
<div class="blog-topic-row"><button class="topic active">Tất cả</button><button class="topic">Lập trình</button><button class="topic">ASP.NET Core</button><button class="topic">AI</button><button class="topic">Kỹ năng học tập</button></div>
<section class="blog-page-feature"><a class="blog-page-feature-image" href="#/blog"><img src="${BLOG_ARTICLES[0].image}" alt="${esc(BLOG_ARTICLES[0].title)}"><span>${BLOG_ARTICLES[0].tag}</span></a><div class="blog-page-feature-body"><div class="blog-home-meta"><span>${BLOG_ARTICLES[0].time}</span><span>EduNext</span></div><h2>${BLOG_ARTICLES[0].title}</h2><p>${BLOG_ARTICLES[0].excerpt}</p><p class="blog-page-note">Một bài viết phù hợp nếu bạn đang học C# nhưng cảm giác kiến thức cứ trôi đi sau mỗi buổi học.</p><a class="btn btn-g" href="#/course/${BLOG_ARTICLES[0].course}">Xem khóa học liên quan</a></div></section>
<div class="blog-page-grid">${BLOG_ARTICLES.slice(1).map(a=>'<article class="blog-page-card"><a class="blog-page-card-image" href="#/blog"><img src="'+a.image+'" alt="'+esc(a.title)+'" loading="lazy"><span>'+a.tag+'</span></a><div class="blog-page-card-body"><div class="blog-home-meta"><span>'+a.time+'</span><span>EduNext</span></div><h2>'+a.title+'</h2><p>'+a.excerpt+'</p><a class="blog-read-link" href="#/course/'+a.course+'">Học phần liên quan →</a></div></article>').join('')}</div>
<div class="blog-page-footer"><div><span class="eyebrow">GỢI Ý ĐỂ BẮT ĐẦU</span><h2>Đọc một bài, rồi quay lại làm thử.</h2><p>Bài viết chỉ có ý nghĩa khi nó giúp bạn hiểu thêm một điều và làm được thêm một việc.</p></div><a class="btn btn-p" href="#/courses">Xem khóa học</a></div>
</div>`;

const aboutPage=()=>`<div class="wrap page content-page"><div class="content-hero"><span class="content-kicker">Về EduNext</span><h1>Học đúng kiến thức, phát triển đúng tương lai</h1><p class="muted">EduNext là bản demo nền tảng học trực tuyến tập trung vào lộ trình rõ ràng, tiến độ học tập và trải nghiệm học thực tế.</p></div><section class="about-grid"><div class="box about-main"><h2>EduNext hướng đến điều gì?</h2><p>Thay vì đưa quá nhiều nội dung cùng lúc, EduNext tổ chức khóa học theo từng bước để người học dễ bắt đầu, dễ theo dõi và dễ quay lại đúng phần đang học.</p><p>Nền tảng kết hợp khóa học, video, quiz, chứng chỉ, dashboard và các công cụ dành cho giảng viên và quản trị viên trong một trải nghiệm thống nhất.</p></div><div class="box about-values"><h2>Giá trị cốt lõi</h2><div><b>Học có lộ trình</b><span>Mỗi bước đều có mục tiêu rõ ràng.</span></div><div><b>Thực hành</b><span>Ưu tiên kiến thức có thể áp dụng vào dự án.</span></div><div><b>Theo dõi tiến độ</b><span>Biết mình đang ở đâu và nên học gì tiếp.</span></div><div><b>Trải nghiệm đơn giản</b><span>Giao diện dễ dùng trên máy tính và điện thoại.</span></div></div></section><section class="box about-mission"><span class="content-kicker">Tầm nhìn</span><h2>Xây dựng một không gian học tập rõ ràng, thực tế và dễ tiếp cận.</h2><p class="muted">Từ người mới bắt đầu đến người muốn bổ sung kỹ năng, EduNext hướng tới việc biến mục tiêu lớn thành những bước học nhỏ có thể hoàn thành mỗi ngày.</p><a class="btn btn-p" href="#/courses">Xem khóa học</a></section></div>`;

const R=[[/^\/?$/,home],[/^\/courses$/,courses],[/^\/best-sellers$/,()=>{f=F0();f.sort='pop';return courses()}],[/^\/categories$/,()=>{go('/');setTimeout(()=>document.getElementById('cats')?.scrollIntoView({behavior:'smooth'}),30);return home()}],[/^\/course\/(\w+)$/,detail],[/^\/checkout\/(\w+)$/,checkout],[/^\/learn\/(\w+)\/(\d+)$/,learn],[/^\/quiz\/(\w+)$/,quiz],[/^\/certificates$/,certificates],[/^\/cert\/(\w+)$/,cert],[/^\/(login|register)$/,auth],[/^\/dashboard$/,dash],[/^\/teacher$/,teacher],[/^\/admin$/,admin],[/^\/blog$/,blogPage],[/^\/about$/,aboutPage],[/^\/faq$/,()=>{go('/');setTimeout(()=>document.getElementById('faq')?.scrollIntoView({behavior:'smooth'}),30);return home()}]];
function nav(){const m=me(),p=location.hash.slice(1)||'/';document.body.classList.add('edunext-ready');document.body.classList.toggle('lms-admin-mode',p==='/admin');document.body.classList.toggle('lms-builder-mode',p==='/teacher');$('#auth').innerHTML=m?'<a href="#/dashboard" class="lms-top-profile" aria-label="Mở hồ sơ học tập"><span class="lms-top-profile-copy"><strong>'+esc(m.name)+'</strong><small>Học viên</small></span></a><button type="button" class="lms-top-logout-text" data-a="logout">Đăng xuất</button>':'<a class="btn btn-g btn-s" href="#/login">Đăng nhập</a><a class="btn btn-p btn-s" href="#/register">Đăng ký</a>';const prof=$('#lms-sidebar-profile');if(prof){prof.hidden=!!m;prof.innerHTML=m?'':'<a href="#/register" class="lms-nav-item"><span class="lms-nav-icon">＋</span><span>Tạo tài khoản</span></a>';}document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+p));const labels={'/':'Trang chủ','/courses':'Khóa học','/best-sellers':'Bán chạy','/categories':'Danh mục','/blog':'Blog','/faq':'Hỏi đáp','/dashboard':'Trang học tập','/certificates':'Chứng chỉ','/login':'Đăng nhập','/register':'Đăng ký','/about':'Giới thiệu','/teacher':'Course Builder','/admin':'Courses'};const current=$('#lms-breadcrumb-current');if(current)current.textContent=labels[p]||'Khóa học';$('#nav').classList.remove('open');document.body.classList.remove('lms-mobile-open')}
function render(keep){const p=location.hash.slice(1)||'/';hook=null;let h;for(const[re,fn]of R){const m=p.match(re);if(m){h=fn(...m.slice(1));break}}
app.innerHTML=h===undefined?nf():h;if(hook)hook();nav();if(!keep)scrollTo(0,0)}

/* ---------- Actions ---------- */
const A={
menu:()=>document.body.classList.toggle('lms-mobile-open'),
sc:id=>{$('#nav').classList.remove('open');const s=()=>{const el=document.getElementById(id);el&&el.scrollIntoView({behavior:'smooth'})};const p=location.hash.slice(1);if(!p||p==='/')s();else{go('/');setTimeout(s,80)}},
cat:v=>{f=F0();f.cat=v;to('/courses')},
clear:()=>{f=F0();render(true)},
enroll:id=>{if(!D.me){next='/checkout/'+id;toast('Đăng nhập để tiếp tục thanh toán');return go('/login')}go('/checkout/'+id)},
scrollCourseContent:()=>document.getElementById('edn-course-content')?.scrollIntoView({behavior:'smooth',block:'start'}),
favorite:id=>{const key=D.me||'guest';D.favorites=D.favorites||{};const list=Array.isArray(D.favorites[key])?D.favorites[key]:[],i=list.indexOf(id);if(i>=0){list.splice(i,1);toast('Đã bỏ khóa học khỏi yêu thích')}else{list.push(id);toast('Đã thêm khóa học vào yêu thích')}D.favorites[key]=list;save();render(true)},
done:v=>{const[id,i]=v.split(','),e=EN()[id],k=+i,x=e.done.indexOf(k);x<0?e.done.push(k):e.done.splice(x,1);save();toast(x<0?'Đã lưu tiến độ':'Đã bỏ đánh dấu');render(true)},
tab:(v,t)=>{document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b===t));document.querySelectorAll('.pn').forEach(p=>p.classList.toggle('hidden',p.dataset.p!==v))},
opt:v=>{const[k,id]=v.split(',');qz.a[qz.i]=+k;qr(id)},
qgo:v=>{const[d,id]=v.split(','),n=Q[id].length;if(+d>0&&qz.a[qz.i]==null)return toast('Hãy chọn một đáp án');
if(+d>0&&qz.i===n-1){qz.res=Math.round(Q[id].filter((q,i)=>qz.a[i]===q.a).length/n*100);const e=EN()[id];e.q=Math.max(e.q||0,qz.res);save()}else qz.i+=+d;qr(id)},
qretry:id=>{qz={i:0,a:[],res:null};qr(id)},
logout:()=>{D.me=null;save();toast('Đã đăng xuất');to('/')},
'teacher-demo':()=>toast('Tính năng giảng viên đang ở chế độ demo'),'adminDemo':()=>toast('Tính năng quản trị đang ở chế độ demo'),print:()=>print(),pay:id=>{const c=find(id);if(!c||!D.me)return;D.orders=D.orders||[];const method=(document.querySelector('input[name="payment"]:checked')||{}).value||'bank';D.orders.push({id:'EDN-'+Date.now().toString().slice(-8),courseId:id,email:D.me,amount:c.p,method,status:'paid',createdAt:new Date().toISOString()});EN()[id]={done:[],q:null,n:{}};save();toast('Thanh toán thành công');go('/learn/'+id+'/0')}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&A[t.dataset.a])A[t.dataset.a](t.dataset.v,t)});
const onf=e=>{const t=e.target;if(t.id==='note'){const en=EN()[t.dataset.c];(en.n=en.n||{})[t.dataset.i]=t.value;save();return}if(t.dataset.f&&$('#list')){f[t.dataset.f]=t.value;list()}};
document.addEventListener('input',onf);document.addEventListener('change',onf);
document.addEventListener('submit',e=>{const fm=e.target.closest('[data-form]');if(!fm)return;e.preventDefault();const k=fm.dataset.form,v=Object.fromEntries(new FormData(fm));
if(k==='search'){f=F0();f.q=(v.q||'').trim();fm.reset();$('#nav').classList.remove('open');return to('/courses')}
const err=m=>{$('#err').textContent=m},email=(v.email||'').trim().toLowerCase();
if(!/^\S+@\S+\.\S+$/.test(email))return err('Email chưa đúng định dạng.');
if((v.pw||'').length<6)return err('Mật khẩu cần tối thiểu 6 ký tự.');
if(k==='register'){if(!(v.name||'').trim())return err('Vui lòng nhập họ và tên.');if(!v.ok)return err('Bạn cần đồng ý với điều khoản sử dụng.');if(D.users.some(u=>u.email===email))return err('Email này đã đăng ký. Hãy đăng nhập.');D.users.push({name:v.name.trim(),email,pw:v.pw})}
else if(!D.users.some(u=>u.email===email&&u.pw===v.pw))return err('Sai email hoặc mật khẩu.');
D.me=email;save();toast('Xin chào '+me().name);const n=next||'/dashboard';next='';go(n)});
addEventListener('hashchange',()=>render());
render();
})();
