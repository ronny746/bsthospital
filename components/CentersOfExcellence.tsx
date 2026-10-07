export default function CentersOfExcellence() {
  const departments = [
    ['Anesthesia', 'Surgical Care', 'General, regional & local anesthesia for complex surgical interventions & pain management.', '/images/anesthesia.jpg'],
    ['Critical Care', '24/7 ICU & HDU', '24/7 Level-1 ICU, HDU, multi-organ failure support & advanced mechanical ventilation.', '/images/bst-icu-ward.jpg'],
    ['General Medicine', 'Clinical Care', 'Adult internal medicine, metabolic disorders, multi-system illness & preventive care.', '/images/bst-doctor-consultation.jpg'],
    ['General Surgery', 'Surgical Care', 'Advanced laparoscopic surgery, trauma surgery, hernia, abdominal & GI procedures.', '/images/general_surgery.jpg'],
    ['Orthopedic', 'Bone & Joint', 'Total knee & hip replacement, complex trauma fracture care, arthroscopy & spine surgery.', '/images/orthopedics.jpg'],
    ['ENT', 'Ear, Nose & Throat', 'Microscopic ear surgery, endoscopic sinus surgery, throat & voice clinical care.', '/images/ent.jpg'],
    ['Dermatology', 'Skin & Hair Care', 'Clinical dermatology, skin disorders, laser therapies & pediatric dermatological care.', '/images/dermatology.jpg'],
    ['Ophthalmology', 'Eye Care & Vision', 'Comprehensive eye care, cataract microsurgery, glaucoma & refractive screening.', '/images/ophthalmology.jpg'],
    ['Obs and Gynaecology', 'Maternal Health', 'High-risk pregnancy care, painless delivery, laparoscopy & women health.', '/images/gynaecology.jpg'],
    ['Paediatric', 'Child & NICU', 'Child health, newborn intensive care NICU/PICU, vaccinations & pediatric nutrition.', '/images/paediatrics.jpg'],
    ['Psychiatry', 'Mental Wellness', 'Behavioral health, stress management, counseling, neuropsychiatry & wellness.', '/images/psychiatry.jpg'],
    ['Physiotherapy', 'Rehab & Mobility', 'Post-operative rehabilitation, sports injury recovery, neuro-rehab & mobility.', '/images/physiotherapy.jpg'],
    ['Radiology', '24/7 Diagnostics', 'Multi-slice CT scan, digital X-Ray, high-resolution color Doppler ultrasound.', '/images/Radio diagonosis.webp'],
    ['Pathology', 'Automated Lab', 'Automated diagnostic pathology, hematology, histopathology & cytology testing.', '/images/bst-diagnostic-lab.jpg'],
    ['Biochemistry', 'Diagnostic Labs', 'Automated biochemistry analyzers, hormonal assays, cardiac & metabolic profiles.', '/images/bst-clinical-diagnostics.jpg'],
    ['Microbiology', 'Infectious Disease', 'Infectious disease diagnostics, blood cultures, antimicrobial sensitivity & serology.', '/images/bst-medical-research.jpg'],
    ['Dietetics', 'Clinical Nutrition', 'Therapeutic diet planning for ICU, diabetics, surgical patients & wellness.', '/images/dietetics.jpg'],
    ['Dental', 'Oral & Maxillofacial', 'Comprehensive dentistry, oral maxillofacial surgery, dental implants & orthodontics.', '/images/dental.jpg'],
  ];

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-cream" id="departments">
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 border-b border-slate-200 pb-3 sm:pb-6 gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <span className="text-[#c83220] font-black tracking-widest text-[11px] sm:text-xs uppercase mb-1 sm:mb-2 block">
              CENTERS OF CLINICAL EXCELLENCE
            </span>
            <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-[#172a34] leading-tight">
              Comprehensive super-specialty departments.
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md font-medium">
            20+ clinical departments equipped with modular operation theatres, modern intensive care units, and experienced specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {departments.map(([name, kind, description, image], idx) => {
            const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(`Hello BST Hospital, I would like to consult with the ${name} department.`)}`;

            return (
              <article 
                key={idx} 
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-200/90"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 z-20 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">
                    {kind}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-3.5 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base font-black text-[#172a34] mb-1 sm:mb-2 group-hover:text-[#c83220] transition-colors">
                    {name}
                  </h3>
                  <p className="text-slate-600 text-xs mb-3 sm:mb-4 flex-grow leading-relaxed">
                    {description}
                  </p>
                  
                  {/* Compact Red Consultation Button */}
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs font-bold bg-[#c83220]/10 hover:bg-[#c83220] text-[#c83220] hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    <span>💬 Consult Department</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-12 text-center">
          <a 
            href="/departments" 
            className="inline-block bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all shadow-md hover:scale-105"
          >
            Explore All 20+ Departments ➔
          </a>
        </div>
      </div>
    </section>
  );
}
