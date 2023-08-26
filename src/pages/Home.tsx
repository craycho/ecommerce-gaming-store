import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

import ProductCarousel from "../components/Homepage/ProductCarousel";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Homepage/Description";
import Newsletter from "../components/Homepage/Newsletter";
import BannerStack from "../components/Homepage/BannerStack";

import { CircularProgress, styled, Typography } from "@mui/material";

/* Memoized selector, radi kao obicni al ne runa svaki put
const productsSelector = (state: RootState) => state.cart;
const memoizedProducts = createSelector(
  productsSelector,
  (products) => products
); */

const CategoryTitle = styled(Typography)({
  textAlign: "center",
  fontWeight: 700,
  fontSize: 26,
  letterSpacing: 0.8,
});

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
        <CircularProgress />
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
