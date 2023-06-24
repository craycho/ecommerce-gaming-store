import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/products-slice";
import { RootState } from "../store/index";

import ProductStack from "../components/Homepage/ProductStack";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Layout/Description";
import Newsletter from "../components/Layout/Newsletter";
import Footer from "../components/Layout/Footer";

import { Box, CircularProgress, Typography } from "@mui/material";

interface ProductData {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
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

// let isInitial: boolean = true;

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }

    const fetchProducts = async () => {
      setIsLoading(true);
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

      /**@todo Store products in localStorage API and call them from there */
    };
    fetchProducts();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ margin: "2% 48%" }} />
      ) : (
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
        </>
      )}
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

/* interface LoaderData {
  request: Request;
  // params: Params;
}

export async function productLoader({ request }: LoaderData) {
  const res = await fetch(
    "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
  );
  const productData = await res.json();
  const products = Object.keys(productData).map((productId) => ({
    id: productId,
    data: productData[productId],
  }));

  return products;
} */
