/**
 * Brand constants and configuration
 */

export const BRAND = {
  name: "CHROMATTIC",
  email: "chromattic.contact@gmail.com",
  country: "België",
};

// Mailchimp newsletter form configuration
// To get your form action URL:
// 1. Log into Mailchimp
// 2. Go to Audience > Signup Forms > Embedded Forms
// 3. Copy the form action URL (looks like: https://[domain].list-manage.com/subscribe/post?u=[USER_ID]&id=[LIST_ID])
// 4. Replace the URL below
export const MAILCHIMP = {
  formActionUrl: import.meta.env.VITE_MAILCHIMP_FORM_ACTION_URL || "",
  // Alternative: You can also use the user ID and list ID separately:
  // userID: "ba3ecc779bc4063fd1d13b7dc", // From your popup script
  // listID: "YOUR_LIST_ID", // Get this from Mailchimp
};

export const COLORS = {
  primary: "#7f1d1d", // red-900
  secondary: "#991b1b", // red-800
  accent: "#ef4444", // red-500
  text: {
    primary: "#ffffff",
    secondary: "#d1d5db", // gray-300
    muted: "#9ca3af", // gray-400
  },
  background: {
    primary: "#000000",
    secondary: "#7f1d1d", // red-900
  },
};

export const SPOTIFY_COLOR = "#1db954";
export const YOUTUBE_COLOR = "#ff0000";

