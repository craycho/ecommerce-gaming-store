import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import CartItem from "../Cart/CartItem";

import { Box, Button, Stack, styled, Typography } from "@mui/material";

const boxStyle = {
  width: 1000,
  height: 1130,
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 3,
  pt: 2,
  pr: 0,
};

const CartWrapper = styled(Box)({
  //   height: "50%",
});

function CheckoutCart() {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const totalPrice = cart.totalPrice;
  // console.log(cart);

  return (
    <Box sx={boxStyle}>
      <CartWrapper>
        <Stack direction="column" spacing={2}>
          {cart.cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </Stack>
      </CartWrapper>
      <Stack direction="row" justifyContent="space-between" p={1} pb={0}>
        <Typography variant="subtitle1" fontWeight={700} mt={2}>
          Subtotal:
        </Typography>
        <Typography variant="h6" fontWeight={700} mt={2}>
          {totalPrice} €
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight={700} mt={2}>
        Total: {(totalPrice + 8.95).toFixed(2)}
      </Typography>
      <Typography variant="subtitle2" color="GrayText" p={1} pt={0}>
        Including VAT
      </Typography>
    </Box>
  );
}

export default CheckoutCart;
