export default function ChairmanMessage() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-l-full -mr-20 -z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl transform rotate-3"></div>
            <img 
              src="/images/BST-Chairman.png" 
              alt="Chairman, BST Hospital" 
              className="relative rounded-2xl shadow-2xl object-cover w-full max-w-md mx-auto z-10 border-4 border-white"
            />
          </div>
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-1 bg-secondary rounded-full"></span>
              <h4 className="text-secondary font-bold tracking-widest text-sm uppercase">Chairman's Message</h4>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
              "Committed to bringing world-class healthcare within reach."
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 mb-10 leading-relaxed">
              <p>
                At Dr. B. S. Tomar Institute of Medical Sciences & Research and Hospital, our vision has always been to build an institution defined by its clinical excellence, academic rigor, and profound human compassion. 
              </p>
              <p>
                We believe that every patient deserves access to the best medical care supported by advanced technology and a caring team. As we look to the future, we remain dedicated to advancing medical education and setting new benchmarks in healthcare.
              </p>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-primary">Dr. B. S. Tomar</p>
              <p className="text-slate-500 font-semibold mt-1">Founder & Chairman</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
