-- ============================================================
-- MARKET Care - Database Schema
-- ============================================================
-- شغّل هذا الملف كاملاً في SQL Editor في Supabase
-- ============================================================

-- =============== جدول البائعين (سيرتبط بـ auth.users) ===============
CREATE TABLE IF NOT EXISTS public.sellers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  activity_type TEXT NOT NULL DEFAULT 'صيدلية',
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  registry_number TEXT,
  lat DOUBLE PRECISION NOT NULL DEFAULT 36.7538,
  lng DOUBLE PRECISION NOT NULL DEFAULT 3.0588,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============== جدول المنتجات ===============
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  expiry_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(available);

-- =============== جدول الطلبات ===============
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES public.products(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  product_name TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_seller ON public.orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- =============== سياسات جدول البائعين ===============
-- الجميع يقدر يقرأ معلومات البائعين المعتمدين (عام)
DROP POLICY IF EXISTS "anyone_read_approved_sellers" ON public.sellers;
CREATE POLICY "anyone_read_approved_sellers" ON public.sellers
  FOR SELECT USING (status = 'approved');

-- البائع يقدر يحدّث ملفه فقط
DROP POLICY IF EXISTS "seller_update_own_profile" ON public.sellers;
CREATE POLICY "seller_update_own_profile" ON public.sellers
  FOR UPDATE USING (auth.uid() = id);

-- البائع يقدر ينشئ ملفه عند التسجيل
DROP POLICY IF EXISTS "seller_insert_own_profile" ON public.sellers;
CREATE POLICY "seller_insert_own_profile" ON public.sellers
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============== سياسات جدول المنتجات ===============
-- الجميع يقرأ المنتجات (عام للزوار)
DROP POLICY IF EXISTS "anyone_read_products" ON public.products;
CREATE POLICY "anyone_read_products" ON public.products
  FOR SELECT USING (true);

-- البائع يضيف منتجاته فقط
DROP POLICY IF EXISTS "seller_insert_own_products" ON public.products;
CREATE POLICY "seller_insert_own_products" ON public.products
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- البائع يحدّث منتجاته فقط
DROP POLICY IF EXISTS "seller_update_own_products" ON public.products;
CREATE POLICY "seller_update_own_products" ON public.products
  FOR UPDATE USING (auth.uid() = seller_id);

-- البائع يحذف منتجاته فقط
DROP POLICY IF EXISTS "seller_delete_own_products" ON public.products;
CREATE POLICY "seller_delete_own_products" ON public.products
  FOR DELETE USING (auth.uid() = seller_id);

-- =============== سياسات جدول الطلبات ===============
-- البائع يقرأ طلباته فقط
DROP POLICY IF EXISTS "seller_read_own_orders" ON public.orders;
CREATE POLICY "seller_read_own_orders" ON public.orders
  FOR SELECT USING (auth.uid() = seller_id);

-- الجميع (حتى الزوار غير المسجلين) يقدرون ينشئون طلباً
DROP POLICY IF EXISTS "anyone_create_order" ON public.orders;
CREATE POLICY "anyone_create_order" ON public.orders
  FOR INSERT WITH CHECK (true);

-- البائع يحدّث حالة طلباته
DROP POLICY IF EXISTS "seller_update_own_orders" ON public.orders;
CREATE POLICY "seller_update_own_orders" ON public.orders
  FOR UPDATE USING (auth.uid() = seller_id);

-- ============================================================
-- البيانات التجريبية (للعرض في المناقشة)
-- ============================================================
-- بعد تشغيل هذا الـ Schema، نفّذ ملف seed.sql لإضافة بيانات تجريبية
-- ============================================================
