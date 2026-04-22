import { cn } from "@/lib/utils";

interface MihrabCardProps {
  children?: React.ReactNode;
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
        "relative bg-gradient-to-b from-card to-card/80 rounded-2xl overflow-hidden transition-all duration-300",
        active && "ring-2 ring-primary shadow-lg shadow-primary/20",
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
          active ? "bg-primary/10" : "bg-muted/30"
        )}
      />

      {active && prayerName && prayerTime && (
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <span className="text-xs text-primary uppercase tracking-wider">
            {prayerName}
          </span>
          <span className="text-2xl font-mono font-bold text-foreground">
            {prayerTime}
          </span>
        </div>
      )}

      <div className="relative z-10 p-6">{children}</div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1",
          active ? "bg-primary" : "bg-muted"
        )}
      />
    </div>
  );
}

interface MihrabBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export function MihrabBadge({ children, className }: MihrabBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30",
        className
      )}
    >
      {children}
    </span>
  );
}
