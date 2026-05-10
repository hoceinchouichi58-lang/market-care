"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { sellers } from "@/lib/mockData";

export default function SellersMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeSeller, setActiveSeller] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [3.0588, 36.7538], // الجزائر العاصمة
      zoom: 11,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-left");

    sellers.forEach((seller) => {
      const el = document.createElement("div");
      el.className = "seller-marker";
      el.style.cssText = `
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #14b8a6, #059669);
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        transition: transform 0.2s;
      `;
      el.innerHTML = `<div style="transform: rotate(45deg);">🏪</div>`;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "rotate(-45deg) scale(1.15)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "rotate(-45deg) scale(1)";
      });
      el.addEventListener("click", () => {
        setActiveSeller(seller);
        map.current.flyTo({
          center: [seller.lng, seller.lat],
          zoom: 14,
          duration: 1000,
        });
      });

      new maplibregl.Marker({ element: el })
        .setLngLat([seller.lng, seller.lat])
        .addTo(map.current);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="w-full h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
      />

      {activeSeller && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-white rounded-2xl shadow-2xl p-4 border border-slate-200">
          <button
            onClick={() => setActiveSeller(null)}
            className="absolute top-2 left-2 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 flex items-center justify-center"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
              🏪
            </div>
            <div>
              <div className="font-bold text-slate-900">
                {activeSeller.shopName}
              </div>
              <div className="text-xs text-slate-500">
                {activeSeller.activityType}
              </div>
            </div>
          </div>
          <div className="space-y-1.5 text-sm text-slate-700 mb-3">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span>{activeSeller.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a
                href={`tel:${activeSeller.phone.replace(/\s/g, "")}`}
                className="hover:text-teal-600"
              >
                {activeSeller.phone}
              </a>
            </div>
          </div>
          <a
            href={`tel:${activeSeller.phone.replace(/\s/g, "")}`}
            className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-2 rounded-lg text-sm font-semibold"
          >
            اتصل الآن
          </a>
        </div>
      )}
    </div>
  );
}
