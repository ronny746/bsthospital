'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import NewsTicker from '@/components/NewsTicker';
import HeroSection from '@/components/HeroSection';
import EmergencyTrauma from '@/components/EmergencyTrauma';
import IcuBookingModal from '@/components/IcuBookingModal';

export default function IcuBookingPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#172a34] font-sans">
      <NewsTicker />
      <TopBar />
      <NavigationBar />
      <HeroSection />
      <EmergencyTrauma />

      {/* AUTO OPEN POPUP DIALOG MODAL */}
      <IcuBookingModal
        isOpen={isModalOpen}
        onClose={handleClose}
      />

      <Footer />
    </main>
  );
}
