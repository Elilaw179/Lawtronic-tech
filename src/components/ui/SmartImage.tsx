import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  /** Container class — controls size/aspect ratio of the card image area */
  className?: string;
  /** Additional classes for the foreground img element */
  imgClassName?: string;
  /**
   * cover  — image fills frame edge-to-edge, cropped to fit (best for photos)
   * smart  — ambient blurred backfill + sharp cover image (best for any image type)
   * contain — full image visible, letterboxed with ambient fill (best for diagrams/logos)
   */
  fit?: 'smart' | 'cover' | 'contain';
  /** Focal point for cropping */
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showScanLine?: boolean;
  /** Gradient overlay intensity at the bottom edge (for text legibility) */
  overlay?: 'none' | 'soft' | 'strong';
}

export default function SmartImage({
  src,
  alt,
  className = 'aspect-[16/10] w-full',
  imgClassName = '',
  fit = 'smart',
  position = 'center',
  showScanLine = true,
  overlay = 'soft',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const objectPositionMap: Record<string, string> = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right',
  };
  const posClass = objectPositionMap[position] ?? 'object-center';

  const overlayClass =
    overlay === 'strong'
      ? 'bg-gradient-to-t from-panel/90 via-panel/30 to-transparent'
      : overlay === 'soft'
      ? 'bg-gradient-to-t from-panel/65 via-panel/10 to-transparent'
      : '';

  /* ── Empty / error state ──────────────────────────────────────── */
  if (!src || error) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden border-b border-line bg-panel2/60 select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-10">
          {/* subtle grid pattern */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-circuit" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <span className="font-display text-sm font-bold tracking-widest text-circuit/30 uppercase">
          LAWTRONIC
        </span>
      </div>
    );
  }

  /* ── Loading skeleton (shared) ────────────────────────────────── */
  const Skeleton = () => (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-panel2/80 animate-pulse">
      <div className="h-6 w-6 rounded-full border-2 border-circuit/30 border-t-circuit animate-spin" />
    </div>
  );

  /* ── COVER mode — clean full-bleed, great for photos ─────────── */
  if (fit === 'cover') {
    return (
      <div className={`relative overflow-hidden border-b border-line bg-void ${className}`}>
        {!loaded && <Skeleton />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover ${posClass} transition-all duration-500 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
        {overlayClass && (
          <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} />
        )}
        {showScanLine && (
          <div className="scan-line z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    );
  }

  /* ── CONTAIN mode — full image visible, ambient fill behind ────── */
  if (fit === 'contain') {
    return (
      <div className={`relative overflow-hidden border-b border-line bg-void flex items-center justify-center ${className}`}>
        {/* Ambient blurred background to fill dead space */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-panel/40 pointer-events-none" />
        {!loaded && <Skeleton />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-xl ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
        {overlayClass && (
          <div className={`absolute inset-0 pointer-events-none z-10 ${overlayClass}`} />
        )}
        {showScanLine && (
          <div className="scan-line z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    );
  }

  /* ── SMART mode (default) ─────────────────────────────────────────
     Dual-layer: blurred ambient fill + sharp cover image on top.
     Works perfectly for ANY image type — portrait, landscape, square,
     diagram, photo, sketch. The cover layer shows the image zoomed
     slightly so it always fills edge-to-edge, while the ambient layer
     fills any "dead zones" with matching colour and mood.
  ──────────────────────────────────────────────────────────────────── */
  return (
    <div className={`relative overflow-hidden border-b border-line bg-void ${className}`}>
      {/* Layer 1: Ambient blurred backfill — eliminates letterboxing */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-125 blur-xl opacity-50 pointer-events-none select-none"
      />

      {/* Layer 2: Dark tint to unify tone and ensure contrast */}
      <div className="absolute inset-0 bg-panel/45 pointer-events-none" />

      {/* Layer 3: Sharp foreground image — covers the frame cleanly */}
      {!loaded && <Skeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`absolute inset-0 h-full w-full object-cover ${posClass} transition-all duration-500 group-hover:scale-[1.04] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {/* Layer 4: Bottom gradient overlay for text legibility */}
      {overlayClass && (
        <div className={`absolute inset-0 pointer-events-none z-10 ${overlayClass}`} />
      )}

      {/* Sci-fi scan line on hover */}
      {showScanLine && (
        <div className="scan-line z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
}
