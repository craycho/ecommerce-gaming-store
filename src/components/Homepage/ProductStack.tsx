import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

import ProductCard from "./ProductCard";
import getRandomProducts from "../../util/random-products";
import { Product } from "../../util/type-definitions";
import { getCarouselItemCount } from "../../util/get-carousel-product-count";

import { Box, Fade, Stack } from "@mui/material";

interface StackProps {
  type: string;
  screenSize: number;
}

function ProductStack({ type, screenSize }: StackProps) {
  const products = useSelector((state: RootState) => state.products);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const carouselCount = getCarouselItemCount(screenSize);

  useEffect(() => {
    if (products.length > 0 && type === "random") {
      const randomProducts: Product[] = getRandomProducts(
        products,
        carouselCount,
        false,
        false
      );
      setDisplayedProducts(randomProducts);
    } else if (products.length > 0 && type === "onSale") {
      const onSaleProducts: Product[] = getRandomProducts(
        products,
        carouselCount,
        false,
        true
      );
      setDisplayedProducts(onSaleProducts);
    } else if (products.length > 0 && type === "new") {
      const newProducts: Product[] = getRandomProducts(
        products,
        carouselCount,
        true,
        false
      );
      setDisplayedProducts(newProducts);
    }
  }, [products, type, carouselCount]);

  return (
    <>
      {products && (
        <Fade in={true} timeout={750}>
          <Box
            sx={{
              width: screenSize > 900 ? "85%" : "95%",
              margin: "0 auto 40px auto",
              overflowX: { xs: "hidden", sm: "visible" },
            }}
          >
            <Stack direction="row" spacing={1} justifyContent="space-evenly">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  screenSize={screenSize}
                />
              ))}
            </Stack>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default ProductStack;
