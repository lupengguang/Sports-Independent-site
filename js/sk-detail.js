/* ============================================================
   OROGEN 滑板单品详情页 — sk-detail.js
   ORG-SB1 / SB2 / SB3 / SC1 — 数据驱动渲染
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const code = document.body.dataset.code;

  /* ============================================================
     商品数据
  ============================================================ */
  const DATA = {
    "ORG-SB1": {
      url: "sk-sb1.html",
      img: "sk-deck-rookie",
      badge: "爆款",
      tag: "CORE 01 — STREET COMPLETE · 新手入门",
      title: "街式双翘・新手入门整板",
      en: "STREET SKATE COMPLETE BOARD BEGINNER — 7-LAYER MAPLE TRICK SKATEBOARD FOR CITY STREET",
      slogan: "在城市街巷，迈出你的 Ollie 第一步。",
      desc: "专为新手玩家调校的街式双翘整板，出厂预组装完成，收到无需调试直接滑行。七层硬枫木压制板面，弹性柔和不爆弹，降低新手踩板翻车风险；支架、轮子、轴承全套预装配，兼顾滑行稳定性与基础动作练习，适配城市人行道、滑板场基础道具。适合刚接触滑板，练习基础滑行、转弯、刹车、基础豚跳的入门玩家。",
      feats: ["开箱即滑", "七层枫木", "柔和容错", "全套预装"],
      price: 89,
      colors: ["极简黑", "旷野灰", "浅砂白"],
      sizes: ["8.0\""],
      spec: [
        ["产品型号", "ORG-SB1"],
        ["板型", "街式双翘整板"],
        ["板面材质", "七层加拿大枫木热压"],
        ["板面尺寸", "8.0 英寸"],
        ["支架", "哑光合金轻量化支架"],
        ["轮子", "52mm 99A 高弹 PU 轮"],
        ["轴承", "ABEC-7 防尘轴承"],
        ["适用体重", "≤ 85kg"],
        ["包含配件", "整板全套（板面 + 支架 + 轮子 + 轴承 + 砂纸）"]
      ],
      material: "七层枫木冷压一体成型，板面微凹脚窝，新手更容易锁脚；高密防滑黑色砂纸，耐磨不掉砂；哑光合金支架经过预调松紧，转向柔和不晃；PU 轮硬度适配城市水泥路面，减震防滑，降低颠簸带来的恐惧感。",
      scene: ["城市柏油马路", "社区广场", "滑板场平地", "基础 Ollie 豚跳"],
      people: "滑板新手、青少年入门玩家、城市休闲街头爱好者。",
      tips: [
        "身高 155–175cm 优先选 8.0 英寸，板面与肩宽匹配更好控制。",
        "新手不建议自行松动支架，出厂调校为最优新手状态，直接滑即可。",
        "日常避免雨水浸泡板面，木层受潮会分层；雨后请擦干轴承与支架。"
      ],
      faq: [
        ["收到可以直接滑吗？", "可以，整板出厂预组装，开箱检查支架螺丝无松动即可直接滑行。"],
        ["可以做尖翻、台阶跳跃吗？", "适合平地基础动作，不建议高频高强度台阶大跳，进阶动作推荐 ORG-SB2 进阶动作整板。"]
      ],
      fb: "Studio product photo of a complete beginner street skateboard, 8 inch black seven layer maple deck with matte alloy trucks and 52mm white PU wheels, standing upright on concrete urban ground, moody editorial product photography, dark charcoal tones, dramatic side light"
    },
    "ORG-SB2": {
      url: "sk-sb2.html",
      img: "sk-deck-pro",
      badge: null,
      tag: "CORE 02 — PRO STREET COMPLETE · 进阶动作",
      title: "街式双翘・进阶动作整板",
      en: "PRO STREET COMPLETE SKATEBOARD 7-LAYER MAPLE — ADVANCED TRICK SKATEBOARD FOR OLLIE KICKFLIP",
      slogan: "征服台阶与杆，释放街头动作创造力。",
      desc: "面向进阶滑手的专业街式整板，高回弹七层枫木板面，脚窝更深，踩板反馈锐利。中空轻量化合金支架减轻整体重量，做豚跳、尖翻、跟翻更省力；高硬度高弹 PU 轮，抓板稳定，适配滑板场道具、城市台阶、扶手道具。适合已经掌握基础滑行，练习连续动作、台阶跳跃、道具动作的进阶玩家。",
      feats: ["高回弹板面", "中空轻量支架", "101A 动作轮", "深凹锁脚"],
      price: 129,
      colors: ["旷野黑涂鸦", "几何灰", "暗岩绿"],
      sizes: ["8.25\""],
      spec: [
        ["产品型号", "ORG-SB2"],
        ["板型", "街式双翘整板"],
        ["板面材质", "七层高密度进口枫木，热压加固"],
        ["板面尺寸", "8.25 英寸"],
        ["支架", "中空轻量化合金支架"],
        ["轮子", "53mm 101A 专业动作轮"],
        ["轴承", "ABEC-9 高速防尘轴承"],
        ["适用体重", "≤ 90kg"],
        ["包含配件", "全套整板 + 备用螺丝套装"]
      ],
      material: "高密度七层枫木高温压制，板面抗冲击性能强化，多次台阶落地不易断板；深凹脚窝设计，做动作时锁脚更强；中空支架减重同时保留抗冲击强度；高速轴承，滑行阻力更小，动作衔接流畅。",
      scene: ["专业滑板场", "城市台阶", "路沿 / 杆子道具", "尖翻跟翻连招"],
      people: "已掌握基础动作、持续练习街式动作的进阶滑手。",
      tips: [
        "8.25 英寸板面适合脚码 42 以上滑手，脚大更稳，脚小略重。",
        "板面落地撞击属于消耗，高强度动作建议每周检查支架螺丝与轮座。",
        "禁止泡水，潮湿环境会降低板面寿命；轴承进水后及时上油保养。"
      ],
      faq: [
        ["这个板可以下台阶吗？", "支持常规 2–4 阶台阶动作，属于专业街式动作板；更高阶数请评估自身水平并佩戴全套护具。"],
        ["板面断裂保修吗？", "正常使用自然损耗不在保修范围，出厂质量问题（开胶、断层等）支持售后换新。"]
      ],
      fb: "Studio product photo of a pro street complete skateboard, 8.25 inch dark grey seven layer maple deck with deep concave graphic print, hollow light alloy trucks and 53mm hard black trick wheels, propped against a concrete ledge in a skatepark, moody editorial product photography, dramatic light"
    },
    "ORG-SB3": {
      url: "sk-sb3.html",
      img: "sk-deck-sig",
      badge: "新增",
      tag: "CORE 03 — SIGNATURE DECK ONLY · DIY",
      title: "Pro 签名款板面（单板面）",
      en: "PRO SIGNATURE SKATE DECK 7-LAYER MAPLE — DIY CUSTOM STREET SKATEBOARD DECK ONLY",
      slogan: "自定义你的街头装备，打造专属滑板。",
      desc: "职业滑手签名款单板面，不含支架轮子，适合 DIY 组装玩家。原创旷野街头涂鸦板面印刷，七层加厚枫木压制，强韧性、抗冲击。脚窝为 Pro 深度脚窝，动作反馈灵敏，支持玩家自由搭配自己的支架、轮子、轴承，自由定制属于自己的滑板配置。适合老滑手、喜欢 DIY 改装、想要替换旧板面的玩家。",
      feats: ["仅板面 DIY", "原创签名涂鸦", "七层加枫", "砂纸预贴"],
      price: 65,
      colors: ["旷野探险涂鸦", "极简几何线条"],
      sizes: ["8.0\"", "8.25\""],
      spec: [
        ["产品型号", "ORG-SB3"],
        ["板型", "街式双翘 单板面（不含支架轮子）"],
        ["板面材质", "七层加厚加拿大枫木"],
        ["板面尺寸", "8.0 / 8.25 英寸可选"],
        ["表面工艺", "高清 UV 涂鸦印刷，防滑砂纸（预贴）"],
        ["适用体重", "≤ 95kg"],
        ["包含配件", "仅板面 + 砂纸，不含支架、轮子、轴承"]
      ],
      material: "七层枫木高温一体压合，多层木胶加固，抗冲击抗开裂；板面高清 UV 印刷，耐磨不掉色；出厂预贴进口防滑砂纸，砂粒均匀持久，抓脚稳定。",
      scene: ["DIY 自由组装", "旧板板面替换", "街式动作练习", "滑板道具动作"],
      people: "进阶 / 资深滑手、喜欢自定义组装滑板的玩家。",
      tips: [
        "仅售板面，购买后需要自行搭配支架、轮子、轴承才能滑行。",
        "组装需要滑板专用 T 型工具，可在硬件配件区一并选购。",
        "板面图案为原创签名涂鸦，限量发售，售完不补。"
      ],
      faq: [
        ["买这个板面直接就能滑吗？", "不能，只有板面，需要额外购买支架、轮子、轴承组装后才能滑行。"],
        ["砂纸是贴好的吗？", "是的，出厂预贴进口防滑砂纸，到手直接组装即可。"]
      ],
      fb: "Studio product photo of a signature skateboard deck only, seven layer maple with original wilderness graffiti UV print in burnt orange and charcoal, black grip tape pre applied, leaning against a concrete wall, no wheels, moody editorial product photography, dramatic side light"
    },
    "ORG-SC1": {
      url: "sk-sc1.html",
      img: "sk-surfskate-city",
      badge: "爆款",
      tag: "CORE 04 — SURFSKATE COMPLETE · 城市通勤",
      title: "陆地冲浪板・城市通勤款",
      en: "SURFSKATE COMPLETE BOARD FOR CITY COMMUTE — SPRING BRACKET SURF SKATEBOARD",
      slogan: "不用蹬地，在城市路面感受海浪滑行。",
      desc: "城市通勤专用陆地冲浪整板，搭载弹簧转向支架，依靠身体重心摆动就能持续滑行，无需反复蹬地。板面更长更稳，减震性能优秀，城市刷街、通勤代步、泵道练习都适配。转向灵敏，小角度就能改变行进方向，适合城市马路、公园绿道，想要通勤代步、体验冲浪感滑行的玩家，新手也可以快速上手。",
      feats: ["弹簧转向", "免蹬泵滑", "65mm 减震软轮", "附赠板包"],
      price: 159,
      colors: ["旷野沙黄", "深岩灰", "湖青"],
      sizes: ["32 英寸"],
      spec: [
        ["产品型号", "ORG-SC1"],
        ["板型", "陆地冲浪板 整板"],
        ["板面材质", "七层枫木 + 玻纤加固"],
        ["板面尺寸", "32 英寸"],
        ["支架", "弹簧动力转向支架"],
        ["轮子", "65mm 78A 大直径减震 PU 轮"],
        ["轴承", "ABEC-8 静音轴承"],
        ["适用体重", "≤ 90kg"],
        ["包含配件", "全套整板 + 专用板包"]
      ],
      material: "七层枫木 + 表层玻纤复合压制，板面韧性强，抗磕碰；专利弹簧转向支架，回弹顺滑，重心摆动即可持续泵滑；大尺寸软 PU 轮，减震极强，城市路面小石子、裂缝颠簸感大幅降低。",
      scene: ["城市通勤刷街", "公园绿道", "泵道练习", "模拟冲浪训练"],
      people: "城市通勤玩家、冲浪爱好者、喜欢休闲长距离滑行的玩家。",
      tips: [
        "陆地冲浪板依靠身体重心泵动前进，和双翘滑板玩法不同，先在空旷平地适应重心摆动。",
        "弹簧支架定期检查清理，避免泥沙进入支架内部影响回弹。",
        "软轮适合刷街，不适合做街式跳跃动作。"
      ],
      faq: [
        ["陆地冲浪板可以做 Ollie 跳吗？", "主打泵道刷街，板面偏长，不适合做双翘类跳跃动作。"],
        ["通勤能带上地铁吗？", "以当地公共交通规定为准；购买附赠便携板包，方便收纳携带。"]
      ],
      fb: "Studio product photo of a 32 inch surfskate complete board, seven layer maple deck with fiberglass reinforcement in sand yellow color, spring loaded surf skate truck, large 65mm soft teal PU wheels, standing on a smooth city park road, moody editorial product photography, warm dusk light"
    },
    "ORG-SC2": {
      url: "sk-sc2.html",
      img: "sk-surfskate-pump",
      badge: "爆款",
      tag: "CORE 05 — SURFSKATE PUMP / BOWL · 泵道碗池进阶",
      title: "陆地冲浪板・泵道碗池进阶款",
      en: "ADVANCED SURFSKATE COMPLETE BOARD FOR PUMP TRACK & BOWL — DEEP CONCAVE SURF SKATE",
      slogan: "在碗池内切割曲线，复刻海浪高速转向。",
      desc: "面向进阶滑手的专业泵道碗池陆地冲浪整板。深凹脚窝锁定双脚，高回弹加强型弹簧支架，泵动反馈爆发力更强，Carving 大角度切弯、碗池连续回转流畅。板面采用枫木玻纤复合层，抗冲击抗扭曲，高强度泵道、碗池、弯道训练专用。适合已经掌握基础陆冲，想要练习高速切弯、碗池绕圈、泵道连续动作的进阶玩家。",
      feats: ["深凹锁脚", "高回弹支架", "玻纤加固", "泵道碗池"],
      price: 189,
      colors: ["旷野岩黑", "荒漠沙棕", "深海墨绿"],
      sizes: ["34 英寸"],
      spec: [
        ["产品型号", "ORG-SC2"],
        ["板型", "泵道碗池进阶陆地冲浪整板"],
        ["板面材质", "七层枫木 + 双层玻纤复合压制"],
        ["板面尺寸", "34 英寸"],
        ["支架", "高回弹加强弹簧转向支架"],
        ["轮子", "62mm 82A 高抓地力 PU 轮"],
        ["轴承", "ABEC-9 高速防尘轴承"],
        ["适用体重", "≤ 95kg"],
        ["包含配件", "全套整板 + 支架保养油 + 便携板包"]
      ],
      material: "枫木玻纤复合一体压合，板面刚性强，高速过弯不易形变；加深脚窝设计，高速动作时牢牢锁脚；升级加粗弹簧支架，回弹力度更强，连续泵动省力；轮面加宽设计，碗池壁上滑行抓地稳定，降低打滑风险。",
      scene: ["泵道", "碗池", "波浪道", "大角度弯道 Carving 训练"],
      people: "进阶陆冲玩家，专注泵道碗池训练，追求高速曲线滑行。",
      tips: [
        "此款支架回弹力度偏大，新手不推荐，先从 SC1 通勤款适应陆冲重心。",
        "每次碗池高强度使用后，建议清理支架泥沙，定期上保养油（随附）。",
        "不适合台阶跳跃类动作。"
      ],
      faq: [
        ["和通勤款陆冲 ORG-SC1 差别在哪？", "SC2 支架弹力更强、脚窝更深，板面刚性更高，主打泵道碗池高速切弯；SC1 更软，偏向城市休闲刷街。"],
        ["可以在普通柏油马路刷街吗？", "可以，但支架回弹偏硬，城市平路滑行需要更多体力泵动，更推荐泵道场景。"]
      ],
      fb: "Studio product photo of a 34 inch advanced surfskate complete board for pump track and bowl, deep concave seven layer maple deck with double fiberglass in rock black, reinforced spring surf skate truck, 62mm 82A grippy wheels, at a concrete skatepark bowl, moody editorial product photography, dramatic light"
    },
    "ORG-SL1": {
      url: "sk-sl1.html",
      img: "sk-long-dance",
      badge: null,
      tag: "CORE 06 — LONGBOARD DANCING · 平花舞板",
      title: "长板・平花舞板",
      en: "LONGBOARD DANCING FREESTYLE COMPLETE BOARD — FREESTYLE DANCE LONGBOARD FOR TRICKS",
      slogan: "站在板上起舞，在路面完成流动舞步。",
      desc: "专业 Dancing 平花舞板，板面加长加宽，充足的板面空间，支持交叉步、旋转、各种走板花式动作。七层枫木混合竹材压制，弹性柔和适中，踩压反馈顺滑，不会过硬震脚，也不会过软发飘。板面微弹，适合在平地做舞蹈式走板、旋转、平花小动作，公园、广场休闲花式滑行首选。",
      feats: ["超长板面", "竹木复合", "柔和弹性", "走板自由"],
      price: 179,
      colors: ["旷野浅灰木纹", "大地原色", "雾蓝"],
      sizes: ["48 英寸"],
      spec: [
        ["产品型号", "ORG-SL1"],
        ["板型", "Dancing 平花舞板整板"],
        ["板面材质", "五层枫木 + 两层竹材复合"],
        ["板面尺寸", "48 英寸"],
        ["支架", "45° 压铸铝合金支架"],
        ["轮子", "70mm 78A 软质 PU 轮"],
        ["轴承", "ABEC-8 静音轴承"],
        ["适用体重", "≤ 90kg"],
        ["包含配件", "全套整板 + 板包 + 备用螺丝套装"]
      ],
      material: "竹木复合结构，韧性优于纯枫木，板面弹性柔和，走板时震动缓冲优秀；板面边缘做圆角打磨，防止磕碰划伤；板面中间微弹，两端支撑稳定，适合在板上走动、转身、花式平花。",
      scene: ["城市广场", "公园平地", "Dancing 走板", "交叉步 / 旋转 / 平花"],
      people: "喜欢长板舞蹈、休闲花式，追求优雅流畅滑行的玩家。",
      tips: [
        "板面较长，搬运需要板包（随附）。",
        "不适合速降、高速下坡。",
        "练习走板动作建议佩戴护具。"
      ],
      faq: [
        ["新手可以直接买舞板吗？", "可以，平地滑行稳定性好，但长板体积大，转弯需要适应。"],
        ["能不能做长板尖翻之类的平花动作？", "支持基础平花，舞板重心偏中间，适合 dancing 走板，不适合高强度跳跃动作。"]
      ],
      fb: "Studio product photo of a 48 inch dancing longboard complete, bamboo maple composite deck in light grey wood grain, 45 degree cast alloy trucks, 70mm 78A soft PU wheels, on a city plaza at golden hour, moody editorial product photography"
    },
    "ORG-SL2": {
      url: "sk-sl2.html",
      img: "sk-long-downhill",
      badge: null,
      tag: "CORE 07 — LONGBOARD DOWNHILL · 速降长板",
      title: "长板・速降长板",
      en: "DOWNHILL LONGBOARD COMPLETE BOARD — LOW PROFILE HIGH SPEED SLIDE LONGBOARD",
      slogan: "压低重心，直面下坡，掌控高速滑行。",
      desc: "专业速降长板，下沉式板面设计，整体重心压低，下坡高速滑行时稳定性极强，抗抖动。高密度枫木玻纤加固，板面抗冲击抗扭曲，高速 slide、弯道漂移、山地下坡专用。加宽支架底座，大直径抓地轮，刹车 slide 可控，适合山地下坡、高速弯道、速降竞赛练习，专为追求极限速度的硬核玩家。",
      feats: ["下沉式低重心", "玻纤加固", "72mm Slide 轮", "高速稳定"],
      price: 199,
      colors: ["哑光黑", "深岩灰", "旷野暗绿"],
      sizes: ["40 英寸"],
      spec: [
        ["产品型号", "ORG-SL2"],
        ["板型", "下沉式速降长板整板"],
        ["板面材质", "七层枫木 + 双层玻纤加固"],
        ["板面尺寸", "40 英寸"],
        ["支架", "高强度锻造铝合金加宽支架"],
        ["轮子", "72mm 84A 高速 Slide 专用轮"],
        ["轴承", "ABEC-9 高负载精密轴承"],
        ["适用体重", "≤ 100kg"],
        ["包含配件", "全套整板 + slide 护边 + 板包"]
      ],
      material: "下沉式切割工艺，板面整体下沉，降低重心；多层玻纤交叉加固，高速形变极小；锻造加宽支架，抗扭转能力强；轮座加宽，支持大幅度 slide 横刹；板面做防滑纹理处理，高速滑行双脚不易打滑。",
      scene: ["山地下坡", "山道速降", "高速弯道", "Slide 横刹练习"],
      people: "硬核长板速降玩家，有丰富下坡滑行经验。",
      tips: [
        "速降属于高风险运动，必须佩戴头盔、护膝护肘全套护具。",
        "禁止无经验新手直接上山速降。",
        "定期检查支架螺丝，高速滑行前务必紧固。"
      ],
      faq: [
        ["新手可以用来练速降吗？", "不推荐，速降风险极高，此板为专业装备，需要先掌握平地刹车、slide 技巧。"],
        ["可以平地刷街吗？", "可以，但板面偏重，平地滑行不如巡航板省力。"]
      ],
      fb: "Studio product photo of a 40 inch drop through downhill longboard, seven layer maple with double fiberglass in matte black, forged alloy wide trucks, 72mm 84A high speed slide wheels, on a mountain road hairpin turn, dramatic overcast light, editorial product photography"
    },
    "ORG-SL3": {
      url: "sk-sl3.html",
      img: "sk-long-cruiser",
      badge: null,
      tag: "CORE 08 — LONGBOARD CRUISER · 代步巡航",
      title: "长板・代步巡航长板",
      en: "CRUISER LONGBOARD COMPLETE BOARD — SHOCK ABSORBING LONGBOARD FOR CITY COMMUTE",
      slogan: "城市长距离漫游，平稳穿越街巷旷野。",
      desc: "城市代步巡航长板，主打长距离刷街，宽大板面，减震软轮，路面颠簸过滤效果优秀。板面弹性柔和，承重能力强，站姿放松，长时间滑行腿部不易疲劳。适合城市通勤、郊野绿道休闲刷街，新手友好，上手简单，兼顾短途代步与休闲漫游。",
      feats: ["减震软轮", "宽大板面", "强承重", "新手友好"],
      price: 149,
      colors: ["原木浅纹", "旷野砂色", "炭灰"],
      sizes: ["44 英寸"],
      spec: [
        ["产品型号", "ORG-SL3"],
        ["板型", "城市巡航代步长板整板"],
        ["板面材质", "七层枫木热压成型"],
        ["板面尺寸", "44 英寸"],
        ["支架", "轻量化压铸铝合金支架"],
        ["轮子", "70mm 76A 高减震软 PU 轮"],
        ["轴承", "ABEC-7 静音防尘轴承"],
        ["适用体重", "≤ 100kg"],
        ["包含配件", "全套整板 + 简易板包"]
      ],
      material: "七层枫木一体压合，板面宽度充足，双脚站位选择多；大尺寸高减震软轮，路面石子、裂缝震动大幅弱化；支架角度柔和，转向顺滑不灵敏过度，长距离滑行稳定。",
      scene: ["城市通勤", "绿道", "郊野道路", "长距离休闲刷街代步"],
      people: "城市代步玩家、休闲漫游爱好者、长板新手。",
      tips: [
        "软轮主打减震，不适合高速 slide、速降。",
        "板面较长，电梯、公共交通携带需要板包（随附）。",
        "雨天尽量避免滑行，保护板面木层。"
      ],
      faq: [
        ["和舞板 SL1 的区别？", "SL3 更偏向代步巡航，板面更稳，减震更好，弹性更小，不适合 dancing 走板动作；SL1 弹性更好，适合平花舞蹈。"],
        ["承重 100kg 是极限吗？", "100kg 为安全承重上限，超重会降低板面使用寿命。"]
      ],
      fb: "Studio product photo of a 44 inch cruiser longboard, seven layer maple in natural wood tone, lightweight cast alloy trucks, 70mm 76A soft shock absorbing wheels, on a quiet greenway path, moody editorial product photography, soft daylight"
    }
  };

  const d = DATA[code];
  if (!d){ location.replace("skateboard.html#skTabs"); return; }

  /* 图片兜底 */
  const FB_MAP = {
    "sk-deck-rookie": [DATA["ORG-SB1"].fb, "portrait_4_3"],
    "sk-deck-pro": [DATA["ORG-SB2"].fb, "portrait_4_3"],
    "sk-deck-sig": [DATA["ORG-SB3"].fb, "portrait_4_3"],
    "sk-surfskate-city": [DATA["ORG-SC1"].fb, "portrait_4_3"],
    "sk-surfskate-pump": [DATA["ORG-SC2"].fb, "portrait_4_3"],
    "sk-long-dance": [DATA["ORG-SL1"].fb, "portrait_4_3"],
    "sk-long-downhill": [DATA["ORG-SL2"].fb, "portrait_4_3"],
    "sk-long-cruiser": [DATA["ORG-SL3"].fb, "portrait_4_3"]
  };
  function bindFallback(img){
    img.addEventListener("error", () => {
      if (img.dataset.fbDone) return;
      img.dataset.fbDone = "1";
      const key = (img.src.split("/").pop() || "").replace(".jpg", "");
      const f = FB_MAP[key];
      if (f) img.src = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
        encodeURIComponent(f[0]) + "&image_size=" + f[1];
    });
  }

  /* ============================================================
     渲染
  ============================================================ */
  document.title = `OROGEN｜${d.title} ${d.en.split(" — ")[0]}`;
  const root = $("#skdRoot");

  root.innerHTML = `
  <nav class="skd-crumb mono">
    <a href="index.html#top">首页</a> / <a href="skateboard.html#skTabs">街头滑板</a> / <a href="skateboard.html#skTabs">整板 &amp; 板面</a> / <b>${code}</b>
  </nav>

  <!-- Hero 购买区 -->
  <section class="skd-buy">
    <div class="skd-gallery">
      <div class="skd-gallery-main">
        <img src="assets/${d.img}.jpg" alt="${d.title}" id="skdMainImg">
        <span class="skd-gallery-code mono">${code}</span>
        ${d.badge ? `<span class="skd-gallery-badge">${d.badge}</span>` : ""}
      </div>
      <div class="skd-gallery-thumbs">
        <img src="assets/${d.img}.jpg" alt="${d.title} 视角一" class="active">
        <img src="assets/sk-deck-pro.jpg" alt="板面细节视角" data-fb-thumb="pro">
        <img src="assets/sk-surfskate-city.jpg" alt="街头滑行视角" data-fb-thumb="city">
      </div>
    </div>

    <div class="skd-info">
      <div class="skd-info-head">
        <p class="skd-info-tag mono">${d.tag}</p>
        <h1 class="skd-info-title">${d.title}</h1>
        <p class="skd-info-en">${d.en}</p>
      </div>
      <p class="skd-slogan">「${d.slogan}」</p>
      <p class="skd-desc">${d.desc}</p>
      <div class="skd-feat-tags mono">${d.feats.map(f => `<span>${f}</span>`).join("")}</div>

      <div class="skd-price-row">
        <span class="skd-price">$${d.price}<small>/ 件</small></span>
        <span class="skd-price-note mono">含税 · 全球可发</span>
      </div>

      <div class="skd-opt" data-opt="color">
        <div class="skd-opt-label mono"><span>板面图案 COLOR</span><b id="optColor">${d.colors[0]}</b></div>
        <div class="skd-opt-chips">
          ${d.colors.map((c,i) => `<button class="skd-opt-chip ${i===0?"active":""}" data-val="${c}">${c}</button>`).join("")}
        </div>
      </div>

      <div class="skd-opt" data-opt="size">
        <div class="skd-opt-label mono"><span>尺寸 SIZE</span><b id="optSize">${d.sizes[0]}</b></div>
        <div class="skd-opt-chips">
          ${d.sizes.map((s,i) => `<button class="skd-opt-chip ${i===0?"active":""}" data-val="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div class="skd-qty-row">
        <div class="skd-qty">
          <button type="button" id="qtyMinus" aria-label="减少">−</button>
          <span id="qtyNum">1</span>
          <button type="button" id="qtyPlus" aria-label="增加">+</button>
        </div>
        <span class="skd-stock mono">现货 · 48 小时内发货</span>
      </div>

      <div class="skd-buy-btns">
        <button class="skd-btn-cart" id="addBag" type="button">加入装备袋</button>
        <button class="skd-btn-buy" id="buyNow" type="button">立即购买</button>
      </div>
      <div class="skd-buy-meta mono">
        <span>✓ 7 天无理由退换</span>
        <span>✓ 出厂质量问题售后</span>
        <span>✓ 整板开箱即滑</span>
      </div>
    </div>
  </section>

  <!-- 核心参数 -->
  <section class="skd-sec">
    <div class="skd-sec-inner">
      <p class="skd-sec-tag mono">SPECS — 核心参数</p>
      <h2 class="skd-h2">参数表<span style="color:var(--accent)">.</span></h2>
      <p class="skd-sec-sub">出厂标准配置，整板无需二次组装。</p>
      <table class="skd-spec-table mono">
        <tbody>
          ${d.spec.map(([k,v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>

  <!-- 材质 & 场景 -->
  <section class="skd-sec">
    <div class="skd-sec-inner skd-two-col">
      <div class="skd-text-block">
        <p class="skd-sec-tag mono">MATERIAL &amp; CRAFT</p>
        <h2 class="skd-h2">材质 &amp; 工艺</h2>
        <p style="margin-top:16px">${d.material}</p>
      </div>
      <div class="skd-text-block">
        <p class="skd-sec-tag mono">SCENE &amp; RIDER</p>
        <h2 class="skd-h2">适用场景</h2>
        <div class="skd-scene-tags">${d.scene.map(s => `<span>${s}</span>`).join("")}</div>
        <div class="skd-people">
          <span class="mono">适合人群 — FOR WHOM</span>
          <p>${d.people}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 选购贴士 -->
  <section class="skd-sec">
    <div class="skd-sec-inner">
      <p class="skd-sec-tag mono">BUYING TIPS — 选购贴士</p>
      <h2 class="skd-h2">下单前，知道这三件事</h2>
      <div class="skd-tips" style="margin-top:26px">
        ${d.tips.map(t => `<div class="skd-tip"><p>${t}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="skd-sec">
    <div class="skd-sec-inner">
      <p class="skd-sec-tag mono">FAQ — 常见问题</p>
      <h2 class="skd-h2">滑手最常问的两个问题</h2>
      <div class="skd-faq" style="margin-top:24px">
        ${d.faq.map(([q,a]) => `
          <div class="skd-faq-item">
            <button class="skd-faq-q" type="button" aria-expanded="false">
              <span class="mono">Q</span><span>${q}</span><i aria-hidden="true"></i>
            </button>
            <div class="skd-faq-a"><p>${a}</p></div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- 相关推荐 -->
  <section class="skd-sec skd-rel">
    <div class="skd-sec-inner">
      <p class="skd-sec-tag mono">RELATED — 核心爆款全系</p>
      <h2 class="skd-h2">其他板友也在看</h2>
      <div class="skd-rel-grid" style="margin-top:26px" id="relGrid"></div>
    </div>
  </section>`;

  /* 相关推荐渲染（4 款互链） */
  $("#relGrid").innerHTML = Object.values(DATA).map(x => `
    <a class="skd-rel-card ${x.url === d.url ? "current" : ""}" href="${x.url}">
      <div class="skd-rel-media"><img src="assets/${x.img}.jpg" alt="${x.title}"></div>
      <div class="skd-rel-info">
        <span class="skd-rel-code mono">${x.url.replace("sk-","").replace(".html","").toUpperCase()} · $${x.price}</span>
        <h3 class="skd-rel-name">${x.title}</h3>
        <p class="skd-rel-price">${x.feats.slice(0,2).join(" · ")}</p>
      </div>
    </a>`).join("");

  /* 全部图片兜底 */
  $$(".skd-rel-media img").forEach(bindFallback);
  $$(".skd-gallery-thumbs img").forEach(bindFallback);
  bindFallback($("#skdMainImg"));

  /* ========== SKU 选择 ========== */
  $$(".skd-opt").forEach(group => {
    group.addEventListener("click", e => {
      const chip = e.target.closest(".skd-opt-chip");
      if (!chip) return;
      $$(".skd-opt-chip", group).forEach(c => c.classList.toggle("active", c === chip));
      const out = group.dataset.opt === "color" ? $("#optColor") : $("#optSize");
      if (out) out.textContent = chip.dataset.val;
    });
  });

  /* ========== 数量 ========== */
  let qty = 1;
  $("#qtyMinus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1); $("#qtyNum").textContent = qty;
  });
  $("#qtyPlus").addEventListener("click", () => {
    qty = Math.min(9, qty + 1); $("#qtyNum").textContent = qty;
  });

  /* ========== Toast ========== */
  const toast = $("#skdToast"); let timer;
  function showToast(msg){
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function skuText(){
    const c = $("#optColor").textContent, s = $("#optSize").textContent;
    return `${c} / ${s}`;
  }
  $("#addBag").addEventListener("click", () =>
    showToast(`已加入装备袋 — ${code} ${skuText()} × ${qty}，合计 $${d.price * qty}`));
  $("#buyNow").addEventListener("click", () =>
    showToast(`结算通道即将开放 — ${code} ${skuText()} × ${qty}，先收藏别错过`));

  /* ========== FAQ 手风琴 ========== */
  $$(".skd-faq-item").forEach(item => {
    const q = $(".skd-faq-q", item), a = $(".skd-faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      $$(".skd-faq-item.open").forEach(o => {
        if (o === item) return;
        o.classList.remove("open");
        $(".skd-faq-q", o).setAttribute("aria-expanded", "false");
        $(".skd-faq-a", o).style.maxHeight = "0px";
      });
      item.classList.toggle("open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.maxHeight = open ? "0px" : a.scrollHeight + "px";
    });
  });

  /* ========== 缩略图切换 ========== */
  const mainImg = $("#skdMainImg");
  $$(".skd-gallery-thumbs img").forEach(t => {
    t.addEventListener("click", () => {
      $$(".skd-gallery-thumbs img").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      mainImg.src = t.src;
      mainImg.dataset.fbDone = t.dataset.fbDone || "";
    });
  });

  /* ========== 转场（内部链接） ========== */
  let leaving = false;
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="index.html"], a[href^="skateboard.html"]');
    if (!link) return;
    e.preventDefault();
    if (leaving) return; leaving = true;
    try { sessionStorage.setItem("orogen_ptc", "1"); } catch(_){}
    location.href = link.getAttribute("href");
  });
  $("#year") && ($("#year").textContent = new Date().getFullYear());
})();
