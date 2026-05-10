"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentSeller } from "@/lib/sellerStore";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    setSeller(getCurrentSeller());
  }, []);

  if (!seller) return null;

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
        <span>إضافة منتج</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        ➕ إضافة منتج جديد
      </h1>
      <p className="text-slate-600 mb-8">
        املأ المعلومات أدناه لعرض منتجك على المنصة
      </p>

      <ProductForm sellerId={seller.id} />
    </div>
  );
}
