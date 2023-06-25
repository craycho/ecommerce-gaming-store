import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

import ProductStack from "../components/Homepage/ProductStack";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Layout/Description";
import Newsletter from "../components/Layout/Newsletter";
import Footer from "../components/Layout/Footer";

import { Box, CircularProgress, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";

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

/* Memoized selector, radi kao obicni al ne runa svaki put
const productsSelector = (state: RootState) => state.products;
const memoizedProducts = createSelector(
  productsSelector,
  (products) => products
); */

function Home() {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products);
  const heroRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  // const [scroll, setScroll] = useState<number>(0);

  // console.log(heroRef.current);

  useEffect(() => {
    /**@todo Ne radi jer se ref selecta i onda opet postane null??? */
    // heroRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 10);

    const fetchHomepage = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts()); // Neat little hack, doesn't break rules
      setIsLoading(false);
    };
    fetchHomepage();
  }, []);

  // useEffect(() => {
  //   console.log("promjena lokacije");

  // }, [location.pathname]);

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
