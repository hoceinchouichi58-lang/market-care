"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loginSeller } from "@/lib/sellerStore";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      loginSeller(form.phone, form.password);
      router.push("/seller/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-4">
              🔐
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              تسجيل دخول
            </h1>
            <p className="text-slate-600">ادخل لإدارة محلك ومنتجاتك</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                رقم الهاتف
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
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </button>

            <p className="text-center text-sm text-slate-600">
              ليس لديك حساب؟{" "}
              <Link href="/seller/register" className="text-teal-600 font-semibold hover:underline">
                سجّل الآن
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
