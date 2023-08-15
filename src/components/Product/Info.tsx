import { useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../../store/cart-actions";
import { useAppDispatch, RootState } from "../../store";
import { Product } from "../../util/type-definitions";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

function Info({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const { category, title, description, price, onSale } = product.data;
  const [showCartNotification, setShowCartNotification] =
    useState<boolean>(false);

  console.log(showCartNotification);

  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = (price - saleAmount).toFixed(2);

  const addToCartHandler = () => {
    setShowCartNotification(true);
    dispatch(addToCart(product, userId));

    setTimeout(() => {
      setShowCartNotification(false);
    }, 1500);
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
        onClick={addToCartHandler}
        sx={{
          marginTop: 2.5,
          backgroundColor: showCartNotification ? "orangered" : "black",
          "&:hover": {
            backgroundColor: showCartNotification ? "orangered" : "#1a1a1a",
          },
        }}
      >
        {!showCartNotification ? "Add to cart" : "Added to cart!"}
      </Button>
    </Stack>
  );
}

export default Info;
