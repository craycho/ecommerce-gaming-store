export function getCarouselItemCount(screenSize: number): number {
  switch (true) {
    case screenSize <= 1500 && screenSize > 1200:
      return 4;

    case screenSize <= 1200 && screenSize > 900:
      return 3;

    case screenSize <= 900 /*  && screenSize > 600 */:
      return 2;

    // case screenSize <= 600:
    //   return 1;
  }

  return 5;
}
