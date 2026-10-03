/* ============================================================
   OROGEN 奥罗根 — main.js
   Preloader / cursor / reveals / parallax / countdown /
   map network / cart / modal / overlays / micro-interactions
   ============================================================ */
(() => {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------
     Image fallback — regenerate via API if a local file fails
  --------------------------------------------------------- */
  const FB = {
    "assets/hero.jpg":          ["Cinematic wide photograph of a lone trail runner in dark technical apparel with a small backpack running across a rocky alpine ridge, dramatic storm clouds and mist over jagged snow capped mountains, moody desaturated dark tones, atmospheric fog, professional outdoor sportswear campaign, gritty film grain, high contrast", "landscape_16_9"],
    "assets/cat-shells.jpg":    ["Close up portrait of a mountaineer wearing a black waterproof hardshell jacket with the hood up in heavy rain, water droplets on the fabric, dark stormy atmosphere, charcoal tones, dramatic side light, editorial outdoor apparel photography", "portrait_4_3"],
    "assets/cat-insulation.jpg":["Mountaineer in a burnt orange insulated puffer jacket with a backpack climbing through deep snow, overcast dark sky, moody cinematic outdoor photography, muted desaturated tones, alpine environment", "portrait_4_3"],
    "assets/cat-trail.jpg":     ["Trail runner in motion ascending a steep rocky mountain path above a sea of clouds, dark moody sky, cinematic sportswear photography, dramatic light, muted desaturated palette", "portrait_4_3"],
    "assets/journal.jpg":       ["Mountaineer standing on a rocky outcrop gazing at jagged snow peaks at golden dawn, seen from behind, dramatic alpine landscape, warm sunrise light against deep shadows, cinematic editorial photography", "portrait_4_3"],
    "assets/drop-hero.jpg":     ["Massive dark alpine mountain peak with steep snow couloirs under heavy black storm clouds, ominous moody atmosphere, near monochrome dark tones, epic scale, fine art mountain photography, drifting fog", "landscape_16_9"],
    "assets/layer-01.jpg":      ["Person wearing a black technical hardshell jacket with a helmet compatible storm hood up, standing in falling snow, dark overcast mountain backdrop, moody technical apparel photography, muted charcoal tones", "portrait_4_3"],
    "assets/layer-02.jpg":      ["Man in a black beanie and dark synthetic insulated hoodie adjusting the zipper, cold weather, soft overcast light, blurred snowy background, editorial outdoor apparel photography, muted charcoal tones", "portrait_4_3"],
    "assets/layer-03.jpg":      ["Detail shot of a climber wearing a heather grey grid fleece midlayer adjusting the hem, blurred dark rocky background, moody technical apparel photography, muted desaturated tones", "portrait_4_3"],
    "assets/layer-04.jpg":      ["Climber in black stretchy technical softshell pants scrambling up a dark rock ridge, low angle view, moody overcast light, editorial outdoor gear photography, muted desaturated tones", "portrait_4_3"],
    "assets/workshop.jpg":      ["Dark moody garment workshop interior, a designer in dark clothing working at a wooden bench with fabric patterns and technical sketches on the wall, large window revealing a snowy mountain peak outside, warm lamp light against cold window light, cinematic photography", "landscape_4_3"],
    "assets/team-1.jpg":        ["Portrait of a focused woman product designer wearing a dark beanie and black jacket in a dim workshop, warm lamp light, moody editorial photography, charcoal tones", "portrait_4_3"],
    "assets/team-2.jpg":        ["Portrait of a bearded man materials engineer in dark workwear standing at a fabric cutting table, dim workshop, moody editorial photography, muted tones", "portrait_4_3"],
    "assets/team-3.jpg":        ["Portrait of a woman test coordinator in a black cap and dark jacket writing notes in a small notebook, industrial workshop background, moody editorial photography, muted tones", "portrait_4_3"],
    "assets/team-4.jpg":        ["Portrait of a man field coordinator wearing a black cap outdoors in cold mountains, serious expression, dark overcast light, moody editorial photography, muted tones", "portrait_4_3"],
    "assets/map.jpg":           ["Minimalist dark dotted world map, tiny dark grey dots forming the continents on a near black background, flat top down view, subtle high contrast data visualization style, no labels, no text", "landscape_16_9"]
  };
  $$("img[data-fb]").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fbDone) return;
      img.dataset.fbDone = "1";
      const f = FB["assets/" + img.dataset.fb];
      if (f) img.src = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
        encodeURIComponent(f[0]) + "&image_size=" + f[1];
    });
  });

  /* ---------------------------------------------------------
     Data
  --------------------------------------------------------- */
  const PRODUCTS = [
    { id: "shell-03",    label: "LAYER 01", name: "ALPINE SHELL 03", price: 445, img: "assets/layer-01.jpg",
      spec: "3L • 20D — 710 G — 40K HH — STORM HOOD",
      desc: "A no-compromise hardshell built for high-altitude exposure. Articulated patterning and a helmet-compatible Storm Hood for sustained four-season routes." },
    { id: "atom-hoody",  label: "LAYER 02", name: "ATOM HOODY", price: 325, img: "assets/layer-02.jpg", flip: true,
      spec: "60 G SYNTHETIC — 285 G — PACKABLE — ELASTIC CUFF",
      desc: "Stretchy synthetic insulation that breathes when you're moving and holds heat when you stop. The system layer most of our testers refuse to leave behind." },
    { id: "grid-fleece", label: "LAYER 03", name: "GRID FLEECE LS", price: 185, img: "assets/layer-03.jpg",
      spec: "POWER GRID™ — 240 G — MAPPED ZONES — THUMB LOOPS",
      desc: "Thermal midlayer with mapped grid zones that dump heat on the climb and trap it on the belay. Wears alone for most of the year." },
    { id: "terminal-pant", label: "LAYER 04", name: "TERMINAL PANT", price: 265, img: "assets/layer-04.jpg", flip: true,
      spec: "4-WAY STRETCH — 310 G — REINFORCED KNEE — REGULAR FIT",
      desc: "Softshell pant articulated for high steps and mixed ground. Reinforced where packs and rock chew through fabric first." }
  ];

  const TEAM = [
    { name: "MAREN HOLST",   loc: "PORTLAND, OR", role: "FOUNDER / DESIGN",   img: "assets/team-1.jpg",
      bio: "Former prototypist. Twelve seasons at a climbing brand before starting OROGEN." },
    { name: "AKSEL VIK",     loc: "TROMSO, NO",   role: "MATERIALS LEAD",     img: "assets/team-2.jpg",
      bio: "Expedition sewer. Spent eight years engineering laminates at the source." },
    { name: "PRIYA RAO",     loc: "VANCOUVER, CA", role: "TEST COORDINATOR",  img: "assets/team-3.jpg",
      bio: "Runs every prototype by hand before any CAD work begins. Eighteen years on the bench." },
    { name: "TOMAS CARBONE", loc: "BARI, IT",     role: "FIELD COORDINATOR",  img: "assets/team-4.jpg",
      bio: "Runs the athlete program at a major snow brand. Coordinates 42 testers across 11 countries." }
  ];

  const CAT_COLORS = { ALPINE: "#E8431C", COASTAL: "#FF8A5C", EXTREME: "#FFB03A", DESERT: "#D9C08A", FOREST: "#7FA06A" };
  const LOCATIONS = [
    { name: "PORTLAND, USA",       cat: "COASTAL", x: 13.5, y: 33,   testers: 6 },
    { name: "CANADIAN ROCKIES, CA",cat: "ALPINE",  x: 24.5, y: 30,   testers: 5 },
    { name: "MOAB, UTAH",          cat: "DESERT",  x: 17.5, y: 41.5, testers: 4 },
    { name: "TROMSO, NORWAY",      cat: "EXTREME", x: 51,   y: 16.5, testers: 4 },
    { name: "CHAMONIX, FRANCE",    cat: "ALPINE",  x: 49.5, y: 34.5, testers: 7 },
    { name: "HOKKAIDO, JAPAN",     cat: "FOREST",  x: 79.5, y: 34,   testers: 4 },
    { name: "TASMANIA, AU",        cat: "FOREST",  x: 84,   y: 74,   testers: 4 },
    { name: "PATAGONIA, AR",       cat: "ALPINE",  x: 29,   y: 80,   testers: 5 },
    { name: "QUEENSTOWN, NZ",      cat: "EXTREME", x: 87,   y: 81,   testers: 3 }
  ];

  /* ---------------------------------------------------------
     Render products & team
  --------------------------------------------------------- */
  const productsEl = $("#products");
  productsEl.innerHTML = PRODUCTS.map(p => `
    <article class="product ${p.flip ? "flip" : ""}">
      <figure class="product-media img-reveal" data-reveal data-cursor="VIEW">
        <img src="${p.img}" alt="${p.name}" data-fb="${p.img.replace("assets/", "")}" loading="lazy">
      </figure>
      <div class="product-info">
        <p class="label accent" data-reveal data-scramble>${p.label}</p>
        <h3 class="h3" data-reveal><span class="line"><span>${p.name}</span></span></h3>
        <p class="product-spec" data-reveal>${p.spec}</p>
        <p class="body" data-reveal>${p.desc}</p>
        <button class="btn btn-ghost-dark" data-reveal data-view="${p.id}" data-magnetic>
          VIEW PIECE — $ ${p.price} <span class="arr">→</span>
        </button>
      </div>
    </article>`).join("");

  $("#teamGrid").innerHTML = TEAM.map(m => `
    <article class="team-card" data-reveal data-cursor="VIEW">
      <figure class="img-reveal">
        <img src="${m.img}" alt="${m.name}" data-fb="${m.img.replace("assets/", "")}" loading="lazy">
      </figure>
      <h3 class="team-name">${m.name}</h3>
      <p class="team-loc">${m.loc}</p>
      <p class="team-role">${m.role}</p>
      <p class="team-bio">${m.bio}</p>
    </article>`).join("");

  /* ---------------------------------------------------------
     Preloader
  --------------------------------------------------------- */
  const preloader = $("#preloader"), preCount = $("#preCount"), preBar = $("#preBar");
  let loaded = false;
  window.addEventListener("load", () => { loaded = true; });

  const skipIntro = new URLSearchParams(location.search).has("nointro") || location.hash.includes("nointro");
  if (location.hash.includes("static")) {
    document.body.classList.add("static");
    $$("[data-count]").forEach(el => { el.textContent = el.dataset.count; });
    const m = location.hash.match(/offset-(\d+)/);
    if (m) {
      document.documentElement.style.scrollBehavior = "auto";
      // 步进式滚动：模拟真实滚动，驱动 headless 光栅化视口外 tile
      const target = +m[1];
      const step = () => {
        const y = scrollY;
        if (y < target) {
          scrollTo(0, Math.min(y + 120, target));
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }

  /* 是否从旷野分类页返回（对称转场） */
  const isBackHome = (() => {
    try { return sessionStorage.getItem("orogen_back") === "1"; } catch (_) { return false; }
  })();
  if (isBackHome) { try { sessionStorage.removeItem("orogen_back"); } catch (_) {} }

  (function runPreloader() {
    if (isBackHome) {
      preCount.textContent = "100";
      preBar.style.width = "100%";
      preloader.style.display = "none";
      document.body.classList.add("loaded");
      const homeBack = $("#homeBack");
      /* 按 hash 主动定位（转场返回时浏览器原生锚点滚动可能被 scroll restoration 覆盖） */
      const scrollToHash = () => {
        const id = decodeURIComponent(location.hash.slice(1));
        if (!id) return false;
        const el = document.getElementById(id);
        if (!el) return false;
        const m = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const y = el.getBoundingClientRect().top + scrollY - m;
        try { window.scrollTo({ top: Math.max(y, 0), behavior: "instant" }); }
        catch (_) { window.scrollTo(0, Math.max(y, 0)); }
        return true;
      };
      if (!reduced) {
        /* 面板先瞬间合拢，与前一页面板无缝衔接，下一帧向两侧揭开 */
        homeBack.classList.add("on", "instant");
        requestAnimationFrame(() => requestAnimationFrame(() => {
          homeBack.classList.remove("instant");
          homeBack.classList.add("leave");
          homeBack.classList.remove("on");
          setTimeout(() => homeBack.classList.remove("leave"), 950);
        }));
        /* 揭开期间提前定位并多点校正（图片/布局可能改变锚点位置），load 后最终校正 */
        [300, 700, 1100, 1600].forEach(t => setTimeout(scrollToHash, t));
        addEventListener("load", () => setTimeout(scrollToHash, 150), { once: true });
      } else {
        setTimeout(scrollToHash, 0);
      }
      setTimeout(scrambleInViewport, 0);
      return;
    }
    if (skipIntro) {
      preCount.textContent = "100";
      preBar.style.width = "100%";
      finishPreloader();
      return;
    }
    const dur = reduced ? 10 : 1700;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(eased * 100);
      preCount.textContent = String(v).padStart(3, "0");
      preBar.style.width = v + "%";
      if (p < 1) requestAnimationFrame(tick);
      else finishPreloader();
    })(t0);
  })();

  function finishPreloader() {
    const go = () => {
      document.body.classList.add("loaded");
      setTimeout(() => { preloader.style.display = "none"; }, 1400);
      scrambleInViewport();
    };
    if (loaded) go();
    else { window.addEventListener("load", go, { once: true }); setTimeout(go, 2600); }
  }

  /* ---------------------------------------------------------
     Custom cursor
  --------------------------------------------------------- */
  const cursor = $("#cursor"), cursorLabel = $("#cursorLabel");
  if (finePointer && !reduced) {
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      cursor.classList.remove("cursor--hidden");
    });
    document.addEventListener("mouseleave", () => cursor.classList.add("cursor--hidden"));
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      $(".cursor-ring", cursor).style.transform = `translate(${rx}px,${ry}px)`;
      cursorLabel.style.transform = `translate(${mx}px,${my}px) translate(16px,16px)`;
      requestAnimationFrame(loop);
    })();
    const bindHover = () => {
      $$("a, button, .map-dot, .size, .legend-item, input").forEach(el => {
        if (el.__cb) return;
        el.__cb = 1;
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor--active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--active"));
      });
      $$("[data-cursor]").forEach(el => {
        if (el.__cl) return;
        el.__cl = 1;
        el.addEventListener("mouseenter", () => {
          cursorLabel.textContent = el.dataset.cursor;
          cursor.classList.add("cursor--label");
        });
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--label"));
      });
    };
    bindHover();
    window.__bindCursor = bindHover;
  } else {
    cursor.style.display = "none";
  }

  /* ---------------------------------------------------------
     Header: solid / hide-on-scroll + progress bar
  --------------------------------------------------------- */
  const siteTop = $("#siteTop");
  const progress = $("#scrollProgress");
  let lastY = 0, scrollIdleTimer;
  addEventListener("scroll", () => {
    const y = scrollY;
    document.body.classList.toggle("scrolled", y > 40);
    // 滚动进行中：临时收起导航下拉
    document.body.classList.add("is-scrolling");
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(() => document.body.classList.remove("is-scrolling"), 120);
    if (!document.body.classList.contains("menu-open") &&
        !document.body.classList.contains("overlay-open") &&
        !$("#cart").classList.contains("open")) {
      siteTop.classList.toggle("hidden", y > lastY && y > 480);
    }
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  }, { passive: true });

  /* ---------------------------------------------------------
     Scramble text effect
  --------------------------------------------------------- */
  const CHARS = "!<>-_\\/[]{}=+*^?#01";
  function scramble(el) {
    if (el.__scrambled) return;
    el.__scrambled = true;
    const target = el.textContent;
    const len = target.length;
    const t0 = performance.now(), dur = 900;
    (function frame(now) {
      const p = Math.min((now - t0) / dur, 1);
      const settled = Math.floor(p * len);
      let out = target.slice(0, settled);
      for (let i = settled; i < len; i++) {
        out += target[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    })(t0);
  }
  const scrambleIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { scramble(en.target); scrambleIO.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  function scrambleInViewport() {
    $$("[data-scramble]").forEach(el => { if (!reduced) scrambleIO.observe(el); });
  }

  /* ---------------------------------------------------------
     Reveal on scroll (with stagger per parent)
  --------------------------------------------------------- */
  $$("[data-reveal]").forEach(el => {
    const parent = el.parentElement;
    const peers = $$(":scope > [data-reveal]", parent);
    const idx = peers.indexOf(el);
    el.style.setProperty("--d", Math.min(idx * 90, 450) + "ms");
  });
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal]").forEach(el => revealIO.observe(el));
  // img-reveal 遮罩揭开：观察所有未被 data-reveal 覆盖的图片容器（分类卡/团队卡）
  $$(".img-reveal").forEach(el => {
    if (!el.hasAttribute("data-reveal")) revealIO.observe(el);
  });

  /* ---------------------------------------------------------
     Parallax
  --------------------------------------------------------- */
  const pxEls = $$("[data-parallax]").map(el => ({ el, speed: parseFloat(el.dataset.parallax) || 0.2 }));
  function parallax() {
    if (reduced) return;
    const vh = innerHeight;
    pxEls.forEach(({ el, speed }) => {
      const r = el.parentElement.getBoundingClientRect();
      const offset = r.top + r.height / 2 - vh / 2;
      // use the independent `translate` property so it never clobbers
      // transform-based effects (ken burns / hover zoom) on the same node
      el.style.translate = `0px ${(-offset * speed * 0.35).toFixed(1)}px`;
    });
  }
  if (!reduced) {
    addEventListener("scroll", () => requestAnimationFrame(parallax), { passive: true });
    parallax();
  }

  /* ---------------------------------------------------------
     Marquee velocity skew
  --------------------------------------------------------- */
  const marqueeSkew = $(".marquee-skew");
  if (marqueeSkew && !reduced) {
    let prevY = scrollY, skew = 0;
    addEventListener("scroll", () => {
      const v = scrollY - prevY; prevY = scrollY;
      skew += (Math.max(-14, Math.min(14, v * 0.4)) - skew) * 0.12;
      marqueeSkew.style.transform = `skewX(${skew.toFixed(2)}deg)`;
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Hero coordinates ticker
  --------------------------------------------------------- */
  (function coords() {
    const el = $(".hero-corner.tl");
    if (!el || reduced) return;
    const final = "N 45.9327° / E 7.6327°";
    const t0 = performance.now(), dur = 1600;
    (function frame(now) {
      const p = Math.min((now - t0) / dur, 1);
      const settled = Math.floor(p * final.length);
      let out = final.slice(0, settled);
      for (let i = settled; i < final.length; i++) {
        const c = final[i];
        out += /[0-9]/.test(c) ? String((Math.random() * 10) | 0) : c;
      }
      el.firstChild.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.firstChild.textContent = final;
    })(t0);
  })();

  /* ---------------------------------------------------------
     Countdown (persisted target)
  --------------------------------------------------------- */
  (function countdown() {
    const KEY = "nl-drop-target";
    let target = 0;
    try { target = +localStorage.getItem(KEY); } catch (e) {}
    if (!target || target < Date.now()) {
      target = Date.now() + (182 * 24 * 3600 + 2 * 3600 + 13 * 60 + 19) * 1000;
      try { localStorage.setItem(KEY, target); } catch (e) {}
    }
    const launch = new Date(target);
    launch.setUTCHours(9, 0, 0, 0);
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    $("#dropLaunch").innerHTML =
      `LAUNCH — <b>${String(launch.getUTCDate()).padStart(2, "0")} ${months[launch.getUTCMonth()]} ${launch.getUTCFullYear()}</b> — 09:00 UTC`;

    const groups = { D: $("#cdD"), H: $("#cdH"), M: $("#cdM"), S: $("#cdS") };
    const pads = { D: 3, H: 2, M: 2, S: 2 };

    function setDigits(container, str) {
      if (container.children.length !== str.length) {
        container.innerHTML = "";
        for (const ch of str) {
          const d = document.createElement("span");
          d.className = "digit";
          d.textContent = ch;
          container.appendChild(d);
        }
        return;
      }
      [...container.children].forEach((d, i) => {
        if (d.textContent !== str[i]) {
          d.textContent = str[i];
          if (!reduced) d.animate(
            [{ transform: "translateY(.55em)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
            { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      });
    }
    function render() {
      let diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const d = Math.floor(diff / 86400); diff -= d * 86400;
      const h = Math.floor(diff / 3600);  diff -= h * 3600;
      const m = Math.floor(diff / 60);
      const s = diff - m * 60;
      setDigits(groups.D, String(d).padStart(pads.D, "0"));
      setDigits(groups.H, String(h).padStart(pads.H, "0"));
      setDigits(groups.M, String(m).padStart(pads.M, "0"));
      setDigits(groups.S, String(s).padStart(pads.S, "0"));
    }
    render();
    setInterval(render, 1000);
  })();

  /* ---------------------------------------------------------
     3D tilt on category cards
  --------------------------------------------------------- */
  if (finePointer && !reduced) {
    $$("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     Magnetic buttons
  --------------------------------------------------------- */
  if (finePointer && !reduced) {
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     Animated counters
  --------------------------------------------------------- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      const el = en.target, end = +el.dataset.count;
      const t0 = performance.now(), dur = 1800;
      (function frame(now) {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(frame);
      })(t0);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach(el => countIO.observe(el));

  /* ---------------------------------------------------------
     Field atlas map
  --------------------------------------------------------- */
  const mapDots = $("#mapDots"), tooltip = $("#mapTooltip");
  LOCATIONS.forEach(loc => {
    const dot = document.createElement("div");
    dot.className = "map-dot" + (loc.x > 70 ? " flip" : "");
    dot.style.left = loc.x + "%";
    dot.style.top = loc.y + "%";
    dot.style.setProperty("--c", CAT_COLORS[loc.cat]);
    dot.innerHTML = `<i class="lbl">${loc.name}</i>`;
    dot.addEventListener("mouseenter", () => {
      $("#ttName").textContent = loc.name;
      $("#ttCat").textContent = `/// ${loc.cat} SECTOR`;
      $("#ttTesters").innerHTML = `<b>${loc.testers}</b>&nbsp;TESTERS ON ROTATION`;
      const stage = $("#mapStage").getBoundingClientRect();
      tooltip.style.left = (loc.x / 100) * stage.width + "px";
      tooltip.style.top = (loc.y / 100) * stage.height + "px";
      tooltip.classList.add("show");
    });
    dot.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
    mapDots.appendChild(dot);
  });

  $$(".legend-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      const isActive = btn.classList.contains("active") && cat !== "ALL";
      $$(".legend-item").forEach(b => b.classList.remove("active"));
      const effective = isActive ? "ALL" : cat;
      $(`.legend-item[data-cat="${effective}"]`).classList.add("active");
      $$(".map-dot").forEach((d, i) => {
        const match = effective === "ALL" || LOCATIONS[i].cat === effective;
        d.classList.toggle("dim", !match);
      });
    });
  });

  /* ---------------------------------------------------------
     Toast
  --------------------------------------------------------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  /* ---------------------------------------------------------
     Cart
  --------------------------------------------------------- */
  const cartEl = $("#cart"), backdrop = $("#backdrop");
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("nl-cart") || "[]"); } catch (e) { cart = []; }

  const openCart = () => { cartEl.classList.add("open"); backdrop.classList.add("show"); document.body.style.overflow = "hidden"; };
  const closeCart = () => { cartEl.classList.remove("open"); maybeBackdrop(); document.body.style.overflow = ""; };
  const maybeBackdrop = () => {
    if (!$("#modal").classList.contains("open")) backdrop.classList.remove("show");
  };

  function cartTotals() {
    const qty = cart.reduce((a, i) => a + i.qty, 0);
    const sum = cart.reduce((a, i) => {
      const p = PRODUCTS.find(p => p.id === i.id);
      return a + (p ? p.price * i.qty : 0);
    }, 0);
    return { qty, sum };
  }

  function renderCart() {
    const items = $("#cartItems");
    if (!cart.length) {
      items.innerHTML = "";
    } else {
      items.innerHTML = cart.map((i, idx) => {
        const p = PRODUCTS.find(p => p.id === i.id);
        if (!p) return "";
        return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <p class="ci-name">${p.name}</p>
            <p class="ci-size">SIZE ${i.size} — ${p.label}</p>
            <div class="ci-row">
              <span class="qty">
                <button data-dec="${idx}" aria-label="Decrease">−</button>
                <b>${i.qty}</b>
                <button data-inc="${idx}" aria-label="Increase">+</button>
              </span>
              <span class="ci-price">$ ${p.price * i.qty}</span>
            </div>
            <button class="ci-remove" data-rm="${idx}">REMOVE</button>
          </div>
        </div>`;
      }).join("");
    }
    $("#cartEmpty").style.display = cart.length ? "none" : "grid";
    const { qty, sum } = cartTotals();
    $("#cartCount").textContent = qty;
    $("#cartSubtotal").textContent = "$ " + sum;
    const badge = $("#bagCount");
    badge.textContent = qty;
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
    try { localStorage.setItem("nl-cart", JSON.stringify(cart)); } catch (e) {}
  }
  renderCart();
  if (window.__bindCursor) window.__bindCursor();

  $("#cartItems").addEventListener("click", e => {
    const inc = e.target.dataset.inc, dec = e.target.dataset.dec, rm = e.target.dataset.rm;
    if (inc !== undefined) cart[+inc].qty++;
    if (dec !== undefined) { cart[+dec].qty--; if (cart[+dec].qty < 1) cart.splice(+dec, 1); }
    if (rm !== undefined) cart.splice(+rm, 1);
    if (inc !== undefined || dec !== undefined || rm !== undefined) renderCart();
  });
  $("#cartCheckout").addEventListener("click", () =>
    showToast(cart.length ? "DEMO CHECKOUT — CONNECT PAYMENTS TO GO LIVE" : "BAG IS EMPTY — ADD A PIECE FIRST"));
  $("#bagBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);

  /* ---------------------------------------------------------
     Quick view modal
  --------------------------------------------------------- */
  const modal = $("#modal");
  let modalProduct = null, modalSize = null;

  function openModal(id) {
    modalProduct = PRODUCTS.find(p => p.id === id);
    if (!modalProduct) return;
    modalSize = null;
    $$(".size").forEach(s => s.classList.remove("active"));
    $("#sizeHint").hidden = true;
    $("#modalImg").src = modalProduct.img;
    $("#modalImg").alt = modalProduct.name;
    $("#modalLabel").textContent = modalProduct.label;
    $("#modalName").textContent = modalProduct.name;
    $("#modalSpec").textContent = modalProduct.spec;
    $("#modalDesc").textContent = modalProduct.desc;
    $("#modalPrice").textContent = "$ " + modalProduct.price;
    modal.classList.add("open");
    backdrop.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    maybeBackdrop();
    if (!cartEl.classList.contains("open")) document.body.style.overflow = "";
  }
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-view]");
    if (btn) openModal(btn.dataset.view);
  });
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalSizes").addEventListener("click", e => {
    const s = e.target.closest(".size");
    if (!s) return;
    $$(".size").forEach(x => x.classList.remove("active"));
    s.classList.add("active");
    modalSize = s.dataset.size;
    $("#sizeHint").hidden = true;
  });
  $("#modalAdd").addEventListener("click", () => {
    if (!modalSize) {
      $("#sizeHint").hidden = false;
      const box = $("#modalSizes");
      box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
      return;
    }
    const found = cart.find(i => i.id === modalProduct.id && i.size === modalSize);
    if (found) found.qty++; else cart.push({ id: modalProduct.id, size: modalSize, qty: 1 });
    renderCart();
    closeModal();
    openCart();
    showToast(`ADDED — ${modalProduct.name} / ${modalSize}`);
  });

  backdrop.addEventListener("click", () => { closeModal(); closeCart(); closeSearch(); });

  /* ---------------------------------------------------------
     Search overlay
  --------------------------------------------------------- */
  const searchOverlay = $("#searchOverlay"), searchInput = $("#searchInput");
  const SEARCH_ROUTES = {
    "SHELLS": "#shop", "INSULATION": "#shop", "TRAIL": "#shop",
    "ALPINE SHELL 03": "#system", "硬壳夹克 03": "#system",
    "ATOM HOODY": "#system",
    "GRID FLEECE LS": "#system", "TERMINAL PANT": "#system", "终端软壳裤": "#system",
    "FIELD JOURNAL": "#journal", "TESTING NETWORK": "#testing",
    // 中文系列与子项
    "旷野极限系列": "wilderness.html", "高海拔登山": "climbing.html", "单板滑雪": "snowboard.html", "荒野徒步": "hiking.html",
    "街头极限系列": "skateboard.html", "城市滑板": "skateboard.html", "滑板": "skateboard.html",
    "赛场竞技系列": "#shop", "篮球": "basketball.html", "足球": "football.html", "羽毛球": "badminton.html", "击剑": "fencing.html",
    "装备指南": "outfits.html", "全场景穿搭": "outfits.html", "穿搭": "outfits.html", "选型知识库": "knowledge.html", "知识库": "knowledge.html", "探险笔记": "#journal",
    "关于品牌": "#origin", "团队初心": "#team"
  };
  const openSearch = () => {
    searchOverlay.classList.add("open");
    document.body.classList.add("overlay-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput.focus(), 350);
  };
  const closeSearch = () => {
    searchOverlay.classList.remove("open");
    document.body.classList.remove("overlay-open");
    document.body.style.overflow = "";
  };
  $("#searchBtn").addEventListener("click", openSearch);
  $("#searchClose").addEventListener("click", closeSearch);
  $("#accountBtn").addEventListener("click", () => location.href = sessionStorage.getItem("orogen_user") ? "account.html" : "login.html");
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toUpperCase();
    let any = false;
    $$("#searchSuggest li").forEach(li => {
      const match = !q || li.textContent.includes(q);
      li.classList.toggle("hide", q ? !match : false);
      li.classList.toggle("match", !!q && match);
      if (match) any = true;
    });
    $("#searchEmpty").hidden = !!any;
  });
  $("#searchSuggest").addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    closeSearch();
    const route = SEARCH_ROUTES[li.textContent];
    if (!route) return;
    if (route.endsWith(".html")) {
      try { sessionStorage.setItem(route === "climbing.html" ? "orogen_ptc" : route === "snowboard.html" ? "orogen_pts" : route === "hiking.html" ? "orogen_pth" : "orogen_pt", "1"); } catch (_) {}
      location.href = route;
      return;
    }
    $(route).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  const burger = $("#burger"), menuOverlay = $("#menuOverlay");
  function toggleMenu(force) {
    const open = force !== undefined ? force : !menuOverlay.classList.contains("open");
    menuOverlay.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      $$(".menu-link").forEach((l, i) => { l.style.transitionDelay = 120 + i * 60 + "ms"; });
      siteTop.classList.remove("hidden");
    } else {
      $$(".menu-link").forEach(l => { l.style.transitionDelay = "0ms"; });
    }
  }
  burger.addEventListener("click", () => toggleMenu());
  $$("#menuOverlay .menu-links a").forEach(l => l.addEventListener("click", () => toggleMenu(false)));

  /* ---------------------------------------------------------
     ESC key
  --------------------------------------------------------- */
  addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("open")) closeModal();
    if (cartEl.classList.contains("open")) closeCart();
    closeSearch();
    toggleMenu(false);
  });

  /* ---------------------------------------------------------
     Page transition —> wilderness.html
  --------------------------------------------------------- */
  const homeTrans = $("#homeTrans");
  let wilding = false;
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-wild]");
    if (!link) return;
    e.preventDefault();
    if (wilding) return;
    wilding = true;
    try { sessionStorage.setItem("orogen_pt", "1"); } catch (_) {}
    if (reduced) { location.href = "wilderness.html"; return; }
    document.body.classList.add("pl-going");
    homeTrans.classList.add("on");
    setTimeout(() => { location.href = "wilderness.html"; }, 1050);
  });

  /* ---------------------------------------------------------
     Page transition —> climbing.html (高海拔登山)
  --------------------------------------------------------- */
  const homeTransC = $("#homeTransC");
  let climbing = false;
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-climb]");
    if (!link) return;
    e.preventDefault();
    if (climbing) return;
    climbing = true;
    try { sessionStorage.setItem("orogen_ptc", "1"); } catch (_) {}
    if (reduced) { location.href = "climbing.html"; return; }
    document.body.classList.add("pl-going");
    homeTransC.classList.add("on");
    setTimeout(() => { location.href = "climbing.html"; }, 1050);
  });

  /* ---------------------------------------------------------
     Page transition —> snowboard.html (单板滑雪)
  --------------------------------------------------------- */
  const homeTransS = $("#homeTransS");
  let snowboarding = false;
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-snow]");
    if (!link) return;
    e.preventDefault();
    if (snowboarding) return;
    snowboarding = true;
    try { sessionStorage.setItem("orogen_pts", "1"); } catch (_) {}
    if (reduced) { location.href = "snowboard.html"; return; }
    document.body.classList.add("pl-going");
    homeTransS.classList.add("on");
    setTimeout(() => { location.href = "snowboard.html"; }, 1050);
  });

  /* ---------------------------------------------------------
     Page transition —> hiking.html (荒野徒步)
  --------------------------------------------------------- */
  const homeTransH = $("#homeTransH");
  let hiking = false;
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-hike]");
    if (!link) return;
    e.preventDefault();
    if (hiking) return;
    hiking = true;
    try { sessionStorage.setItem("orogen_pth", "1"); } catch (_) {}
    if (reduced) { location.href = "hiking.html"; return; }
    document.body.classList.add("pl-going");
    homeTransH.classList.add("on");
    setTimeout(() => { location.href = "hiking.html"; }, 1050);
  });

  /* ---------------------------------------------------------
     Newsletter
  --------------------------------------------------------- */
  $("#newsForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#newsInput"), msg = $("#newsMsg");
    if (!/^\S+@\S+\.\S+$/.test(input.value.trim())) {
      msg.textContent = "ENTER A VALID EMAIL TO JOIN THE LINE.";
      return;
    }
    msg.textContent = "CONFIRMED — FIRST DISPATCH AT THE NEXT DROP.";
    input.value = "";
    showToast("SUBSCRIBED — WELCOME TO THE LINE");
  });

  $("#year").textContent = new Date().getFullYear();
  if (window.__bindCursor) window.__bindCursor();
})();
