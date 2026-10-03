/* ============================================================
   OROGEN 探险笔记 — notes.js
   科普 / 户外文化 / 装备干货 三页共用
   预加载 / 转场 / 光标 / 滚动进度 / reveal / 视差 / scramble
   / 移动菜单 / 投稿与按钮反馈 / 缺失图片文生图兜底
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  /* ========== 缺失图片：文生图兜底（与主站 data-fb 同策略） ========== */
  const FB = {
    /* 科普 */
    "assets/ns-hero.jpg":          ["Cinematic split moody banner: left half high altitude alpine snow mountain granite ice wall at dawn, right half night city skateboarding plaza with neon reflections on wet concrete, dark editorial photography, muted cold tones, dramatic atmosphere", "landscape_16_9"],
    "assets/ns-close.jpg":         ["Outdoor safety gear laid flat on dark wooden table: helmet, rope, headlamp, first aid kit, ice axe, moody low key still life photography, single warm light, muted tones", "landscape_16_9"],
    "assets/ns-alpine.jpg":        ["High altitude glacier with visible deep crevasse, dramatic snow covered peaks, thin clouds, alpinist tiny silhouette for scale, dark cinematic documentary photography, cold muted tones", "landscape_4_3"],
    "assets/ns-wild.jpg":          ["Wild mountain valley under fast moving storm clouds, narrow trail on rocky ridge, distant fog forest, weather shifting, moody documentary landscape photography, muted desaturated tones", "landscape_4_3"],
    "assets/ns-snow.jpg":          ["Empty ski resort slope, contrast of fresh powder snow and machine groomed corduroy snow, overcast soft light, distant snow cannons, cinematic documentary photography, cold muted tones", "landscape_4_3"],
    "assets/ns-street.jpg":        ["Urban skateboarder mid fall roll practice at concrete street plaza at dusk, ledges and handrails, city lights bokeh, motion blur, dark editorial action photography, muted tones", "landscape_16_9"],
    "assets/ns-court.jpg":         ["Dark cinematic sports collage scene: basketball court rim, fencing mask, shuttlecock and football on turf under arena spotlights, dramatic shadows, orange rim light, moody editorial photography", "landscape_16_9"],
    "assets/ns-art-altitude.jpg":  ["Lone hiker resting on high altitude trail with headache symptoms, dramatic thinning air mountain landscape, soft overcast light, documentary photography, muted tones", "landscape_16_9"],
    "assets/ns-art-hypothermia.jpg":["Rescue scene in cold rain mountain, emergency blanket and thermos on wet rock, storm clouds, tense mood, cinematic documentary photography, desaturated cold tones", "landscape_16_9"],
    "assets/ns-art-fall.jpg":      ["Skateboarder doing safe rolling fall on smooth concrete skatepark, protective knee pads and helmet, motion freeze, dark editorial photography, muted urban tones", "landscape_16_9"],
    "assets/ns-art-knee.jpg":      ["Basketball player low stance sudden crossover stop on indoor court, emphasis on knees and shoes, dramatic arena light, sweat, dark editorial sports photography, orange accent", "landscape_16_9"],

    /* 户外文化 */
    "assets/nc-hero.jpg":          ["Solo explorer with backpack walking into golden backlight across vast barren wilderness, long shadow, low saturation cinematic film still, minimalist epic atmosphere, dust particles in light", "landscape_16_9"],
    "assets/nc-close.jpg":         ["Small tent glowing warm under huge starry milky way sky in wild mountain valley, campfire embers, cinematic long exposure photography, low saturation film tones", "landscape_16_9"],
    "assets/nc-alpine.jpg":        ["Mountaineer standing respectfully before giant sacred snow peak at dawn, not conquering, tiny human vs immense mountain, cinematic documentary photography, soft low saturation film tones", "landscape_4_3"],
    "assets/nc-wild.jpg":          ["Long distance hiker crossing vast desert canyon trail with trekking poles at golden hour, footprints trail behind, cinematic documentary photography, muted earth tones", "landscape_4_3"],
    "assets/nc-snow.jpg":          ["Snowboarder floating through deep backcountry powder spray, untouched white face, mountains behind, respectful quiet moment, cinematic action photography, low saturation cold film tones", "landscape_4_3"],
    "assets/nc-skate.jpg":         ["Group of street skateboarders hanging out under concrete bridge, boards and spray painted walls, city community vibe, dusk, documentary photography, muted urban tones, film grain", "landscape_16_9"],
    "assets/nc-court.jpg":         ["Amateur basketball team huddling hands together on dark outdoor court at night, strong bond and teamwork, single warm floodlight, cinematic sports documentary, muted tones", "landscape_16_9"],
    "assets/nc-manifesto.jpg":     ["Weathered expedition backpack and gear resting on rock overlooking stormy mountain range, prepared adventure concept, dark cinematic still life, low saturation, moody light", "landscape_16_9"],
    "assets/nc-a-mountain.jpg":    ["Climbers footprints leading toward distant summit pyramid at dawn, wind swept snow, poetic minimalist landscape, cinematic documentary photography, low saturation film tones", "landscape_16_9"],
    "assets/nc-a-street.jpg":      ["Empty early morning city street with skateboard leaning against concrete ledge, first light between buildings, poetic urban minimalism, film photography, muted tones", "landscape_16_9"],
    "assets/nc-a-powder.jpg":      ["Snow covered mountain forest after storm, untouched powder field waiting, soft diffused light, respect and silence, minimalist cinematic photography, low saturation cold tones", "landscape_16_9"],

    /* 装备干货 */
    "assets/ng-hero.jpg":          ["Minimalist flat lay outdoor gear still life on dark stone surface: folded shell jacket, mountaineering boots, backpack, skateboard, basketball shoes, gloves, wild mountain landscape faintly behind, moody editorial product photography, muted tones", "landscape_16_9"],
    "assets/ng-close.jpg":         ["Organized technical outdoor gear flat lay with measuring tools and fabric swatches on dark designer desk, warm lamp light, moody editorial still life, muted tones", "landscape_16_9"],
    "assets/ng-wild.jpg":          ["Flat lay mountaineering and ski touring gear system: base layers, mid layer, hardshell, backpack, boots, ice axe, skins on dark floor, moody editorial still life, muted tones", "landscape_16_9"],
    "assets/ng-skate.jpg":         ["Skateboard hardware flat lay dark concrete: deck, trucks, wheels, bearings, grip tape, T tool and protective pads, moody product photography, muted urban tones", "landscape_16_9"],
    "assets/ng-court.jpg":         ["Court sports gear flat lay dark surface: basketball shoes position variants, football FG AG TF sole plates, badminton racket strings, fencing mask and jacket, moody editorial still life, muted tones", "landscape_16_9"],
    "assets/ng-care.jpg":          ["Gear maintenance scene: hand cleaning waterproof shell jacket with soft brush, wash basin, waterproofing spray, rag, dark workshop background, moody editorial photography, muted tones", "landscape_16_9"],
    "assets/ng-pitfall.jpg":       ["Overwhelming pile of mismatched outdoor gear with price tags on dark floor, anti consumerism concept, moody editorial still life, muted desaturated tones", "landscape_16_9"],
    "assets/ng-a-layers.jpg":      ["Three layer clothing system laid out in rows on dark ground: base layer, puffy mid layer, hardshell jacket, alpine boots beside, moody editorial flat lay, muted tones", "landscape_16_9"],
    "assets/ng-a-bball.jpg":       ["Three pairs of basketball shoes low mid high cut lined up on dark court floor, arena light reflection, position shoe guide concept, moody product photography, orange accent", "landscape_16_9"],
    "assets/ng-a-skate.jpg":       ["Complete beginner skateboard protective setup flat lay: helmet knee elbow wrist pads, complete skateboard, shoes, dark concrete, moody editorial photography, muted tones", "landscape_16_9"],
    "assets/ng-a-shell.jpg":       ["Technical ski shell jacket fabric close up with water droplets beading, waterproof membrane cross section sample, dark moody product photography, shallow depth field, muted tones", "landscape_16_9"]
  };
  $$("img[data-fb]").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fbDone) return;
      img.dataset.fbDone = "1";
      const f = FB["assets/" + img.dataset.fb];
      if (f) img.src = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
        encodeURIComponent(f[0]) + "&image_size=" + f[1];
    });
  });

  /* ========== Toast ========== */
  const toast = $("#toast"); let toastTimer;
  function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2400); }

  /* ========== 预加载器 & 转场 ========== */
  const preloader=$("#preloader"), pageTrans=$("#pageTrans"), siteTop=$("#siteTop");
  function finishLoading(){ document.body.classList.add("loaded"); requestAnimationFrame(()=>revealOnLoad()); }

  if(sessionStorage.getItem("orogen_ptc")==="1" && !noIntro){
    preloader.style.display="none"; pageTrans.classList.add("on");
    requestAnimationFrame(()=>{ setTimeout(()=>{ pageTrans.classList.add("leave"); pageTrans.classList.remove("on"); finishLoading(); setTimeout(()=>pageTrans.classList.remove("leave"),900); },420); });
    sessionStorage.removeItem("orogen_ptc");
  } else if(noIntro||reduced){
    preloader.style.display="none"; pageTrans.classList.remove("on"); requestAnimationFrame(finishLoading);
  } else {
    pageTrans.classList.remove("on"); let p=0;
    const iv=setInterval(()=>{ p=Math.min(100,p+Math.random()*26); $("#preBar").style.width=p+"%"; $("#preCount").textContent=String(Math.floor(p)).padStart(3,"0"); if(p>=100){ clearInterval(iv); setTimeout(()=>{ preloader.classList.add("done"); setTimeout(finishLoading,250); },200); } },90);
  }

  /* 内部链接转场动画 */
  let leaving=false;
  document.addEventListener("click",e=>{
    const link=e.target.closest('a[href$=".html"], a[href*=".html#"]');
    if(!link) return;
    const href=link.getAttribute("href");
    if(href.startsWith("http") || link.target==="_blank" || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); if(leaving)return; leaving=true; toggleMenu(false);
    try{sessionStorage.setItem("orogen_ptc","1");}catch(_){}
    if(reduced){ location.href=href; return; }
    document.body.style.overflow="hidden"; pageTrans.classList.add("on");
    setTimeout(()=>location.href=href,900);
  });

  /* ========== 光标 / 滚动 / Scramble / Reveal / 视差 ========== */
  const cursor=$("#cursor"), cursorLabel=$("#cursorLabel");
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;});
  (function loop(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop);})();
  document.addEventListener("mouseover",e=>{ const t=e.target.closest("[data-cursor]"); if(t){cursorLabel.textContent=t.dataset.cursor;cursor.classList.add("has-label");} });
  document.addEventListener("mouseout",e=>{ if(e.target.closest("[data-cursor]")){cursorLabel.textContent="";cursor.classList.remove("has-label");} });
  document.addEventListener("mousedown",()=>cursor.classList.add("down"));
  document.addEventListener("mouseup",()=>cursor.classList.remove("down"));

  const progress=$("#scrollProgress"); let lastY=0,idleTimer;
  addEventListener("scroll",()=>{
    const y=scrollY; document.body.classList.toggle("scrolled",y>40); document.body.classList.add("is-scrolling");
    clearTimeout(idleTimer); idleTimer=setTimeout(()=>document.body.classList.remove("is-scrolling"),120);
    if(!document.body.classList.contains("menu-open")) siteTop.classList.toggle("hidden",y>lastY&&y>480);
    lastY=y; const max=document.documentElement.scrollHeight-innerHeight; progress.style.width=(max?y/max*100:0)+"%";
  },{passive:true});

  const CHARS="!<>-_\\/[]{}=+*^?#01";
  function scramble(el){ if(el.__s)return; el.__s=true; const target=el.textContent,len=target.length,t0=performance.now(); (function frame(now){ const p=Math.min((now-t0)/900,1),settled=Math.floor(p*len); let out=target.slice(0,settled); for(let i=settled;i<len;i++)out+=target[i]===" "?" ":CHARS[(Math.random()*CHARS.length)|0]; el.textContent=out; if(p<1)requestAnimationFrame(frame); else el.textContent=target; })(t0); }
  const scrambleIO=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){scramble(en.target);scrambleIO.unobserve(en.target);}}),{threshold:.6});

  function countUp(el){ const target=+el.dataset.count,suf=el.dataset.suffix||""; const t0=performance.now(); (function frame(now){ const p=Math.min((now-t0)/1400,1); const v=Math.round(target*(1-Math.pow(1-p,3))); el.textContent=v+suf; if(p<1)requestAnimationFrame(frame); })(t0); }
  const revealIO=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in"); $$("[data-count]",en.target).forEach(countUp); revealIO.unobserve(en.target);}}),{threshold:.15,rootMargin:"0px 0px -8% 0px"});

  function observeAll(){ $$("[data-reveal]").forEach(el=>revealIO.observe(el)); $$(".img-reveal").forEach(el=>{if(!el.hasAttribute("data-reveal"))revealIO.observe(el);}); $$("[data-count]").forEach(el=>{if(!el.closest("[data-reveal]")){const io=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){countUp(el);o.disconnect();}}),{threshold:.6}); io.observe(el);}}); $$("[data-scramble]").forEach(el=>{if(!reduced)scrambleIO.observe(el);}); }
  function revealOnLoad(){ observeAll(); $$(".wl-hero [data-reveal], .wl-hero .img-reveal").forEach(el=>el.classList.add("in")); $$(".wl-hero [data-count]").forEach(countUp); }

  const parallaxEls=$$("[data-parallax]"); let pTicking=false;
  function applyParallax(){ pTicking=false; parallaxEls.forEach(el=>{ const r=el.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight)return; const sp=parseFloat(el.dataset.parallax); const off=(r.top+r.height/2-innerHeight/2)*sp; const img=el.tagName==="IMG"?el:$("img",el); if(img)img.style.transform=`translate3d(0,${(-off).toFixed(1)}px,0)`; }); }
  addEventListener("scroll",()=>{if(!pTicking){pTicking=true;requestAnimationFrame(applyParallax);}},{passive:true});

  /* ========== 移动菜单 ========== */
  const burger=$("#burger"), menuOverlay=$("#menuOverlay");
  function toggleMenu(force){ const open=force!==undefined?force:!menuOverlay.classList.contains("open"); menuOverlay.classList.toggle("open",open); burger.classList.toggle("open",open); document.body.classList.toggle("menu-open",open); document.body.style.overflow=open?"hidden":""; if(open)siteTop.classList.remove("hidden"); }
  burger.addEventListener("click",()=>toggleMenu());
  $$("#menuOverlay .menu-links a").forEach(l=>l.addEventListener("click",()=>toggleMenu(false)));
  addEventListener("keydown",e=>{if(e.key==="Escape")toggleMenu(false);});

  /* ========== 头部按钮 & 内容页交互 ========== */
  $("#year").textContent=new Date().getFullYear();
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先浏览探险笔记三篇"));
  $("#accountBtn").addEventListener("click",()=>location.href="login.html");
  $("#bagBtn").addEventListener("click",()=>showToast("装备袋在装备分类页可用，笔记页先安心阅读"));
  $$("[data-toast]").forEach(btn=>btn.addEventListener("click",()=>showToast(btn.dataset.toast)));
})();
