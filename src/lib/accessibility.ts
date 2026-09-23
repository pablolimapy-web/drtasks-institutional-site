export const tabNavigationKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"] as const;

type TabNavigationKey = (typeof tabNavigationKeys)[number];

export function getNextTabIndex(current: number, count: number, key: string): number | null {
  if (count <= 0 || current < 0 || current >= count) return null;

  switch (key as TabNavigationKey) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
