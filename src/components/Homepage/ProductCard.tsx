import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { cartActions } from "../../store/cart-slice";
import { wishlistActions } from "../../store/wishlist-slice";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartOutlined";

interface Product {
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

interface CardProps {
  id: string;
  data: Product;
}

const NewIcon = styled(FiberNewIcon)({
  position: "absolute",
  top: 5,
  right: 5,
  fontSize: 35,
  color: "orangered",
  transform: "rotate(15deg)",
});

const WishlistIcon = styled(FavoriteIcon)({
  position: "absolute",
  top: 5,
  left: 5,
  fontSize: 25,
  "&:hover": {
    cursor: "pointer",
    color: "red",
  },
});

const AddCartIcon = styled(AddShoppingCartIcon)({
  position: "absolute",
  bottom: 122,
  right: 8,
  borderRadius: "50%",
  padding: 5,
  fontSize: 33,
  backgroundColor: "#b3b3b3",
  color: "white",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#ff4500",
  },
});

const AddCartNotification = styled("div")({
  position: "absolute",
  bottom: 160,
  right: 5,
  width: 70,
  height: 35,
  padding: "2px 10px",
  backgroundColor: "orangered",
  color: "white",
  borderRadius: 4,
  fontSize: 12,
  textAlign: "center",
  lineHeight: "1rem",

  transition: "opacity 500ms fade-in-out",
});

function ProductCard({ id, data }: CardProps) {
  const dispatch = useAppDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const [openCartNotification, setOpenCartNotification] =
    useState<boolean>(false);
  const { price, onSale, new: isNew, title, category, image } = data;
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = onSale ? (price - saleAmount).toFixed(2) : price;
  const urlString = `/${category.toLowerCase()}/${title
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  const wishlistHandler = () => {
    dispatch(wishlistActions.toggleWishlist({ id, data }));
  };

  const addToCartHandler = () => {
    setOpenCartNotification(true);
    dispatch(cartActions.addToCart({ id, data }));
    setTimeout(() => {
      setOpenCartNotification(false);
    }, 1000);
  };
  /* const closeNotificationHandler = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCartNotification(false);
  }; */

  const isInWishlist = () => {
    // const wishlistProduct = wishlist.find((product) => product.id === id);
    return wishlist.find((product) => product.id === id) ? true : false;
  };

  return (
    // <Fade in={true} timeout={500}>
    <Card
      sx={{
        position: "relative",
        maxWidth: 320,
        minWidth: 270,
        paddingBottom: 1.7,
      }}
    >
      <Link to={urlString} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          /* loading="lazy" */
          image={image}
          title={title}
          sx={{ height: 200, objectFit: "contain" }}
        />
      </Link>
      <WishlistIcon
        onClick={wishlistHandler}
        sx={{ color: isInWishlist() ? "red" : "lightgrey" }}
      />
      <AddCartIcon onClick={addToCartHandler} />
      {openCartNotification && (
        <AddCartNotification>Added to cart</AddCartNotification>
      )}
      {isNew && <NewIcon />}
      <CardContent sx={{ height: 130 }}>
        <Typography variant="caption" fontWeight={700}>
          {category}
        </Typography>
        <Link
          to={urlString}
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <Typography variant="subtitle1" component="div" minHeight={55}>
            {title}
          </Typography>
        </Link>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" color={onSale ? "orangered" : "primary"}>
              {onSale ? onSalePrice : price} €
            </Typography>
            {onSale && (
              <Typography variant="body2" color="primary.light">
                <s>({price})</s> €
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <CheckCircleOutlineIcon
              style={{ fontSize: 20, color: "GrayText" }}
            />
            <Typography variant="caption" ml={0.4} color="GrayText">
              In stock
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
    // </Fade>
  );
}

export default ProductCard;
