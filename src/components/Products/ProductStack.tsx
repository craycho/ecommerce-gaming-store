import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import ProductCard from "./ProductCard";

import getRandomProducts from "../../util/random-products";

import { Box, Stack, Typography } from "@mui/material";

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

interface StackProps {
  type: string;
}

function ProductStack({ type }: StackProps) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  // const [randomProducts, setRandomProducts] = useState<Product[]>([]);
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
      console.log(newProducts);
      setDisplayedProducts(newProducts);
    }
  }, [products]);

  return (
    <Box sx={{ width: "90%", margin: "50px auto" }}>
      <Stack direction="row" spacing={1} justifyContent="space-evenly">
        {displayedProducts.map((product) => (
          <ProductCard
            id={product.id}
            title={product.data.title}
            category={product.data.category}
            description={product.data.description}
            price={product.data.price}
            isNew={product.data.new}
            onSale={product.data.onSale}
            img={product.data.image}
            key={product.id}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default ProductStack;

{
  /* <Box sx={{ width: "95%", margin: "50px auto" }}></Box> */
}
