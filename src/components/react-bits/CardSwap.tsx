"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import gsap from "gsap";
import styles from "./CardSwap.module.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`${styles.card} ${customClass ?? ""} ${className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

type EasingMode = "linear" | "elastic" | "focus";

export type CardSwapHandle = {
  next: () => void;
};

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onActiveChange?: (index: number) => void;
  skewAmount?: number;
  easing?: EasingMode;
  paused?: boolean;
  reducedMotion?: boolean;
  children: ReactNode;
};

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (position: number, distX: number, distY: number, total: number): Slot => ({
  x: position * distX,
  y: -position * distY,
  z: -position * distX * 1.5,
  zIndex: total - position,
});

const deckVisual = (position: number) => ({
  scale: Math.max(0.984, 1 - position * 0.004),
  opacity: position === 0 ? 1 : position === 1 ? 0.38 : position === 2 ? 0.14 : position >= 3 ? 0.02 : 0.02,
});

const placeNow = (element: HTMLDivElement | null, slot: Slot, skew: number, position: number) => {
  if (!element) return;
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    ...deckVisual(position),
    filter: "blur(0px)",
    force3D: true,
  });
};

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    width = "84%",
    height = "74%",
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    onActiveChange,
    skewAmount = 6,
    easing = "elastic",
    paused = false,
    reducedMotion = false,
    children,
  },
  ref,
) {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => ({ current: null as HTMLDivElement | null })),
    [childArr.length],
  );

  const orderRef = useRef(Array.from({ length: childArr.length }, (_, index) => index));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const hoverPausedRef = useRef(false);
  const swappingRef = useRef(false);
  const swapRef = useRef<(force?: boolean) => void>(() => undefined);
  const onActiveChangeRef = useRef(onActiveChange);
  const onCardClickRef = useRef(onCardClick);

  onActiveChangeRef.current = onActiveChange;
  onCardClickRef.current = onCardClick;

  const clearRotationTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startRotationTimer = useCallback(() => {
    clearRotationTimer();
    if (paused || reducedMotion || delay <= 0 || hoverPausedRef.current) return;
    intervalRef.current = window.setInterval(() => swapRef.current(), delay);
  }, [clearRotationTimer, delay, paused, reducedMotion]);

  useImperativeHandle(ref, () => ({
    next: () => {
      clearRotationTimer();
      swapRef.current(true);
      startRotationTimer();
    },
  }), [clearRotationTimer, startRotationTimer]);

  useEffect(() => {
    const total = refs.length;
    if (total === 0) return;

    const config = easing === "focus"
      ? {
          easeDrop: "power2.out",
          easeMove: "power3.out",
          easeReturn: "power3.out",
          durDrop: 0.18,
          durMove: 0.34,
          durReturn: 0.3,
          promoteAt: 0.06,
          returnAt: 0.18,
        }
      : easing === "elastic"
      ? {
          easeDrop: "power3.inOut",
          easeMove: "power3.out",
          easeReturn: "power3.inOut",
          durDrop: 0.82,
          durMove: 0.78,
          durReturn: 0.9,
          promoteAt: 0.16,
          returnAt: 0.42,
        }
      : {
          easeDrop: "power2.inOut",
          easeMove: "power2.out",
          easeReturn: "power2.inOut",
          durDrop: 0.66,
          durMove: 0.64,
          durReturn: 0.72,
          promoteAt: 0.12,
          returnAt: 0.34,
        };

    const placeOrder = () => {
      orderRef.current.forEach((cardIndex, position) => {
        placeNow(refs[cardIndex]?.current, makeSlot(position, cardDistance, verticalDistance, total), skewAmount, position);
      });
    };

    const notifyFront = () => {
      const frontIndex = orderRef.current[0];
      if (typeof frontIndex === "number") onActiveChangeRef.current?.(frontIndex);
    };

    const swap = (force = false) => {
      if (swappingRef.current || (!force && (paused || hoverPausedRef.current)) || total < 2) return;

      const [front, ...rest] = orderRef.current;
      const frontElement = refs[front]?.current;
      if (!frontElement) return;

      if (reducedMotion) {
        orderRef.current = [...rest, front];
        placeOrder();
        notifyFront();
        return;
      }

      const nextFrontIndex = rest[0];
      if (typeof nextFrontIndex === "number") {
        onActiveChangeRef.current?.(nextFrontIndex);
      }

      swappingRef.current = true;
      tlRef.current?.kill();
      const timeline = gsap.timeline({
        onComplete: () => {
          swappingRef.current = false;
        },
      });
      tlRef.current = timeline;

      if (easing === "focus") {
        timeline.to(frontElement, {
          y: "-=10",
          scale: 0.985,
          opacity: 0.58,
          filter: "blur(2px)",
          duration: config.durDrop,
          ease: config.easeDrop,
        }, 0);
      } else {
        timeline.to(frontElement, {
          y: "+=96",
          x: "-=18",
          opacity: 0.42,
          duration: config.durDrop,
          ease: config.easeDrop,
        }, 0);
      }

      timeline.addLabel("promote", config.promoteAt);
      rest.forEach((cardIndex, position) => {
        const element = refs[cardIndex]?.current;
        const slot = makeSlot(position, cardDistance, verticalDistance, total);
        const visual = deckVisual(position);
        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: visual.scale,
            opacity: visual.opacity,
            filter: "blur(0px)",
            duration: config.durMove,
            ease: config.easeMove,
          },
          `promote+=${position * (easing === "focus" ? 0.025 : 0.06)}`,
        );
      });

      const backPosition = total - 1;
      const backSlot = makeSlot(backPosition, cardDistance, verticalDistance, total);
      const backVisual = deckVisual(backPosition);
      timeline.addLabel("return", config.returnAt);

      if (easing === "focus") {
        timeline.set(frontElement, {
          x: backSlot.x,
          y: backSlot.y + 10,
          z: backSlot.z,
          scale: backVisual.scale * 0.99,
          opacity: 0,
          filter: "blur(3px)",
          zIndex: backSlot.zIndex,
        }, "return");
        timeline.to(
          frontElement,
          {
            y: backSlot.y,
            scale: backVisual.scale,
            opacity: backVisual.opacity,
            filter: "blur(0px)",
            duration: config.durReturn,
            ease: config.easeReturn,
          },
          "return+=0.02",
        );
      } else {
        timeline.call(() => {
          gsap.set(frontElement, { zIndex: backSlot.zIndex });
        }, undefined, "return");
        timeline.to(
          frontElement,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            scale: backVisual.scale,
            opacity: backVisual.opacity,
            filter: "blur(0px)",
            duration: config.durReturn,
            ease: config.easeReturn,
          },
          "return",
        );
      }

      timeline.call(() => {
        orderRef.current = [...rest, front];
      });
    };

    swapRef.current = swap;
    placeOrder();
    notifyFront();

    startRotationTimer();

    return () => {
      clearRotationTimer();
      tlRef.current?.kill();
      tlRef.current = null;
      swappingRef.current = false;
    };
  }, [cardDistance, clearRotationTimer, easing, refs, skewAmount, startRotationTimer, verticalDistance]);

  const rendered = childArr.map((child, index) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<CardProps>;
    const childStyle = element.props.style as CSSProperties | undefined;
    const childOnClick = element.props.onClick;

    return cloneElement(element as ReactElement<any>, {
      key: index,
      ref: refs[index] as unknown as Ref<HTMLDivElement>,
      style: { width, height, ...childStyle },
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        childOnClick?.(event);
        onCardClickRef.current?.(index);
      },
    });
  });

  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        if (!pauseOnHover) return;
        hoverPausedRef.current = true;
        clearRotationTimer();
      }}
      onMouseLeave={() => {
        if (!pauseOnHover) return;
        hoverPausedRef.current = false;
        startRotationTimer();
      }}
    >
      {rendered}
    </div>
  );
});

CardSwap.displayName = "CardSwap";

export default CardSwap;
