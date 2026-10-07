import TopBar from '../components/TopBar';
import NavigationBar from '../components/NavigationBar';
import NewsTicker from '../components/NewsTicker';
import FadeIn from '../components/FadeIn';
import HeroSection from '../components/HeroSection';
import EmergencyTrauma from '../components/EmergencyTrauma';
import ChairmanMessage from '../components/ChairmanMessage';
import PatientServices from '../components/PatientServices';
import CentersOfExcellence from '../components/CentersOfExcellence';
import HealthPackages from '../components/HealthPackages';
import Technology from '../components/Technology';
import DoctorDirectory from '../components/DoctorDirectory';
import AcademicsHighlight from '../components/AcademicsHighlight';
import FacilitiesGallery from '../components/FacilitiesGallery';
import Testimonials from '../components/Testimonials';
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
      
      <FadeIn direction="up">
        <PatientServices />
      </FadeIn>
      
      <FadeIn direction="up">
        <CentersOfExcellence />
      </FadeIn>

      <FadeIn direction="up">
        <HealthPackages />
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
      
      {/* Footer Layer */}
      <Footer />
    </main>
  );
}
