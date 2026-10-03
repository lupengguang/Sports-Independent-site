/* ============================================================
   OROGEN 会员门户 — login.js
   预加载 / 转场 / 光标 / 表单切换 / 校验 / 模拟登录
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ========== 图片兜底 ========== */
  const FB = {
    "assets/journal.jpg": ["Mountaineer standing on a rocky outcrop gazing at jagged snow peaks at golden dawn, seen from behind, dramatic alpine landscape, warm sunrise light against deep shadows, cinematic editorial photography", "portrait_4_3"]
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
  function goHome(dest){
    if (leaving) return; leaving = true;
    if (reduced){ location.href = dest; return; }
    $(".pt-word", pageTrans).textContent = "BACK HOME";
    $(".pt-word-cn", pageTrans).textContent = "返 回 首 页";
    document.body.style.overflow = "hidden";
    pageTrans.classList.add("on");
    setTimeout(() => location.href = dest, 1050);
  }
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="index.html"]');
    if (!link) return;
    e.preventDefault(); goHome(link.getAttribute("href"));
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

  /* ========== 左侧视差 ========== */
  const sideMedia = $(".lg-side-media");
  if (sideMedia && !reduced){
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = sideMedia.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const img = $("img", sideMedia);
        if (img) img.style.transform = `translate3d(0,${(r.top * -0.08).toFixed(1)}px,0)`;
      });
    }, { passive: true });
  }

  /* ============================================================
     表单逻辑
  ============================================================ */
  const tabsBox = $(".lg-tabs");
  const formLogin = $("#formLogin"), formRegister = $("#formRegister");

  function setMode(mode){
    const isLogin = mode === "login";
    tabsBox.classList.toggle("mode-register", !isLogin);
    $$(".lg-tab").forEach(t => {
      const active = t.dataset.mode === mode;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    formLogin.classList.toggle("active", isLogin);
    formRegister.classList.toggle("active", !isLogin);
    clearErrors(formLogin); clearErrors(formRegister);
  }
  $$(".lg-tab").forEach(t => t.addEventListener("click", () => setMode(t.dataset.mode)));
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.goto)));

  /* ---- 密码可见切换 ---- */
  $$("[data-eye]").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = $("#" + btn.dataset.eye);
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.classList.toggle("on", show);
      input.focus();
    });
  });

  /* ---- 校验工具 ---- */
  const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const RE_PHONE = /^1[3-9]\d{9}$/;
  const RE_PWD   = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  function setErr(field, msg){
    const box = field.closest(".lg-field");
    if (!box) return;
    box.classList.remove("error");
    void box.offsetWidth; /* 重启动画 */
    box.classList.add("error");
    const err = $(".lg-err", box);
    if (err) err.textContent = msg;
  }
  function clearErr(input){
    const box = input.closest(".lg-field");
    if (!box) return;
    box.classList.remove("error");
    const err = $(".lg-err", box);
    if (err) err.textContent = "";
  }
  function clearErrors(form){ $$(".lg-field", form).forEach(f => f.classList.remove("error")); $$(".lg-err", form).forEach(e => e.textContent = ""); }

  $$(".lg-input").forEach(i => i.addEventListener("input", () => clearErr(i)));
  $("#regAgree").addEventListener("change", function(){ clearErr(this); });

  /* ---- 密码强度 ---- */
  const strengthBox = $("#pwdStrength"), strengthTxt = $("#pwdStrengthTxt");
  $("#regPwd").addEventListener("input", function(){
    const v = this.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Za-z]/.test(v) && /\d/.test(v)) score++;
    if (v.length >= 12 || /[^A-Za-z0-9]/.test(v)) score++;
    strengthBox.className = "lg-strength" + (score ? " s" + score : "");
    strengthTxt.textContent = v === "" ? "STRENGTH — 强度"
      : score === 1 ? "WEAK — 偏弱，再加数字或符号"
      : score === 2 ? "GOOD — 不错，可以再长一点"
      : "STRONG — 很稳，出发";
  });

  /* ---- 模拟提交 ---- */
  function fakeSubmit(btn, done){
    btn.disabled = true;
    btn.classList.add("loading");
    setTimeout(() => {
      btn.classList.remove("loading");
      btn.classList.add("done");
      done();
      setTimeout(() => { btn.classList.remove("done"); btn.disabled = false; }, 2600);
    }, reduced ? 100 : 1200);
  }

  /* ---- 登录 ---- */
  formLogin.addEventListener("submit", e => {
    e.preventDefault();
    const account = $("#loginAccount"), pwd = $("#loginPwd");
    let ok = true;
    const av = account.value.trim();
    if (!av){ setErr(account, "请输入邮箱或手机号"); ok = false; }
    else if (!RE_EMAIL.test(av) && !RE_PHONE.test(av)){ setErr(account, "格式不对——邮箱或 11 位手机号"); ok = false; }
    if (!pwd.value){ setErr(pwd, "请输入密码"); ok = false; }
    else if (pwd.value.length < 8){ setErr(pwd, "密码至少 8 位"); ok = false; }
    if (!ok) return;

    fakeSubmit($("#loginSubmit"), () => {
      try {
        sessionStorage.setItem("orogen_user", JSON.stringify({
          name: av.includes("@") ? av.split("@")[0] : av.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
          account: av,
          remember: $("#loginRemember").checked,
          ts: Date.now()
        }));
      } catch(_){}
      showToast("欢迎回来 — 登录成功，正在进入个人中心");
      setTimeout(() => goHome("account.html"), reduced ? 300 : 1400);
    });
  });

  /* ---- 注册 ---- */
  formRegister.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#regName"), email = $("#regEmail"),
          pwd = $("#regPwd"), pwd2 = $("#regPwd2"), agree = $("#regAgree");
    let ok = true;
    if (!name.value.trim()){ setErr(name, "给自己起个山野代号吧"); ok = false; }
    else if (name.value.trim().length > 20){ setErr(name, "昵称不超过 20 个字符"); ok = false; }
    if (!email.value.trim()){ setErr(email, "请输入邮箱"); ok = false; }
    else if (!RE_EMAIL.test(email.value.trim())){ setErr(email, "邮箱格式不对，再检查一下"); ok = false; }
    if (!pwd.value){ setErr(pwd, "请设置密码"); ok = false; }
    else if (!RE_PWD.test(pwd.value)){ setErr(pwd, "至少 8 位，且同时包含字母与数字"); ok = false; }
    if (!pwd2.value){ setErr(pwd2, "请再输入一次密码"); ok = false; }
    else if (pwd2.value !== pwd.value){ setErr(pwd2, "两次输入的密码不一致"); ok = false; }
    if (!agree.checked){ setErr(agree, "请先勾选同意会员协议与隐私政策"); ok = false; }
    if (!ok) return;

    fakeSubmit($("#regSubmit"), () => {
      try {
        sessionStorage.setItem("orogen_user", JSON.stringify({
          name: name.value.trim(),
          account: email.value.trim(),
          isNew: true,
          ts: Date.now()
        }));
      } catch(_){}
      showToast("账户已创建 — 欢迎来到 OROGEN，正在进入个人中心");
      setTimeout(() => goHome("account.html"), reduced ? 300 : 1400);
    });
  });

  /* ---- 占位功能 ---- */
  $("#forgotBtn").addEventListener("click", () => showToast("找回密码即将开放 — 先发邮件至 crew@orogen.com"));
  $("#termsBtn").addEventListener("click", () => showToast("《会员服务协议》正式版即将随发售上线"));
  $("#privacyBtn").addEventListener("click", () => showToast("《隐私政策》正式版即将随发售上线"));
  $$("[data-oauth]").forEach(b => b.addEventListener("click", () =>
    showToast(`${b.dataset.oauth} 登录即将开放 — 先用邮箱注册吧`)));

  /* ---- 已登录则直接进入个人中心 ---- */
  try {
    const u = JSON.parse(sessionStorage.getItem("orogen_user") || "null");
    if (u && u.name) location.replace("account.html");
  } catch(_){}
})();
