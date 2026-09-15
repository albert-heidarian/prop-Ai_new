const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Applying Full Persian & RTL Localization to main-462OM7XN.js ---');

let mainJs = fs.readFileSync(path.join(__dirname, '../main-462OM7XN.js'), 'utf8');

// 1. Replace TV (Product page data)
const tvStart = mainJs.indexOf('TV={sections:[');
if (tvStart !== -1) {
  let depth = 0, tvEnd = -1;
  for (let i = tvStart + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '{') depth++;
    else if (mainJs[i] === '}') {
      depth--;
      if (depth === 0) { tvEnd = i; break; }
    }
  }
  if (tvEnd !== -1) {
    const newTV = `TV={sections:[{name:"hero",title:"ایجنت‌های هوشمند برای رشد و تحول کسب‌وکار شما",buttons:[{variant:"primary",link:"/download",type:"routerlink",text:"شروع رایگان",target:"_self",icon:""},{variant:"primary-inverse",link:"/download",type:"routerlink",text:"همه گزینه‌های شروع",target:"_self"}]},{name:"cards",cards:[{tag:"agent",icon:"agent_mode",mainText:"ایجنت‌محور (Agent-First)",subText:"پلتفرمی پیشرفته برای هدایت و اجرای هم‌زمان چندین دستیار هوشمند در تمام محیط‌های کاری شما. اجرای گردش‌های کاری پیچیده در پس‌زمینه در حالی که ایجنت‌ها فرآیندها، تحلیل‌ها و پیاده‌سازی را پیش می‌برند."},{tag:"abstraction",icon:"deployed_code",mainText:"درک عمیق و انتزاع یکپارچه",subText:"بینش کامل به تمام عملیات هوش مصنوعی در سطح هر تسک، پشتیبانی از آرتیفکت‌های خروجی و ارزیابی نتایج که اطمینان کامل به تصمیمات ایجنت‌ها را فراهم می‌کند."},{tag:"guidance",icon:"automatic_cluster",mainText:"هدایت هوشمند از ۹۰٪ تا ۱۰۰٪",subText:"ارائه بازخورد تعاملی در تمام مراحل کار برای رساندن دقت خروجی‌ها به ایده‌آل‌ترین سطح ممکن و هماهنگی دقیق با اهداف شما."}]},{name:"feature_cards",cards:[{title:"پلتفرم پراپ ۲.۰",description:"مرکز فرماندهی شما برای مدیریت هم‌زمان چندین ایجنت هوشمند محلی و ابری. گروه‌بندی مکالمات در پروژه‌ها، مدیریت فضاهای کاری و اتوماسیون وظایف زمان‌بندی‌شده.",img:"product/antigravity-2.jpg",video:"",fullWidth:!0,buttons:[{text:"شروع کار",link:"/download",type:"routerlink",target:"_self"},{text:"اطلاعات بیشتر",link:"/product",type:"routerlink",target:"_self"}]},{title:"رابط خط فرمان پراپ (CLI)",description:"سریع، سبک و بهینه‌شده برای کار از طریق ترمینال. اجرای خودکار تسک‌های برنامه‌نویسی و پردازش داده، صدور مستقیم دستورات و مدیریت زیر-ایجنت‌ها بدون ترک کیبورد.",img:"product/antigravity-cli.png",video:"",buttons:[{text:"شروع کار",link:"/download",type:"routerlink",target:"_self"},{text:"اطلاعات بیشتر",link:"/docs",type:"routerlink",target:"_self"}]},{title:"کیت توسعه نرم‌افزار پراپ (SDK)",description:"ساخت ایجنت‌های سفارشی با حداقل کدنویسی با پایتون و ابزارهای استاندارد، اتصال به پایگاه‌های داده و ارزیابی مدل‌ها روی بستر هوشمند پراپ.",img:"product/antigravity-sdk.jpg",video:"",buttons:[{text:"شروع کار",link:"/download",type:"routerlink",target:"_self"},{text:"اطلاعات بیشتر",link:"/docs",type:"routerlink",target:"_self"}]},{title:"محیط توسعه هوشمند پراپ (IDE)",description:"محیط کاری نسل جدید مجهز به ابزار مدیریت ایجنت‌ها، درک یکپارچه از ساختار پروژه و قابلیت‌های خودکارسازی پیشرفته.",img:"",video:"product-page/editor.mp4",fullWidth:!0,buttons:[{text:"شروع کار",link:"/download",type:"routerlink",target:"_self"},{text:"اطلاعات بیشتر",link:"/product",type:"routerlink",target:"_self"}]}]},{name:"use_cases",useCases:{title:"ساخته‌شده برای رشد و فراتر از آن",subtitle:"و فراتر از آن",description:"ببینید کسب‌وکارها، تیم‌ها و توسعه‌دهندگان چگونه با پراپ فرآیندهای کاری خود را متحول کرده‌اند.",useCases:[{id:"pinball-machine",title:"سیستم کنترل خودکار هوشمند",description:"پیاده‌سازی الگوریتم‌های هوشمند تصمیم‌گیری و کنترل در سیستم‌های دینامیکی توسط دستیاران پراپ.",poster:"assets/video/product-page/pinball_optmized.mp4",icon:"assets/icons/full-stack-icon.svg",youtubeUrl:"https://www.youtube.com/embed/YX-OpeNZYI4?si=Wdrd2haIwDE1MMSe"},{id:"flight-tracker-app",title:"سامانه تحلیل و ردگیری پروازها",description:"طراحی و تولید خودکار داشبورد تحلیل داده در لحظه با استفاده از مدل‌های هوشمند پراپ.",poster:"assets/video/product-page/flight_tracker_optmized.mp4",icon:"assets/icons/frontend-icon.svg",youtubeUrl:"https://www.youtube.com/embed/22B5Yu0oVS0?si=Wdrd2haIwDE1MMSe"},{id:"inverted-pendulum",title:"کنترل‌کننده پاندول معکوس",description:"آزمایش دقت الگوریتم‌های هوش مصنوعی در حل مسائل مهندسی کنترل و فیزیک پیچیده.",poster:"assets/video/product-page/pendulum_optmized.mp4",icon:"assets/icons/full-stack-icon.svg",youtubeUrl:"https://www.youtube.com/embed/rKQ9b4UMpGQ?si=xDz2S4e14LA97_iE"},{id:"collaborative-whiteboard-app",title:"تخته‌سفید تعاملی و اشتراکی",description:"توسعه سریع امکانات چندکاربره با هماهنگ‌سازی چندین ایجنت موازی در پلتفرم پراپ.",poster:"assets/video/product-page/whiteboard_optmized.mp4",icon:"assets/icons/frontend-icon.svg",youtubeUrl:"https://www.youtube.com/embed/E-Sk9ypHVgI?si=Wdrd2haIwDE1MMSe"}]}}]}`;
    mainJs = mainJs.substring(0, tvStart) + newTV + mainJs.substring(tvEnd + 1);
    console.log('✓ 1. Replaced TV (Product page data)');
  }
}

// 2. Replace r7 (Use Cases page data)
const r7Start = mainJs.indexOf('r7=[{id:"enterprise"');
if (r7Start !== -1) {
  let depth = 0, r7End = -1;
  for (let i = r7Start + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '[') depth++;
    else if (mainJs[i] === ']') {
      depth--;
      if (depth === 0) { r7End = i; break; }
    }
  }
  if (r7End !== -1) {
    const newR7 = `r7=[{id:"enterprise",title:"سازمانی",description:"پراپ ۲.۰ با یک مرکز فرماندهی نوین برای ایجنت‌های پس‌زمینه ارائه می‌شود تا وظایف سازمانی، تحلیل‌های عمیق داده و پروژه‌های پیچیده را سریع‌تر و با کمترین نیاز به جابجایی بین ابزارها به پیش ببرند.",icon:"/assets/image/icons/use-cases/professional.svg",morphingIcon:"/assets/textures/icons/professional.png",details:{headline:"اتوماسیون پایداری و تضمین بالاترین بهره‌وری",text:"حفظ پایداری سیستم با پایش مجهز به هوش مصنوعی، پاسخ خودکار به حوادث و تحلیل‌های پیش‌بینانه. شناسایی و رفع پیشگیرانه مشکلات پیش از اثرگذاری بر مشتریان.",image:"assets/image/placeholder-detail.png"}},{id:"frontend",title:"فرانت‌اند و طراحی",description:"ایجنت‌های هوشمند پراپ با قابلیت تست در مرورگر و بازخورد بصری آنی، فرآیند پیاده‌سازی و طراحی رابط کاربری را تسریع می‌کنند و امکان خلق رابط‌های کاربری چشم‌نواز و واکنش‌گرا را فراهم می‌سازند.",icon:"/assets/image/icons/use-cases/frontend.svg",morphingIcon:"/assets/textures/icons/frontend.png",details:{headline:"طراحی، توسعه و انتشار رابط کاربری سریع‌تر از همیشه",text:"تبدیل ایده به محصول نهایی در کوتاه‌ترین زمان. ابزارهای هوش مصنوعی ما به شما کمک می‌کنند تا رابط‌های کاربری زیبا، پایدار و مطابق با سیستم طراحی خلق کنید.",image:"assets/image/placeholder-detail.png"}},{id:"fullstack",title:"فول‌استک و توسعه",description:"ایجنت‌های پراپ بر اعتبارسنجی مداوم و تولید آرتیفکت‌های خروجی تمرکز دارند تا پیچیده‌ترین چالش‌های نرم‌افزاری و داده‌ای را به آسانی حل کنند.",icon:"/assets/image/icons/use-cases/fullstack.svg",morphingIcon:"/assets/textures/icons/fullstack.png",details:{headline:"تسلط بر معماری فول‌استک با دستیار هوشمند",text:"از طراحی پایگاه داده تا پیاده‌سازی API و فریم‌ورک‌های مدرن، پراپ پیشنهادات هوشمند ارائه می‌دهد و کدهای تکراری را خودکارسازی می‌کند.",image:"assets/image/placeholder-detail.png"}},{id:"science",title:"علمی و داده‌محور",description:"ایجنت‌های پراپ بر ابزارها، مدل‌ها و پایگاه‌های داده پژوهشی و تحلیلی مسلط هستند و استخراج بینش‌های عمیق از داده‌های بزرگ را تسریع می‌کنند.",icon:"/assets/image/icons/use-cases/science.svg",morphingIcon:"/assets/textures/icons/science.png",details:{headline:"تحلیل پیشرفته داده‌ها و مدل‌های پژوهشی",text:"پشتیبانی از پردازش مقیاس‌پذیر داده‌ها، مدل‌های پیشرفته یادگیری ماشین و ابزارهای تحلیلی تخصصی برای محققان و سازمان‌های داده‌محور.",image:"assets/image/placeholder-detail.png"}},{id:"marketer",title:"بازاریابی و رشد",description:"پراپ گلوگاه‌های کاری روزانه را برطرف کرده و اجرای برنامه‌های بازاریابی را سرعت می‌بخشد. ساخت فرآیندهای سفارشی، اتوماسیون تولید محتوا و هدایت ایجنت‌ها با بازخورد در لحظه.",icon:"/assets/image/icons/use-cases/product-marketing-manager.svg",morphingIcon:"/assets/textures/icons/product-marketing-manager.png",details:{headline:"تسریع رشد کسب‌وکار و کمپین‌ها با هوش مصنوعی",text:"تولید محتوای متنی، خلاصه‌سازی گزارش‌های بازار، اتوماسیون ایمیل و پیگیری سرنخ‌های فروش با دقت و شخصی‌سازی بالا.",image:"assets/image/placeholder-detail.png"}}]`;
    mainJs = mainJs.substring(0, r7Start) + newR7 + mainJs.substring(r7End + 1);
    console.log('✓ 2. Replaced r7 (Use Cases page data)');
  }
}

// 3. Replace MV (Support options)
const mvStart = mainJs.indexOf('MV=[{id:"x"');
if (mvStart !== -1) {
  let depth = 0, mvEnd = -1;
  for (let i = mvStart + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '[') depth++;
    else if (mainJs[i] === ']') {
      depth--;
      if (depth === 0) { mvEnd = i; break; }
    }
  }
  if (mvEnd !== -1) {
    const newMV = `MV=[{id:"x",particleImage:"/assets/textures/icons/x.png",title:"شبکه اجتماعی X (توییتر)",description:"گفت‌وگو و تازه‌ترین اخبار",url:"https://x.com"},{id:"youtube",particleImage:"/assets/textures/icons/youtube.png",title:"کانال یوتیوب",description:"ویدیوهای آموزشی و راهنماها",url:"https://youtube.com"},{id:"linkedin",particleImage:"/assets/textures/icons/linkedin.png",title:"لینکدین",description:"ارتباطات سازمانی و همکاری",url:"https://linkedin.com"}]`;
    mainJs = mainJs.substring(0, mvStart) + newMV + mainJs.substring(mvEnd + 1);
    console.log('✓ 3. Replaced MV (Support options data)');
  }
}

// 4. Replace a7 (Blog data)
const a7Start = mainJs.indexOf('a7={title:"Blog"');
if (a7Start !== -1) {
  let depth = 0, a7End = -1;
  for (let i = a7Start + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '{') depth++;
    else if (mainJs[i] === '}') {
      depth--;
      if (depth === 0) { a7End = i; break; }
    }
  }
  if (a7End !== -1) {
    const newA7 = `a7={title:"وبلاگ",sections:[{name:"sticky feature",featured_title:"رویداد سالانه پراپ — رونمایی از نسل جدید ایجنت‌ها",date:"۲۹ اردیبهشت ۱۴۰۳",tags:["محصول"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",featured_video:"AGY_Logo_loop.mp4",featured_cards:[]},{name:"latest blogs",featured_title:"تازه‌ترین مقالات و آموزش‌ها",tabs:["همه","محصول","سازمانی","تغییرات","شرکت","صنعت","مطالعات موردی"],blog_cards:[{title:"رونمایی از پلتفرم هوش مصنوعی پراپ ۲.۰",date:"۲۹ اردیبهشت ۱۴۰۳",tags:["محصول"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"AGY2 Square.jpg"},{title:"راهکارهای هوش مصنوعی پراپ برای سازمان‌ها",date:"۲۵ اردیبهشت ۱۴۰۳",tags:["سازمانی"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"AGY Enterprise - Square.png"},{title:"آشنایی با رابط خط فرمان (CLI) پراپ",date:"۲۰ اردیبهشت ۱۴۰۳",tags:["محصول"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"AGY CLI Blog - Square.png"},{title:"کیت توسعه نرم‌افزار پراپ (SDK) برای پایتون",date:"۱۵ اردیبهشت ۱۴۰۳",tags:["محصول"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"AGY SDK Blog - Square.png"},{title:"راهنمای انتخاب پلن‌های پراپ برای کسب‌وکارها",date:"۱۰ اردیبهشت ۱۴۰۳",tags:["محصول"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"Plans - Square.png"},{title:"داستان موفقیت: خودکارسازی پشتیبانی مشتری با پراپ",date:"۵ اردیبهشت ۱۴۰۳",tags:["مطالعات موردی"],link_text:"خواندن مقاله",link:"/blog/introducing-google-antigravity",img:"blog-feature-introducing-google-antigravity.png"}]}]}`;
    mainJs = mainJs.substring(0, a7Start) + newA7 + mainJs.substring(a7End + 1);
    console.log('✓ 4. Replaced a7 (Blog data)');
  }
}

// 5. Replace l7 (Download page data)
const l7Start = mainJs.indexOf('l7={sections:[');
if (l7Start !== -1) {
  let depth = 0, l7End = -1;
  for (let i = l7Start + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '{') depth++;
    else if (mainJs[i] === '}') {
      depth--;
      if (depth === 0) { l7End = i; break; }
    }
  }
  if (l7End !== -1) {
    const newL7 = `l7={sections:[{name:"platforms",id:"antigravity-2",title:"پلتفرم پراپ ۲.۰",platforms:[{os:"mac",links:[{buttonText:"دانلود برای اپل سیلیکون (M1/M2/M3/M4)",href:"#"},{buttonText:"دانلود برای اینتل (Intel)",href:"#"}],requirements:"سیستم‌عامل macOS نسخه ۱۲ به بالا"},{os:"windows",links:[{buttonText:"دانلود برای ویندوز ۶۴ بیتی",href:"#"},{buttonText:"دانلود برای ویندوز ARM64",href:"#"}],requirements:"ویندوز ۱۰ و ۱۱ (نسخه ۶۴ بیتی)"},{os:"linux",links:[{buttonText:"دانلود نسخه لینوکس x64",href:"#"},{buttonText:"دانلود نسخه لینوکس ARM64",href:"#"}],requirements:"توزیع‌های مدرن لینوکس (اوبونتو، دبیان، فدورا، ردهت)"}]},{name:"command",id:"antigravity-cli",title:"رابط خط فرمان پراپ (CLI)",description:"با دستیاران هوشمند پراپ مستقیماً در کدبیس خود کار کنید. توسعه، خطایابی و اجرا را از ترمینال پیش ببرید. نیاز خود را توصیف کنید و پراپ بقیه کار را انجام می‌دهد.",snippets:[{platform:"mac",icon:"terminal",label:"مک و لینوکس",snippet:"curl -fsSL https://prop-ai.ir/cli/install.sh | bash",language:"bash"},{platform:"windows-powershell",icon:"terminal",label:"پاورشل ویندوز (PowerShell)",snippet:"irm https://prop-ai.ir/cli/install.ps1 | iex",language:"iex"},{platform:"windows-cmd",icon:"terminal",label:"خط فرمان ویندوز (CMD)",snippet:"curl -fsSL https://prop-ai.ir/cli/install.cmd -o install.cmd && install.cmd && del install.cmd",language:"bash"}]},{name:"platforms",id:"antigravity-ide",title:"محیط توسعه هوشمند پراپ (IDE)",platforms:[{os:"mac",links:[{buttonText:"دانلود برای اپل سیلیکون",href:"#"},{buttonText:"دانلود برای مک اینتل",href:"#"}]},{os:"windows",links:[{buttonText:"دانلود برای ویندوز x64",href:"#"},{buttonText:"دانلود برای ویندوز ARM64",href:"#"}]},{os:"linux",links:[{buttonText:"دانلود برای لینوکس x64",href:"#"},{buttonText:"دانلود برای لینوکس ARM64",href:"#"}]}]},{name:"download",id:"antigravity-sdk",title:"کیت توسعه نرم‌افزار پراپ (SDK)",description:"ایجنت‌های هوشمند سفارشی را با استفاده از کتابخانه‌های پایتون پراپ بسازید و به سرویس‌های خود متصل کنید.",button:{variant:"secondary",type:"routerlink",link:"/docs",text:"مشاهده مستندات SDK",target:"_self"}}]} `;
    mainJs = mainJs.substring(0, l7Start) + newL7 + mainJs.substring(l7End + 1);
    console.log('✓ 5. Replaced l7 (Download page data)');
  }
}

// 6. Replace g7 (Changelog data)
const g7Start = mainJs.indexOf('g7={title:"Google Antigravity Changelog"');
if (g7Start !== -1) {
  let depth = 0, g7End = -1;
  for (let i = g7Start + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '{') depth++;
    else if (mainJs[i] === '}') {
      depth--;
      if (depth === 0) { g7End = i; break; }
    }
  }
  if (g7End !== -1) {
    const newG7 = `g7={title:"گزارش تغییرات و به‌روزرسانی‌های پراپ",buttons:[{link:"/docs",text:"مشاهده مستندات",target:"_self",type:"routerLink"},{link:"/pricing",text:"مشاهده پلن‌ها",target:"_self",type:"routerLink"}],engineSections:[{version:"نسخه ۲.۱.۴<br>خرداد ۱۴۰۳",description:"بهینه‌سازی سهمیه‌ها، پشتیبانی از فایل‌های اسناد و ایجنت‌های پس‌زمینه",accordion:{changes:"<p>بازطراحی صفحه مدیریت سهمیه، پشتیبانی از پیوست فایل‌های PDF، دستورات سریع جدید و رفع اشکالات عملکردی</p>",items:[{title:"بهبودها و امکانات جدید",accordion_items:[{text:"بازطراحی صفحه مصرف و سهمیه: نمایش شفاف و تفکیک‌شده اعتبارات مصرفی و باقیمانده در بخش تنظیمات مدل‌ها."},{text:"امکان ارسال پرسش‌های جانبی با دستور سریع /btw: حین مکالمه اصلی، بدون از دست رفتن تمرکز، سوالات جانبی بپرسید."},{text:"قابلیت جستجوی سریع در مکالمات: جستجوی آسان متون با کلیدهای میانبر در تاریخچه گفتگوها."},{text:"پشتیبانی از پیوست اسناد و فایل‌های PDF: امکان کشیدن و رها کردن فایل‌های اسناد برای تحلیل سریع توسط مدل‌ها."},{text:"بهینه‌سازی مسیر ناوبری (Breadcrumbs): جابجایی آسان‌تر بین پوشه‌ها و پرونده‌ها در نمای فایل."},{text:"پشتیبانی از زیر-ایجنت‌های تودرتو: امکان مشاهده تمام زیر-ایجنت‌های مرتبط با مکالمه اصلی در نمای کلی."}]}]}},{version:"نسخه ۲.۰.۰<br>فروردین ۱۴۰۳",description:"معرفی نسل جدید پلتفرم پراپ و مرکز فرماندهی ایجنت‌ها",accordion:{changes:"<p>انتشار رسمی پلتفرم پراپ ۲.۰ با پشتیبانی کامل از مدل‌های پیشرفته، معماری ایجنت‌های موازی و ابزارهای تحلیل داده</p>",items:[{title:"ویژگی‌های کلیدی",accordion_items:[{text:"معماری ایجنت موازی: اجرای چندین ایجنت مستقل برای حل هم‌زمان مسائل پیچیده."},{text:"مدیریت فضاهای کاری چندگانه: تفکیک پروژه‌ها و مستندات سازمانی با حفظ امنیت بالا."},{text:"اتصال مستقیم به منابع داده: یکپارچگی سریع با پایگاه‌های داده و ابزارهای سازمانی."}]}]}}]}`;
    mainJs = mainJs.substring(0, g7Start) + newG7 + mainJs.substring(g7End + 1);
    console.log('✓ 6. Replaced g7 (Changelog data)');
  }
}

// 7. Replace OV (Terms data)
const ovStart = mainJs.indexOf('OV={elements:[');
if (ovStart !== -1) {
  let depth = 0, ovEnd = -1;
  for (let i = ovStart + 3; i < mainJs.length; i++) {
    if (mainJs[i] === '{') depth++;
    else if (mainJs[i] === '}') {
      depth--;
      if (depth === 0) { ovEnd = i; break; }
    }
  }
  if (ovEnd !== -1) {
    const newOV = `OV={elements:[{tag:"p",class:"caption",text:"به پلتفرم هوش مصنوعی پراپ خوش آمدید. استفاده از خدمات، نرم‌افزارها و وب‌سایت پراپ به منزله پذیرش کامل این شرایط و ضوابط می‌باشد."},{tag:"h3",text:"۱. شرایط کلی و حساب کاربری"},{tag:"p",text:"کاربران موظفند اطلاعات دقیق و معتبر هنگام ثبت‌نام ارائه دهند و مسئولیت حفظ امنیت حساب کاربری و کلیدهای دسترسی (API Keys) بر عهده خود کاربر است."},{tag:"h3",text:"۲. حریم خصوصی و امنیت داده‌ها"},{tag:"p",text:"پراپ به امنیت و محرمانگی داده‌های مشتریان خود متعهد است. تمامی تبادلات داده رمزنگاری شده و داده‌های ورودی بدون اجازه صریح کاربر برای آموزش مدل‌های عمومی استفاده نمی‌شوند."},{tag:"h3",text:"۳. قوانین استفاده منصفانه و سهمیه‌ها"},{tag:"p",text:"استفاده از خدمات بر اساس پلن انتخابی کاربر بوده و هرگونه سوءاستفاده یا نقض قوانین جاری کشور منجر به تعلیق حساب کاربری خواهد شد."},{tag:"h3",text:"۴. پشتیبانی و تعهدات سطح خدمات (SLA)"},{tag:"p",text:"پراپ در پلن‌های حرفه‌ای و سازمانی تضمین آپ‌تایم ۹۹.۸٪ و پشتیبانی سریع ارائه می‌دهد. برای هرگونه سوال با تیم پشتیبانی در ارتباط باشید."}]}`;
    mainJs = mainJs.substring(0, ovStart) + newOV + mainJs.substring(ovEnd + 1);
    console.log('✓ 7. Replaced OV (Terms data)');
  }
}

// 8. Replace DOCS_STRUCTURE in yw
const docsStart = mainJs.indexOf('DOCS_STRUCTURE=[');
if (docsStart !== -1) {
  const docsEnd = mainJs.indexOf('];', docsStart);
  if (docsEnd !== -1) {
    const newDocsStructure = `DOCS_STRUCTURE=[{section:"خانه",path:"home",slug:"home"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"overview"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"getting-started"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"build-with-google"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"features"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"models"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"projects"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"settings"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"agent-settings"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"artifact-review"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"mcp"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"skills"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"rules-workflows"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"plugins"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"hooks"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"sidecars"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"permissions"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"subagents"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"artifacts"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"implementation-plan"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"walkthrough"},{section:"پلتفرم پراپ ۲.۰",path:"antigravity-2-0",slug:"screenshots"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-overview"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-getting-started"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-install"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-tutorial"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-using"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-features"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"gcli-migration"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-prompting"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-artifacts"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-conversations"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-subagents"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-permissions"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-sandbox"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-settings"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-credits"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-plugins"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-statusline"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-title"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-best-practices"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-troubleshooting"},{section:"رابط خط فرمان (CLI)",path:"cli",slug:"cli-reference"},{section:"کیت توسعه (SDK)",path:"sdk",slug:"sdk-overview"},{section:"محیط توسعه هوشمند (IDE)",path:"ide",slug:"ide-overview"},{section:"محیط توسعه هوشمند (IDE)",path:"ide",slug:"ide-getting-started"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"tab"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"agent-side-panel"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"review-changes-editor"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-implementation-plan"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-walkthrough"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-screenshots"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-browser-recordings"},{section:"محیط توسعه هوشمند (IDE)",path:"browser",slug:"browser"},{section:"محیط توسعه هوشمند (IDE)",path:"browser",slug:"allowlist-denylist"},{section:"محیط توسعه هوشمند (IDE)",path:"browser",slug:"separate-chrome-profile"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-mcp"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-skills"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-rules"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-workflows"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-plugins"},{section:"محیط توسعه هوشمند (IDE)",path:"editor",slug:"ide-hooks"},{section:"محیط توسعه هوشمند (IDE)",path:"settings",slug:"ide-settings"},{section:"مهاجرت و انتقال",path:"migration",slug:"firebase-studio-migration"},{section:"راهکارهای سازمانی",path:"enterprise",slug:"enterprise"},{section:"پلن‌ها و قیمت‌گذاری",path:"plans",slug:"plans"},{section:"پرسش‌های متداول (FAQ)",path:"faq",slug:"faq"}]`;
    mainJs = mainJs.substring(0, docsStart) + newDocsStructure + mainJs.substring(docsEnd + 1);
    console.log('✓ 8. Replaced DOCS_STRUCTURE');
  }
}

// 9. Fix docs tree indentation to RTL (padding-right instead of padding-left)
mainJs = mainJs.split('Mi("padding-left",.75+t.level*1.2,"rem")').join('Mi("padding-right",.75+t.level*1.2,"rem")');
console.log('✓ 9. Patched docs tree indentation for RTL');

// 10. Replace common UI template text & buttons
const stringReplacements = [
  ['"buttonText","Explore Product"', '"buttonText","بررسی امکانات محصول"'],
  ['"buttonText","Explore use case"', '"buttonText","مشاهده موارد استفاده"'],
  ['"buttonText","Explore product"', '"buttonText","بررسی امکانات محصول"'],
  ['"buttonText","View previous releases"', '"buttonText","مشاهده نسخه‌های قبلی"'],
  ['"buttonText","View docs"', '"buttonText","مشاهده مستندات"'],
  ['"buttonText","View changelog"', '"buttonText","مشاهده گزارش تغییرات"'],
  ['"buttonText","Explore use cases"', '"buttonText","مشاهده کاربردها"'],
  ['"buttonText","All download options"', '"buttonText","مشاهده همه گزینه‌ها"'],
  ['"Name is required."', '"وارد کردن نام الزامی است."'],
  ['"A valid email is required."', '"ایمیل معتبر الزامی است."'],
  ['"You must accept the terms."', '"پذیرش قوانین الزامی است."'],
  ['R(1,"Name")', 'R(1,"نام و نام خانوادگی")'],
  ['R(1,"Company")', 'R(1,"سازمان / شرکت")'],
  ['R(1,"Email")', 'R(1,"ایمیل کاری")'],
  ['R(1,"Submit")', 'R(1,"ارسال درخواست")'],
  ['"I accept the Terms and Conditions"', '"شرایط و ضوابط را می‌پذیرم"'],
  ['"I accept Google\'s"', '"شرایط و ضوابط"'],
  ['"and acknowledge that my information will be used in accordance with Google\'s"', '"و سیاست‌های حریم خصوصی را می‌پذیرم"'],
  ['"Privacy Policy"', '"حریم خصوصی"'],
  ['"Google Antigravity for Organizations"', '"راهکارهای سازمانی پراپ"'],
  ['"Interest Form"', '"فرم مشاوره سازمانی"'],
  ['"Thank you. Your information has been sent to Google. We will be in touch soon."', '"با تشکر، اطلاعات شما ثبت شد. به زودی با شما تماس خواهیم گرفت."'],
  ['R(1,"Copy")', 'R(1,"کپی")'],
  ['R(1,"Version")', 'R(1,"نسخه")'],
  ['R(1,"Description")', 'R(1,"توضیحات")'],
  ['R(1,"Download PNG")', 'R(1,"دانلود نشان پراپ (PNG)")'],
  ['R(1,"Press Assets")', 'R(1,"دارایی‌های برند پراپ")'],
  ['"New versions are rolled out gradually and may take a few days to reach all users."', '"به‌روزرسانی‌ها به تدریج منتشر می‌شوند و برای همه کاربران در دسترس قرار می‌گیرند."'],
  ['"Using another distribution? You can download the source tarball"', '"استفاده از سایر توزیع‌ها؟ می‌توانید فایل فشرده منبع را دریافت کنید"'],
  ['"here"', '"اینجا"'],
  ['"Using MacOS or Windows?"', '"از مک یا ویندوز استفاده می‌کنید؟"'],
  ['"You have successfully authenticated."', '"احراز هویت شما با موفقیت انجام شد."'],
  ['"You should be redirected back to the product."', '"اکنون به پنل محصول هدایت می‌شوید."'],
  ['"You have successfully verified your account."', '"حساب کاربری شما با موفقیت تأیید شد."'],
  ['"Paste this code into your application to complete authentication:"', '"این کد را برای تکمیل ورود در برنامه وارد کنید:"'],
  ['"No authorization code found. Please try authenticating again."', '"کد مجوزی یافت نشد. لطفاً مجدداً وارد شوید."'],
  ['setTitle("Google Antigravity - Blog")', 'setTitle("پراپ — وبلاگ و مقالات")'],
  ['setTitle("Google Antigravity - Changelog")', 'setTitle("پراپ — گزارش تغییرات")'],
  ['setTitle("Google Antigravity - Pricing")', 'setTitle("پراپ — تعرفه‌ها و پلن‌ها")'],
  ['setTitle("Google Antigravity - Product")', 'setTitle("پراپ — معرفی محصول")'],
  ['setTitle("Google Antigravity - Terms of Service")', 'setTitle("پراپ — شرایط و ضوابط")'],
  ['setTitle("Google Antigravity Auth Success")', 'setTitle("ورود موفق به پراپ")'],
  ['setTitle("Google Antigravity Verification Success")', 'setTitle("تأیید حساب کاربری پراپ")'],
  ['setTitle("Google Antigravity Authentication")', 'setTitle("احراز هویت پراپ")'],
  ['setTitle("Google Antigravity - Releases")', 'setTitle("پراپ — آرشیو نسخه‌ها")'],
  ['title:"Google Antigravity Blog"', 'title:"پراپ — وبلاگ و مقالات هوش مصنوعی"'],
  ['title:"Google Antigravity Use Cases"', 'title:"پراپ — موارد استفاده و کاربردها"'],
  ['title:"Google Antigravity Use Case"', 'title:"پراپ — کاربردها"'],
  ['title:"Google Antigravity Download"', 'title:"پراپ — دریافت و نصب پلتفرم"'],
  ['title:"Google Antigravity Download Linux"', 'title:"پراپ — دریافت نسخه لینوکس"'],
  ['title:"Google Antigravity Changelog"', 'title:"پراپ — گزارش تغییرات و به‌روزرسانی‌ها"'],
  ['title:"Google Antigravity Pricing"', 'title:"پراپ — تعرفه‌ها و پلن‌های سازمانی"'],
  ['title:"Google Antigravity Support"', 'title:"پراپ — مرکز پشتیبانی و ارتباط"'],
  ['title:"Google Antigravity Products"', 'title:"پراپ — خدمات و محصولات هوش مصنوعی"'],
  ['title:"Google Antigravity Product"', 'title:"پراپ — معرفی ابزارها و قابلیت‌ها"'],
  ['title:"Google Antigravity Terms and Conditions"', 'title:"پراپ — قوانین و شرایط استفاده"'],
  ['title:"Google Antigravity for Organizations Interest Form"', 'title:"پراپ — فرم مشاوره سازمانی"'],
  ['title:"Google Antigravity Documentation"', 'title:"پراپ — مستندات جامع توسعه‌دهندگان"'],
  ['title:"Google Antigravity Releases"', 'title:"پراپ — آرشیو نسخه‌های منتشرشده"'],
  ['"To stay in the loop about Google Antigravity for organizations, please provide your contact information."', '"برای دریافت اطلاعات و هماهنگی نسخه سازمانی پراپ، لطفاً اطلاعات تماس خود را وارد نمایید."'],
  ['"deb-based Linux distributions (eg. Debian, Ubuntu)"', '"توزیع‌های مبتنی بر دبیان (دبیان، اوبونتو، مینت)"'],
  ['"1. Add the repository to sources.list.d"', '"۱. افزودن مخزن به sources.list.d"'],
  ['"2. Update the package cache"', '"۲. به‌روزرسانی لیست بسته‌ها"'],
  ['"3. Install the package"', '"۳. نصب بسته پلتفرم"'],
  ['"rpm-based Linux distributions (eg. Red Hat, Fedora, SUSE)"', '"توزیع‌های مبتنی بر RPM (فدورا، ردهت، سوزه)"'],
  ['"1. Add the repository to /etc/yum.repos.d"', '"۱. افزودن مخزن به /etc/yum.repos.d"'],
  ['"Download previous Google Antigravity and Antigravity IDE releases. By default, they auto-update to the latest version. To stay on old versions, you will need to set Update: Mode to manual or none in the settings."', '"دانلود نسخه‌های قبلی پلتفرم و محیط توسعه پراپ. به‌روزرسانی‌ها به طور پیش‌فرض خودکار انجام می‌شوند."']
];

for (const [search, replace] of stringReplacements) {
  if (mainJs.includes(search)) {
    mainJs = mainJs.split(search).join(replace);
    console.log(`✓ Replaced: ${search.slice(0, 30)}...`);
  }
}

const { execSync } = require('child_process');

// Validate syntax with Node.js built-in module syntax checker before writing!
const tmpPath = path.join(__dirname, '../main-temp-check.js');
fs.writeFileSync(tmpPath, mainJs, 'utf8');
try {
  execSync(`node --check ${tmpPath}`);
  console.log('✓ SYNTAX CHECK PASSED! No syntax errors.');
  fs.unlinkSync(tmpPath);
} catch (e) {
  console.error('SYNTAX ERROR in generated bundle:', e.message);
  fs.unlinkSync(tmpPath);
  process.exit(1);
}

fs.writeFileSync(path.join(__dirname, '../main-462OM7XN.js'), mainJs, 'utf8');
console.log('--- Successfully saved localized main-462OM7XN.js ---');
