import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import getRandomProducts from "../../util/random-products";

import HeroProduct from "./HeroProduct";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from "@mui/material";

interface ProductData {
  category: string;
  description: string;
  image: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface Product {
  id: string;
  data: ProductData;
}

interface HeroProps {
  products: Product[];
}

function HeroStack({ products }: HeroProps) {
  /* const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (products.length > 0) {
      const randomProducts: Product[] = getRandomProducts(
        products,
        3,
        false,
        false
      );
      setRandomProducts(randomProducts);
    }
  }, [products]); 
  
  {randomProducts.map((product: Product) => ())}
  */

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
    <Box sx={{ width: "85%" }} margin="30px auto">
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
}

export default HeroStack;
