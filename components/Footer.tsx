export default function Footer() {
  return (
    <footer className="bg-[#0e191f] text-slate-300 py-16 border-t-[8px] border-[#c83220]" id="contact">
      <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-1 space-y-4">
            <img src="/bst-nav-logo.jpg" alt="Dr. B. S. Tomar Institute of Medical Sciences, Research & Hospital Logo" className="h-12 w-auto bg-white p-1 rounded-xl shadow-md" />
            <p className="text-xs leading-relaxed text-slate-300">
              <strong className="text-white">Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur</strong>. Delivering 24/7 emergency care, 1000+ beds &amp; advanced multi-specialty healthcare.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c83220] text-white transition-colors text-xs font-bold">
                f
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c83220] text-white transition-colors text-xs font-bold">
                in
              </a>
            </div>
          </div>
          
          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-black mb-5 text-base tracking-wide border-l-4 border-[#c83220] pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="/" className="hover:text-[#c83220] transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-[#c83220] transition-colors">About Us</a></li>
              <li><a href="/#departments" className="hover:text-[#c83220] transition-colors">Departments</a></li>
              <li><a href="/doctors" className="hover:text-[#c83220] transition-colors">Find a Doctor</a></li>
              <li><a href="/careers" className="hover:text-[#c83220] transition-colors">Careers & Jobs</a></li>
              <li><a href="/#facilities" className="hover:text-[#c83220] transition-colors">Facilities</a></li>
              <li><a href="/contact" className="hover:text-[#c83220] transition-colors font-bold text-white">Contact Us</a></li>
            </ul>
          </div>
          
          {/* PATIENT SUPPORT */}
          <div>
            <h4 className="text-white font-black mb-5 text-base tracking-wide border-l-4 border-[#c83220] pl-3">
              Patient Support
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="tel:01412602222" className="text-red-400 font-bold hover:underline flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>🚨 24/7 Emergency: 0141-2602222</span>
                </a>
              </li>
              <li><a href="/#departments" className="hover:text-[#c83220] transition-colors">Emergency & Trauma Care</a></li>
              <li><a href="/doctors" className="hover:text-[#c83220] transition-colors">Consult Our Specialists</a></li>
              <li><a href="/contact" className="hover:text-[#c83220] transition-colors">Location & Contact</a></li>
            </ul>
          </div>
          
          {/* CONTACT & MAP COLUMN */}
          <div>
            <h4 className="text-white font-black mb-5 text-base tracking-wide border-l-4 border-[#c83220] pl-3">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs mb-4">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c83220] mt-0.5">📍</span>
                <span className="text-white font-bold">
                  Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur, Rajasthan 302012
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c83220] mt-0.5">📞</span>
                <div>
                  <a href="tel:01412602222" className="block hover:text-white font-bold">Emergency: 0141-2602222</a>
                  <a href="tel:9216076757" className="block hover:text-white font-medium">Helpline: +91 92160 76757</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c83220] mt-0.5">✉️</span>
                <a href="mailto:info@jp.bstims.edu.in" className="hover:text-white">info@jp.bstims.edu.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* EMBEDDED GOOGLE MAP LOCATION SECTION */}
        <div className="mb-12 bg-slate-900 p-4 sm:p-5 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3.5 px-1 sm:px-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase text-[#e5b64a] tracking-wider whitespace-nowrap">
                <span>📍 Hospital Location Map</span>
              </div>
              <p className="text-xs sm:text-sm text-white font-bold leading-snug">
                Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dr.+B.S.+Tomar+Institute+of+Medical+Sciences+%26+Research,+Jagatpura,+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#e5b64a] hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <span>➔</span>
            </a>
          </div>
          <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <iframe
              title="Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital Location Map"
              src="https://maps.google.com/maps?q=Dr.+B.S.+Tomar+Institute+of+Medical+Sciences+%26+Research,+Jagatpura,+Jaipur&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* COPYRIGHT & TERMS */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-70">
          <p>© 2026 Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
