export default function TopBar() {
  return (
    <div className="bg-secondary-dark text-cream flex items-center justify-between px-6 py-2 text-xs tracking-wider">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-accent">24×7 Emergency: +91 74120 77125</span>
        <span className="hidden sm:inline opacity-80">Jagatpura, Jaipur · Rajasthan 302012</span>
      </div>
      <div className="flex items-center gap-4 opacity-90">
        <a href="#appointment" className="hover:text-accent transition">Careers</a>
        <a href="#appointment" className="hover:text-accent transition">Patient Portal</a>
      </div>
    </div>
  );
}
