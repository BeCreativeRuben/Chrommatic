/**
 * Footer component
 */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black py-6 text-center border-t border-red-700 text-sm text-gray-500">
      &copy; {currentYear} Chromattic. All rights reserved.
    </footer>
  );
}

export default Footer;

