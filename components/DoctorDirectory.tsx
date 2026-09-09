export default function DoctorDirectory() {
  const doctors = [
    { image: '/doctors/doctor-womens-health.png', specialty: 'Women’s Health', name: 'Dr. Anita Sharma', department: 'Obstetrics & Gynaecology' },
    { image: '/doctors/doctor-orthopaedics.png', specialty: 'Bone & Joint Care', name: 'Dr. Rajiv Mathur', department: 'Orthopaedics' },
    { image: '/doctors/doctor-paediatrics.png', specialty: 'Child Health', name: 'Dr. S. K. Gupta', department: 'Paediatrics' },
    { image: '/doctors/doctor-womens-health.png', specialty: 'General Medicine', name: 'Dr. Neha Singh', department: 'Internal Medicine' },
  ];

  return (
    <section className="py-24 bg-slate-50" id="doctors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-10">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
              Our Specialists
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Expert guidance begins with a conversation.
            </h2>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {['All', 'Women’s Health', 'Bone & Joint', 'Child Health'].map((tab, idx) => (
              <button 
                key={idx}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
              <div className="relative h-64 bg-slate-200 overflow-hidden">
                {/* Fallback avatar if image fails to load or is placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top z-10 opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">{doc.specialty}</span>
                <h3 className="text-xl font-bold text-primary mb-1">{doc.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{doc.department}</p>
                <a href="#appointment" className="inline-block w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                  Book Appointment
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
