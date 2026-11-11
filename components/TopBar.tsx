export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#9e2417] text-white py-1.5 text-[10px] sm:text-[11px] tracking-wide border-b border-white/10">
      <div className="w-full px-2.5 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-1">
        <div className="flex items-center gap-2 sm:gap-6 truncate shrink-0">
          <a href="tel:01412602222" className="font-black text-[#e5b64a] hover:text-white transition flex items-center gap-1 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="hidden sm:inline">24×7 Emergency:</span>
            <span>0141-2602222</span>
          </a>
          <span className="hidden md:inline text-slate-300 font-medium border-l border-white/20 pl-4 truncate">
            📍 Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur, Rajasthan 302012
          </span>
        </div>

        <div className="flex items-center shrink-0">
          <a
            href="/careers"
            className="group inline-flex items-center gap-1.5 bg-white/10 hover:bg-[#e5b64a] text-white hover:text-[#172a34] border border-white/25 hover:border-[#e5b64a] px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5b64a] group-hover:bg-[#172a34] transition-colors animate-pulse"></span>
            <span>💼</span>
            <span>Careers</span>
            <span className="text-[10px] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform">➔</span>
          </a>
        </div>
      </div>
    </div>
  );
}
