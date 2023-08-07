import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/index";
import { fetchProducts } from "../store/products-actions";

import ProductCarousel from "../components/Homepage/ProductCarousel";
import HeroStack from "../components/Homepage/HeroStack";
import NextGenDescription from "../components/Homepage/Description";
import Newsletter from "../components/Homepage/Newsletter";
import BannerStack from "../components/Homepage/BannerStack";

import { CircularProgress, Typography } from "@mui/material";

/* Memoized selector, radi kao obicni al ne runa svaki put
const productsSelector = (state: RootState) => state.cart;
const memoizedProducts = createSelector(
  productsSelector,
  (products) => products
); */

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
        <CircularProgress sx={{ margin: "2% 48%" }} />
      ) : (
        <>
          <HeroStack />
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
      <NextGenDescription />
      <Newsletter />
    </>
  );
}

export default Home;
