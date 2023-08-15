import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import CartItem from "../Cart/CartItem";
import calcTotalPrice from "../../util/calc-total-price";

import { Box, Button, Stack, styled, Typography } from "@mui/material";

const boxStyle = {
  width: 1000,
  height: "fit-content",
  maxHeight: 1100,
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 3,
  pt: 2,
};

const CartWrapper = styled(Box)({
  // height: "80%",
});

function CheckoutCart({ deliveryMethod }: { deliveryMethod: number }) {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const deliveryPrice =
    deliveryMethod === 0 ? 8.95 : deliveryMethod === 1 ? 19.99 : 99.99;
  const totalPrice = calcTotalPrice(cart);

  return (
    <Box sx={boxStyle}>
      {cart.length > 0 ? (
        <>
          <CartWrapper>
            <Stack direction="column" spacing={2}>
              {cart.map((product) => (
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
            Total: {(totalPrice + deliveryPrice).toFixed(2)} €
          </Typography>
          <Typography variant="subtitle2" color="GrayText" fontSize={13}>
            Including Delivery costs and VAT.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body1" fontSize={16} mb={3}>
            Your cart is currently empty.
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => navigate("/")}
          >
            Start shopping
          </Button>
        </>
      )}
    </Box>
  );
}

export default CheckoutCart;
