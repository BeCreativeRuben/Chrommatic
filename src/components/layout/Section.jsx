/**
 * Reusable Section wrapper component
 * @param {Object} props
 * @param {string} props.id - Section ID for navigation
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.alternate - Whether to use alternate background color
 * @param {React.ReactNode} props.children - Section content
 */

function Section({ id, className = "", alternate = false, children }) {
  const baseClasses = "py-20 px-4 text-center";
  const bgClass = alternate ? "bg-red-900" : "";
  const combinedClasses = `${baseClasses} ${bgClass} ${className}`.trim();

  return (
    <section id={id} className={combinedClasses}>
      {children}
    </section>
  );
}

export default Section;

