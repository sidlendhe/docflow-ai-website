interface LogoProps {
  /** Height in pixels for the icon portion (text scales proportionally) */
  size?: number;
  className?: string;
}

/** Inline SVG logomark + wordmark — fully transparent, works on any background */
export default function DocFlowLogo({ size = 36, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label="DocFlow AI"
    >
      {/* Logomark: document outline with flowing data lines */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Document body */}
        <path
          d="M5 3 L23 3 L31 11 L31 33 L5 33 Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Fold corner */}
        <path
          d="M23 3 L23 11 L31 11"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Flow line 1 */}
        <path
          d="M9 18 Q14 15.5 19 18 Q24 20.5 31 18"
          stroke="#00C2CB"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Flow line 2 */}
        <path
          d="M9 24 Q14 21.5 19 24 Q24 26.5 31 24"
          stroke="#00C2CB"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: "var(--font-sora, system-ui, sans-serif)",
          fontWeight: 700,
          fontSize: `${size * 0.58}px`,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "white",
          whiteSpace: "nowrap",
        }}
      >
        DocFlow{" "}
        <span style={{ color: "#00C2CB" }}>AI</span>
      </span>
    </span>
  );
}
