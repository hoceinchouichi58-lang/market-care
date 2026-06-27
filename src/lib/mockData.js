// الفئات ثابتة (مرجعية) - أما البائعون والمنتجات فمن قاعدة بيانات Supabase

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

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}

export function formatPrice(price) {
  return `${Number(price).toLocaleString("fr-DZ")} دج`;
}

// حساب المسافة بين موقعين (كم) - صيغة Haversine
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
