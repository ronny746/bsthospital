'use client';

import { useState } from 'react';

interface DoctorAvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function DoctorAvatar({ src, alt, className = '' }: DoctorAvatarProps) {
  const [loadError, setLoadError] = useState(false);

  // Check if image is present, non-empty, and not a dummy/fallback
  const hasImage =
    Boolean(src && src.trim()) &&
    !src?.includes('doctor-womens-health') &&
    !src?.includes('doctor-orthopaedics') &&
    !src?.includes('doctor-paediatrics') &&
    !loadError;

  if (hasImage && src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setLoadError(true)}
        loading="lazy"
      />
    );
  }

  // Modern Medical Doctor Silhouette / Icon Placeholder
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 via-sky-50/60 to-slate-200 text-slate-400 select-none p-4 relative ${className}`}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white text-slate-400 relative">
        {/* Medical Doctor Icon */}
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-[#172a34]/40"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* Head & Neck */}
          <path d="M12 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
          {/* Doctor Coat & Stethoscope Silhouette */}
          <path d="M6 19.5c0-3.5 2.5-5.5 6-5.5s6 2 6 5.5v1.5H6v-1.5zm6-4c-2.8 0-4.5 1.5-4.5 3.5h9c0-2-1.7-3.5-4.5-3.5z" />
          {/* Stethoscope cord overlay */}
          <path
            d="M9.5 13.5v2a2.5 2.5 0 005 0v-2"
            stroke="#c83220"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="12" cy="18" r="1" fill="#c83220" />
        </svg>

        {/* Small Stethoscope Badge */}
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs">
          🩺
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="inline-block bg-white/90 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
          Medical Specialist
        </span>
        <p className="text-[10px] text-slate-400 font-bold mt-1">
          Dr. B. S. Tomar Hospital
        </p>
      </div>
    </div>
  );
}

