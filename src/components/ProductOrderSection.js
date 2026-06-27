"use client";

import { useState } from "react";
import { createOrder } from "@/lib/db";
import { formatPrice } from "@/lib/mockData";

export default function ProductOrderSection({ product, seller }) {
  const [showForm, setShowForm] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", qty: 1 });

  const phoneHref = seller?.phone ? seller.phone.replace(/\s/g, "") : "";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createOrder({
        sellerId: product.sellerId,
        productId: product.id,
        customerName: form.name,
        customerPhone: form.phone,
        productName: product.name,
        qty: Number(form.qty),
        total: product.price * Number(form.qty),
      });
      setDone(true);
    } catch (err) {
      setError("تعذّر إرسال الطلب: " + err.message);
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="font-bold text-green-800 text-lg mb-1">
          تم إرسال طلبك بنجاح!
        </h3>
        <p className="text-green-700 text-sm">
          سيتواصل معك البائع <strong>{seller?.shopName}</strong> قريباً لتأكيد
          الطلب.
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4"
      >
        <h3 className="font-bold text-slate-900">إتمام الطلب</h3>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="اسمك"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="0555 12 34 56"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            الكمية
          </label>
          <input
            type="number"
            name="qty"
            min="1"
            value={form.qty}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
          <span className="text-sm text-slate-600">الإجمالي</span>
          <span className="text-xl font-bold text-teal-700">
            {formatPrice(product.price * Number(form.qty || 1))}
          </span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-5 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50"
          >
            إلغاء
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => setShowForm(true)}
        disabled={!product.available}
        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition shadow-md"
      >
        🛒 طلب المنتج
      </button>
      {phoneHref && (
        <a
          href={`tel:${phoneHref}`}
          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 py-3.5 rounded-xl font-semibold transition text-center"
        >
          📞 اتصل بالبائع
        </a>
      )}
    </div>
  );
}
