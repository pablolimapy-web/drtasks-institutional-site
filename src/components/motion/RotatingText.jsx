'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getRotatingStaggerDelay, splitRotatingText } from '@/lib/rotatingText';
import './RotatingText.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const elements = useMemo(
    () => splitRotatingText(texts[currentTextIndex] ?? '', splitBy),
    [texts, currentTextIndex, splitBy]
  );

  const totalChars = useMemo(
    () => elements.reduce((sum, word) => sum + word.characters.length, 0),
    [elements]
  );

  const getStaggerDelay = useCallback(
    index => getRotatingStaggerDelay(index, totalChars, staggerDuration, staggerFrom),
    [totalChars, staggerDuration, staggerFrom]
  );

  const handleIndexChange = useCallback(
    newIndex => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(index => {
    const validIndex = Math.max(0, Math.min(index, texts.length - 1));
    if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
  }, [texts.length, currentTextIndex, handleIndexChange]);

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto || reduceMotion || texts.length <= 1) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto, reduceMotion, texts.length]);

  return (
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout={!reduceMotion} transition={transition}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial && !reduceMotion}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
          layout={!reduceMotion}
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={`${currentTextIndex}-${wordIndex}-${charIndex}`}
                    initial={reduceMotion ? false : initial}
                    animate={reduceMotion ? undefined : animate}
                    exit={reduceMotion ? undefined : exit}
                    transition={{
                      ...transition,
                      delay: reduceMotion ? 0 : getStaggerDelay(previousCharsCount + charIndex)
                    }}
                    className={cn('text-rotate-element', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
