'use dom';

import { Header } from './components/layout/Header.web';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import { Footer } from './components/layout/Footer';
import WhyUs from './components/sections/WhyUs';
import AboutUs from './components/sections/AboutUs';
import InterfaceBanner from './components/sections/InterfaceBanner';
import ContactUs from './components/sections/ContactUs';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingPage() {
  return (
    <SafeAreaView>
      <Header />
      <View>
        <Hero />
        <Features />
        <HowItWorks />
        <WhyUs />
        <AboutUs />
        <InterfaceBanner />
        <Testimonials />
        <ContactUs />
      </View>
      <Footer />
    </SafeAreaView>
  );
}
