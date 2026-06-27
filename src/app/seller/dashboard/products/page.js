"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCurrentSeller,
  getSellerProducts,
  deleteProduct,
} from "@/lib/db";
import { formatPrice, getCategoryById } from "@/lib/mockData";

export default function SellerProductsPage() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const s = await getCurrentSeller();
      if (!active || !s) return;
      const p = await getSellerProducts(s.id);
      if (!active) return;
      setSeller(s);
      setProducts(p);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    await deleteProduct(id);
    setProducts(await getSellerProducts(seller.id));
  }

  if (loading || !seller)
    return <div className="p-10 text-slate-500">جاري التحميل...</div>;

  const filtered =
    filter === "all"
      ? products
      : filter === "available"
      ? products.filter((p) => p.available)
      : products.filter((p) => !p.available);

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">منتجاتي</h1>
          <p className="text-slate-600">
            {products.length} منتج إجمالاً
          </p>
        </div>
        <Link
          href="/seller/dashboard/products/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md flex items-center gap-2"
        >
          ➕ إضافة منتج
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1 mb-6 inline-flex gap-1">
        {[
          { id: "all", label: `الكل (${products.length})` },
          { id: "available", label: `متوفر (${products.filter((p) => p.available).length})` },
          { id: "unavailable", label: `غير متوفر (${products.filter((p) => !p.available).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === tab.id
                ? "bg-teal-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            لا توجد منتجات بعد
          </h3>
          <p className="text-slate-600 mb-6">
            ابدأ بإضافة منتجك الأول لعرضه على المنصة
          </p>
          <Link
            href="/seller/dashboard/products/new"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold"
          >
            إضافة منتج جديد
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-right p-4 text-sm font-semibold text-slate-700">المنتج</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-700 hidden md:table-cell">الفئة</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-700">السعر</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-700">الحالة</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-700">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => {
                  const cat = getCategoryById(p.categoryId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                            {p.imageUrl ? (
                              <Image
                                src={p.imageUrl}
                                alt={p.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                📦
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 truncate">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate hidden sm:block">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {cat && (
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat.color}`}>
                            {cat.icon} {cat.name}
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold text-teal-700 whitespace-nowrap">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-4">
                        {p.available ? (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                            ✓ متوفر
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                            ✕ غير متوفر
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/seller/dashboard/products/${p.id}/edit`}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                            title="تعديل"
                          >
                            ✏️
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                            title="حذف"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
