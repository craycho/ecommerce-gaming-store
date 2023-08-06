import { useSelector } from "react-redux";
import { RootState } from "../../store";
import HeroProduct from "./HeroProduct";

import { Box, Stack } from "@mui/material";

const HeroStack = function () {
  const products = useSelector((state: RootState) => state.cart.products);

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
    <Box sx={{ width: "85%" }} margin="30px auto 40px auto">
      <Stack direction="row" gap={1.5} justifyContent="center">
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
      </Stack>
    </Box>
  );
};

export default HeroStack;
