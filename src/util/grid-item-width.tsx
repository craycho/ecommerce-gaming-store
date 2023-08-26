export function getGridItemWidth(screenWidth: number): number {
  return screenWidth >= 1200
    ? 3
    : screenWidth < 1200 && screenWidth > 900
    ? 4
    : 6;
}
