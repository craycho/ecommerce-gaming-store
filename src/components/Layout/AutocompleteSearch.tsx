import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import {
  renderSearchOptions,
  filterSearchOptions,
} from "../../util/autocomplete-options";

import { Autocomplete, Box, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled(Box)(({ theme }) => ({
  backgroundColor: "#F4F4F6",
  borderRadius: "30px",
  width: "35%",
  height: 40,
  justifyContent: "space-evenly",
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "5px 10px",
  },
}));

const SearchButton = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "orangered",
  color: "#F4F4F6",
  width: 60,
  height: 40,
  border: "none",
  borderRadius: "0 30px 30px 0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#df3c00",
  },
});

const autocompleteStyle = {
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
};

interface AutocompleteProps {
  currentInput: string | null;
  setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>;
}

function AutocompleteSearch({
  currentInput,
  setCurrentInput,
}: AutocompleteProps) {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products);
  const inputOptions = products.map((product) => product.data.title);

  window.addEventListener("popstate", () => {
    setCurrentInput("");
  });

  const inputChangeHandler = (event: any, newValue: string | null) => {
    event.preventDefault();
    event.target.blur(); // Hides suggestions on submit

    // Necessary check. Auto change event occurs on input clear (newValue = null) and causes error.
    if (newValue) {
      setCurrentInput(newValue);

      const existingProduct = products.find(
        (product) =>
          product.data.title.toLowerCase() === newValue?.toLowerCase()
      );

      if (existingProduct) {
        const productUrl = `${existingProduct.data.category.toLowerCase()}/${existingProduct.data.title
          .toLowerCase()
          .replaceAll(" ", "-")}`;

        navigate(productUrl);
      } else {
        // Route parameters umjesto query parameters
        // const searchUrl = `/search/${newValue?.toString().replaceAll(" ", "-")}`;
        // navigate("/search");

        navigate({
          pathname: "/search",
          search: `?q=${newValue?.toString().replaceAll(" ", "-")}`,
        });
      }
    } else {
      setCurrentInput(null);
    }
  };

  return (
    <>
      <Search component="form">
        <Autocomplete
          id="products-search"
          freeSolo
          // openOnFocus={true} // ne radi zajedno sa onInputChange, cak ni kada je component controlled
          value={currentInput}
          options={inputOptions}
          sx={autocompleteStyle}
          onChange={inputChangeHandler}
          onInputChange={(event, value) => {
            // Sluzi za input clear na klik logo-a i rad search dugmeta
            setCurrentInput(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Search for products..."
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                // Potrebno manually handleati, onInputChange disablea Enter
                onKeyDown: (e) => {
                  e.key === "Enter" && inputChangeHandler(e, currentInput);
                },
              }}
            />
          )}
          filterOptions={(options, state) =>
            filterSearchOptions(options, state)
          }
          renderOption={(props, option, state) =>
            renderSearchOptions(props, option, state)
          }
        />
        <SearchButton
          onClick={(event) => {
            inputChangeHandler(event, currentInput);
          }}
        >
          <SearchIcon fontSize="large" />
        </SearchButton>
      </Search>
    </>
  );
}

export default AutocompleteSearch;

// sx={{".MuiInputBase-input": { fontSize: 16 },}} FONT SIZE CHANGE
// display: { xs: showSearchbarMobile ? "flex" : "none", sm: "flex" },
