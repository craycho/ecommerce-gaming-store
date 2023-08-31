import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from "../../store/cart-actions";
import { Product } from "../../util/type-definitions";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "70%",
});
const ProductTitle = styled(Typography)({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

const ProductQuantity = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 5,
  left: 65,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  width: 32,
  backgroundColor: "#3c3c3c75",
  color: "white",
  borderRadius: 3,
  fontWeight: 700,

  [theme.breakpoints.down("sm")]: {
    left: 40,
  },
}));

const PriceBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const imageStyle = {
  width: "20%",
  height: 90,
  backgroundSize: "contain", // objectFit ne radi ffs
};
const contentStyle = {
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
};

function CartItem({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  const saleAmount = +(product.data.price * 0.3).toFixed(2);
  const individualItemPrice = product.data.onSale
    ? +(product.data.price - saleAmount).toFixed(2)
    : product.data.price;

  const totalPrice = product.quantity
    ? (individualItemPrice * product.quantity).toFixed(2)
    : individualItemPrice.toFixed(2);
  const totalPriceWithoutDiscount = product.quantity
    ? product.data.price * product.quantity
    : product.data.price;

  const increaseQuantity = () => {
    dispatch(addToCart(product, userId || "loggedOutUser"));
  };

  const decreaseQuantity = () => {
    dispatch(removeFromCart(product, userId || "loggedOutUser"));
  };

  const deleteFromCart = () => {
    dispatch(removeAllFromCart(product, userId || "loggedOutUser"));
  };

  return (
    <Card sx={{ position: "relative", height: 110 }}>
      <Box display="flex" alignItems="center">
        <CardMedia
          title={product.data.title}
          image={product.data.image}
          sx={imageStyle}
        />
        <CardContent sx={contentStyle}>
          <ProductQuantity>{product.quantity}</ProductQuantity>
          <TitleBox>
            <ProductTitle variant="subtitle1">
              {product.data.title}
            </ProductTitle>
            <Typography variant="caption" mb={1.2}>
              {product.data.category}
            </Typography>
            <Stack direction="row" spacing={0.3}>
              <RemoveCircleOutlineIcon
                sx={{ cursor: "pointer", fontSize: 27 }}
                onClick={decreaseQuantity}
              />
              <AddCircleOutlineIcon
                sx={{ cursor: "pointer", fontSize: 27 }}
                onClick={increaseQuantity}
              />
              <DeleteIcon
                sx={{ cursor: "pointer", fontSize: 27 }}
                onClick={deleteFromCart}
              />
            </Stack>
          </TitleBox>
          <PriceBox>
            <Typography
              color={product.data.onSale ? "orangered" : "primary"}
              sx={{
                fontSize: { sm: "1.25rem", xs: "1rem" },
                whiteSpace: "nowrap",
              }}
            >
              {totalPrice} €
            </Typography>
            {product.data.onSale && (
              <Typography variant="body2" color="GrayText">
                <s>({totalPriceWithoutDiscount.toFixed(2)})</s> €
              </Typography>
            )}
            <Typography variant="body2">In stock</Typography>
          </PriceBox>
        </CardContent>
      </Box>
    </Card>
  );
}

export default CartItem;
