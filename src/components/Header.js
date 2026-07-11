import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            M
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-slate-900">MARKET Care</div>
            <div className="text-xs text-slate-500 hidden sm:block">
              منصة المنتجات الشبه طبية
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-slate-700 hover:text-teal-600">
            الرئيسية
          </Link>
          <Link href="/products" className="text-slate-700 hover:text-teal-600">
            المنتجات
          </Link>
          <Link href="/sellers" className="text-slate-700 hover:text-teal-600">
            البائعون
          </Link>
          <Link href="/about" className="text-slate-700 hover:text-teal-600">
            عن المشروع
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/seller/register"
            className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-50 rounded-lg transition"
          >
            انضم كبائع
          </Link>
          <Link
            href="/seller/login"
            className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-sm"
          >
            دخول
          </Link>
        </div>
      </div>
    </header>
  );
}
