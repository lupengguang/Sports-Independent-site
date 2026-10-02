/* ============================================================
   OROGEN 赛场竞技·篮球分类页 — basketball.js
   数据驱动产品矩阵 / 购物袋 / Tab 切换 + glider /
   选购指南 / 跳转动画 / reveal / parallax / scramble
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
    "bb-shoes": [
      {c:"ORG-BG1", n:"后卫款 · 低帮轻量篮球鞋", p:189, img:"bb-shoe-guard", spec:"轻量锁足，一步过人，持续跑动无负担", tags:["低帮","轻量化","前掌高回弹","抓地强化变向"], badge:"爆款"},
      {c:"ORG-BW1", n:"锋线款 · 中帮均衡篮球鞋", p:219, img:"bb-shoe-wing",  spec:"突破起跳双向稳定，兼顾持球与篮下对抗", tags:["中帮","均衡","侧向支撑","弹跳缓震"]},
      {c:"ORG-BC1", n:"中锋款 · 高帮强支撑篮球鞋", p:249, img:"bb-shoe-center", spec:"落地稳定，承受篮下高强度冲撞", tags:["高帮","强支撑","加厚后跟","足弓加固"], badge:"新增"}
    ],
    "bb-sets": [
      {c:"ORG-BA1", n:"后卫套装 · 修身速干球衣 + 窄脚球裤", p:129, img:"bb-set-guard",  spec:"修身剪裁，减少衣物摆动干扰，出汗不粘身", tags:["修身","速干","两件套"]},
      {c:"ORG-BA2", n:"锋线套装 · 宽松剪裁球衣球裤",       p:139, img:"bb-set-wing",   spec:"宽松剪裁，活动余量充足，弹力腰头，跳跃拉扯不束缚", tags:["宽松","弹力腰头","两件套"]},
      {c:"ORG-BA3", n:"中锋套装 · 加厚耐磨球衣球裤",       p:149, img:"bb-set-center", spec:"加厚耐磨面料，加大裤腿，肩部加固，对抗摩擦不易破损", tags:["加厚","耐磨","肩部加固"]}
    ],
    "bb-singles": [
      {c:"ORG-SG1", n:"比赛球衣",           p:59, img:"bb-jersey",      spec:"透气网眼 · 速干排汗 · 高抗撕裂面料", tags:["球衣","速干"]},
      {c:"ORG-SG2", n:"训练背心",           p:35, img:"bb-vest",        spec:"轻量无袖 · 高弹透气 · 训练热身", tags:["背心","训练"]},
      {c:"ORG-SG3", n:"热身连帽外套",       p:89, img:"bb-hoodie",      spec:"赛前热身 · 锁温蓄热 · 连帽防风", tags:["外套","热身"]},
      {c:"ORG-SG4", n:"压缩紧身衣裤",       p:69, img:"bb-compression", spec:"二级压缩 · 肌肉支撑 · 减少风阻快速排汗", tags:["紧身","压缩"]}
    ],
    "bb-acc": [
      {c:"ORG-AP1", n:"专业护踝",       p:39, img:"bb-ankle",    spec:"绑带加固 · 双侧支撑 · 防崴脚", tags:["护踝","防崴脚"]},
      {c:"ORG-AP2", n:"加厚缓冲护膝",   p:45, img:"bb-knee",     spec:"蜂窝缓冲 · 卡位防撞 · 透气贴合", tags:["护膝","缓冲"]},
      {c:"ORG-AP3", n:"护指套装",       p:19, img:"bb-finger",   spec:"分指防护 · 防戳伤 · 弹力贴合", tags:["护指"]},
      {c:"ORG-AP4", n:"运动头带",       p:15, img:"bb-headband", spec:"吸汗导湿 · 束发固发 · 弹力贴合", tags:["头带","吸汗"]},
      {c:"ORG-AP5", n:"篮球包",         p:69, img:"bb-ballbag",  spec:"大容量 · 球鞋独立仓 · 装备分区", tags:["球包"]},
      {c:"ORG-AP6", n:"吸湿防滑篮球",   p:89, img:"bb-ball",     spec:"吸湿PU皮 · 稳定手感 · 室内外通用", tags:["篮球","吸湿"], badge:"爆款"},
      {c:"ORG-AP7", n:"防滑镁粉",       p:12, img:"bb-powder",   spec:"快速止滑 · 吸汗 · 大容量粉盒", tags:["防滑粉"]},
      {c:"ORG-AP8", n:"专业毛巾底球袜", p:25, img:"bb-socks",    spec:"毛巾底加厚 · 足弓锁定 · 缓震防磨", tags:["球袜","毛巾底"]}
    ]
  };

  /* =========================================================
     2) 渲染产品矩阵
  ========================================================= */
  const allProducts = {};
  Object.values(P).forEach(arr => arr.forEach(it => allProducts[it.c] = it));

  /* 按位置选鞋 → 位置详情页跳转映射 */
  const DETAIL_LINKS = {
    "ORG-BG1": "bb-guard.html",
    "ORG-BW1": "bb-wing.html",
    "ORG-BC1": "bb-center.html"
  };

  $$("[data-grid]").forEach(host => {
    const grp = host.dataset.grid;
    host.innerHTML = P[grp].map((it,i) => `
      <article class="pcard${DETAIL_LINKS[it.c] ? " pcard-link" : ""}" data-code="${it.c}"${DETAIL_LINKS[it.c] ? ` data-goto="${DETAIL_LINKS[it.c]}"` : ""} data-reveal style="transition-delay:${(i%4)*70}ms">
        <figure class="pcard-media img-reveal">
          <img src="assets/${it.img}.jpg" alt="${it.n}" loading="lazy">
          <span class="pcard-code mono">${it.c}</span>
          ${it.badge ? `<span class="pcard-badge">${it.badge}</span>` : ""}
          ${DETAIL_LINKS[it.c] ? `<span class="pcard-more mono">查看详情 VIEW →</span>` : ""}
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

  /* 可跳转卡片：点击卡片（非加购按钮）进入详情页 */
  document.addEventListener("click", e => {
    if (e.target.closest("[data-add]")) return;
    const card = e.target.closest("[data-goto]");
    if (card) location.href = card.dataset.goto;
  });

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
    const qty = e.target.closest("[data-qty]");
    if (add){ addToCart(add.dataset.add); return; }
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
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，篮球装备正在准备"));

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

  /* 指南卡片 → 定位到对应面板产品 */
  $$(".cb-guide").forEach((g,i)=>{
    g.addEventListener("click", ()=>{
      switchTab("shoes");
      $("#bbTabs").scrollIntoView({behavior: reduced ? "auto" : "smooth"});
      showToast(["后卫 → 低帮轻量球鞋","前锋 → 中帮均衡球鞋","中锋 → 高帮支撑球鞋"][i]);
    });
  });

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
    /* 从首页经 COURT 跳转动画进入：只播 transition 揭幕 */
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
     5.5) 返回首页（对称转场：LEAVE COURT / 离场返回）
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
    $(".pt-word", pageTrans).textContent = "LEAVE COURT";
    $(".pt-word-cn", pageTrans).textContent = "离 场 返 回";
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

  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先按位置浏览篮球装备"));
})();
