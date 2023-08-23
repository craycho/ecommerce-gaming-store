export function getCarouselPages(screenSize: number): number[] {
  switch (true) {
    case screenSize <= 1500 && screenSize > 1200:
      return [1, 2, 3, 4];

    case screenSize <= 1200 && screenSize > 900:
      return [1, 2, 3, 4, 5];

    case screenSize <= 900 /*  && screenSize > 600 */:
      return [1, 2, 3, 4, 5, 6];

    // case screenSize <= 600:
    //   return [1, 2, 3, 4, 5, 6, 7, 8];
  }

  return [1, 2, 3];
}
