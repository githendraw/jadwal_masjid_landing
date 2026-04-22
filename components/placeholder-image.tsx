import { Image } from "lucide-react";

interface PlaceholderImageProps {
  width: number;
  height: number;
  label: string;
  note: string;
  className?: string;
}

export function PlaceholderImage({
  width,
  height,
  label,
  note,
  className = "",
}: PlaceholderImageProps) {
  const aspectRatio = width / height;

  return (
    <div
      className={`bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: aspectRatio.toFixed(2), maxWidth: "100%" }}
    >
      <div className="text-center p-8">
        <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-foreground font-medium text-lg mb-2">{label}</p>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">{note}</p>
        <p className="text-muted-foreground text-xs mt-4 font-mono">
          {width} x {height} px
        </p>
      </div>
    </div>
  );
}
