export default function AcademicsHighlight() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/anatomy museum.webp" alt="Anatomy Museum" className="w-full h-64 object-cover rounded-xl shadow-md" />
              <img src="/images/library.webp" alt="Central Library" className="w-full h-64 object-cover rounded-xl shadow-md mt-8" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-10 text-center">
              <span className="text-4xl font-bold text-primary block">150</span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mt-1">MBBS Seats</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
              Medical College & Research
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
              Shaping the future of global healthcare.
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Dr. B. S. Tomar Institute of Medical Sciences & Research is a premier teaching institution. We integrate rigorous academics with extensive clinical exposure, ensuring our students become the medical leaders of tomorrow.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-secondary mt-1">✓</span>
                <span>Advanced skill labs and modern dissection halls.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-secondary mt-1">✓</span>
                <span>Fully equipped central library with digital research access.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-secondary mt-1">✓</span>
                <span>Expert faculty with international fellowships and experience.</span>
              </li>
            </ul>

            <a href="#contact" className="inline-block border-2 border-primary text-primary font-bold px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-colors">
              Explore Academic Programs
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
