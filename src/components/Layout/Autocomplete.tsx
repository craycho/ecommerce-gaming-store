import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// npm install -D @types/autosuggest-highlight

import { Autocomplete, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
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

interface AutocompleteProps {
  currentInput: string | null;
  setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>;
}

function AutocompleteSearch({
  currentInput,
  setCurrentInput,
}: AutocompleteProps) {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.products);
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
            /*  sx={{
              ".MuiInputBase-input": { fontSize: 16 },
            }} */
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
  );
}

export default AutocompleteSearch;
