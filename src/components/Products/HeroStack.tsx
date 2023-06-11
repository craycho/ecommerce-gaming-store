import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import getRandomProducts from "../../util/random-products";

import HeroProduct from "./HeroProduct";

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

interface HeroProps {
  products: Product[];
}

const ProductBox = styled(Box)({
  width: "100%",
  display: "relative",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url()`,
});

function HeroStack({ products }: HeroProps) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const randomProducts: Product[] = getRandomProducts(products, 3);
      setRandomProducts(randomProducts);
    }
  }, [products]);

  return (
    <Stack direction="row" gap={2} justifyContent="center">
      {randomProducts.map((product: Product) => (
        <HeroProduct randomProduct={product} />
      ))}
    </Stack>
  );

  /* return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        display: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${randomProducts[0]?.data.image}')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        borderRadius: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 120,
          marginLeft: 25,
          marginRight: 25,
          width: "25%",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} color="white">
          {randomProducts[0]?.data.category}
        </Typography>
        <Typography gutterBottom variant="h6" fontWeight={700} color="white">
          {randomProducts[0]?.data.title}
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "orangered", marginTop: 1 }}
        >
          Buy now
        </Button>
      </div>
    </Box>
  ); */
}

export default HeroStack;

/* 
background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
 */

// boxShadow: "0 0 30px 30px black inset"

/* <Box sx={{ width: "100%", display: "relative" }}>
      <Card
        sx={{
          width: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${randomProducts[0]?.data.image}'))`,
        }}
      >
        {randomProducts && (
          <CardMedia
            component="img"
            image={randomProducts[0]?.data.image}
            title={randomProducts[0]?.data.title}
            sx={{ height: 400, objectFit: "contain" }}
          />
        )}
        <CardContent sx={{ height: 0 }}>
          <div style={{ position: "absolute", bottom: 250 }}>
            <Typography variant="subtitle1" fontWeight={700} color="white">
              {randomProducts[0]?.data.category}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              fontWeight={700}
              color="white"
            >
              {randomProducts[0]?.data.title}
            </Typography>
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box> */
