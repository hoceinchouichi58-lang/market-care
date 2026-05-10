import Link from "next/link";
import { categories } from "@/lib/mockData";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?category=${cat.id}`}
          className={`${cat.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform hover:shadow-md`}
        >
          <div className="text-3xl mb-2">{cat.icon}</div>
          <div className="text-xs font-semibold leading-tight">{cat.name}</div>
        </Link>
      ))}
    </div>
  );
}
