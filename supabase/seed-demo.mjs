// إضافة بيانات تجريبية: 4 بائعين حقيقيين + منتجاتهم
// يستعمل نفس مسار التسجيل (signUp) فيُنشئ حسابات يمكن الدخول إليها فعلاً
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

// قراءة المفاتيح من .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envText = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PASSWORD = "demo123456";

const sellers = [
  {
    email: "noor@demo.dz",
    shop_name: "صيدلية النور",
    activity_type: "صيدلية",
    phone: "0555 12 34 56",
    address: "شارع ديدوش مراد، الجزائر العاصمة",
    lat: 36.7538,
    lng: 3.0588,
    products: [
      { category_id: "diabetes", name: "جهاز قياس سكر الدم Accu-Chek", description: "جهاز دقيق لقياس مستوى السكر في الدم مع 50 شريطة اختبار", price: 4500, image_url: "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=400", available: true },
      { category_id: "diabetes", name: "أشرطة اختبار السكر (50 شريطة)", description: "أشرطة متوافقة مع معظم أجهزة قياس السكر", price: 1800, image_url: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", available: true },
      { category_id: "baby-special", name: "حليب أطفال مضاد للحساسية", description: "حليب متخصص للرضع الذين يعانون من حساسية البروتين", price: 3200, image_url: "https://images.unsplash.com/photo-1595456982104-14cc660c4d22?w=400", available: true },
      { category_id: "medical-devices", name: "جهاز قياس ضغط الدم الرقمي", description: "جهاز دقيق سهل الاستخدام مع شاشة كبيرة", price: 5500, image_url: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400", available: true },
    ],
  },
  {
    email: "sahti@demo.dz",
    shop_name: "بارا صحتي",
    activity_type: "محل شبه طبي",
    phone: "0661 23 45 67",
    address: "حي بن عكنون، الجزائر",
    lat: 36.7611,
    lng: 3.0177,
    products: [
      { category_id: "gluten-free", name: "خبز خالي من الغلوتين", description: "خبز طازج مناسب لمرضى السيلياك، 500غ", price: 650, image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", available: true },
      { category_id: "supplements", name: "فيتامين د3 - 60 كبسولة", description: "مكمل غذائي عالي الجودة، 5000 وحدة دولية", price: 1500, image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400", available: true },
      { category_id: "cosmetics", name: "كريم مرطب للبشرة الحساسة", description: "كريم شبه طبي لتهدئة البشرة الحساسة والمتهيجة", price: 1200, image_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400", available: true },
    ],
  },
  {
    email: "hamia@demo.dz",
    shop_name: "محل الحمية الصحية",
    activity_type: "محل أغذية متخصصة",
    phone: "0770 34 56 78",
    address: "حي الأبيار، الجزائر",
    lat: 36.7747,
    lng: 3.0334,
    products: [
      { category_id: "gluten-free", name: "دقيق الأرز الخالي من الغلوتين", description: "دقيق طبيعي 100% للخبز والمعجنات، 1كغ", price: 850, image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400", available: true },
      { category_id: "lactose-free", name: "حليب خالي من اللاكتوز", description: "حليب طبيعي معالج خالٍ من سكر اللاكتوز، 1 لتر", price: 320, image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400", available: true },
      { category_id: "diabetes", name: "حلويات خالية من السكر", description: "تشكيلة من الحلويات المناسبة لمرضى السكري", price: 950, image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", available: true },
    ],
  },
  {
    email: "chifa@demo.dz",
    shop_name: "صيدلية الشفاء",
    activity_type: "صيدلية",
    phone: "0555 45 67 89",
    address: "حسين داي، الجزائر",
    lat: 36.7372,
    lng: 3.0911,
    products: [
      { category_id: "baby-special", name: "حليب الأطفال الخدج", description: "تركيبة خاصة للأطفال المولودين قبل الأوان", price: 2800, image_url: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400", available: false },
      { category_id: "elderly", name: "مكمل غذائي لكبار السن Ensure", description: "مشروب غذائي كامل للحفاظ على صحة كبار السن", price: 2400, image_url: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400", available: true },
    ],
  },
];

async function seedSeller(s) {
  // 1) إنشاء الحساب أو الدخول إن كان موجوداً
  let userId;
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: s.email,
    password: PASSWORD,
  });
  if (signUpErr && !signUpErr.message.toLowerCase().includes("already")) {
    throw signUpErr;
  }
  // سجّل الدخول للحصول على جلسة (مع trigger التأكيد التلقائي)
  const { data: signInData, error: signInErr } =
    await supabase.auth.signInWithPassword({ email: s.email, password: PASSWORD });
  if (signInErr) throw signInErr;
  userId = signInData.user.id;

  // 2) ملف البائع (upsert)
  const { error: sellerErr } = await supabase.from("sellers").upsert({
    id: userId,
    shop_name: s.shop_name,
    activity_type: s.activity_type,
    phone: s.phone,
    email: s.email,
    address: s.address,
    lat: s.lat,
    lng: s.lng,
    status: "approved",
  });
  if (sellerErr) throw sellerErr;

  // 3) المنتجات (فقط إن لم تكن موجودة)
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", userId);

  if (!count) {
    const rows = s.products.map((p) => ({ ...p, seller_id: userId }));
    const { error: prodErr } = await supabase.from("products").insert(rows);
    if (prodErr) throw prodErr;
    console.log(`  ✓ ${s.shop_name}: ${rows.length} منتج`);
  } else {
    console.log(`  • ${s.shop_name}: موجود مسبقاً (${count} منتج) — تخطّي`);
  }

  await supabase.auth.signOut();
}

console.log("بدء إضافة البيانات التجريبية...\n");
for (const s of sellers) {
  try {
    await seedSeller(s);
  } catch (err) {
    console.error(`  ✗ ${s.shop_name}: ${err.message}`);
  }
}
console.log("\n✅ انتهى. حسابات البائعين التجريبية:");
sellers.forEach((s) => console.log(`   ${s.email}  /  ${PASSWORD}`));
