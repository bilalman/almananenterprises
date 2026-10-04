import React, { useState } from 'react';
import logoImage from '../assets/logo.png';
import faviconImage from '../assets/favicon.png';

interface LogoProps {
  variant?: 'default' | 'mark-only' | string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  const [logoSrc, setLogoSrc] = useState<string>(logoImage);
  const [favSrc, setFavSrc] = useState<string>(faviconImage);

  if (variant === 'mark-only') {
    return (
      <img
        src={favSrc}
        alt="Al-Mannan Enterprises"
        onError={() => {
          if (favSrc === faviconImage) setFavSrc('/favicon.png');
          else if (favSrc === '/favicon.png') setFavSrc('/favicon.svg');
        }}
        className={`w-10 h-10 object-contain shrink-0 ${className}`}
      />
    );
  }

  // Exact logo image with multi-tier fallback for production hosting
  return (
    <img
      src={logoSrc}
      alt="AL MANNAN ENTERPRISES"
      onError={() => {
        if (logoSrc === logoImage) setLogoSrc('/logo.png');
        else if (logoSrc === '/logo.png') setLogoSrc('/logo.svg');
      }}
      className={`h-12 sm:h-14 md:h-16 w-auto object-contain ${className}`}
    />
  );
};
