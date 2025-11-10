/**
 * Main App component
 */

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Section from "./components/layout/Section";
import Hero from "./components/sections/Hero";
import Releases from "./components/sections/Releases";
import Shows from "./components/sections/Shows";
import Media from "./components/sections/Media";
import Bio from "./components/sections/Bio";
import Contact from "./components/sections/Contact";
import Newsletter from "./components/sections/Newsletter";

function App() {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />

      <Section id="hero" alternate>
        <Hero />
      </Section>

      <Section id="releases">
        <Releases />
      </Section>

      <Section id="shows" alternate>
        <Shows />
      </Section>

      <Section id="media">
        <Media />
      </Section>

      <Section id="bio" alternate>
        <Bio />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>

      <Newsletter />

      <Footer />
    </div>
  );
}

export default App;
