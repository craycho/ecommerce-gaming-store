import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

import ProductCarousel from "../components/Homepage/ProductCarousel";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Homepage/Description";
import Newsletter from "../components/Homepage/Newsletter";
import BannerStack from "../components/Homepage/BannerStack";

import { Box, CircularProgress, styled, Typography } from "@mui/material";

const CategoryTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: 0.8,

  [theme.breakpoints.down("sm")]: {
    fontSize: 22,
  },
}));

function Home() {
  const dispatch = useAppDispatch();
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <HeroStack />
          <CategoryTitle sx={{ mb: 3 }}>Recommended products</CategoryTitle>
          <ProductCarousel type="random" />
          <CategoryTitle sx={{ mt: 5, mb: 3 }}>Currently on sale</CategoryTitle>
          <ProductCarousel type="onSale" />
          <BannerStack />
          <CategoryTitle sx={{ mb: 3 }}>New arrivals</CategoryTitle>
          <ProductCarousel type="new" />
        </>
      )}
      <NextGenDescription />
      <Newsletter />
    </>
  );
}

export default Home;
