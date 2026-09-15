const fs = require('fs');

console.log('--- Applying Typing Animation RTL, آینده نگر and Full RTL Updates ---');

// 1. Update main-462OM7XN.js
let mainJs = fs.readFileSync('main-462OM7XN.js', 'utf8');

// Feature descriptions are Persian content, not icon ligatures.
mainJs = mainJs.replace('"translate","no","data-nosnippet","",1,"body","feature-description"', '"data-nosnippet","",1,"body","feature-description"');

// Reveal Persian feature words in logical order: rightmost word first.
mainJs = mainJs.replace(
  'if(isFa&&a.words){a.words.forEach(w=>{w.style.display="inline-block";w.style.margin="0 0.2rem";w.style.whiteSpace="nowrap"})}',
  'if(isFa&&a.words){a.words.forEach(w=>{w.style.display="inline-block";w.style.margin="0 0.2rem";w.style.whiteSpace="nowrap";w.style.direction="rtl";w.style.unicodeBidi="plaintext"})}'
);
mainJs = mainJs.replace(
  'let animTargets=(isFa&&a.words?.length)?a.words:a.chars;',
  'let animTargets=(isFa&&a.words?.length)?a.words.slice().reverse():a.chars;'
);
mainJs = mainJs.replace(
  'stagger:isFa?.04:.005,duration:isFa?.2:.1',
  'stagger:isFa?{each:.04,from:"start"}:.005,duration:isFa?.2:.1'
);

// A. Replace typed-header class methods
const naviIdx = mainJs.indexOf("ngAfterViewInit(){let isFa=/");
let facIdx = mainJs.indexOf("static \\u0275fac=function(n){return new(n||sl)", naviIdx);
if (facIdx === -1) facIdx = mainJs.indexOf("static \u0275fac=function(n){return new(n||sl)", naviIdx);

if (naviIdx !== -1 && facIdx !== -1) {
  const newMethods = `ngAfterViewInit(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");if(isFa){this.typedContent.nativeElement.innerHTML="";Hn.set(this.cursorContainer.nativeElement,{opacity:1});return}this.splitContent=Wl.create(this.typedContent.nativeElement,{type:"chars, words"});let n=this.splitContent.chars?.[0]||this.splitContent.words?.[0],t=n?.offsetParent;if(t&&n)this.updateBlinkingCursor(t.offsetLeft+n.offsetLeft,t.offsetTop+n.offsetTop)}onResize(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");if(isFa)return;if(this.doneTyping&&this.cursorPersists){let n=this.splitContent?.chars.length||1,t=this.splitContent?.chars[n-1],i=t.offsetParent;this.updateBlinkingCursor(i.offsetLeft+t.offsetLeft+t.offsetWidth+10,i.offsetTop+t.offsetTop)}}initialize(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");this.augmentedClasses+=this.class.length?\` \${this.class}\`:"";this.cdr.detectChanges();if(isFa){Hn.set(this.cursorContainer.nativeElement,{opacity:0});return}Hn.set(this.cursorContainer.nativeElement,{opacity:0});Hn.set(this.splitContent.chars,{opacity:0})}updateClassex(){}startTyping(n,t){let i=this;let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");n||(n=Hn.timeline());if(isFa){let fullText=this.text||"";let el=this.typedContent.nativeElement;el.innerHTML="";Hn.set(this.cursorContainer.nativeElement,{opacity:1});let proxy={count:0};let charSpeed=0.038;let duration=Math.min(2.5,Math.max(0.7,fullText.length*charSpeed));n.to(proxy,{count:fullText.length,duration:duration,delay:t??this.initialDelay,ease:"none",onUpdate:()=>{let idx=Math.round(proxy.count);el.textContent=fullText.slice(0,idx)},onComplete:()=>{el.textContent=fullText;i.doneTyping=!0}});this.cursorPersists||n.to(this.cursorContainer.nativeElement,{opacity:0,duration:this.endDelay,ease:"none"});return n}Hn.registerPlugin(Wl);n.set(this.cursorContainer.nativeElement,{opacity:1});let animTargets=this.splitContent.chars;return n.fromTo(animTargets,{opacity:0},{opacity:1,duration:.01,delay:t??this.initialDelay,stagger:{each:this.staggerSpeed,onStart:function(){let r=this.targets()[0];r&&r?.offsetParent&&i.updateBlinkingCursor(r.offsetParent.offsetLeft+r.offsetLeft+r.offsetWidth+10,r.offsetParent.offsetTop+r.offsetTop)}},ease:"power2.out",onComplete:()=>{i.doneTyping=!0}}),this.cursorPersists||n.to(this.cursorContainer.nativeElement,{opacity:0,duration:this.endDelay,ease:"none"}),n}hideAndReset(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");if(isFa){this.typedContent.nativeElement.innerHTML="";this.reset();return}Hn.to(this.cursorContainer.nativeElement,{opacity:0,duration:.01});Hn.to(this.splitContent.chars,{opacity:0,duration:.01,stagger:-.05,onComplete:()=>{this.reset()}})}reset(){let isFa=/[\\u0600-\\u06FF]/.test(this.text||"");if(isFa){Hn.set(this.cursorContainer.nativeElement,{opacity:0});this.cursorPosX=0;this.cursorPosY=0;return}Hn.set(this.splitContent.chars,{opacity:0});Hn.set(this.cursorContainer.nativeElement,{opacity:0});this.cursorPosX=0;this.cursorPosY=0}updateBlinkingCursor(n,t){this.cursorPosX=n,this.cursorPosY=t,this.cdr.detectChanges()}`;
  mainJs = mainJs.slice(0, naviIdx) + newMethods + mainJs.slice(facIdx);
  console.log('✓ Updated typed-header component in main-462OM7XN.js');
} else {
  console.error('Failed to locate typed-header methods');
}

// B. Update home page typed text
mainJs = mainJs.replace(
  '["text","راهکارهای هوش مصنوعی برای کسبوکارهای آینده نگر"',
  '["text","راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده نگر"'
);
mainJs = mainJs.replace(
  '["text","راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده‌نگر"',
  '["text","راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده نگر"'
);

// C. Update footer slogan
mainJs = mainJs.replace(
  'slogan:"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده‌نگر."',
  'slogan:"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده نگر."'
);
mainJs = mainJs.replace(
  'slogan:"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده نگر."',
  'slogan:"راهکارهای هوش مصنوعی برای کسب‌وکارهای آینده نگر."'
);

// D. Localize Manage cookies
mainJs = mainJs.replace('R(23," Manage cookies ")', 'R(23," تنظیمات کوکی‌ها ")');

fs.writeFileSync('main-462OM7XN.js', mainJs, 'utf8');
console.log('✓ Saved main-462OM7XN.js');
