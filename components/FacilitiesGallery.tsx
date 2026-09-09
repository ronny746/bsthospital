export default function FacilitiesGallery() {
  const facilities = [
    { image: 'reception.webp', title: 'Reception & Waiting', span: 'col-span-1 md:col-span-2 row-span-2' },
    { image: 'general ward.webp', title: 'General Ward', span: 'col-span-1' },
    { image: 'skill lab.webp', title: 'Advanced Skill Lab', span: 'col-span-1' },
    { image: 'library.webp', title: 'Central Library', span: 'col-span-1' },
    { image: 'dissection hall.webp', title: 'Dissection Hall', span: 'col-span-1' },
  ];

  return (
    <section className="py-24 bg-white" id="facilities">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
            Campus & Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Thoughtful spaces for every care journey.
          </h2>
          <p className="text-slate-600 text-lg">
            From patient care to advanced learning labs, our campus is designed to support clinical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[240px]">
          {facilities.map((fac, idx) => (
            <figure 
              key={idx} 
              className={`group relative rounded-xl overflow-hidden shadow-md ${fac.span}`}
            >
              <img 
                src={`/images/${fac.image}`} 
                alt={fac.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white/70 font-mono text-sm block mb-1">0{idx + 1}</span>
                <h3 className="text-white text-xl md:text-2xl font-semibold">{fac.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
