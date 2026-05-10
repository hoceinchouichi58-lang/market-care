"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { registerSeller, seedDemoOrders } from "@/lib/sellerStore";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shopName: "",
    activityType: "صيدلية",
    phone: "",
    email: "",
    password: "",
    address: "",
    registryNumber: "",
    lat: 36.7538,
    lng: 3.0588,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const seller = registerSeller(form);
      seedDemoOrders(seller.id);
      router.push("/seller/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-4">
              🏪
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              انضم كبائع
            </h1>
            <p className="text-slate-600">
              سجّل محلك مجاناً واعرض منتجاتك على آلاف المستهلكين
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                اسم المحل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="shopName"
                required
                value={form.shopName}
                onChange={handleChange}
                placeholder="مثلاً: صيدلية النور"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                نوع النشاط <span className="text-red-500">*</span>
              </label>
              <select
                name="activityType"
                value={form.activityType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500 bg-white"
              >
                <option>صيدلية</option>
                <option>محل شبه طبي</option>
                <option>محل أغذية متخصصة</option>
                <option>متجر إلكتروني</option>
                <option>أخرى</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0555 12 34 56"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="shop@example.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="6 أحرف على الأقل"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                العنوان الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="مثلاً: شارع ديدوش مراد، الجزائر العاصمة"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                رقم السجل التجاري
              </label>
              <input
                type="text"
                name="registryNumber"
                value={form.registryNumber}
                onChange={handleChange}
                placeholder="اختياري"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
              💡 الموقع الجغرافي الافتراضي: الجزائر العاصمة. يمكنك تعديله من
              لوحة التحكم بعد التسجيل.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
            >
              {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
            </button>

            <p className="text-center text-sm text-slate-600">
              لديك حساب بالفعل؟{" "}
              <Link href="/seller/login" className="text-teal-600 font-semibold hover:underline">
                سجّل دخول
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
