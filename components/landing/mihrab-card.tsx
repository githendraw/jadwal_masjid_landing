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
        "relative bg-gradient-to-b from-white to-green-50 rounded-2xl overflow-hidden transition-all duration-300 border border-green-200",
        active && "ring-2 ring-green-600 shadow-lg shadow-green-600/20",
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
          active ? "bg-green-100" : "bg-green-50"
        )}
      />

      {active && prayerName && prayerTime && (
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <span className="text-xs text-green-400 uppercase tracking-wider">
            {prayerName}
          </span>
          <span className="text-2xl font-mono font-bold text-green-900">
            {prayerTime}
          </span>
        </div>
      )}

      <div className="relative z-10 p-6">{children}</div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1",
          active ? "bg-green-600" : "bg-green-200"
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
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30",
        className
      )}
    >
      {children}
    </span>
  );
}
