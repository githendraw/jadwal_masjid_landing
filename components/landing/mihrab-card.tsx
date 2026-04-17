import { cn } from "@/lib/utils";

interface MihrabCardProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  prayerName?: string;
  prayerTime?: string;
}

export function MihrabCard({
  children,
  className,
  active = false,
  prayerName,
  prayerTime,
}: MihrabCardProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden transition-all duration-300",
        active && "ring-2 ring-amber-500 shadow-lg shadow-amber-500/20",
        className
      )}
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 40px), 50% 100%, 0 calc(100% - 40px))",
      }}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-50",
          active ? "bg-amber-500/10" : "bg-slate-700/30"
        )}
      />

      {active && prayerName && prayerTime && (
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <span className="text-xs text-amber-400 uppercase tracking-wider">
            {prayerName}
          </span>
          <span className="text-2xl font-mono font-bold text-white">
            {prayerTime}
          </span>
        </div>
      )}

      <div className="relative z-10 p-6">{children}</div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1",
          active ? "bg-amber-500" : "bg-slate-600"
        )}
      />
    </div>
  );
}

interface MihrabBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function MihrabBadge({ children, className }: MihrabBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30",
        className
      )}
    >
      {children}
    </span>
  );
}
