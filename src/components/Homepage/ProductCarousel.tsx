import ProductStack from "./ProductStack";

import Carousel from "react-material-ui-carousel";

function ProductCarousel({ type }: { type: string }) {
  const carouselPageCount = [1, 2, 3];

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
      {carouselPageCount.map(() => (
        <ProductStack key={Math.random()} type={type} />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
