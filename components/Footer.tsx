export default function Footer() {
  return (
    <footer className="bg-primary-dark text-slate-300 py-16 border-t-[8px] border-secondary" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <img src="/bst-logo.png" alt="BST Hospital Logo" className="h-16 w-auto mb-6 bg-white/90 p-2 rounded-lg" />
            <p className="text-sm leading-relaxed mb-6">
              Dr. B. S. Tomar Institute of Medical Sciences & Research and Hospital. Delivering compassionate, patient-first healthcare in Jaipur.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#departments" className="hover:text-secondary transition-colors">Departments</a></li>
              <li><a href="#doctors" className="hover:text-secondary transition-colors">Find a Doctor</a></li>
              <li><a href="#facilities" className="hover:text-secondary transition-colors">Facilities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Patient Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/icu-booking" className="text-emerald-400 font-bold hover:underline">🚨 24/7 ICU Bed Booking</a></li>
              <li><a href="/icu-status" className="hover:text-secondary transition-colors">Track ICU Request Status</a></li>
              <li><a href="/admin/login" className="hover:text-secondary transition-colors">ICU Staff & Admin Portal</a></li>
              <li><a href="#appointment" className="hover:text-secondary transition-colors">Book an Appointment</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Emergency Contacts</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">📍</span>
                <span>Science Tech City, Jaipur – Delhi Highway, 11c, Jaipur – 303002</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">📞</span>
                <div>
                  <a href="tel:+917412077125" className="block hover:text-white">+91 74120 77125</a>
                  <a href="tel:+919116010407" className="block hover:text-white">+91 91160 10407</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">✉️</span>
                <a href="mailto:info@bstmedicalcollege.com" className="hover:text-white">info@bstmedicalcollege.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
          <p>© 2026 BST Hospital. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
