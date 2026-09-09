export default function NewsTicker() {
  return (
    <div className="bg-primary-dark text-white py-2 overflow-hidden flex items-center relative border-b border-primary/20">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-primary-dark to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-primary-dark to-transparent" />
      
      <div className="whitespace-nowrap animate-marquee flex items-center gap-12 font-bold tracking-widest text-xs">
        <span className="text-secondary">✦ ADMISSIONS OPEN 2026 - 2027 FOR MBBS</span>
        <span className="text-white/50">•</span>
        <span>DR. B. S. TOMAR INSTITUTE OF MEDICAL SCIENCES & RESEARCH</span>
        <span className="text-white/50">•</span>
        <span className="text-secondary">✦ ADMISSIONS OPEN 2026 - 2027 FOR MBBS</span>
        <span className="text-white/50">•</span>
        <span>APPLY NOW FOR SESSION 2026 - 2027</span>
        <span className="text-white/50">•</span>
        <span className="text-secondary">✦ ADMISSIONS OPEN 2026 - 2027 FOR MBBS</span>
      </div>
    </div>
  );
}
