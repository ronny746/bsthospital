export default function EmergencyTrauma() {
  return (
    <section className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-3 sm:py-4.5 relative overflow-hidden border-y-2 border-[#c83220]">
      <div className="container mx-auto px-3 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 max-w-7xl">
        {/* Header Text & Icon */}
        <div className="text-center md:text-left w-full md:w-auto">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl shrink-0">🚑</span>
            <h2 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight">
              24/7 Advanced Emergency & Trauma Care
            </h2>
            <span className="text-[9px] sm:text-[10px] bg-[#c83220] text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse whitespace-nowrap">
              Always Ready
            </span>
          </div>
          <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-medium mt-1 leading-snug">
            Dr. BST Hospital, Jagatpura Jaipur • Trauma team & ICU ready for immediate life-saving response.
          </p>
        </div>

        {/* Buttons: Clean side-by-side on mobile without overflow */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center shrink-0 mt-0.5 sm:mt-0">
          <a 
            href="tel:+917412077125"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-[11px] sm:text-xs md:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:scale-105 transition-transform text-center border border-red-400 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping"></span>
            <span>🚨 24×7 Emergency Care</span>
          </a>
          <a 
            href="https://wa.me/917412077125?text=Hello%20Dr.%20BST%20Hospital%20Jagatpura%2C%20I%20would%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 transition-all whitespace-nowrap"
          >
            <span>💬 Book Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
