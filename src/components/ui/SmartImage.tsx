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
  className = 'aspect-[4/3] w-full',
  imgClassName = '',
  fit = 'smart',
  position = 'center',
  showScanLine = true,
  overlay = 'soft',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const initials = alt
    ? alt
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'LT';

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
      ? 'bg-gradient-to-t from-black/80 via-black/25 to-transparent'
      : overlay === 'soft'
      ? 'bg-gradient-to-t from-black/55 via-black/10 to-transparent'
      : '';

  /* ── Empty / error fallback state ────────────────────────────── */
  if (!src || error) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden border-b border-line bg-slate-900 select-none ${className}`}
      >
        {/* Animated radar rings */}
        <div className="absolute h-20 w-20 rounded-full border border-circuit/10 animate-ping opacity-20" />
        <div className="absolute h-16 w-16 rounded-full border border-circuit/15" />
        <div className="absolute h-10 w-10 rounded-full border border-circuit/25" />
        <div className="scan-line z-10" />
        {/* Initials badge */}
        <span className="relative z-10 font-display text-3xl font-bold text-circuit [text-shadow:0_0_16px_currentColor]">
          {initials}
        </span>
      </div>
    );
  }

  /* ── Loading skeleton (shared) ────────────────────────────────── */
  const Skeleton = () => (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/80 animate-pulse">
      <div className="h-6 w-6 rounded-full border-2 border-circuit/30 border-t-circuit animate-spin" />
    </div>
  );

  /* ── COVER mode — clean full-bleed ───────────────────────────── */
  if (fit === 'cover') {
    return (
      <div className={`relative overflow-hidden border-b border-line/60 bg-slate-950 shadow-card ${className}`}>
        {!loaded && <Skeleton />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover ${posClass} transition-all duration-700 group-hover:scale-[1.06] ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          loading="lazy"
        />
        {overlayClass && (
          <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
        {showScanLine && (
          <div className="scan-line z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-circuit/0 group-hover:ring-circuit/30 transition-all duration-500 pointer-events-none" />
      </div>
    );
  }

  /* ── CONTAIN mode — full image visible, ambient fill behind ────── */
  if (fit === 'contain') {
    return (
      <div className={`relative overflow-hidden border-b border-line/60 bg-slate-950 flex items-center justify-center shadow-card ${className}`}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        {!loaded && <Skeleton />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`relative z-10 max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.06] drop-shadow-xl ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          loading="lazy"
        />
        {overlayClass && (
          <div className={`absolute inset-0 pointer-events-none z-10 ${overlayClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
        {showScanLine && (
          <div className="scan-line z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-circuit/0 group-hover:ring-circuit/30 transition-all duration-500 pointer-events-none" />
      </div>
    );
  }

  /* ── SMART mode (default) ───────────────────────────────────────── */
  return (
    <div className={`relative overflow-hidden border-b border-line/60 bg-slate-950 shadow-card ${className}`}>
      {/* Layer 1: Ambient blurred backfill */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-125 blur-xl opacity-40 pointer-events-none select-none"
      />

      {/* Layer 2: Neutral dark tint (never affected by light-mode sky blue) */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Layer 3: Sharp foreground image */}
      {!loaded && <Skeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`absolute inset-0 h-full w-full object-cover ${posClass} transition-all duration-700 group-hover:scale-[1.06] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        loading="lazy"
      />

      {/* Layer 4: Gradient overlays & hover effects */}
      {overlayClass && (
        <div className={`absolute inset-0 pointer-events-none z-10 ${overlayClass}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none z-10" />

      {showScanLine && (
        <div className="scan-line z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-circuit/0 group-hover:ring-circuit/30 transition-all duration-500 pointer-events-none z-20" />
    </div>
  );
}
