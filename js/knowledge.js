/* ============================================================
   OROGEN 装备指南·选型知识库页 — knowledge.js
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIntro = location.hash.includes("nointro");

  /* ========== 侧边筛选（模块 4：检索功能） ========== */
  const chips = $$(".kb-chip");
  const cards = $$(".kb-card");
  const blocks = $$(".kb-series-block");
  const empty = $("#kbEmpty");
  const state = { sport:"all", level:"all", cat:"all" };

  function levelMatch(cardLevel, sel){
    if (sel === "all") return true;
    return cardLevel === "both" || cardLevel === sel;
  }
  function applyFilter(){
    let total = 0;
    blocks.forEach(block => {
      let blockHits = 0;
      $$(".kb-card", block).forEach(card => {
        const ok =
          (state.sport === "all" || card.dataset.sport === state.sport) &&
          levelMatch(card.dataset.level, state.level) &&
          (state.cat === "all" || card.dataset.cat === state.cat);
        card.classList.toggle("hide", !ok);
        if (ok) blockHits++;
      });
      block.style.display = blockHits ? "" : "none";
      total += blockHits;
    });
    empty.classList.toggle("show", total === 0);
  }
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const g = chip.dataset.group, v = chip.dataset.value;
      state[g] = v;
      $$(`.kb-chip[data-group="${g}"]`).forEach(c => c.classList.toggle("active", c === chip));
      applyFilter();
      showToast(`已筛选：${$(`.kb-side-title`) ? "知识文章" : ""} ${$(".kb-chip.active") ? $$(".kb-chip.active").map(c=>c.textContent.trim()).join(" / ") : ""}`);
    });
  });

  /* ========== FAQ 手风琴 ========== */
  $$(".kb-faq-item").forEach(item => {
    const q = $(".kb-faq-q", item), a = $(".kb-faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      item.classList.toggle("open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.maxHeight = open ? "0px" : a.scrollHeight + "px";
    });
  });
  addEventListener("resize", () => {
    $$(".kb-faq-item.open .kb-faq-a").forEach(a => a.style.maxHeight = a.scrollHeight + "px");
  });

  /* ========== 购物袋（指南页保持空袋） ========== */
  const cartEl = $("#cart"), backdrop = $("#backdrop");
  const bagCount = $("#bagCount"), cartCount = $("#cartCount");
  const cartEmpty = $("#cartEmpty"), cartItems = $("#cartItems"), cartSubtotal = $("#cartSubtotal");
  bagCount.textContent = "0"; cartCount.textContent = "0";
  cartItems.innerHTML = ""; cartSubtotal.textContent = "$ 0";
  cartEmpty.style.display = "block";
  function openCart(){ cartEl.classList.add("open"); backdrop.classList.add("show"); document.body.style.overflow="hidden"; }
  function closeCart(){ cartEl.classList.remove("open"); backdrop.classList.remove("show"); document.body.style.overflow=""; }
  $("#bagBtn").addEventListener("click", openCart);
  $("#accountBtn").addEventListener("click", () => location.href = sessionStorage.getItem("orogen_user") ? "account.html" : "login.html");
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  $("#cartCheckout").addEventListener("click", ()=>showToast("结算系统即将开放，先看懂参数再下单"));

  const toast = $("#toast"); let toastTimer;
  function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2200); }

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

  let leaving=false;
  document.addEventListener("click",e=>{
    const link=e.target.closest('a[href^="index.html"]'); if(!link)return;
    e.preventDefault(); if(leaving)return; leaving=true; closeCart(); toggleMenu(false);
    try{sessionStorage.setItem("orogen_back","1");}catch(_){}
    const dest=link.getAttribute("href"); if(reduced){location.href=dest;return;}
    $(".pt-word",pageTrans).textContent="BACK HOME"; $(".pt-word-cn",pageTrans).textContent="返 回 首 页";
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
  $("#searchBtn").addEventListener("click",()=>showToast("全站搜索即将开放，可先用左侧筛选检索知识文章"));
})();
