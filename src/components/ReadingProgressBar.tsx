import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollY / scrollHeight) * 100));
        setScrollProgress(percentage);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0A3871] via-[#1E5CA8] to-[#0A3871] transition-all duration-150 ease-out shadow-xs shadow-[#0A3871]/40"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
