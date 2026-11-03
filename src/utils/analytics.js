/**
 * Google Consent Mode v2.
 * The gtag library and the Mailchimp popup stay unloaded until the visitor accepts.
 */

export const GA_ID = "G-J2SSMDPZ5J";
export const CONSENT_KEY = "chromattic-consent";

const MAILCHIMP_POPUP =
  "https://chimpstatic.com/mcjs-connected/js/users/ba3ecc779bc4063fd1d13b7dc/338e7995e427cda5cf4e4850c.js";

export function readConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage can be blocked; the choice still applies for this page view.
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

export function applyConsent(granted) {
  ensureGtag();
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (granted) {
    loadGoogleAnalytics();
    loadMailchimpPopup();
  }
}

function loadGoogleAnalytics() {
  if (document.querySelector(`script[data-ga="${GA_ID}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.dataset.ga = GA_ID;
  document.head.appendChild(script);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

function loadMailchimpPopup() {
  if (document.getElementById("mcjs")) return;
  const script = document.createElement("script");
  script.id = "mcjs";
  script.async = true;
  script.src = MAILCHIMP_POPUP;
  document.body.appendChild(script);
}
