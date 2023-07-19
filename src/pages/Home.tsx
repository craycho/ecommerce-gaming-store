import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

import ProductCarousel from "../components/Homepage/ProductCarousel";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Layout/Description";
import Newsletter from "../components/Layout/Newsletter";

import { Box, CircularProgress, Typography } from "@mui/material";

/* Memoized selector, radi kao obicni al ne runa svaki put
const productsSelector = (state: RootState) => state.cart;
const memoizedProducts = createSelector(
  productsSelector,
  (products) => products
); */

function Home() {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
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
          <Typography variant="h5" mb={3} align="center" fontWeight={700}>
            You might be interested in:
          </Typography>
          <ProductCarousel type="random" />
          <Typography variant="h5" mb={3} align="center" fontWeight={700}>
            Currently on sale:
          </Typography>
          <ProductCarousel type="onSale" />
          <Typography variant="h5" mb={3} align="center" fontWeight={700}>
            New arrivals:
          </Typography>
          <ProductCarousel type="new" />
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
    </>
  );
}

export default Home;
