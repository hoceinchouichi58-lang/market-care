// طبقة البيانات الموحدة - كل التعامل مع Supabase يمر من هنا
import { supabase } from "./supabase";

// ============================================================
// محوّلات: من snake_case (قاعدة البيانات) إلى camelCase (الواجهة)
// ============================================================
function mapSeller(row) {
  if (!row) return null;
  return {
    id: row.id,
    shopName: row.shop_name,
    activityType: row.activity_type,
    phone: row.phone,
    email: row.email,
    address: row.address,
    registryNumber: row.registry_number,
    lat: row.lat,
    lng: row.lng,
    photoUrl: row.photo_url,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    sellerId: row.seller_id,
    categoryId: row.category_id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    imageUrl: row.image_url,
    available: row.available,
    expiryDate: row.expiry_date,
    createdAt: row.created_at,
    // البائع المرتبط (عند الـ join)
    seller: row.sellers ? mapSeller(row.sellers) : undefined,
  };
}

function mapOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    sellerId: row.seller_id,
    productId: row.product_id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    productName: row.product_name,
    qty: row.qty,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  };
}

// ============================================================
// المصادقة (Auth) + البائعون
// ============================================================
export async function registerSeller(form) {
  // 1) إنشاء حساب المصادقة
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });
  if (authError) throw new Error(translateAuthError(authError.message));

  const userId = authData.user?.id;
  if (!userId) throw new Error("تعذّر إنشاء الحساب. حاول مرة أخرى.");

  // إذا لم تُعد جلسة (تأكيد البريد مفعّل)، نسجّل الدخول يدوياً
  if (!authData.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (signInError) {
      throw new Error(
        "تم إنشاء الحساب، لكن تأكيد البريد مفعّل. عطّله من إعدادات Supabase ثم سجّل الدخول."
      );
    }
  }

  // 2) إنشاء ملف البائع المرتبط
  const { data, error } = await supabase
    .from("sellers")
    .insert({
      id: userId,
      shop_name: form.shopName,
      activity_type: form.activityType,
      phone: form.phone,
      email: form.email,
      address: form.address,
      registry_number: form.registryNumber || null,
      lat: Number(form.lat),
      lng: Number(form.lng),
      status: "approved",
    })
    .select()
    .single();
  if (error) throw new Error("تعذّر حفظ بيانات المحل: " + error.message);

  return mapSeller(data);
}

export async function loginSeller(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(translateAuthError(error.message));
  return await getCurrentSeller();
}

export async function logoutSeller() {
  await supabase.auth.signOut();
}

export async function getCurrentSeller() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) return null;
  return mapSeller(data);
}

export async function updateCurrentSeller(updates) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("غير مسجّل الدخول");

  const { data, error } = await supabase
    .from("sellers")
    .update({
      shop_name: updates.shopName,
      activity_type: updates.activityType,
      phone: updates.phone,
      email: updates.email,
      address: updates.address,
      registry_number: updates.registryNumber || null,
      lat: Number(updates.lat),
      lng: Number(updates.lng),
    })
    .eq("id", session.user.id)
    .select()
    .single();
  if (error) throw new Error("تعذّر حفظ التعديلات: " + error.message);
  return mapSeller(data);
}

// ============================================================
// المنتجات (إدارة البائع)
// ============================================================
export async function getSellerProducts(sellerId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(mapProduct);
}

export async function addProduct(sellerId, form) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      seller_id: sellerId,
      category_id: form.categoryId,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image_url: form.imageUrl || null,
      available: form.available,
      expiry_date: form.expiryDate || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapProduct(data);
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return mapProduct(data);
}

export async function updateProduct(id, form) {
  const { data, error } = await supabase
    .from("products")
    .update({
      category_id: form.categoryId,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image_url: form.imageUrl || null,
      available: form.available,
      expiry_date: form.expiryDate || null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapProduct(data);
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ============================================================
// الطلبات
// ============================================================
export async function getSellerOrders(sellerId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(mapOrder);
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapOrder(data);
}

export async function createOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      seller_id: order.sellerId,
      product_id: order.productId,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      product_name: order.productName,
      qty: order.qty,
      total: order.total,
      status: "pending",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapOrder(data);
}

// ============================================================
// قراءات عامة (للزوار - بدون تسجيل دخول)
// ============================================================
export async function getAllProducts({ q, category, sort, seller } = {}) {
  let query = supabase.from("products").select("*, sellers(*)");

  if (category) query = query.eq("category_id", category);
  if (seller) query = query.eq("seller_id", seller);
  if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);

  if (sort === "price-asc") query = query.order("price", { ascending: true });
  else if (sort === "price-desc") query = query.order("price", { ascending: false });
  else if (sort === "available") query = query.eq("available", true).order("created_at", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []).map(mapProduct);
}

export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select("*, sellers(*)")
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data || []).map(mapProduct);
}

export async function getProductWithSeller(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*, sellers(*)")
    .eq("id", id)
    .single();
  if (error) return null;
  return mapProduct(data);
}

export async function getRelatedProducts(categoryId, excludeId, limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*, sellers(*)")
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .limit(limit);
  if (error) return [];
  return (data || []).map(mapProduct);
}

export async function getApprovedSellers() {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(mapSeller);
}

export async function getSellerWithProducts(sellerId) {
  const { data: seller } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", sellerId)
    .single();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId);
  return {
    seller: mapSeller(seller),
    products: (products || []).map(mapProduct),
  };
}

export async function countSellerProducts(sellerId) {
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", sellerId);
  return count || 0;
}

// ============================================================
// مساعدات
// ============================================================
function translateAuthError(msg) {
  const m = (msg || "").toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return "هذا البريد الإلكتروني مسجّل مسبقاً";
  if (m.includes("invalid login")) return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
  if (m.includes("password should be")) return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  if (m.includes("unable to validate email")) return "صيغة البريد الإلكتروني غير صحيحة";
  if (m.includes("email not confirmed")) return "البريد غير مؤكّد. عطّل تأكيد البريد من إعدادات Supabase.";
  return msg;
}
