import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { wishlistActions } from "../../store/wishlist-slice";
import { addToCart } from "../../store/cart-actions";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  keyframes,
  Snackbar,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartOutlined";

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
  width: 60,
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

const fadeInOut = keyframes(`0% {
  opacity: 0;
  transform: translateY(2px);
}
50% {
  opacity: 1;
  transform: translateY(0);
}
80% {
  opacity: 1;
}
100% {
  opacity: 0;
  transform: translateY(-2px);
}`);
const AddCartPopup = styled("div")({
  position: "absolute",
  bottom: 122,
  right: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
  borderRadius: "50%",
  backgroundColor: "#ff4400c9",
  color: "#F4F4F6",
  animation: `${fadeInOut} 1s forwards`,
});

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
  quantity?: number;
}

function ProductCard({ product }: { product: CardProps }) {
  const dispatch = useAppDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const userData = useSelector((state: RootState) => state.user);

  const [openCartNotification, setOpenCartNotification] =
    useState<boolean>(false);
  const { price, onSale, new: isNew, title, category, image } = product.data;
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = onSale ? (price - saleAmount).toFixed(2) : price;
  const urlString = `/${category.toLowerCase()}/${title
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  const wishlistHandler = () => {
    dispatch(
      wishlistActions.toggleWishlist({ id: product.id, data: product.data })
    );
  };

  const addToCartHandler = () => {
    userData.loggedIn
      ? dispatch(addToCart(product, userData.id))
      : dispatch(addToCart(product, "loggedOutUser"));

    setOpenCartNotification(true);
    setTimeout(() => {
      setOpenCartNotification(false);
    }, 1000);
  };
  const isInWishlist = () => {
    return wishlist.find((wishlistProduct) => wishlistProduct.id === product.id)
      ? true
      : false;
  };

  return (
    // <Fade in={true} timeout={500}>
    <Card
      sx={{
        position: "relative",
        maxWidth: 300,
        minWidth: 260,
        paddingBottom: 1.7,
      }}
    >
      <Link to={urlString} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          /* loading="lazy" */
          image={image}
          title={title}
          sx={{ height: 180, objectFit: "contain" }}
        />
      </Link>
      <WishlistIcon
        onClick={wishlistHandler}
        sx={{ color: isInWishlist() ? "red" : "lightgrey" }}
      />

      {openCartNotification ? (
        <AddCartPopup>
          <CheckCircleIcon />
        </AddCartPopup>
      ) : (
        <Tooltip title="Add to cart" placement="top" arrow>
          <Fade in={true} timeout={200}>
            <AddCartIcon onClick={addToCartHandler} />
          </Fade>
        </Tooltip>
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
              <Typography variant="body2" color="GrayText">
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

/* {openCartNotification ? (
        <AddCartPopup>
          Added to cart <CheckCircleIcon sx={{ ml: 0.4, mb: 0.3 }} />
        </AddCartPopup>
      ) : (
        <Tooltip title="Add to cart" placement="top" arrow>
          <AddCartIcon onClick={addToCartHandler} />
        </Tooltip>
      )} */
