import { useState, useEffect } from "react";
import ProductStack from "./ProductStack";

import Carousel from "react-material-ui-carousel";

function ProductCarousel({ type }: { type: string }) {
  const carouselPageCount = [1, 2, 3];
  const mobileCarouselPageCount = [1, 2, 3, 4, 5, 6, 7, 8];
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth <= 600
  );

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 600);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel
      navButtonsAlwaysVisible
      animation="slide"
      duration={900}
      interval={15000}
      swipe={true}
      sx={{ mb: 3 }}
      navButtonsWrapperProps={{
        style: {
          height: "81%",
          margin: "0 1.3%",
        },
      }}
    >
      {(isSmallScreen ? mobileCarouselPageCount : carouselPageCount).map(() => (
        <ProductStack
          key={Math.random()}
          type={type}
          isSmallScreen={isSmallScreen}
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
