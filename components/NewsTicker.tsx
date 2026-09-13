export default function NewsTicker() {
  const tickerItems = (
    <div className="flex items-center gap-12 shrink-0">
      <span className="text-[#bd171c] font-black bg-amber-300 text-[#172a34] px-2 py-0.5 rounded flex items-center gap-2">
        ⚡ NIMS TATKAAL SEVA: 24/7 ONLINE ICU BED BOOKING (PRE-BOOKING ₹5,000/-)
      </span>
      <span className="text-white/40">•</span>
      <span className="text-secondary font-extrabold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        ADMISSIONS OPEN 2026 - 2027 FOR MBBS
      </span>
      <span className="text-white/40">•</span>
      <span>DR. B. S. TOMAR INSTITUTE OF MEDICAL SCIENCES & RESEARCH</span>
      <span className="text-white/40">•</span>
      <span className="text-amber-400 font-bold">🚨 24/7 ICU & EMERGENCY CARE AVAILABLE</span>
      <span className="text-white/40">•</span>
      <span className="text-secondary font-extrabold">CALL EMERGENCY: +91 74120 77125</span>
      <span className="text-white/40">•</span>
    </div>
  );

  return (
    <div className="bg-primary-dark text-white py-2 overflow-hidden flex items-center relative border-b border-primary/20 select-none">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-primary-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-primary-dark to-transparent pointer-events-none" />

      <div className="flex w-max animate-marquee font-bold tracking-wider text-xs uppercase">
        {tickerItems}
        {tickerItems}
      </div>
    </div>
  );
}
