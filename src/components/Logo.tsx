import React, { useState } from 'react';
import brandIconImage from '../assets/brand-icon.png';
import faviconImage from '../assets/favicon.png';

interface LogoProps {
  variant?: 'default' | 'mark-only' | 'inverted' | 'footer' | string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  hideSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  className = '',
  iconClassName = '',
  textClassName = '',
  hideSubtitle = false
}) => {
  const [iconSrc, setIconSrc] = useState<string>(brandIconImage);

  const handleIconError = () => {
    if (iconSrc === brandIconImage) {
      setIconSrc('/brand-icon.png');
    } else if (iconSrc === '/brand-icon.png') {
      setIconSrc('/brand-icon.svg');
    } else if (iconSrc === '/brand-icon.svg') {
      setIconSrc(faviconImage);
    } else if (iconSrc === faviconImage) {
      setIconSrc('/favicon.png');
    }
  };

  // Mark-only variant: returns just the plane emblem icon
  if (variant === 'mark-only') {
    return (
      <img
        src={iconSrc}
        alt="Al Mannan Enterprises Emblem"
        onError={handleIconError}
        className={`h-10 sm:h-12 w-auto object-contain shrink-0 ${iconClassName || className}`}
      />
    );
  }

  const isInverted = variant === 'inverted';

  // Exact logo brand colors:
  // "AL MANNAN" is in signature logo royal blue (#136AB3)
  // "ENTERPRISES" is in black like the logo (#000000)
  // Subtitle "OVERSEAS EMPLOYMENT PROMOTERS" is in dark charcoal/black
  const alMannanColor = isInverted ? '#38BDF8' : '#136AB3';
  const enterprisesColor = isInverted ? '#FFFFFF' : '#000000';
  const subtitleColor = isInverted ? '#CBD5E1' : '#18181B';

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 select-none ${className}`}>
      {/* Standalone Plane Emblem Icon */}
      <img
        src={iconSrc}
        alt="Al Mannan Enterprises Icon"
        onError={handleIconError}
        className={`h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-105 ${iconClassName}`}
      />

      {/* Corporate Typography: All Uppercase with ENTERPRISES in Black */}
      <div className={`flex flex-col justify-center text-left leading-tight ${textClassName}`}>
        <div
          className="font-black tracking-tight uppercase whitespace-nowrap text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19.5px] transition-colors flex items-center gap-1 sm:gap-1.5"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif"
          }}
        >
          <span style={{ color: alMannanColor }}>AL MANNAN</span>
          <span style={{ color: enterprisesColor }}>ENTERPRISES</span>
        </div>

        {!hideSubtitle && (
          <div
            className="tracking-[0.06em] sm:tracking-[0.09em] uppercase text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold mt-0.5 whitespace-nowrap"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
              color: subtitleColor
            }}
          >
            OVERSEAS EMPLOYMENT PROMOTERS
          </div>
        )}
      </div>
    </div>
  );
};
