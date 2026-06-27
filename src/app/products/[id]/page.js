import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductOrderSection from "@/components/ProductOrderSection";
import { getCategoryById, formatPrice } from "@/lib/mockData";
import { getProductWithSeller, getRelatedProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductWithSeller(id);
  if (!product) return { title: "منتج غير موجود" };
  return {
    title: `${product.name} — MARKET Care`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductWithSeller(id);

  if (!product) notFound();

  const seller = product.seller;
  const category = getCategoryById(product.categoryId);
  const related = await getRelatedProducts(product.categoryId, product.id, 4);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-teal-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-teal-600">المنتجات</Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${category.id}`}
                className="hover:text-teal-600"
              >
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-slate-200">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl text-slate-300">
                📦
              </div>
            )}
            {!product.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-600 text-white text-lg font-bold px-6 py-2 rounded-full">
                  غير متوفر حالياً
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {category && (
              <Link
                href={`/products?category=${category.id}`}
                className={`inline-block ${category.color} text-sm font-medium px-3 py-1 rounded-full mb-4`}
              >
                {category.icon} {category.name}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              {product.description}
            </p>

            <div className="bg-gradient-to-l from-teal-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-teal-100">
              <div className="text-sm text-slate-600 mb-1">السعر</div>
              <div className="text-4xl font-bold text-teal-700">
                {formatPrice(product.price)}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                {product.available ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-700 font-medium">متوفر الآن</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-red-700 font-medium">غير متوفر حالياً</span>
                  </>
                )}
              </div>
            </div>

            {/* Seller Card */}
            {seller && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
                <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                  البائع
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    🏪
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{seller.shopName}</div>
                    <div className="text-sm text-slate-500">{seller.activityType}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span>📍</span>
                    <span>{seller.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <a
                      href={`tel:${seller.phone.replace(/\s/g, "")}`}
                      className="hover:text-teal-600"
                    >
                      {seller.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons + Order Form */}
            <ProductOrderSection product={product} seller={seller} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              منتجات مشابهة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
