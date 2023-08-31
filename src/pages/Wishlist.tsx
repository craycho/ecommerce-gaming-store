import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { wishlistActions } from "../store/wishlist-slice";
import WishlistItem from "../components/Wishlistpage/WishlistItem";

import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const WishlistIcon = styled(FavoriteIcon)({
  marginLeft: 4,
  verticalAlign: "-15%",
  fontSize: 23,
  color: "red",
});

const DeleteAllButton = styled(Button)({
  marginBottom: 8,
  backgroundColor: "#3c3c3c",
  "&:hover": {
    backgroundColor: "rgb(26,26,26)",
  },
});

function Wishlist() {
  const dispatch = useAppDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);

  return (
    <Container
      sx={{
        margin: "30px auto",
        height: wishlist.length < 2 ? "calc(100vh - 462px)" : "auto",
        /** @todo Temporary fix. Make footer fixed position dynamically.  */
      }}
    >
      <Container
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6" fontWeight={700}>
          Your wishlist
        </Typography>
        <DeleteAllButton
          variant="contained"
          size="small"
          onClick={() => dispatch(wishlistActions.clearWishlist())}
        >
          Delete all
        </DeleteAllButton>
      </Container>
      <Divider sx={{ mb: 2 }} />
      {wishlist.length < 1 && (
        <Typography variant="body1">
          Your wishlist is currently empty.
          <br />
          <br />
          You can try adding products to it by using the
          <WishlistIcon /> icon.
        </Typography>
      )}
      <Stack direction="column">
        {wishlist.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </Stack>
    </Container>
  );
}

export default Wishlist;
