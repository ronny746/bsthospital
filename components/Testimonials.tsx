export default function Testimonials() {
  const testimonials = [
    { name: 'Rajesh Kumar', text: 'The doctors at BST Hospital were incredibly supportive during my surgery. The facilities are top-notch and the nursing staff is very caring.' },
    { name: 'Sunita Devi', text: 'We brought our child for an emergency in the middle of the night. The pediatric team responded immediately. Highly recommend their 24/7 care.' },
    { name: 'Amit Sharma', text: 'Excellent diagnostic facilities. I got my MRI and blood tests done very quickly, and the specialists explained everything clearly.' },
  ];

  return (
    <section className="py-8 sm:py-16 md:py-24 bg-cream overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white -z-10 skew-y-3 transform origin-top-left"></div>
      
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="text-center mb-6 sm:mb-12 md:mb-16 max-w-2xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-[11px] sm:text-sm uppercase mb-1 sm:mb-3 block">
            Patient Stories
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-primary mb-2 sm:mb-4">
            Hear from our patients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md relative border-t-4 border-secondary">
              <span className="absolute -top-5 left-6 text-5xl sm:text-6xl text-secondary opacity-20">"</span>
              <p className="text-slate-600 text-xs sm:text-sm italic mb-4 sm:mb-6 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm sm:text-base">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xs sm:text-sm">{t.name}</h4>
                  <span className="text-[10px] sm:text-xs text-slate-400">Verified Patient</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
