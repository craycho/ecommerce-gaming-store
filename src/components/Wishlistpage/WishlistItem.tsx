import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/index";
import { wishlistActions } from "../../store/wishlist-slice";
import { Product } from "../../util/type-definitions";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AddCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const BuyButton = styled(Button)({
  backgroundColor: "orangered",
  "&:hover": {
    backgroundColor: "#c63500",
  },
});

const RemoveIcon = styled(DeleteIcon)({
  cursor: "pointer",
  fontSize: 27,
  color: "#bbbbbb",
  "&:hover": {
    color: "gray",
  },
});

const ProductTitle = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

function WishlistItem({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const saleAmount = +(product.data.price * 0.3).toFixed(2);
  const individualPrice = product.data.onSale
    ? +(product.data.price - saleAmount).toFixed(2)
    : product.data.price;

  const buyHandler = () => {
    const productUrl = `/${product.data.category.toLowerCase()}/${product.data.title
      .toLowerCase()
      .replaceAll(" ", "-")}`;

    navigate(productUrl);
  };

  return (
    <Card sx={{ position: "relative", mb: 2 }}>
      <Box display="flex" alignItems="center">
        <CardMedia
          image={product.data.image}
          title={product.data.title}
          sx={{
            width: "20%",
            height: 110,
            backgroundSize: "contain",
          }}
        />
        <CardContent
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          <TitleBox>
            <ProductTitle variant="subtitle1">
              {product.data.title}
            </ProductTitle>
            <Typography variant="caption" mb={1.2}>
              {product.data.category}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <BuyButton
                variant="contained"
                startIcon={<AddCartIcon />}
                onClick={buyHandler}
              >
                Buy
              </BuyButton>
              <RemoveIcon
                onClick={() =>
                  dispatch(wishlistActions.toggleWishlist(product))
                }
              />
            </Stack>
          </TitleBox>
          <PriceBox>
            <Typography
              variant="h6"
              color={product.data.onSale ? "orangered" : "primary"}
              sx={{ fontSize: { sm: "1.25rem", xs: "1.1rem" } }}
            >
              {individualPrice} €
            </Typography>
            {product.data.onSale && (
              <Typography variant="body2" color="GrayText">
                <s>({product.data.price})</s> €
              </Typography>
            )}
            <Typography variant="body2">In stock</Typography>
          </PriceBox>
        </CardContent>
      </Box>
    </Card>
  );
}

export default WishlistItem;
