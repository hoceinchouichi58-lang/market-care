"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentSeller, logoutSeller } from "@/lib/db";

const menuItems = [
  { href: "/seller/dashboard", label: "الرئيسية", icon: "📊", exact: true },
  { href: "/seller/dashboard/products", label: "منتجاتي", icon: "📦" },
  { href: "/seller/dashboard/orders", label: "الطلبات", icon: "🛒" },
  { href: "/seller/dashboard/profile", label: "الملف الشخصي", icon: "👤" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let active = true;
    getCurrentSeller().then((current) => {
      if (!active) return;
      if (!current) {
        router.replace("/seller/login");
        return;
      }
      setSeller(current);
    });
    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    await logoutSeller();
    router.push("/");
  }

  if (!seller) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">جاري التحميل...</div>
      </div>
    );
  }

  function isActive(item) {
    return item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 right-0 h-screen w-72 bg-white border-l border-slate-200 z-40 transition-transform overflow-y-auto`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <div className="font-bold text-slate-900">MARKET Care</div>
              <div className="text-xs text-slate-500">لوحة البائع</div>
            </div>
          </Link>

          <div className="bg-gradient-to-l from-teal-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                🏪
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 truncate">
                  {seller.shopName}
                </div>
                <div className="text-xs text-slate-600 truncate">
                  {seller.activityType}
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive(item)
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-200 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm"
            >
              <span>🏠</span>
              <span>العودة للموقع</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-sm"
            >
              <span>🚪</span>
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop on mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
        />
      )}
    </>
  );
}
