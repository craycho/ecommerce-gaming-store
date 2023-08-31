import { useState, useEffect } from "react";
import ProductStack from "./ProductStack";
import { getCarouselPages } from "../../util/get-carousel";

import Carousel from "react-material-ui-carousel";
import { Box, CircularProgress } from "@mui/material";

function ProductCarousel({ type }: { type: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const carouselPages = getCarouselPages(screenSize);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setIsLoading(false);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Large screen layout */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Carousel
          navButtonsAlwaysVisible
          animation="slide"
          duration={900}
          interval={15000}
          swipe={true}
          indicators={isLoading ? false : true}
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
            <ProductStack
              key={Math.random()}
              type={type}
              screenSize={screenSize}
            />
          ))}
        </Carousel>
      )}
    </>
  );
}

export default ProductCarousel;
