import DashboardSidebar from "@/components/DashboardSidebar";

export const metadata = {
  title: "لوحة التحكم — MARKET Care",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 grid lg:grid-cols-[288px_1fr]">
      <DashboardSidebar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
