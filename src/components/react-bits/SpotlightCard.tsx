"use client";

import React, { useRef } from "react";
import styles from "./SpotlightCard.module.css";

type SpotlightCardProps = React.PropsWithChildren<{
  className?: string;
  spotlightColor?: string;
}>;

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(28, 85, 201, 0.14)" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    ref.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return <div ref={ref} onMouseMove={handleMouseMove} className={`${styles.cardSpotlight} ${className}`}>{children}</div>;
}
