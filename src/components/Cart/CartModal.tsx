import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import ProductCard from "../Homepage/ProductCard";

import { Box, Modal, Paper, Stack, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
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
      <Modal open={cartOpen} onClose={handleClose} sx={{ overflowY: "scroll" }}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your cart
          </Typography>
          <Stack direction="column" spacing={2}>
            {cart.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                data={product.data}
              />
            ))}
          </Stack>
        </Box>
      </Modal>
    </Paper>
  );
}

export default CartModal;
