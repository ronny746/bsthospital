'use client';

import React from 'react';

export default function GlobalHonors() {
  const globalGalleries = [
    {
      src: '/images/resource/image1.webp',
      title: 'Global Health Summit 2025',
      desc: 'Prof. (Dr.) Balvir S. Tomar addressing international medical delegations & bilateral health leaders.',
    },
    {
      src: '/images/resource/image2.webp',
      title: 'With Union Minister Shri Nitin Gadkari',
      desc: 'Presentation of Clinical Healthcare Initiatives & Research Monograph on rural health accessibility.',
    },
    {
      src: '/images/resource/image3.webp',
      title: 'European Academic Collaboration',
      desc: 'MoU signing fostering international medical exchange, surgical pedagogy and global clinical training.',
    },
    {
      src: '/images/resource/image4.webp',
      title: 'National Healthcare Excellence Award',
      desc: 'Honoring pioneering contributions in pediatric gastroenterology, organ transplant and healthcare leadership.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
      <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[#c83220] font-black text-[10px] sm:text-xs uppercase tracking-wider block">
              GLOBAL ENGAGEMENTS &amp; DISTINCTIONS
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#172a34]">
              Moments of Clinical Leadership &amp; International Honors
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Prof. (Dr.) Balvir S. Tomar with national &amp; international leaders
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {globalGalleries.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-slate-900 relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold line-clamp-1 drop-shadow">
                  {item.title}
                </div>
              </div>
              <div className="p-3.5 flex flex-col flex-grow bg-white">
                <h4 className="font-black text-xs text-[#172a34] mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal flex-grow">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

