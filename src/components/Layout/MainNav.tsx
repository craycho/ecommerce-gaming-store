import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

// npm install -D @types/autosuggest-highlight
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  AppBar,
  Autocomplete,
  Badge,
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "3%",
  height: "100px",

  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
    margin: "auto 15px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "30px",
  width: "40%",
  height: 45,

  display: "none",
  justifyContent: "space-evenly",

  [theme.breakpoints.up("sm")]: {
    display: "flex",
    alignItems: "center",
  },
}));

const SearchButton = styled(Search)({
  backgroundColor: "orangered",
  width: 60,
  borderRadius: "0 30px 30px 0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#df3c00",
  },
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 25,
}));

interface ProductData {
  category: string;
  description: string;
  image: string;
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

function AutocompleteNav({ category }: { category: string }) {
  const products = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  /* const handleSubmit = (
    event: React.FormEvent,
    value: string | Product | null
  ) => {
    event.preventDefault();
    console.log(value);
    navigate(
      `/search/${category.toLowerCase().replaceAll(" ", "-")}/${value
        ?.toString()
        .replaceAll(" ", "-")}`
    );
  }; */

  return (
    <Autocomplete
      id="products-search"
      // onChange={handleSubmit}
      freeSolo
      // autoHighlight
      options={products.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          InputProps={{ ...params.InputProps, disableUnderline: true }}
          placeholder="Search for products..."
          // sx={{
          //   ".MuiInputBase-input": { fontSize: 15 },
          // }}
        />
      )}
      filterOptions={(options, state): Product[] => {
        let suggestions: Product[] = [];

        if (state.inputValue.length > 0) {
          suggestions = options.filter((product) =>
            product.data.title
              .toLowerCase()
              .includes(state.inputValue.toLowerCase())
          );
          return suggestions;
        }
        // If suggestion array is empty returns an empty array and displays nothing
        return [];
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.data.title, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.data.title, matches);
        const urlString = `${option.data.category.toLowerCase()}/${option.data.title
          .toLowerCase()
          .replaceAll(" ", "-")}`;

        return (
          <Link
            to={urlString}
            style={{ textDecoration: "none", color: "#1a1a1a" }}
          >
            <li {...props}>
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
          </Link>
        );
      }}
      // "If used in free solo mode, it must accept both the type of the options and a string."
      getOptionLabel={(option: Product | string): string => {
        if (typeof option === "string") return "";
        else {
          return option?.data.title;
        }
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
  );
}

function MainNavigation() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [category, setCategory] = useState<string>("All categories");
  /* const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }; */

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(event.currentTarget);
  //   //["products-search"].value
  //   // navigate(`/results/${event.current}`)
  // };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
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
          {/* <form 
          // onSubmit={handleSubmit}
          style={{ width: "100%" }}
          id="mainSearch"
           > */}
          <AutocompleteNav category={category} />
          {/* </form> */}
          <FormControl
            variant="standard"
            sx={{ minWidth: 80, marginRight: 0.5 }}
          >
            <Select
              id="select-category"
              value={category}
              onChange={handleCategory}
              autoWidth
              disableUnderline
              sx={{
                ".MuiSelect-select": {
                  fontSize: 15,
                },
              }}
            >
              <MenuItem value="All categories">All categories</MenuItem>
              <MenuItem value={"Keyboards"}>Keyboards</MenuItem>
              <MenuItem value={"Mice"}>Mice</MenuItem>
              <MenuItem value={"Headsets"}>Headsets</MenuItem>
              <MenuItem value={"Mousepads"}>Mousepads</MenuItem>
              <MenuItem value={"Monitors"}>Monitors</MenuItem>
              <MenuItem value={"Gaming chairs"}>Gaming chairs</MenuItem>
            </Select>
          </FormControl>
          <SearchButton>
            <SearchIcon fontSize="large" />
          </SearchButton>
        </Search>
        <Icons>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <SearchIcon fontSize="large" />
          </Box>
          <Badge
            badgeContent={0}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "orangered",
              },
            }}
          >
            <FavoriteIcon />
          </Badge>
          <PersonIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
          />
          <Badge
            badgeContent={1}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
}

export default MainNavigation;

// Autocomplete workaround ali backspace ne radi:
// onMouseDownCapture={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}

/*  
const handleClose = () => {
    setAnchorEl(null);
  };

<Menu
        id="positioned-menu"
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
          handleClose();
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      */

/*  <Box
            sx={{
              width: "30%",
              padding: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl variant="standard" fullWidth size="small">
              <Select
                id="select-category"
                value={category}
                onChange={handleCategory}
                disableUnderline
                displayEmpty
                renderValue={(value: string) => category}
                sx={{ fontSize: 15 }}
              >
                <MenuItem value="All categories">
                  <em>All categories</em>
                </MenuItem>
                <MenuItem value={"Keyboards"}>Keyboards</MenuItem>
                <MenuItem value={"Mice"}>Mice</MenuItem>
                <MenuItem value={"Headsets"}>Headsets</MenuItem>
                <MenuItem value={"Mousepads"}>Mousepads</MenuItem>
                <MenuItem value={"Monitors"}>Monitors</MenuItem>
                <MenuItem value={"Gaming chairs"}>Gaming chairs</MenuItem>
              </Select>
            </FormControl>
          </Box> */
