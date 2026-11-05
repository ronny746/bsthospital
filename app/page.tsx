import TopBar from '../components/TopBar';
import NavigationBar from '../components/NavigationBar';
import NewsTicker from '../components/NewsTicker';
import StickyNavbar from '../components/StickyNavbar';
import FadeIn from '../components/FadeIn';
import HeroSection from '../components/HeroSection';
import EmergencyTrauma from '../components/EmergencyTrauma';
import ChairmanMessage from '../components/ChairmanMessage';
import DoctorDirectory from '../components/DoctorDirectory';
import PatientServices from '../components/PatientServices';
import CentersOfExcellence from '../components/CentersOfExcellence';
import HealthPackages from '../components/HealthPackages';
import Technology from '../components/Technology';
import GlobalHonors from '../components/GlobalHonors';
import AcademicsHighlight from '../components/AcademicsHighlight';
import FacilitiesGallery from '../components/FacilitiesGallery';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream font-sans overflow-x-hidden">
      {/* Sticky navigation bar appearing smoothly when scrolled down past the hero */}
      <StickyNavbar />

      {/* 
        Full Viewport Initial Screen (100dvh):
        Locks the TopBar, NavigationBar, Hero Video, and EmergencyTrauma into exactly 
        100% of the viewport height on ANY screen resolution and ANY zoom level (75%, 100%, 150%).
        The ChairmanMessage ("Our Vision Behind Establishing Dr. B. S. Tomar Institute of Medical Sciences, Research & Hospital...") 
        is guaranteed to be strictly below the fold and only appears upon scrolling down.
      */}
      <div className="h-[100dvh] min-h-[580px] w-full flex flex-col justify-between relative overflow-hidden bg-slate-950">
        {/* Top Header Group */}
        <header className="shrink-0 z-30">
          <NewsTicker />
          <TopBar />
          <NavigationBar />
        </header>

        {/* Hero Video - flex-1 expands dynamically to fill 100% of the remaining viewport */}
        <section className="flex-1 min-h-0 relative w-full h-full overflow-hidden bg-slate-950">
          <HeroSection />
        </section>

        {/* Emergency & Trauma Action Bar - Pinned at the bottom of the 100dvh screen */}
        <div className="shrink-0 z-20">
          <EmergencyTrauma />
        </div>
      </div>

      {/* Subsequent Content Layers - Revealed upon scrolling */}
      {/* 1. Chairman Message (Vision & Leadership) */}
      <FadeIn direction="left">
        <ChairmanMessage />
      </FadeIn>
      
      {/* 2. Medical Specialists & Doctor Directory (Immediately after Chairman Leadership) */}
      <FadeIn direction="up">
        <DoctorDirectory />
      </FadeIn>

      {/* 3. Patient Services */}
      <FadeIn direction="up">
        <PatientServices />
      </FadeIn>
      
      {/* 4. Centers of Excellence */}
      <FadeIn direction="up">
        <CentersOfExcellence />
      </FadeIn>

      {/* 5. Health Packages */}
      <FadeIn direction="up">
        <HealthPackages />
      </FadeIn>
      
      {/* 6. Advanced Technology */}
      <FadeIn direction="right">
        <Technology />
      </FadeIn>

      {/* 7. Global Engagements & International Honors (Moved down from top) */}
      <FadeIn direction="up">
        <GlobalHonors />
      </FadeIn>
      
      {/* 8. Academics Highlight */}
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
