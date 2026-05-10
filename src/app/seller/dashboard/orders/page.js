"use client";

import { useEffect, useState } from "react";
import {
  getCurrentSeller,
  getSellerOrders,
  updateOrderStatus,
} from "@/lib/sellerStore";
import { formatPrice } from "@/lib/mockData";

export default function SellerOrdersPage() {
  const [seller, setSeller] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const s = getCurrentSeller();
    if (!s) return;
    setSeller(s);
    setOrders(getSellerOrders(s.id));
  }, []);

  function refresh() {
    setOrders(getSellerOrders(seller.id));
  }

  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status);
    refresh();
  }

  if (!seller) return null;

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-1">📬 الطلبات</h1>
      <p className="text-slate-600 mb-8">
        إدارة طلبات الزبائن وتأكيدها
      </p>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1 mb-6 inline-flex gap-1 overflow-x-auto">
        {[
          { id: "all", label: "الكل", count: counts.all },
          { id: "pending", label: "قيد الانتظار", count: counts.pending },
          { id: "confirmed", label: "مؤكدة", count: counts.confirmed },
          { id: "completed", label: "مكتملة", count: counts.completed },
          { id: "cancelled", label: "ملغاة", count: counts.cancelled },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
              filter === tab.id
                ? "bg-teal-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            لا توجد طلبات في هذه الفئة
          </h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900">
                      {order.customerName}
                    </div>
                    <a
                      href={`tel:${order.customerPhone.replace(/\s/g, "")}`}
                      className="text-sm text-slate-500 hover:text-teal-600"
                    >
                      📞 {order.customerPhone}
                    </a>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-slate-500 mb-0.5">المنتج</div>
                  <div className="font-semibold text-slate-900">
                    {order.productName}
                  </div>
                  <div className="text-xs text-slate-500">
                    الكمية: {order.qty}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <div className="text-xs text-slate-500">الإجمالي</div>
                    <div className="text-xl font-bold text-teal-700">
                      {formatPrice(order.total)}
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              {/* Actions */}
              {order.status === "pending" && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleStatusChange(order.id, "confirmed")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    ✓ تأكيد الطلب
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "cancelled")}
                    className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    ✕ رفض
                  </button>
                </div>
              )}
              {order.status === "confirmed" && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleStatusChange(order.id, "completed")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    ✓ تم التسليم
                  </button>
                </div>
              )}

              <div className="mt-3 text-xs text-slate-400">
                {new Date(order.createdAt).toLocaleString("ar-DZ", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
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
    <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${c.class}`}>
      {c.label}
    </span>
  );
}
