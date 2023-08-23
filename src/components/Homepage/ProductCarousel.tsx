import { useState, useEffect } from "react";
import ProductStack from "./ProductStack";
import Carousel from "react-material-ui-carousel";
import { getCarouselPages } from "../../util/get-carousel-pages";

function ProductCarousel({ type }: { type: string }) {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const carouselPages = getCarouselPages(screenSize);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
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
      sx={{ mb: 3, minHeight: 320 }}
      navButtonsProps={{
        style: {
          width: screenSize <= 600 ? 30 : 40,
          height: screenSize <= 600 ? 30 : 40,
        },
      }}
      navButtonsWrapperProps={{
        style: {
          height: "81%",
          margin: screenSize <= 600 ? "170px 23%" : "0 1.3%",
        },
      }}
    >
      {carouselPages.map(() => (
        <ProductStack key={Math.random()} type={type} screenSize={screenSize} />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
