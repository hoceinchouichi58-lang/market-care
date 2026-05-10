// بيانات تجريبية - ستستبدل بقاعدة بيانات Supabase لاحقاً

export const categories = [
  { id: "diabetes", name: "منتجات السكري", icon: "🩸", color: "bg-red-50 text-red-700" },
  { id: "gluten-free", name: "خالية من الغلوتين", icon: "🌾", color: "bg-amber-50 text-amber-700" },
  { id: "baby-special", name: "أغذية أطفال خاصة", icon: "🍼", color: "bg-pink-50 text-pink-700" },
  { id: "supplements", name: "مكملات غذائية", icon: "💊", color: "bg-blue-50 text-blue-700" },
  { id: "elderly", name: "منتجات كبار السن", icon: "👴", color: "bg-purple-50 text-purple-700" },
  { id: "lactose-free", name: "خالية من اللاكتوز", icon: "🥛", color: "bg-cyan-50 text-cyan-700" },
  { id: "medical-devices", name: "أجهزة طبية منزلية", icon: "🩺", color: "bg-emerald-50 text-emerald-700" },
  { id: "cosmetics", name: "مستحضرات شبه طبية", icon: "🧴", color: "bg-indigo-50 text-indigo-700" },
];

export const sellers = [
  {
    id: 1,
    shopName: "صيدلية النور",
    activityType: "صيدلية",
    address: "شارع ديدوش مراد، الجزائر العاصمة",
    phone: "0555 12 34 56",
    lat: 36.7538,
    lng: 3.0588,
    photoUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
  },
  {
    id: 2,
    shopName: "بارا صحتي",
    activityType: "محل شبه طبي",
    address: "حي بن عكنون، الجزائر",
    phone: "0661 23 45 67",
    lat: 36.7611,
    lng: 3.0177,
    photoUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
  },
  {
    id: 3,
    shopName: "محل الحمية الصحية",
    activityType: "محل أغذية متخصصة",
    address: "حي الأبيار، الجزائر",
    phone: "0770 34 56 78",
    lat: 36.7747,
    lng: 3.0334,
    photoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
  },
  {
    id: 4,
    shopName: "صيدلية الشفاء",
    activityType: "صيدلية",
    address: "حسين داي، الجزائر",
    phone: "0555 45 67 89",
    lat: 36.7372,
    lng: 3.0911,
    photoUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
  },
];

export const products = [
  {
    id: 1,
    sellerId: 1,
    categoryId: "diabetes",
    name: "جهاز قياس سكر الدم Accu-Chek",
    description: "جهاز دقيق لقياس مستوى السكر في الدم مع 50 شريطة اختبار",
    price: 4500,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=400",
  },
  {
    id: 2,
    sellerId: 1,
    categoryId: "diabetes",
    name: "أشرطة اختبار السكر (50 شريطة)",
    description: "أشرطة متوافقة مع معظم أجهزة قياس السكر",
    price: 1800,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400",
  },
  {
    id: 3,
    sellerId: 2,
    categoryId: "gluten-free",
    name: "خبز خالي من الغلوتين",
    description: "خبز طازج مناسب لمرضى السيلياك، 500غ",
    price: 650,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  },
  {
    id: 4,
    sellerId: 3,
    categoryId: "gluten-free",
    name: "دقيق الأرز الخالي من الغلوتين",
    description: "دقيق طبيعي 100% للخبز والمعجنات، 1كغ",
    price: 850,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
  },
  {
    id: 5,
    sellerId: 1,
    categoryId: "baby-special",
    name: "حليب أطفال مضاد للحساسية",
    description: "حليب متخصص للرضع الذين يعانون من حساسية البروتين",
    price: 3200,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1595456982104-14cc660c4d22?w=400",
  },
  {
    id: 6,
    sellerId: 4,
    categoryId: "baby-special",
    name: "حليب الأطفال الخدج",
    description: "تركيبة خاصة للأطفال المولودين قبل الأوان",
    price: 2800,
    available: false,
    imageUrl: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400",
  },
  {
    id: 7,
    sellerId: 2,
    categoryId: "supplements",
    name: "فيتامين د3 - 60 كبسولة",
    description: "مكمل غذائي عالي الجودة، 5000 وحدة دولية",
    price: 1500,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
  },
  {
    id: 8,
    sellerId: 3,
    categoryId: "lactose-free",
    name: "حليب خالي من اللاكتوز",
    description: "حليب طبيعي معالج لخالي من سكر اللاكتوز، 1 لتر",
    price: 320,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
  },
  {
    id: 9,
    sellerId: 4,
    categoryId: "elderly",
    name: "مكمل غذائي لكبار السن Ensure",
    description: "مشروب غذائي كامل للحفاظ على صحة كبار السن",
    price: 2400,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400",
  },
  {
    id: 10,
    sellerId: 1,
    categoryId: "medical-devices",
    name: "جهاز قياس ضغط الدم الرقمي",
    description: "جهاز دقيق سهل الاستخدام مع شاشة كبيرة",
    price: 5500,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400",
  },
  {
    id: 11,
    sellerId: 2,
    categoryId: "cosmetics",
    name: "كريم مرطب للبشرة الحساسة",
    description: "كريم شبه طبي لتهدئة البشرة الحساسة والمتهيجة",
    price: 1200,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
  },
  {
    id: 12,
    sellerId: 3,
    categoryId: "diabetes",
    name: "حلويات خالية من السكر",
    description: "تشكيلة من الحلويات المناسبة لمرضى السكري",
    price: 950,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
  },
];

// دالة حساب المسافة بين موقعين (بالكيلومتر) - صيغة Haversine
export function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getSellerById(id) {
  return sellers.find((s) => s.id === id);
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}

export function formatPrice(price) {
  return `${price.toLocaleString("fr-DZ")} دج`;
}
