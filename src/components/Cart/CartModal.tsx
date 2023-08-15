import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CartItem from "./CartItem";

import calcTotalPrice from "../../util/calc-total-price";

import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const boxStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 500,
  minHeight: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  pt: 2,
};

const CartWrapper = styled(Box)({
  height: "60vh",
  overflowY: "scroll",
});

interface ModalProps {
  cartOpen: boolean;
  handleClose: () => void;
}

function CartModal({ cartOpen, handleClose }: ModalProps) {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const totalPrice = calcTotalPrice(cart);

  return (
    <Paper component="div" elevation={5}>
      <Modal
        disableAutoFocus
        open={cartOpen}
        onClose={handleClose}
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={boxStyle}>
          <Typography
            id="modal-title"
            variant="h5"
            fontWeight={700}
            mt={2}
            mb={2.5}
          >
            Your Cart
          </Typography>
          {cart.length < 1 ? (
            <>
              <Typography variant="body1" fontSize={16} mb={3}>
                Your cart is currently empty.
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => {
                  handleClose();
                  navigate("/");
                }}
              >
                Start shopping
              </Button>
            </>
          ) : (
            <>
              <CartWrapper>
                <Stack direction="column" spacing={2}>
                  {cart.map((product) => (
                    <CartItem key={product.id} product={product} />
                  ))}
                </Stack>
              </CartWrapper>
              <Stack
                direction="row"
                justifyContent="space-between"
                p={1}
                pb={0}
              >
                <Typography variant="h6" fontWeight={700} mt={2}>
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight={700} mt={2}>
                  {totalPrice} €
                </Typography>
              </Stack>
              <Typography variant="subtitle2" color="GrayText" p={1} pt={0}>
                Including VAT
              </Typography>
              {loggedIn && (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  color="secondary"
                  onClick={() => {
                    handleClose();
                    navigate("/checkout");
                  }}
                  sx={{ mt: 2, height: 55 }}
                >
                  Checkout
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Paper>
  );
}

export default CartModal;
