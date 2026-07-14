const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

/* ============================================================
   CẤU HÌNH SỐ LIỆU — sửa số thật tại đây
   costPerWash: chi phí mỗi lần giặt (đ) theo định mức khuyến nghị
   ============================================================ */
const CALC_CONFIG = {
  zeo: {
    label: "ZeO — nước giặt cao cấp",
    costPerWashCfc: 4200,
    costPerWashMarket: 5500,
    hint: "ZeO đậm đặc gấp đôi: 1 nắp nhỏ cho mỗi mẻ giặt, ít hao hơn hẳn nước giặt loãng cùng phân khúc.",
    rows: [
      ["Chi phí mỗi lần giặt", "4.200đ so với 5.500đ", true],
      ["Công nghệ enzyme Đan Mạch", "sạch sâu hơn"],
      ["Lành với da nhạy cảm", "an tâm cho bé"],
    ],
  },
  oplus: {
    label: "Oplus — giặt xả 2 trong 1",
    costPerWashCfc: 3500,
    costPerWashMarket: 4800,
    hint: "Oplus 2 trong 1 nên không phải mua thêm nước xả — tiết kiệm kép cho mỗi mẻ giặt.",
    rows: [
      ["Chi phí mỗi lần giặt", "3.500đ so với 4.800đ", true],
      ["Khỏi mua nước xả riêng", "tiết kiệm kép"],
      ["Lưu hương công nghệ Pháp", "thơm 72 giờ"],
    ],
  },
  pano: {
    label: "PANO — phổ thông tiết kiệm",
    costPerWashCfc: 2800,
    costPerWashMarket: 3600,
    hint: "PANO cho gia đình đông người: giá phổ thông nhưng vẫn chuẩn sạch và thơm dịu CFC Homecare.",
    rows: [
      ["Chi phí mỗi lần giặt", "2.800đ so với 3.600đ", true],
      ["Dung tích lớn", "hợp gia đình đông người"],
      ["Thơm dịu nhẹ", "nâng niu cảm xúc"],
    ],
  },
};
const WEEKS_PER_MONTH = 4.33;

/* ============================================================
   TABS + TOPBAR
   ============================================================ */
function activateTab(tabId) {
  const button = $(`.nav-item[data-tab="${tabId}"]`);
  if (!button) return;
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
  $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  $("#pageTitle").textContent = button.dataset.title;
  $("#pageSub").textContent = button.dataset.sub;
  requestAnimationFrame(() => {
    $$(`#${tabId} .reveal`).forEach((el, i) => {
      el.classList.remove("in");
      window.setTimeout(() => el.classList.add("in"), 60 + i * 70);
    });
  });
}

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});
$$("[data-goto]").forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.goto));
});

/* reveal khi cuộn */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ============================================================
   TAB 1 — CANVAS CREATOR (layout chuẩn mẫu Cò Bay)
   ============================================================ */
const canvas = $("#brandCanvas");
const ctx = canvas.getContext("2d");

const logoZ = {
  purple: Object.assign(new Image(), { src: "./assets/logo-z-purple.png" }),
  blue: Object.assign(new Image(), { src: "./assets/logo-z-blue.png" }),
};

const ratios = {
  "4:3": [1600, 1200],
  "1:1": [1400, 1400],
  "16:9": [1920, 1080],
  "9:16": [1080, 1920],
};

const state = {
  ratio: "4:3",
  frame: "purple",
  uploadedImage: null,
  nppLogo: null,
  batchImages: [],
  batchRows: [],
};

const PALETTES = {
  purple: {
    bg: ["#23092f", "#0d0513"],
    glow: "rgba(192, 77, 240, 0.2)",
    accent: "#c04df0",
    check: "#e84c8b",
    pill: ["#8419a3", "#c04df0"],
  },
  blue: {
    bg: ["#08203f", "#040d1c"],
    glow: "rgba(0, 196, 232, 0.18)",
    accent: "#00c4e8",
    check: "#6fe0ff",
    pill: ["#1a5fd4", "#00c4e8"],
  },
};

const FONT_DISP = "Montserrat, Arial, sans-serif";
const FONT_BODY = "'Be Vietnam Pro', Arial, sans-serif";

function readForm() {
  return {
    name: $("#dealerName").value.trim() || "Đại lý CFC Homecare",
    area: $("#dealerArea").value.trim() || "Khu vực phân phối",
    phone: $("#dealerPhone").value.trim() || "0900 000 000",
    note: $("#dealerNote").value.trim() || "Phân phối CFC Homecare chính hãng",
    showBrandNames: $("#showBrandNames").checked,
  };
}

function setCanvasRatio(ratio) {
  const [width, height] = ratios[ratio];
  canvas.width = width;
  canvas.height = height;
  $("#canvasMeta").textContent = `${ratio} — ${width} × ${height} px`;
  drawCanvas();
}

function addRoundedRect(path, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  path.moveTo(x + r, y);
  path.arcTo(x + width, y, x + width, y + height, r);
  path.arcTo(x + width, y + height, x, y + height, r);
  path.arcTo(x, y + height, x, y, r);
  path.arcTo(x, y, x + width, y, r);
  path.closePath();
}

function roundedRect(x, y, width, height, radius) {
  const path = new Path2D();
  addRoundedRect(path, x, y, width, height, radius);
  return path;
}

/* bố cục khung — mọi toạ độ tính từ đây */
function frameMetrics(width, height) {
  const unit = Math.min(width, height);
  const m = Math.round(unit * 0.06);
  const chip = Math.round(unit * 0.115);
  const chipY = Math.round(m * 0.75);
  const checkY = chipY + chip + Math.round(unit * 0.042);
  const winY = checkY + Math.round(unit * 0.028);
  const footerH = Math.round(unit * 0.245);
  const winH = height - winY - footerH - Math.round(unit * 0.02);
  return {
    unit,
    m,
    chip,
    chipY,
    checkY,
    winX: m,
    winY,
    winW: width - m * 2,
    winH,
    winR: Math.round(unit * 0.035),
    footTop: winY + winH + Math.round(unit * 0.045),
  };
}

function drawCoverImage(img, x, y, width, height) {
  const scale = Math.max(width / img.width, height / img.height);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
}

/* ảnh logo vẽ "contain" trong khung cho trước */
function drawContainImage(img, x, y, width, height) {
  const scale = Math.min(width / img.width, height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, x + (width - w) / 2, y + (height - h) / 2, w, h);
}

/* chữ tự co cho vừa maxWidth — trả về size đã chốt */
function fitText(text, weight, baseSize, font, maxWidth) {
  let size = baseSize;
  ctx.font = `${weight} ${Math.round(size)}px ${font}`;
  while (size > 10 && ctx.measureText(text).width > maxWidth) {
    size *= 0.94;
    ctx.font = `${weight} ${Math.round(size)}px ${font}`;
  }
  return size;
}

/* bẻ dòng theo maxWidth, tối đa maxLines (dòng cuối thêm …) */
function wrapLines(text, maxWidth, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && line && lines[maxLines - 1] !== line) {
    let last = lines[maxLines - 1];
    while (last && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1).trimEnd();
    }
    lines[maxLines - 1] = `${last}…`;
  }
  return lines;
}

/* ghim vị trí nhỏ trước dòng khu vực */
function drawPin(x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y - size * 0.25, size * 0.42, Math.PI * 0.95, Math.PI * 2.05);
  ctx.lineTo(x, y + size * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.beginPath();
  ctx.arc(x, y - size * 0.25, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWindowPlaceholder(mtr) {
  const { winX, winY, winW, winH, unit } = mtr;
  const cx = winX + winW / 2;
  const cy = winY + winH / 2;

  /* biểu tượng máy ảnh */
  const iw = Math.min(unit * 0.11, winW * 0.2);
  const ih = iw * 0.74;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.lineWidth = Math.max(2, Math.round(unit * 0.004));
  ctx.stroke(roundedRect(cx - iw / 2, cy - ih * 0.75, iw, ih, iw * 0.12));
  ctx.beginPath();
  ctx.arc(cx, cy - ih * 0.75 + ih / 2, ih * 0.27, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.textAlign = "center";
  fitText('Bấm "Ảnh nền / sản phẩm" để thêm ảnh', "500", unit * 0.026, FONT_BODY, winW * 0.85);
  ctx.fillText('Bấm "Ảnh nền / sản phẩm" để thêm ảnh', cx, cy + ih * 0.75);
}

function drawCanvas(customData) {
  const data = customData || readForm();
  /* ảnh nền/logo: ưu tiên ảnh riêng của từng dòng (batch), nếu không có thì dùng ảnh đơn đang chọn */
  const bgImage = (data && data.bgImage) || state.uploadedImage;
  const logoImage = (data && data.logoImage) || state.nppLogo;
  const { width, height } = canvas;
  const palette = PALETTES[state.frame];
  const mtr = frameMetrics(width, height);
  const { unit, m, chip, chipY, checkY, winX, winY, winW, winH, winR, footTop } = mtr;

  /* ---------- nền ---------- */
  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, palette.bg[0]);
  bg.addColorStop(1, palette.bg[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(width * 0.85, 0, 0, width * 0.85, 0, width * 0.7);
  glow.addColorStop(0, palette.glow);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  /* ---------- cửa sổ ảnh ---------- */
  const winPath = roundedRect(winX, winY, winW, winH, winR);
  if (bgImage) {
    ctx.save();
    ctx.clip(winPath);
    drawCoverImage(bgImage, winX, winY, winW, winH);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.035)";
    ctx.fill(winPath);
    ctx.restore();
    drawWindowPlaceholder(mtr);
  }
  ctx.save();
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = Math.max(2.5, Math.round(unit * 0.004));
  ctx.shadowColor = palette.glow;
  ctx.shadowBlur = Math.round(unit * 0.02);
  ctx.stroke(winPath);
  ctx.restore();

  /* ---------- header: chip logo Z + thương hiệu ---------- */
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = Math.round(unit * 0.014);
  ctx.shadowOffsetY = Math.round(unit * 0.004);
  ctx.fill(roundedRect(m, chipY, chip, chip, chip * 0.24));
  ctx.restore();
  const zLogo = logoZ[state.frame];
  if (zLogo.complete && zLogo.naturalWidth) {
    drawContainImage(zLogo, m + chip * 0.14, chipY + chip * 0.14, chip * 0.72, chip * 0.72);
  }

  const textX = m + chip + unit * 0.032;
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${Math.round(unit * 0.046)}px ${FONT_DISP}`;
  ctx.fillText("CFC HOMECARE", textX, chipY + chip * 0.47);
  ctx.fillStyle = "rgba(255,255,255,0.66)";
  ctx.font = `500 ${Math.round(unit * 0.025)}px ${FONT_BODY}`;
  ctx.fillText("Chăm sóc gia đình", textX, chipY + chip * 0.82);

  /* dòng xác nhận chính hãng (cố định) */
  ctx.fillStyle = palette.check;
  ctx.font = `700 ${Math.round(unit * 0.024)}px ${FONT_DISP}`;
  ctx.fillText("✓ NHÀ PHÂN PHỐI CHÍNH THỨC CỦA CFC HOMECARE", m, checkY);

  /* ---------- chip logo NPP (góc phải, nếu có) ---------- */
  const hasLogo = logoImage && logoImage.complete && logoImage.naturalWidth;
  if (hasLogo) {
    const chipX2 = width - m - chip;
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = Math.round(unit * 0.014);
    ctx.shadowOffsetY = Math.round(unit * 0.004);
    ctx.fill(roundedRect(chipX2, chipY, chip, chip, chip * 0.24));
    ctx.restore();
    drawContainImage(logoImage, chipX2 + chip * 0.12, chipY + chip * 0.12, chip * 0.76, chip * 0.76);
  }

  /* ---------- footer ---------- */
  /* brandname pill (tuỳ chọn) — góc phải dưới, chừa chỗ trước khi vẽ chữ */
  const pillFontSize = Math.round(unit * 0.026);
  let brandW = 0;
  if (data.showBrandNames) {
    ctx.font = `800 ${pillFontSize}px ${FONT_DISP}`;
    brandW = ctx.measureText("ZeO — Oplus — PANO").width + pillFontSize * 1.9;
  }

  /* tên NPP/Đại lý */
  const name = data.name.toUpperCase();
  const nameSize = fitText(name, "900", unit * 0.052, FONT_DISP, width - m * 2);
  const nameY = footTop + nameSize * 0.82;
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, m, nameY);

  /* mô tả (tối đa 2 dòng) */
  const noteSize = Math.round(unit * 0.026);
  const noteLineH = Math.round(noteSize * 1.45);
  ctx.font = `500 ${noteSize}px ${FONT_BODY}`;
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  const noteLines = wrapLines(data.note, width - m * 2 - brandW - unit * 0.02, 2);
  noteLines.forEach((line, i) => {
    ctx.fillText(line, m, nameY + noteLineH * (i + 1) + unit * 0.006);
  });

  /* hàng liên hệ: pill SĐT + khu vực */
  const rowY = nameY + noteLineH * noteLines.length + unit * 0.028;
  const pillH = Math.round(unit * 0.062);
  ctx.font = `800 ${Math.round(pillH * 0.5)}px ${FONT_DISP}`;
  const phoneW = ctx.measureText(data.phone).width + pillH * 1.15;
  const pillGrad = ctx.createLinearGradient(m, 0, m + phoneW, 0);
  pillGrad.addColorStop(0, palette.pill[0]);
  pillGrad.addColorStop(1, palette.pill[1]);
  ctx.save();
  ctx.fillStyle = pillGrad;
  ctx.shadowColor = palette.glow;
  ctx.shadowBlur = Math.round(unit * 0.02);
  ctx.fill(roundedRect(m, rowY, phoneW, pillH, pillH / 2));
  ctx.restore();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(data.phone, m + phoneW / 2, rowY + pillH * 0.66);

  /* khu vực + ghim */
  const areaSize = Math.round(unit * 0.025);
  const areaX = m + phoneW + unit * 0.035;
  const areaMaxW = width - areaX - m - brandW - unit * 0.02;
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.66)";
  if (areaMaxW > unit * 0.12) {
    drawPin(areaX + areaSize * 0.35, rowY + pillH * 0.52, areaSize * 1.05, palette.accent);
    fitText(data.area, "600", areaSize, FONT_BODY, areaMaxW - areaSize * 1.4);
    ctx.fillText(data.area, areaX + areaSize * 1.1, rowY + pillH * 0.66);
  }

  /* brandname pill */
  if (data.showBrandNames) {
    const pillY = rowY + (pillH - pillFontSize * 1.9) / 2;
    const bh = Math.round(pillFontSize * 1.9);
    const bx = width - m - brandW;
    const pill = roundedRect(bx, pillY, brandW, bh, bh / 2);
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fill(pill);
    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = Math.max(1.5, Math.round(unit * 0.0015));
    ctx.stroke(pill);
    ctx.restore();
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${pillFontSize}px ${FONT_DISP}`;
    ctx.textAlign = "center";
    ctx.fillText("ZeO — Oplus — PANO", bx + brandW / 2, pillY + bh * 0.66);
  }
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "cfc-homecare";
}

/* mỗi dòng batch = { data:{...}, bg:Image|null, logo:Image|null } */
function parseBatchRows() {
  const base = readForm();
  return $("#batchInput").value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, area, phone, note] = line.split(",").map((part) => part.trim());
      return {
        data: {
          ...base,
          name: name || "Đại lý CFC Homecare",
          area: area || "Khu vực phân phối",
          phone: phone || "0900 000 000",
          note: note || "Phân phối CFC Homecare chính hãng",
        },
        bg: null,
        logo: null,
      };
    });
}

/* dựng lại danh sách dòng, giữ ảnh đã gán cho khách trùng tên */
function makeBatchPreview() {
  const previous = state.batchRows || [];
  state.batchRows = parseBatchRows().map((row) => {
    const existing = previous.find((p) => p.data.name === row.data.name);
    if (existing) { row.bg = existing.bg; row.logo = existing.logo; }
    return row;
  });
  renderBatchGallery();
}

/* vẽ preview + gói url để tải; mỗi dòng dùng ảnh riêng nếu có */
function renderBatchGallery() {
  const gallery = $("#batchGallery");
  gallery.innerHTML = "";
  state.batchImages = [];
  (state.batchRows || []).forEach((row, index) => {
    drawCanvas({ ...row.data, bgImage: row.bg, logoImage: row.logo });
    const url = canvas.toDataURL("image/png");
    const filename = `cfc-homecare-${slugify(row.data.name)}-${state.ratio.replace(":", "x")}.png`;
    state.batchImages.push({ url, filename, item: row.data });

    const tags = [row.bg ? "ảnh nền" : null, row.logo ? "logo" : null].filter(Boolean).join(" + ");
    const card = document.createElement("div");
    card.className = "batch-card";
    card.style.animationDelay = `${index * 70}ms`;
    card.innerHTML =
      `<img src="${url}" alt="${escapeHtml(row.data.name)}">` +
      `<div class="batch-card-meta">${escapeHtml(row.data.name)}` +
      (tags ? ` · <span class="ok">có ${tags}</span>` : "") +
      `</div><button type="button">Tải ${escapeHtml(row.data.name)}</button>`;
    card.querySelector("button").addEventListener("click", () => downloadDataUrl(url, filename));
    gallery.appendChild(card);
  });
  drawCanvas();
}

/* tải lên hàng loạt ảnh — ghép theo TÊN khách trong tên file; có "logo" trong tên → logo, còn lại → ảnh nền */
function handleBatchImages(files) {
  if (!files.length) return;
  if (!state.batchRows || !state.batchRows.length) makeBatchPreview();
  let matched = 0;
  const unmatched = [];
  let pending = files.length;
  const finish = () => {
    if (pending > 0) return;
    let msg = `Đã gán ${matched}/${files.length} ảnh cho ${state.batchRows.length} khách.`;
    if (unmatched.length) {
      msg += ` Bỏ qua (tên file không khớp khách nào): ${unmatched.slice(0, 4).join(", ")}${unmatched.length > 4 ? "…" : ""}`;
    }
    $("#batchImgStat").textContent = msg;
    renderBatchGallery();
  };
  files.forEach((file) => {
    const fileSlug = slugify(file.name.replace(/\.[^.]+$/, ""));
    const isLogo = /(^|-)(logo)(-|$)/.test(fileSlug);
    const key = fileSlug.replace(/-(logo|nen|anh-nen|background|bg|anh)$/g, "").replace(/^(logo|nen)-/g, "");
    const row = (state.batchRows || []).find((r) => {
      const rowSlug = slugify(r.data.name);
      return rowSlug && (fileSlug.startsWith(rowSlug) || rowSlug.includes(key) || key.includes(rowSlug));
    });
    if (!row) { unmatched.push(file.name); pending -= 1; finish(); return; }
    const img = new Image();
    img.onload = () => {
      if (isLogo) row.logo = img; else row.bg = img;
      matched += 1; pending -= 1; finish();
    };
    img.onerror = () => { unmatched.push(file.name); pending -= 1; finish(); };
    img.src = URL.createObjectURL(file);
  });
}

$$(".ratio-option").forEach((button) => {
  button.addEventListener("click", () => {
    state.ratio = button.dataset.ratio;
    $$(".ratio-option").forEach((item) => item.classList.toggle("active", item === button));
    setCanvasRatio(state.ratio);
  });
});

$$(".frame-option").forEach((button) => {
  button.addEventListener("click", () => {
    state.frame = button.dataset.frame;
    $$(".frame-option").forEach((item) => item.classList.toggle("active", item === button));
    drawCanvas();
  });
});

function bindImageInput(inputId, onLoad) {
  $(inputId).addEventListener("change", (event) => {
    const file = event.target.files[0];
    const control = event.target.closest(".file-control");
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      onLoad(img);
      if (control) control.classList.add("has-file");
      drawCanvas();
    };
    img.src = URL.createObjectURL(file);
  });
}
bindImageInput("#photoInput", (img) => { state.uploadedImage = img; });
bindImageInput("#nppLogoInput", (img) => { state.nppLogo = img; });

$("#resetImage").addEventListener("click", () => {
  state.uploadedImage = null;
  $("#photoInput").value = "";
  const control = $("#photoInput").closest(".file-control");
  if (control) control.classList.remove("has-file");
  drawCanvas();
});

["dealerName", "dealerArea", "dealerPhone", "dealerNote", "showBrandNames"].forEach((id) => {
  $(`#${id}`).addEventListener("input", () => drawCanvas());
  $(`#${id}`).addEventListener("change", () => drawCanvas());
});

/* ============================================================
   DANH SÁCH KHÁCH HÀNG — dropdown tự điền
   Nguồn chính: Google Sheet phòng kinh doanh, đọc trực tiếp mỗi lần mở app
   (sheet cần chia sẻ "Bất kỳ ai có đường liên kết – Người xem").
   Khách nhập tay được lưu trên máy (localStorage) để dùng lại lần sau.
   ============================================================ */
const SHEET_ID = "1NcdN0cMitE02npXlYqvVhJ90KjVMebNWn49x_ntlnns";
const SHEET_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const MANUAL_KEY = "cfc_homecare_manual_dealers";

function parseSheetCSV(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function rowsToDealers(rows) {
  const headerIdx = rows.findIndex((r) => r.some((c) => /tên khách hàng|ten khach hang/i.test(c)));
  if (headerIdx < 0) return [];
  const header = rows[headerIdx].map((c) => (c || "").trim().toLowerCase());
  const col = (names) => header.findIndex((c) => names.some((n) => c.includes(n)));
  const cName = col(["tên khách", "ten khach", "tên đại lý"]);
  const cAddr = col(["địa chỉ", "dia chi"]);
  const cPhone = col(["sdt", "sđt", "điện thoại"]);
  const cProduct = col(["sản phẩm", "san pham"]);
  if (cName < 0) return [];
  const out = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const ten = ((r[cName] || "") + "").trim();
    if (!ten) continue;
    out.push({
      ten,
      sdt: cPhone >= 0 ? ((r[cPhone] || "") + "").trim() : "",
      dia_chi: cAddr >= 0 ? ((r[cAddr] || "") + "").trim() : "",
      san_pham: cProduct >= 0 ? ((r[cProduct] || "") + "").trim() : "",
    });
  }
  return out;
}

let DEALERS = [];
let manualMode = false;
const dealerInput = $("#dealerName");
const dealerList = $("#dealerList");
const dealerStatus = $("#dealerStatus");
const escapeHtml = (s) => (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const formatPhone = (p) => {
  const d = (p || "").replace(/\D/g, "");
  return d.length === 10 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : (p || "");
};
/* khu vực = 2 cấp cuối của địa chỉ (xã/tỉnh) cho gọn trên ảnh */
function shortArea(addr) {
  const parts = (addr || "").split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length > 2 ? parts.slice(-2).join(", ") : (addr || "");
}
function buildNote(sanPham) {
  if (!sanPham) return "Phân phối CFC Homecare chính hãng";
  let note = `Chuyên: ${sanPham} — chính hãng`;
  if (note.length > 90) note = note.slice(0, 89).replace(/[,;\s]+\S*$/, "") + "…";
  return note;
}
function loadManualDealers() {
  try { return JSON.parse(localStorage.getItem(MANUAL_KEY) || "[]"); } catch (e) { return []; }
}

function applyDealer(dealer) {
  manualMode = false;
  dealerInput.value = dealer.ten;
  $("#dealerArea").value = shortArea(dealer.dia_chi);
  $("#dealerPhone").value = formatPhone(dealer.sdt);
  $("#dealerNote").value = buildNote(dealer.san_pham);
  dealerList.hidden = true;
  dealerStatus.textContent = "Đã tự điền tên, khu vực, SĐT, ghi chú — sửa tay được nếu cần.";
  drawCanvas();
}

function renderDealerList(query) {
  const q = (query || "").trim().toLowerCase();
  const hits = DEALERS.map((d, i) => ({ d, i }))
    .filter(({ d }) => !q || d.ten.toLowerCase().includes(q) || (d.dia_chi || "").toLowerCase().includes(q));
  let html = hits.map(({ d, i }) =>
    `<span class="combo-item" data-i="${i}">${escapeHtml(d.ten)}` +
    (d.manual ? ' <span class="has-logo">(nhập tay)</span>' : "") +
    `<small>${escapeHtml(d.dia_chi || "")}${d.sdt ? " · " + escapeHtml(d.sdt) : ""}</small></span>`).join("");
  if (!hits.length) html = '<span class="combo-empty">Chưa có khách hàng phù hợp trong danh sách.</span>';
  html += '<span class="combo-item manual" data-manual="1">+ Khách hàng khác (nhập tay)</span>';
  dealerList.innerHTML = html;
  dealerList.hidden = false;
}

dealerInput.addEventListener("focus", () => renderDealerList(dealerInput.value));
dealerInput.addEventListener("input", () => renderDealerList(dealerInput.value));
dealerInput.addEventListener("blur", () => window.setTimeout(() => { dealerList.hidden = true; }, 180));
dealerList.addEventListener("mousedown", (event) => {
  const item = event.target.closest(".combo-item");
  if (!item) return;
  event.preventDefault();
  if (item.dataset.manual) {
    manualMode = true;
    dealerList.hidden = true;
    dealerStatus.textContent = "Nhập tay: điền tên, khu vực, SĐT. Thông tin được lưu trên máy này để dùng lại lần sau.";
    dealerInput.focus();
    return;
  }
  applyDealer(DEALERS[Number(item.dataset.i)]);
});

function saveManualDealer() {
  if (!manualMode || !dealerInput.value.trim()) return;
  const ten = dealerInput.value.trim();
  if (DEALERS.some((d) => d.ten.toLowerCase() === ten.toLowerCase())) return;
  const record = { ten, sdt: $("#dealerPhone").value, dia_chi: $("#dealerArea").value, san_pham: "", manual: true };
  const list = loadManualDealers();
  list.push(record);
  try { localStorage.setItem(MANUAL_KEY, JSON.stringify(list)); } catch (e) { /* bộ nhớ đầy — bỏ qua */ }
  DEALERS.push(record);
}

(async function loadDealers() {
  const manual = loadManualDealers();
  try {
    const res = await fetch(SHEET_CSV, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    /* .normalize("NFC"): Google Sheet trả tiếng Việt dạng tách dấu (NFD), phải gộp về NFC mới so khớp được */
    const dealers = rowsToDealers(parseSheetCSV((await res.text()).normalize("NFC")));
    DEALERS = dealers;
    dealerStatus.textContent = dealers.length
      ? `✓ ${dealers.length} khách hàng — lấy trực tiếp từ danh sách công ty.`
      : "✓ Đã kết nối Google Sheet — danh sách đang trống, thêm khách vào sheet là hiện tại đây.";
  } catch (error) {
    dealerStatus.textContent = "Chưa đọc được Google Sheet — kiểm tra mạng hoặc quyền chia sẻ. Vẫn nhập tay được bình thường.";
  }
  DEALERS = DEALERS.concat(manual.map((m) => ({ ...m, manual: true })));
})();

$("#downloadSingle").addEventListener("click", () => {
  saveManualDealer();
  drawCanvas();
  const data = readForm();
  downloadDataUrl(canvas.toDataURL("image/png"), `cfc-homecare-${slugify(data.name)}-${state.ratio.replace(":", "x")}.png`);
});

$("#makeBatch").addEventListener("click", makeBatchPreview);
$("#batchImages").addEventListener("change", (event) => {
  handleBatchImages([...event.target.files]);
  event.target.value = "";
});
$("#downloadAll").addEventListener("click", () => {
  if (!state.batchImages.length) makeBatchPreview();
  state.batchImages.forEach((entry, index) => {
    window.setTimeout(() => downloadDataUrl(entry.url, entry.filename), index * 250);
  });
});

Object.values(logoZ).forEach((img) => { img.onload = () => drawCanvas(); });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => drawCanvas());
}

/* ============================================================
   TAB 2 — MÁY TÍNH LỢI NHUẬN (khách hàng)
   ============================================================ */
const numberVN = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
let calcProduct = "zeo";
let countUpFrame = null;

function updateSliderFill(slider) {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--fill", `${pct}%`);
}

function animateNumber(el, target) {
  if (countUpFrame) cancelAnimationFrame(countUpFrame);
  const start = Number(el.dataset.value || 0);
  const t0 = performance.now();
  const duration = 600;
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = numberVN.format(Math.round(start + (target - start) * eased));
    if (p < 1) countUpFrame = requestAnimationFrame(step);
  };
  countUpFrame = requestAnimationFrame(step);
  el.dataset.value = target;
}

function updateCalculator() {
  const config = CALC_CONFIG[calcProduct];
  const washesPerWeek = Number($("#washesR").value);
  const washesPerMonth = washesPerWeek * WEEKS_PER_MONTH;

  const costCfcMonth = Math.round(config.costPerWashCfc * washesPerMonth);
  const costMarketMonth = Math.round(config.costPerWashMarket * washesPerMonth);
  const savedYear = (costMarketMonth - costCfcMonth) * 12;

  $("#washesV").textContent = washesPerWeek;
  updateSliderFill($("#washesR"));
  animateNumber($("#savedYear"), savedYear);

  $("#costCfc").textContent = `${numberVN.format(costCfcMonth)}đ/tháng`;
  $("#costMarket").textContent = `${numberVN.format(costMarketMonth)}đ/tháng`;
  $("#barCfc").style.width = `${(costCfcMonth / costMarketMonth) * 100}%`;
  $("#barMarket").style.width = "100%";

  $("#calcHint").textContent = config.hint;
  $("#calcRows").innerHTML = config.rows
    .map(([label, value, good]) => `<div class="row"><span>${label}</span><b${good ? ' class="good"' : ""}>${value}</b></div>`)
    .join("");
}

$$("#productPick .pick").forEach((button) => {
  button.addEventListener("click", () => {
    calcProduct = button.dataset.product;
    $$("#productPick .pick").forEach((item) => item.classList.toggle("active", item === button));
    updateCalculator();
  });
});
$("#washesR").addEventListener("input", updateCalculator);

/* ============================================================
   TAB 3 — BẢN ĐỒ VIỆT NAM (biểu trưng, toạ độ thật)
   Kinh/vĩ độ → viewBox: x = (lon − 101.8) × 12 ; y = (23.6 − lat) × 13
   ============================================================ */
const lonLat = (lon, lat) => [(lon - 101.8) * 12, (23.6 - lat) * 13];

const VN_OUTLINE = [
  /* biên giới phía Bắc (tây → đông) */
  [102.15, 22.4], [103.2, 22.75], [104.3, 22.8], [105.0, 23.35], [105.9, 23.0],
  [106.7, 22.85], [107.0, 21.9], [108.05, 21.55],
  /* bờ biển (bắc → nam) */
  [106.8, 20.9], [106.5, 20.4], [105.9, 19.9], [105.75, 19.0], [105.65, 18.6],
  [106.3, 17.9], [106.9, 17.1], [107.7, 16.4], [108.25, 16.1], [108.8, 15.4],
  [109.05, 14.5], [109.3, 13.7], [109.35, 12.9], [109.25, 12.2], [109.0, 11.5],
  [108.3, 10.95], [107.2, 10.4], [106.75, 10.25], [106.2, 9.75], [105.5, 9.0],
  [104.8, 8.6],
  /* bờ tây Nam Bộ (lên) */
  [104.85, 9.6], [104.5, 10.35],
  /* biên giới Campuchia */
  [105.1, 10.9], [105.85, 11.65], [106.4, 11.75], [107.55, 12.35],
  [107.5, 13.6], [107.65, 14.45],
  /* biên giới Lào (nam → bắc) */
  [107.4, 15.2], [106.9, 16.1], [106.5, 16.6], [105.6, 17.4], [105.1, 18.2],
  [103.9, 19.25], [104.6, 19.9], [104.3, 20.5], [103.2, 20.8], [102.6, 21.4],
].map(([lon, lat]) => lonLat(lon, lat));

/* điểm đối tác — thành phố thật; 4 hub lớn có vòng lan toả */
const VN_PARTNERS = [
  { lon: 105.85, lat: 21.03, major: true },  // Hà Nội
  { lon: 108.22, lat: 16.07, major: true },  // Đà Nẵng
  { lon: 106.70, lat: 10.78, major: true },  // TP.HCM
  { lon: 105.78, lat: 10.03, major: true },  // Cần Thơ
  { lon: 106.68, lat: 20.86 }, // Hải Phòng
  { lon: 107.08, lat: 20.95 }, // Hạ Long
  { lon: 105.84, lat: 21.59 }, // Thái Nguyên
  { lon: 105.40, lat: 21.30 }, // Việt Trì
  { lon: 106.20, lat: 21.28 }, // Bắc Giang
  { lon: 106.17, lat: 20.42 }, // Nam Định
  { lon: 105.78, lat: 19.80 }, // Thanh Hoá
  { lon: 105.70, lat: 18.67 }, // Vinh
  { lon: 106.62, lat: 17.47 }, // Đồng Hới
  { lon: 107.58, lat: 16.46 }, // Huế
  { lon: 108.80, lat: 15.12 }, // Quảng Ngãi
  { lon: 109.22, lat: 13.77 }, // Quy Nhơn
  { lon: 109.30, lat: 13.08 }, // Tuy Hoà
  { lon: 109.19, lat: 12.25 }, // Nha Trang
  { lon: 108.00, lat: 13.98 }, // Pleiku
  { lon: 108.05, lat: 12.67 }, // Buôn Ma Thuột
  { lon: 108.44, lat: 11.94 }, // Đà Lạt
  { lon: 108.10, lat: 10.93 }, // Phan Thiết
  { lon: 106.82, lat: 10.95 }, // Biên Hoà
  { lon: 107.08, lat: 10.35 }, // Vũng Tàu
  { lon: 106.10, lat: 11.31 }, // Tây Ninh
  { lon: 106.36, lat: 10.36 }, // Mỹ Tho
  { lon: 105.44, lat: 10.39 }, // Long Xuyên
  { lon: 105.08, lat: 10.01 }, // Rạch Giá
  { lon: 105.97, lat: 9.60 },  // Sóc Trăng
  { lon: 105.15, lat: 9.18 },  // Cà Mau
];

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function renderVnMap() {
  const svg = $("#vnMap");
  if (!svg) return;
  svg.setAttribute("viewBox", "0 0 100 200");
  const ns = "http://www.w3.org/2000/svg";
  const step = 2.3;
  for (let y = 1; y < 199; y += step) {
    for (let x = 1; x < 99; x += step) {
      if (!pointInPolygon(x, y, VN_OUTLINE)) continue;
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("cx", x.toFixed(1));
      dot.setAttribute("cy", y.toFixed(1));
      dot.setAttribute("r", 0.8);
      dot.setAttribute("class", "dot");
      svg.appendChild(dot);
    }
  }
  VN_PARTNERS.forEach((p, index) => {
    const [x, y] = lonLat(p.lon, p.lat);
    const delay = `${(index % 7) * 0.35}s`;
    if (p.major) {
      const halo = document.createElementNS(ns, "circle");
      halo.setAttribute("cx", x);
      halo.setAttribute("cy", y);
      halo.setAttribute("r", 2.6);
      halo.setAttribute("class", "halo");
      halo.style.animationDelay = delay;
      svg.appendChild(halo);
    }
    const hub = document.createElementNS(ns, "circle");
    hub.setAttribute("cx", x);
    hub.setAttribute("cy", y);
    hub.setAttribute("r", p.major ? 1.7 : 1.1);
    hub.setAttribute("class", "hub");
    hub.style.animationDelay = delay;
    svg.appendChild(hub);
  });
}

/* ============================================================
   KHỞI ĐỘNG
   ============================================================ */
setCanvasRatio(state.ratio);
updateCalculator();
renderVnMap();
activateTab("creator");
