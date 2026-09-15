const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log('--- Starting Best_AI & New-Prop-AI Full Integration ---');

// 1. Ensure asset directories and copies exist
const assetDirs = [
  'assets/icons',
  'assets/image/sitecards',
  'assets/image/brand'
];
for (const d of assetDirs) {
  fs.mkdirSync(path.join(__dirname, d), { recursive: true });
}

const iconCopies = [
  ['assets/image/icons/use-cases/fullstack.svg', 'assets/icons/full-stack-icon.svg'],
  ['assets/image/icons/use-cases/professional.svg', 'assets/icons/enterprise-icon.svg'],
  ['assets/image/icons/use-cases/frontend.svg', 'assets/icons/frontend-icon.svg'],
  ['assets/textures/icons/cube.png', 'assets/textures/icons/icon_cube.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-default.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-blog.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-use-cases.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-plans-and-pricing.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-changelog.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-documentation.png'],
  ['assets/image/antigravity-logo.png', 'assets/image/sitecards/sitecard-support.png'],
  ['assets/image/landing/landing-thumbnail-fullstack.jpg', 'assets/image/placeholder-detail.png']
];

for (const [src, dest] of iconCopies) {
  if (fs.existsSync(path.join(__dirname, src)) && !fs.existsSync(path.join(__dirname, dest))) {
    fs.copyFileSync(path.join(__dirname, src), path.join(__dirname, dest));
  }
}

// 2. Create .nojekyll
fs.writeFileSync(path.join(__dirname, '.nojekyll'), '');

// 3. Load clean source file
let mainJs = fs.readFileSync(path.join(__dirname, 'best_ai_src/main-462OM7XN.js'), 'utf8');
const originalLength = mainJs.length;

// A. Replace Hero Headline string in landing template consts
const oldHeadline = '["text","Experience liftoff with the next-gen agent platform","augmentedClasses","landing-main",3,"initialDelay","endDelay"]';
const newHeadline = '["text","راهکارهای هوش مصنوعی برای کسبوکارهای آیندهنگر","augmentedClasses","landing-main",3,"initialDelay","endDelay"]';
if (!mainJs.includes(oldHeadline)) throw new Error('oldHeadline not found');
mainJs = mainJs.replace(oldHeadline, newHeadline);
console.log('✓ A. Replaced hero headline');

// B. Patch typed-header (Mn) to never split Persian text into chars
const oldTypedInit = 'ngAfterViewInit(){this.splitContent=Wl.create(this.typedContent.nativeElement,{type:"chars, words"});let n=this.splitContent.chars[0],t=n.offsetParent;this.updateBlinkingCursor(t.offsetLeft+n.offsetLeft,t.offsetTop+n.offsetTop)}';
const newTypedInit = 'ngAfterViewInit(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");this.splitContent=Wl.create(this.typedContent.nativeElement,{type:isFa?"words":"chars, words"});if(isFa&&this.splitContent.words&&this.splitContent.words.length){this.splitContent.chars=this.splitContent.words;for(let w of this.splitContent.words){w.style.display="inline-block";w.style.margin="0 0.25rem";w.style.whiteSpace="nowrap"}};let n=this.splitContent.chars?.[0]||this.splitContent.words?.[0],t=n?.offsetParent;if(t&&n)this.updateBlinkingCursor(t.offsetLeft+n.offsetLeft,t.offsetTop+n.offsetTop)}';
if (!mainJs.includes(oldTypedInit)) throw new Error('oldTypedInit not found');
mainJs = mainJs.replace(oldTypedInit, newTypedInit);
console.log('✓ B1. Patched typed-header ngAfterViewInit');

const oldTypedStart = 'startTyping(n,t){let i=this;return n||(n=Hn.timeline()),Hn.registerPlugin(Wl),n.set(this.cursorContainer.nativeElement,{opacity:1}),n.fromTo(this.splitContent.chars,{opacity:0},{opacity:1,duration:.01,delay:t??this.initialDelay,stagger:{each:this.staggerSpeed,onStart:function(){let r=this.targets()[0];r&&r?.offsetParent&&i.updateBlinkingCursor(r.offsetParent.offsetLeft+r.offsetLeft+r.offsetWidth+10,r.offsetParent.offsetTop+r.offsetTop)}},ease:"power2.out",onComplete:()=>{i.doneTyping=!0}}),this.cursorPersists||n.to(this.cursorContainer.nativeElement,{opacity:0,duration:this.endDelay,ease:"none"}),n}';
const newTypedStart = 'startTyping(n,t){let i=this;let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");n||(n=Hn.timeline());Hn.registerPlugin(Wl);n.set(this.cursorContainer.nativeElement,{opacity:1});let animTargets=(isFa&&this.splitContent.words?.length)?this.splitContent.words:this.splitContent.chars;return n.fromTo(animTargets,{opacity:0},{opacity:1,duration:isFa?.15:.01,delay:t??this.initialDelay,stagger:{each:isFa?.08:this.staggerSpeed,onStart:function(){let r=this.targets()[0];r&&r?.offsetParent&&i.updateBlinkingCursor(r.offsetParent.offsetLeft+r.offsetLeft+r.offsetWidth+10,r.offsetParent.offsetTop+r.offsetTop)}},ease:"power2.out",onComplete:()=>{i.doneTyping=!0}}),this.cursorPersists||n.to(this.cursorContainer.nativeElement,{opacity:0,duration:this.endDelay,ease:"none"}),n}';
if (!mainJs.includes(oldTypedStart)) throw new Error('oldTypedStart not found');
mainJs = mainJs.replace(oldTypedStart, newTypedStart);
console.log('✓ B2. Patched typed-header startTyping');

// C. Patch feature-explorer-new (gv / gf) to never split Persian text into chars
const oldFeatureAnim = 'registerAnimation(n){ut.registerPlugin(xt,Wl);let t=this.featureTitles.toArray(),i=this.featureDescriptions.toArray();t.forEach((r,o)=>{setTimeout(()=>{let a=new Wl(i[o].nativeElement,{type:"words, chars"});ut.set(a.chars,{opacity:0}),ut.timeline({scrollTrigger:{trigger:r.nativeElement,start:"top 85%",toggleActions:"play none none none"}}).to(a.chars,{opacity:1,stagger:.005,duration:.1,ease:"power2.out"})},100)})}';
const newFeatureAnim = 'registerAnimation(n){ut.registerPlugin(xt,Wl);let t=this.featureTitles.toArray(),i=this.featureDescriptions.toArray();t.forEach((r,o)=>{setTimeout(()=>{let isFa=/[\\u0600-\\u06FF]/.test(i[o].nativeElement.textContent||"");let a=new Wl(i[o].nativeElement,{type:isFa?"words":"words, chars"});let animTargets=(isFa&&a.words?.length)?a.words:a.chars;if(isFa&&a.words){a.words.forEach(w=>{w.style.display="inline-block";w.style.margin="0 0.2rem";w.style.whiteSpace="nowrap"})};ut.set(animTargets,{opacity:0}),ut.timeline({scrollTrigger:{trigger:r.nativeElement,start:"top 85%",toggleActions:"play none none none"}}).to(animTargets,{opacity:1,stagger:isFa?.04:.005,duration:isFa?.2:.1,ease:"power2.out"})},100)})}';
if (!mainJs.includes(oldFeatureAnim)) throw new Error('oldFeatureAnim not found');
mainJs = mainJs.replace(oldFeatureAnim, newFeatureAnim);
console.log('✓ C. Patched feature-explorer-new SplitText');

// D. Change scoped CSS display:block to display:inline-block
const oldScopedSpanCss = '.landing-main-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block}';
const newScopedSpanCss = '.landing-main-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block}';
if (!mainJs.includes(oldScopedSpanCss)) throw new Error('oldScopedSpanCss not found');
mainJs = mainJs.replace(oldScopedSpanCss, newScopedSpanCss);
console.log('✓ D. Neutralized scoped CSS display:block');

// E. Patch Hero CTA buttons text
const oldBtn1 = '("buttonText","Download"+t.userDeviceInfo.operatingSystem.buttonText)';
const newBtn1 = '("buttonText","شروع رایگان — ۱۴ روز")';
if (!mainJs.includes(oldBtn1)) throw new Error('oldBtn1 not found');
mainJs = mainJs.replace(oldBtn1, newBtn1);
console.log('✓ E1. Patched primary CTA button');

const oldBtn2 = '["routerLink","/use-cases","variant","secondary","buttonText","Explore use cases"]';
const newBtn2 = '["routerLink","/product","variant","secondary","buttonText","مشاهده دمو ↙"]';
if (!mainJs.includes(oldBtn2)) throw new Error('oldBtn2 not found');
mainJs = mainJs.replace(oldBtn2, newBtn2);
console.log('✓ E2. Patched secondary CTA button');

// F. Patch title
const oldDocTitle = 'title=$n("Google Antigravity");';
const newDocTitle = 'title=$n("پراپ — راهکارهای هوش مصنوعی");';
if (!mainJs.includes(oldDocTitle)) throw new Error('oldDocTitle not found');
mainJs = mainJs.replace(oldDocTitle, newDocTitle);
console.log('✓ F. Patched doc title in constructor');

// G. Replace ru data object
const ruStart = mainJs.indexOf('ru=[');
const ruEnd = mainJs.indexOf('}],HJ=', ruStart);
if (ruStart === -1 || ruEnd === -1) throw new Error('ru bounds not found');
const newRu = `ru=[{agent_first:{title:"پلتفرم هوش مصنوعی برای کسب‌وکارهایی که آینده را جدی می‌گیرند. بیش از ۳۲۰۰ کسب‌وکار فعال با پراپ فرآیندهای خود را هوشمند کرده‌اند."}},{latest_blogs:{title:"وبلاگ و مقالات پراپ",button:{routerLink:"/blog",variant:"secondary",buttonText:"مشاهده همه مقالات"},latestBlogs:[{categories:["هوش مصنوعی"],articleSlug:"ai-business-transformation",date:"2026-05-19T10:45:00.000Z",title:"چگونه هوش مصنوعی کسب‌وکارها را متحول می‌کند",articleImage:"Google IO - Square.jpg"},{categories:["اتوماسیون"],articleSlug:"process-automation-guide",date:"2026-05-19T10:44:00.000Z",title:"راهنمای جامع اتوماسیون فرآیندهای سازمانی با پراپ",articleImage:"AGY2 Square.jpg"},{categories:["مدیریت داده"],articleSlug:"advanced-data-analytics",date:"2026-05-19T10:43:00.000Z",title:"تحلیل پیشرفته داده‌ها و داشبوردهای تصمیم‌گیری هوشمند",articleImage:"Agent Teams Square.jpg"},{categories:["امنیت"],articleSlug:"ai-security-compliance",date:"2026-05-19T10:42:00.000Z",title:"امنیت داده و انطباق استانداردها در پلتفرم پراپ",articleImage:"AGY CLI Blog - Square.png"}]}},{use_cases:{title:"در ۳ گام ساده شروع کنید",subtitle:"نحوه کار با پراپ",description:"بدون نیاز به تخصص فنی — فقط کسب‌وکار خود را توصیف کنید و ما بقیه کار را می‌کنیم.",useCases:[{id:"connect",title:"۰۱ — اتصال داده‌ها",description:"منابع داده خود را با یک کلیک به پلتفرم پراپ متصل کنید. پشتیبانی از ۱۸۰+ ادغام آماده.",image:"assets/image/landing/landing-thumbnail-fullstack.jpg",icon:"assets/image/icons/use-cases/fullstack.svg",youtubeUrl:"https://www.youtube.com/embed/htV29JrMXmA"},{id:"train",title:"۰۲ — آموزش مدل اختصاصی",description:"هوش مصنوعی بر اساس داده‌های خاص کسب‌وکار شما آموزش می‌بیند و بهینه‌سازی می‌شود.",image:"assets/image/landing/landing-thumbnail-enterprise.jpg",icon:"assets/image/icons/use-cases/professional.svg",youtubeUrl:"https://www.youtube.com/embed/B4do6xuIgD4"},{id:"deploy",title:"۰۳ — استقرار و رشد",description:"مدل را در محیط واقعی مستقر کنید و با مانیتورینگ مداوم، بهبود مستمر داشته باشید.",image:"assets/image/landing/landing-thumbnail-frontend.jpg",icon:"assets/image/icons/use-cases/frontend.svg",youtubeUrl:"https://www.youtube.com/embed/yiHKlPuZ73c"}]}},{video:{title:"پلتفرم جامع هوش مصنوعی پراپ",description:"از تحلیل داده تا اتوماسیون پیشرفته — همه چیز در یک پلتفرم یکپارچه",videoUrl:"https://youtube.com/embed/SVCBA-pBgt0"}},{try_solutions:{sections:[{morphingParticle:"/assets/textures/icons/individual.png",title:"هزاران تیم به پراپ اعتماد دارند",subtitle:"رضا محمدی — مدیرعامل تک‌شاپ",description:"«با پراپ توانستیم فرآیند پشتیبانی مشتری را کاملاً خودکار کنیم. ۷۰٪ تیکت‌ها بدون دخالت انسانی حل می‌شوند و رضایت مشتری ۴۰٪ بالا رفته.»",button:{routerLink:"/pricing",variant:"primary",buttonText:"مشاهده پلن‌ها"}},{morphingParticle:"/assets/textures/icons/cube.png",title:"رشد پایدار و تصمیم‌گیری دقیق",subtitle:"سارا احمدی — مدیر داده دیجی‌پلاس",description:"«تحلیل داده‌های فروش که قبلاً ۲ هفته طول می‌کشید حالا در ۲ دقیقه انجام می‌شود. دقت پیش‌بینی ۳۵٪ بهتر شده.»",button:{routerLink:"/pricing",variant:"secondary",buttonText:"مشاوره رایگان"}}]}},{landing:{features:[{title:"پردازش زبان طبیعی",description:"تحلیل متن، خلاصه‌سازی اسناد، پاسخ‌دهی هوشمند و ترجمه چندزبانه با دقت بالا.",icon:"chat",media:"image/product/new-chat.png"},{title:"تحلیل پیشرفته داده",description:"داشبوردهای هوشمند، پیش‌بینی روندها و استخراج بینش‌های کاربردی از حجم عظیم داده.",icon:"analytics",media:"image/landing/antigravity-cli.png"},{title:"اتوماسیون فرآیند",description:"خودکارسازی وظایف تکراری، مدیریت گردش کار و بهینه‌سازی زنجیره ارزش کسب‌وکار.",icon:"bolt",media:"image/landing/feature-3.jpg"},{title:"بینایی ماشین",description:"تشخیص تصویر، کنترل کیفیت خودکار، تحلیل ویدیو و سیستم‌های نظارت هوشمند.",icon:"visibility",media:"video/landing/an-ai-ide-core.mp4"},{title:"چت‌بات سفارشی",description:"ساخت دستیار مکالمه‌ای اختصاصی برای پشتیبانی مشتری، فروش و آموزش کارکنان.",icon:"psychology",media:"image/product/new-chat.png"},{title:"امنیت و انطباق",description:"تشخیص تهدید در لحظه، نظارت بر انطباق مقرراتی و حفاظت از داده‌های حساس سازمانی.",icon:"security",media:"image/landing/feature-3.jpg"}]}}`;
mainJs = mainJs.substring(0, ruStart) + newRu + mainJs.substring(ruEnd + 1);
console.log('✓ G. Replaced ru data object');

// H. Replace pricing data (v7)
const v7Start = mainJs.indexOf('v7={title:');
const v7End = mainJs.indexOf('}]},vle=', v7Start);
if (v7Start === -1 || v7End === -1) throw new Error('v7 bounds not found');
const newV7 = `v7={title:"شفاف، منصفانه، مقیاس‌پذیر",link_text:"بدون هزینه پنهان. با رشد کسب‌وکارتان، پلن خود را ارتقا دهید.<i>arrow_forward_ios</i>",link:"/pricing",footnotes:{"*":{link:"/support",text:"اطلاعات بیشتر در بخش پشتیبانی"}},pricing_cards:[{label:"استارتر",title:"استارتر<br><span class='second-line'>رایگان / ماهانه</span>",description:"برای تیم‌های کوچک و استارتاپ‌هایی که تازه شروع می‌کنند.",button_text:"شروع رایگان",link:"/download",features_title:"شامل:",features:["تا ۵۰۰۰ درخواست ماهانه","۳ پروژه فعال","مدل‌های پایه هوش مصنوعی","پشتیبانی ایمیلی"]},{label:"حرفه‌ای — محبوب‌ترین",title:"حرفه‌ای<br><span class='second-line'>۲۹۹ هزارتومان / ماه</span>",description:"برای کسب‌وکارهایی که رشد جدی دارند و به قابلیت‌های پیشرفته نیاز دارند.",button_text:"شروع ۱۴ روز رایگان",link:"/download",secondary_button_text:"خرید اشتراک",secondary_link:"/pricing",features_title:"همه امکانات استارتر به همراه:",features:["درخواست‌های نامحدود","پروژه‌های نامحدود","مدل‌های پیشرفته هوش مصنوعی","API اختصاصی","پشتیبانی ۲۴/۷","آموزش مدل سفارشی"]},{label:"سازمانی",title:"سازمانی<br><span class='second-line'>سفارشی</span>",description:"برای سازمان‌های بزرگ با نیازهای خاص و سطح امنیت بالا.",button_text:"تماس با فروش",link:"/support",features_title:"امکانات سازمانی:",features:["زیرساخت اختصاصی","SLA 99.99%","استقرار On-Premise","انطباق SOC2 و ISO27001","مدیر اکانت اختصاصی"]}]`;
mainJs = mainJs.substring(0, v7Start) + newV7 + mainJs.substring(v7End + 2);
console.log('✓ H. Replaced pricing data (v7)');

// I. Replace navigation data (Ele)
const eleStart = mainJs.indexOf('Ele={nav:');
const eleEnd = mainJs.indexOf('}]},_7=Ele,', eleStart);
if (eleStart === -1 || eleEnd === -1) throw new Error('Ele bounds not found');
const newEle = `Ele={nav:[{title:"خدمات",link:"/product",dropdown:{id:"product",navTitle:"خدمات",navLink:"/product",title:"راهکارهای هوشمند برای رشد کسب‌وکار",info:"",sublinks:[{title:"پردازش زبان طبیعی",icon:"chat",url:"/product"},{title:"تحلیل پیشرفته داده",icon:"analytics",url:"/product"},{title:"اتوماسیون فرآیند",icon:"bolt",url:"/product"},{title:"بینایی ماشین",icon:"visibility",url:"/product"}]}},{title:"کاربردها",link:"/use-cases",dropdown:{id:"use-cases",navTitle:"کاربردها",navLink:"/use-cases",title:"راهکارها برای صنایع و کسب‌وکارهای مختلف",info:"",sublinks:[{title:"سازمانی",icon:"",url:"/use-cases"},{title:"کسب‌وکارهای داده‌محور",icon:"",url:"/use-cases"},{title:"توسعه‌دهندگان",icon:"",url:"/use-cases"}]}},{title:"قیمت‌گذاری",link:"/pricing"},{title:"وبلاگ",link:"/blog"},{title:"منابع",link:"/docs",dropdown:{title:"همه چیز برای شروع و یادگیری",id:"resources",sublinks:[{title:"مستندات",url:"/docs"},{title:"به‌روزرسانی‌ها",url:"/changelog"},{title:"پشتیبانی",url:"/support"}]}}]`;
mainJs = mainJs.substring(0, eleStart) + newEle + mainJs.substring(eleEnd + 2);
console.log('✓ I. Replaced navigation data (Ele)');

// J. Replace footer data (EV)
const evStart = mainJs.indexOf('EV={slogan:');
const evEnd = mainJs.indexOf('}]},Ew=class lw{', evStart);
if (evStart === -1 || evEnd === -1) throw new Error('EV bounds not found');
const newEV = `EV={slogan:"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده‌نگر.",section:[{title:"محصول و خدمات",description:"",links:[{title:"خدمات",link:"/product"},{title:"قیمت‌گذاری",link:"/pricing"},{title:"مستندات",link:"/docs"},{title:"به‌روزرسانی‌ها",link:"/changelog"}]},{title:"منابع و پشتیبانی",description:"",links:[{title:"وبلاگ",link:"/blog"},{title:"کاربردها",link:"/use-cases"},{title:"پشتیبانی",link:"/support"},{title:"شروع کار",link:"/download"}]}],googleLinks:[{title:"درباره پراپ",link:"/terms"},{title:"حریم خصوصی",link:"/terms"},{title:"شرایط استفاده",routerLink:"/terms"}]`;
mainJs = mainJs.substring(0, evStart) + newEV + mainJs.substring(evEnd + 2);
console.log('✓ J. Replaced footer data (EV)');

// K. Replace metadata service routes (getMetadataForRoute)
const metaRouteStart = mainJs.indexOf('getMetadataForRoute(n){return{"/":{title:"Google Antigravity"');
if (metaRouteStart !== -1) {
  const metaRouteEnd = mainJs.indexOf('}}[n]||', metaRouteStart);
  if (metaRouteEnd !== -1) {
    const newMetaRoutes = `getMetadataForRoute(n){return{"/":{title:"پراپ — راهکارهای هوش مصنوعی",description:"پراپ با ارائه ابزارهای پیشرفته هوش مصنوعی، به شما کمک می‌کند فرآیندها را خودکارسازی کنید، بینش‌های ارزشمند به دست آورید و رشد پایدار داشته باشید.",image:this.defaultImage,url:"/"},"/blog":{title:"وبلاگ پراپ — مقالات و اخبار هوش مصنوعی",description:"جدیدترین مقالات و آموزش‌های هوش مصنوعی و اتوماسیون کسب‌وکار",image:"/assets/image/sitecards/sitecard-blog.png",url:"/blog"},"/download":{title:"شروع کار با پراپ",description:"شروع رایگان با پلتفرم هوش مصنوعی پراپ",image:this.defaultImage,url:"/download"},"/product":{title:"خدمات هوش مصنوعی پراپ",description:"بررسی ویژگی‌ها و قابلیت‌های پلتفرم پراپ",image:this.defaultImage,url:"/product"},"/pricing":{title:"قیمت‌گذاری و پلن‌های پراپ",description:"پلن‌های قیمت‌گذاری منصفانه و شفاف پلتفرم هوش مصنوعی پراپ",image:this.defaultImage,url:"/pricing"},"/use-cases":{title:"کاربردهای پراپ",description:"راهکارهای هوش مصنوعی پراپ برای صنایع و کاربردهای گوناگون",image:this.defaultImage,url:"/use-cases"},"/docs":{title:"مستندات پلتفرم پراپ",description:"راهنماها و مستندات توسعه و استفاده از پراپ",image:this.defaultImage,url:"/docs"},"/support":{title:"پشتیبانی پراپ",description:"مرکز راهنمایی و پشتیبانی کاربران پراپ",image:this.defaultImage,url:"/support"},"/terms":{title:"قوانین و شرایط پراپ",description:"شرایط و ضوابط استفاده از پلتفرم پراپ",image:this.defaultImage,url:"/terms"}}`;
    mainJs = mainJs.substring(0, metaRouteStart) + newMetaRoutes + mainJs.substring(metaRouteEnd + 2);
    console.log('✓ K. Replaced getMetadataForRoute cleanly');
  }
}

// L. Replace Header Download button labels & REMOVE the "download" icon from CTA button
mainJs = mainJs.split('"dropdownIcon","download"').join('"dropdownIcon",""');
mainJs = mainJs.split('"buttonText","Download"').join('"buttonText","شروع رایگان"');
mainJs = mainJs.split('R(2,"See overview")').join('R(2,"مشاهده همه")');

// M. Replace Bottom Download Section and other generic English texts
mainJs = mainJs.split('t.titleText||"Download Google Antigravity"+t.userDeviceInfo.operatingSystem.buttonText').join('"شروع کار با پلتفرم هوش مصنوعی پراپ"');
mainJs = mainJs.split('"Download Google Antigravity"').join('"شروع کار با پلتفرم هوش مصنوعی پراپ"');
mainJs = mainJs.split('"Download for Linux"').join('"شروع کار با پراپ"');
mainJs = mainJs.split('"Download for macOS"').join('"شروع کار با پراپ"');
mainJs = mainJs.split('"Download for Windows"').join('"شروع کار با پراپ"');
mainJs = mainJs.split('"View case"').join('"مشاهده جزئیات"');
mainJs = mainJs.split('"Read blog"').join('"خواندن مقاله"');
mainJs = mainJs.split('"Featured"').join('"ویژه"');
mainJs = mainJs.split('"On this Page"').join('"در این صفحه"');
mainJs = mainJs.split('"Manage cookies"').join('"مدیریت کوکی‌ها"');
mainJs = mainJs.split('"Minimum Requirements"').join('"حداقل سیستم مورد نیاز"');
mainJs = mainJs.split('"View all download options"').join('"مشاهده همه پلن‌ها و امکانات"');

// N. Clean remaining Antigravity marketing references in string constants
mainJs = mainJs.split('"Google Antigravity"').join('"پراپ"');
mainJs = mainJs.split('"Antigravity"').join('"پراپ"');
mainJs = mainJs.split('"Build the new way"').join('"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده‌نگر"');

// Validate syntax with esbuild BEFORE saving!
try {
  esbuild.transformSync(mainJs, { loader: 'js' });
  console.log('✓ ESBUILD SYNTAX CHECK PASSED! No syntax errors.');
} catch (e) {
  console.error('ESBUILD SYNTAX ERROR:', e);
  process.exit(1);
}

fs.writeFileSync(path.join(__dirname, 'main-462OM7XN.js'), mainJs);
console.log(`Successfully saved main-462OM7XN.js! Final size: ${mainJs.length} (original: ${originalLength})`);
