/* ============================================================
   OROGEN 高海拔登山分类页 — climbing.js
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
    "mount-base": [
      {c:"ORG-B1", n:"高海拔极地速干长袖内衣套装（男女款）", p:89, img:"wl-base", spec:"超薄高弹 · 抗静电 · 常规款 5000-6000m", tags:["速干","抗静电","男女款"], badge:"刚需"},
      {c:"ORG-B2", n:"加厚恒温速干打底衣",                     p:69, img:"wl-base", spec:"加厚恒温款 6000m+ · 锁温 · 保持透气", tags:["加厚","恒温","6000m+"]},
      {c:"ORG-B3", n:"高海拔速干长裤",                         p:59, img:"wl-base", spec:"立体剪裁 · 耐磨防刮 · 不卡裆不磨腿", tags:["耐磨","速干长裤"]},
      {c:"ORG-B4", n:"极地加厚毛圈速干登山袜",                 p:29, img:"wl-boot", spec:"加厚足垫 · 排汗抑菌 · 防磨泡", tags:["登山袜","毛圈"]}
    ],
    "mount-mid": [
      {c:"ORG-M1", n:"高克重抗风抓绒衣",     p:129, img:"wl-fleece", spec:"高密度摇粒绒 · 抗风锁温 · 适配 5000-6500m", tags:["抓绒","抗风"]},
      {c:"ORG-M2", n:"轻量化高山羽绒内胆", p:179, img:"wl-down",   spec:"90高蓬松白鸭绒 · 可压缩收纳 · 6000m+ 叠加", tags:["羽绒","90绒","可收纳"], badge:"爆款"},
      {c:"ORG-M3", n:"防风抓绒保暖长裤",   p:99,  img:"wl-fleece", spec:"修身剪裁 · 锁温 · 腿部大幅度活动", tags:["抓绒裤","修身"]}
    ],
    "mount-shell": [
      {c:"ORG-S1", n:"专业高海拔硬壳冲锋衣", p:445, img:"wl-shell", spec:"全缝压胶防水 · 头盔兼容帽 · 腋下透气拉链 · 抗撕裂", tags:["硬壳","全压胶","抗撕裂"], badge:"核心"},
      {c:"ORG-S2", n:"极地抗寒冲锋裤",       p:285, img:"wl-shell", spec:"立体攀爬剪裁 · 膝盖多向弹力 · 防水防风耐磨", tags:["冲锋裤","立体剪裁"]},
      {c:"ORG-S3", n:"轻量化软壳外套",       p:199, img:"wl-shell", spec:"低海拔登山/高海拔徒步 · 防风 · 高透气", tags:["软壳","轻量"]}
    ],
    "climb-pack": [
      {c:"ORG-G4", n:"80L 专业登山大包", p:259, img:"cb-pack80", spec:"负重减压背板 · 防雨罩 · 多日远征", tags:["大包","80L"]},
      {c:"ORG-G5", n:"25L 高海拔单日冲顶小包", p:99, img:"cb-pack25", spec:"冲顶包 · 可折叠 · 轻量", tags:["冲顶包","25L"]},
      {c:"CL-BAG3", n:"防水收纳分装袋", p:39, img:"cb-drybag", spec:"全防水 · 分装衣物/电子设备 · 轻量", tags:["收纳","防水"]}
    ],
    "climb-foot": [
      {c:"ORG-G1", n:"高海拔防水高山靴", p:399, img:"wl-boot", spec:"冰爪兼容 · 高海拔保暖 · 硬底", tags:["高山靴"]},
      {c:"ORG-G2", n:"轻量化防水徒步登山鞋", p:229, img:"wl-boot", spec:"Vibram 大底 · 中帮 · 轻量", tags:["登山鞋","轻量"]},
      {c:"CL-CR", n:"高海拔防滑冰爪", p:119, img:"cb-crampons", spec:"十齿/十二齿 · 快速绑定 · 冰雪坡面抓地", tags:["冰爪"], badge:"新增"}
    ],
    "climb-safe": [
      {c:"ORG-G8", n:"专业登山头盔", p:149, img:"wl-acc", spec:"轻量 · UIAA 认证 · 通风", tags:["头盔","认证"]},
      {c:"CL-HAR", n:"登山安全带 + 主锁扁带套装", p:109, img:"cb-harness", spec:"可调安全带 · 主锁/扁带 · 全套快挂", tags:["安全带","主锁"], badge:"新增"},
      {c:"CL-POLE", n:"碳纤维登山杖", p:89, img:"cb-poles", spec:"碳纤维 · 三节可调 · 雪托", tags:["登山杖","碳纤维"], badge:"新增"},
      {c:"ORG-G9", n:"高海拔保温水壶", p:49, img:"wl-bottle", spec:"316 不锈钢 · 保温 12h · 防漏", tags:["水壶","保温"]},
      {c:"CL-EMG", n:"应急求生装备包", p:59, img:"wl-pack", spec:"求生毯/哨/火绒 · 紧急过夜", tags:["求生包"]}
    ],
    "climb-acc": [
      {c:"ORG-G6", n:"高山防紫外线雪镜", p:129, img:"wl-goggles", spec:"UV400 · 防眩光 · 防雾", tags:["雪镜","UV400"]},
      {c:"CL-FACE", n:"防风护脸面罩", p:35, img:"wl-hikegear", spec:"防风护脸 · 透气速干 · 高弹", tags:["面罩"]},
      {c:"ORG-G7", n:"分指加厚登山手套（厚款极寒）", p:79, img:"wl-gloves", spec:"防风防水 · 加厚 · 灵活抓握", tags:["手套","厚款"]},
      {c:"CL-GT", n:"分指登山手套（薄款操作）", p:59, img:"wl-gloves", spec:"薄款防滑 · 操作主锁/冰镐", tags:["手套","薄款"]},
      {c:"CL-NECK", n:"保暖护颈脖套", p:29, img:"wl-hikegear", spec:"锁温护颈 · 防风沙 · 多用法", tags:["脖套"]},
      {c:"CL-HAT", n:"高海拔防晒登山帽", p:45, img:"cb-hat", spec:"宽檐 UPF50+ · 防风绳 · 防紫外", tags:["防晒帽","UPF50+"], badge:"新增"},
      {c:"CL-KNEE", n:"登山护膝", p:39, img:"wl-pads", spec:"高弹支撑 · 减压 · 长下坡防护", tags:["护膝"]}
    ]
  };

  /* 场景化套装 */
  const KITS = [
    {lv:"ENTRY 5000m", n:"5000m 入门雪山套装", p:699, s:955,
     use:"适用：入门雪山、四姑娘、哈巴雪山等 5000 米级山峰",
     items:["速干内衣套装","常规抓绒中层","轻量化软壳外套","基础登山鞋","入门防护配件"]},
    {lv:"ADVANCED 7000m", n:"7000m 进阶极寒套装", p:1299, s:1715,
     use:"适用：慕士塔格等 7000 米级雪山攀登",
     items:["加厚速干内衣","高克重抓绒 + 羽绒内胆","硬壳冲锋衣裤","专业高山靴","全套防护器材"]},
    {lv:"EXPEDITION 8000m", n:"8000m 极限探险套装", p:1999, s:2620,
     use:"适用：8000 米级雪山远征、极地高山科考探险",
     items:["全套三层穿搭系统","大容量专业背负","全套高山安全装备","极寒防护配件"]}
  ];
  const KIT_CODES = [
    ["ORG-B1","ORG-M1","ORG-S3","ORG-G2","ORG-G6"],
    ["ORG-B2","ORG-M1","ORG-M2","ORG-S1","ORG-S2","ORG-G1","ORG-G6","ORG-G7","ORG-G8"],
    ["ORG-B1","ORG-B2","ORG-M1","ORG-M2","ORG-S1","ORG-S2","ORG-G4","ORG-G8","ORG-G6","ORG-G7","CL-HAR","CL-POLE"]
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
  $("#cbKitGrid").innerHTML = KITS.map((k,i) => `
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
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，登山装备正在准备"));

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

  if (sessionStorage.getItem("orogen_ptc")==="1" && !noIntro){
    /* 从首页经 CLIMB 跳转动画进入：只播 transition 揭幕 */
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
    sessionStorage.removeItem("orogen_ptc");
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
     5.5) 返回首页（对称转场：DESCEND / 下撤返回）
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
    $(".pt-word", pageTrans).textContent = "DESCEND";
    $(".pt-word-cn", pageTrans).textContent = "下 撤 返 回";
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

  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先浏览登山装备矩阵"));
})();
