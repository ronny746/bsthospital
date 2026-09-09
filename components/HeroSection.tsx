'use client';
import { useState, useEffect } from 'react';

const heroSlides = [
  { image: 'hd_banner_1.jpg', title: 'Balvir Singh Tomar Institute of Medical Science & Research' },
  { image: 'hd_banner_2.jpg', title: 'State-of-the-Art ICU & Advanced Emergency Care' },
  { image: 'hd_banner_3.jpg', title: 'A New Beginning in Excellence and Compassionate Care' },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-slate-100" id="home">
      {/* Background Slider */}
      <div className="relative w-full h-full bg-slate-900">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <img 
              src={`/images/${slide.image}`} 
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            
            {/* Red Polygon Overlay - Top Right (Responsive HTML!) */}
            <div 
              className="absolute top-0 right-0 w-[90%] md:w-[65%] lg:w-[55%] h-[60%] md:h-[65%] bg-[#da2128]/95 z-10 flex items-center justify-center p-8 md:p-12 shadow-2xl backdrop-blur-sm"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            >
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ml-4 md:ml-12 drop-shadow-md max-w-2xl text-right md:text-left">
                {slide.title}
              </h1>
            </div>
          </div>
        ))}

        {/* Content - Floating Appointment Form on the LEFT side */}
        <div className="absolute inset-0 z-20 flex items-center container mx-auto px-6 pointer-events-none">
          <div className="w-full max-w-xs md:max-w-sm glass-card p-4 md:p-6 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border-t-4 border-secondary hidden sm:block pointer-events-auto mt-12 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Book a Consultation</h3>
            <p className="text-slate-500 mb-4 text-xs md:text-sm">Need help? Our team will get back to you.</p>
            <form className="space-y-3">
              <div>
                <input type="text" placeholder="Full Name" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm" />
              </div>
              <div>
                <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm" />
              </div>
              <button className="w-full bg-secondary text-white font-bold py-2 rounded-lg shadow-md hover:bg-secondary-dark transition-colors text-sm">
                Request Call-back
              </button>
            </form>
          </div>
        </div>

        {/* Slide Controls (Arrows) */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute right-16 bottom-6 md:right-20 md:top-1/2 md:-translate-y-1/2 z-20 text-white hover:text-secondary transition-colors drop-shadow-md bg-black/40 hover:bg-black/60 p-2 rounded-full pointer-events-auto"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button 
          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 bottom-6 md:top-1/2 md:-translate-y-1/2 z-20 text-white hover:text-secondary transition-colors drop-shadow-md bg-black/40 hover:bg-black/60 p-2 rounded-full pointer-events-auto"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all shadow-md border border-black/10 ${index === activeSlide ? 'bg-secondary scale-125' : 'bg-white hover:bg-slate-200'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
