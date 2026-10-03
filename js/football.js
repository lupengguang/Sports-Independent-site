/* ============================================================
   OROGEN 赛场竞技·足球分类页 — football.js
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  const P = {
    "fb-boots": [
      {c:"ORG-FW1", n:"前锋款 · 低帮轻量战靴", p:179, img:"fb-boot-fw", spec:"轻薄鞋面，增强停球射门触感，碎钉 / 长钉可选", tags:["低帮","轻量","微摩擦鞋面"], badge:"爆款"},
      {c:"ORG-MF1", n:"中场款 · 中帮均衡战靴", p:199, img:"fb-boot-mf", spec:"包裹足弓，长时间跑动稳定，兼顾传球拦截", tags:["中帮","均衡","长跑稳定"]},
      {c:"ORG-DF1", n:"后卫款 · 高帮加固战靴", p:229, img:"fb-boot-df", spec:"加厚鞋面抗冲击，高帮保护，适合铲球对抗", tags:["高帮","加固","抗冲击"], badge:"新增"},
      {c:"ORG-IC1", n:"五人制 · 平底橡胶底",   p:149, img:"fb-boot-ic", spec:"室内地板防滑，灵活盘带，平底橡胶底", tags:["室内","平底","五人制"]}
    ],
    "fb-kits": [
      {c:"ORG-FK1", n:"前锋套装 · 速干球衣球裤", p:129, img:"fb-kit-fw", spec:"修身剪裁，减少风阻，快速启动", tags:["前锋","修身","速干"]},
      {c:"ORG-FK2", n:"中场套装 · 透气球衣球裤", p:129, img:"fb-kit-mf", spec:"均衡透气，大范围跑动不闷汗", tags:["中场","透气"]},
      {c:"ORG-FK3", n:"后卫套装 · 耐磨球衣球裤", p:139, img:"fb-kit-df", spec:"加厚抗拉扯，卡位缠斗不破损", tags:["后卫","耐磨"]},
      {c:"ORG-FK4", n:"门将套装 · 防撞长袖 + 加厚球裤", p:169, img:"fb-kit-gk", spec:"肘部髋部海绵缓冲，飞身扑救无惧落地", tags:["门将","防撞","缓冲"], badge:"专属"}
    ],
    "fb-singles": [
      {c:"ORG-FJ1", n:"热身冲锋衣",       p:99, img:"fb-jacket",      spec:"防风防雨，赛前热身锁温", tags:["热身","防风"]},
      {c:"ORG-FC1", n:"压缩紧身衣裤",     p:69, img:"fb-compression", spec:"二级压缩，肌肉支撑，减少疲劳", tags:["紧身","压缩"]}
    ],
    "fb-acc": [
      {c:"ORG-FP1", n:"插片式护腿板",     p:29, img:"fb-shin-slip",   spec:"硬质外壳，插片式设计，轻量防护", tags:["护腿板","插片式"]},
      {c:"ORG-FP2", n:"套筒式护腿板",     p:35, img:"fb-shin-sleeve", spec:"集成压缩袜，穿戴方便不移位", tags:["护腿板","套筒式"]},
      {c:"ORG-FG1", n:"门将乳胶防滑手套", p:89, img:"fb-gk-glove",    spec:"乳胶掌心，高摩擦系数，稳控扑救", tags:["门将手套","乳胶"], badge:"爆款"},
      {c:"ORG-FB1", n:"足球背包",         p:69, img:"fb-bag",         spec:"大容量，独立球网仓，装备分区", tags:["背包"]},
      {c:"ORG-FB2", n:"比赛用球",         p:79, img:"fb-ball",        spec:"热粘合拼接，飞行稳定，室内外通用", tags:["比赛用球"]},
      {c:"ORG-FS1", n:"绑腿带套装",       p:15, img:"fb-strap",       spec:"弹性绑腿带 + 护腿板固定带", tags:["绑腿带"]},
      {c:"ORG-FS2", n:"防滑球袜",         p:22, img:"fb-socks",       spec:"足底防滑硅胶点，足弓锁定", tags:["球袜","防滑"]}
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
  $("#accountBtn").addEventListener("click", () => location.href = sessionStorage.getItem("orogen_user") ? "account.html" : "login.html");
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，足球装备正在准备"));

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
      switchTab("boots");
      $("#fbTabs").scrollIntoView({behavior:reduced?"auto":"smooth"});
      showToast(["前锋 → 低帮轻量战靴","中场 → 中帮均衡战靴","后卫 → 高帮加固战靴","门将 → 门将专属套装"][i]);
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
    $(".pt-word",pageTrans).textContent="LEAVE PITCH"; $(".pt-word-cn",pageTrans).textContent="离 场 返 回";
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
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先按位置浏览足球装备"));
})();
