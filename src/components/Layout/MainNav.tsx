import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import CartModal from "../Cart/CartModal";
import LoginModal from "../Authentication/LoginModal";

// npm install -D @types/autosuggest-highlight
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  AppBar,
  Autocomplete,
  Badge,
  Box,
  styled,
  TextField,
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

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "30px",
  width: "35%",
  height: 40,

  display: "none",
  justifyContent: "space-evenly",

  [theme.breakpoints.up("sm")]: {
    display: "flex",
    alignItems: "center",
  },
}));

const SearchButton = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "orangered",
  color: "white",
  width: 60,
  height: 40,
  border: "none",
  borderRadius: "0 30px 30px 0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#df3c00",
  },
});

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
}

function MainNavigation() {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.allProducts);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData);

  const inputOptions = products.map((product) => product.data.title);
  const [currentInput, setCurrentInput] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartTotalAmount = cart.reduce(
    (accumulator, product) => accumulator + (product.quantity ?? 0),
    0
  );

  // Clears input on back button
  window.addEventListener("popstate", () => {
    setCurrentInput("");
  });

  const inputChangeHandler = (event: any, newValue: string | null) => {
    event.preventDefault();
    event.target.blur();

    // Necessary check. Auto change event occurs on input clear (newValue = null) and causes error.
    if (newValue) {
      setCurrentInput(newValue);

      const foundProduct = products.find(
        (product) =>
          product.data.title.toLowerCase() === newValue?.toLowerCase()
      );

      if (foundProduct) {
        const productUrl = `${foundProduct.data.category.toLowerCase()}/${foundProduct.data.title
          .toLowerCase()
          .replaceAll(" ", "-")}`;

        navigate(productUrl);
      } else {
        const searchUrl = `/search/${newValue
          ?.toString()
          .replaceAll(" ", "-")}`;

        navigate(searchUrl);
      }
    } else {
      setCurrentInput(null);
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
        <Search>
          <Autocomplete
            id="products-search"
            freeSolo
            // autoHighlight
            openOnFocus={true} // Ne radi radi onInputChange
            value={currentInput}
            onChange={inputChangeHandler}
            onInputChange={(event, value) => {
              setCurrentInput(value);
            }}
            options={inputOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      inputChangeHandler(e, currentInput);
                      // Potrebno manually handleati, onInputChange disablea Enter
                    }
                  },
                }}
                placeholder="Search for products..."
                // sx={{
                //   ".MuiInputBase-input": { fontSize: 15 },
                // }}
              />
            )}
            filterOptions={(options, state): string[] => {
              let suggestions: string[] = [];

              if (state.inputValue.length > 0) {
                suggestions = options.filter((productTitle) =>
                  productTitle
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                );
                return suggestions;
              }
              // If suggestion array is empty returns and displays nothing
              return [];
            }}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option, inputValue, {
                insideWords: true,
              });
              const parts = parse(option, matches);

              return (
                <li {...props} key={option}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
            }}
            sx={{
              height: 45,
              paddingRight: 0.7,
              paddingLeft: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              // Vertical text align was bad because default <input>'s height is different than parent
              "	.MuiAutocomplete-input": {
                height: "100%",
              },
            }}
          />
          <SearchButton
            onClick={(event) => {
              inputChangeHandler(event, currentInput);
            }}
          >
            <SearchIcon fontSize="large" />
          </SearchButton>
        </Search>
        <Icons>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <SearchIcon fontSize="large" />
          </Box>
          {/* <WishlistBadge
            badgeContent={wishlist.length}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "orangered",
              },
            }}
          >
            <FavoriteIcon onClick={() => navigate("/wishlist")} />
          </WishlistBadge> */}
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
          <LoginIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: (theme: any) => theme.palette.secondary.main,
              },
            }}
            onClick={() => setLoginModalOpen(true)}
          />
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
