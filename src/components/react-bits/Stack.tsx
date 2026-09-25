"use client";

import { motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./Stack.module.css";

type StackProps = {
  cards: ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  className?: string;
};

function CardRotate({ children, onSendToBack, sensitivity, disabled }: { children: ReactNode; onSendToBack: () => void; sensitivity: number; disabled: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [18, -18]);
  const rotateY = useTransform(x, [-100, 100], [-18, 18]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) onSendToBack();
    else { x.set(0); y.set(0); }
  };

  return (
    <motion.div
      className={styles.cardRotate}
      style={disabled ? undefined : { x, y, rotateX, rotateY }}
      drag={disabled ? false : true}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.45}
      onDragEnd={disabled ? undefined : handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 160,
  cards,
  animationConfig = { stiffness: 260, damping: 24 },
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3600,
  pauseOnHover = true,
  className = "",
}: StackProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const [paused, setPaused] = useState(false);
  const [stack, setStack] = useState(() => cards.map((content, index) => ({ id: index + 1, content })));

  useEffect(() => setStack(cards.map((content, index) => ({ id: index + 1, content }))), [cards]);

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const next = [...prev];
      const index = next.findIndex((card) => card.id === id);
      if (index < 0) return prev;
      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || reducedMotion || paused || stack.length < 2) return;
    const interval = window.setInterval(() => sendToBack(stack[stack.length - 1].id), autoplayDelay);
    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, paused, reducedMotion, stack]);

  return (
    <div
      className={`${styles.stackContainer} ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {stack.map((card, index) => {
        const depth = stack.length - index - 1;
        const randomRotate = randomRotation ? ((card.id * 7) % 9) - 4 : 0;
        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity} disabled={reducedMotion}>
            <motion.div
              className={styles.card}
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={reducedMotion ? { rotateZ: 0, scale: 1 - depth * 0.03, y: depth * -10 } : { rotateZ: depth * 2.2 + randomRotate, scale: 1 - depth * 0.045, y: depth * -8 }}
              initial={false}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: animationConfig.stiffness, damping: animationConfig.damping }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
