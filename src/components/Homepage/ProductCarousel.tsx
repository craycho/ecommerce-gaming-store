import ProductStack from "./ProductStack";

import Carousel from "react-material-ui-carousel";

function ProductCarousel({ type }: { type: string }) {
  const carouselPageCount = [1, 2, 3];

  return (
    <Carousel
      navButtonsAlwaysVisible
      animation="slide"
      duration={800}
      interval={10000}
      swipe={true}
      sx={{ mb: 3 }}
      navButtonsWrapperProps={{
        style: {
          height: "84%",
        },
      }}
    >
      {carouselPageCount.map(() => (
        <ProductStack type={type} />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
