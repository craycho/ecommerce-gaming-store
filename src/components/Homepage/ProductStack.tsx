import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

import ProductCard from "./ProductCard";
import getRandomProducts from "../../util/random-products";
import { Product } from "../../util/type-definitions";

import { Box, Fade, Stack } from "@mui/material";

interface StackProps {
  type: string;
}

function ProductStack({ type }: StackProps) {
  const products = useSelector((state: RootState) => state.cart.products);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0 && type === "random") {
      const randomProducts: Product[] = getRandomProducts(
        products,
        5,
        false,
        false
      );
      setDisplayedProducts(randomProducts);
    } else if (products.length > 0 && type === "onSale") {
      const onSaleProducts: Product[] = getRandomProducts(
        products,
        5,
        false,
        true
      );
      setDisplayedProducts(onSaleProducts);
    } else if (products.length > 0 && type === "new") {
      const newProducts: Product[] = getRandomProducts(
        products,
        5,
        true,
        false
      );
      setDisplayedProducts(newProducts);
    }
  }, [products, type]);

  return (
    <>
      {products && (
        <Fade in={true} timeout={750}>
          <Box sx={{ width: "85%", margin: "0 auto 40px auto" }}>
            <Stack direction="row" spacing={1} justifyContent="space-evenly">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Stack>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default ProductStack;
