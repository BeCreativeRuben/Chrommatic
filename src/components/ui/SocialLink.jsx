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
      className={`text-gray-400 hover:text-red-500 transition-colors ${className}`}
    >
      <Icon size={24} />
    </a>
  );
}

export default SocialLink;

