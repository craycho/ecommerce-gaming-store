import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import AutocompleteSearch from "./Autocomplete";
import CartModal from "../Cart/CartModal";
import LoginModal from "../Authentication/LoginModal";
import UserModal from "../User/UserModal";

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
  position: "relative",
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

const IconWithBadge = styled(Badge)({
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

// const WelcomeMessage = styled(Typography)({
//   position: "absolute",
//   right: 150,
// });

function MainNavigation() {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { wishlist, user: userData } = useSelector((state: RootState) => state);
  // console.log(userData);

  const [currentInput, setCurrentInput] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [currentOrders, setCurrentOrders] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartTotalAmount = cart.reduce(
    (accumulator, product) => accumulator + (product.quantity ?? 0),
    0
  );

  const fetchOrders = async () => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const firebaseUsersData = await response.json();

    for (const firebaseUser in firebaseUsersData) {
      const currentUser = firebaseUsersData[firebaseUser];

      if (currentUser.email === userData.email) {
        let userOrders: string[] = [];

        for (const order in currentUser.orders) {
          userOrders.push(order);
        }
        setCurrentOrders(userOrders);
        console.log(currentOrders);
      }
    }
  };

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
          <IconWithBadge
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
          </IconWithBadge>

          {userData.loggedIn ? (
            <Box
              display="flex"
              alignItems="center"
              gap={1.2}
              onClick={() => {
                setUserModalOpen(true);
                fetchOrders();
              }}
              sx={{ cursor: "pointer" }}
            >
              <Avatar src={userData.profilePicture} />
              {userData.firstName}
            </Box>
          ) : (
            <UserIcon onClick={() => setLoginModalOpen(true)} />
          )}

          <IconWithBadge
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
          </IconWithBadge>
        </Icons>
      </StyledToolbar>
      <CartModal cartOpen={cartOpen} handleClose={() => setCartOpen(false)} />
      <LoginModal
        loginOpen={loginModalOpen}
        handleClose={() => setLoginModalOpen(false)}
      />
      <UserModal
        userModalOpen={userModalOpen}
        handleClose={() => setUserModalOpen(false)}
        currentOrders={currentOrders}
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
