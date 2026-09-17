export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="brand" aria-label="Dr. Tasks">
      <span className="brand-mark" aria-hidden="true">D</span>
      <span className={inverse ? "brand-name brand-name-inverse" : "brand-name"}>Dr. Tasks</span>
    </span>
  );
}
