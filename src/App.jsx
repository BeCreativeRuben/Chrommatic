/**
 * Main App component
 */

import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Section from "./components/layout/Section";
import Hero from "./components/sections/Hero";
import Releases from "./components/sections/Releases";
import Shows from "./components/sections/Shows";
import Media from "./components/sections/Media";
import MeetTheBand from "./components/sections/MeetTheBand";
import Bio from "./components/sections/Bio";
import Contact from "./components/sections/Contact";
import LaunchTimer from "./components/ui/LaunchTimer";
import LaunchLoadingScreen from "./components/ui/LaunchLoadingScreen";
import CookieConsent from "./components/ui/CookieConsent";
import { useLanguage } from "./contexts/LanguageContext";
import { translations } from "./data/translations";

// Launch date: February 28, 2026 at 16:00 UTC+1 (Brussels time)
// Convert to UTC: UTC+1 means UTC time is 15:00
const LAUNCH_DATE = new Date("2026-02-28T15:00:00Z"); // 16:00 UTC+1 = 15:00 UTC

function App() {
  const { language } = useLanguage();
  const t = translations[language] || translations.nl;
  const [isTimerActive, setIsTimerActive] = useState(() => {
    return new Date() < LAUNCH_DATE;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTimerComplete = () => {
    setIsTimerActive(false);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const showNavbarSoon = isTimerActive || isLoading;
  const showContent = !isTimerActive && !isLoading;

  return (
    <div className="bg-black text-white font-sans">
      <a href="#main" className="skip-link">
        {t.a11y.skip}
      </a>
      <Navbar isTimerActive={showNavbarSoon} />

      {isTimerActive && (
        <LaunchTimer onTimerComplete={handleTimerComplete} />
      )}

      {!isTimerActive && isLoading && (
        <LaunchLoadingScreen onComplete={handleLoadingComplete} />
      )}

      {showContent && (
        <main id="main" tabIndex={-1}>
          <Section id="hero" alternate>
            <Hero />
          </Section>

          <Section id="bio" alternate>
            <Bio />
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

          <Section id="meet-the-band" alternate>
            <MeetTheBand />
          </Section>

          <Section id="contact">
            <Contact />
          </Section>
        </main>
      )}

      {showContent && <Footer />}
      <CookieConsent />
    </div>
  );
}

export default App;
