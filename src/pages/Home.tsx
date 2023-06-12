import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/products-slice";
import { RootState } from "../store/index";

import ProductStack from "../components/Products/ProductStack";
import HeroStack from "../components/Products/HeroStack";
import NextGenDescription from "../components/Layout/Description";
import Newsletter from "../components/Layout/Newsletter";
import Footer from "../components/Layout/Footer";

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

let isInitial: boolean = true;

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const fetchProducts = async () => {
      const res = await fetch(
        "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      const productData = await res.json();
      // console.log(productData);

      const productsArray = Object.keys(productData).map((productId) => ({
        id: productId,
        data: productData[productId],
      }));
      dispatch(productsActions.initProducts(productsArray));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <HeroStack products={products} />
      <Typography variant="h5" mb={3} align="center" fontWeight={700}>
        You might be interested in:
      </Typography>
      <ProductStack type="random" />
      <Typography variant="h5" mb={3} align="center" fontWeight={700}>
        Currently on sale:
      </Typography>
      <ProductStack type="onSale" />
      <Typography variant="h5" mb={3} align="center" fontWeight={700}>
        New arrivals:
      </Typography>
      <ProductStack type="new" />
      <Box
        sx={{
          backgroundColor: "#f4f5f7",
          padding: "40px 0",
          border: "1px lightgrey solid",
          marginBottom: 8,
        }}
      >
        <NextGenDescription />
      </Box>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;

/* Storeanje products pomocu useState:

  // const [products, setProducts] = useState<Product[]>([]);

      // for (const productId in productData) {
      //   setProducts((prev) => [
      //     ...prev,
      //     { id: productId, data: productData[productId] },
      //   ]);
      // }
*/
