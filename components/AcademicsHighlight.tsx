export default function AcademicsHighlight() {
  return (
    <section className="py-8 sm:py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img src="/images/anatomy museum.webp" alt="Anatomy Museum" className="w-full h-44 sm:h-64 object-cover rounded-xl shadow-md" />
              <img src="/images/library.webp" alt="Central Library" className="w-full h-44 sm:h-64 object-cover rounded-xl shadow-md mt-4 sm:mt-8" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl z-10 text-center border border-slate-100">
              <span className="text-2xl sm:text-4xl font-bold text-primary block">150</span>
              <span className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-widest block mt-0.5 sm:mt-1">MBBS Seats</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-secondary font-bold tracking-widest text-[11px] sm:text-sm uppercase mb-1.5 sm:mb-4 block">
              Medical College & Research
            </span>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-primary leading-tight mb-2.5 sm:mb-6">
              Shaping the future of global healthcare.
            </h2>
            <p className="text-slate-600 text-xs sm:text-base md:text-lg mb-4 sm:mb-8 leading-relaxed">
              Dr. B. S. Tomar Institute of Medical Sciences & Research is a premier teaching institution. We integrate rigorous academics with extensive clinical exposure, ensuring our students become the medical leaders of tomorrow.
            </p>
            
            <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-10 text-xs sm:text-sm md:text-base">
              <li className="flex items-start gap-2 sm:gap-3 text-slate-700">
                <span className="text-secondary mt-0.5 sm:mt-1 font-bold">✓</span>
                <span>Advanced skill labs and modern dissection halls.</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-slate-700">
                <span className="text-secondary mt-0.5 sm:mt-1 font-bold">✓</span>
                <span>Fully equipped central library with digital research access.</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-slate-700">
                <span className="text-secondary mt-0.5 sm:mt-1 font-bold">✓</span>
                <span>Expert faculty with international fellowships and experience.</span>
              </li>
            </ul>

            <a href="#contact" className="inline-block border-2 border-primary text-primary font-bold px-5 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-primary hover:text-white transition-colors text-xs sm:text-base">
              Explore Academic Programs
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
