'use client';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[260px] sm:h-[380px] md:h-[520px] overflow-hidden bg-slate-950" id="home">
      {/* 1. CONTINUOUS VIDEO BACKGROUND - 100% UNOBSTRUCTED & PURE */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/bst-hero-building.png"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Minimal Contrast Overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* 2. SIGNATURE RED POLYGON BRAND BADGE - TOP RIGHT (Clean & Non-Intrusive) */}
      <div 
        className="absolute top-0 right-0 z-20 bg-[#c83220]/95 text-white py-1 sm:py-2 pl-6 sm:pl-10 pr-3 sm:pr-6 shadow-2xl backdrop-blur-sm border-b-2 border-amber-400/40"
        style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <div className="text-right flex items-center justify-end gap-1.5 sm:gap-2">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-300 animate-ping"></span>
          <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-wide drop-shadow whitespace-nowrap">
            Dr. BST Hospital, Jagatpura, Jaipur
          </span>
        </div>
      </div>
    </section>
  );
}
