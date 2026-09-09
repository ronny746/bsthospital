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
      
      {/* Floating Action Button (Optional/Future implementation) */}
      <a href="#appointment" className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </main>
  );
}
