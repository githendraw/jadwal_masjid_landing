"use client";

import Marquee from "react-fast-marquee";

const items = [
  "Masjid Raya Al-Munawaroh",
  "Masjid Jami' Al-Ikhlas",
  "Masjid Nurul Islam",
  "Masjid Al-Hidayah",
  "Masjid Baiturrahman",
  "Masjid At-Taufiq",
  "Masjid Al-Muqaddimah",
  "Masjid An-Nur",
];

export function CredibilityStrip() {
  return (
    <section className="bg-slate-900 py-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500 mb-4">
          Dipercaya oleh {items.length}+ masjid di seluruh Indonesia
        </p>
        <Marquee speed={50} pauseOnHover>
          {items.map((item, index) => (
            <div
              key={index}
              className="mx-8 text-slate-400 font-medium whitespace-nowrap"
            >
              {item}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
