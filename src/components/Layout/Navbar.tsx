import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { fetchCart } from "../../store/cart-actions";
import { Order } from "../../util/type-definitions";

import AutocompleteSearch from "./AutocompleteSearch";
import CartModal from "../Cart/CartModal";
import LoginModal from "../Authentication/LoginModal";
import UserModal from "../User/UserModal";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import NextgenLogo from "../../assets/nextgen-logo-white.png";
import WishlistIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const logoStyle = {
  cursor: "pointer",
  transition: "all 0.1s ease",
};
const logoTextStyle = {
  lineHeight: 1.15,
  mt: 0.2,
  display: { xs: "none", sm: "block" },
  color: "#F4F4F6",
};

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

const IconsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 25,
});

const IconWithBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    padding: "0 0",
    display: "flex",
    backgroundColor: "orangered",

    height: 18,
    minWidth: 18,
  },
});

const wishlistIconStyle = {
  color: "#F4F4F6",
  cursor: "pointer",
  "&:hover": {
    color: "red",
  },
};

const AvatarBox = styled(Box)({
  color: "#F4F4F6",
  cursor: "pointer",
  letterSpacing: 0.3,
});
const UserIcon = styled(LoginIcon)({
  cursor: "pointer",
  "&:hover": {
    color: (theme: any) => theme.palette.secondary.main,
  },
});

const cartIconStyle = {
  color: "#F4F4F6",
  cursor: "pointer",
  "&:hover": {
    color: "orangered",
  },
};

function Navbar() {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { wishlist, user: userData } = useSelector((state: RootState) => state);

  const [currentInput, setCurrentInput] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartTotalAmount = cart.reduce(
    (accumulator, product) => accumulator + (product.quantity ?? 0),
    0
  );

  const [showSearchbarMobile, setShowSearchbarMobile] =
    useState<boolean>(false);

  const fetchUserOrders = async () => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const firebaseUsersData = await response.json();

    for (const firebaseUser in firebaseUsersData) {
      const currentUser = firebaseUsersData[firebaseUser];

      if (currentUser.id === userData.id) {
        let userOrders: Order[] = [];

        for (const order in currentUser.orders) {
          userOrders.push({ ...currentUser.orders[`${order}`], id: order });
        }
        setCurrentOrders(userOrders);
      }
    }
  };

  const handleGotoHomepage = (isLink: boolean) => {
    if (!isLink) {
      navigate("/");
    }
    window.scrollTo(0, 0);
    setCurrentInput("");
  };

  useEffect(() => {
    if (userData.loggedIn) {
      appDispatch(fetchCart(userData.id));
    } else {
      appDispatch(fetchCart("loggedOutUser"));
    }
  }, [userData.loggedIn, appDispatch, userData.id]);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Stack direction="row" spacing={2} alignItems="center" sx={logoStyle}>
            <Box
              component="img"
              alt="Nextgen logo"
              src={NextgenLogo}
              sx={{ height: 45, width: 40, mt: 0.5, color: "#F4F4F6" }}
              onClick={() => handleGotoHomepage(false)}
            />
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => handleGotoHomepage(true)}
            >
              <Typography fontSize={22} fontWeight={700} sx={logoTextStyle}>
                Nextgen
                <br />
                Gaming
              </Typography>
            </Link>
          </Stack>
          <Box sx={{ display: { xs: "none", sm: "contents" } }}>
            <AutocompleteSearch
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
            />
          </Box>
          <IconsBox>
            <Box
              onClick={() => setShowSearchbarMobile((prev) => !prev)}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <SearchIcon
                sx={{
                  fontSize: 34,
                  mt: 1,
                  "&:hover": {
                    cursor: "pointer",
                    color: "orangered",
                  },
                }}
              />
            </Box>
            <IconWithBadge
              badgeContent={wishlist.length}
              color="secondary"
              sx={wishlistIconStyle}
            >
              <WishlistIcon onClick={() => navigate("/wishlist")} />
            </IconWithBadge>

            {userData.loggedIn ? (
              <AvatarBox
                display="flex"
                alignItems="center"
                gap={1.2}
                onClick={() => {
                  setUserModalOpen(true);
                  fetchUserOrders();
                }}
              >
                <Avatar src={userData.profilePicture} />
                {userData.firstName}
              </AvatarBox>
            ) : (
              <UserIcon onClick={() => setLoginModalOpen(true)} />
            )}

            <IconWithBadge
              badgeContent={cartTotalAmount}
              color="secondary"
              sx={cartIconStyle}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCartIcon />
            </IconWithBadge>
          </IconsBox>
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
      {showSearchbarMobile && (
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <AutocompleteSearch
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
          />
        </Box>
      )}
    </>
  );
}

export default Navbar;

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
