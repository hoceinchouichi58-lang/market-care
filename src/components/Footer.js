export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <div className="font-bold text-white text-lg">MARKET Care</div>
          </div>
          <p className="text-sm leading-relaxed">
            منصة رقمية متخصصة تربط المستهلكين بالبائعين في مجال المنتجات الشبه
            طبية والأغذية المتخصصة في الجزائر.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-teal-400">الرئيسية</a></li>
            <li><a href="/products" className="hover:text-teal-400">المنتجات</a></li>
            <li><a href="/sellers" className="hover:text-teal-400">البائعون</a></li>
            <li><a href="/about" className="hover:text-teal-400">عن المشروع</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">للبائعين</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/seller/register" className="hover:text-teal-400">انضم كبائع</a></li>
            <li><a href="/seller/dashboard" className="hover:text-teal-400">لوحة التحكم</a></li>
            <li><a href="/help" className="hover:text-teal-400">المساعدة</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">تواصل معنا</h3>
          <ul className="space-y-2 text-sm">
            <li>📧 contact@marketcare.dz</li>
            <li>📞 0555 00 00 00</li>
            <li>📍 الجزائر العاصمة</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-400">
          © 2026 MARKET Care — مشروع مؤسسة ناشئة جامعية. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
