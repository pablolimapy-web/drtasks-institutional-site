import Image from "next/image";

export function Logo() {
  return (
    <span className="brand" aria-label="Dr. Tasks">
      <Image
        className="brand-logo-image"
        src="/brand/dr-tasks-wordmark.png"
        alt="Dr. Tasks"
        width={166}
        height={29}
      />
    </span>
  );
}
