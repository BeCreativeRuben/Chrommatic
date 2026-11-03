/**
 * Social media link component
 * @param {Object} props
 * @param {string} props.url - Social media URL
 * @param {React.ComponentType} props.icon - Icon component from lucide-react
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 */

function SocialLink({ url, icon: Icon, ariaLabel, className = "" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center min-h-11 min-w-11 text-gray-300 hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
    >
      <Icon size={24} aria-hidden="true" />
    </a>
  );
}

export default SocialLink;

