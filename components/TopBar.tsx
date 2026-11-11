export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#9e2417] text-white py-1.5 text-[10px] sm:text-[11px] tracking-wide border-b border-white/10">
      <div className="w-full px-2.5 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-1">
        <div className="flex items-center gap-2 sm:gap-6 truncate shrink-0">
          <a href="tel:+917412077125" className="font-black text-[#e5b64a] hover:text-white transition flex items-center gap-1 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="hidden sm:inline">24×7 Emergency:</span>
            <span>+91 74120 77125</span>
          </a>
          <span className="hidden md:inline text-slate-300 font-medium border-l border-white/20 pl-4 truncate">
            📍 Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur, Rajasthan 302012
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <a href="/careers" className="text-slate-300 hover:text-white transition text-[10px] sm:text-[11px] font-semibold">
            Careers
          </a>

          <a 
            href="/contact" 
            className="bg-white/15 hover:bg-white/25 text-[#e5b64a] hover:text-white border border-[#e5b64a]/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-black transition flex items-center gap-1 shadow-sm whitespace-nowrap"
          >
            <span>👤</span>
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
