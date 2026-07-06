import "./styles.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const HOME_ASSETS = {
  background: assetPath("assets/home/background.png"),
  material: assetPath("assets/home/素材.png"),
  card1: assetPath("assets/home/3卡片 1.png"),
  card2: assetPath("assets/home/3卡片 2.png"),
  card3: assetPath("assets/home/3卡片 3.png"),
  title: assetPath("assets/home/大标题.png"),
  button: assetPath("assets/home/按钮.png"),
};

const PAGE2_ASSETS = {
  background: assetPath("assets/page2/background.png"),
  cakeSkirt: assetPath("assets/page2/蛋糕裙.png"),
  cakeSkirtDetail: assetPath("assets/page2/蛋糕裙1.png"),
  denimJacket: assetPath("assets/page2/牛仔外套.png"),
  denimJacketDetail: assetPath("assets/page2/牛仔外套1.png"),
  denimSkirt: assetPath("assets/page2/牛仔裙.png"),
  denimSkirtDetail: assetPath("assets/page2/牛仔裙1.png"),
  cargoPants: assetPath("assets/page2/工装裤.png"),
  cargoPantsDetail: assetPath("assets/page2/工装裤1.png"),
  workVest: assetPath("assets/page2/工装马甲.png"),
  workVestDetail: assetPath("assets/page2/工装马甲1.png"),
  upload: assetPath("assets/page2/上传.png"),
  selected: assetPath("assets/page2/已选择.png"),
  start: assetPath("assets/page2/开始拆解.png"),
};

const PAGE3_ASSETS = {
  background: assetPath("assets/page3/background.png"),
  back: assetPath("assets/page3/按钮.png"),
  bottomDecor: assetPath("assets/page3/背景元素.png"),
  scissors: assetPath("assets/page3/剪刀.png"),
  clickHint: assetPath("assets/page3/点击虚线.png"),
  unlockHint: assetPath("assets/page3/解锁新素材.png"),
  fabric1: assetPath("assets/page3/布料1.png"),
  fabric2: assetPath("assets/page3/布料2.png"),
};

const PAGE4_ASSETS = {
  background: assetPath("assets/page4/background.jpg"),
  back: assetPath("assets/page4/按钮.png"),
  bag: assetPath("assets/page4/便携小包.png"),
  shirt: assetPath("assets/page4/度假衬衫.png"),
  tote: assetPath("assets/page4/海边托特包.png"),
  mat: assetPath("assets/page4/野餐垫.png"),
  hat: assetPath("assets/page4/渔夫帽.png"),
  bagOutline: assetPath("assets/page4/便携小包1.png"),
  shirtOutline: assetPath("assets/page4/度假衬衫1.png"),
  toteOutline: assetPath("assets/page4/海边托特包1.png"),
  matOutline: assetPath("assets/page4/野餐垫1.png"),
  hatOutline: assetPath("assets/page4/渔夫帽1.png"),
};

const PAGE5_ASSETS = {
  background: assetPath("assets/page5/background.jpg"),
  back: assetPath("assets/page5/按钮.png"),
  result: assetPath("assets/page5/本次改造成果.png"),
  continueCard: assetPath("assets/page5/继续改造.png"),
  shareCard: assetPath("assets/page5/分享成果.png"),
  reportTitle: assetPath("assets/page5/重生报告.png"),
  beforeLabel: assetPath("assets/page5/改造前.png"),
  arrowLabel: assetPath("assets/page5/箭头.png"),
  afterLabel: assetPath("assets/page5/改造后.png"),
};

const PAGE4_PRODUCTS = [
  { name: "度假衬衫", src: PAGE4_ASSETS.shirt, outlineSrc: PAGE4_ASSETS.shirtOutline },
  { name: "海边托特包", src: PAGE4_ASSETS.tote, outlineSrc: PAGE4_ASSETS.toteOutline },
  { name: "野餐垫", src: PAGE4_ASSETS.mat, outlineSrc: PAGE4_ASSETS.matOutline },
  { name: "渔夫帽", src: PAGE4_ASSETS.hat, outlineSrc: PAGE4_ASSETS.hatOutline },
  { name: "便携小包", src: PAGE4_ASSETS.bag, outlineSrc: PAGE4_ASSETS.bagOutline },
];

const CLOTHING_OPTIONS = [
  { name: "蛋糕裙", type: "bottom", src: PAGE2_ASSETS.cakeSkirt, detailSrc: PAGE2_ASSETS.cakeSkirtDetail },
  { name: "牛仔外套", type: "top", src: PAGE2_ASSETS.denimJacket, detailSrc: PAGE2_ASSETS.denimJacketDetail },
  { name: "牛仔裙", type: "bottom", src: PAGE2_ASSETS.denimSkirt, detailSrc: PAGE2_ASSETS.denimSkirtDetail },
  { name: "工装裤", type: "bottom", src: PAGE2_ASSETS.cargoPants, detailSrc: PAGE2_ASSETS.cargoPantsDetail },
  { name: "工装马甲", type: "top", src: PAGE2_ASSETS.workVest, detailSrc: PAGE2_ASSETS.workVestDetail },
  { name: "上传", src: PAGE2_ASSETS.upload },
];

const app = document.getElementById("app");
let selectedClothingName = window.sessionStorage.getItem("selectedClothingName") || "";
let selectedPage4ProductName = window.sessionStorage.getItem("selectedPage4ProductName") || "";
let page3AdvanceTimer = 0;
let page5Composition = [];
let page5ReportBlobPromise = null;
let uploadedClothingPhotoUrl = "";

const getSelectedClothing = () => {
  if (selectedClothingName === "上传" && uploadedClothingPhotoUrl) {
    return {
      name: "上传",
      type: "upload",
      src: PAGE2_ASSETS.upload,
      detailSrc: uploadedClothingPhotoUrl,
    };
  }

  return CLOTHING_OPTIONS.find((item) => item.name === selectedClothingName);
};

const FABRIC_SPRITES = [
  { src: PAGE3_ASSETS.fabric1, palette: ["blue", "denim"], size: "330% 330%", pos: "50% 3%", ratio: "1.25", clip: "polygon(11% 24%, 29% 7%, 81% 12%, 93% 53%, 76% 85%, 29% 80%, 8% 61%)" },
  { src: PAGE3_ASSETS.fabric1, palette: ["brown", "khaki"], size: "330% 330%", pos: "98% 3%", ratio: "1.08", clip: "polygon(24% 7%, 74% 13%, 90% 50%, 73% 90%, 26% 80%, 9% 40%)" },
  { src: PAGE3_ASSETS.fabric1, palette: ["brown", "khaki"], size: "330% 330%", pos: "3% 50%", ratio: "1.02", clip: "polygon(11% 14%, 72% 8%, 92% 30%, 79% 88%, 21% 84%, 7% 51%)" },
  { src: PAGE3_ASSETS.fabric1, palette: ["brown", "khaki"], size: "330% 330%", pos: "96% 52%", ratio: "1.32", clip: "polygon(10% 19%, 75% 11%, 93% 42%, 81% 78%, 31% 87%, 8% 62%)" },
  { src: PAGE3_ASSETS.fabric2, palette: ["blue", "denim"], size: "390% 390%", pos: "1% 2%", ratio: "1.7", clip: "polygon(7% 13%, 83% 6%, 94% 33%, 70% 82%, 19% 71%, 5% 43%)" },
  { src: PAGE3_ASSETS.fabric2, palette: ["blue", "denim"], size: "390% 390%", pos: "34% 2%", ratio: "1.45", clip: "polygon(10% 19%, 58% 6%, 92% 26%, 79% 80%, 29% 75%, 7% 45%)" },
  { src: PAGE3_ASSETS.fabric2, palette: ["blue", "denim"], size: "390% 390%", pos: "33% 36%", ratio: "1.04", clip: "polygon(20% 7%, 75% 11%, 94% 56%, 68% 91%, 15% 76%, 8% 30%)" },
];

const getPage3CutLines = () => [
  { id: 1, axis: "vertical", pos: 36, label: "左侧竖向拆解线", style: "--line-left: -35%; --line-top: 46%; --line-width: 142%; --line-rotate: 90deg; --hint-x: 70%; --hint-y: 36%;" },
  { id: 2, axis: "vertical", pos: 64, label: "右侧竖向拆解线", style: "--line-left: -7%; --line-top: 46%; --line-width: 142%; --line-rotate: 90deg; --hint-x: 70%; --hint-y: 36%;" },
  { id: 3, axis: "horizontal", pos: 36, label: "上方横向拆解线", style: "--line-left: 12%; --line-top: 32%; --line-width: 76%; --line-rotate: 0deg; --hint-x: 96%; --hint-y: 36%;" },
  { id: 4, axis: "horizontal", pos: 64, label: "下方横向拆解线", style: "--line-left: 12%; --line-top: 60%; --line-width: 76%; --line-rotate: 0deg; --hint-x: 96%; --hint-y: 64%;" },
];

const getFabricPalettesForClothing = (name = "") => {
  if (name.includes("牛仔")) return ["blue", "denim"];
  if (name.includes("工装")) return ["brown", "khaki"];
  if (name.includes("蛋糕裙")) return ["brown", "khaki"];
  return ["blue", "denim", "brown", "khaki"];
};

const randomBetween = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const randomAroundInteger = (base, range = .15) => {
  const min = Math.max(1, Math.round(base * (1 - range)));
  const max = Math.max(min, Math.round(base * (1 + range)));
  let value = Math.round(randomBetween(min, max));

  if (value === base && max > min) {
    value += Math.random() > .5 ? 1 : -1;
  }

  return clamp(value, min, max);
};
const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
const generatePage5Stats = () => {
  const previousValue = window.sessionStorage.getItem("page5ResultStats");
  const makeStats = () => ({
    duration: formatDuration(randomAroundInteger(332)),
    carbon: `+${randomAroundInteger(180)}g`,
    materials: `+${randomAroundInteger(12)}`,
    inspiration: `+${randomAroundInteger(8)}`,
  });
  let stats = makeStats();

  for (let tries = 0; previousValue && JSON.stringify(stats) === previousValue && tries < 6; tries += 1) {
    stats = makeStats();
  }

  window.sessionStorage.setItem("page5ResultStats", JSON.stringify(stats));
  return stats;
};
const getCssUrlValue = (value = "") => {
  const match = value.match(/^url\((['"]?)(.*?)\1\)$/);
  return match ? match[2] : value;
};
const escapeAttribute = (value = "") => String(value)
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
const parsePercentPair = (value = "", fallback = [100, 100]) => {
  const parts = value.trim().split(/\s+/).map((item) => parseFloat(item));
  return [
    Number.isFinite(parts[0]) ? parts[0] : fallback[0],
    Number.isFinite(parts[1]) ? parts[1] : fallback[1],
  ];
};
const parseStoredComposition = (value) => {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const savePage5Composition = (composition) => {
  if (!Array.isArray(composition) || composition.length === 0) return;

  const serialized = JSON.stringify(composition);
  window.__page5CompositionBackup = composition;
  try {
    window.sessionStorage.setItem("page5Composition", serialized);
  } catch {
    // Some mobile browser modes can block storage; the in-memory backup still supports the page transition.
  }
  try {
    window.localStorage.setItem("page5Composition", serialized);
  } catch {
    // Local storage is only a persistence fallback.
  }
};
const waitForImages = (container) => Promise.all([...container.querySelectorAll("img")]
  .map((image) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }));
const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});
const inlineCloneImages = async (clone) => {
  await Promise.all([...clone.querySelectorAll("img")].map(async (image) => {
    const rawSrc = image.getAttribute("src");
    if (!rawSrc || rawSrc.startsWith("data:")) return;

    try {
      const absoluteSrc = new URL(rawSrc, window.location.href).href;
      const response = await fetch(absoluteSrc);
      const blob = await response.blob();
      image.setAttribute("src", await blobToDataUrl(blob));
    } catch {
      image.setAttribute("src", new URL(rawSrc, window.location.href).href);
    }
  }));
};
const getInlineCssText = () => [...document.styleSheets]
  .map((sheet) => {
    try {
      return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
    } catch {
      return "";
    }
  })
  .join("\n");
const buildPage5ReportBlob = async () => {
  const screen = document.querySelector(".page5-screen");
  if (!screen) throw new Error("没有找到重生报告页面");

  await waitForImages(screen);

  const rect = screen.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);
  const clone = screen.cloneNode(true);
  clone.querySelectorAll("button").forEach((button) => button.remove());
  clone.querySelectorAll(".page5-back-image, .page5-bottom-button-cover, .page5-bottom-button-visual").forEach((element) => element.remove());
  clone.classList.remove("page5-entering", "is-going-home", "is-saving-work", "is-going-page4");
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.margin = "0";
  clone.style.transform = "none";
  await inlineCloneImages(clone);

  const html = `
    <style>
      ${getInlineCssText()}
      html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; background: #78c8ef; }
      * { -webkit-font-smoothing: antialiased; }
    </style>
    ${clone.outerHTML}
  `;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject x="0" y="0" width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">${html}</div>
      </foreignObject>
    </svg>
  `;
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = "async";
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = svgUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext("2d");
    context.fillStyle = "#78c8ef";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(2, 2);
    context.drawImage(image, 0, 0, width, height);

    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("生成图片失败"));
      }, "image/png", .96);
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
};
const getPage5ReportBlob = () => {
  page5ReportBlobPromise ||= buildPage5ReportBlob();
  return page5ReportBlobPromise;
};
const shareCurrentResult = async () => {
  const shareData = {
    title: "海洋重生实验室",
    text: "我完成了一次旧衣重生改造，一起看看我的重生报告吧！",
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  await navigator.clipboard?.writeText?.(window.location.href);
  window.alert("当前浏览器不支持系统分享，已复制页面链接。");
};
const saveCurrentReport = async () => {
  let blob = await getPage5ReportBlob();
  if (!blob) {
    page5ReportBlobPromise = null;
    blob = await buildPage5ReportBlob();
  }
  const file = new File([blob], `海洋重生报告-${Date.now()}.png`, { type: "image/png" });

  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    await navigator.share({
      title: "海洋重生报告",
      text: "保存我的旧衣重生报告",
      files: [file],
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const PAGE5_COMPOSITION_FRAME = {
  left: 9,
  top: 29.6,
  width: 82,
  height: 35.6,
};

const getFinalClothingPieces = () => {
  const xBoundaries = [0, 36, 64, 100];
  const yBoundaries = [0, 36, 64, 100];
  const clothingClipGrid = [
    [
      "polygon(18% 14%, 100% 4%, 100% 100%, 12% 92%, 4% 42%)",
      "polygon(5% 2%, 95% 2%, 100% 94%, 0 100%)",
      "polygon(0 4%, 84% 14%, 96% 42%, 88% 92%, 0 100%)",
    ],
    [
      "polygon(7% 8%, 100% 0, 100% 100%, 9% 96%, 0 52%)",
      "polygon(2% 0, 98% 0, 98% 100%, 2% 100%)",
      "polygon(0 0, 93% 8%, 100% 52%, 91% 96%, 0 100%)",
    ],
    [
      "polygon(11% 6%, 100% 0, 100% 90%, 28% 98%, 4% 64%)",
      "polygon(0 0, 100% 0, 94% 94%, 10% 100%)",
      "polygon(0 0, 89% 6%, 96% 64%, 72% 98%, 0 90%)",
    ],
  ];
  const pieces = [];

  yBoundaries.slice(0, -1).forEach((top, row) => {
    const bottom = yBoundaries[row + 1];
    xBoundaries.slice(0, -1).forEach((left, col) => {
      const rightBoundary = xBoundaries[col + 1];
      const width = rightBoundary - left;
      const height = bottom - top;
      const bgX = width >= 100 ? 0 : (left / (100 - width)) * 100;
      const bgY = height >= 100 ? 0 : (top / (100 - height)) * 100;

      pieces.push({
        row,
        col,
        ratio: Number((width / height).toFixed(2)),
        bgSize: `${(100 / width) * 100}% ${(100 / height) * 100}%`,
        bgPos: `${bgX}% ${bgY}%`,
        clip: clothingClipGrid[row][col],
      });
    });
  });

  return pieces;
};

const pickMatchingFabrics = (name = "", targetCount = 6) => {
  const palettes = getFabricPalettesForClothing(name);
  const matchedFabrics = FABRIC_SPRITES.filter((piece) => piece.palette.some((color) => palettes.includes(color)));
  const pool = matchedFabrics.length > 0 ? matchedFabrics : FABRIC_SPRITES;
  const picked = [];

  while (picked.length < targetCount) {
    picked.push(...[...pool].sort(() => Math.random() - .5));
  }

  return picked.slice(0, targetCount);
};

const getPage4MaterialPieces = (selectedClothing) => {
  if (!selectedClothing?.detailSrc) return [];

  const materialSlots = [
    { x: 6, y: 29, w: 10, rot: -7 },
    { x: 18.5, y: 29, w: 10.1, rot: 5 },
    { x: 31, y: 29, w: 10, rot: -4 },
    { x: 43.5, y: 29, w: 10.1, rot: 4 },
    { x: 56, y: 29, w: 10, rot: -5 },
    { x: 68.5, y: 29, w: 10.1, rot: 6 },
    { x: 81, y: 29, w: 10, rot: -4 },
    { x: 93.5, y: 29, w: 9.8, rot: 5 },
    { x: 12, y: 78, w: 9.8, rot: 8 },
    { x: 25, y: 78, w: 9.9, rot: -6 },
    { x: 38, y: 78, w: 9.8, rot: 7 },
    { x: 51, y: 78, w: 9.9, rot: -5 },
    { x: 64, y: 78, w: 9.8, rot: 6 },
    { x: 77, y: 78, w: 9.9, rot: -7 },
    { x: 90, y: 78, w: 9.7, rot: 8 },
  ];

  const clothingPieces = getFinalClothingPieces().map((piece) => {
    return {
      kind: "cloth",
      src: selectedClothing.detailSrc,
      ratio: piece.ratio,
      bgSize: piece.bgSize,
      bgPos: piece.bgPos,
      clip: piece.clip,
    };
  });

  const fabricPieces = pickMatchingFabrics(selectedClothing.name, 6).map((piece) => ({
    kind: "fabric",
    src: piece.src,
    ratio: piece.ratio,
    bgSize: piece.size,
    bgPos: piece.pos,
    clip: piece.clip,
  }));

  const orderedPieces = [];
  const maxPieces = Math.max(clothingPieces.length, fabricPieces.length);

  for (let index = 0; index < maxPieces; index += 1) {
    if (clothingPieces[index]) orderedPieces.push(clothingPieces[index]);
    if (fabricPieces[index]) orderedPieces.push(fabricPieces[index]);
  }

  return orderedPieces.map((piece, index) => {
    const slot = materialSlots[index % materialSlots.length];
    const startX = Math.round(randomBetween(-460, -220));
    const startY = Math.round(randomBetween(42, 152));
    const midX = Math.round(randomBetween(-190, -74));
    const midY = Math.round(randomBetween(-26, 52));
    const startRot = Math.round(slot.rot + randomBetween(-30, 30));
    const delay = Math.round(90 + index * 58 + randomBetween(0, 52));

    return { ...piece, slot, startX, startY, midX, midY, startRot, delay };
  });
};

if (!CLOTHING_OPTIONS.some((item) => item.name === selectedClothingName)) {
  selectedClothingName = "";
  window.sessionStorage.removeItem("selectedClothingName");
}

function renderHome() {
  app.innerHTML = `
    <section class="home-screen home-entering" aria-label="海洋重生实验室首页">
      <img class="home-bg" src="${HOME_ASSETS.background}" alt="" draggable="false" />

      <img class="title-piece" src="${HOME_ASSETS.title}" alt="海洋重生实验室" draggable="false" />
      <div class="home-cards-row" aria-label="首页信息卡">
        <button class="home-info-card" type="button" aria-label="预计体验 约5分钟">
          <img src="${HOME_ASSETS.card1}" alt="" draggable="false" />
        </button>
        <button class="home-info-card" type="button" aria-label="零废弃 回收使命">
          <img src="${HOME_ASSETS.card2}" alt="" draggable="false" />
        </button>
        <button class="home-info-card" type="button" aria-label="重生报告 成就预览">
          <img src="${HOME_ASSETS.card3}" alt="" draggable="false" />
        </button>
      </div>
      <img class="button-piece" src="${HOME_ASSETS.button}" alt="" draggable="false" aria-hidden="true" />

      <button class="start-button" type="button" aria-label="开启重生之旅"></button>
    </section>
  `;

  const homeScreen = app.querySelector(".home-screen");
  window.setTimeout(() => {
    homeScreen?.classList.remove("home-entering");
  }, 2200);

  app.querySelector(".start-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".home-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-starting");

    window.setTimeout(() => {
      window.location.hash = "page2";
      renderRoute();
      screen?.classList.remove("is-starting");
      button.dataset.pressing = "false";
    }, 320);
  });

}

function renderPage2() {
  if (uploadedClothingPhotoUrl) {
    URL.revokeObjectURL(uploadedClothingPhotoUrl);
    uploadedClothingPhotoUrl = "";
  }
  if (selectedClothingName === "上传") {
    selectedClothingName = "";
    window.sessionStorage.removeItem("selectedClothingName");
  }

  app.innerHTML = `
    <section class="page2-screen" aria-label="衣物选择页面">
      <img class="page2-bg" src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      <div class="page2-motion cloud cloud-main" aria-hidden="true">
        <img src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      </div>
      <div class="page2-motion cloud cloud-secondary" aria-hidden="true">
        <img src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      </div>
      <div class="page2-motion sea-wave" aria-hidden="true">
        <img src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      </div>
      <div class="page2-motion boat" aria-hidden="true">
        <img src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      </div>
      <div class="page2-motion page2-ip" aria-hidden="true">
        <img src="${PAGE2_ASSETS.background}" alt="" draggable="false" />
      </div>
      <button class="page2-back-button" type="button" aria-label="返回首页"></button>
      <div class="clothing-grid cards-entering" aria-label="选择衣物">
        ${CLOTHING_OPTIONS.map((item) => `
          <button class="clothing-card${selectedClothingName === item.name ? " selected" : ""}" type="button" data-name="${item.name}" aria-label="选择${item.name}">
            <img class="clothing-card-image" src="${item.src}" alt="${item.name}" draggable="false" />
            <span class="select-dot" aria-hidden="true"></span>
          </button>
        `).join("")}
      </div>
      <div class="selected-box" aria-live="polite">
        <img class="selected-strip" src="${PAGE2_ASSETS.selected}" alt="已选择：" draggable="false" />
        <span id="selectedText" class="selected-text">${selectedClothingName || "暂未选择"}</span>
      </div>
      <img class="page2-start-image" src="${PAGE2_ASSETS.start}" alt="" draggable="false" aria-hidden="true" />
      <button class="page2-start-button" type="button" aria-label="开始拆解"></button>
      <input class="clothing-upload-input" type="file" accept="image/*" hidden />
    </section>
  `;

  app.querySelector(".page2-back-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page2-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-going-back");

    window.setTimeout(() => {
      window.location.hash = "home";
      renderRoute();
    }, 260);
  });

  const clothingCards = app.querySelectorAll(".clothing-card");
  const selectedText = app.querySelector("#selectedText");
  const clothingGrid = app.querySelector(".clothing-grid");
  const uploadInput = app.querySelector(".clothing-upload-input");

  window.setTimeout(() => {
    clothingGrid?.classList.remove("cards-entering");
  }, 1500);

  clothingCards.forEach((card) => {
    const releasePress = () => {
      window.setTimeout(() => {
        card.classList.remove("is-pressing");
      }, 130);
    };

    card.addEventListener("pointerdown", () => {
      card.classList.add("is-pressing");
    });

    card.addEventListener("pointerup", releasePress);
    card.addEventListener("pointerleave", releasePress);
    card.addEventListener("pointercancel", releasePress);

    card.addEventListener("click", () => {
      if (card.dataset.name === "上传") {
        uploadInput?.click();
        return;
      }

      clothingCards.forEach((item) => item.classList.remove("selected"));
      card.classList.add("selected");
      selectedClothingName = card.dataset.name || "";
      window.sessionStorage.setItem("selectedClothingName", selectedClothingName);

      if (selectedText) {
        selectedText.textContent = selectedClothingName;
      }
    });
  });

  uploadInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    if (uploadedClothingPhotoUrl) {
      URL.revokeObjectURL(uploadedClothingPhotoUrl);
    }

    uploadedClothingPhotoUrl = objectUrl;
    selectedClothingName = "上传";
    window.sessionStorage.setItem("selectedClothingName", selectedClothingName);

    clothingCards.forEach((item) => item.classList.toggle("selected", item.dataset.name === "上传"));
    if (selectedText) {
      selectedText.textContent = "上传照片";
    }
    event.target.value = "";
  });

  app.querySelector(".page2-start-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page2-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-starting-breakdown");

    window.setTimeout(() => {
      window.location.hash = "page3";
      renderRoute();
      screen?.classList.remove("is-starting-breakdown");
      button.dataset.pressing = "false";
    }, 320);
  });
}

function renderPage3() {
  window.clearTimeout(page3AdvanceTimer);
  const selectedClothing = getSelectedClothing();
  const cutLines = getPage3CutLines();

  app.innerHTML = `
    <section class="page3-screen" aria-label="衣物拆解页面">
      <img class="page3-bg" src="${PAGE3_ASSETS.background}" alt="" draggable="false" />
      <img class="page3-bottom-decor" src="${PAGE3_ASSETS.bottomDecor}" alt="" draggable="false" aria-hidden="true" />
      ${selectedClothing?.detailSrc ? `
        <div class="page3-cloth-area" aria-label="已选择的衣物：${selectedClothing.name}">
          <div class="page3-clothing-stage" data-cut-step="0">
            <img class="page3-selected-clothing page3-clothing-original" src="${selectedClothing.detailSrc}" alt="${selectedClothing.name}" draggable="false" />
            <div class="page3-clothing-slices" aria-hidden="true"></div>
            ${cutLines.map((line) => `
              <button class="cut-line cut-line-${line.id} ${line.axis || line.kind}" type="button" data-cut-id="${line.id}" style="${line.style}" aria-label="${line.label}"></button>
            `).join("")}
            <img class="scissors-hint" src="${PAGE3_ASSETS.scissors}" alt="" draggable="false" aria-hidden="true" />
            <img class="page3-click-hint" src="${PAGE3_ASSETS.clickHint}" alt="" draggable="false" aria-hidden="true" />
            <img class="page3-unlock-hint" src="${PAGE3_ASSETS.unlockHint}" alt="" draggable="false" aria-hidden="true" />
          </div>
        </div>
      ` : ""}
      <div class="page3-extra-fabrics" aria-hidden="true"></div>
      <img class="page3-back-image" src="${PAGE3_ASSETS.back}" alt="" draggable="false" aria-hidden="true" />
      <button class="page3-back-button" type="button" aria-label="返回衣物选择页面"></button>
    </section>
  `;

  app.querySelector(".page3-back-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page3-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-going-page2");

    window.setTimeout(() => {
      window.location.hash = "page2";
      renderRoute();
    }, 260);
  });

  const clothingStage = app.querySelector(".page3-clothing-stage");

  if (clothingStage) {
    const activeCuts = new Set();
    const slices = clothingStage.querySelector(".page3-clothing-slices");
    const original = clothingStage.querySelector(".page3-clothing-original");
    const extraFabrics = app.querySelector(".page3-extra-fabrics");
    const clickHint = clothingStage.querySelector(".page3-click-hint");
    const randomBetween = (min, max) => min + Math.random() * (max - min);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const clothSettleSlots = [
      { x: -58, y: 34, rot: -18 },
      { x: 0, y: 24, rot: 10 },
      { x: 58, y: 38, rot: 18 },
      { x: -66, y: 82, rot: 13 },
      { x: -4, y: 74, rot: -15 },
      { x: 66, y: 86, rot: 8 },
      { x: -46, y: 124, rot: -20 },
      { x: 14, y: 116, rot: 16 },
      { x: 50, y: 134, rot: -12 },
    ];
    const fabricSettleSlots = [
      { x: -118, y: 58 },
      { x: 56, y: 48 },
      { x: -24, y: 102 },
      { x: 116, y: 118 },
      { x: -82, y: 164 },
      { x: 28, y: 184 },
      { x: 92, y: 82 },
    ];
    const setScissorsTarget = () => {
      const nextLine = cutLines.find((line) => !activeCuts.has(line.id));

      if (!nextLine) return;

      const hintX = nextLine.style.match(/--hint-x:\s*([^;]+)/)?.[1]?.trim();
      const hintY = nextLine.style.match(/--hint-y:\s*([^;]+)/)?.[1]?.trim();

      if (hintX) clothingStage.style.setProperty("--scissors-x", hintX);
      if (hintY) clothingStage.style.setProperty("--scissors-y", hintY);
    };

    const renderCuts = () => {
      const activeLineConfigs = cutLines.filter((line) => activeCuts.has(line.id));
      const verticalCuts = activeLineConfigs.filter((line) => line.axis === "vertical").map((line) => line.pos).sort((a, b) => a - b);
      const horizontalCuts = activeLineConfigs.filter((line) => line.axis === "horizontal").map((line) => line.pos).sort((a, b) => a - b);
      const xBoundaries = [0, ...verticalCuts, 100];
      const yBoundaries = [0, ...horizontalCuts, 100];
      const activeIds = [...activeCuts].sort((a, b) => a - b);

      clothingStage.dataset.activeCuts = activeIds.join(",");
      original.style.opacity = activeIds.length > 0 ? "0" : "1";
      slices.hidden = activeIds.length === 0;

      const pieces = [];
      yBoundaries.slice(0, -1).forEach((top, row) => {
        const bottom = yBoundaries[row + 1];
        xBoundaries.slice(0, -1).forEach((left, col) => {
          pieces.push({ top, right: 100 - xBoundaries[col + 1], bottom: 100 - bottom, left, row, col });
        });
      });

      slices.innerHTML = pieces.map((piece, index) => {
        const settleSlot = clothSettleSlots[index % clothSettleSlots.length];
        const pieceX = (piece.col - (xBoundaries.length - 2) / 2) * 11;
        const pieceY = (piece.row - (yBoundaries.length - 2) / 2) * 11;
        const burstX = (index % 2 === 0 ? -1 : 1) * Math.round(randomBetween(28, 72));
        const burstRot = (index % 2 === 0 ? -1 : 1) * Math.round(randomBetween(8, 24));
        const settleX = Math.round(clamp(settleSlot.x + randomBetween(-14, 14), -78, 78));
        const settleY = Math.round(clamp(settleSlot.y + randomBetween(-12, 16), 20, 154));
        const settleRot = Math.round(settleSlot.rot + randomBetween(-20, 20));
        const settleScaleX = (Math.random() > .36 ? 1 : -1) * Number(randomBetween(.88, 1.18).toFixed(2));
        const settleScaleY = (Math.random() > .78 ? -1 : 1) * Number(randomBetween(.86, 1.16).toFixed(2));
        const fallDelay = index * 58 + Math.round(randomBetween(0, 80));

        return `
          <img
            class="page3-selected-clothing page3-clothing-slice"
            src="${selectedClothing.detailSrc}"
            alt=""
            draggable="false"
            style="clip-path: inset(${piece.top}% ${piece.right}% ${piece.bottom}% ${piece.left}%); --piece-x: ${pieceX}px; --piece-y: ${pieceY}px; --settle-y: ${settleY}px; --burst-x: ${burstX}px; --burst-rot: ${burstRot}deg; --settle-x: ${settleX}px; --settle-rot: ${settleRot}deg; --settle-scale-x: ${settleScaleX}; --settle-scale-y: ${settleScaleY}; --fall-delay: ${fallDelay}ms;"
          />
        `;
      }).join("");
    };

    renderCuts();
    setScissorsTarget();
    window.setTimeout(() => {
      clickHint?.classList.add("is-hidden");
    }, 2550);

    const pickExtraFabrics = () => {
      const targetCount = 6 + Math.floor(Math.random() * 2);
      const palettes = getFabricPalettesForClothing(selectedClothing?.name);
      const matchedFabrics = FABRIC_SPRITES.filter((piece) => piece.palette.some((color) => palettes.includes(color)));
      const pool = matchedFabrics.length > 0 ? matchedFabrics : FABRIC_SPRITES;
      const picked = [];

      while (picked.length < targetCount) {
        picked.push(...[...pool].sort(() => Math.random() - .5));
      }

      return picked.slice(0, targetCount);
    };

    const scatterExtraFabrics = () => {
      if (!extraFabrics || extraFabrics.childElementCount > 0) return;

      extraFabrics.innerHTML = pickExtraFabrics().map((piece, index) => {
        const settleSlot = fabricSettleSlots[index % fabricSettleSlots.length];
        const endX = Math.round(clamp(settleSlot.x + randomBetween(-24, 24), -126, 126));
        const endY = Math.round(clamp(settleSlot.y + randomBetween(-18, 20), 46, 190));
        const startSide = index % 3;
        const startX = startSide === 0
          ? Math.round(randomBetween(-345, -245))
          : startSide === 1
            ? Math.round(randomBetween(245, 345))
            : Math.round(randomBetween(-72, 72));
        const startY = startSide === 2
          ? Math.round(randomBetween(-365, -275))
          : Math.round(randomBetween(-84, 96));
        const popX = Math.round(clamp(endX + randomBetween(-120, 120), -210, 210));
        const popY = Math.round(randomBetween(-215, -145));
        const bloomX = Math.round(clamp(endX + randomBetween(-88, 88), -190, 190));
        const rot = Math.round(randomBetween(-76, 76));
        const flipX = Math.random() > .5 ? -1 : 1;
        const flipY = Math.random() > .66 ? -1 : 1;
        const width = Math.round(randomBetween(18, 27));
        const delay = index * 190 + Math.round(randomBetween(0, 90));
        const zIndex = 36 + index;

        return `
          <div
            class="extra-fabric-piece"
            style="z-index: ${zIndex}; --fabric-image: url('${piece.src}'); --fabric-size: ${piece.size}; --fabric-pos: ${piece.pos}; --fabric-ratio: ${piece.ratio}; --fabric-clip: ${piece.clip}; --start-x: ${startX}px; --start-y: ${startY}px; --pop-x: ${popX}px; --pop-y: ${popY}px; --bloom-x: ${bloomX}px; --end-x: ${endX}px; --end-y: ${endY}px; --fabric-rot: ${rot}deg; --fabric-flip-x: ${flipX}; --fabric-flip-y: ${flipY}; --fabric-width: ${width}%; --fabric-delay: ${delay}ms;"
          ></div>
        `;
      }).join("");
    };

    const activateCut = (cutIndex) => {
      if (activeCuts.has(cutIndex)) return;

      activeCuts.add(cutIndex);
      const currentLine = cutLines.find((line) => line.id === cutIndex);
      currentLine && app.querySelector(`.cut-line-${currentLine.id}`)?.classList.add("is-active");
      renderCuts();
      setScissorsTarget();

      if (activeCuts.size === cutLines.length) {
        clothingStage.classList.remove("is-final-burst", "is-unlocking-materials");
        window.requestAnimationFrame(() => {
          clothingStage.classList.add("is-final-burst");
          window.setTimeout(() => {
            clothingStage.classList.add("is-unlocking-materials");
            scatterExtraFabrics();
          }, 3000);
          page3AdvanceTimer = window.setTimeout(() => {
            window.location.hash = "page4";
            renderRoute();
          }, 8700);
        });
      }
    };

    app.querySelectorAll(".cut-line").forEach((line) => {
      const cutIndex = Number(line.dataset.cutId || 0);
      line.addEventListener("click", () => activateCut(cutIndex));
    });

    clothingStage.addEventListener("pointermove", (event) => {
      const bounds = clothingStage.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      clothingStage.style.setProperty("--scissors-x", `${Math.max(4, Math.min(102, x + 5)).toFixed(1)}%`);
      clothingStage.style.setProperty("--scissors-y", `${Math.max(4, Math.min(94, y - 4)).toFixed(1)}%`);
      clothingStage.classList.add("is-scissors-following");
    });

    clothingStage.addEventListener("pointerleave", () => {
      clothingStage.classList.remove("is-scissors-following");
      clothingStage.style.removeProperty("--scissors-x");
      clothingStage.style.removeProperty("--scissors-y");
    });
  }
}

function renderPage4() {
  selectedPage4ProductName = "";
  window.sessionStorage.removeItem("selectedPage4ProductName");
  window.localStorage.removeItem("selectedPage4ProductName");
  const selectedPage4Product = PAGE4_PRODUCTS.find((item) => item.name === selectedPage4ProductName);
  const selectedClothing = getSelectedClothing();
  const materialPieces = getPage4MaterialPieces(selectedClothing);

  app.innerHTML = `
    <section class="page4-screen" aria-label="下一页面">
      <img class="page4-bg" src="${PAGE4_ASSETS.background}" alt="" draggable="false" />
      <div class="page4-products-row page4-products-entering" aria-label="可改造单品">
        ${PAGE4_PRODUCTS.map((item) => `
          <button class="page4-product-card${selectedPage4ProductName === item.name ? " selected" : ""}" type="button" data-name="${item.name}" aria-label="${item.name}">
            <img class="page4-product-item" src="${item.src}" alt="${item.name}" draggable="false" />
          </button>
        `).join("")}
      </div>
      <div class="page4-outline-stage${selectedPage4Product ? " has-outline" : ""}" aria-live="polite">
        ${selectedPage4Product ? `
          <img class="page4-outline-image" data-product="${selectedPage4Product.name}" src="${selectedPage4Product.outlineSrc}" alt="${selectedPage4Product.name}虚线图像" draggable="false" />
        ` : ""}
      </div>
      <div class="page4-material-bin" aria-label="布料区碎片一览">
        ${materialPieces.map((piece, index) => `
          <div
            class="page4-material-fragment page4-material-${piece.kind}"
            aria-hidden="true"
            data-home-left="${piece.slot.x}%"
            data-home-top="${piece.slot.y}%"
            data-home-z="${index % 3 === 0 ? 3 : 2}"
            style="z-index: ${index % 3 === 0 ? 3 : 2}; --material-left: ${piece.slot.x}%; --material-top: ${piece.slot.y}%; --material-width: ${piece.slot.w}%; --material-ratio: ${piece.ratio}; --material-rot: ${piece.slot.rot}deg; --material-user-rot: 0deg; --material-scale: 1; --material-start-rot: ${piece.startRot}deg; --material-start-x: ${piece.startX}px; --material-start-y: ${piece.startY}px; --material-mid-x: ${piece.midX}px; --material-mid-y: ${piece.midY}px; --material-delay: ${piece.delay}ms; --material-image: url('${piece.src}'); --material-bg-size: ${piece.bgSize}; --material-bg-pos: ${piece.bgPos}; --material-clip: ${piece.clip};"
          ></div>
        `).join("")}
      </div>
      <div class="material-action-menu" hidden aria-label="布料操作菜单">
        <button type="button" data-action="delete">删除</button>
        <button type="button" data-action="copy">复制</button>
        <button type="button" data-action="top">置顶</button>
        <button type="button" data-action="bottom">移至底层</button>
      </div>
      <div class="page4-finish-cover" aria-hidden="true"></div>
      <div class="page4-finish-visual" aria-hidden="true">
        <img class="page4-finish-sprite" src="${PAGE4_ASSETS.background}" alt="" draggable="false" />
      </div>
      <button class="page4-finish-button" type="button" aria-label="完成作品"></button>
      <img class="page4-back-image" src="${PAGE4_ASSETS.back}" alt="" draggable="false" aria-hidden="true" />
      <button class="page4-back-button" type="button" aria-label="返回衣物拆解页面"></button>
    </section>
  `;

  const productRow = app.querySelector(".page4-products-row");
  const productCards = app.querySelectorAll(".page4-product-card");
  const materialFragments = app.querySelectorAll(".page4-material-fragment");
  const materialActionMenu = app.querySelector(".material-action-menu");
  const outlineStage = app.querySelector(".page4-outline-stage");
  let materialDragZIndex = 20;
  let activeMaterialFragment = null;
  let lockedMaterialFragment = null;

  const prepareMaterialInteraction = (fragment) => {
    fragment.style.animation = "none";
    fragment.style.opacity = "1";
  };

  const getMaterialScale = (fragment) => {
    const value = parseFloat(fragment.style.getPropertyValue("--material-scale"));
    return Number.isFinite(value) ? value : 1;
  };

  const getMaterialRotation = (fragment) => {
    const value = parseFloat(fragment.style.getPropertyValue("--material-user-rot"));
    return Number.isFinite(value) ? value : 0;
  };

  const getMaterialCenter = (fragment) => {
    const rect = fragment.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const setMaterialCenter = (fragment, binRect, centerX, centerY) => {
    const left = ((centerX - binRect.left) / binRect.width) * 100;
    const top = ((centerY - binRect.top) / binRect.height) * 100;

    fragment.style.setProperty("--material-left", `${left}%`);
    fragment.style.setProperty("--material-top", `${top}%`);
  };

  const setMaterialTransform = (fragment, scale, rotation) => {
    fragment.style.setProperty("--material-scale", `${clamp(scale, .45, 2.8)}`);
    fragment.style.setProperty("--material-user-rot", `${rotation}deg`);
  };

  const markMaterialUsed = (fragment) => {
    fragment.dataset.inWorkspace = "true";
  };

  const markMaterialUnused = (fragment) => {
    delete fragment.dataset.inWorkspace;
  };

  const bringMaterialForward = (fragment) => {
    materialDragZIndex += 1;
    fragment.style.zIndex = `${materialDragZIndex}`;
  };

  window.setTimeout(() => {
    productRow?.classList.remove("page4-products-entering");
  }, 1750);

  const showPage4Outline = (product) => {
    if (!product || !outlineStage) return;

    selectedPage4ProductName = product.name;
    window.sessionStorage.setItem("selectedPage4ProductName", selectedPage4ProductName);
    window.localStorage.setItem("selectedPage4ProductName", selectedPage4ProductName);
    productCards.forEach((item) => {
      item.classList.toggle("selected", item.dataset.name === product.name);
    });

    outlineStage.classList.remove("has-outline");
    outlineStage.innerHTML = `
      <img class="page4-outline-image" data-product="${product.name}" src="${product.outlineSrc}" alt="${product.name}虚线图像" draggable="false" />
    `;
    outlineStage.classList.add("has-outline");
  };

  productCards.forEach((card) => {
    const playHoverJiggle = () => {
      card.classList.remove("is-hover-jiggling");
      void card.offsetWidth;
      card.classList.add("is-hover-jiggling");
      window.setTimeout(() => {
        card.classList.remove("is-hover-jiggling");
      }, 360);
    };

    card.addEventListener("pointerenter", playHoverJiggle);
    card.addEventListener("mouseenter", playHoverJiggle);

    const releasePress = () => {
      window.setTimeout(() => {
        card.classList.remove("is-pressing");
      }, 150);
    };

    card.addEventListener("pointerdown", () => {
      card.classList.add("is-pressing");
    });

    card.addEventListener("pointerup", releasePress);
    card.addEventListener("pointerleave", releasePress);
    card.addEventListener("pointercancel", releasePress);
    card.addEventListener("click", () => {
      releasePress();
      const product = PAGE4_PRODUCTS.find((item) => item.name === card.dataset.name);
      showPage4Outline(product);
    });
  });

  const hideMaterialActionMenu = () => {
    if (!materialActionMenu) return;
    materialActionMenu.hidden = true;
    activeMaterialFragment = null;
  };

  const showMaterialActionMenu = (fragment) => {
    if (!materialActionMenu || !fragment.isConnected) return;

    activeMaterialFragment = fragment;
    materialActionMenu.hidden = false;

    const screenRect = fragment.closest(".page4-screen")?.getBoundingClientRect();
    const fragmentRect = fragment.getBoundingClientRect();
    const menuRect = materialActionMenu.getBoundingClientRect();

    if (!screenRect) return;

    const left = clamp(fragmentRect.left + fragmentRect.width / 2 - screenRect.left - menuRect.width / 2, 6, screenRect.width - menuRect.width - 6);
    const aboveTop = fragmentRect.top - screenRect.top - menuRect.height - 8;
    const belowTop = fragmentRect.bottom - screenRect.top + 8;
    const top = aboveTop > 6 ? aboveTop : clamp(belowTop, 6, screenRect.height - menuRect.height - 6);

    materialActionMenu.style.left = `${left}px`;
    materialActionMenu.style.top = `${top}px`;
  };

  materialActionMenu?.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  const handleMaterialAction = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("button[data-action]");
    if (!button || !activeMaterialFragment) return;

    const action = button.dataset.action;

    if (action === "delete") {
      activeMaterialFragment.style.setProperty("--material-left", activeMaterialFragment.dataset.homeLeft || "50%");
      activeMaterialFragment.style.setProperty("--material-top", activeMaterialFragment.dataset.homeTop || "50%");
      activeMaterialFragment.style.setProperty("--material-scale", "1");
      activeMaterialFragment.style.setProperty("--material-user-rot", "0deg");
      activeMaterialFragment.style.zIndex = activeMaterialFragment.dataset.homeZ || "2";
      activeMaterialFragment.style.animation = "none";
      activeMaterialFragment.style.opacity = "1";
      markMaterialUnused(activeMaterialFragment);
      hideMaterialActionMenu();
      return;
    }

    if (action === "copy") {
      const bin = activeMaterialFragment.closest(".page4-material-bin");
      if (!bin) return;

      const copy = activeMaterialFragment.cloneNode(false);
      const currentLeft = parseFloat(activeMaterialFragment.style.getPropertyValue("--material-left")) || 50;
      const currentTop = parseFloat(activeMaterialFragment.style.getPropertyValue("--material-top")) || 50;
      const copyLeft = currentLeft + 8;
      const copyTop = currentTop + 6;

      copy.classList.remove("is-dragging");
      copy.style.setProperty("--material-left", `${copyLeft}%`);
      copy.style.setProperty("--material-top", `${copyTop}%`);
      copy.dataset.homeLeft = `${copyLeft}%`;
      copy.dataset.homeTop = `${copyTop}%`;
      copy.dataset.homeZ = "2";
      if (activeMaterialFragment.dataset.inWorkspace === "true") {
        markMaterialUsed(copy);
      } else {
        markMaterialUnused(copy);
      }
      copy.style.animation = "none";
      copy.style.opacity = "1";
      bringMaterialForward(copy);
      bin.appendChild(copy);
      attachMaterialInteraction(copy);
      showMaterialActionMenu(copy);
      return;
    }

    if (action === "top") {
      bringMaterialForward(activeMaterialFragment);
      showMaterialActionMenu(activeMaterialFragment);
      return;
    }

    if (action === "bottom") {
      activeMaterialFragment.style.zIndex = "1";
      showMaterialActionMenu(activeMaterialFragment);
    }
  };

  materialActionMenu?.addEventListener("pointerup", handleMaterialAction);

  app.querySelector(".page4-screen")?.addEventListener("pointerdown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest(".page4-material-fragment") || target?.closest(".material-action-menu")) return;
    hideMaterialActionMenu();
  });

  const attachMaterialInteraction = (fragment) => {
    let dragState = null;
    let gestureState = null;
    const activePointers = new Map();

    const getFragmentCenter = () => {
      return getMaterialCenter(fragment);
    };

    const setFragmentCenter = (binRect, centerX, centerY) => {
      setMaterialCenter(fragment, binRect, centerX, centerY);
    };

    const getPointerPairInfo = () => {
      const pair = [...activePointers.values()].slice(0, 2);
      if (pair.length < 2) return null;

      const [first, second] = pair;
      return {
        center: {
          x: (first.x + second.x) / 2,
          y: (first.y + second.y) / 2,
        },
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        angle: Math.atan2(second.y - first.y, second.x - first.x) * 180 / Math.PI,
      };
    };

    const startGesture = () => {
      const bin = fragment.closest(".page4-material-bin");
      const pairInfo = getPointerPairInfo();
      if (!bin || !pairInfo) return;

      window.clearTimeout(dragState?.longPressTimer);
      hideMaterialActionMenu();

      gestureState = {
        binRect: bin.getBoundingClientRect(),
        startCenter: pairInfo.center,
        startDistance: pairInfo.distance || 1,
        startAngle: pairInfo.angle,
        startMaterialCenter: getFragmentCenter(),
        startScale: getMaterialScale(fragment),
        startRotation: getMaterialRotation(fragment),
      };
      dragState = null;
    };

    const applyGesture = () => {
      if (!gestureState) return;

      const pairInfo = getPointerPairInfo();
      if (!pairInfo) return;

      const centerX = gestureState.startMaterialCenter.x + pairInfo.center.x - gestureState.startCenter.x;
      const centerY = gestureState.startMaterialCenter.y + pairInfo.center.y - gestureState.startCenter.y;
      const scale = gestureState.startScale * (pairInfo.distance / gestureState.startDistance);
      const rotation = gestureState.startRotation + pairInfo.angle - gestureState.startAngle;

      markMaterialUsed(fragment);
      setFragmentCenter(gestureState.binRect, centerX, centerY);
      setMaterialTransform(fragment, scale, rotation);
    };

    const moveFragment = (event) => {
      if (!activePointers.has(event.pointerId)) return;
      event.preventDefault();
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (gestureState && activePointers.size >= 2) {
        applyGesture();
        return;
      }

      if (!dragState) return;

      const moveDistance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
      if (moveDistance > 6) {
        dragState.moved = true;
        markMaterialUsed(fragment);
        window.clearTimeout(dragState.longPressTimer);
        hideMaterialActionMenu();
      }

      const centerX = event.clientX - dragState.offsetX;
      const centerY = event.clientY - dragState.offsetY;
      setFragmentCenter(dragState.binRect, centerX, centerY);
    };

    const stopDragging = (event) => {
      if (!activePointers.has(event.pointerId)) return;

      try {
        fragment.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture may already be released by the browser.
      }

      activePointers.delete(event.pointerId);

      if (gestureState && activePointers.size > 0) {
        gestureState = null;
      }

      if (activePointers.size > 0) {
        const remainingPointer = [...activePointers.values()][0];
        const bin = fragment.closest(".page4-material-bin");
        const fragmentRect = fragment.getBoundingClientRect();

        if (bin && remainingPointer) {
          dragState = {
            binRect: bin.getBoundingClientRect(),
            moved: true,
            startX: remainingPointer.x,
            startY: remainingPointer.y,
            offsetX: remainingPointer.x - (fragmentRect.left + fragmentRect.width / 2),
            offsetY: remainingPointer.y - (fragmentRect.top + fragmentRect.height / 2),
            longPressTimer: 0,
          };
        }

        return;
      }

      if (lockedMaterialFragment === fragment) {
        lockedMaterialFragment = null;
      }

      const shouldShowMenu = Boolean(dragState && !dragState.moved && !gestureState);
      const longPressTimer = dragState?.longPressTimer;

      fragment.classList.remove("is-dragging");
      window.removeEventListener("pointermove", moveFragment);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
      window.clearTimeout(longPressTimer);
      gestureState = null;

      dragState = null;

      if (shouldShowMenu) {
        showMaterialActionMenu(fragment);
      }
    };

    fragment.addEventListener("pointerdown", (event) => {
      const bin = fragment.closest(".page4-material-bin");
      if (!bin) return;
      event.preventDefault();
      if (lockedMaterialFragment && lockedMaterialFragment !== fragment) {
        event.stopPropagation();
        return;
      }
      lockedMaterialFragment = fragment;
      selectedTouchMaterialFragment = fragment;
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      const fragmentRect = fragment.getBoundingClientRect();
      const binRect = bin.getBoundingClientRect();

      fragment.classList.add("is-dragging");
      prepareMaterialInteraction(fragment);
      bringMaterialForward(fragment);
      fragment.setPointerCapture(event.pointerId);
      window.addEventListener("pointermove", moveFragment, { passive: false });
      window.addEventListener("pointerup", stopDragging);
      window.addEventListener("pointercancel", stopDragging);

      if (activePointers.size >= 2) {
        startGesture();
        return;
      }

      dragState = {
        binRect,
        moved: false,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - (fragmentRect.left + fragmentRect.width / 2),
        offsetY: event.clientY - (fragmentRect.top + fragmentRect.height / 2),
      };
      dragState.longPressTimer = window.setTimeout(() => {
        if (!dragState || dragState.moved) return;
        showMaterialActionMenu(fragment);
      }, 520);

      moveFragment(event);
    });

    fragment.addEventListener("pointermove", moveFragment);
    fragment.addEventListener("pointerup", stopDragging);
    fragment.addEventListener("pointercancel", stopDragging);

    fragment.addEventListener("wheel", (event) => {
      event.preventDefault();
      hideMaterialActionMenu();
      prepareMaterialInteraction(fragment);
      bringMaterialForward(fragment);

      if (event.shiftKey || event.altKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        const direction = wheelDelta > 0 ? 1 : -1;
        markMaterialUsed(fragment);
        setMaterialTransform(fragment, getMaterialScale(fragment), getMaterialRotation(fragment) + direction * 8);
        return;
      }

      const direction = event.deltaY > 0 ? .92 : 1.08;
      markMaterialUsed(fragment);
      setMaterialTransform(fragment, getMaterialScale(fragment) * direction, getMaterialRotation(fragment));
    }, { passive: false });
  };

  materialFragments.forEach(attachMaterialInteraction);

  const page4Screen = app.querySelector(".page4-screen");
  let selectedTouchMaterialFragment = null;
  let touchGestureState = null;

  const getTouchPairInfo = (touches) => {
    if (touches.length < 2) return null;

    const first = touches[0];
    const second = touches[1];
    return {
      center: {
        x: (first.clientX + second.clientX) / 2,
        y: (first.clientY + second.clientY) / 2,
      },
      distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
      angle: Math.atan2(second.clientY - first.clientY, second.clientX - first.clientX) * 180 / Math.PI,
    };
  };

  const startTouchGesture = (event) => {
    if (!selectedTouchMaterialFragment) return;

    const bin = selectedTouchMaterialFragment.closest(".page4-material-bin");
    const pairInfo = getTouchPairInfo(event.touches);
    if (!bin || !pairInfo) return;

    prepareMaterialInteraction(selectedTouchMaterialFragment);
    bringMaterialForward(selectedTouchMaterialFragment);
    hideMaterialActionMenu();

    touchGestureState = {
      binRect: bin.getBoundingClientRect(),
      startCenter: pairInfo.center,
      startDistance: pairInfo.distance || 1,
      startAngle: pairInfo.angle,
      startMaterialCenter: getMaterialCenter(selectedTouchMaterialFragment),
      startScale: getMaterialScale(selectedTouchMaterialFragment),
      startRotation: getMaterialRotation(selectedTouchMaterialFragment),
    };
  };

  const applyTouchGesture = (event) => {
    if (!selectedTouchMaterialFragment) return;
    if (!touchGestureState) startTouchGesture(event);
    if (!touchGestureState) return;

    const pairInfo = getTouchPairInfo(event.touches);
    if (!pairInfo) return;

    const centerX = touchGestureState.startMaterialCenter.x + pairInfo.center.x - touchGestureState.startCenter.x;
    const centerY = touchGestureState.startMaterialCenter.y + pairInfo.center.y - touchGestureState.startCenter.y;
    const scale = touchGestureState.startScale * (pairInfo.distance / touchGestureState.startDistance);
    const rotation = touchGestureState.startRotation + pairInfo.angle - touchGestureState.startAngle;

    markMaterialUsed(selectedTouchMaterialFragment);
    setMaterialCenter(selectedTouchMaterialFragment, touchGestureState.binRect, centerX, centerY);
    setMaterialTransform(selectedTouchMaterialFragment, scale, rotation);
  };

  page4Screen?.addEventListener("touchstart", (event) => {
    const target = event.target instanceof Element ? event.target.closest(".page4-material-fragment") : null;

    if (target && (event.touches.length === 1 || !selectedTouchMaterialFragment)) {
      selectedTouchMaterialFragment = target;
      prepareMaterialInteraction(target);
      bringMaterialForward(target);
    }

    if (selectedTouchMaterialFragment && event.touches.length >= 2) {
      event.preventDefault();
      startTouchGesture(event);
    }
  }, { passive: false });

  page4Screen?.addEventListener("touchmove", (event) => {
    if (!selectedTouchMaterialFragment) return;

    if (event.touches.length >= 2) {
      event.preventDefault();
      applyTouchGesture(event);
    }
  }, { passive: false });

  page4Screen?.addEventListener("touchend", (event) => {
    if (event.touches.length < 2) {
      touchGestureState = null;
    }
  }, { passive: false });

  page4Screen?.addEventListener("gesturestart", (event) => {
    event.preventDefault();
  }, { passive: false });

  page4Screen?.addEventListener("gesturechange", (event) => {
    event.preventDefault();
  }, { passive: false });

  page4Screen?.addEventListener("gestureend", (event) => {
    event.preventDefault();
  }, { passive: false });

  const finishButton = app.querySelector(".page4-finish-button");
  const getComposedMaterialFragments = () => {
    const screen = app.querySelector(".page4-screen");
    const outlineStage = app.querySelector(".page4-outline-stage");
    const outlineRect = outlineStage?.getBoundingClientRect();

    const intersectsRect = (rect, targetRect) => {
      if (!targetRect) return false;
      const overlapX = Math.max(0, Math.min(rect.right, targetRect.right) - Math.max(rect.left, targetRect.left));
      const overlapY = Math.max(0, Math.min(rect.bottom, targetRect.bottom) - Math.max(rect.top, targetRect.top));
      return overlapX * overlapY > 12;
    };

    const isMaterialChanged = (fragment) => {
      const left = parseFloat(fragment.style.getPropertyValue("--material-left"));
      const top = parseFloat(fragment.style.getPropertyValue("--material-top"));
      const homeLeft = parseFloat(fragment.dataset.homeLeft || "");
      const homeTop = parseFloat(fragment.dataset.homeTop || "");
      const scale = parseFloat(fragment.style.getPropertyValue("--material-scale"));
      const rotation = parseFloat(fragment.style.getPropertyValue("--material-user-rot"));

      return (
        (Number.isFinite(left) && Number.isFinite(homeLeft) && Math.abs(left - homeLeft) > .4) ||
        (Number.isFinite(top) && Number.isFinite(homeTop) && Math.abs(top - homeTop) > .4) ||
        (Number.isFinite(scale) && Math.abs(scale - 1) > .02) ||
        (Number.isFinite(rotation) && Math.abs(rotation) > .5)
      );
    };

    return [...app.querySelectorAll(".page4-material-fragment")].filter((fragment) => {
      const rect = fragment.getBoundingClientRect();
      return fragment.dataset.inWorkspace === "true" || intersectsRect(rect, outlineRect) || isMaterialChanged(fragment);
    });
  };

  const autoAssistPage4Composition = () => new Promise((resolve) => {
    const screen = app.querySelector(".page4-screen");
    const bin = app.querySelector(".page4-material-bin");
    const outlineImage = app.querySelector(".page4-outline-image");
    const fragments = getComposedMaterialFragments();

    if (!screen || !bin || !outlineImage || fragments.length === 0) {
      resolve(false);
      return;
    }

    const outlineRect = outlineImage.getBoundingClientRect();
    const binRect = bin.getBoundingClientRect();
    const fragmentRects = fragments.map((fragment) => ({
      fragment,
      rect: fragment.getBoundingClientRect(),
    }));
    const groupRect = fragmentRects.reduce((rect, item) => ({
      left: Math.min(rect.left, item.rect.left),
      top: Math.min(rect.top, item.rect.top),
      right: Math.max(rect.right, item.rect.right),
      bottom: Math.max(rect.bottom, item.rect.bottom),
    }), {
      left: Infinity,
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
    });
    groupRect.width = groupRect.right - groupRect.left;
    groupRect.height = groupRect.bottom - groupRect.top;

    if (groupRect.width <= 0 || groupRect.height <= 0) {
      resolve(false);
      return;
    }

    const groupCenter = {
      x: groupRect.left + groupRect.width / 2,
      y: groupRect.top + groupRect.height / 2,
    };
    const outlineCenter = {
      x: outlineRect.left + outlineRect.width / 2,
      y: outlineRect.top + outlineRect.height / 2,
    };
    const widthCoverage = groupRect.width / outlineRect.width;
    const heightCoverage = groupRect.height / outlineRect.height;
    const centerDistance = Math.hypot(outlineCenter.x - groupCenter.x, outlineCenter.y - groupCenter.y) / Math.min(outlineRect.width, outlineRect.height);
    const shouldReposition = centerDistance > .24 || (widthCoverage < .5 && heightCoverage < .5);
    const targetScale = shouldReposition
      ? clamp(
        Math.min(outlineRect.width * .96 / groupRect.width, outlineRect.height * .96 / groupRect.height),
        .88,
        1.16,
      )
      : 1;
    const centerPull = shouldReposition ? (fragments.length <= 2 ? .55 : .68) : 0;
    const scalePull = shouldReposition ? .54 : 0;
    const maxShift = Math.min(outlineRect.width, outlineRect.height) * (shouldReposition ? .22 : 0);
    const shift = {
      x: clamp((outlineCenter.x - groupCenter.x) * centerPull, -maxShift, maxShift),
      y: clamp((outlineCenter.y - groupCenter.y) * centerPull, -maxShift, maxShift),
    };
    const frameValues = [0, .16, .33, .5, .66, .8, .92, 1];
    const frameDelay = 115;
    const plans = fragmentRects.map(({ fragment, rect }, index) => {
      const currentCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const currentScale = getMaterialScale(fragment);
      const currentRotation = getMaterialRotation(fragment);
      const relative = {
        x: currentCenter.x - groupCenter.x,
        y: currentCenter.y - groupCenter.y,
      };
      const scaledCenter = {
        x: groupCenter.x + relative.x * targetScale + shift.x,
        y: groupCenter.y + relative.y * targetScale + shift.y,
      };
      const edgeNudge = {
        x: shouldReposition ? (currentCenter.x < groupCenter.x ? -Math.abs(shift.x) * .03 : Math.abs(shift.x) * .03) : 0,
        y: shouldReposition ? (currentCenter.y < groupCenter.y ? -Math.abs(shift.y) * .025 : Math.abs(shift.y) * .025) : 0,
      };

      return {
        fragment,
        startCenter: currentCenter,
        endCenter: {
          x: currentCenter.x + (scaledCenter.x + edgeNudge.x - currentCenter.x) * (shouldReposition ? .82 : 0),
          y: currentCenter.y + (scaledCenter.y + edgeNudge.y - currentCenter.y) * (shouldReposition ? .82 : 0),
        },
        startScale: currentScale,
        endScale: clamp(currentScale * (1 + (targetScale - 1) * scalePull), .55, 2.55),
        startRotation: currentRotation,
        endRotation: shouldReposition ? currentRotation * .94 : currentRotation,
        wobbleX: index % 2 === 0 ? 1.8 : -1.8,
        wobbleY: index % 3 === 0 ? -1.3 : 1.3,
      };
    });

    hideMaterialActionMenu();
    screen.classList.add("is-auto-assisting");
    plans.forEach(({ fragment }) => {
      fragment.classList.add("is-auto-assisted");
      fragment.classList.remove("is-dragging");
      fragment.style.animation = "none";
      fragment.style.opacity = "1";
      markMaterialUsed(fragment);
      bringMaterialForward(fragment);
    });

    let frameIndex = 0;
    const playFrame = () => {
      const progress = frameValues[frameIndex];
      const ease = 1 - Math.pow(1 - progress, 2);
      const wobble = progress < 1 ? Math.sin(progress * Math.PI * 4) * (1 - progress) : 0;

      plans.forEach((plan) => {
        const centerX = plan.startCenter.x + (plan.endCenter.x - plan.startCenter.x) * ease + plan.wobbleX * wobble;
        const centerY = plan.startCenter.y + (plan.endCenter.y - plan.startCenter.y) * ease + plan.wobbleY * wobble;
        const scale = plan.startScale + (plan.endScale - plan.startScale) * ease + wobble * .025;
        const rotation = plan.startRotation + (plan.endRotation - plan.startRotation) * ease + wobble * 5;

        setMaterialCenter(plan.fragment, binRect, centerX, centerY);
        setMaterialTransform(plan.fragment, scale, rotation);
      });

      frameIndex += 1;

      if (frameIndex < frameValues.length) {
        window.setTimeout(playFrame, frameDelay);
        return;
      }

      plans.forEach((plan) => {
        setMaterialCenter(plan.fragment, binRect, plan.endCenter.x, plan.endCenter.y);
        setMaterialTransform(plan.fragment, plan.endScale, plan.endRotation);
        plan.fragment.classList.remove("is-auto-assisted");
      });
      screen.classList.remove("is-auto-assisting");
      resolve(true);
    };

    playFrame();
  });

  const capturePage4Composition = () => {
    const screen = app.querySelector(".page4-screen");
    const screenRect = screen?.getBoundingClientRect();
    const outlineStage = app.querySelector(".page4-outline-stage");
    const outlineStageRect = outlineStage?.getBoundingClientRect();
    const referenceRect = outlineStageRect || screenRect;
    if (!screenRect || !referenceRect) return [];

    return getComposedMaterialFragments().map((fragment, index) => {
      const rect = fragment.getBoundingClientRect();
      const computedStyle = getComputedStyle(fragment);
      const bgSize = fragment.style.getPropertyValue("--material-bg-size");
      const bgPos = fragment.style.getPropertyValue("--material-bg-pos");
      const [bgSizeX, bgSizeY] = parsePercentPair(bgSize, [100, 100]);
      const [bgPosX, bgPosY] = parsePercentPair(bgPos, [50, 50]);
      const imageLeft = (100 - bgSizeX) * bgPosX / 100;
      const imageTop = (100 - bgSizeY) * bgPosY / 100;
      const left = ((rect.left + rect.width / 2 - referenceRect.left) / referenceRect.width) * 100;
      const top = ((rect.top + rect.height / 2 - referenceRect.top) / referenceRect.height) * 100;
      const baseWidth = parseFloat(computedStyle.width) || rect.width;
      const width = (baseWidth / referenceRect.width) * 100;

      return {
        coordinateSpace: outlineStageRect ? "page4-outline-stage" : "screen",
        className: [...fragment.classList]
          .filter((item) => item !== "is-dragging" && item !== "page4-material-fragment")
          .join(" "),
        left: Number(left.toFixed(3)),
        top: Number(top.toFixed(3)),
        width: Number(width.toFixed(3)),
        ratio: fragment.style.getPropertyValue("--material-ratio") || "1",
        rot: fragment.style.getPropertyValue("--material-rot") || "0deg",
        userRot: fragment.style.getPropertyValue("--material-user-rot") || "0deg",
        scale: fragment.style.getPropertyValue("--material-scale") || "1",
        image: fragment.style.getPropertyValue("--material-image"),
        src: getCssUrlValue(fragment.style.getPropertyValue("--material-image")),
        bgSize,
        bgPos,
        bgSizeX: `${bgSizeX}%`,
        bgSizeY: `${bgSizeY}%`,
        imageLeft: `${imageLeft}%`,
        imageTop: `${imageTop}%`,
        clip: fragment.style.getPropertyValue("--material-clip") || "inset(0)",
        zIndex: parseInt(fragment.style.zIndex, 10) || index + 2,
      };
    });
  };

  const pressFinishButton = (event) => {
    const screen = event.currentTarget.closest(".page4-screen");
    screen?.classList.add("is-finishing-work");
  };

  const releaseFinishButton = (event) => {
    const screen = event.currentTarget.closest(".page4-screen");
    window.setTimeout(() => {
      screen?.classList.remove("is-finishing-work");
    }, 150);
  };

  finishButton?.addEventListener("pointerdown", pressFinishButton);
  finishButton?.addEventListener("pointerup", releaseFinishButton);
  finishButton?.addEventListener("pointerleave", releaseFinishButton);
  finishButton?.addEventListener("pointercancel", releaseFinishButton);
  finishButton?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page4-screen");
    if (button.dataset.finishing === "true") return;

    button.dataset.finishing = "true";
    pressFinishButton(event);
    try {
      await autoAssistPage4Composition();
      const capturedComposition = capturePage4Composition();
      if (capturedComposition.length > 0) {
        page5Composition = capturedComposition;
        savePage5Composition(page5Composition);
      } else if (page5Composition.length > 0) {
        savePage5Composition(page5Composition);
      }
    } finally {
      window.setTimeout(() => {
        screen?.classList.remove("is-finishing-work");
      }, 150);
      delete button.dataset.finishing;
    }

    window.setTimeout(() => {
      window.location.hash = "page5";
      renderRoute();
    }, 320);
  });

  app.querySelector(".page4-back-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page4-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-going-page3");

    window.setTimeout(() => {
      window.location.hash = "page3";
      renderRoute();
    }, 260);
  });
}

function renderPage5() {
  page5ReportBlobPromise = null;
  const selectedClothing = getSelectedClothing();
  const storedPage4ProductName = window.sessionStorage.getItem("selectedPage4ProductName") || window.localStorage.getItem("selectedPage4ProductName") || selectedPage4ProductName;
  const selectedPage4Product = PAGE4_PRODUCTS.find((item) => item.name === storedPage4ProductName) || PAGE4_PRODUCTS[0];
  const resultStats = generatePage5Stats();
  const sessionComposition = parseStoredComposition(window.sessionStorage.getItem("page5Composition"));
  const localComposition = parseStoredComposition(window.localStorage.getItem("page5Composition"));
  const backupComposition = Array.isArray(window.__page5CompositionBackup) ? window.__page5CompositionBackup : [];
  const composition = page5Composition.length > 0
    ? page5Composition
    : backupComposition.length > 0
      ? backupComposition
      : sessionComposition.length > 0
        ? sessionComposition
        : localComposition;
  const normalizedComposition = composition.map((piece) => {
    const bgSize = piece.bgSize || "100% 100%";
    const bgPos = piece.bgPos || "50% 50%";
    const [bgSizeX, bgSizeY] = parsePercentPair(bgSize, [100, 100]);
    const [bgPosX, bgPosY] = parsePercentPair(bgPos, [50, 50]);

    return {
      ...piece,
      src: piece.src || getCssUrlValue(piece.image || ""),
      bgSizeX: piece.bgSizeX || `${bgSizeX}%`,
      bgSizeY: piece.bgSizeY || `${bgSizeY}%`,
      imageLeft: piece.imageLeft || `${(100 - bgSizeX) * bgPosX / 100}%`,
      imageTop: piece.imageTop || `${(100 - bgSizeY) * bgPosY / 100}%`,
      displayLeft: piece.coordinateSpace === "page4-outline-stage"
        ? Number((piece.left || 0).toFixed(3))
        : Number((((piece.left || 0) - PAGE5_COMPOSITION_FRAME.left) / PAGE5_COMPOSITION_FRAME.width * 100).toFixed(3)),
      displayTop: piece.coordinateSpace === "page4-outline-stage"
        ? Number((piece.top || 0).toFixed(3))
        : Number((((piece.top || 0) - PAGE5_COMPOSITION_FRAME.top) / PAGE5_COMPOSITION_FRAME.height * 100).toFixed(3)),
      displayWidth: piece.coordinateSpace === "page4-outline-stage"
        ? Number((piece.width || 0).toFixed(3))
        : Number(((piece.width || 0) / PAGE5_COMPOSITION_FRAME.width * 100).toFixed(3)),
    };
  });

  app.innerHTML = `
    <section class="page5-screen page5-entering" aria-label="作品对比页面">
      <img class="page5-bg" src="${PAGE5_ASSETS.background}" alt="" draggable="false" />
      <div class="page5-work-composition" aria-label="完成作品">
        <div class="page5-outline-stage" aria-hidden="true">
          <img class="page5-outline-image" data-product="${selectedPage4Product.name}" src="${selectedPage4Product.outlineSrc}" alt="" draggable="false" />
        </div>
        <div class="page5-material-composition" aria-label="完成作品布料组合">
          ${normalizedComposition.map((piece, index) => `
            <div
              class="page5-material-fragment ${piece.className || ""}"
              aria-hidden="true"
              style="z-index: ${piece.zIndex || index + 2}; --page5-left: ${piece.displayLeft}%; --page5-top: ${piece.displayTop}%; --page5-width: ${piece.displayWidth}%; --material-ratio: ${piece.ratio}; --material-rot: ${piece.rot}; --material-user-rot: ${piece.userRot || "0deg"}; --material-scale: ${piece.scale || "1"}; --material-image: none; --material-bg-size: ${piece.bgSize}; --material-bg-pos: ${piece.bgPos}; --material-img-width: ${piece.bgSizeX || "100%"}; --material-img-height: ${piece.bgSizeY || "100%"}; --material-img-left: ${piece.imageLeft || "0%"}; --material-img-top: ${piece.imageTop || "0%"}; --material-clip: ${piece.clip};"
            >
              ${piece.src ? `<img class="page5-material-fallback" src="${escapeAttribute(piece.src)}" alt="" draggable="false" />` : ""}
            </div>
          `).join("")}
        </div>
      </div>
      <div class="page5-compare-panel" aria-label="新旧对比">
        <div class="page5-compare-item page5-old-item">
          ${selectedClothing?.detailSrc ? `<img src="${selectedClothing.detailSrc}" alt="" draggable="false" />` : ""}
        </div>
      </div>
      <img class="page5-report-title" src="${PAGE5_ASSETS.reportTitle}" alt="" draggable="false" aria-hidden="true" />
      <div class="page5-transform-labels" aria-label="改造前后标签">
        <img class="page5-transform-label page5-transform-before" src="${PAGE5_ASSETS.beforeLabel}" alt="改造前" draggable="false" />
        <img class="page5-transform-label page5-transform-arrow" src="${PAGE5_ASSETS.arrowLabel}" alt="" draggable="false" aria-hidden="true" />
        <img class="page5-transform-label page5-transform-after" src="${PAGE5_ASSETS.afterLabel}" alt="改造后" draggable="false" />
      </div>
      <img class="page5-result-panel" src="${PAGE5_ASSETS.result}" alt="" draggable="false" aria-hidden="true" />
      <div class="page5-result-stats" aria-label="本次改造成果数据">
        <span class="page5-result-stat page5-result-stat-time">${resultStats.duration}</span>
        <span class="page5-result-stat page5-result-stat-carbon">${resultStats.carbon}</span>
        <span class="page5-result-stat page5-result-stat-materials">${resultStats.materials}</span>
        <span class="page5-result-stat page5-result-stat-inspiration">${resultStats.inspiration}</span>
      </div>
      <div class="page5-result-actions" aria-label="成果操作">
        <button class="page5-result-action-button" type="button" data-action="continue" aria-label="继续改造">
          <img class="page5-result-action-card" src="${PAGE5_ASSETS.continueCard}" alt="" draggable="false" />
        </button>
        <button class="page5-result-action-button" type="button" data-action="share" aria-label="分享成果">
          <img class="page5-result-action-card" src="${PAGE5_ASSETS.shareCard}" alt="" draggable="false" />
        </button>
      </div>
      <img class="page5-back-image" src="${PAGE5_ASSETS.back}" alt="" draggable="false" aria-hidden="true" />
      <button class="page5-back-button" type="button" aria-label="返回海边改造工坊"></button>
      <div class="page5-bottom-button-cover page5-home-cover" aria-hidden="true"></div>
      <div class="page5-bottom-button-visual page5-home-visual" aria-hidden="true">
        <img class="page5-bottom-button-sprite page5-home-sprite" src="${PAGE5_ASSETS.background}" alt="" draggable="false" />
      </div>
      <button class="page5-home-button" type="button" aria-label="返回首页"></button>
      <div class="page5-bottom-button-cover page5-save-cover" aria-hidden="true"></div>
      <div class="page5-bottom-button-visual page5-save-visual" aria-hidden="true">
        <img class="page5-bottom-button-sprite page5-save-sprite" src="${PAGE5_ASSETS.background}" alt="" draggable="false" />
      </div>
      <button class="page5-save-button" type="button" aria-label="保存作品"></button>
    </section>
  `;

  const page5Screen = app.querySelector(".page5-screen");
  window.setTimeout(() => {
    page5Screen?.classList.remove("page5-entering");
    page5ReportBlobPromise = buildPage5ReportBlob().catch((error) => {
      page5ReportBlobPromise = null;
      return null;
    });
  }, 6400);

  const setupPage5BottomButton = (selector, stateClass, onClick, needsUserActivation = false) => {
    const button = app.querySelector(selector);
    const pressButton = (event) => {
      const screen = event.currentTarget.closest(".page5-screen");
      screen?.classList.add(stateClass);
    };
    const releaseButton = (event) => {
      const screen = event.currentTarget.closest(".page5-screen");
      window.setTimeout(() => {
        screen?.classList.remove(stateClass);
      }, 150);
    };

    button?.addEventListener("pointerdown", pressButton);
    button?.addEventListener("pointerup", releaseButton);
    button?.addEventListener("pointerleave", releaseButton);
    button?.addEventListener("pointercancel", releaseButton);
    button?.addEventListener("click", async (event) => {
      const clickedButton = event.currentTarget;
      const screen = clickedButton.closest(".page5-screen");

      if (clickedButton.dataset.pressing === "true") return;

      clickedButton.dataset.pressing = "true";
      screen?.classList.add(stateClass);

      const runAction = async () => {
        delete clickedButton.dataset.pressing;
        try {
          await onClick?.();
        } catch (error) {
          if (error?.name !== "AbortError") {
            window.alert(error?.message || "操作没有成功，请再试一次。");
          }
        } finally {
          screen?.classList.remove(stateClass);
        }
      };

      if (needsUserActivation) {
        runAction();
        return;
      }

      window.setTimeout(runAction, 260);
    });
  };

  setupPage5BottomButton(".page5-home-button", "is-going-home", () => {
    window.location.hash = "home";
    renderRoute();
  });
  setupPage5BottomButton(".page5-save-button", "is-saving-work", async () => {
    try {
      await saveCurrentReport();
    } catch (error) {
      if (error?.name !== "AbortError") {
        window.alert("当前手机浏览器不允许网页直接生成相册图片。请使用系统截图保存这张重生报告，或用“分享成果”发送页面链接。");
      }
    }
  }, true);

  app.querySelectorAll(".page5-result-action-button").forEach((button) => {
    const releaseActionButton = () => {
      window.setTimeout(() => {
        button.classList.remove("is-pressing");
      }, 150);
    };

    button.addEventListener("pointerdown", () => {
      button.classList.add("is-pressing");
    });
    button.addEventListener("pointerup", releaseActionButton);
    button.addEventListener("pointerleave", releaseActionButton);
    button.addEventListener("pointercancel", releaseActionButton);
    button.addEventListener("click", async () => {
      button.classList.add("is-pressing");
      releaseActionButton();

      if (button.dataset.action === "continue") {
        window.setTimeout(() => {
          window.location.hash = "page2";
          renderRoute();
        }, 260);
      }

      if (button.dataset.action === "share") {
        try {
          await shareCurrentResult();
        } catch (error) {
          if (error?.name !== "AbortError") {
            window.alert(error?.message || "分享没有成功，请再试一次。");
          }
        }
      }
    });
  });

  app.querySelector(".page5-back-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const screen = button.closest(".page5-screen");

    if (button.dataset.pressing === "true") return;

    button.dataset.pressing = "true";
    screen?.classList.add("is-going-page4");

    window.setTimeout(() => {
      window.location.hash = "page4";
      renderRoute();
    }, 260);
  });
}

function renderRoute() {
  if (window.location.hash === "#page5") {
    app.dataset.route = "page5";
    renderPage5();
    return;
  }

  if (window.location.hash === "#page4") {
    app.dataset.route = "page4";
    renderPage4();
    return;
  }

  if (window.location.hash === "#page3") {
    app.dataset.route = "page3";
    renderPage3();
    return;
  }

  if (window.location.hash === "#page2") {
    app.dataset.route = "page2";
    renderPage2();
    return;
  }

  app.dataset.route = "home";
  renderHome();
}

document.documentElement.style.setProperty("--home-material", `url("${HOME_ASSETS.material}")`);

window.addEventListener("hashchange", renderRoute);
renderRoute();
