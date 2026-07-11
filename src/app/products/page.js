import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductsFilters from "@/components/ProductsFilters";
import { getCategoryById } from "@/lib/mockData";
import { getAllProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "كل المنتجات — MARKET Care",
  description: "تصفح كل المنتجات الشبه طبية والأغذية المتخصصة المتوفرة في المنصة",
};

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const q = sp?.q || "";
  const category = sp?.category || "";
  const sort = sp?.sort || "newest";
  const seller = sp?.seller || "";

  const filtered = await getAllProducts({ q, category, sort, seller });
  const activeCategory = category ? getCategoryById(category) : null;

  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-l from-teal-600 to-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-teal-100 mb-2">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <span>المنتجات</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span>{activeCategory.name}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {activeCategory ? `${activeCategory.icon} ${activeCategory.name}` : "كل المنتجات"}
          </h1>
          <p className="text-teal-100 mt-2">
            {q && <span>نتائج البحث عن: <strong>"{q}"</strong> — </span>}
            {filtered.length} منتج {filtered.length !== 1 ? "متوفر" : "متوفر"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar Filters */}
          <aside>
            <Suspense fallback={<div className="bg-white rounded-2xl p-5 border border-slate-200">جاري التحميل...</div>}>
              <ProductsFilters />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <main>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  لم نعثر على نتائج
                </h3>
                <p className="text-slate-600 mb-6">
                  جرّب كلمات بحث مختلفة أو امسح الفلاتر للعرض الكامل
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium"
                >
                  عرض كل المنتجات
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </>
  );
}
