"use client";

// مخزن مؤقت في localStorage - سينتقل إلى Supabase لاحقاً
// ملاحظة: localStorage يعمل في المتصفح فقط (client-side)

const STORAGE_KEYS = {
  SELLERS: "mc_sellers",
  CURRENT_SELLER: "mc_current_seller",
  PRODUCTS: "mc_seller_products",
  ORDERS: "mc_orders",
};

function safeGet(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ============ البائعون ============
export function registerSeller(data) {
  const sellers = safeGet(STORAGE_KEYS.SELLERS, []);
  if (sellers.find((s) => s.phone === data.phone)) {
    throw new Error("رقم الهاتف مسجل مسبقاً");
  }
  const newSeller = {
    id: Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    status: "approved", // مؤقتاً نعتبر البائع معتمداً مباشرة
  };
  sellers.push(newSeller);
  safeSet(STORAGE_KEYS.SELLERS, sellers);
  safeSet(STORAGE_KEYS.CURRENT_SELLER, newSeller);
  return newSeller;
}

export function loginSeller(phone, password) {
  const sellers = safeGet(STORAGE_KEYS.SELLERS, []);
  const seller = sellers.find(
    (s) => s.phone === phone && s.password === password
  );
  if (!seller) throw new Error("رقم الهاتف أو كلمة المرور غير صحيحة");
  safeSet(STORAGE_KEYS.CURRENT_SELLER, seller);
  return seller;
}

export function logoutSeller() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_SELLER);
}

export function getCurrentSeller() {
  return safeGet(STORAGE_KEYS.CURRENT_SELLER, null);
}

export function updateCurrentSeller(updates) {
  const current = getCurrentSeller();
  if (!current) return null;
  const updated = { ...current, ...updates };
  safeSet(STORAGE_KEYS.CURRENT_SELLER, updated);
  // تحديث القائمة العامة أيضاً
  const sellers = safeGet(STORAGE_KEYS.SELLERS, []);
  const idx = sellers.findIndex((s) => s.id === current.id);
  if (idx >= 0) {
    sellers[idx] = updated;
    safeSet(STORAGE_KEYS.SELLERS, sellers);
  }
  return updated;
}

// ============ المنتجات ============
export function getSellerProducts(sellerId) {
  const all = safeGet(STORAGE_KEYS.PRODUCTS, []);
  return all.filter((p) => p.sellerId === sellerId);
}

export function addProduct(sellerId, data) {
  const all = safeGet(STORAGE_KEYS.PRODUCTS, []);
  const newProduct = {
    id: Date.now(),
    sellerId,
    ...data,
    createdAt: new Date().toISOString(),
  };
  all.push(newProduct);
  safeSet(STORAGE_KEYS.PRODUCTS, all);
  return newProduct;
}

export function getProductById(id) {
  const all = safeGet(STORAGE_KEYS.PRODUCTS, []);
  return all.find((p) => p.id === Number(id));
}

export function updateProduct(id, updates) {
  const all = safeGet(STORAGE_KEYS.PRODUCTS, []);
  const idx = all.findIndex((p) => p.id === Number(id));
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...updates };
  safeSet(STORAGE_KEYS.PRODUCTS, all);
  return all[idx];
}

export function deleteProduct(id) {
  const all = safeGet(STORAGE_KEYS.PRODUCTS, []);
  const filtered = all.filter((p) => p.id !== Number(id));
  safeSet(STORAGE_KEYS.PRODUCTS, filtered);
}

// ============ الطلبات ============
export function getSellerOrders(sellerId) {
  const all = safeGet(STORAGE_KEYS.ORDERS, []);
  return all.filter((o) => o.sellerId === sellerId);
}

export function updateOrderStatus(orderId, status) {
  const all = safeGet(STORAGE_KEYS.ORDERS, []);
  const idx = all.findIndex((o) => o.id === Number(orderId));
  if (idx < 0) return null;
  all[idx].status = status;
  safeSet(STORAGE_KEYS.ORDERS, all);
  return all[idx];
}

// إنشاء طلبات تجريبية للبائع (مرة واحدة عند التسجيل)
export function seedDemoOrders(sellerId) {
  const existing = safeGet(STORAGE_KEYS.ORDERS, []);
  if (existing.some((o) => o.sellerId === sellerId)) return;
  const demoOrders = [
    {
      id: Date.now() + 1,
      sellerId,
      customerName: "أحمد بن علي",
      customerPhone: "0555 11 22 33",
      productName: "جهاز قياس سكر الدم",
      qty: 1,
      total: 4500,
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: Date.now() + 2,
      sellerId,
      customerName: "فاطمة الزهراء",
      customerPhone: "0661 44 55 66",
      productName: "حليب خالي من اللاكتوز",
      qty: 3,
      total: 960,
      status: "confirmed",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: Date.now() + 3,
      sellerId,
      customerName: "كريم بوزيد",
      customerPhone: "0770 77 88 99",
      productName: "فيتامين د3",
      qty: 2,
      total: 3000,
      status: "completed",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
  ];
  safeSet(STORAGE_KEYS.ORDERS, [...existing, ...demoOrders]);
}
