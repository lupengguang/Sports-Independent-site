/* ============================================================
   OROGEN 旷野极限 — wilderness.js
   数据驱动产品矩阵 / 购物袋 / 跳转动画 / 吸附导航 scrollspy /
   对照表 / 手风琴 / 智能搭配 / reveal / parallax / scramble
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  /* =========================================================
     1) 产品数据（按矩阵分组）
  ========================================================= */
  const P = {
    "mount-base": [
      {c:"ORG-B1", n:"高海拔极地速干长袖内衣套装（男女款）", p:89,  img:"wl-base", spec:"超薄高弹 · 抗静电 · 高山低温专用", tags:["速干","抗静电","男女款"], badge:"刚需"},
      {c:"ORG-B2", n:"加厚恒温速干打底衣",                     p:69,  img:"wl-base", spec:"6000m+ · 锁温 · 保持透气", tags:["加厚","恒温","6000m+"]},
      {c:"ORG-B3", n:"高海拔速干长裤",                         p:59,  img:"wl-base", spec:"耐磨防刮 · 立体剪裁 · 不卡裆不磨腿", tags:["耐磨","速干长裤"]},
      {c:"ORG-B4", n:"极地速干保暖袜",                         p:29,  img:"wl-boot", spec:"加厚毛圈 · 透气排汗 · 防磨脚", tags:["保暖袜","毛圈"]}
    ],
    "mount-mid": [
      {c:"ORG-M1", n:"高密抗风抓绒衣",     p:129, img:"wl-fleece", spec:"高克重摇粒绒 · 抗风锁温 · 不易起球", tags:["抓绒","抗风"]},
      {c:"ORG-M2", n:"轻量化高山羽绒内胆", p:179, img:"wl-down",   spec:"90白鸭绒 · 高蓬松 · 可折叠收纳", tags:["羽绒","90绒","可收纳"], badge:"爆款"},
      {c:"ORG-M3", n:"防风保暖抓绒长裤",   p:99,  img:"wl-fleece", spec:"修身不臃肿 · 保暖 · 动作灵活", tags:["抓绒裤","修身"]}
    ],
    "mount-shell": [
      {c:"ORG-S1", n:"专业高海拔硬壳冲锋衣", p:445, img:"wl-shell", spec:"全压胶防水 · 极高防风 · 头盔兼容帽 · 腋下透气拉链", tags:["硬壳","全压胶","抗撕裂"], badge:"核心"},
      {c:"ORG-S2", n:"极地抗寒冲锋裤",       p:285, img:"wl-shell", spec:"防水防风 · 耐磨抗刮 · 立体剪裁", tags:["冲锋裤","立体剪裁"]},
      {c:"ORG-S3", n:"轻量化软壳外套",       p:199, img:"wl-shell", spec:"高海拔徒步 · 防风 · 高透气", tags:["软壳","轻量"]}
    ],
    "mount-gear": [
      {c:"ORG-G1", n:"高海拔防滑高山靴", p:399, img:"wl-boot", spec:"冰爪兼容 · 高海拔保暖 · 硬底", tags:["高山靴"]},
      {c:"ORG-G2", n:"轻量化徒步登山鞋", p:229, img:"wl-boot", spec:"Vibram大底 · 中帮 · 轻量", tags:["登山鞋","轻量"]},
      {c:"ORG-G3", n:"抗寒防水雪地靴",   p:189, img:"wl-boot", spec:"-40℃ · 防水 · 保暖", tags:["雪地靴","-40℃"]},
      {c:"ORG-G4", n:"80L专业登山大包",  p:259, img:"wl-pack", spec:"防雨罩 · 负重减压系统 · 80L", tags:["大包","80L"]},
      {c:"ORG-G5", n:"便携登山小包",     p:99,  img:"wl-pack", spec:"冲顶包 · 可折叠 · 28L", tags:["冲顶包","28L"]},
      {c:"ORG-G6", n:"防紫外线高山雪镜", p:129, img:"wl-goggles",  spec:"UV400 · 防眩光 · 防雾", tags:["雪镜","UV400"]},
      {c:"ORG-G7", n:"加厚登山手套",     p:79,  img:"wl-gloves",  spec:"防风防水 · 加厚 · 灵活抓握", tags:["手套","防水"]},
      {c:"ORG-G8", n:"专业登山头盔",     p:149, img:"wl-acc",  spec:"轻量 · UIAA认证 · 通风", tags:["头盔","认证"]},
      {c:"ORG-G9", n:"高海拔保温水壶",   p:49,  img:"wl-bottle", spec:"316不锈钢 · 保温12h · 防漏", tags:["水壶","保温"]}
    ],
    "board-base": [
      {c:"ORG-SB1", n:"雪地速干恒温内衣套装", p:99,  img:"wl-base",   spec:"排汗不潮湿 · 恒温 · 高弹无束缚", tags:["速干","恒温"]},
      {c:"ORG-SB2", n:"雪地速干长裤",         p:59,  img:"wl-base",   spec:"速干 · 耐磨 · 贴合大幅动作", tags:["速干长裤"]},
      {c:"ORG-SB3", n:"轻薄高弹保暖棉服",     p:159, img:"wl-down",   spec:"高弹保暖 · 轻薄不顶衣 · 多层友好", tags:["棉服","轻薄"]},
      {c:"ORG-SB4", n:"短款锁温中层",         p:119, img:"wl-fleece", spec:"短款 · 锁温 · 跳跃不束缚", tags:["中层","短款"]}
    ],
    "board-shell": [
      {c:"ORG-SW1", n:"旷野野雪防水雪服上衣", p:329, img:"wl-snowsuit", spec:"高防水指数 · 防暴雪 · 宽松动作版 · 袖口防雪收口", tags:["雪服","高防水"], badge:"爆款"},
      {c:"ORG-SW2", n:"防水耐磨雪裤",         p:249, img:"wl-snowsuit", spec:"高腰护腰 · 防雪裙 · 抗撕裂耐磨", tags:["雪裤","防雪裙"]},
      {c:"ORG-SW3", n:"轻量化拼接雪服",       p:279, img:"wl-snowsuit", spec:"训练/野雪兼顾 · 极简旷野配色", tags:["雪服","轻量"]}
    ],
    "board-gear": [
      {c:"ORG-P1", n:"专业滑雪头盔",       p:159, img:"wl-acc", spec:"抗冲击 · 轻量 · 通风防雾", tags:["头盔"]},
      {c:"ORG-P2", n:"防雾高清雪镜",       p:139, img:"wl-goggles", spec:"防雾 · UV400 · 增光镜片", tags:["雪镜","防雾"]},
      {c:"ORG-P3", n:"防撞护臀护膝套装",   p:99,  img:"wl-pads", spec:"高弹缓冲 · 贴身不移位 · 全套", tags:["护具","全套"]},
      {c:"ORG-P4", n:"加厚防水滑雪手套",   p:89,  img:"wl-gloves", spec:"防水 · 保暖 · 护腕设计", tags:["手套","防水"]}
    ],
    "hike-cloth": [
      {c:"ORG-H1", n:"夏季旷野防晒速干套装",     p:119, img:"wl-hike", spec:"UPF50+ · 透气速干 · 防树枝刮擦", tags:["UPF50+","速干"]},
      {c:"ORG-H2", n:"春秋防风耐磨户外套装",     p:159, img:"wl-hike", spec:"抗风透气 · 耐磨 · 昼夜温差适配", tags:["防风","耐磨"]},
      {c:"ORG-H3", n:"冬季荒野保暖套装",         p:229, img:"wl-hike", spec:"轻量化保暖 · 防风锁温", tags:["保暖","冬季"]},
      {c:"ORG-H4", n:"多功能户外工装长裤",       p:89,  img:"wl-hike", spec:"防刮耐磨 · 多口袋 · 弹力剪裁", tags:["工装裤","多口袋"]}
    ],
    "hike-gear": [
      {c:"ORG-HG1", n:"轻量化防滑徒步鞋", p:189, img:"wl-boot",     spec:"抓地大底 · 低帮 · 轻量", tags:["徒步鞋","轻量"]},
      {c:"ORG-HG2", n:"全天候防水徒步靴", p:229, img:"wl-boot",     spec:"防水 · 中帮支撑 · 长距离", tags:["徒步靴","防水"]},
      {c:"ORG-HG3", n:"多功能荒野背包",   p:149, img:"wl-pack",     spec:"45L · 防雨 · 负重减负", tags:["背包","45L"]},
      {c:"ORG-HG4", n:"轻量化单日徒步包", p:79,  img:"wl-pack",     spec:"22L · 透气背板 · 轻量", tags:["单日包","22L"]},
      {c:"ORG-HG5", n:"防晒面罩",         p:29,  img:"wl-hikegear", spec:"UPF50+ · 冰感 · 防风沙", tags:["面罩","UPF50+"]},
      {c:"ORG-HG6", n:"防水雨披",         p:59,  img:"wl-shell",    spec:"轻量连体 · 耐磨 · 速穿", tags:["雨披","轻量"]}
    ]
  };

  const KITS = {
    mount: [
      {lv:"ENTRY 5000m", n:"5000m 入门雪山套装", p:699, s:955,
        items:["速干长袖内衣套装","高密抗风抓绒衣","轻量化软壳外套","轻量化徒步登山鞋","基础防护配件"]},
      {lv:"ADVANCED 7000m", n:"7000m 进阶极寒套装", p:1299, s:1715,
        items:["加厚恒温速干内衣","高克重抓绒 + 羽绒内胆","硬壳冲锋衣裤","专业高山靴","全套防护器材"]},
      {lv:"EXPEDITION 8000m", n:"极地全天候探险套装", p:1899, s:2498,
        items:["全套三层穿搭系统","80L专业登山大包","安全防护全套装备","极地配件包"]}
    ],
    board: [
      {lv:"BACKCOUNTRY", n:"户外野雪探险套装", p:899, s:1195,
        items:["耐寒加厚雪服雪裤","恒温内层","全套防护（头盔/雪镜/护具）"]},
      {lv:"PARK", n:"单板公园动作套装", p:649, s:845,
        items:["轻量化耐磨雪服","抗摔核心护具","防水手套"]}
    ],
    hike: [
      {lv:"DAY TRIP", n:"单日荒野轻徒步套装", p:299, s:397,
        items:["速干穿搭","轻量化单日背包","基础防护配件"]},
      {lv:"MULTI-DAY", n:"多日长线探险套装", p:749, s:995,
        items:["全套耐磨穿搭","大容量背负系统","全天候防护配件"]}
    ]
  };

  /* =========================================================
     2) 渲染产品矩阵 & 套装
  ========================================================= */
  const allProducts = {};
  Object.entries(P).forEach(([grp, arr]) => arr.forEach(it => allProducts[it.c] = it));

  $$("[data-grid]").forEach(host => {
    const grp = host.dataset.grid;
    host.innerHTML = P[grp].map((it,i) => `
      <article class="pcard" data-code="${it.c}" data-reveal style="transition-delay:${(i%3)*70}ms">
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

  $$("[data-kits]").forEach(host => {
    const line = host.dataset.kits;
    host.innerHTML = KITS[line].map((k,i) => `
      <div class="kit" data-reveal style="transition-delay:${i*90}ms">
        <span class="kit-level mono">${k.lv}</span>
        <h3 class="kit-name">${k.n}</h3>
        <ul class="kit-items">${k.items.map(t=>`<li>${t}</li>`).join("")}</ul>
        <div class="kit-foot">
          <span class="kit-price"><s>单买 $${k.s}</s><b>$${k.p}</b></span>
          <button class="kit-add" data-kitadd="${line}:${i}">整套加入 +</button>
        </div>
      </div>`).join("");
  });

  /* 智能搭配推荐条：从核心单品生成“关联搭配” */
  const MATCH = [
    {c:"ORG-S1", rel:"关联：速干内层 + 抓绒中层（三层成套）"},
    {c:"ORG-M2", rel:"关联：硬壳冲锋衣外层叠穿"},
    {c:"ORG-G4", rel:"关联：高山靴 + 雪镜 + 头盔"},
    {c:"ORG-SW1", rel:"关联：恒温内层 + 全套护具"},
    {c:"ORG-SW2", rel:"关联：野雪雪服上衣成套"},
    {c:"ORG-H1", rel:"关联：防晒面罩 + 徒步鞋"},
    {c:"ORG-H4", rel:"关联：单日背包 + 雨披"},
    {c:"ORG-M1", rel:"关联：速干内层贴身打底"},
    {c:"ORG-HG3", rel:"关联：防水徒步靴 + 工装长裤"},
    {c:"ORG-P3", rel:"关联：滑雪头盔 + 雪镜"}
  ];
  $("#wlMatchStrip").innerHTML = MATCH.map(m => {
    const it = allProducts[m.c];
    return `<div class="wl-match-card">
      <img src="assets/${it.img}.jpg" alt="${it.n}" loading="lazy">
      <div class="mm-info">
        <span class="mm-code mono">${it.c} · SMART MATCH</span>
        <span class="mm-name">${it.n}</span>
        <p class="mm-rel mono">${m.rel}</p>
        <div class="mm-foot">
          <span class="mm-price">$${it.p}</span>
          <button class="mm-add" data-add="${it.c}" aria-label="加入装备袋">+</button>
        </div>
      </div>
    </div>`;
  }).join("");

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
      const [line,i] = kitAdd.dataset.kitadd.split(":");
      KITS[line][+i].items.forEach(()=>{});
      // 套装：把该系列中对应的核心单品加入（每件计1）
      const kitCodes = {
        "mount:0":["ORG-B1","ORG-M1","ORG-S3","ORG-G2","ORG-G6"],
        "mount:1":["ORG-B2","ORG-M1","ORG-M2","ORG-S1","ORG-S2","ORG-G1","ORG-G6","ORG-G7","ORG-G8"],
        "mount:2":["ORG-B1","ORG-M1","ORG-M2","ORG-S1","ORG-S2","ORG-G4","ORG-G8","ORG-G6","ORG-G7"],
        "board:0":["ORG-SB1","ORG-SW1","ORG-SW2","ORG-P1","ORG-P2","ORG-P3"],
        "board:1":["ORG-SW3","ORG-P3","ORG-P4"],
        "hike:0":["ORG-H1","ORG-HG4","ORG-HG5"],
        "hike:1":["ORG-H2","ORG-H4","ORG-HG3","ORG-HG2","ORG-HG5","ORG-HG6"]
      }[`${line}:${i}`] || [];
      kitCodes.forEach(c=>addToCart(c));
      showToast("整套方案已加入装备袋");
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
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，旷野装备正在准备"));

  /* Toast */
  const toast = $("#toast"); let toastTimer;
  function showToast(msg){
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove("show"), 2600);
  }

  /* =========================================================
     4) 预加载器 & 跳转动画 intro
  ========================================================= */
  const preloader = $("#preloader"), preBar = $("#preBar"), preCount = $("#preCount");
  const pageTrans = $("#pageTrans"), ptBar = $("#ptBar");
  const siteTop = $("#siteTop");

  function finishLoading(){
    document.body.classList.add("loaded");
    requestAnimationFrame(()=>revealOnLoad());
  }

  if (sessionStorage.getItem("orogen_pt")==="1" && !noIntro){
    /* 从首页经跳转动画进入：只播 transition 揭幕 */
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
    sessionStorage.removeItem("orogen_pt");
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
     5) 自定义光标
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
     6) 滚动：scrolled / header 隐藏 / 进度条
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
     7) Scramble
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
     8) Reveal / 图片遮罩 / 计数器
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
      // hero 统计由父级 reveal 触发；独立的单独观察
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
    // 首屏元素立刻触发
    $$(".wl-hero [data-reveal], .wl-hero .img-reveal").forEach(el=>el.classList.add("in"));
    $$(".wl-hero [data-count]").forEach(countUp);
  }

  /* =========================================================
     9) 视差
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
      if(img) img.style.transform=`translate3d(0,${(-off).toFixed(1)}px,0)`+(el.classList.contains("wl-hero-media img")?"":"");
    });
  }
  addEventListener("scroll",()=>{ if(!pTicking){ pTicking=true; requestAnimationFrame(applyParallax);} },{passive:true});

  /* =========================================================
     10) 吸附子导航 scrollspy
  ========================================================= */
  const subItems=$$(".wl-subnav-item");
  const spyIO=new IntersectionObserver(es=>{
    es.forEach(en=>{
      const item=subItems.find(x=>x.dataset.spy===en.target.id);
      if(item) item.classList.toggle("active",en.isIntersecting);
    });
  },{rootMargin:"-45% 0px -50% 0px"});
  $$("section[id]").forEach(s=>spyIO.observe(s));

  /* =========================================================
     11) 对照表：行激活
  ========================================================= */
  $$(".wl-table-row").forEach(row=>{
    row.addEventListener("click",()=>{
      const was=row.classList.contains("active");
      $$(".wl-table-row").forEach(r=>r.classList.remove("active"));
      if(!was) row.classList.add("active");
    });
  });

  /* =========================================================
     12) 避坑手风琴
  ========================================================= */
  $$(".wl-acc-item").forEach(item=>{
    const head=$(".wl-acc-head",item), body=$(".wl-acc-body",item);
    head.addEventListener("click",()=>{
      const open=item.classList.contains("open");
      $$(".wl-acc-item").forEach(i=>{ i.classList.remove("open"); $(".wl-acc-body",i).style.maxHeight="0px"; });
      if(!open){ item.classList.add("open"); body.style.maxHeight=body.scrollHeight+"px"; }
    });
  });

  /* =========================================================
     13) 移动菜单
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

  /* =========================================================
     14) ESC：关闭浮层
  ========================================================= */
  addEventListener("keydown",e=>{
    if(e.key==="Escape"){ closeCart(); toggleMenu(false); }
  });

  $("#year").textContent=new Date().getFullYear();

  /* 搜索按钮占位提示 */
  $("#searchBtn").addEventListener("click",()=>showToast("旷野全站搜索即将开放，可先浏览装备矩阵"));
})();
