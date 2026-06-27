"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/mockData";
import { addProduct, updateProduct } from "@/lib/db";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=400",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
];

export default function ProductForm({ sellerId, product = null }) {
  const router = useRouter();
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(
    product || {
      name: "",
      description: "",
      categoryId: categories[0].id,
      price: "",
      available: true,
      imageUrl: SAMPLE_IMAGES[0],
      expiryDate: "",
    }
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = {
      ...form,
      price: Number(form.price),
    };
    try {
      if (isEdit) {
        await updateProduct(product.id, data);
      } else {
        await addProduct(sellerId, data);
      }
      router.push("/seller/dashboard/products");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <h2 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
          المعلومات الأساسية
        </h2>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            اسم المنتج <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="مثلاً: حليب خالي من اللاكتوز 1 لتر"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            الوصف <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="وصف مختصر للمنتج، مكوناته، استخداماته..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              الفئة <span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              required
              value={form.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500 bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              السعر (دج) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="50"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            تاريخ انتهاء الصلاحية
          </label>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <h2 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
          صورة المنتج
        </h2>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            رابط الصورة (URL)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-teal-500"
            dir="ltr"
          />
          <p className="text-xs text-slate-500 mt-2">
            💡 في النسخة النهائية: ستتمكن من رفع الصور مباشرة. الآن استخدم رابط
            صورة جاهز.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            أو اختر صورة جاهزة:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SAMPLE_IMAGES.map((url) => (
              <button
                key={url}
                type="button"
                onClick={() => setForm({ ...form, imageUrl: url })}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                  form.imageUrl === url
                    ? "border-teal-500 ring-2 ring-teal-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            className="w-5 h-5 accent-teal-600"
          />
          <div>
            <div className="font-semibold text-slate-900">المنتج متوفر</div>
            <div className="text-sm text-slate-500">
              يظهر للمستهلكين كمنتج متاح للطلب
            </div>
          </div>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-semibold shadow-md"
        >
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
        <Link
          href="/seller/dashboard/products"
          className="px-6 py-3.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50"
        >
          إلغاء
        </Link>
      </div>
    </form>
  );
}
