import Header from './layout/Header';
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import Footer from './layout/Footer';
import WhyUs from './sections/WhyUs';
import AboutUs from './sections/AboutUs';
import InterfaceBanner from './sections/InterfaceBanner';
import ContactUs from './sections/ContactUs';
import { ScrollView, View } from 'react-native';

export default function LandingPage() {
  return (
    <ScrollView horizontal={false}>
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
    </ScrollView>
  );
}
