import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";
import { cartActions } from "../store/cart-slice";

import ProductCarousel from "../components/Homepage/ProductCarousel";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Layout/Description";
import Newsletter from "../components/Layout/Newsletter";
import BannerStack from "../components/Homepage/BannerStack";

import { Box, CircularProgress, Typography } from "@mui/material";

/* Memoized selector, radi kao obicni al ne runa svaki put
const productsSelector = (state: RootState) => state.cart;
const memoizedProducts = createSelector(
  productsSelector,
  (products) => products
); */

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
  quantity?: number;
}

function Home() {
  const dispatch = useAppDispatch();
  // const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const products = useSelector((state: RootState) => state.cart.products);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllProducts = async () => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    if (!response.ok) {
      throw new Error("Could not fetch product data.");
    }
    const productData = await response.json();
    const productsArray = Object.keys(productData).map((productId) => ({
      id: productId,
      data: productData[productId],
    }));

    return productsArray;
  };

  /**@todo LOOK INTO*/

  /* useEffect(() => {
    const fetchProd = async () => {
      const existingProducts = localStorage.getItem("allProducts");

      if (existingProducts && JSON.parse(existingProducts).length > 0) {
        // Do nothing if products exist in local storage
        console.log("Postoje");
        return;
      } else {
        // If they don't fetch them
        const allProducts = await fetchAllProducts();
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
      }
    };
    fetchProd();
  }, []);

  useEffect(() => {
    const allProducts = localStorage.setItem(
      "allProducts",
      JSON.stringify(loadedProducts)
    );
  }, []); */

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 10);

    const fetchHomepage = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts()); // Neat little hack, doesn't break rules
      setIsLoading(false);
    };
    fetchHomepage();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ margin: "2% 48%" }} />
      ) : (
        <>
          <HeroStack products={products} />
          <Typography mb={3} align="center" fontWeight={700} fontSize={26}>
            Recommended products
          </Typography>
          <ProductCarousel type="random" />
          <Typography
            mb={2.8}
            mt={5}
            align="center"
            fontWeight={700}
            fontSize={26}
          >
            Currently on sale
          </Typography>
          <ProductCarousel type="onSale" />
          <BannerStack />
          <Typography mb={2.8} align="center" fontWeight={700} fontSize={26}>
            New arrivals
          </Typography>
          <ProductCarousel type="new" />
        </>
      )}
      <Box
        sx={{
          backgroundColor: "#f4f5f7",
          padding: "40px 0",
          border: "1px lightgrey solid",
          marginBottom: 6,
          marginTop: 6,
        }}
      >
        <NextGenDescription />
      </Box>
      <Newsletter />
    </>
  );
}

export default Home;
