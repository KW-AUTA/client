import {
  Navigation,
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  FeaturesSection,
  VideoGuideSection,
  ForEveryoneSection,
  FAQSection,
  AboutSection,
  FinalCTASection,
  Footer
} from './_components';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <VideoGuideSection />
      <ForEveryoneSection />
      <FAQSection />
      <AboutSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
