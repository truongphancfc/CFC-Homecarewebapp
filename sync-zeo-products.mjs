import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const STORE_URL = "https://zeo.vn";
const COLLECTION_URL = `${STORE_URL}/collections/tat-ca-san-pham/products.json`;
const OUTPUT_URL = new URL("../data/products.js", import.meta.url);
const PAGE_SIZE = 12;

const CATEGORY_ORDER = [
  "nuoc-giat",
  "nuoc-giat-xa",
  "nuoc-rua-chen",
  "bot-giat",
  "nuoc-lau-san",
  "tay-rua",
  "san-pham-khac",
];

const CATEGORY_NAMES = {
  "nuoc-giat": "Nước giặt",
  "nuoc-giat-xa": "Nước giặt xả",
  "nuoc-rua-chen": "Nước rửa chén",
  "bot-giat": "Bột giặt",
  "nuoc-lau-san": "Nước lau sàn",
  "tay-rua": "Tẩy rửa",
  "san-pham-khac": "Sản phẩm khác",
};

function textFor(product) {
  return [product.name, ...(product.tags || [])].join(" ").toLocaleLowerCase("vi");
}

function classifyProduct(product) {
  const text = textFor(product);
  if (text.includes("bột giặt")) return "bot-giat";
  if (text.includes("nước rửa chén")) return "nuoc-rua-chen";
  if (text.includes("nước lau sàn")) return "nuoc-lau-san";
  if (text.includes("nước giặt xả")) return "nuoc-giat-xa";
  if (text.includes("nước giặt")) return "nuoc-giat";
  if (/(javel|nước tẩy|tẩy toilet|tẩy rửa)/u.test(text)) return "tay-rua";
  return "san-pham-khac";
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function absoluteUrl(path) {
  return new URL(path, STORE_URL).href;
}

function normalizeProduct(product) {
  const categorySlug = classifyProduct(product);
  const variant = product.variants?.[0] || {};
  const compareAtPrice = product.compare_at_price_max || null;
  const discountPercent = compareAtPrice && compareAtPrice > product.price
    ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
    : null;

  return {
    id: product.id,
    slug: product.alias || product.url.replace(/^\//, ""),
    name: product.name,
    brand: product.vendor,
    brandSlug: slugify(product.vendor),
    category: CATEGORY_NAMES[categorySlug],
    categorySlug,
    tags: product.tags || [],
    price: product.price,
    compareAtPrice,
    discountPercent,
    thumbnail: product.featured_image || product.images?.[0] || null,
    images: product.images || [],
    sku: variant.sku || null,
    unit: variant.unit || null,
    shippingWeight: variant.weight
      ? { value: variant.weight, unit: variant.weight_unit || "kg" }
      : null,
    available: Boolean(product.available),
    url: absoluteUrl(product.url),
  };
}

async function fetchAllProducts() {
  const products = [];

  for (let page = 1; ; page += 1) {
    const url = `${COLLECTION_URL}?limit=${PAGE_SIZE}&page=${page}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "CFC-Homecare-Catalog-Sync/1.0" },
    });

    if (!response.ok) {
      throw new Error(`Không đọc được trang ${page}: HTTP ${response.status}`);
    }

    const data = await response.json();
    const pageProducts = data.products || [];
    products.push(...pageProducts);

    if (pageProducts.length < PAGE_SIZE) break;
  }

  return products;
}

function summarize(items, key, labelKey, order = []) {
  const counts = new Map();
  const labels = new Map();

  for (const item of items) {
    counts.set(item[key], (counts.get(item[key]) || 0) + 1);
    labels.set(item[key], item[labelKey]);
  }

  return [...counts]
    .map(([slug, count]) => ({ slug, name: labels.get(slug), count }))
    .sort((a, b) => {
      const aIndex = order.indexOf(a.slug);
      const bIndex = order.indexOf(b.slug);
      if (aIndex !== -1 || bIndex !== -1) {
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex)
          - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }
      return b.count - a.count || a.name.localeCompare(b.name, "vi");
    });
}

function buildJavascript(products) {
  const payload = {
    source: `${STORE_URL}/tat-ca-san-pham`,
    apiSource: COLLECTION_URL,
    syncedAt: new Date().toISOString(),
    currency: "VND",
    total: products.length,
    categories: summarize(products, "categorySlug", "category", CATEGORY_ORDER),
    brands: summarize(products, "brandSlug", "brand"),
    products,
  };

  return `/**
 * File được tạo tự động từ ${payload.source}
 * Chạy: node scripts/sync-zeo-products.mjs
 */
const ZEO_PRODUCT_DATA = ${JSON.stringify(payload, null, 2)};

function formatZeoPrice(value) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: ZEO_PRODUCT_DATA.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function getZeoProductById(id) {
  return ZEO_PRODUCT_DATA.products.find((product) => product.id === Number(id)) || null;
}

function filterZeoProducts({ brand, category, available = true } = {}) {
  return ZEO_PRODUCT_DATA.products.filter((product) => {
    if (available !== null && product.available !== available) return false;
    if (brand && product.brandSlug !== brand && product.brand !== brand) return false;
    if (category && product.categorySlug !== category && product.category !== category) return false;
    return true;
  });
}

if (typeof window !== "undefined") {
  window.ZEO_PRODUCT_DATA = ZEO_PRODUCT_DATA;
  window.ZEO_PRODUCTS = ZEO_PRODUCT_DATA.products;
  window.formatZeoPrice = formatZeoPrice;
  window.getZeoProductById = getZeoProductById;
  window.filterZeoProducts = filterZeoProducts;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ZEO_PRODUCT_DATA,
    ZEO_PRODUCTS: ZEO_PRODUCT_DATA.products,
    formatZeoPrice,
    getZeoProductById,
    filterZeoProducts,
  };
}
`;
}

const rawProducts = await fetchAllProducts();
const products = rawProducts.map(normalizeProduct);

if (!products.length) {
  throw new Error("Không tìm thấy sản phẩm nào trên zeo.vn; giữ nguyên file dữ liệu cũ.");
}

await writeFile(OUTPUT_URL, buildJavascript(products), "utf8");
console.log(`Đã đồng bộ ${products.length} sản phẩm vào ${fileURLToPath(OUTPUT_URL)}`);
