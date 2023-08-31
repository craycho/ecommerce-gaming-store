// npm install -D @types/autosuggest-highlight
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export const filterSearchOptions = (
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

export const renderSearchOptions = (
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
