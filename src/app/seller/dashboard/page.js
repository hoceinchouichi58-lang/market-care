"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCurrentSeller,
  getSellerProducts,
  getSellerOrders,
} from "@/lib/db";
import { formatPrice } from "@/lib/mockData";

export default function DashboardHome() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const s = await getCurrentSeller();
      if (!active || !s) return;
      const [p, o] = await Promise.all([
        getSellerProducts(s.id),
        getSellerOrders(s.id),
      ]);
      if (!active) return;
      setSeller(s);
      setProducts(p);
      setOrders(o);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading || !seller)
    return <div className="p-10 text-slate-500">جاري التحميل...</div>;

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);
  const availableProducts = products.filter((p) => p.available).length;

  const stats = [
    {
      label: "المنتجات",
      value: products.length,
      sub: `${availableProducts} متوفر`,
      icon: "📦",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "الطلبات الجديدة",
      value: pendingOrders.length,
      sub: "بانتظار التأكيد",
      icon: "🔔",
      color: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
    {
      label: "إجمالي الطلبات",
      value: orders.length,
      sub: "منذ التسجيل",
      icon: "🛒",
      color: "from-teal-500 to-teal-600",
      bg: "bg-teal-50",
      text: "text-teal-700",
    },
    {
      label: "الإيرادات",
      value: formatPrice(totalRevenue),
      sub: "من الطلبات المكتملة",
      icon: "💰",
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          مرحباً، {seller.shopName} 👋
        </h1>
        <p className="text-slate-600">
          إليك نظرة سريعة على نشاط محلك اليوم
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-slate-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.text} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/seller/dashboard/products/new"
          className="bg-gradient-to-l from-teal-600 to-emerald-700 text-white rounded-2xl p-6 hover:shadow-lg transition group"
        >
          <div className="text-4xl mb-3">➕</div>
          <h3 className="font-bold text-lg mb-1">إضافة منتج جديد</h3>
          <p className="text-sm text-teal-100">
            أضف منتجاً جديداً إلى محلك
          </p>
        </Link>
        <Link
          href="/seller/dashboard/orders"
          className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="text-4xl mb-3">📬</div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">
            عرض الطلبات
          </h3>
          <p className="text-sm text-slate-600">
            راجع طلبات الزبائن وقم بتأكيدها
          </p>
        </Link>
        <Link
          href="/seller/dashboard/profile"
          className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="text-4xl mb-3">⚙️</div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">
            إعدادات المحل
          </h3>
          <p className="text-sm text-slate-600">
            حدّث معلومات محلك وموقعه
          </p>
        </Link>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">آخر الطلبات</h2>
          <Link
            href="/seller/dashboard/orders"
            className="text-sm text-teal-600 hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            لا توجد طلبات بعد
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center gap-4 hover:bg-slate-50"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  🛒
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 truncate">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-slate-500 truncate">
                    {order.productName} × {order.qty}
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-teal-700">
                    {formatPrice(order.total)}
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    pending: { label: "قيد الانتظار", class: "bg-amber-100 text-amber-700" },
    confirmed: { label: "مؤكد", class: "bg-blue-100 text-blue-700" },
    completed: { label: "مكتمل", class: "bg-green-100 text-green-700" },
    cancelled: { label: "ملغي", class: "bg-red-100 text-red-700" },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.class}`}>
      {c.label}
    </span>
  );
}
