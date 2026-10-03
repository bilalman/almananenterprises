import React from 'react';

export const WHATSAPP_NUMBER = '0325-5556671';
export const WHATSAPP_NUMBER_RAW = '923255556671';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=Hello%20Al-Mannan%20Enterprises%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

interface WhatsAppButtonProps {
  label?: string;
  sublabel?: string;
  variant?: 'solid-green' | 'outline-green' | 'header-pill' | 'compact';
  className?: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'WhatsApp',
  sublabel,
  variant = 'solid-green',
  className = '',
  message
}) => {
  const link = message
    ? `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`
    : WHATSAPP_LINK;

  if (variant === 'header-pill') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
        title="WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span>{label}</span>
        {sublabel ? <span className="opacity-95 text-xs font-semibold">({sublabel})</span> : null}
      </a>
    );
  }

  if (variant === 'outline-green') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span>{label}</span>
        {sublabel ? <span className="opacity-90">({sublabel})</span> : null}
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#20BD5A] font-bold text-xs transition-colors cursor-pointer ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
        <span>{sublabel || label}</span>
      </a>
    );
  }

  // Default solid green
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
      {sublabel ? <span className="font-semibold text-xs opacity-95">({sublabel})</span> : null}
    </a>
  );
};
