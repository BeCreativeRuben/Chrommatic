/**
 * Custom hook for smooth scrolling to sections
 */

import { useEffect } from "react";

/**
 * Sets up smooth scrolling behavior for anchor links
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

