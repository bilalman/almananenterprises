import React from 'react';

interface LogoProps {
  variant?: 'default' | 'light' | 'compact' | 'mark-only' | 'stacked';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  const isLight = variant === 'light';

  // Mark only (Emblem vector matching exact logo graphic)
  const renderEmblem = (size = 'w-11 h-11') => (
    <div className={`relative ${size} shrink-0 flex items-center justify-center`}>
      <svg
        viewBox="0 0 128 128"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="logo-globe-clip">
            <circle cx="62" cy="62" r="38" />
          </clipPath>
        </defs>

        {/* Base Globe: Grey Lower-Right Half */}
        <circle cx="62" cy="62" r="38" fill="#A4ACB3" />

        {/* Blue Upper-Left Half */}
        <path
          d="M 24 62 A 38 38 0 1 1 98 44 Q 60 62 24 76 Z"
          fill="#0D62C4"
          clipPath="url(#logo-globe-clip)"
        />

        {/* Stylized Continents in White */}
        <g fill="#FFFFFF" clipPath="url(#logo-globe-clip)">
          {/* North America / Europe */}
          <path d="M 44 32 C 47 30, 52 32, 53 36 C 54 40, 50 44, 46 45 C 42 46, 38 43, 37 39 C 36 35, 40 33, 44 32 Z" />
          <path d="M 52 28 C 55 26, 58 28, 57 32 C 55 35, 50 34, 52 28 Z" />
          <path d="M 68 30 C 74 27, 82 29, 85 34 C 88 38, 86 44, 82 46 C 76 49, 70 45, 68 40 C 66 35, 64 32, 68 30 Z" />
          <path d="M 64 36 C 66 34, 70 36, 69 40 C 67 43, 62 40, 64 36 Z" />
          {/* Equatorial / Central */}
          <path d="M 46 48 C 52 46, 56 48, 54 55 C 52 60, 48 64, 44 65 C 40 64, 42 56, 43 52 C 44 49, 42 49, 46 48 Z" />
          {/* Lower continents in grey section */}
          <path d="M 58 64 C 63 60, 72 62, 74 68 C 76 74, 78 84, 73 88 C 68 91, 62 86, 60 78 C 58 72, 54 67, 58 64 Z" />
          <path d="M 78 68 C 84 66, 88 72, 86 78 C 84 82, 78 82, 78 68 Z" />
        </g>

        {/* Lower thick blue swoosh crescent */}
        <path
          d="M 23 78 C 17 68, 17 52, 26 40 C 27 38, 29 39, 28 41 C 21 53, 21 67, 27 76 C 30 80, 36 84, 43 86 C 45 86, 44 88, 42 88 C 34 87, 27 83, 23 78 Z"
          fill="#0D62C4"
        />
        <path
          d="M 20 72 C 16 62, 18 48, 26 38 C 24 49, 24 64, 33 76 C 39 84, 48 88, 56 89 C 46 89, 36 85, 29 79 C 25 76, 22 74, 20 72 Z"
          fill="#0D62C4"
        />

        {/* Dynamic white curved streak slicing across globe to the plane */}
        <path
          d="M 24 74 Q 55 53 103 33 Q 58 57 24 74 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 25 76 Q 58 55 104 33"
          stroke="#9CA3AF"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* Airplane at the top right, pointing ~42 deg up-right */}
        <g transform="translate(104, 26) rotate(42)">
          {/* Fuselage */}
          <path
            d="M 0 -14 C 2 -14, 2.8 -10, 2.8 -3 L 2.8 11 L 1.2 14 L -1.2 14 L -2.8 11 L -2.8 -3 C -2.8 -10, -2 -14, 0 -14 Z"
            fill="#0D62C4"
          />
          {/* Wings */}
          <path
            d="M 0 -2 L 14 6 L 14 8.5 L 2.2 6.5 L 2.2 10 L -2.2 10 L -2.2 6.5 L -14 8.5 L -14 6 L 0 -2 Z"
            fill="#0D62C4"
          />
          {/* Tail */}
          <path
            d="M 0 10 L 6 14 L 6 15.5 L 0 14.5 L -6 15.5 L -6 14 L 0 10 Z"
            fill="#0D62C4"
          />
        </g>
      </svg>
    </div>
  );

  if (variant === 'mark-only') {
    return renderEmblem(className || 'w-10 h-10');
  }

  // Stacked variant (emblem on top, typography below)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderEmblem('w-20 h-20')}
        <div className="mt-2.5 flex flex-col items-center">
          <span
            style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
            className={`font-bold text-2xl tracking-wide ${
              isLight ? 'text-white' : 'text-[#0D62C4]'
            }`}
          >
            AL MANNAN
          </span>
          <span
            style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
            className={`font-bold text-xs tracking-[0.38em] uppercase mt-0.5 ${
              isLight ? 'text-slate-200' : 'text-black'
            }`}
          >
            ENTERPRISES
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {renderEmblem(variant === 'compact' ? 'w-9 h-9' : 'w-12 h-12')}
      <div className="flex flex-col justify-center">
        <span
          style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
          className={`font-bold tracking-normal text-xl sm:text-2xl leading-tight ${
            isLight ? 'text-white' : 'text-[#0D62C4]'
          }`}
        >
          AL MANNAN
        </span>
        <span
          style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
          className={`font-bold text-[10px] sm:text-[11px] tracking-[0.34em] uppercase leading-none mt-1 ${
            isLight ? 'text-slate-200' : 'text-black'
          }`}
        >
          ENTERPRISES
        </span>
      </div>
    </div>
  );
};
