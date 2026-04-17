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
      className={`bg-slate-800 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: aspectRatio.toFixed(2), maxWidth: "100%" }}
    >
      <div className="text-center p-8">
        <Image className="w-12 h-12 mx-auto mb-4 text-slate-500" />
        <p className="text-white font-medium text-lg mb-2">{label}</p>
        <p className="text-slate-400 text-sm max-w-md mx-auto">{note}</p>
        <p className="text-slate-500 text-xs mt-4 font-mono">
          {width} x {height} px
        </p>
      </div>
    </div>
  );
}
