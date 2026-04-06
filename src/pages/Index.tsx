import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import GameplaySection from "@/components/GameplaySection";
import RainbowPlateSection from "@/components/RainbowPlateSection";
import WorldsSection from "@/components/WorldsSection";
import ChallengesSection from "@/components/ChallengesSection";
import MonstersSection from "@/components/MonstersSection";
import RewardsSection from "@/components/RewardsSection";
import BenefitsSection from "@/components/BenefitsSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FeedbackSection from "@/components/FeedbackSection";
import FooterSection from "@/components/FooterSection";
import GameScreen from "@/game/GameScreen";

const Index = () => {
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onPlayDemo={() => setGameOpen(true)} />
      <AboutSection />
      <FeaturesSection />
      <AudienceSection />
      <GameplaySection />
      <RainbowPlateSection />
      <WorldsSection />
      <ChallengesSection />
      <MonstersSection />
      <RewardsSection />
      <BenefitsSection />
      <ImpactSection />
      <TestimonialsSection />
      <CTASection />
      <FeedbackSection />
      <FooterSection />
      <GameScreen open={gameOpen} onClose={() => setGameOpen(false)} />
    </div>
  );
};

export default Index;
