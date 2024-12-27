import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import { Testimonials } from './components/sections/Testimonials';
import { Footer } from './components/layout/Footer';
import WhyUs from './components/sections/WhyUs';
import AboutUs from './components/sections/AboutUs';

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhyUs />
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
