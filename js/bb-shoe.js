/* ============================================================
   OROGEN 篮球 · 单品详情页 — bb-shoe.js
   参数化：bb-shoe.html?code=ORG-BG1
   9 款战靴（后卫 BG1-3 / 锋线 BW1-3 / 中锋 BC1-3）
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* 图标库（24x24 线性 SVG） */
  const ICONS = {
    ankle:'<path d="M7 21h10M9 21c0-4 1-7 4-9 2-1.4 3-4 2-8M9 21V11"/>',
    feather:'<path d="M20 4c-8 0-13 5-13 11v5h5c6 0 11-5 11-13"/><path d="M7 20 17 10M11 13h6"/>',
    rebound:'<path d="M12 20V8M6 12l6-6 6 6"/><path d="M5 21h14"/>',
    grip:'<path d="M4 14c3-6 13-6 16 0M7 14c2-3 8-3 10 0"/><circle cx="12" cy="17" r="2"/>',
    balance:'<path d="M12 3v18M5 8l7-5 7 5M4 21h16"/>',
    cushion:'<path d="M3 14h18M5 14v4h14v-4M7 14V8a5 5 0 0 1 10 0v6"/>',
    support:'<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
    wide:'<path d="M3 18h18M5 18l3-9h8l3 9M9 9V6h6v3"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    arch:'<path d="M4 20c0-8 4-14 8-14s8 6 8 14M4 20h16M8 20c0-5 1.8-8 4-8s4 3 4 8"/>',
    air:'<path d="M3 8h13a3 3 0 1 0-3-3M3 12h17a3 3 0 1 1-3 3M3 16h9"/>',
    rubber:'<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7v5l4 2"/>',
    carbon:'<path d="M13 3 4 14h7l-1 7 9-11h-7z"/>',
    twist:'<path d="M6 4c4 4 8 4 12 0M6 20c4-4 8-4 12 0M9 12h6"/>',
    wet:'<path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/><path d="M9 16a3 3 0 0 0 3 3"/>',
    weave:'<path d="M4 8c4 4 12 4 16 0M4 16c4-4 12-4 16 0M4 12h16"/>',
    value:'<circle cx="12" cy="12" r="8"/><path d="M9 9h5a2 2 0 0 1 0 4H10a2 2 0 0 0 0 4h5M12 7v10"/>'
  };

  const LINE = {
    guard:{ cn:"后卫线", en:"GUARD", page:"bb-guard.html" },
    wing: { cn:"锋线款", en:"WING",  page:"bb-wing.html" },
    center:{cn:"中锋款", en:"CENTER",page:"bb-center.html" }
  };

  /* 尺码序列 */
  const SIZES = { guard:[7,7.5,8,8.5,9,9.5,10,10.5,11,12,13], wing:[7,7.5,8,8.5,9,9.5,10,10.5,11,12,13,14], center:[8,8.5,9,9.5,10,10.5,11,12,13,14,15] };

  const SHOES = {
    "ORG-BG1": {
      line:"guard", badge:"爆款", price:189,
      name:"云驰后卫低帮篮球鞋",
      seo:"ORG-BG1 YunChi Low Cut Guard Basketball Shoes | Lightweight Crossover Sneaker",
      sub:"一步过人，持续跑动无负担，后卫核心战靴。",
      tags:["低帮","轻量化","前掌高回弹","抓地强化变向"],
      colors:[["暗夜黑","#16161a"],["雾灰","#8b8d92"],["熔岩橙","#e04b1f"]],
      img:"bb-guard-1",
      story:"专为控球后卫、得分后卫打造，低帮结构释放脚踝全部活动空间，大幅度交叉步、转身、连续变向没有束缚感。420g 轻量化鞋身，长时间全场推进、折返跑，减少足部负重。前掌分区高回弹泡棉，蹬地瞬间快速回弹，提升突破爆发力；人字纹防滑橡胶大底，室内木地板、室外塑胶场地都能稳定锁地，急停不打滑。鞋身采用工程网面 + 热熔加固条，透气排汗，高强度对抗不易撕裂；后跟超薄稳定 TPU 片，减重同时限制落地偏移，降低崴脚风险。",
      scene:"适合：半场野球、全场联赛、日常篮球训练；主打持续突破、大量跑动的后卫球员。",
      fit:"本款偏正常鞋楦，宽脚建议选大半码。",
      features:[
        ["ankle","低帮自由脚踝","释放脚踝活动角度，变向转身无束缚"],
        ["feather","420g 轻量化","减少跑动负重，全场持续作战"],
        ["rebound","前掌分区回弹","蹬地助推，提升突破爆发力"],
        ["grip","多场地防滑大底","室内外塑胶 / 木地板通用"]
      ],
      spec:[["型号","ORG-BG1"],["鞋帮高度","低帮"],["鞋面材质","工程网布 + 热熔加固条"],["中底","分区高回弹泡棉"],["外底","人字纹耐磨橡胶"],["重量","420g（US9 单只）"],["适用场地","室内木地板 / 室外塑胶球场"],["尺码范围","US7 ~ US13"]]
    },
    "ORG-BG2": {
      line:"guard", price:175,
      name:"疾风后卫低帮篮球鞋",
      seo:"ORG-BG2 Jifeng Low Guard Basketball Sneaker | Outdoor Wearable",
      sub:"极简超轻蝉翼鞋面，外场高频实战，高性价比后卫战靴。",
      tags:["低帮","超轻","外场耐磨","高性价比"],
      colors:[["炭黑","#1c1c1e"],["浅灰蓝","#9fb0bd"]],
      img:"bb-guard-2",
      story:"主打外场塑胶球场高频实战，蝉翼透气网面，大幅提升透气性，夏天打球足部不闷汗。鞋身轻量化设计，降低连续跑动消耗；前掌弹性单元，保障突破蹬地反馈。加厚耐磨橡胶外底，抵抗外场砂石磨损，延长使用寿命。鞋侧简易热熔补强，兼顾耐用与轻量化，适合学生球员、日常野球爱好者。",
      features:[
        ["air","蝉翼透气网面","透气排汗，夏天打球不闷汗"],
        ["feather","超轻鞋身","降低连续折返跑动消耗"],
        ["rebound","前掌弹性 EVA","突破蹬地反馈有保障"],
        ["rubber","加厚耐磨外底","抵抗外场砂石磨损，更耐穿"]
      ],
      spec:[["型号","ORG-BG2"],["鞋帮","低帮"],["鞋面","蝉翼透气网布"],["中底","弹性 EVA 泡棉"],["外底","加厚耐磨橡胶"],["适用场地","室外塑胶、水泥地"],["尺码","US7 - US13"]]
    },
    "ORG-BG3": {
      line:"guard", price:205,
      name:"暗涌后卫低帮篮球鞋",
      seo:"ORG-BG3 Anyong Low Guard Basketball Shoes | Carbon Plate Professional",
      sub:"碳板弹射助推，湿地防滑，专业联赛级后卫战靴。",
      tags:["低帮","碳板助推","湿地防滑","专业竞技"],
      colors:[["黑银","#2a2b2f"],["墨绿","#1f3a32"]],
      img:"bb-guard-3",
      story:"专业竞技款，内置前掌全掌弹射碳片，变向、起跳瞬间提供强力助推，提升突破速度。全片抗扭支撑，防止足部在大幅度变向时发生扭转受伤。外底纹路做湿地优化，出汗潮湿木地板依旧保持抓地力。高密度工程编织鞋面，强韧抗拉扯，应对高强度联赛对抗。适合高水平后卫、专业训练、室内联赛。",
      features:[
        ["carbon","全掌弹射碳板","变向起跳强力助推，突破更快"],
        ["twist","全片抗扭支撑","大幅度变向防止足部扭转受伤"],
        ["wet","湿地优化纹路","出汗潮湿木地板依旧抓地"],
        ["weave","高密编织鞋面","强韧抗拉扯，应对联赛对抗"]
      ],
      spec:[["型号","ORG-BG3"],["鞋帮","低帮"],["鞋面","高密度工程编织"],["中底","高回弹泡棉 + 前掌碳板"],["外底","湿地防滑橡胶"],["适用场地","室内木地板为主"],["尺码","US7 - US13"]]
    },
    "ORG-BW1": {
      line:"wing", badge:"主推", price:219,
      name:"凌跃锋线中帮篮球鞋",
      seo:"ORG-BW1 LingYue Mid Wing Basketball Shoes | All-around Forward Sneaker",
      sub:"突破起跳双向稳定，兼顾持球与篮下对抗。",
      tags:["中帮","均衡","侧向支撑","弹跳缓震"],
      colors:[["深灰","#3d3d3f"],["藏蓝","#22304d"],["赤褐","#7c4a33"]],
      img:"bb-wing-1",
      story:"全能锋线战靴，适配小前锋、锋卫摇摆人，兼顾突破、无球空切、急停跳投。中帮鞋型平衡脚踝灵活度与侧向防护；分段式缓震中底，起跳落地吸收冲击，减轻膝盖压力。鞋身两侧硬质侧向支撑条，身体对抗卡位时，限制足部外翻；加宽外底底盘，横移对抗不侧翻。复合编织鞋面兼顾包裹与透气，长时间高强度比赛保持舒适。室内外双场地通用。",
      features:[
        ["balance","中帮平衡防护","兼顾灵活度与脚踝侧向保护"],
        ["cushion","分段弹跳缓震","落地卸力，降低膝盖冲击"],
        ["support","侧向硬质支撑条","对抗卡位防外翻"],
        ["wide","加宽稳定底盘","大幅度横移不侧翻"]
      ],
      spec:[["型号","ORG-BW1"],["鞋帮","中帮"],["鞋面","复合编织鞋面 + 侧向 TPU 支撑"],["中底","分段缓震泡棉"],["外底","加宽防滑橡胶"],["适用场地","室内木地板 / 室外塑胶"],["尺码","US7 ~ US14"]]
    },
    "ORG-BW2": {
      line:"wing", price:202,
      name:"掠影锋线中帮篮球鞋",
      seo:"ORG-BW2 LueYing Mid Forward Basketball Shoes | Lightweight Outdoor",
      sub:"轻量化中帮，弹跳保护，外场耐磨锋线球鞋。",
      tags:["中帮","轻量均衡","外场耐磨","弹跳保护"],
      colors:[["藏蓝","#22304d"],["炭黑","#1c1c1e"]],
      img:"bb-wing-2",
      story:"轻量化全能锋线款，减轻鞋身重量，适合频繁空切、连续起跳。全掌缓震泡棉，落地缓冲，保护弹跳膝盖。加厚耐磨橡胶外底，耐受室外塑胶场地磨损。鞋身侧向支撑结构，满足日常对抗，适合野球、学生联赛锋线球员。",
      features:[
        ["feather","轻量中帮鞋身","频繁空切、连续起跳不拖累"],
        ["cushion","全掌缓震泡棉","落地缓冲，保护弹跳膝盖"],
        ["support","侧向支撑结构","日常对抗稳定足部"],
        ["rubber","加厚耐磨外底","耐受室外塑胶场地磨损"]
      ],
      spec:[["型号","ORG-BW2"],["鞋帮","中帮"],["鞋面","轻量化编织网布"],["中底","全掌缓震泡棉"],["外底","耐磨橡胶"],["适用场地","室外塑胶优先"],["尺码","US7 - US14"]]
    },
    "ORG-BW3": {
      line:"wing", price:235,
      name:"岩盾锋线中帮篮球鞋",
      seo:"ORG-BW3 YanDun Mid Forward Basketball Shoes | Heavy Contact Support",
      sub:"加厚侧向支撑墙，重型锋线篮下强对抗战靴。",
      tags:["中帮","强侧向支撑","重型锋线","篮下冲撞防护"],
      colors:[["深灰","#3d3d3f"],["玄黑","#151517"]],
      img:"bb-wing-3",
      story:"为频繁冲击篮下、身体对抗激烈的重型锋线打造。加厚侧向支撑墙，大幅度提升抗形变能力；升级抗扭支撑板，篮下卡位、对抗时稳定足部。高密度耐磨橡胶外底，承受高强度摩擦。加厚鞋身面料，抗刮擦，适合大量篮下身体冲撞打法。",
      features:[
        ["support","加厚侧向支撑墙","大幅提升鞋身抗形变能力"],
        ["twist","升级抗扭支撑板","篮下卡位对抗稳定足部"],
        ["grip","高密度耐磨外底","承受高强度摩擦"],
        ["weave","加厚抗撕裂鞋面","抗刮擦，耐篮下冲撞"]
      ],
      spec:[["型号","ORG-BW3"],["鞋帮","中帮"],["鞋面","加厚抗撕裂编织"],["中底","高抗扭缓震泡棉"],["外底","高密度耐磨橡胶"],["适用场地","室内、室外塑胶"],["尺码","US7 - US14"]]
    },
    "ORG-BC1": {
      line:"center", badge:"新增", price:249,
      name:"镇岳中锋高帮篮球鞋",
      seo:"ORG-BC1 ZhenYue High Top Center Basketball Shoes | High Stability Big Man Sneaker",
      sub:"落地稳定，承受篮下高强度冲撞。",
      tags:["高帮","强支撑","加厚后跟","足弓加固"],
      colors:[["玄黑","#151517"],["砂岩棕","#8a6a4f"]],
      img:"bb-center-1",
      story:"内线专属高帮战靴，面向中锋、大前锋。环绕式高帮结构完整包裹脚踝，篮板争抢、篮下对抗落地，大幅降低崴脚风险。后跟加厚高密度缓震模块，承接连续起跳巨大冲击力，保护足跟与膝盖。内置硬质足弓支撑板，负重卡位时支撑足弓，避免长时间内线作战疲劳。加宽底盘外底，增大落地支撑面积，激烈对抗保持稳定；后跟防撞加固，减少篮下碰撞磨损。优先适配室内赛场。",
      features:[
        ["shield","环绕高帮护踝","篮下对抗落地防崴脚"],
        ["cushion","后跟加厚缓震","连续起跳缓冲，保护膝盖足跟"],
        ["arch","硬质足弓支撑板","卡位负重，缓解足弓疲劳"],
        ["wide","加宽稳定底盘","落地重心稳定，抗冲撞"]
      ],
      spec:[["型号","ORG-BC1"],["鞋帮","高帮"],["鞋面","加厚编织鞋面 + 环绕 TPU 护踝"],["中底","高密度缓震泡棉 + 足弓支撑片"],["外底","加宽防滑橡胶"],["适用场地","室内木地板"],["尺码","US8 ~ US15"]]
    },
    "ORG-BC2": {
      line:"center", price:264,
      name:"巨岩中锋高帮篮球鞋",
      seo:"ORG-BC2 JuYan High Top Center Basketball Shoes | Double TPU Ankle Support",
      sub:"双层 TPU 护踝，抗撕裂鞋面，重型内线顶级防护。",
      tags:["高帮","双层护踝","抗撕裂鞋面","重型内线"],
      colors:[["玄黑","#151517"],["深灰","#3d3d3f"]],
      img:"bb-center-2",
      story:"重型内线顶配款，双层环绕 TPU 护踝，进一步提升脚踝锁定。鞋面采用抗撕裂面料，抵抗篮下摩擦、撞击。全掌加厚缓震系统，多次连续起跳有效卸力；外底纹路针对篮下原地起跳、卡位急停优化，抓地稳固。适合体重偏大、频繁篮下对抗的内线球员。",
      features:[
        ["shield","双层 TPU 护踝","环绕锁定脚踝再升级"],
        ["weave","抗撕裂加厚织物","抵抗篮下摩擦与撞击"],
        ["cushion","全掌加厚缓震","多次连续起跳有效卸力"],
        ["grip","篮下专用纹路","原地起跳、卡位急停抓地稳"]
      ],
      spec:[["型号","ORG-BC2"],["鞋帮","高帮｜双层 TPU 护踝"],["鞋面","抗撕裂加厚织物"],["中底","全掌加厚高密度缓震"],["外底","篮下专用防滑橡胶"],["适用场地","室内木地板"],["尺码","US8 - US15"]]
    },
    "ORG-BC3": {
      line:"center", price:232,
      name:"壁垒中锋高帮篮球鞋",
      seo:"ORG-BC3 BiLei High Top Center Basketball Shoes | Outdoor Big Man Sneaker",
      sub:"高帮基础防护，足弓加固，外场水泥塑胶内线战靴。",
      tags:["高帮","足弓支撑","外场耐磨","高性价比内线战靴"],
      colors:[["玄黑","#151517"],["铁灰","#57585c"]],
      img:"bb-center-3",
      story:"高性价比内线款，高帮基础护踝结构，内置足弓支撑片，缓解长时间卡位疲劳。耐磨橡胶外底，可适配室外塑胶、水泥场地，满足学生内线、外场野球中锋使用。鞋身基础加固，兼顾防护与性价比。",
      features:[
        ["ankle","高帮基础护踝","外场内线基础防护"],
        ["arch","内置足弓支撑片","缓解长时间卡位疲劳"],
        ["rubber","耐磨橡胶外底","适配水泥 / 塑胶场地"],
        ["value","加固编织鞋身","防护到位，性价比之选"]
      ],
      spec:[["型号","ORG-BC3"],["鞋帮","高帮"],["鞋面","加固编织网布"],["中底","高密度缓震泡棉 + 足弓支撑片"],["外底","耐磨橡胶，适配水泥 / 塑胶"],["适用场地","室外塑胶、水泥地"],["尺码","US8 - US15"]]
    }
  };

  /* ============ 解析 code ============ */
  const code = new URLSearchParams(location.search).get("code");
  const shoe = SHOES[code];
  const root = $("#bbsRoot");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!shoe) {
    document.body.classList.add("loaded");
    $("#bbs404").style.display = "block";
    $("#year").textContent = new Date().getFullYear();
    return;
  }

  const line = LINE[shoe.line];
  const sizes = SIZES[shoe.line];
  document.title = shoe.seo;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${shoe.name} ${shoe.sub} $${shoe.price} — ${shoe.spec.map(r=>r.join(" ")).join("，")}`);
  $("#posTag").textContent = `${line.en} — ${line.cn}单品`;

  const sibs = Object.entries(SHOES).filter(([k,v]) => v.line === shoe.line);

  root.innerHTML = `
  <div class="container">
    <nav class="bbs-crumb mono">
      <a href="index.html#top">首页</a><i>/</i>
      <a href="basketball.html#bbTabs">篮球装备</a><i>/</i>
      <a href="${line.page}">${line.cn} ${line.en}</a><i>/</i>
      <span class="cur">${code}</span>
    </nav>

    <!-- 购买主区 -->
    <section class="bbs-buy">
      <figure class="bbs-media img-reveal">
        <img src="assets/${shoe.img}.jpg" alt="${code} ${shoe.name}" data-main-img>
        <span class="bbs-media-code mono">${code}</span>
        ${shoe.badge ? `<span class="bbs-media-badge mono">${shoe.badge}</span>` : ""}
        <span class="bbs-media-note mono">PRODUCT PHOTOGRAPHY — 以板为战，每一步都算数</span>
      </figure>

      <div class="bbs-info">
        <span class="bbs-pos mono">${line.en} LINE — ${line.cn}</span>
        <h1 class="bbs-name">${shoe.name}</h1>
        <p class="bbs-sub">${shoe.sub}</p>
        <div class="bbs-tags mono">${shoe.tags.map(t=>`<span>${t}</span>`).join("")}</div>

        <div class="bbs-price-row">
          <span class="bbs-price">$${shoe.price}<small>/ 件</small></span>
        </div>
        <span class="bbs-price-note mono">SHIPPING &amp; TAXES CALCULATED AT CHECKOUT</span>

        <div class="bbs-opt">
          <div class="bbs-opt-label mono"><b>颜色 COLOR</b><span data-color-name>${shoe.colors[0][0]}</span></div>
          <div class="bbs-colors" id="colorRow">
            ${shoe.colors.map(([n,h],i)=>`<button type="button" class="bbs-color${i===0?" active":""}" data-color="${n}" aria-label="颜色 ${n}"><i style="background:${h}"></i>${n}</button>`).join("")}
          </div>
        </div>

        <div class="bbs-opt">
          <div class="bbs-opt-label mono"><b>尺码 SIZE — US</b><span data-size-name>请选择尺码</span></div>
          <div class="bbs-sizes" id="sizeRow">
            ${sizes.map(s=>`<button type="button" class="bbs-size" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>

        <div class="bbs-actions">
          <button type="button" class="bbs-btn bbs-btn-cart" id="addCart">ADD TO CART <span>＋</span></button>
          <button type="button" class="bbs-btn bbs-btn-buy" id="buyNow">BUY NOW <span>→</span></button>
        </div>
        ${shoe.fit ? `<p class="bbs-fit">尺码提示：${shoe.fit}</p>` : ""}

        <div class="bbs-meta-mini mono">
          <div>适用场地 SCENE<b>${specVal("适用场地") || specVal("适用") || "见参数表"}</b></div>
          <div>鞋帮高度 UPPER<b>${specVal("鞋帮高度") || specVal("鞋帮")}</b></div>
        </div>
      </div>
    </section>
  </div>

  <!-- 核心特性 -->
  <section class="bbs-feat-sec">
    <div class="container">
      <p class="label mono accent" data-reveal>CORE FEATURES — 核心特性</p>
      <h2 class="h2" data-reveal style="margin-top:12px"><span>${shoe.name}，四大硬实力</span></h2>
      <div class="bbs-feat-grid">
        ${shoe.features.map(([ic,t,d],i)=>`
          <article class="bbs-feat" data-reveal style="transition-delay:${i*70}ms">
            <svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[ic]}</svg>
            <h4>${t}</h4>
            <p>${d}</p>
          </article>`).join("")}
      </div>
    </div>
  </section>

  <!-- 详情长文 + 参数表 -->
  <section class="container bbs-detail">
    <div class="bbs-story" data-reveal>
      <p class="bbs-story-label mono">FULL STORY — 产品详情</p>
      <h3>为你的打法而生</h3>
      <p>${shoe.story}</p>
      ${shoe.scene ? `<p class="scene">${shoe.scene}</p>` : ""}
    </div>

    <div class="bbs-spec-wrap" data-reveal>
      <p class="bbs-story-label mono">SPECIFICATIONS — 参数表</p>
      <h3>技术参数</h3>
      <table class="bbs-spec">
        <tbody>
          ${shoe.spec.map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>

  <!-- 同线选购 -->
  <section class="bbs-siblings container">
    <p class="label mono accent" data-reveal>PICK YOUR ${line.en} — ${line.cn}三款战靴</p>
    <div class="bbs-sib-grid">
      ${sibs.map(([k,v])=>`
        <a class="bbs-sib${k===code?" is-self":""}" href="bb-shoe.html?code=${k}" data-reveal>
          <div class="bbs-sib-media"><img src="assets/${v.img}.jpg" alt="${k} ${v.name}" loading="lazy"></div>
          <div class="bbs-sib-body">
            <span class="bbs-sib-code mono">${k}${k===code?" · 当前页":""}</span>
            <h4 class="bbs-sib-name">${v.name}</h4>
            <span class="bbs-sib-price">$${v.price}<small>/ 件</small></span>
          </div>
        </a>`).join("")}
    </div>
  </section>`;

  function specVal(keyPrefix){
    const row = shoe.spec.find(r => r[0] === keyPrefix);
    return row ? row[1] : "";
  }

  /* ============ 选项交互 ============ */
  let color = shoe.colors[0][0], size = null;
  const colorName = $("[data-color-name]"), sizeName = $("[data-size-name]");

  $("#colorRow").addEventListener("click", e => {
    const btn = e.target.closest(".bbs-color"); if (!btn) return;
    document.querySelectorAll("#colorRow .bbs-color").forEach(b => b.classList.toggle("active", b === btn));
    color = btn.dataset.color; colorName.textContent = color;
  });
  $("#sizeRow").addEventListener("click", e => {
    const btn = e.target.closest(".bbs-size"); if (!btn) return;
    document.querySelectorAll("#sizeRow .bbs-size").forEach(b => b.classList.toggle("active", b === btn));
    size = btn.dataset.size; sizeName.textContent = "US " + size;
  });

  /* ============ 加购 ============ */
  const toast = $("#bbsToast"); let timer;
  function showToast(msg){ toast.textContent = msg; toast.classList.add("show"); clearTimeout(timer); timer = setTimeout(()=>toast.classList.remove("show"), 2400); }
  function buildItem(){
    if (!size){ showToast("请先选择尺码 SELECT A SIZE"); return null; }
    return { code, name: shoe.name, price: shoe.price, color, size:"US "+size, t:Date.now() };
  }
  function saveBag(it){
    try{ const bag = JSON.parse(sessionStorage.getItem("orogen_bag") || "[]"); bag.push(it); sessionStorage.setItem("orogen_bag", JSON.stringify(bag)); }catch(_){}
  }

  $("#addCart").addEventListener("click", e => {
    const it = buildItem(); if (!it) return;
    saveBag(it);
    const btn = e.currentTarget; btn.classList.add("added");
    btn.innerHTML = "ADDED ✓ 已加入装备袋";
    setTimeout(()=>{ btn.classList.remove("added"); btn.innerHTML = "ADD TO CART <span>＋</span>"; }, 1800);
    showToast(`${code} · ${color} / US${size} 已加入装备袋`);
  });
  $("#buyNow").addEventListener("click", () => {
    const it = buildItem(); if (!it) return;
    saveBag(it);
    showToast("结算系统即将开放，已为你锁定该款，请前往装备袋查看");
  });

  /* ============ Reveal ============ */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold:.12, rootMargin:"0px 0px -6% 0px" });
  requestAnimationFrame(()=>{
    document.body.classList.add("loaded");
    document.querySelectorAll("[data-reveal], .img-reveal").forEach(el => io.observe(el));
  });
  $("#year").textContent = new Date().getFullYear();
})();
