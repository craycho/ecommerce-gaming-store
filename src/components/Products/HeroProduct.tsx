import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import getRandomProducts from "../../util/random-products";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from "@mui/material";

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
  randomProduct: Product;
}

/**@todo Non-random hero products with special promo text */

function HeroStack({ randomProduct }: ProductProps) {
  return (
    <Box
      position="relative"
      sx={{
        width: "100%",
        height: 500,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${randomProduct.data.image}')`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        borderRadius: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 30,
          marginLeft: 25,
          marginRight: 25,
          width: "90%",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} color="white">
          {randomProduct.data.category}
        </Typography>
        <Typography gutterBottom variant="h6" fontWeight={700} color="white">
          {randomProduct.data.title}
        </Typography>
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
      </div>
    </Box>
  );
}

export default HeroStack;
