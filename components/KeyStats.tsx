export default function KeyStats() {
  const stats = [
    { value: '24/7', label: 'Emergency Care', icon: '🚑' },
    { value: '30+', label: 'Specialties', icon: '⚕️' },
    { value: '500+', label: 'Beds Facility', icon: '🛏️' },
    { value: '100+', label: 'Expert Doctors', icon: '👨‍⚕️' },
  ];

  return (
    <section className="bg-primary text-white py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">{stat.icon}</span>
              <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
              <p className="text-primary-200 font-medium text-sm tracking-wide uppercase opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
