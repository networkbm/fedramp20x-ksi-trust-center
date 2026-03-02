import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = "h-4 w-4";

export function TrustCenterIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3 5 6v6c0 4.3 2.9 8.2 7 9 4.1-.8 7-4.7 7-9V6l-7-3Z" />
    </svg>
  );
}

export function ComplianceIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3 5 6v6c0 4.3 2.9 8.2 7 9 4.1-.8 7-4.7 7-9V6l-7-3Z" />
      <path d="m9.2 12.4 2 2 3.8-4.2" />
    </svg>
  );
}

export function OverviewIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" strokeOpacity="0.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" strokeOpacity="0.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" strokeOpacity="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" strokeOpacity="0.5" />
    </svg>
  );
}

export function PoliciesIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 3h8l5 5v13H8a3 3 0 0 1 0-6h13" />
      <path d="M16 3v5h5" />
    </svg>
  );
}

export function VulnerabilityIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 8h8m-7 4h6m-8 8 1.5-3h7L17 20m-8.5-9A6.5 6.5 0 1 1 15.5 17H8.5A6 6 0 0 1 8.5 11Z" />
    </svg>
  );
}

export function ConsoleIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m5 7 4 4-4 4m6 0h8" />
      <rect x="3" y="4" width="18" height="16" rx="2" strokeOpacity="0.5" />
    </svg>
  );
}

export function AiIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3v4m0 10v4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M3 12h4m10 0h4M5.6 18.4l2.8-2.8m7.2-7.2 2.8-2.8" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}
