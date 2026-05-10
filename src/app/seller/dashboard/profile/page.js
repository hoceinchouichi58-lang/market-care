"use client";

import { useEffect, useState } from "react";
import { getCurrentSeller, updateCurrentSeller } from "@/lib/sellerStore";

export default function ProfilePage() {
  const [seller, setSeller] = useState(null);
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const s = getCurrentSeller();
    if (!s) return;
    setSeller(s);
    setForm({ ...s });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const updated = updateCurrentSeller(form);
    setSeller(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!form) return null;

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-1">
        👤 الملف الشخصي
      </h1>
      <p className="text-slate-600 mb-8">
        إدارة معلومات محلك وموقعه
      </p>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
          ✅ تم حفظ التعديلات بنجاح
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
            معلومات المحل
          </h2>

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
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              نوع النشاط
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

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              العنوان الكامل
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
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
              value={form.registryNumber || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
            معلومات الاتصال
          </h2>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
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
              value={form.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
              dir="ltr"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
            الموقع الجغرافي
          </h2>
          <p className="text-sm text-slate-600">
            هذه الإحداثيات تستخدم لعرض محلك على الخريطة وحساب المسافة من
            المستهلكين
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                خط العرض (Latitude)
              </label>
              <input
                type="number"
                name="lat"
                step="0.0001"
                value={form.lat}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                خط الطول (Longitude)
              </label>
              <input
                type="number"
                name="lng"
                step="0.0001"
                value={form.lng}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
                dir="ltr"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
            💡 يمكنك الحصول على إحداثيات محلك من Google Maps: انقر بزر الفأرة
            الأيمن على موقع المحل واختر الإحداثيات.
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-semibold shadow-md"
        >
          {saving ? "جاري الحفظ..." : "💾 حفظ التعديلات"}
        </button>
      </form>
    </div>
  );
}
