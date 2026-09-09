export default function CentersOfExcellence() {
  const departments = [
    ['General Medicine', 'Clinical care', 'Diagnosis, treatment and preventive care for adults.', '/images/general ward.webp'],
    ['Orthopaedics', 'Bone & joint', 'Movement, injury and joint-care support for every age.', '/images/ortho.webp'],
    ['Paediatrics', 'Child health', 'Age-appropriate healthcare and family guidance.', '/images/paeditrics.webp'],
    ['Radio-Diagnosis', 'Diagnostics', 'Diagnostic imaging support for clinical decision-making.', '/images/Radio diagonosis.webp'],
    ['Otorhinolaryngology', 'ENT care', 'Ear, nose and throat clinical support.', '/images/Otorhinolaryngology.webp'],
    ['Pathology', 'Diagnostics', 'Diagnostic pathology and laboratory services.', '/images/pathology.webp'],
    ['Psychiatry', 'Mental health', 'Mental health consultation and support.', '/images/psychiatry.webp'],
    ['Pharmacology', 'Academic', 'Clinical pharmacology education and research.', '/images/Pharmacy.webp'],
  ];

  return (
    <section className="py-24 bg-cream" id="departments">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
              Centers of Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Care for every chapter of your health.
            </h2>
          </div>
          <p className="text-slate-600 max-w-md mt-6 md:mt-0 md:text-right">
            We provide a broad spectrum of medical and surgical specialties, with teams supported by modern facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map(([name, kind, description, image], idx) => (
            <article 
              key={idx} 
              className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-slate-50/50 overflow-hidden p-4">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <span className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-none">
                  {kind}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {name}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                  {description}
                </p>
                <a 
                  href="#appointment" 
                  className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  Request support
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#departments" className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-md hover:bg-primary-dark transition-colors shadow-lg">
            View All Departments
          </a>
        </div>
      </div>
    </section>
  );
}
