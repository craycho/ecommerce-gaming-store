import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import AutocompleteSearch from "./Autocomplete";
import CartModal from "../Cart/CartModal";
import LoginModal from "../Authentication/LoginModal";

// npm install -D @types/autosuggest-highlight
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "3%",
  height: "70px",

  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
    margin: "auto 15px",
  },
}));

const Icons = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 25,
});

const NavbarBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    padding: "0 0",
    display: "flex",

    height: 18,
    minWidth: 18,
  },
});

const UserIcon = styled(LoginIcon)({
  cursor: "pointer",
  "&:hover": {
    color: (theme: any) => theme.palette.secondary.main,
  },
});

function MainNavigation() {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { wishlist, user: userData } = useSelector((state: RootState) => state);
  // console.log(userData);

  const [currentInput, setCurrentInput] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartTotalAmount = cart.reduce(
    (accumulator, product) => accumulator + (product.quantity ?? 0),
    0
  );

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white" }}
          onClick={() => setCurrentInput("")}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            NEXTGEN
          </Typography>
        </Link>
        <SportsEsportsIcon
          fontSize="large"
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <AutocompleteSearch
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
        />
        <Icons>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <SearchIcon fontSize="large" />
          </Box>
          <NavbarBadge
            badgeContent={wishlist.length}
            color="error"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "red",
              },
            }}
          >
            <FavoriteIcon onClick={() => navigate("/wishlist")} />
          </NavbarBadge>
          <UserIcon onClick={() => setLoginModalOpen(true)} />
          <NavbarBadge
            badgeContent={cartTotalAmount}
            color="secondary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCartIcon />
          </NavbarBadge>
        </Icons>
        {userData.loggedIn && (
          <Typography variant="body1">Hello, {userData.name}!</Typography>
        )}
      </StyledToolbar>
      <CartModal cartOpen={cartOpen} handleClose={() => setCartOpen(false)} />
      <LoginModal
        loginOpen={loginModalOpen}
        handleClose={() => setLoginModalOpen(false)}
      />
    </AppBar>
  );
}

export default MainNavigation;

/* WORKING SEARCH CATEGORY DROPDOWN

{ category }: { category: string }
  const [category, setCategory] = useState<string>("all");

<FormControl
            variant="standard"
            sx={{ minWidth: 80, marginRight: 0.5 }}
          >
            <Select
              id="select-category"
              value={category}
              onChange={(event: SelectChangeEvent) => {
                setCategory(event.target.value);
              }}
              autoWidth
              disableUnderline
              sx={{
                ".MuiSelect-select": {
                  fontSize: 15,
                },
              }}
            >
              <MenuItem value="all">All categories</MenuItem>
              <MenuItem value={"keyboards"}>Keyboards</MenuItem>
              <MenuItem value={"mice"}>Mice</MenuItem>
              <MenuItem value={"headsets"}>Headsets</MenuItem>
              <MenuItem value={"mousepads"}>Mousepads</MenuItem>
              <MenuItem value={"monitors"}>Monitors</MenuItem>
              <MenuItem value={"chairs"}>Gaming chairs</MenuItem>
            </Select>
          </FormControl>
*/
