import TopBar from '../components/TopBar';
import NavigationBar from '../components/NavigationBar';
import NewsTicker from '../components/NewsTicker';
import FadeIn from '../components/FadeIn';
import HeroSection from '../components/HeroSection';
import EmergencyTrauma from '../components/EmergencyTrauma';
import ChairmanMessage from '../components/ChairmanMessage';
import KeyStats from '../components/KeyStats';
import PatientServices from '../components/PatientServices';
import CentersOfExcellence from '../components/CentersOfExcellence';
import Technology from '../components/Technology';
import DoctorDirectory from '../components/DoctorDirectory';
import AcademicsHighlight from '../components/AcademicsHighlight';
import FacilitiesGallery from '../components/FacilitiesGallery';
import Testimonials from '../components/Testimonials';
import NewsMedia from '../components/NewsMedia';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream font-sans overflow-x-hidden">
      {/* Header Layer */}
      <NewsTicker />
      <TopBar />
      <NavigationBar />
      
      {/* Content Layers with Animations */}
      <FadeIn delay={0.1}>
        <HeroSection />
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <EmergencyTrauma />
      </FadeIn>
      
      <FadeIn direction="left">
        <ChairmanMessage />
      </FadeIn>
      
      <FadeIn direction="none">
        <KeyStats />
      </FadeIn>
      
      <FadeIn direction="up">
        <PatientServices />
      </FadeIn>
      
      <FadeIn direction="up">
        <CentersOfExcellence />
      </FadeIn>
      
      <FadeIn direction="right">
        <Technology />
      </FadeIn>
      
      <FadeIn direction="up">
        <DoctorDirectory />
      </FadeIn>
      
      <FadeIn direction="left">
        <AcademicsHighlight />
      </FadeIn>
      
      <FadeIn direction="up">
        <FacilitiesGallery />
      </FadeIn>
      
      <FadeIn direction="up">
        <Testimonials />
      </FadeIn>
      
      <FadeIn direction="up">
        <NewsMedia />
      </FadeIn>
      
      {/* Footer Layer */}
      <Footer />
      
      {/* Clean Single Floating ICU Booking Action Button */}
      <a 
        href="/icu-booking" 
        className="fixed bottom-5 right-5 z-40 bg-[#bd171c] hover:bg-[#791017] text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 border-2 border-white/30 text-xs font-black"
        aria-label="24/7 ICU Bed Booking"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        <span>🚨 24/7 ICU Bed Booking</span>
      </a>
    </main>
  );
}
