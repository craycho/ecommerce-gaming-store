import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// npm install -D @types/autosuggest-highlight

import { Autocomplete, Box, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled(Box)(({ theme }) => ({
  backgroundColor: "#F4F4F6",
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

const filterSearchOptions = (
  options: string[],
  { inputValue }: { inputValue: string }
) => {
  let suggestions: string[] = [];

  if (inputValue.length > 0) {
    suggestions = options.filter((productTitle) =>
      productTitle.toLowerCase().includes(inputValue.toLowerCase())
    );
    return suggestions;
  }
  // If suggestion array is empty returns and displays nothing
  return [];
};

const renderSearchOptions = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: string,
  { inputValue }: { inputValue: string }
) => {
  const matches = match(option, inputValue, { insideWords: true });
  const parts = parse(option, matches);

  return (
    <li {...props} key={option}>
      <div>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </li>
  );
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
    event.target.blur();

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
    <Search component="form">
      <Autocomplete
        id="products-search"
        freeSolo
        // openOnFocus={true} // ne radi zajedno sa onInputChange
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
        filterOptions={(options, state) => filterSearchOptions(options, state)}
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
  );
}

export default AutocompleteSearch;

// sx={{".MuiInputBase-input": { fontSize: 16 },}} FONT SIZE CHANGE
