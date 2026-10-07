export default function PatientServices() {
  const services = [
    { title: 'Book an Appointment', icon: '📅', link: '#appointment' },
    { title: 'Insurance & TPA', icon: '🛡️', link: '#insurance' },
    { title: 'Admissions & Discharge', icon: '🏥', link: '#admissions' },
    { title: 'Find a Doctor', icon: '👨‍⚕️', link: '#doctors' },
  ];

  return (
    <section className="py-8 sm:py-14 bg-primary text-white">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 sm:mb-10 text-center md:text-left">
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2">Patient Services & Support</h2>
            <p className="text-xs sm:text-sm text-primary-200">Everything you need for a smooth healthcare journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {services.map((service, idx) => (
            <a 
              key={idx} 
              href={service.link}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 sm:p-6 flex flex-col items-center text-center transition-all group"
            >
              <span className="text-2xl sm:text-4xl mb-1.5 sm:mb-4 group-hover:scale-110 transition-transform">{service.icon}</span>
              <span className="text-xs sm:text-sm font-bold">{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
