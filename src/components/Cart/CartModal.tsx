import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import CartItem from "./CartItem";

import { Box, Button, Modal, Paper, Stack, Typography } from "@mui/material";

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

interface ModalProps {
  cartOpen: boolean;
  handleClose: () => void;
}

function CartModal({ cartOpen, handleClose }: ModalProps) {
  const cart = useSelector((state: RootState) => state.products.cart);
  console.log(cart);

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
            id="modal-modal-title"
            variant="h5"
            fontWeight={700}
            mb={2}
          >
            Your Cart
          </Typography>
          {cart.length < 1 && (
            <>
              <Typography variant="body1" fontSize={16} mb={3}>
                Your cart is currently empty.
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleClose}
              >
                Start shopping
              </Button>
            </>
          )}
          <Stack direction="column" spacing={2}>
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </Stack>
        </Box>
      </Modal>
    </Paper>
  );
}

export default CartModal;
