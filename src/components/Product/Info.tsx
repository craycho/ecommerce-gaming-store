import { useSelector } from "react-redux";
import { addToCart } from "../../store/cart-actions";
import { useAppDispatch, RootState } from "../../store";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

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

function Info({ product }: { product: Product }) {
  const userId = useSelector((state: RootState) => state.user.id);
  const { category, title, description, price } = product.data;
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product, userId));
  };

  return (
    <Stack direction="column">
      <Typography variant="subtitle1">{category}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1" mt={2}>
          {description}
        </Typography>
        <Typography variant="h5" mt={2}>
          ${price}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: 3 }}
        onClick={addToCartHandler}
      >
        Add to cart
      </Button>
    </Stack>
  );
}

export default Info;
