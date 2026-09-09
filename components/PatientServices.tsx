export default function PatientServices() {
  const services = [
    { title: 'Book an Appointment', icon: '📅', link: '#appointment' },
    { title: 'Insurance & TPA', icon: '🛡️', link: '#insurance' },
    { title: 'Admissions & Discharge', icon: '🏥', link: '#admissions' },
    { title: 'Find a Doctor', icon: '👨‍⚕️', link: '#doctors' },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Patient Services & Support</h2>
            <p className="text-primary-200">Everything you need for a smooth healthcare journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <a 
              key={idx} 
              href={service.link}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 flex flex-col items-center text-center transition-all group"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</span>
              <span className="font-semibold">{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
