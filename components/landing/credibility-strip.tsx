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
    <section className="bg-green-100 py-6 border-y border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-green-700 mb-4">
          Dipercaya oleh {items.length}+ masjid di seluruh Indonesia
        </p>
        <Marquee speed={50} pauseOnHover>
          {items.map((item, index) => (
            <div
              key={index}
              className="mx-8 text-green-700 font-medium whitespace-nowrap"
            >
              {item}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
