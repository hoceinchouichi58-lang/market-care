"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { categories } from "@/lib/mockData";

export default function ProductsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "newest";

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/products?${params.toString()}`);
  }

  function handleSearch(e) {
    e.preventDefault();
    updateParam("q", query);
  }

  function clearAll() {
    router.push("/products");
  }

  const hasFilters = currentCategory || searchParams.get("q");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">الفلاتر</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-teal-600 hover:underline"
          >
            مسح الكل
          </button>
        )}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          🔍 البحث
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اسم المنتج..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            بحث
          </button>
        </div>
      </form>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          📂 الفئة
        </label>
        <div className="space-y-1">
          <button
            onClick={() => updateParam("category", "")}
            className={`w-full text-right px-3 py-2 rounded-lg text-sm transition ${
              !currentCategory
                ? "bg-teal-50 text-teal-700 font-semibold"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            كل الفئات
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam("category", cat.id)}
              className={`w-full text-right px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                currentCategory === cat.id
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ⇅ الترتيب
        </label>
        <select
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-teal-500 bg-white"
        >
          <option value="newest">الأحدث</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
          <option value="available">المتوفر فقط</option>
        </select>
      </div>
    </div>
  );
}
