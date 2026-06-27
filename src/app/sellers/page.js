import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellersMap from "@/components/SellersMap";
import { getApprovedSellers, getAllProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "البائعون — MARKET Care",
  description: "اكتشف البائعين المتخصصين القريبين منك في الجزائر",
};

export default async function SellersPage() {
  const sellers = await getApprovedSellers();
  const allProducts = await getAllProducts();
  const countFor = (sellerId) =>
    allProducts.filter((p) => p.sellerId === sellerId).length;

  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-l from-teal-600 to-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🗺️ البائعون المعتمدون
          </h1>
          <p className="text-teal-100">
            {sellers.length} بائع متخصص — اعثر على الأقرب إليك
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* Map */}
        {sellers.length > 0 && (
          <div className="mb-10">
            <SellersMap sellers={sellers} />
            <p className="text-xs text-slate-500 mt-2 text-center">
              💡 انقر على أي علامة على الخريطة لعرض معلومات البائع
            </p>
          </div>
        )}

        {/* Sellers Grid */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          قائمة البائعين
        </h2>
        {sellers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center mb-6">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              لا يوجد بائعون بعد
            </h3>
            <p className="text-slate-600">
              كن أول بائع ينضم إلى المنصة!
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellers.map((seller) => {
            const productsCount = countFor(seller.id);
            return (
              <div
                key={seller.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                      🏪
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {seller.shopName}
                      </h3>
                      <span className="inline-block bg-teal-50 text-teal-700 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                        {seller.activityType}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-700 mb-4">
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
                    <div className="flex items-center gap-2">
                      <span>📦</span>
                      <span className="font-medium">
                        {productsCount} منتج متوفر
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/products?seller=${seller.id}`}
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-2.5 rounded-lg text-sm font-semibold"
                  >
                    تصفح منتجات هذا البائع
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-l from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            هل أنت بائع متخصص؟
          </h2>
          <p className="text-slate-300 mb-6">
            انضم إلى شبكتنا واعرض منتجاتك على آلاف المستهلكين
          </p>
          <Link
            href="/seller/register"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            سجّل محلك مجاناً
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
