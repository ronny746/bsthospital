export default function EmergencyTrauma() {
  return (
    <section className="bg-secondary text-white py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-150 -translate-y-10">
          <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96,-18.1,95.5,-2.9C95,12.3,88.4,27.3,79.1,40.1C69.8,52.9,57.8,63.4,44.2,71.4C30.6,79.4,15.3,84.8,0.3,84.3C-14.7,83.8,-29.4,77.3,-42.6,69.1C-55.8,60.9,-67.5,51,-76.1,38.8C-84.7,26.6,-90.2,12.1,-90.8,-2.6C-91.4,-17.3,-87.1,-32.2,-78.5,-44.6C-69.9,-57,-57,-66.9,-43.3,-74.3C-29.6,-81.7,-14.8,-86.6,0.6,-87.7C16,-88.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <span className="text-white text-5xl">🚑</span>
            24/7 Advanced Emergency & Trauma Care
          </h2>
          <p className="text-white/90 text-lg max-w-2xl">
            Our specialized trauma team and state-of-the-art ICU are always prepared to handle critical medical and surgical emergencies with immediate response.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a 
            href="tel:+917412077125" 
            className="inline-block bg-white text-secondary font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            Call +91 74120 77125
          </a>
        </div>
      </div>
    </section>
  );
}
