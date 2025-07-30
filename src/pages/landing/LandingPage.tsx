import { Navigation, HeroSection, HowItWorksSection, AboutSection, FinalCTASection, Footer } from './_components';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
