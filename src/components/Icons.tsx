import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return <Base {...props}><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></Base>;
}
export function CheckIcon(props: IconProps) {
  return <Base {...props}><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></Base>;
}
export function ChevronIcon(props: IconProps) {
  return <Base {...props}><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></Base>;
}
export function SparkIcon(props: IconProps) {
  return <Base {...props}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" stroke="currentColor" strokeWidth="1.5" /><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" fill="currentColor" /></Base>;
}
export function LayersIcon(props: IconProps) {
  return <Base {...props}><path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m4 12 8 4.2 8-4.2M4 16.5l8 4.2 8-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></Base>;
}
export function UsersIcon(props: IconProps) {
  return <Base {...props}><path d="M16 20v-1.5c0-2-1.7-3.5-4-3.5H7c-2.3 0-4 1.5-4 3.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M17 11.5c2 0 3.5 1.1 4 2.6M16.5 5.5a2.6 2.6 0 0 1 0 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></Base>;
}
export function ChartIcon(props: IconProps) {
  return <Base {...props}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="m4 8 6-4 6 7 5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></Base>;
}
export function HistoryIcon(props: IconProps) {
  return <Base {...props}><path d="M4 12a8 8 0 1 0 2-5.3L3.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M3.5 4.5V9H8M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></Base>;
}
export function WorkflowIcon(props: IconProps) {
  return <Base {...props}><rect x="3" y="4" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="15" y="15" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M9 6.5h4a4 4 0 0 1 4 4V15M15 17.5h-4a4 4 0 0 1-4-4V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></Base>;
}
export function MenuIcon(props: IconProps) {
  return <Base {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></Base>;
}
export function XIcon(props: IconProps) {
  return <Base {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></Base>;
}
