import { useState } from "react";
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

function AutocompleteNav() {
  const products = useSelector((state: RootState) => state.products);
  const productNames = products.map((product) => product.data.title);

  return (
    <Autocomplete
      id="products-search"
      freeSolo
      autoHighlight
      options={productNames.map((option: string) => option)}
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
      filterOptions={(options, state) => {
        let suggestions: string[] = [];
        if (state.inputValue.length > 0) {
          suggestions = options.filter((productName: string) =>
            productName.toLowerCase().includes(state.inputValue.toLowerCase())
          );
          // console.log(suggestions);
          return suggestions;
        }
        // If suggestion array is empty returns an empty array and displays nothing
        return [];
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue, { insideWords: true });
        const parts = parse(option, matches);

        return (
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

  return (
    <AppBar position="sticky">
      <StyledToolbar>
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
        <SportsEsportsIcon
          fontSize="large"
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <Search>
          <AutocompleteNav />
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
