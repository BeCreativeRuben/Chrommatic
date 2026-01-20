/**
 * Footer component
 */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-6 text-center border-t border-red-700 text-sm text-gray-500">
      <div>&copy; {currentYear} Chromattic. All rights reserved.</div>
      <div className="mt-2 text-xs text-gray-600">
        Website created by{" "}
        <a
          href="https://studiothielman.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-400 transition-colors underline underline-offset-4"
        >
          Studio Thielman
        </a>
        .
      </div>
    </footer>
  );
}

export default Footer;

