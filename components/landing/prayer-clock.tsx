"use client";

import { useEffect, useState } from "react";

export function PrayerClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time?.getHours() ?? 0;
  const minutes = time?.getMinutes() ?? 0;
  const seconds = time?.getSeconds() ?? 0;

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="clockFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
          <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="95"
          fill="url(#clockFace)"
          stroke="#10B981"
          strokeWidth="3"
        />

        <circle cx="100" cy="100" r="85" fill="none" stroke="#1e3a5f" strokeWidth="1" />

        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = Number((100 + 75 * Math.cos(angle)).toFixed(2));
          const y1 = Number((100 + 75 * Math.sin(angle)).toFixed(2));
          const x2 = Number((100 + 85 * Math.cos(angle)).toFixed(2));
          const y2 = Number((100 + 85 * Math.sin(angle)).toFixed(2));
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

        <line
          x1="100"
          y1="100"
          x2={Number((100 + 50 * Math.sin((hourDeg * Math.PI) / 180)).toFixed(2))}
          y2={Number((100 - 50 * Math.cos((hourDeg * Math.PI) / 180)).toFixed(2))}
          stroke="#F1F5F9"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <line
          x1="100"
          y1="100"
          x2={Number((100 + 65 * Math.sin((minuteDeg * Math.PI) / 180)).toFixed(2))}
          y2={Number((100 - 65 * Math.cos((minuteDeg * Math.PI) / 180)).toFixed(2))}
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <line
          x1="100"
          y1="100"
          x2={Number((100 + 70 * Math.sin((secondDeg * Math.PI) / 180)).toFixed(2))}
          y2={Number((100 - 70 * Math.cos((secondDeg * Math.PI) / 180)).toFixed(2))}
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="100" cy="100" r="6" fill="#10B981" filter="url(#glow)" />
        <circle cx="100" cy="100" r="3" fill="#0A192F" />

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

      <div className="mt-4 text-left w-fit">
        <span className="text-2xl font-mono font-bold text-primary">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </span>
      </div>
    </div>
  );
}
