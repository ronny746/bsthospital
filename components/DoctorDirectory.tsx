export default function DoctorDirectory() {
  const doctors = [
    { image: '/doctors/doctor-womens-health.png', specialty: 'Women’s Health', name: 'Dr. Anita Sharma', department: 'Obstetrics & Gynaecology' },
    { image: '/doctors/doctor-orthopaedics.png', specialty: 'Bone & Joint Care', name: 'Dr. Rajiv Mathur', department: 'Orthopaedics' },
    { image: '/doctors/doctor-paediatrics.png', specialty: 'Child Health', name: 'Dr. S. K. Gupta', department: 'Paediatrics' },
    { image: '/doctors/doctor-womens-health.png', specialty: 'General Medicine', name: 'Dr. Neha Singh', department: 'Internal Medicine' },
  ];

  return (
    <section className="py-24 bg-slate-50" id="doctors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-10">
          <div className="max-w-2xl">
            <span className="text-[#bd171c] font-black tracking-widest text-xs uppercase mb-3 block">
              Our Medical Specialists
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#172a34] leading-tight">
              Expert guidance & compassionate care.
            </h2>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {['All', 'Women’s Health', 'Bone & Joint', 'Child Health'].map((tab, idx) => (
              <button 
                key={idx}
                className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-[#172a34] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#172a34] hover:text-[#172a34]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => {
            const message = `Hello BST Hospital, I would like to book an appointment with ${doc.name} (${doc.specialty} - ${doc.department}). Please share available timings.`;
            const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(message)}`;

            return (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="absolute inset-0 w-full h-full object-cover object-top z-10 opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-[#bd171c] text-xs font-black uppercase tracking-wider mb-1 block">{doc.specialty}</span>
                    <h3 className="text-lg font-black text-[#172a34] mb-1">{doc.name}</h3>
                    <p className="text-slate-500 text-xs font-semibold mb-6">{doc.department}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a 
                    href={whatsappUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-md"
                  >
                    <span>💬</span>
                    <span>Book Consultation</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
