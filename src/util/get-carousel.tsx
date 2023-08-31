export function getCarouselItemCount(screenSize: number): number {
  switch (true) {
    case screenSize <= 1500 && screenSize > 1200:
      return 4;

    case screenSize <= 1200 && screenSize > 900:
      return 3;

    case screenSize <= 900:
      return 2;
  }

  return 5;
}

export function getCarouselPages(screenSize: number): number[] {
  switch (true) {
    case screenSize <= 1500 && screenSize > 1200:
      return [1, 2, 3, 4];

    case screenSize <= 1200 && screenSize > 900:
      return [1, 2, 3, 4, 5];

    case screenSize <= 900:
      return [1, 2, 3, 4, 5, 6];
  }

  return [1, 2, 3];
}
