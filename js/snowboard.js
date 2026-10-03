/* ============================================================
   OROGEN 单板滑雪分类页 — snowboard.js
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
     1) 产品数据
  ========================================================= */
  const P = {
    "sb-base": [
      {c:"SB-B1", n:"雪地恒温速干内衣套装", p:79, img:"sb-base-set", spec:"运动排湿 · 静止锁温 · 贴身不臃肿", tags:["速干","恒温","套装"], badge:"刚需"},
      {c:"SB-B2", n:"加厚保暖速干打底上衣", p:59, img:"sb-base-top", spec:"加厚磨毛 · 高弹 · 适配大幅度转体", tags:["加厚","高弹"]},
      {c:"SB-B3", n:"雪地恒温速干长裤", p:49, img:"sb-base-pant", spec:"立体剪裁 · 排汗不粘身 · 滑雪袜兼容", tags:["速干裤","排汗"]},
      {c:"SB-B4", n:"羊毛混纺滑雪袜", p:25, img:"sb-socks", spec:"加厚足垫 · 防滑不掉筒 · 抑菌", tags:["滑雪袜","羊毛"]}
    ],
    "sb-mid": [
      {c:"SB-M1", n:"轻薄高弹保暖棉服", p:139, img:"sb-mid-puff", spec:"短款剪裁 · 多层叠加不顶衣 · 不限腾空", tags:["保暖棉服","短款"], badge:"爆款"},
      {c:"SB-M2", n:"防风保暖马甲", p:99, img:"sb-mid-vest", spec:"核心锁温 · 侧摆弹力 · 兼容护甲", tags:["马甲","锁温"]},
      {c:"SB-M3", n:"高弹抓绒保暖裤", p:89, img:"sb-mid-fleece", spec:"修身不臃肿 · 膝部立体 · 适配雪裤", tags:["抓绒裤","修身"]}
    ],
    "sb-shell": [
      {c:"SB-S1", n:"旷野野雪防水雪服上衣", p:329, img:"sb-shell-jkt", spec:"10000mm防水 · 防雪裙 · 宽松立体版型", tags:["雪服","防水","防雪裙"], badge:"核心爆款"},
      {c:"SB-S2", n:"耐磨防水野雪雪裤", p:249, img:"sb-shell-pant", spec:"高腰护腰 · 内置防雪裙 · 抗撕裂面料", tags:["雪裤","高腰","抗撕裂"]},
      {c:"SB-S3", n:"轻量化拼接雪服套装", p:419, img:"sb-shell-set", spec:"极简旷野色系 · 室内外雪场通用", tags:["套装","轻量化"]}
    ],
    "sb-head": [
      {c:"SB-H1", n:"单板滑雪头盔", p:129, img:"sb-helmet", spec:"EPS内衬+ABS外壳 · 抗冲击 · 通风", tags:["头盔","抗冲击"], badge:"新增"},
      {c:"SB-H2", n:"防雾高清雪镜", p:109, img:"sb-goggle", spec:"双层镜片 · 防紫外线 · 大风雪适配", tags:["雪镜","防雾","UV400"]}
    ],
    "sb-body": [
      {c:"SB-P1", n:"防撞护具套装（护臀+护膝+护腕）", p:119, img:"sb-pads", spec:"软质轻量化 · 内置缓冲 · 不卡动作", tags:["护具套装","缓冲"], badge:"新增"},
      {c:"SB-P2", n:"单板护臀垫", p:49, img:"sb-hip", spec:"EVA缓冲 · 低腰隐形 · 防摔击", tags:["护臀"]},
      {c:"SB-P3", n:"单板护膝", p:39, img:"sb-knee", spec:"高弹支撑 · 防撞 · 长距离滑行减压", tags:["护膝"]}
    ],
    "sb-glove": [
      {c:"SB-G1", n:"单板专用加厚防水手套", p:69, img:"sb-glove", spec:"防风抗寒 · 掌心耐磨 · 触屏兼容", tags:["手套","防水","耐磨"], badge:"新增"},
      {c:"SB-G2", n:"轻量化滑雪内衬手套", p:35, img:"sb-liner", spec:"五指灵活 · 吸湿排汗 · 可单穿", tags:["内衬","灵活"]}
    ],
    "sb-acc": [
      {c:"SB-A1", n:"防风护脸面罩", p:29, img:"sb-mask", spec:"防风护脸 · 透气速干 · 高弹", tags:["面罩","防风"]},
      {c:"SB-A2", n:"雪地加厚防滑袜", p:22, img:"sb-socks2", spec:"加厚毛圈 · 防滑底 · 高帮", tags:["防滑袜","加厚"]},
      {c:"SB-A3", n:"雪服收纳包", p:45, img:"sb-bag", spec:"防水面料 · 透气网格 · 可折叠", tags:["收纳包","防水"]},
      {c:"SB-A4", n:"防水雪鞋套", p:35, img:"sb-boot-cover", spec:"全包裹防水 · 雪地行走防滑", tags:["鞋套","防水"]},
      {c:"SB-A5", n:"雪板保养蜡", p:18, img:"sb-wax", spec:"全温域适用 · 提升滑行顺滑度", tags:["保养","蜡"]},
      {c:"SB-A6", n:"雪板收纳袋", p:55, img:"sb-boardbag", spec:"加厚防撞 · 双肩背负 · 滚轮可选", tags:["收纳袋","防撞"]}
    ]
  };

  /* 场景化套装 */
  const KITS = [
    {lv:"BACKCOUNTRY POWDER", n:"高山野雪探险套装", p:599, s:725,
     use:"适用：山野粉雪、高山野雪道滑行",
     items:["恒温速干内层","加厚野雪雪服全套","全套防撞护具"]},
    {lv:"PARK & PIPE", n:"单板公园动作套装", p:399, s:482,
     use:"适用：雪场公园、跳台、道具动作练习",
     items:["轻量化耐磨雪服","薄款核心护具套装"]}
  ];
  const KIT_CODES = [
    ["SB-B1","SB-M1","SB-S1","SB-S2","SB-P1"],
    ["SB-S3","SB-P1"]
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
  $("#sbKitGrid").innerHTML = KITS.map((k,i) => `
    <div class="kit" data-reveal style="transition-delay:${i*90}ms">
      <span class="kit-level mono">${k.lv}</span>
      <h3 class="kit-name">${k.n}</h3>
      <p class="kit-use mono"><b>TERRAIN //</b> ${k.use}</p>
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
  $("#accountBtn").addEventListener("click", () => location.href = "login.html");
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，滑雪装备正在准备"));

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
  const glider = $("#cbGlider");

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
    showToast("选购指南正在排版，可先查看三层穿搭矩阵");
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

  if (sessionStorage.getItem("orogen_pts")==="1" && !noIntro){
    /* 从首页经 RIDE 跳转动画进入：只播 transition 揭幕 */
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
    sessionStorage.removeItem("orogen_pts");
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
     5.5) 返回首页（对称转场：RETURN / 返回首页）
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
    $(".pt-word", pageTrans).textContent = "RETURN";
    $(".pt-word-cn", pageTrans).textContent = "返 回 首 页";
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

  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先浏览滑雪装备矩阵"));
})();
