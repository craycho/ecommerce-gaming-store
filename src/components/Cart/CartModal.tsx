import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CartItem from "./CartItem";
import calcTotalPrice from "../../util/calc-total-price";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Cancel";

const boxStyle = {
  position: "absolute",
  right: 0,
  top: { sm: 0, xs: "50%" },
  transform: { sm: "translate(0, 0)", xs: "translate(0, -50%)" },

  width: { sm: 500, xs: "100%" },
  minHeight: { sm: "100vh", xs: "70vh" },
  p: 3,
  pt: { sm: 2, xs: 0.5 },
  bgcolor: "background.paper",
  boxShadow: 24,
};

const CartWrapper = styled(Box)(({ theme }) => ({
  height: "60vh",
  overflowY: "scroll",

  [theme.breakpoints.down("sm")]: {
    height: "45vh",
  },
}));

const CloseModalButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: -20,
  right: -10,
  color: "#000000bc",
  "&:hover": {
    transform: "scale(1.1)",
  },

  [theme.breakpoints.down("sm")]: {
    top: -10,
  },
}));

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
          <Box sx={{ position: "relative" }}>
            <CloseModalButton onClick={handleClose}>
              <CloseIcon sx={{ fontSize: 30 }} />
            </CloseModalButton>
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
                {loggedIn ? (
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
                ) : (
                  <Typography
                    mt={1}
                    p={1}
                    sx={{ fontSize: { xs: 15, sm: 17 } }}
                  >
                    Please sign in or create a new account to proceed to the
                    checkout page.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}

export default CartModal;
