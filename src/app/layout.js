import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata = {
  title: "MARKET Care — منصة المنتجات الشبه طبية والأغذية المتخصصة",
  description:
    "منصة رقمية تربط المستهلكين بالبائعين المتخصصين في المنتجات الشبه طبية والأغذية الموجهة لذوي الاحتياجات الصحية الخاصة في الجزائر.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
