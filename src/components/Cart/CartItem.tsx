import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from "../../store/cart-actions";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTitle = styled(Typography)({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

const ProductQuantity = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 10,
  left: 70,
  height: 25,
  width: 32,
  backgroundColor: "#3c3c3c75",
  color: "white",
  borderRadius: 3,
  fontWeight: 700,
});

const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "70%",
});

const PriceBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

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
  quantity?: number;
}

function CartItem({ product }: { product: Product }) {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch();

  const saleAmount = +(product.data.price * 0.3).toFixed(2);
  const individualPrice = product.data.onSale
    ? +(product.data.price - saleAmount).toFixed(2)
    : product.data.price;

  const totalPrice = product.quantity
    ? (individualPrice * product.quantity).toFixed(2)
    : individualPrice.toFixed(2);
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
    <>
      <Card
        sx={{
          position: "relative",
          height: 110,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CardMedia
            sx={{
              width: "20%",
              height: 90,
              backgroundSize: "contain", // objectFit ne radi ffs
            }}
            image={product.data.image}
            title={product.data.title}
          />
          <CardContent
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
                variant="h6"
                color={product.data.onSale ? "orangered" : "primary"}
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
    </>
  );
}

export default CartItem;
