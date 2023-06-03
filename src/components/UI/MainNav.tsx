import { useState } from "react";
// npm install -D @types/autosuggest-highlight
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  AppBar,
  Autocomplete,
  Badge,
  Box,
  Menu,
  MenuItem,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const productNames = [
  "Razer DeathAdder",
  "Corsair K70",
  "Logitech G502",
  "SteelSeries Arctis",
  "HyperX Cloud",
  "Astro A40",
  "BenQ Zowie",
  "Alienware AW3418DW",
  "MSI GTX 1080",
  "ASUS ROG Swift",
];

interface SearchProps {}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
  gap: "3%",
  height: "100px",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: 25,
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function MainNavigation() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            display: { xs: "none", sm: "block" },
            cursor: "pointer",
            "&:hover": {
              color: (theme) => theme.palette.secondary.main,
            },
          }}
        >
          NEXT-GEN
        </Typography>
        <SportsEsportsIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <Autocomplete
            id="products-search"
            freeSolo
            autoHighlight
            onMouseDownCapture={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => e.stopPropagation()}
            options={productNames.map((option: string) => option)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search for products..." />
            )}
            filterOptions={(options, state) => {
              // Hides suggestions when inputbox is empty (cleared w/ backspace)
              if (state.inputValue.length > 0) {
                return options.filter((item: string) =>
                  item.toLowerCase().includes(state.inputValue.toLowerCase())
                );
              }
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
          />
        </Search>
        <Icons>
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
    </AppBar>
  );
}

export default MainNavigation;

/* renderOption={(props, option, state): React.ReactNode => {
  const matches = match(option, state.inputValue, {
    insideWords: true,
  });
  const parts = parse(option, matches);
}} */
