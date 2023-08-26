import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import HeroProduct from "./HeroProduct";
import { Product } from "../../util/type-definitions";

import { Box, CircularProgress, Stack, styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "85%", // Ne radi shorthand {lg, md, sm}
  margin: "30px auto 40px auto",

  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "0 auto 30px auto",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: 600,
  },
}));

const findProduct = (products: Product[], productName: string) => {
  return products.find((product) => product.data.title.includes(productName));
};

const HeroStack = function () {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const products = useSelector((state: RootState) => state.products);

  const steelseriesArctis = findProduct(products, "Steelseries Arctis");
  const noblechairsHero = findProduct(products, "Noblechairs Hero");
  const corsairK95 = findProduct(products, "Corsair K95");
  const heroProducts = [
    {
      key: steelseriesArctis?.id,
      product: steelseriesArctis,
      promo: "On sale!",
    },
    {
      key: noblechairsHero?.id,
      product: noblechairsHero,
      promo: "New in stock!",
    },
    {
      key: corsairK95?.id,
      product: corsairK95,
      promo: "A legendary classic!",
    },
  ];

  useEffect(() => {
    setIsLoading(false);
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
        <StyledBox sx={{ display: { sm: "block", xs: "none" } }}>
          <StyledStack direction="row" gap={0} justifyContent="center">
            <HeroProduct
              key={steelseriesArctis?.id}
              product={steelseriesArctis}
              promo="On sale!"
            />
            <HeroProduct
              key={noblechairsHero?.id}
              product={noblechairsHero}
              promo="New in stock!"
            />
            <HeroProduct
              key={corsairK95?.id}
              product={corsairK95}
              promo="A legendary classic!"
            />
          </StyledStack>
        </StyledBox>
      )}

      {/* Mobile layout */}
      <StyledBox sx={{ display: { sm: "none", xs: "block" } }}>
        <Carousel
          navButtonsAlwaysVisible
          animation="slide"
          duration={900}
          interval={15000}
          swipe={true}
          indicators={false}
          sx={{ mb: 3, minHeight: 320 }}
          navButtonsProps={{
            style: { width: 50, height: 50, opacity: 0.6 },
          }}
          navButtonsWrapperProps={{
            style: {
              height: "100%",
              paddingBottom: "75px",
              margin: "0 -3px 0 -3px",
            },
          }}
        >
          {heroProducts.map((product) => (
            <HeroProduct
              key={product.key + "1"}
              product={product.product}
              promo={product.promo}
            />
          ))}
        </Carousel>
      </StyledBox>
    </>
  );
};

export default HeroStack;
