export default function EmergencyTrauma() {
  return (
    <section className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-5 sm:py-6 relative overflow-hidden border-y-2 border-[#c83220]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-7xl">
        <div className="flex items-center gap-3 text-center md:text-left">
          <span className="text-3xl sm:text-4xl shrink-0">🚑</span>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-snug flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span>24/7 Advanced Emergency & Trauma Care</span>
              <span className="text-xs bg-[#c83220] text-white font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                Always Ready
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-0.5">
              Dr. BST Hospital, Jagatpura Jaipur • Trauma team & ICU ready for immediate life-saving response.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2.5 w-full sm:w-auto justify-center">
          <a 
            href="tel:+917412077125"
            className="inline-flex items-center justify-center gap-2 bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform text-center border border-red-400 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
            <span>🚨 24×7 Emergency Care</span>
          </a>
          <a 
            href="https://wa.me/917412077125?text=Hello%20Dr.%20BST%20Hospital%20Jagatpura%2C%20I%20would%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full border border-white/20 transition-all whitespace-nowrap"
          >
            <span>💬 Book Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
