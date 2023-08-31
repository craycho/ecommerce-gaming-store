import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1a1a",
      light: "#F4F4F6",
    },
    secondary: {
      main: "#ff4500",
    },
    info: {
      main: "#59A96A",
    },
  },
});

theme.typography.h3 = {
  fontSize: "1.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.0rem",
  },
};

theme.typography.h4 = {
  fontSize: "2rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
};
