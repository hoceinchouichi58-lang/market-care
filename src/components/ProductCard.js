import Image from "next/image";
import Link from "next/link";
import { getCategoryById, formatPrice } from "@/lib/mockData";

export default function ProductCard({ product }) {
  const seller = product.seller;
  const category = getCategoryById(product.categoryId);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-teal-200 transition-all"
    >
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-slate-300">
            📦
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              غير متوفر حالياً
            </span>
          </div>
        )}
        {category && (
          <span
            className={`absolute top-2 right-2 ${category.color} text-xs font-medium px-2 py-1 rounded-full`}
          >
            {category.icon} {category.name}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-teal-700">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-teal-600">
            {formatPrice(product.price)}
          </span>
        </div>

        {seller && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <span>📍</span>
            <span className="truncate">{seller.shopName}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
