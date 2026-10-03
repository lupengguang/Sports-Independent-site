/* ============================================================
   OROGEN 个人中心 — account.js
   登录守卫 / 模块切换 / 筛选 / 头像上传 / 资料编辑 / 各模块交互
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ========== 登录守卫 ========== */
  let user = null;
  try { user = JSON.parse(sessionStorage.getItem("orogen_user") || "null"); } catch(_){}
  if (!user){ location.replace("login.html"); return; }

  /* ========== 图片兜底 ========== */
  const FB = {
    "assets/hero.jpg":       ["Cinematic wide photograph of a lone trail runner in dark technical apparel with a small backpack running across a rocky alpine ridge, dramatic storm clouds and mist over jagged snow capped mountains, moody desaturated dark tones, atmospheric fog, professional outdoor sportswear campaign, gritty film grain, high contrast", "landscape_16_9"],
    "assets/ac-avatar.jpg":  ["Portrait of a young asian outdoor enthusiast wearing a dark beanie and black hardshell jacket, snow dusted on shoulders, moody overcast mountain light, editorial outdoor portrait photography, muted charcoal tones, square crop", "square"],
    "assets/journal.jpg":    ["Mountaineer standing on a rocky outcrop gazing at jagged snow peaks at golden dawn, seen from behind, dramatic alpine landscape, warm sunrise light against deep shadows, cinematic editorial photography", "portrait_4_3"],
    "assets/cat-shells.jpg": ["Close up portrait of a mountaineer wearing a black waterproof hardshell jacket with the hood up in heavy rain, water droplets on the fabric, dark stormy atmosphere, charcoal tones, dramatic side light, editorial outdoor apparel photography", "portrait_4_3"],
    "assets/cat-trail.jpg":  ["Trail runner in motion ascending a steep rocky mountain path above a sea of clouds, dark moody sky, cinematic sportswear photography, dramatic light, muted desaturated palette", "portrait_4_3"],
    "assets/workshop.jpg":   ["Dark moody garment workshop interior, a designer in dark clothing working at a wooden bench with fabric patterns and technical sketches on the wall, large window revealing a snowy mountain peak outside, warm lamp light against cold window light, cinematic photography", "landscape_4_3"],
    "assets/layer-01.jpg":   ["Person wearing a black technical hardshell jacket with a helmet compatible storm hood up, standing in falling snow, dark overcast mountain backdrop, moody technical apparel photography, muted charcoal tones", "portrait_4_3"],
    "assets/layer-02.jpg":   ["Man in a black beanie and dark synthetic insulated hoodie adjusting the zipper, cold weather, soft overcast light, blurred snowy background, editorial outdoor apparel photography, muted charcoal tones", "portrait_4_3"],
    "assets/layer-03.jpg":   ["Detail shot of a climber wearing a heather grey grid fleece midlayer adjusting the hem, blurred dark rocky background, moody technical apparel photography, muted desaturated tones", "portrait_4_3"],
    "assets/layer-04.jpg":   ["Climber in black stretchy technical softshell pants scrambling up a dark rock ridge, low angle view, moody overcast light, editorial outdoor gear photography, muted desaturated tones", "portrait_4_3"],
    "assets/ac-fav-skate.jpg":["Studio product shot of a black suede skateboarding shoe with gum rubber sole on a concrete surface, dramatic side light, moody editorial product photography, dark background", "portrait_4_3"],
    "assets/ac-fav-bball.jpg":["Studio product shot of a low top performance basketball shoe in black and orange colorway on a dark court floor, dramatic rim light, moody editorial product photography", "portrait_4_3"],
    "assets/ac-fav-ball2.jpg":["Studio product shot of black compression knee pads for basketball on a dark textured surface, dramatic side light, moody editorial product photography", "portrait_4_3"],
    "assets/ac-plan-skate.jpg":["Flat lay of a skateboarding outfit set: black suede skate shoes, khaki cargo pants, black cap and knee pads arranged on dark concrete, moody top down editorial photography, charcoal tones", "landscape_16_9"],
    "assets/ac-plan-ball.jpg":["Flat lay of a basketball guard outfit set: low top basketball shoes, compression knee pads and a dark quick dry jersey arranged on a dark court floor, moody top down editorial photography", "landscape_16_9"],
    "assets/ac-story-1.jpg": ["Skateboarder riding through an empty city riverside plaza at night, long exposure light trails, moody urban night photography, cinematic teal and orange tones", "portrait_4_3"]
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

  /* ========== Toast ========== */
  const toast = $("#toast"); let toastTimer;
  function showToast(msg){
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-toast]");
    if (t) showToast(t.dataset.toast);
  });

  /* ========== 预加载器 & 转场 ========== */
  const preloader = $("#preloader"), pageTrans = $("#pageTrans");
  function finishLoading(){ document.body.classList.add("loaded"); }
  if (sessionStorage.getItem("orogen_ptc") === "1"){
    preloader.style.display = "none"; pageTrans.classList.add("on");
    requestAnimationFrame(() => { setTimeout(() => {
      pageTrans.classList.add("leave"); pageTrans.classList.remove("on");
      finishLoading(); setTimeout(() => pageTrans.classList.remove("leave"), 900);
    }, 420); });
    sessionStorage.removeItem("orogen_ptc");
  } else if (reduced){
    preloader.style.display = "none"; finishLoading();
  } else {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 26);
      $("#preBar").style.width = p + "%";
      $("#preCount").textContent = String(Math.floor(p)).padStart(3, "0");
      if (p >= 100){ clearInterval(iv); setTimeout(() => {
        preloader.classList.add("done"); setTimeout(finishLoading, 250);
      }, 200); }
    }, 90);
  }

  let leaving = false;
  function goTo(dest){
    if (leaving) return; leaving = true;
    if (reduced){ location.href = dest; return; }
    document.body.style.overflow = "hidden";
    pageTrans.classList.add("on");
    setTimeout(() => location.href = dest, 1050);
  }
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href$=".html"], a[href*=".html#"]');
    if (!link) return;
    e.preventDefault(); goTo(link.getAttribute("href"));
  });

  /* ========== 自定义光标 ========== */
  if (finePointer && !reduced){
    const cursor = $("#cursor"), cursorLabel = $("#cursorLabel");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    (function loop(){
      cx += (mx - cx) * .2; cy += (my - cy) * .2;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", e => {
      const t = e.target.closest("[data-cursor]");
      if (t){ cursorLabel.textContent = t.dataset.cursor; cursor.classList.add("has-label"); }
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest("[data-cursor]")){ cursorLabel.textContent = ""; cursor.classList.remove("has-label"); }
    });
    document.addEventListener("mousedown", () => cursor.classList.add("down"));
    document.addEventListener("mouseup", () => cursor.classList.remove("down"));
  }

  /* ========== Scramble ========== */
  if (!reduced){
    const CHARS = "!<>-_\\/[]{}=+*^?#01";
    $$("[data-scramble]").forEach(el => {
      const target = el.textContent, len = target.length, t0 = performance.now();
      (function frame(now){
        const p = Math.min((now - t0) / 900, 1), settled = Math.floor(p * len);
        let out = target.slice(0, settled);
        for (let i = settled; i < len; i++) out += target[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
        el.textContent = out;
        if (p < 1) requestAnimationFrame(frame); else el.textContent = target;
      })(t0);
    });
  }

  /* ========== 填充用户身份 ========== */
  if (user.name){
    $("#userName").textContent = user.name.toUpperCase();
    $("#pfName").value = user.name;
  }

  /* ============================================================
     模块切换（侧边导航 + 移动端汉堡）
  ============================================================ */
  const navItems = $$(".ac-nav-item");
  const mods = $$(".ac-mod");
  const side = $("#acSide"), menuToggle = $("#menuToggle"), menuCurrent = $("#menuCurrent");

  function switchMod(id){
    navItems.forEach(n => n.classList.toggle("active", n.dataset.mod === id));
    mods.forEach(m => m.classList.toggle("active", m.id === "mod-" + id));
    const cur = $(".ac-mod.active");
    if (cur) menuCurrent.textContent = cur.dataset.title;
    side.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (!reduced) scrollTo({ top: 0, behavior: "smooth" });
  }
  navItems.forEach(n => n.addEventListener("click", () => switchMod(n.dataset.mod)));
  menuToggle.addEventListener("click", () => {
    const open = side.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  /* 消息卡片内跳转模块 */
  $$("[data-mod-jump]").forEach(b => b.addEventListener("click", () => switchMod(b.dataset.modJump)));

  /* ============================================================
     首屏：头像 / 标签 / 编辑资料 / 退出登录
  ============================================================ */
  const avatarInput = $("#avatarInput"), avatarImg = $("#avatarImg");
  $("#avatarBtn").addEventListener("click", () => avatarInput.click());
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      avatarImg.src = e.target.result;
      try { localStorage.setItem("orogen_avatar", e.target.result); } catch(_){}
      showToast("头像已更新 — 探险者的脸，值得被记住");
    };
    reader.readAsDataURL(file);
  });
  try {
    const savedAvatar = localStorage.getItem("orogen_avatar");
    if (savedAvatar){ avatarImg.src = savedAvatar; avatarImg.removeAttribute("data-fb"); }
  } catch(_){}

  /* 标签手动添加 */
  const tagsBox = $("#userTags"), tagAddBtn = $("#tagAddBtn");
  const TAG_POOL = ["街头滑手", "雪山常客", "球场指挥官", "装备控"];
  let tagIdx = 0;
  tagAddBtn.addEventListener("click", () => {
    const name = TAG_POOL[tagIdx++ % TAG_POOL.length];
    const tag = document.createElement("span");
    tag.className = "ac-tag"; tag.dataset.tag = name; tag.textContent = name;
    tagsBox.insertBefore(tag, tagAddBtn);
    showToast(`已添加标签「${name}」`);
  });

  /* 编辑资料弹层 */
  const modal = $("#profileModal");
  const bioEl = $("#userBio");
  const savedBio = (() => { try { return localStorage.getItem("orogen_bio"); } catch(_){ return null; } })();
  if (savedBio) bioEl.textContent = savedBio;

  function openModal(){
    $("#pfName").value = $("#userName").textContent;
    $("#pfBio").value = bioEl.textContent;
    $$("#pfTags .ac-chip").forEach(c => {
      const cur = $$(".ac-tag[data-tag]", tagsBox).some(t => t.dataset.tag === c.dataset.ptag);
      c.classList.toggle("active", cur);
    });
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $("#editProfileBtn").addEventListener("click", openModal);
  $("#profileClose").addEventListener("click", closeModal);
  $("#profileCancel").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  $$("#pfTags .ac-chip").forEach(c => c.addEventListener("click", () => c.classList.toggle("active")));
  $("#profileForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#pfName").value.trim();
    const bio = $("#pfBio").value.trim();
    if (!name){ showToast("昵称不能为空"); return; }
    $("#userName").textContent = name.toUpperCase();
    bioEl.textContent = bio || "这个人还没写简介，山知道答案。";
    try {
      localStorage.setItem("orogen_bio", bioEl.textContent);
      user.name = name;
      sessionStorage.setItem("orogen_user", JSON.stringify(user));
    } catch(_){}
    /* 同步标签 */
    $$(".ac-tag[data-tag]", tagsBox).forEach(t => t.remove());
    $$("#pfTags .ac-chip.active").forEach(c => {
      const tag = document.createElement("span");
      tag.className = "ac-tag"; tag.dataset.tag = c.dataset.ptag; tag.textContent = c.dataset.ptag;
      tagsBox.insertBefore(tag, tagAddBtn);
    });
    closeModal();
    showToast("资料已保存");
  });

  /* 退出登录 */
  $("#logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("orogen_user");
    showToast("已退出登录 — 山野等你回来");
    setTimeout(() => goTo("login.html"), reduced ? 200 : 1200);
  });

  /* ============================================================
     模块 1：订单筛选
  ============================================================ */
  const orderChips = $$('[data-filter="orders"] .ac-chip');
  const orders = $$("#orderList .ac-order");
  const orderEmpty = $("#orderEmpty");
  orderChips.forEach(chip => chip.addEventListener("click", () => {
    orderChips.forEach(c => c.classList.toggle("active", c === chip));
    const st = chip.dataset.status;
    let hits = 0;
    orders.forEach(o => {
      const show = st === "all" || o.dataset.status === st;
      o.style.display = show ? "" : "none";
      if (show) hits++;
    });
    orderEmpty.hidden = hits !== 0;
  }));

  /* ============================================================
     模块 2：收藏筛选 + 取消收藏
  ============================================================ */
  const favChips = $$('[data-filter="favs"] .ac-chip');
  const favs = $$("#favGrid .ac-fav");
  const favEmpty = $("#favEmpty");
  const badgeFavs = $("#badgeFavs");

  function favCount(){ return $$("#favGrid .ac-fav:not(.removing)").length; }
  function favRefresh(){
    badgeFavs.textContent = favCount();
    const anyVisible = favs.some(f => f.style.display !== "none" && !f.classList.contains("removing"));
    favEmpty.hidden = anyVisible;
  }
  favChips.forEach(chip => chip.addEventListener("click", () => {
    favChips.forEach(c => c.classList.toggle("active", c === chip));
    const cat = chip.dataset.cat;
    favs.forEach(f => {
      f.style.display = (cat === "all" || f.dataset.cat === cat) ? "" : "none";
    });
    favRefresh();
  }));
  $$("[data-unfav]").forEach(btn => btn.addEventListener("click", () => {
    const card = btn.closest(".ac-fav");
    card.classList.add("removing");
    setTimeout(() => { card.style.display = "none"; favRefresh(); }, 400);
    showToast("已取消收藏");
  }));

  /* ============================================================
     模块 3：方案 重命名 / 删除
  ============================================================ */
  $$("[data-rename]").forEach(btn => btn.addEventListener("click", () => {
    const nameEl = btn.closest(".ac-plan").querySelector(".ac-plan-name");
    nameEl.contentEditable = "true";
    nameEl.focus();
    document.getSelection().selectAllChildren(nameEl);
    showToast("直接输入新名称，点击空白处保存");
    nameEl.addEventListener("blur", () => {
      nameEl.contentEditable = "false";
      if (!nameEl.textContent.trim()) nameEl.textContent = "未命名方案";
      showToast("方案已重命名");
    }, { once: true });
  }));
  $$("[data-del-plan]").forEach(btn => btn.addEventListener("click", () => {
    const card = btn.closest(".ac-plan");
    card.classList.add("removing");
    setTimeout(() => card.remove(), 400);
    showToast("方案已删除");
  }));

  /* ============================================================
     模块 4：手记子标签 + 删除
  ============================================================ */
  const storyChips = $$('[data-filter="stories"] .ac-chip');
  const stories = $$("#storyList .ac-story");
  const storyEmpty = $("#storyEmpty");
  storyChips.forEach(chip => chip.addEventListener("click", () => {
    storyChips.forEach(c => c.classList.toggle("active", c === chip));
    const st = chip.dataset.st;
    let hits = 0;
    stories.forEach(s => {
      const show = st === "all" || s.dataset.st === st;
      s.style.display = show ? "" : "none";
      if (show) hits++;
    });
    storyEmpty.hidden = hits !== 0;
  }));
  $$("[data-del-story]").forEach(btn => btn.addEventListener("click", () => {
    const card = btn.closest(".ac-story");
    card.classList.add("removing");
    setTimeout(() => card.remove(), 400);
    showToast("手记已删除");
  }));

  /* ============================================================
     模块 6：地址 — 新增 / 设默认 / 删除
  ============================================================ */
  const addrForm = $("#addrForm"), addrList = $("#addrList"), addrErr = $("#addrErr");
  $("#addrNewBtn").addEventListener("click", () => {
    addrForm.hidden = !addrForm.hidden;
    if (!addrForm.hidden) $("#addrName").focus();
  });
  $("#addrCancel").addEventListener("click", () => { addrForm.hidden = true; addrErr.textContent = ""; });
  addrForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#addrName").value.trim();
    const phone = $("#addrPhone").value.trim();
    const country = $("#addrCountry").value.trim();
    const zip = $("#addrZip").value.trim();
    const detail = $("#addrDetail").value.trim();
    if (!name){ addrErr.textContent = "请填写收件人姓名"; return; }
    if (!/^1[3-9]\d{9}$/.test(phone)){ addrErr.textContent = "手机号格式不对"; return; }
    if (!detail){ addrErr.textContent = "请填写详细地址"; return; }
    const card = document.createElement("article");
    card.className = "ac-addr";
    card.innerHTML = `
      <h3>${name} <span class="mono">${phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</span></h3>
      <p>${country || "中国"} · ${detail}</p>
      <p class="mono">邮编 ${zip || "—"}</p>
      <div class="ac-addr-ops">
        <button class="ac-btn-mini is-primary" data-set-default>设为默认</button>
        <button class="ac-btn-mini" data-toast="地址编辑表单即将开放">编辑</button>
        <button class="ac-btn-mini is-danger" data-del-addr>删除</button>
      </div>`;
    addrList.appendChild(card);
    addrForm.reset(); addrForm.hidden = true; addrErr.textContent = "";
    showToast("新地址已保存");
  });
  addrList.addEventListener("click", e => {
    const defBtn = e.target.closest("[data-set-default]");
    const delBtn = e.target.closest("[data-del-addr]");
    if (defBtn){
      const card = defBtn.closest(".ac-addr");
      $$(".ac-addr", addrList).forEach(a => {
        a.classList.remove("is-default");
        const tag = $(".ac-addr-default", a); if (tag) tag.remove();
        const ops = $(".ac-addr-ops", a);
        if (a !== card && !ops.querySelector("[data-set-default]")){
          const b = document.createElement("button");
          b.className = "ac-btn-mini is-primary"; b.dataset.setDefault = ""; b.textContent = "设为默认";
          ops.prepend(b);
        }
      });
      card.classList.add("is-default");
      const tag = document.createElement("span");
      tag.className = "ac-addr-default mono"; tag.textContent = "默认";
      card.prepend(tag);
      defBtn.remove();
      showToast("已设为默认地址");
    }
    if (delBtn){
      const card = delBtn.closest(".ac-addr");
      if (card.classList.contains("is-default")){ showToast("默认地址不可删除，请先切换默认地址"); return; }
      card.style.opacity = "0";
      setTimeout(() => card.remove(), 350);
      showToast("地址已删除");
    }
  });

  /* ============================================================
     模块 7：消息筛选 + 已读
  ============================================================ */
  const msgChips = $$('[data-filter="msgs"] .ac-chip');
  const msgs = $$("#msgList .ac-msg");
  const msgEmpty = $("#msgEmpty");
  const badgeMsgs = $("#badgeMsgs");

  function unreadCount(){ return $$("#msgList .ac-msg.unread").length; }
  function msgBadgeRefresh(){
    const n = unreadCount();
    badgeMsgs.textContent = n;
    badgeMsgs.style.display = n ? "" : "none";
  }
  msgChips.forEach(chip => chip.addEventListener("click", () => {
    msgChips.forEach(c => c.classList.toggle("active", c === chip));
    const cat = chip.dataset.msg;
    let hits = 0;
    msgs.forEach(m => {
      const show = cat === "all" || m.dataset.msg === cat;
      m.style.display = show ? "" : "none";
      if (show) hits++;
    });
    msgEmpty.hidden = hits !== 0;
  }));
  $$("[data-read]").forEach(btn => btn.addEventListener("click", () => {
    btn.closest(".ac-msg").classList.remove("unread");
    msgBadgeRefresh();
    showToast("已标记为已读");
  }));

  /* ============================================================
     模块 8：设置 — 偏好 chips / 隐私开关 / 改密
  ============================================================ */
  $$("#prefChips .ac-chip").forEach(c => c.addEventListener("click", () => {
    c.classList.toggle("active");
    const picks = $$("#prefChips .ac-chip.active").map(x => x.textContent.trim());
    showToast(picks.length ? `偏好已更新：${picks.join(" / ")}` : "已清空偏好，推荐将恢复默认");
  }));
  $("#privacyToggle").addEventListener("change", function(){
    showToast(this.checked ? "投稿手记将公开展示署名" : "投稿手记将匿名展示");
  });

  const RE_PWD = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  $("#pwdForm").addEventListener("submit", e => {
    e.preventDefault();
    const o = $("#pwdOld").value, n = $("#pwdNew").value, n2 = $("#pwdNew2").value;
    const err = $("#pwdErr");
    if (!o){ err.textContent = "请输入当前密码"; return; }
    if (!RE_PWD.test(n)){ err.textContent = "新密码至少 8 位，且同时包含字母与数字"; return; }
    if (n !== n2){ err.textContent = "两次输入的新密码不一致"; return; }
    err.textContent = "";
    e.target.reset();
    showToast("密码已更新 — 下次登录请使用新密码");
  });
  ["pwdOld","pwdNew","pwdNew2"].forEach(id =>
    $("#" + id).addEventListener("input", () => $("#pwdErr").textContent = ""));

  msgBadgeRefresh();
})();
