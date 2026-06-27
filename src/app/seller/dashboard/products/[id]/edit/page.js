"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getCurrentSeller, getProductById } from "@/lib/db";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const s = await getCurrentSeller();
      if (!active || !s) return;
      setSeller(s);
      const p = await getProductById(id);
      if (!active) return;
      if (!p || p.sellerId !== s.id) {
        setNotFound(true);
      } else {
        setProduct(p);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  if (notFound) {
    return (
      <div className="p-6 md:p-10 max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            المنتج غير موجود
          </h2>
          <p className="text-slate-600 mb-6">
            قد يكون تم حذفه أو لا يخصك
          </p>
          <Link
            href="/seller/dashboard/products"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold"
          >
            العودة للمنتجات
          </Link>
        </div>
      </div>
    );
  }

  if (!seller || !product) return null;

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
        <Link href="/seller/dashboard" className="hover:text-teal-600">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/seller/dashboard/products" className="hover:text-teal-600">
          منتجاتي
        </Link>
        <span>/</span>
        <span>تعديل</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        ✏️ تعديل المنتج
      </h1>
      <p className="text-slate-600 mb-8">{product.name}</p>

      <ProductForm sellerId={seller.id} product={product} />
    </div>
  );
}
