import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryGrid from "@/components/CategoryGrid";
import { getFeaturedProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Cpath d=%22M30 30m-25 0a25 25 0 1 0 50 0a25 25 0 1 0 -50 0%22 stroke=%22white%22 stroke-width=%221%22 fill=%22none%22/%3E%3C/svg%3E')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌟 أول منصة جزائرية متخصصة
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              المنتجات الشبه طبية والأغذية المتخصصة
              <br />
              <span className="text-teal-200">بين يديك</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-8 leading-relaxed">
              منصة تربطك بأقرب بائع متخصص في منتجات السكري، الحمية، أغذية
              الأطفال الخاصة، والمكملات الغذائية — بكل سهولة وثقة.
            </p>

            {/* Search Bar */}
            <form action="/products" className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="q"
                placeholder="ابحث عن منتج... (مثلاً: حليب خالي من اللاكتوز)"
                className="flex-1 px-4 py-3 text-slate-900 outline-none text-base"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                🔍 ابحث
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-teal-100">
              <div className="flex items-center gap-2">
                ✓ بحث حسب الموقع الجغرافي
              </div>
              <div className="flex items-center gap-2">
                ✓ معلومات دقيقة عن كل منتج
              </div>
              <div className="flex items-center gap-2">
                ✓ تواصل مباشر مع البائع
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              تصفح حسب الفئة
            </h2>
            <p className="text-slate-600">
              اعثر على ما تحتاجه بسرعة من خلال فئاتنا المتخصصة
            </p>
          </div>
        </div>
        <CategoryGrid />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              منتجات مميزة
            </h2>
            <p className="text-slate-600">
              منتجات مختارة من بائعين موثوقين قريبين منك
            </p>
          </div>
          <Link
            href="/products"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            عرض الكل ←
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              لا توجد منتجات بعد
            </h3>
            <p className="text-slate-600 mb-6">
              كن أول بائع يعرض منتجاته على المنصة!
            </p>
            <Link
              href="/seller/register"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold"
            >
              سجّل كبائع
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-white py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">كيف تعمل المنصة؟</h2>
            <p className="text-slate-600">ثلاث خطوات بسيطة للحصول على ما تحتاجه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", icon: "🔍", title: "ابحث", desc: "اكتب اسم المنتج أو اختر الفئة المناسبة" },
              { num: "2", icon: "📍", title: "اعثر على الأقرب", desc: "نعرض لك البائعين المتوفرين مرتبين حسب المسافة" },
              { num: "3", icon: "🤝", title: "تواصل واطلب", desc: "تواصل مباشرة مع البائع أو اطلب عبر المنصة" },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center text-4xl mb-4 border border-teal-100">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-teal-600 mb-2">
                  الخطوة {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for sellers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-l from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل أنت بائع متخصص؟
            </h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              انضم لأكبر شبكة من البائعين المتخصصين في الجزائر. اعرض منتجاتك
              لآلاف المستهلكين الذين يبحثون عنها يومياً.
            </p>
            <Link
              href="/seller/register"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg"
            >
              سجّل محلك الآن — مجاناً
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
