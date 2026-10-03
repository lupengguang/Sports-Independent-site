/* ============================================================
   OROGEN 赛场竞技·击剑分类页 — fencing.js
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  const P = {
    "fn-guard": [
      {c:"ORG-FM1", n:"击剑金属面罩（分剑种）", p:139, img:"fn-mask",  spec:"高强度金属网抗击打，护颈围裙，分花剑/重剑/佩剑款", tags:["面罩","分剑种","抗冲击"], badge:"爆款"},
      {c:"ORG-FP1", n:"防护护胸",             p:79,  img:"fn-chest", spec:"硬质护板覆盖要害，可调节绑带，男女款分版型", tags:["护胸","硬质"]},
      {c:"ORG-FP2", n:"击剑护臂",             p:39,  img:"fn-arm",   spec:"抗刺面料护臂，弹性贴合，弓步不滑移", tags:["护臂","防穿刺"]},
      {c:"ORG-FG1", n:"击剑手套",             p:49,  img:"fn-glove", spec:"加厚掌背防穿刺，防滑掌心，单只按手型出售", tags:["手套","防滑"]}
    ],
    "fn-apparel": [
      {c:"ORG-FJ1", n:"白色比赛外套（专业比赛款）", p:169, img:"fn-jacket",   spec:"高强度抗刺面料，人体工学剪裁，符合赛事检测", tags:["比赛款","外套","抗刺"], badge:"爆款"},
      {c:"ORG-FJ2", n:"击剑马甲内胆",          p:89,  img:"fn-plastron", spec:"半侧防护内胆，与外套双层叠加，吸汗透气", tags:["内胆","马甲"]},
      {c:"ORG-FJ3", n:"弹力击剑裤",            p:99,  img:"fn-pants",    spec:"高弹耐磨面料，弓步大拉伸不紧绷，成人/青少年尺码", tags:["击剑裤","弹力"]},
      {c:"ORG-FJ4", n:"击剑长袜",              p:25,  img:"fn-socks",    spec:"加厚罗纹长袜，吸汗防磨，贴合护腿", tags:["击剑袜"]}
    ],
    "fn-weapon": [
      {c:"ORG-FW1", n:"花剑整剑 FOIL",       p:159, img:"fn-foil",  spec:"攻击仅限躯干，轻量化剑身，灵活刺击", tags:["花剑","整剑"]},
      {c:"ORG-FW2", n:"重剑整剑 EPEE",       p:179, img:"fn-epee",  spec:"全身有效击中，剑条更硬，抗冲击力强", tags:["重剑","整剑"], badge:"爆款"},
      {c:"ORG-FW3", n:"佩剑整剑 SABRE",      p:179, img:"fn-sabre", spec:"劈砍+刺击，弯护手，上半身对抗专用", tags:["佩剑","整剑"], badge:"新增"},
      {c:"ORG-FW4", n:"替换剑条",            p:59,  img:"fn-blade", spec:"高韧马氏体钢剑条，分剑种规格，易损件备份", tags:["剑条","备件"]},
      {c:"ORG-FB1", n:"多剑剑包",            p:89,  img:"fn-bag",   spec:"长条剑包可装多支剑与面罩，肩背手提两用", tags:["剑包"]},
      {c:"ORG-FC1", n:"电裁判手线",          p:29,  img:"fn-wire",  spec:"导电手线连接器材，稳定信号，耐弯折", tags:["手线","导电"]},
      {c:"ORG-FC2", n:"剑头配件包",          p:19,  img:"fn-tip",   spec:"剑头螺丝、弹簧、触点小件，应急更换", tags:["剑头","小件"]},
      {c:"ORG-FC3", n:"剑具保养耗材套装",    p:22,  img:"fn-kit",   spec:"防锈油、擦剑布、小工具，延长剑条寿命", tags:["保养","耗材"]}
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
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，击剑装备正在准备"));

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
      switchTab(i===2 ? "weapon" : "guard");
      $("#fnTabs").scrollIntoView({behavior:reduced?"auto":"smooth"});
      showToast(["花剑 → 轻量面罩 + 灵活剑服","重剑 → 加厚防护 + 加固面罩","佩剑 → 金属衣是必备配件"][i]);
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
    $(".pt-word",pageTrans).textContent="LEAVE PISTE"; $(".pt-word-cn",pageTrans).textContent="离 场 返 回";
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
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先按剑种浏览击剑装备"));
})();
