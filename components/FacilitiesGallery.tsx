export default function FacilitiesGallery() {
  const facilities = [
    { image: 'reception.webp', title: 'Reception & Waiting', span: 'col-span-1 md:col-span-2 row-span-2' },
    { image: 'general ward.webp', title: 'General Ward', span: 'col-span-1' },
    { image: 'skill lab.webp', title: 'Advanced Skill Lab', span: 'col-span-1' },
    { image: 'library.webp', title: 'Central Library', span: 'col-span-1' },
    { image: 'dissection hall.webp', title: 'Dissection Hall', span: 'col-span-1' },
  ];

  return (
    <section className="py-8 sm:py-16 md:py-24 bg-white" id="facilities">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="text-center mb-6 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-[11px] sm:text-sm uppercase mb-1 sm:mb-3 block">
            Campus & Infrastructure
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-primary leading-tight mb-2 sm:mb-4">
            Thoughtful spaces for every care journey.
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg">
            From patient care to advanced learning labs, our campus is designed to support clinical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:auto-rows-[240px]">
          {facilities.map((fac, idx) => (
            <figure 
              key={idx} 
              className={`group relative rounded-xl overflow-hidden shadow-md min-h-[190px] md:min-h-0 ${fac.span}`}
            >
              <img 
                src={`/images/${fac.image}`} 
                alt={fac.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <figcaption className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-6">
                <span className="text-white/70 font-mono text-xs sm:text-sm block mb-0.5 sm:mb-1">0{idx + 1}</span>
                <h3 className="text-white text-base sm:text-xl md:text-2xl font-bold">{fac.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
