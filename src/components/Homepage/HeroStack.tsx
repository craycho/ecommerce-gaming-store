import { useSelector } from "react-redux";
import { RootState } from "../../store";
import HeroProduct from "./HeroProduct";

import { Box, Stack, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "85%",
  margin: "30px auto 40px auto",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "0 auto 20px auto",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: 600,
  },
}));

const HeroStack = function () {
  const products = useSelector((state: RootState) => state.products);

  const steelseriesArctis = products.find((product) =>
    product.data.title.includes("Steelseries Arctis")
  );
  const noblechairsHero = products.find((product) =>
    product.data.title.includes("Noblechairs Hero")
  );
  const corsairK95 = products.find((product) =>
    product.data.title.includes("Corsair K95")
  );

  return (
    <StyledBox>
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
  );
};

export default HeroStack;
