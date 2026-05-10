import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "عن المشروع — MARKET Care",
  description: "تعرف على مشروع MARKET Care، رؤيتنا، فريقنا، والمشكلة التي نحلها",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            مشروع مؤسسة ناشئة جامعية
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            عن MARKET Care
          </h1>
          <p className="text-xl text-teal-100 leading-relaxed">
            منصة رقمية مبتكرة تربط بين المستهلكين والبائعين في مجال المنتجات
            الشبه طبية والأغذية المتخصصة الموجهة لذوي الاحتياجات الصحية الخاصة
            في الجزائر.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* The Problem */}
        <section>
          <div className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-3">
            المشكلة
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            لماذا انطلق هذا المشروع؟
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            في ظل تزايد الطلب على المنتجات الشبه طبية والغذائية المتخصصة
            الموجهة لفئات ذات احتياجات صحية خاصة، يواجه المستهلك في الجزائر
            تحديات حقيقية:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🔍", title: "صعوبة الوصول", desc: "محدودية توفر المنتجات وصعوبة العثور عليها" },
              { icon: "📋", title: "غياب التنظيم", desc: "عدم وجود منصة منظمة لعرض هذه المنتجات" },
              { icon: "❓", title: "نقص المعلومات", desc: "غياب معلومات دقيقة عن المكونات والتركيبة" },
              { icon: "⏰", title: "ضياع الوقت", desc: "إهدار الجهد في البحث والتنقل بين المحلات" },
            ].map((item, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section>
          <div className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-3">
            الحل
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            كيف تحل MARKET Care هذه المشكلة؟
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            انطلاقاً من هذه المشكلة، صمّمنا منصة رقمية تعمل كوسيط منظم بين
            البائعين والمستهلكين، توفر:
          </p>
          <div className="space-y-4">
            {[
              { num: "01", title: "تسجيل البائعين", desc: "حساب خاص لكل بائع يحتوي على معلومات المحل الكاملة، نوع النشاط، الموقع الجغرافي، والسجل التجاري" },
              { num: "02", title: "إدارة المنتجات", desc: "لوحة تحكم مرنة تتيح للبائع إضافة منتجاته مع التفاصيل: الفئة، السعر، الكمية، الصلاحية، والصور" },
              { num: "03", title: "بحث ذكي بالموقع", desc: "ترتيب النتائج تلقائياً حسب الأقرب جغرافياً للمستهلك، مع عرض المسافة" },
              { num: "04", title: "تواصل مباشر", desc: "إمكانية الطلب الإلكتروني أو التواصل المباشر مع البائع" },
              { num: "05", title: "دفع رقمي", desc: "دعم الدفع الإلكتروني تماشياً مع التوجه الوطني للتحول الرقمي" },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
                <div className="text-3xl font-bold text-teal-200 flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Added Value */}
        <section className="bg-gradient-to-l from-teal-50 to-emerald-50 rounded-3xl p-8 md:p-10 border border-teal-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            القيمة المضافة للمشروع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "تحسين الوصول", desc: "للمنتجات الشبه طبية والأغذية الخاصة بدقة" },
              { icon: "👥", title: "دعم الفئات الخاصة", desc: "خدمة ذوي الاحتياجات الصحية الخاصة" },
              { icon: "💼", title: "تحول رقمي", desc: "دعم رقمنة التجارة المتخصصة في الجزائر" },
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expected Results */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            النتائج المتوقعة
          </h2>
          <div className="space-y-3">
            {[
              "تنظيم سوق المنتجات الشبه طبية والأغذية المتخصصة وتسهيل الوصول إليها",
              "ضبط التوزيع العادل والمستمر للمنتجات الشبه طبية والمواد الغذائية الخاصة للفئة المستهدفة",
              "المساهمة في تعزيز الدفع الرقمي وفقاً لتوجهات القانون النقدي والمصرفي في مجال الدفع الإلكتروني",
              "خلق نموذج اقتصادي مستدام يدعم الاقتصاد الرقمي الجزائري",
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </div>
                <p className="text-slate-700 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">فريق المشروع</h2>
          <p className="text-slate-600 mb-8">طلبة ماستر 02 — جامعة الجزائر</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: "زياني ملاك ريان", role: "عضو الفريق" },
              { name: "شمام محمد عبد الرؤوف", role: "عضو الفريق" },
              { name: "شويشي عبد الرحمان الحسين", role: "عضو الفريق" },
            ].map((m, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mb-3">
                  👤
                </div>
                <h3 className="font-bold text-slate-900">{m.name}</h3>
                <p className="text-sm text-slate-500">{m.role}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">الإشراف الأكاديمي</h3>
            <div className="space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold w-32">المشرف الرئيسي:</span>
                <span>بوزانة أيمن</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold w-32">المشرف المساعد 1:</span>
                <span>بلعيد محمد مولود</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold w-32">المشرف المساعد 2:</span>
                <span>شحماط شهر الدين</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
