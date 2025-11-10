/**
 * Custom hook for scroll spy - detects which section is currently in view
 */

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active section
    const checkInitialSection = () => {
      const scrollPosition = window.scrollY + offset;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    checkInitialSection();

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, offset]);

  return activeSection;
}

