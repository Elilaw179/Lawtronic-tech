import React, { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fit?: 'smart' | 'cover' | 'contain';
  position?: 'center' | 'top' | 'bottom';
  showScanLine?: boolean;
}

export default function SmartImage({
  src,
  alt,
  className = 'aspect-[16/10] w-full',
  imgClassName = '',
  fit = 'smart',
  position = 'center',
  showScanLine = true,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const positionClass =
    position === 'top' ? 'object-top' : position === 'bottom' ? 'object-bottom' : 'object-center';

  if (!src || error) {
    return (
      <div className={`relative flex items-center justify-center bg-panel2/60 border-b border-line overflow-hidden select-none ${className}`}>
        <div className="absolute inset-0 bg-grid-bg opacity-15" />
        <span className="font-display text-lg font-bold text-circuit/25">LAWTRONIC</span>
      </div>
    );
  }

  if (fit === 'cover') {
    return (
      <div className={`relative overflow-hidden bg-void border-b border-line ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 bg-panel2/60 animate-pulse flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-circuit/30 border-t-circuit animate-spin" />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover ${positionClass} transition-all duration-500 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel/75 via-panel/10 to-transparent pointer-events-none" />
        {showScanLine && (
          <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    );
  }

  // 'smart' mode: Ambient Blurred Backfill + Uncropped Centered Foreground Image
  // Ensures 100% of the image is shown (ZERO cutoff) while filling 100% of the card area seamlessly.
  return (
    <div className={`relative overflow-hidden bg-void border-b border-line flex items-center justify-center p-1 ${className}`}>
      {/* Background ambient fill - eliminates empty letterboxing */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40 blur-xl scale-125 pointer-events-none select-none"
      />

      {/* Cybernetic grid overlay */}
      <div className="absolute inset-0 bg-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-panel/30 pointer-events-none" />

      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-panel2/60 animate-pulse flex items-center justify-center z-10">
          <div className="h-6 w-6 rounded-full border-2 border-circuit/30 border-t-circuit animate-spin" />
        </div>
      )}

      {/* Main Foreground Image - Completely uncropped and crisp */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-2xl ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {/* Sci-fi hover scanline */}
      {showScanLine && (
        <div className="scan-line z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
}
