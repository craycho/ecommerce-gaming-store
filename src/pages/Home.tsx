import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

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
  const products = useSelector((state: RootState) => state.cart.products);
  const productsRef = useRef<Product[]>([]);
  const heroRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          <HeroStack products={products} ref={heroRef} />
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
