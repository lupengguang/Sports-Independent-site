/* ============================================================
   OROGEN 荒野徒步分类页 — hiking.js
   数据驱动产品矩阵 / 购物袋 / Tab 切换 + glider /
   场景化套装 / 选购指南 / 跳转动画 / reveal / parallax / scramble
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  /* =========================================================
     1) 产品数据（27 单品）
  ========================================================= */
  const P = {
    "hk-summer": [
      {c:"HK-S1", n:"UPF50+ 防晒速干连帽长袖", p:79,  img:"hk-sum", spec:"UPF50+ · 拇指洞 · 致密防刮 · 戈壁长线", tags:["UPF50+","速干","连帽"], badge:"核心"},
      {c:"HK-S2", n:"旷野透气速干短袖 T 恤",    p:49,  img:"hk-sum", spec:"高导湿面料 · 瞬干不粘身 · 轻量", tags:["速干","短袖"]},
      {c:"HK-S3", n:"夏季弹力速干长裤",        p:69,  img:"hk-sum", spec:"轻薄透气 · 立体剪裁 · 防紫外线", tags:["速干长裤","弹力"]},
      {c:"HK-S4", n:"轻量防晒皮肤风衣",        p:99,  img:"hk-sum", spec:"可收纳至口袋 · UPF50+ · 防风防泼水", tags:["皮肤风衣","可收纳"]}
    ],
    "hk-spring": [
      {c:"HK-A1", n:"防风耐磨软壳夹克",       p:159, img:"hk-spr", spec:"微抓绒内里 · DWR 防泼水 · 高耐磨", tags:["软壳","防风","耐磨"], badge:"核心"},
      {c:"HK-A2", n:"全天候轻量防风夹克",     p:129, img:"hk-spr", spec:"四面弹力 · 透气 · 昼夜温差叠穿", tags:["防风","轻量"]},
      {c:"HK-A3", n:"弹力耐磨长袖衬衫",       p:79,  img:"hk-spr", spec:"防刮格纹 · 多口袋 · 可单穿可打底", tags:["衬衫","耐磨"]},
      {c:"HK-A4", n:"防风微绒长裤",          p:99,  img:"hk-spr", spec:"微绒保暖 · 防风 · 春秋过渡", tags:["长裤","防风"]}
    ],
    "hk-winter": [
      {c:"HK-W1", n:"轻量化荒野保暖棉服",     p:229, img:"hk-win", spec:"P 棉保暖 · 防风面料 · 湿冷仍锁温", tags:["棉服","轻量"], badge:"核心"},
      {c:"HK-W2", n:"防风保暖冲锋裤",         p:189, img:"hk-win", spec:"立体剪裁 · 膝盖弹力 · 防风防泼水", tags:["冲锋裤","保暖"]},
      {c:"HK-W3", n:"保暖抓绒中层",          p:119, img:"hk-win", spec:"高密度抓绒 · 可叠穿外套 · 锁温", tags:["抓绒","中层"]}
    ],
    "hk-pants": [
      {c:"HK-P1", n:"12oz 多功能工装徒步长裤", p:129, img:"hk-pant", spec:"12oz 重磅 · 抗撕裂 · 多口袋 · 立体剪裁", tags:["12oz","工装","抗撕裂"], badge:"爆款"},
      {c:"HK-P2", n:"弹力立体穿越裤",        p:109, img:"hk-pant", spec:"四向弹力 · 攀爬跨越无束缚 · 速干", tags:["弹力","立体剪裁"]},
      {c:"HK-P3", n:"多口袋速干徒步短裤",     p:79,  img:"hk-pant", spec:"多袋收纳 · DWR 防泼水 · 单日快穿", tags:["短裤","多口袋"]}
    ],
    "hk-foot": [
      {c:"HK-F1", n:"轻量化防滑徒步鞋",       p:199, img:"hk-shoe", spec:"Vibram 大底 · 低帮轻量 · 碎石抓地", tags:["徒步鞋","轻量"], badge:"核心"},
      {c:"HK-F2", n:"全天候防水徒步靴",       p:279, img:"hk-boot", spec:"全皮面 · 中帮防水 · 戈壁湿冷", tags:["徒步靴","防水"]},
      {c:"HK-F3", n:"防磨户外越野跑鞋",       p:179, img:"hk-shoe", spec:"长距离缓震 · 防踢鞋头 · 快节奏", tags:["越野跑鞋","缓震"]}
    ],
    "hk-carry": [
      {c:"HK-K1", n:"多功能荒野长线徒步背包",  p:249, img:"hk-pack", spec:"65L · 负重减压背负 · 防雨罩", tags:["长线包","65L"], badge:"核心"},
      {c:"HK-K2", n:"单日轻量化徒步小包",      p:99,  img:"hk-pack", spec:"22L · 透气背板 · 水袋仓", tags:["单日包","22L"]},
      {c:"HK-K3", n:"防水收纳袋三件套",       p:39,  img:"hk-drybag", spec:"全防水 · 分装衣物电子设备 · 轻量", tags:["收纳","防水"]},
      {c:"HK-K4", n:"衣物压缩袋",            p:29,  img:"hk-drybag", spec:"压缩省容积 · 防泼水 · 多规格", tags:["压缩袋"]}
    ],
    "hk-acc": [
      {c:"HK-C1", n:"UPF50+ 防晒面罩",        p:25,  img:"hk-gaiter", spec:"UPF50+ · 高弹透气 · 防风沙", tags:["面罩","UPF50+"], badge:"刚需"},
      {c:"HK-C2", n:"户外宽檐徒步帽",         p:45,  img:"hk-hat",    spec:"大宽檐 · 防风绳 · 透气速干", tags:["宽檐帽"]},
      {c:"HK-C3", n:"碳纤维登山杖（一对）",    p:89,  img:"hk-poles",  spec:"碳纤维 · 三节可调 · 轻量", tags:["登山杖","碳纤维"], badge:"核心"},
      {c:"HK-C4", n:"户外护膝（一对）",       p:39,  img:"hk-knee",   spec:"高弹支撑 · 减压 · 长下坡防护", tags:["护膝"]},
      {c:"HK-C5", n:"便携防水雨披",          p:35,  img:"hk-poncho", spec:"轻量收纳 · 背包兼容 · 多用途", tags:["雨披","防水"]},
      {c:"HK-C6", n:"急救收纳包",           p:49,  img:"hk-aid",    spec:"常用医护用品 · MOLLE 挂载 · 快取", tags:["急救包"]}
    ]
  };

  /* 场景化套装 */
  const KITS = [
    {lv:"DAY-HIKE", n:"单日荒野轻徒步套装", p:259, s:317,
     use:"适用：单日山林、高原短途徒步",
     items:["防晒速干穿搭","轻量化单日背包","基础防护配件"]},
    {lv:"THRU-HIKE", n:"多日长线探险套装", p:899, s:1108,
     use:"适用：戈壁穿越、多日荒野长线徒步",
     items:["全套耐磨四季穿搭","大容量长线背负","全天候防护配件"]}
  ];
  const KIT_CODES = [
    ["HK-S1","HK-S3","HK-K2","HK-C1","HK-C2"],
    ["HK-A1","HK-W3","HK-P1","HK-F2","HK-K1","HK-C3","HK-C5","HK-C6"]
  ];

  /* =========================================================
     2) 渲染产品矩阵
  ========================================================= */
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

  /* 套装 */
  $("#hkKitGrid").innerHTML = KITS.map((k,i) => `
    <div class="kit" data-reveal style="transition-delay:${i*90}ms">
      <span class="kit-level mono">${k.lv}</span>
      <h3 class="kit-name">${k.n}</h3>
      <p class="kit-use mono"><b>ROUTE //</b> ${k.use}</p>
      <ul class="kit-items">${k.items.map(t=>`<li>${t}</li>`).join("")}</ul>
      <div class="kit-foot">
        <span class="kit-price"><s>单买 $${k.s}</s><b>$${k.p}</b></span>
        <button class="kit-add" data-kitadd="${i}">整套加入 +</button>
      </div>
    </div>`).join("");

  /* =========================================================
     3) 购物袋
  ========================================================= */
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
    const kitAdd = e.target.closest("[data-kitadd]");
    const qty = e.target.closest("[data-qty]");
    if (add){ addToCart(add.dataset.add); return; }
    if (kitAdd){
      const i = +kitAdd.dataset.kitadd;
      KIT_CODES[i].forEach(c=>addToCart(c));
      showToast("整套方案已加入装备袋 — " + KITS[i].n);
      return;
    }
    if (qty){
      const [i,d] = qty.dataset.qty.split(":");
      cart[+i].q += +d;
      if (cart[+i].q <= 0) cart.splice(+i,1);
      renderCart();
    }
  });

  function openCart(){
    cartEl.classList.add("open"); backdrop.classList.add("show");
    document.body.style.overflow="hidden";
  }
  function closeCart(){
    cartEl.classList.remove("open"); backdrop.classList.remove("show");
    document.body.style.overflow="";
  }
  $("#bagBtn").addEventListener("click", openCart);
  $("#accountBtn").addEventListener("click", () => location.href = sessionStorage.getItem("orogen_user") ? "account.html" : "login.html");
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，徒步装备正在准备"));

  /* Toast */
  const toast = $("#toast"); let toastTimer;
  function showToast(msg){
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove("show"), 2600);
  }

  /* =========================================================
     4) Tab 切换 + glider
  ========================================================= */
  const tabs = $$(".cb-tab");
  const panels = $$(".cb-panel");
  const glider = $("#hkGlider");

  function moveGlider(tab){
    if (innerWidth <= 560 || !tab) return;
    glider.style.width = tab.offsetWidth + "px";
    glider.style.left = tab.offsetLeft + "px";
  }
  function switchTab(name){
    const tab = tabs.find(t=>t.dataset.tab===name);
    if (!tab) return;
    tabs.forEach(t=>{
      const on = t===tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
    });
    panels.forEach(p=>p.classList.toggle("active", p.dataset.panel===name));
    moveGlider(tab);
  }
  tabs.forEach(t=>t.addEventListener("click", ()=>switchTab(t.dataset.tab)));
  addEventListener("resize", ()=>moveGlider($(".cb-tab.active")));
  requestAnimationFrame(()=>moveGlider($(".cb-tab.active")));

  /* 指南卡片 */
  $$("[data-guide]").forEach(g=>g.addEventListener("click", ()=>{
    showToast("选购指南正在排版，可先浏览徒步产品矩阵");
  }));

  /* =========================================================
     5) 预加载器 & 跳转动画 intro
  ========================================================= */
  const preloader = $("#preloader"), preBar = $("#preBar"), preCount = $("#preCount");
  const pageTrans = $("#pageTrans");
  const siteTop = $("#siteTop");

  function finishLoading(){
    document.body.classList.add("loaded");
    requestAnimationFrame(()=>revealOnLoad());
  }

  if (sessionStorage.getItem("orogen_pth")==="1" && !noIntro){
    /* 从首页经 WALK 跳转动画进入：只播 transition 揭幕 */
    preloader.style.display="none";
    pageTrans.classList.add("on");
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        pageTrans.classList.add("leave");
        pageTrans.classList.remove("on");
        finishLoading();
        setTimeout(()=>{ pageTrans.classList.remove("leave"); }, 900);
      }, 420);
    });
    sessionStorage.removeItem("orogen_pth");
  } else if (noIntro || reduced){
    preloader.style.display="none";
    pageTrans.classList.remove("on");
    requestAnimationFrame(finishLoading);
  } else {
    pageTrans.classList.remove("on");
    let p = 0;
    const iv = setInterval(()=>{
      p = Math.min(100, p + Math.random()*26);
      preBar.style.width = p+"%";
      preCount.textContent = String(Math.floor(p)).padStart(3,"0");
      if (p>=100){
        clearInterval(iv);
        setTimeout(()=>{
          preloader.classList.add("done");
          setTimeout(finishLoading, 250);
        }, 200);
      }
    }, 90);
  }

  /* =========================================================
     5.5) 返回首页（对称转场：BACKTRACK / 折返返回）
     拦截所有指向 index.html 的链接：Logo / 导航 / 收尾按钮 / 页脚
  ========================================================= */
  let goingHome = false;
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="index.html"]');
    if (!link) return;
    e.preventDefault();
    if (goingHome) return;
    goingHome = true;
    closeCart();
    toggleMenu(false);
    try { sessionStorage.setItem("orogen_back", "1"); } catch (_) {}
    const dest = link.getAttribute("href");
    if (reduced){ location.href = dest; return; }
    $(".pt-word", pageTrans).textContent = "BACKTRACK";
    $(".pt-word-cn", pageTrans).textContent = "折 返 首 页";
    document.body.style.overflow = "hidden";
    pageTrans.classList.add("on");
    setTimeout(() => { location.href = dest; }, 1050);
  });

  /* =========================================================
     6) 自定义光标
  ========================================================= */
  const cursor = $("#cursor"), cursorLabel = $("#cursorLabel");
  let mx=innerWidth/2, my=innerHeight/2, cx=mx, cy=my;
  addEventListener("mousemove", e=>{ mx=e.clientX; my=e.clientY; });
  (function loop(){
    cx+=(mx-cx)*.2; cy+=(my-cy)*.2;
    cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e=>{
    const t=e.target.closest("[data-cursor]");
    if (t){ cursorLabel.textContent=t.dataset.cursor; cursor.classList.add("has-label"); }
  });
  document.addEventListener("mouseout", e=>{
    if (e.target.closest("[data-cursor]")){ cursorLabel.textContent=""; cursor.classList.remove("has-label"); }
  });
  document.addEventListener("mousedown", ()=>cursor.classList.add("down"));
  document.addEventListener("mouseup", ()=>cursor.classList.remove("down"));

  /* =========================================================
     7) 滚动：scrolled / header 隐藏 / 进度条
  ========================================================= */
  const progress = $("#scrollProgress");
  let lastY=0, idleTimer;
  addEventListener("scroll", ()=>{
    const y=scrollY;
    document.body.classList.toggle("scrolled", y>40);
    document.body.classList.add("is-scrolling");
    clearTimeout(idleTimer);
    idleTimer=setTimeout(()=>document.body.classList.remove("is-scrolling"),120);
    if (!document.body.classList.contains("menu-open") && !cartEl.classList.contains("open")){
      siteTop.classList.toggle("hidden", y>lastY && y>480);
    }
    lastY=y;
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max?y/max*100:0)+"%";
  },{passive:true});

  /* =========================================================
     8) Scramble
  ========================================================= */
  const CHARS="!<>-_\\/[]{}=+*^?#01";
  function scramble(el){
    if(el.__s) return; el.__s=true;
    const target=el.textContent, len=target.length, t0=performance.now();
    (function frame(now){
      const p=Math.min((now-t0)/900,1), settled=Math.floor(p*len);
      let out=target.slice(0,settled);
      for(let i=settled;i<len;i++) out+=target[i]===" "?" ":CHARS[(Math.random()*CHARS.length)|0];
      el.textContent=out;
      if(p<1) requestAnimationFrame(frame); else el.textContent=target;
    })(t0);
  }
  const scrambleIO=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){ scramble(en.target); scrambleIO.unobserve(en.target); }
  }),{threshold:.6});

  /* =========================================================
     9) Reveal / 图片遮罩 / 计数器
  ========================================================= */
  function countUp(el){
    const target=+el.dataset.count, suf=el.dataset.suffix||"";
    const t0=performance.now();
    (function frame(now){
      const p=Math.min((now-t0)/1400,1);
      const v=Math.round(target*(1-Math.pow(1-p,3)));
      el.textContent=v+suf;
      if(p<1) requestAnimationFrame(frame);
    })(t0);
  }
  const revealIO=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add("in");
      $$("[data-count]",en.target).forEach(countUp);
      revealIO.unobserve(en.target);
    }
  }),{threshold:.15, rootMargin:"0px 0px -8% 0px"});

  function observeAll(){
    $$("[data-reveal]").forEach(el=>revealIO.observe(el));
    $$(".img-reveal").forEach(el=>{ if(!el.hasAttribute("data-reveal")) revealIO.observe(el); });
    $$("[data-count]").forEach(el=>{
      if(!el.closest("[data-reveal]")){
        const io=new IntersectionObserver((es,o)=>es.forEach(e=>{
          if(e.isIntersecting){ countUp(el); o.disconnect(); }
        }),{threshold:.6}); io.observe(el);
      }
    });
    $$("[data-scramble]").forEach(el=>{ if(!reduced) scrambleIO.observe(el); });
  }
  function revealOnLoad(){
    observeAll();
    $$(".wl-hero [data-reveal], .wl-hero .img-reveal").forEach(el=>el.classList.add("in"));
    $$(".wl-hero [data-count]").forEach(countUp);
  }

  /* =========================================================
     10) 视差
  ========================================================= */
  const parallaxEls=$$("[data-parallax]");
  let pTicking=false;
  function applyParallax(){
    pTicking=false;
    parallaxEls.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.bottom<0||r.top>innerHeight) return;
      const sp=parseFloat(el.dataset.parallax);
      const off=(r.top+r.height/2-innerHeight/2)*sp;
      const img=el.tagName==="IMG"?el:$("img",el);
      if(img) img.style.transform=`translate3d(0,${(-off).toFixed(1)}px,0)`;
    });
  }
  addEventListener("scroll",()=>{ if(!pTicking){ pTicking=true; requestAnimationFrame(applyParallax);} },{passive:true});

  /* =========================================================
     11) 移动菜单
  ========================================================= */
  const burger=$("#burger"), menuOverlay=$("#menuOverlay");
  function toggleMenu(force){
    const open=force!==undefined?force:!menuOverlay.classList.contains("open");
    menuOverlay.classList.toggle("open",open);
    burger.classList.toggle("open",open);
    document.body.classList.toggle("menu-open",open);
    document.body.style.overflow=open?"hidden":"";
    if(open) siteTop.classList.remove("hidden");
  }
  burger.addEventListener("click",()=>toggleMenu());
  $$("#menuOverlay .menu-links a").forEach(l=>l.addEventListener("click",()=>toggleMenu(false)));

  /* ESC */
  addEventListener("keydown",e=>{
    if(e.key==="Escape"){ closeCart(); toggleMenu(false); }
  });

  $("#year").textContent=new Date().getFullYear();

  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先浏览徒步装备矩阵"));
})();
