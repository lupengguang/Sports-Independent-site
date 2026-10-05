/* ============================================================
   OROGEN 街头极限·城市滑板分类页 — skateboard.js
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  const P = {
    "sk-boards": [
      {c:"ORG-SB1", n:"街式双翘 · 新手入门整板",   p:89,  img:"sk-deck-rookie",    spec:"七层枫木整板，免组装开箱即滑，稳定容错", tags:["街式","整板","新手"], badge:"爆款", link:"sk-sb1.html"},
      {c:"ORG-SB2", n:"街式双翘 · 进阶动作整板",   p:129, img:"sk-deck-pro",       spec:"强回弹板面 + 中空支架，Ollie、尖翻利器", tags:["街式","整板","进阶"], link:"sk-sb2.html"},
      {c:"ORG-SB3", n:"Pro 签名款板面（单板面）",  p:65,  img:"sk-deck-sig",       spec:"原创涂鸦板面，七层加枫压制，DIY 首选", tags:["板面","签名款","DIY"], badge:"新增", link:"sk-sb3.html"},
      {c:"ORG-SC1", n:"陆地冲浪板 · 城市通勤款",   p:159, img:"sk-surfskate-city", spec:"弹簧转向支架，小角度灵活转向，免蹬地滑行", tags:["陆冲","通勤","刷街"], badge:"爆款", link:"sk-sc1.html"},
      {c:"ORG-SC2", n:"陆地冲浪板 · 泵道碗池进阶款", p:189, img:"sk-surfskate-pump", spec:"深脚窝板面 + 高回弹支架，泵道 carving 利器", tags:["陆冲","泵道","碗池"], badge:"爆款", link:"sk-sc2.html"},
      {c:"ORG-SL1", n:"长板 · 平花舞板",           p:179, img:"sk-long-dance",     spec:"超长板面，dancing 走板空间充裕，弹性适中", tags:["长板","平花","dancing"], link:"sk-sl1.html"},
      {c:"ORG-SL2", n:"长板 · 速降长板",           p:199, img:"sk-long-downhill",  spec:"下沉式板面低重心，高速稳定不晃，速降专用", tags:["长板","速降"], link:"sk-sl2.html"},
      {c:"ORG-SL3", n:"长板 · 代步巡航长板",       p:149, img:"sk-long-cruiser",   spec:"减震软轮，长距离刷街舒适省力，强承重", tags:["长板","巡航","代步"], link:"sk-sl3.html"}
    ],
    "sk-hardware": [
      {c:"ORG-SH1", n:"防滑砂纸（单板份）",        p:9,   img:"sk-grip",    spec:"高摩擦碳化硅砂粒，防水背胶，附刮板", tags:["砂纸","防滑"], link:"sk-sh1.html"},
      {c:"ORG-SH2", n:"高强度支架（桥）一对",      p:55,  img:"sk-trucks",  spec:"航空铝合金铸造，抗冲击不断裂，转向顺滑", tags:["支架","桥","铝合金"], badge:"爆款", link:"sk-sh2.html"},
      {c:"ORG-SH3", n:"高速轴承（8 颗装）",        p:25,  img:"sk-bearings",spec:"ABEC-9 精度，防尘盖设计，空转持久", tags:["轴承","ABEC-9"], link:"sk-sh3.html"},
      {c:"ORG-SH4", n:"耐磨配方轮（4 颗装）",      p:39,  img:"sk-wheels",  spec:"高回弹 PU 配方，硬轮街式 / 软轮刷街可选", tags:["轮子","耐磨"], link:"sk-sh4.html"},
      {c:"ORG-SH5", n:"维修工具套装 + 五金包",     p:29,  img:"sk-tools",   spec:"T 型工具 + 板钉 + 板尾保护条，随身调校", tags:["工具","板钉","保护条"], link:"sk-sh5.html"}
    ],
    "sk-apparel": [
      {c:"ORG-SA1", n:"重磅耐磨滑板 T 恤",         p:35,  img:"sk-tee",     spec:"280g 重磅棉，做旧水洗，落肩宽松剪裁", tags:["T恤","重磅","宽松"], badge:"爆款", link:"sk-sa1.html"},
      {c:"ORG-SA2", n:"宽松连帽卫衣",              p:69,  img:"sk-hoodie",  spec:"磨毛内里，oversize 版型，蹲跳无束缚", tags:["卫衣","宽松"], link:"sk-sa2.html"},
      {c:"ORG-SA3", n:"工装阔腿长裤",              p:75,  img:"sk-pants",   spec:"裤膝双层加固，摔倒摩擦不易破，弹力腰头", tags:["长裤","工装","加固"], link:"sk-sa3.html"},
      {c:"ORG-SA4", n:"耐磨滑板短裤",              p:45,  img:"sk-shorts",  spec:"抗撕裂面料，立体剪裁，大幅动作无牵绊", tags:["短裤","耐磨"], link:"sk-sa4.html"},
      {c:"ORG-SA5", n:"低帮耐磨滑板鞋",            p:95,  img:"sk-shoes",   spec:"加厚橡胶鞋头，强抓地大底，砂纸摩擦不易破", tags:["滑板鞋","低帮","抓地"], badge:"爆款", link:"sk-sa5.html"}
    ],
    "sk-protect": [
      {c:"ORG-SP1", n:"新手护具三件套（膝/肘/腕）", p:35,  img:"sk-set-rookie", spec:"基础防撞海绵，性价比高，初学练习必备", tags:["新手","套装","三件"], badge:"爆款", link:"sk-sp1.html"},
      {c:"ORG-SP2", n:"Pro 高强度护膝",            p:39,  img:"sk-knee",    spec:"硬质外壳 + 高密度缓冲层，碗池大台阶适用", tags:["护膝","Pro","硬壳"], link:"sk-sp2.html"},
      {c:"ORG-SP3", n:"Pro 高强度护肘",            p:35,  img:"sk-elbow",   spec:"抗冲击外壳，关节弯曲自如，强力防护", tags:["护肘","Pro"], link:"sk-sp3.html"},
      {c:"ORG-SP4", n:"护腕护掌（一对）",          p:25,  img:"sk-wrist",   spec:"掌部支撑板，摔倒撑地保护手腕", tags:["护腕","护掌"], link:"sk-sp4.html"},
      {c:"ORG-SP5", n:"专业滑板头盔",              p:59,  img:"sk-helmet",  spec:"ABS 外壳 + EPS 缓冲，多孔透气，速降必备", tags:["头盔","认证"], badge:"新增", link:"sk-sp5.html"},
      {c:"ORG-SP6", n:"滑板双肩包（可背板）",      p:65,  img:"sk-bag",     spec:"板面背负织带，独立鞋仓，耐磨弹道尼龙", tags:["滑板包","背板"], link:"sk-sp6.html"}
    ]
  };

  const allProducts = {};
  Object.values(P).forEach(arr => arr.forEach(it => allProducts[it.c] = it));

  $$("[data-grid]").forEach(host => {
    const grp = host.dataset.grid;
    host.innerHTML = P[grp].map((it,i) => `
      <article class="pcard${it.link?" pcard-link":""}" data-code="${it.c}" ${it.link?`data-link="${it.link}"`:""} data-reveal style="transition-delay:${(i%4)*70}ms">
        <figure class="pcard-media img-reveal">
          <img src="assets/${it.img}.jpg" alt="${it.n}" loading="lazy">
          <span class="pcard-code mono">${it.c}</span>
          ${it.badge ? `<span class="pcard-badge">${it.badge}</span>` : ""}
          ${it.link ? `<span class="pcard-view mono">查看详情 VIEW →</span>` : ""}
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
    const card = e.target.closest(".pcard[data-link]");
    if (add){ addToCart(add.dataset.add); return; }
    if (qty){ const [i,d]=qty.dataset.qty.split(":"); cart[+i].q+=+d; if(cart[+i].q<=0)cart.splice(+i,1); renderCart(); }
    if (card && !e.target.closest("[data-add]")){
      try{ sessionStorage.setItem("orogen_ptc","1"); }catch(_){}
      location.href = card.dataset.link;
    }
  });

  function openCart(){ cartEl.classList.add("open"); backdrop.classList.add("show"); document.body.style.overflow="hidden"; }
  function closeCart(){ cartEl.classList.remove("open"); backdrop.classList.remove("show"); document.body.style.overflow=""; }
  $("#bagBtn").addEventListener("click", openCart);
  $("#accountBtn").addEventListener("click", () => location.href = sessionStorage.getItem("orogen_user") ? "account.html" : "login.html");
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，滑板装备正在准备"));

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

  $$(".cb-guide").forEach(g=>{
    g.addEventListener("click",()=>{
      switchTab("boards");
      $("#skTabs").scrollIntoView({behavior:reduced?"auto":"smooth"});
      showToast("已切换到整板 & 板面 — " + g.querySelector("h3").textContent);
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
    $(".pt-word",pageTrans).textContent="LEAVE STREETS"; $(".pt-word-cn",pageTrans).textContent="收 板 返 回";
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
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先按板型浏览滑板装备"));
})();
