import TopBar from "@/components/TopBar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";

import TwelfthLearnersSection from "@/components/TwelfthLearnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import { ChatModalProvider } from "@/hooks/useChatModal";

const Index = () => {
  return (
    <ChatModalProvider>
      <div className="min-h-screen bg-background page-transition">
        <TopBar />
        <NewsTicker />
        <HeroSection />
        <HowItWorks />
        <ServicesSection />
        <TrustSection />
        <TwelfthLearnersSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
        <FloatingChatButton />
      </div>
    </ChatModalProvider>
  );
};

export default Index;
