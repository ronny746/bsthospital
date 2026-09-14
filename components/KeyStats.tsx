export default function KeyStats() {
  const stats = [
    { value: '2500+', label: 'Beds Facility', icon: '🛏️' },
    { value: '20', label: 'Specialized Departments', icon: '⚕️' },
    { value: '150', label: 'MBBS Seats / Year', icon: '🎓' },
    { value: '250+', label: 'Expert Faculties', icon: '👨‍⚕️' },
  ];

  return (
    <section className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-16 relative border-y-4 border-[#bd171c]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center space-y-3 p-2">
              <span className="text-4xl">{stat.icon}</span>
              <h3 className="text-4xl md:text-5xl font-black text-amber-400 font-mono tracking-tight">{stat.value}</h3>
              <p className="text-slate-200 font-extrabold text-xs tracking-wider uppercase opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
