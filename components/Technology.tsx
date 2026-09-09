export default function Technology() {
  const equipment = [
    { name: 'Advanced Radiology', desc: 'High-resolution MRI and CT scanning for precise diagnostics.' },
    { name: 'Modern ICU', desc: 'State-of-the-art monitoring systems in our critical care units.' },
    { name: 'Surgical Suites', desc: 'Modular operation theaters equipped with the latest surgical technology.' },
    { name: 'Clinical Pathology', desc: 'Automated 24/7 laboratory services for rapid and accurate results.' },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
            Technology & Infrastructure
          </span>
          <h2 className="text-4xl font-bold text-primary mb-6">
            Equipped for Excellence
          </h2>
          <p className="text-slate-600 text-lg">
            We invest in the latest medical technology to support our specialists in delivering accurate diagnoses and effective treatments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipment.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{item.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
