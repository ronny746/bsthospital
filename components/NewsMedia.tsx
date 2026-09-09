'use client';
import { useState } from 'react';

export default function NewsMedia() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const news = [
    { image: '1news.webp', title: 'Healthcare Excellence Awards', category: 'Awards' },
    { image: '2news.webp', title: 'Community Health Camp Organized', category: 'Community' },
    { image: '3news.webp', title: 'New Advanced ICU Wing Opened', category: 'Campus Updates' },
    { image: '4news.webp', title: 'BST Awarded for Medical Excellence', category: 'In The News' },
    { image: '5news.webp', title: 'Annual Medical Conference 2026', category: 'Events' },
    { image: '6news.webp', title: 'State-of-the-art Equipment Installed', category: 'Technology' },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
            Media & Updates
          </span>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Moments that connect care with community.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <article key={idx} className="bg-white rounded-2xl overflow-hidden shadow-md group cursor-pointer" onClick={() => setSelectedImage(`/images/${item.image}`)}>
              <div className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
                <img 
                  src={`/images/${item.image}`} 
                  alt={item.title} 
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <span className="text-slate-400 text-sm font-mono mb-3 block">Oct {10 + idx}, 2026</span>
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Explore the latest updates from BST's care, campus, and community initiatives.
                </p>
                <button className="text-secondary font-bold text-sm inline-flex items-center group-hover:underline">
                  View image
                  <span className="ml-1">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox Dialog */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute -top-12 right-0 text-white hover:text-secondary text-4xl"
                onClick={() => setSelectedImage(null)}
                aria-label="Close dialog"
              >
                &times;
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-auto rounded-xl shadow-2xl object-contain max-h-[85vh]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
