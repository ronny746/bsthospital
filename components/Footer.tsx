export default function Footer() {
  return (
    <footer className="bg-[#0e191f] text-slate-300 py-16 border-t-[8px] border-[#c83220]" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-1 space-y-4">
            <img src="/bst-nav-logo.jpg" alt="Dr. BST Hospital, Jagatpura Jaipur Logo" className="h-12 w-auto bg-white p-1 rounded-xl shadow-md" />
            <p className="text-xs leading-relaxed text-slate-300">
              <strong className="text-white">Dr. BST Hospital, Jagatpura Jaipur</strong> (Dr. B. S. Tomar Institute of Medical Sciences & Research). Delivering 24/7 emergency care, 1000+ beds & advanced multi-specialty healthcare.
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
                <a href="tel:+917412077125" className="text-red-400 font-bold hover:underline flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>🚨 24/7 Emergency Assistance</span>
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
                  Dr. BST Hospital, Jagatpura, Jaipur, Rajasthan 302012
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c83220] mt-0.5">📞</span>
                <div>
                  <a href="tel:+917412077125" className="block hover:text-white font-bold">+91 74120 77125</a>
                  <a href="tel:+919116010407" className="block hover:text-white font-medium">+91 91160 10407</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c83220] mt-0.5">✉️</span>
                <a href="mailto:info@bstmedicalcollege.com" className="hover:text-white">info@bstmedicalcollege.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* EMBEDDED GOOGLE MAP LOCATION SECTION */}
        <div className="mb-12 bg-slate-900 p-4 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 px-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#e5b64a] tracking-wider">
              <span>📍 Hospital Location Map</span>
              <span>•</span>
              <span className="text-white font-bold">Dr. BST Hospital, Jagatpura Jaipur</span>
            </div>
            <a
              href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#c83220] hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <span>➔</span>
            </a>
          </div>
          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <iframe
              title="Dr. BST Hospital Jagatpura Jaipur Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113912.4497677462!2d75.7661559!3d26.8372645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc91e4a7a8d5f%3A0x6b1076b4a3a60c0!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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
          <p>© 2026 Dr. BST Hospital, Jagatpura Jaipur. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
