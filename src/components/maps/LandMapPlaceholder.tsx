import { Map, MapPin, Layers } from "lucide-react";

interface LandMapPlaceholderProps {
  title?: string;
  height?: string;
}

export function LandMapPlaceholder({
  title = "Interactive Land Map",
  height = "h-[400px]",
}: LandMapPlaceholderProps) {
  return (
    <div
      className={`relative ${height} rounded-xl border-2 border-dashed border-vor-border bg-white overflow-hidden`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vor-navy/5 text-vor-navy mb-4">
          <Map className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-semibold text-vor-navy">{title}</h3>
        <p className="mt-2 text-sm text-vor-slate max-w-md">
          Google Maps / Mapbox integration placeholder. Verified land parcels will display
          with GPS boundaries, title status overlays, and investment zone layers.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-vor-slate">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-vor-border">
            <MapPin className="h-3.5 w-3.5 text-vor-trust" aria-hidden />
            GPS-verified plots
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-vor-border">
            <Layers className="h-3.5 w-3.5 text-vor-gold" aria-hidden />
            Investment zones
          </span>
        </div>
      </div>
      {/* Decorative grid suggesting map tiles */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#0B1426 1px, transparent 1px), linear-gradient(90deg, #0B1426 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
    </div>
  );
}
