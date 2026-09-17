export type RotatingSplitBy = 'characters' | 'words' | 'lines' | string;
export type RotatingStaggerFrom = 'first' | 'last' | 'center' | 'random' | number;

export type RotatingElementGroup = {
  characters: string[];
  needsSpace: boolean;
};

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const SegmenterCtor = Intl.Segmenter;
    const segmenter = new SegmenterCtor('pt-BR', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }
  return Array.from(text);
}

export function splitRotatingText(text: string, splitBy: RotatingSplitBy = 'characters'): RotatingElementGroup[] {
  if (splitBy === 'characters') {
    const words = text.split(' ');
    return words.map((word, index) => ({
      characters: splitIntoCharacters(word),
      needsSpace: index !== words.length - 1,
    }));
  }

  if (splitBy === 'words') {
    const words = text.split(' ');
    return words.map((word, index) => ({
      characters: [word],
      needsSpace: index !== words.length - 1,
    }));
  }

  if (splitBy === 'lines') {
    const lines = text.split('\n');
    return lines.map((line, index) => ({
      characters: [line],
      needsSpace: index !== lines.length - 1,
    }));
  }

  const parts = text.split(splitBy);
  return parts.map((part, index) => ({
    characters: [part],
    needsSpace: index !== parts.length - 1,
  }));
}

export function getRotatingStaggerDelay(
  index: number,
  totalChars: number,
  staggerDuration: number,
  staggerFrom: RotatingStaggerFrom = 'first',
): number {
  if (staggerFrom === 'first') return index * staggerDuration;
  if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
  if (staggerFrom === 'center') {
    const center = Math.floor(totalChars / 2);
    return Math.abs(center - index) * staggerDuration;
  }
  if (staggerFrom === 'random') {
    const randomIndex = Math.floor(Math.random() * Math.max(totalChars, 1));
    return Math.abs(randomIndex - index) * staggerDuration;
  }
  return Math.abs(staggerFrom - index) * staggerDuration;
}
