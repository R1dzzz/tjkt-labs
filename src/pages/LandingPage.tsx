import Header from '@/components/layout/Header';
import Hero from '@/sections/Hero';
import Quotes from '@/sections/Quotes';
import CurriculumGallery from '@/sections/CurriculumGallery';
import FeatureCards from '@/sections/FeatureCards';
import Benefits from '@/sections/Benefits';
import Team from '@/sections/Team';
import Footer from '@/sections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Quotes />
        <CurriculumGallery />
        <FeatureCards />
        <Benefits />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
