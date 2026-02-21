/**
 * Main App component
 */

import { useState, useEffect } from "react";
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

// Launch date: February 28, 2026 at 16:00 UTC+1 (Brussels time)
// Convert to UTC: UTC+1 means UTC time is 15:00
const LAUNCH_DATE = new Date("2026-02-28T15:00:00Z"); // 16:00 UTC+1 = 15:00 UTC

function App() {
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

  // Stuur page_view naar Google Analytics zodra de website-inhoud zichtbaar is
  useEffect(() => {
    if (!showContent || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [showContent]);

  return (
    <div className="bg-black text-white font-sans">
      <Navbar isTimerActive={showNavbarSoon} />

      {isTimerActive && (
        <>
          <LaunchTimer onTimerComplete={handleTimerComplete} />
          <div className="hidden">
            <Section id="hero" alternate><Hero /></Section>
            <Section id="bio" alternate><Bio /></Section>
            <Section id="releases"><Releases /></Section>
            <Section id="shows" alternate><Shows /></Section>
            <Section id="media"><Media /></Section>
            <Section id="meet-the-band" alternate><MeetTheBand /></Section>
            <Section id="contact"><Contact /></Section>
            <Footer />
          </div>
        </>
      )}

      {!isTimerActive && isLoading && (
        <LaunchLoadingScreen onComplete={handleLoadingComplete} />
      )}

      {showContent && (
        <>
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

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
