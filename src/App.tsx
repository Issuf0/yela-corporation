import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NarrativeSection } from './components/NarrativeSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const handleScrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B132B] font-sans antialiased selection:bg-amber-500/20 selection:text-amber-950 flex flex-col">
      {/* 1. Header: wordmark, minimal nav, single CTA "Fale connosco" */}
      <Header onContactClick={handleScrollToContact} />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 2. Hero: "Ligamos desafios a oportunidades.", subtitle, CTA, signature graphic */}
        <HeroSection onContactClick={handleScrollToContact} />

        {/* 3. Apresentação: short narrative, typographic composition, no cards */}
        <NarrativeSection />

        {/* 4. Áreas de actuação: numbered editorial composition with fine dividers */}
        <CapabilitiesSection />

        {/* 5. Parceria estratégica: YELA × Learn Code balanced composition */}
        <PartnershipSection />

        {/* 6. Contacto: "Há uma oportunidade para explorar?" & "Fale connosco" */}
        <ContactSection />
      </main>

      {/* 7. Footer: minimal, elegant, essential navigation and contacts */}
      <Footer />
    </div>
  );
}
