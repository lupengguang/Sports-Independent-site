/* ============================================================
   OROGEN 赛场竞技·羽毛球分类页 — badminton.js
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  const P = {
    "bm-shoes": [
      {c:"ORG-BS1", n:"单打款 · 加宽侧向防滑球鞋", p:159, img:"bm-shoe-single", spec:"大底加宽，侧向防滑纹路，长距离移动稳定，缓震更强", tags:["单打","加宽大底","强缓震"], badge:"爆款"},
      {c:"ORG-BD1", n:"双打款 · 轻量启动球鞋",     p:149, img:"bm-shoe-double", spec:"轻量化鞋身，启动快，前场封网、短距离蹬跨", tags:["双打","轻量","快速启动"]}
    ],
    "bm-apparel": [
      {c:"ORG-BJ1", n:"比赛短袖球衣",   p:49, img:"bm-jersey-ss",   spec:"腋下透气网布，预留大幅抬手空间", tags:["短袖","速干","网布"]},
      {c:"ORG-BJ2", n:"无袖比赛球衣",   p:45, img:"bm-jersey-sl",   spec:"无袖剪裁，肩部活动零束缚", tags:["无袖","速干"]},
      {c:"ORG-BJ3", n:"速干球裙球裤",   p:39, img:"bm-skort",       spec:"轻薄速干，内里防走光，跨步无牵绊", tags:["球裙","球裤","速干"]},
      {c:"ORG-BJ4", n:"秋冬热身外套",   p:89, img:"bm-jacket",      spec:"锁温防风，秋冬赛前热身", tags:["热身","秋冬"]},
      {c:"ORG-BJ5", n:"紧身压缩衣",     p:65, img:"bm-compression", spec:"二级压缩，肩臂支撑，减少疲劳", tags:["紧身","压缩"]}
    ],
    "bm-gear": [
      {c:"ORG-BR1", n:"进攻型球拍（头重）",       p:189, img:"bm-racket-attack",  spec:"头重拍框，杀球有力，适合重杀突击", tags:["进攻拍","头重"], badge:"爆款"},
      {c:"ORG-BR2", n:"均衡全能拍",               p:159, img:"bm-racket-all",     spec:"攻守平衡，容错率高，新手到进阶通用", tags:["均衡拍","全能"]},
      {c:"ORG-BR3", n:"控球防守拍（头轻）",       p:179, img:"bm-racket-control", spec:"头轻挥速快，平抽挡连贯，控球精准", tags:["控球拍","头轻","防守"], badge:"新增"},
      {c:"ORG-BG1", n:"羽毛球手胶（3条装）",      p:12,  img:"bm-grip",           spec:"吸汗防滑，握感稳定，多色可选", tags:["手胶","吸汗"]},
      {c:"ORG-BG2", n:"耐打羽毛球（12只装）",     p:35,  img:"bm-shuttle",        spec:"飞行稳定，耐打复合软木，训练首选", tags:["羽毛球","耐打"]},
      {c:"ORG-BG3", n:"六支装隔热拍包",           p:79,  img:"bm-bag",            spec:"六拍容量，隔热层，双肩背负", tags:["拍包","隔热"]},
      {c:"ORG-BG4", n:"加压护腕（一对）",         p:25,  img:"bm-wrist",          spec:"弹性加压，吸汗，缓解腕部疲劳", tags:["护腕","加压"]},
      {c:"ORG-BG5", n:"护肘加压带",               p:29,  img:"bm-elbow",          spec:"缓震垫片，缓解网球肘发力疼痛", tags:["护肘"]}
    ]
  };

  const allProducts = {};
  Object.values(P).forEach(arr => arr.forEach(it => allProducts[it.c] = it));

  $$("[data-grid]").forEach(host => {
    const grp = host.dataset.grid;
    host.innerHTML = P[grp].map((it,i) => `
      <article class="pcard" data-code="${it.c}" data-reveal style="transition-delay:${(i%4)*70}ms">
        <figure class="pcard-media img-reveal">
          <img src="assets/${it.img}.jpg" alt="${it.n}" loading="lazy">
          <span class="pcard-code mono">${it.c}</span>
          ${it.badge ? `<span class="pcard-badge">${it.badge}</span>` : ""}
        </figure>
        <div class="pcard-info">
          <h3 class="pcard-name">${it.n}</h3>
          <p class="pcard-spec mono">${it.spec}</p>
          <div class="pcard-tags mono">${it.tags.map(t=>`<span>${t}</span>`).join("")}</div>
          <div class="pcard-foot">
            <span class="pcard-price">$${it.p}<small>/件</small></span>
            <button class="pcard-add" data-add="${it.c}" aria-label="加入装备袋">+</button>
          </div>
        </div>
      </article>`).join("");
  });

  /* ========== 购物袋 ========== */
  const cart = [];
  const cartEl = $("#cart"), backdrop = $("#backdrop");
  const bagCount = $("#bagCount"), cartCount = $("#cartCount");
  const cartItems = $("#cartItems"), cartEmpty = $("#cartEmpty");
  const cartSubtotal = $("#cartSubtotal");

  function renderCart(){
    const n = cart.reduce((a,x)=>a+x.q,0);
    bagCount.textContent = n; cartCount.textContent = n;
    bagCount.classList.remove("bump"); void bagCount.offsetWidth;
    if (n) bagCount.classList.add("bump");
    cartEmpty.style.display = cart.length ? "none" : "block";
    cartItems.innerHTML = cart.map((x,i)=>{
      const it = allProducts[x.code];
      return `<div class="cart-item">
        <img src="assets/${it.img}.jpg" alt="">
        <div class="cart-item-info">
          <span class="cart-item-code mono">${it.c}</span>
          <b>${it.n}</b>
          <div class="qty">
            <button data-qty="${i}:-1">−</button><span>${x.q}</span><button data-qty="${i}:1">+</button>
          </div>
        </div>
        <span class="cart-item-price mono">$${it.p*x.q}</span>
      </div>`;
    }).join("");
    cartSubtotal.textContent = "$ " + cart.reduce((a,x)=>a+allProducts[x.code].p*x.q,0);
  }
  function addToCart(code, q=1){
    const row = cart.find(x=>x.code===code);
    if (row) row.q += q; else cart.push({code,q});
    renderCart();
    showToast("已加入装备袋 — " + allProducts[code].n);
  }
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    const qty = e.target.closest("[data-qty]");
    if (add){ addToCart(add.dataset.add); return; }
    if (qty){ const [i,d]=qty.dataset.qty.split(":"); cart[+i].q+=+d; if(cart[+i].q<=0)cart.splice(+i,1); renderCart(); }
  });

  function openCart(){ cartEl.classList.add("open"); backdrop.classList.add("show"); document.body.style.overflow="hidden"; }
  function closeCart(){ cartEl.classList.remove("open"); backdrop.classList.remove("show"); document.body.style.overflow=""; }
  $("#bagBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，羽毛球装备正在准备"));

  const toast = $("#toast"); let toastTimer;
  function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2600); }

  /* ========== Tab 切换 + glider ========== */
  const tabs=$$(".cb-tab"), panels=$$(".cb-panel"), glider=$("#cbGlider");
  function moveGlider(tab){ if(innerWidth<=560||!tab)return; glider.style.width=tab.offsetWidth+"px"; glider.style.left=tab.offsetLeft+"px"; }
  function switchTab(name){
    const tab=tabs.find(t=>t.dataset.tab===name); if(!tab)return;
    tabs.forEach(t=>{ const on=t===tab; t.classList.toggle("active",on); t.setAttribute("aria-selected",on); });
    panels.forEach(p=>p.classList.toggle("active",p.dataset.panel===name));
    moveGlider(tab);
  }
  tabs.forEach(t=>t.addEventListener("click",()=>switchTab(t.dataset.tab)));
  addEventListener("resize",()=>moveGlider($(".cb-tab.active")));
  requestAnimationFrame(()=>moveGlider($(".cb-tab.active")));

  $$(".cb-guide").forEach((g,i)=>{
    g.addEventListener("click",()=>{
      switchTab(i===2 ? "gear" : "shoes");
      $("#bmTabs").scrollIntoView({behavior:reduced?"auto":"smooth"});
      showToast(["单打 → 强缓震球鞋 + 均衡/进攻拍","双打 → 轻量启动球鞋 + 控球拍","新手 → 全能均衡拍，容错优先"][i]);
    });
  });

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

  let goingHome=false;
  document.addEventListener("click",e=>{
    const link=e.target.closest('a[href^="index.html"]'); if(!link)return;
    e.preventDefault(); if(goingHome)return; goingHome=true; closeCart(); toggleMenu(false);
    try{sessionStorage.setItem("orogen_back","1");}catch(_){}
    const dest=link.getAttribute("href"); if(reduced){location.href=dest;return;}
    $(".pt-word",pageTrans).textContent="LEAVE COURT"; $(".pt-word-cn",pageTrans).textContent="离 场 返 回";
    document.body.style.overflow="hidden"; pageTrans.classList.add("on"); setTimeout(()=>location.href=dest,1050);
  });

  /* ========== 光标 / 滚动 / Scramble / Reveal / 视差 / 菜单 ========== */
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
    if(!document.body.classList.contains("menu-open")&&!cartEl.classList.contains("open")) siteTop.classList.toggle("hidden",y>lastY&&y>480);
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

  const burger=$("#burger"), menuOverlay=$("#menuOverlay");
  function toggleMenu(force){ const open=force!==undefined?force:!menuOverlay.classList.contains("open"); menuOverlay.classList.toggle("open",open); burger.classList.toggle("open",open); document.body.classList.toggle("menu-open",open); document.body.style.overflow=open?"hidden":""; if(open)siteTop.classList.remove("hidden"); }
  burger.addEventListener("click",()=>toggleMenu());
  $$("#menuOverlay .menu-links a").forEach(l=>l.addEventListener("click",()=>toggleMenu(false)));
  addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();toggleMenu(false);}});

  $("#year").textContent=new Date().getFullYear();
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先按单双打浏览羽毛球装备"));
})();
