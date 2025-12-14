/**
 * Flag component for displaying country flags
 */

function Flag({ country, className = "" }) {
  const flags = {
    nl: (
      <svg 
        width="32" 
        height="24" 
        viewBox="0 0 32 24" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="32" height="8" fill="#AE1C28"/>
        <rect y="8" width="32" height="8" fill="#FFFFFF"/>
        <rect y="16" width="32" height="8" fill="#21468B"/>
      </svg>
    ),
    gb: (
      <svg 
        width="32" 
        height="24" 
        viewBox="0 0 32 24" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="32" height="24" fill="#012169"/>
        <path d="M0 0L32 24M32 0L0 24" stroke="#FFFFFF" strokeWidth="2.4"/>
        <path d="M0 0L32 24M32 0L0 24" stroke="#C8102E" strokeWidth="1.6"/>
        <path d="M16 0V24M0 12H32" stroke="#FFFFFF" strokeWidth="4"/>
        <path d="M16 0V24M0 12H32" stroke="#C8102E" strokeWidth="2.4"/>
      </svg>
    ),
  };

  return flags[country] || null;
}

export default Flag;

