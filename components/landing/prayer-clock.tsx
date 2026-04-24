"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Prayer time data (simulated for demo)
const prayerTimes = [
  { name: "Subuh", time: "04:15", icon: "🌙" },
  { name: "Terbit", time: "05:42", icon: "🌅" },
  { name: "Dzuhur", time: "12:05", icon: "☀️" },
  { name: "Ashar", time: "15:02", icon: "🌤️" },
  { name: "Maghrib", time: "18:18", icon: "🌇" },
  { name: "Isya", time: "19:30", icon: "🌃" },
];

export function PrayerClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [activePrayer, setActivePrayer] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // Find the current active prayer based on time
      let nextPrayer = 0;
      for (let i = prayerTimes.length - 1; i >= 0; i--) {
        const [h, m] = prayerTimes[i].time.split(":").map(Number);
        const prayerMinutes = h * 60 + m;
        if (currentMinutes >= prayerMinutes) {
          nextPrayer = i;
          break;
        }
      }
      setActivePrayer(nextPrayer);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time?.getHours() ?? 0;
  const minutes = time?.getMinutes() ?? 0;
  const seconds = time?.getSeconds() ?? 0;

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  // Determine the next prayer
  const getNextPrayer = () => {
    if (!time) return prayerTimes[0];
    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    for (let i = 0; i < prayerTimes.length; i++) {
      const [h, m] = prayerTimes[i].time.split(":").map(Number);
      const prayerMinutes = h * 60 + m;
      if (currentMinutes < prayerMinutes) {
        return prayerTimes[i];
      }
    }
    return prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();

  // Calculate countdown
  const getCountdown = () => {
    if (!time) return "";
    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    const [h, m] = nextPrayer.time.split(":").map(Number);
    const prayerMinutes = h * 60 + m;
    const diff = prayerMinutes - currentMinutes;
    if (diff <= 0) return "Sesuai waktu";
    const hoursCount = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hoursCount > 0) {
      return `${hoursCount} jam ${mins} menit lagi`;
    }
    return `${mins} menit lagi`;
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Jadwal Sholat{" "}
            <span className="text-primary">Real-time</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Tampil profesional di TV masjid Anda. Jadwal otomatis update setiap
            hari, akurat berdasarkan lokasi GPS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* TV Frame Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* TV Frame */}
            <div className="relative w-full max-w-md">
              {/* TV Body */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-3 sm:p-4 shadow-2xl">
                {/* TV Screen */}
                <div className="bg-gradient-to-br from-gray-950 to-gray-900 rounded-2xl overflow-hidden">
                  {/* Screen content */}
                  <div className="bg-gradient-to-b from-emerald-950 to-emerald-900 p-6 sm:p-8 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between">
                    {/* Top bar */}
                    <div className="text-center mb-6">
                      <p className="text-emerald-300/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
                        Jadwal Sholat
                      </p>
                      <h3 className="text-white text-lg sm:text-2xl font-bold mt-1">
                        Masjid Al-Ihsan
                      </h3>
                    </div>

                    {/* Clock Display */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <svg
                          viewBox="0 0 200 200"
                          className="w-48 h-48 sm:w-56 sm:h-56 drop-shadow-xl"
                        >
                          <defs>
                            <linearGradient
                              id="clockFace2"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#064a32" />
                              <stop offset="100%" stopColor="#0a2a1a" />
                            </linearGradient>
                            <filter id="glow2">
                              <feGaussianBlur
                                stdDeviation="2"
                                result="coloredBlur"
                              />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Clock face */}
                          <circle
                            cx="100"
                            cy="100"
                            r="95"
                            fill="url(#clockFace2)"
                            stroke="#10B981"
                            strokeWidth="3"
                          />

                          {/* Inner ring */}
                          <circle
                            cx="100"
                            cy="100"
                            r="85"
                            fill="none"
                            stroke="#1e3a5f"
                            strokeWidth="1"
                          />

                          {/* Hour markers */}
                          {[...Array(12)].map((_, i) => {
                            const angle = (i * 30 - 90) * (Math.PI / 180);
                            const x1 = Number(
                              (100 + 75 * Math.cos(angle)).toFixed(2)
                            );
                            const y1 = Number(
                              (100 + 75 * Math.sin(angle)).toFixed(2)
                            );
                            const x2 = Number(
                              (100 + 85 * Math.cos(angle)).toFixed(2)
                            );
                            const y2 = Number(
                              (100 + 85 * Math.sin(angle)).toFixed(2)
                            );
                            return (
                              <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#10B981"
                                strokeWidth={i % 3 === 0 ? 3 : 1}
                                strokeLinecap="round"
                              />
                            );
                          })}

                          {/* Hour hand */}
                          <line
                            x1="100"
                            y1="100"
                            x2={Number(
                              (100 + 50 * Math.sin((hourDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            y2={Number(
                              (100 - 50 * Math.cos((hourDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            stroke="#F1F5F9"
                            strokeWidth="4"
                            strokeLinecap="round"
                            filter="url(#glow2)"
                          />
                          {/* Minute hand */}
                          <line
                            x1="100"
                            y1="100"
                            x2={Number(
                              (100 + 65 * Math.sin((minuteDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            y2={Number(
                              (100 - 65 * Math.cos((minuteDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeLinecap="round"
                            filter="url(#glow2)"
                          />
                          {/* Second hand */}
                          <line
                            x1="100"
                            y1="100"
                            x2={Number(
                              (100 + 70 * Math.sin((secondDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            y2={Number(
                              (100 - 70 * Math.cos((secondDeg * Math.PI) / 180)).toFixed(2)
                            )}
                            stroke="#F59E0B"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />

                          {/* Center dots */}
                          <circle
                            cx="100"
                            cy="100"
                            r="6"
                            fill="#10B981"
                            filter="url(#glow2)"
                          />
                          <circle cx="100" cy="100" r="3" fill="#0A192F" />

                          {/* SHOLAT text */}
                          <text
                            x="100"
                            y="40"
                            textAnchor="middle"
                            fill="#10B981"
                            fontSize="10"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            SHOLAT
                          </text>
                        </svg>
                      </div>
                    </div>

                    {/* Next prayer info */}
                    <div className="text-center">
                      <p className="text-emerald-300/70 text-xs sm:text-sm mb-1">
                        {getCountdown()}
                      </p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {nextPrayer.name} — {nextPrayer.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TV Stand */}
              <div className="flex justify-center mt-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full" />
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-3 bg-gray-800 rounded-b-lg" />
              </div>
            </div>
          </motion.div>

          {/* Prayer Times List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="text-white text-lg font-semibold mb-4 px-2">
              Jadwal Hari Ini
            </h3>
            {prayerTimes.map((prayer, index) => {
              const isActive = index === activePrayer;
              const isNext = prayer.name === nextPrayer.name;
              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    isNext
                      ? "bg-emerald-600/30 border border-emerald-500/50 shadow-lg"
                      : isActive
                      ? "bg-emerald-800/20 border border-emerald-500/30"
                      : "bg-gray-800/40 border border-gray-700/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{prayer.icon}</span>
                    <span
                      className={`text-base font-medium ${
                        isNext ? "text-emerald-300" : "text-gray-300"
                      }`}
                    >
                      {prayer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isNext && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                        Berikutnya
                      </span>
                    )}
                    <span
                      className={`text-lg font-mono font-bold ${
                        isNext ? "text-emerald-300" : "text-white"
                      }`}
                    >
                      {prayer.time}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
