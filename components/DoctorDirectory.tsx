export default function DoctorDirectory() {
  const doctors = [
    { image: '/doctors/doctor-womens-health.png', specialty: 'Women’s Health & Gynaecology', name: 'Dr. Anita Sharma', department: 'Obstetrics & Gynaecology', exp: '16+ Yrs' },
    { image: '/doctors/doctor-orthopaedics.png', specialty: 'Orthopaedics & Joint Care', name: 'Dr. Rajiv Mathur', department: 'Bone, Joint & Spine Surgery', exp: '18+ Yrs' },
    { image: '/doctors/doctor-paediatrics.png', specialty: 'Paediatrics & Neonatology', name: 'Dr. S. K. Gupta', department: 'Child Healthcare & PICU', exp: '12+ Yrs' },
    { image: '/doctors/doctor-womens-health.png', specialty: 'Critical Care & Internal Med', name: 'Dr. Sunita Verma', department: 'Emergency & Critical Care', exp: '14+ Yrs' },
  ];

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-slate-50" id="doctors">
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 sm:mb-10 border-b border-slate-200 pb-3 sm:pb-6 gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <span className="text-[#c83220] font-black tracking-widest text-[11px] sm:text-xs uppercase mb-1 sm:mb-2 block">
              OUR MEDICAL SPECIALISTS
            </span>
            <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-[#172a34] leading-tight">
              Expert guidance & compassionate medical care.
            </h2>
          </div>
          <a
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#c83220] hover:underline"
          >
            <span>View All Doctors</span>
            <span>➔</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {doctors.map((doc, idx) => {
            const message = `Hello BST Hospital, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD timings.`;
            const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(message)}`;

            return (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 sm:h-60 bg-slate-100 overflow-hidden">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {doc.exp}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 text-center">
                    <span className="text-[#c83220] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-0.5 sm:mb-1 block">
                      {doc.specialty}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-[#172a34] mb-0.5">{doc.name}</h3>
                    <p className="text-slate-500 text-xs font-semibold">{doc.department}</p>
                  </div>
                </div>

                {/* Compact Red Consultation Button - Direct WhatsApp */}
                <div className="p-3 pt-0 sm:p-4 sm:pt-0">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md"
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
