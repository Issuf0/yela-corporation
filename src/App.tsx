import React from 'react';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NarrativeSection } from './components/NarrativeSection';
import { PartnershipSection } from './components/PartnershipSection';

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-paper text-ink">
      <Header />
      <main id="conteudo" className="flex-1">
        <HeroSection />
        <NarrativeSection />
        <CapabilitiesSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
