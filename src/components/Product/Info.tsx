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
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const { category, title, description, price, onSale } = product.data;
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = (price - saleAmount).toFixed(2);

  const addToCartHandler = () => {
    dispatch(addToCart(product, userId));
  };

  return (
    <Stack direction="column">
      <Typography variant="subtitle1">{category}</Typography>
      <Divider />
      <Box mt={1}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1" mt={2} textAlign="justify">
          {description}
        </Typography>
        <Box display="flex" gap={1.75} mt={1.5}>
          <Typography
            variant="h5"
            color={onSale ? "orangered" : "primary"}
            mt={0.2}
          >
            {onSale ? onSalePrice : price} €
          </Typography>
          {onSale && (
            <Typography variant="h6" color="GrayText">
              <s>({price})</s> €
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: 2.5 }}
        onClick={addToCartHandler}
      >
        Add to cart
      </Button>
    </Stack>
  );
}

export default Info;
