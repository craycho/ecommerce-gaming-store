import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { wishlistActions } from "../../store/wishlist-slice";
import { addToCart } from "../../store/cart-actions";
import { Link } from "react-router-dom";
import { ProductData } from "../../util/type-definitions";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fade,
  keyframes,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartOutlined";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  minWidth: 260,
  maxWidth: 300,
  paddingBottom: 6,

  [theme.breakpoints.down("sm")]: {
    minWidth: 220,
    maxWidth: 240,
    ".MuiCardContent-root": {
      padding: "10px",
    },
    // ".MuiCardContent-root:last-child": {
    //   paddingBottom: 0,
    // },
  },
}));

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

const PriceBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: { xs: "0.4rem", sm: "0.5rem" },
});

interface CardProps {
  id: string;
  data: ProductData;
  quantity?: number;
}

function ProductCard({ product }: { product: CardProps }) {
  const dispatch = useAppDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const userData = useSelector((state: RootState) => state.user);

  const [showCheckmarkPopup, setShowCheckmarkPopup] = useState<boolean>(false);
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

    setShowCheckmarkPopup(true);
    setTimeout(() => {
      setShowCheckmarkPopup(false);
    }, 1000);
  };
  const isInWishlist = () => {
    return wishlist.find((wishlistProduct) => wishlistProduct.id === product.id)
      ? true
      : false;
  };

  return (
    <StyledCard>
      <Link to={urlString} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          image={image}
          title={title}
          sx={{ height: { xs: 130, sm: 180 }, objectFit: "contain" }}
        />
      </Link>

      <WishlistIcon
        onClick={wishlistHandler}
        sx={{ color: isInWishlist() ? "red" : "lightgrey" }}
      />

      {showCheckmarkPopup ? (
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
      <CardContent sx={{ height: { xs: 120, sm: 130 } }}>
        <Typography variant="caption" fontWeight={700}>
          {category}
        </Typography>
        <Link
          to={urlString}
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, mb: 0.35 }}
          >
            {title}
          </Typography>
        </Link>

        <PriceBox>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="h6"
              color={onSale ? "orangered" : "primary"}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {onSale ? onSalePrice : price} €
            </Typography>
            {onSale && (
              <Typography
                variant="body2"
                color="GrayText"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.9rem" } }}
              >
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
        </PriceBox>
      </CardContent>
    </StyledCard>
  );
}

export default ProductCard;
