import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import getRandomProducts from "../../util/random-products";

import CorsairHero from "../../assets/corsair-k95-hero.jpg";
import SteelseriesHero from "../../assets/steelseries-hero.jpg";
import NoblechairsHero from "../../assets/noble-chair-hero.jpg";

import { Box, Button, Fade, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

interface ProductProps {
  key: string | undefined;
  product: Product | undefined;
  promo: string;
}

function HeroProduct({ product, promo }: ProductProps) {
  const productTitle = product?.data.title;
  const productUrl = `/${product?.data.category.toLowerCase()}/${product?.data.title
    .toLowerCase()
    .replaceAll(" ", "-")}`;
  const heroImage = productTitle?.includes("Steelseries Arctis") ? (
    SteelseriesHero
  ) : productTitle?.includes("Noblechairs Hero") ? (
    NoblechairsHero
  ) : productTitle?.includes("Corsair K95") ? (
    CorsairHero
  ) : (
    <h4>Error displaying image.</h4>
  );

  return (
    <Fade in={true} timeout={700}>
      <Box
        position="relative"
        sx={{
          width: "100%",
          height: 500,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
        }}
      >
        <Box
          style={{
            position: "absolute",
            bottom: 30,
            marginLeft: 25,
            marginRight: 25,
            width: "90%",
          }}
        >
          {promo && (
            <Typography variant="h4" fontWeight={700} color="white" mb={1}>
              {promo}
            </Typography>
          )}
          <Typography
            gutterBottom
            variant="subtitle1"
            fontWeight={700}
            color="white"
          >
            {product?.data.title}
          </Typography>
          <Link to={productUrl}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "orangered",
                marginTop: 1,
                padding: "8px 18px",
              }}
            >
              Buy now
            </Button>
          </Link>
        </Box>
      </Box>
    </Fade>
  );
}

export default HeroProduct;
