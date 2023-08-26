import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  FormControl,
  Select,
  Stack,
  Typography,
  styled,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

const CategoryBox = styled(Box)({
  width: "100%",
  height: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#343434",
  color: "whitesmoke",
});
const categoryStackStyles = {
  display: { xs: "none", sm: "flex" },
  alignItems: "center",
};

const CategoryDropdown = styled(FormControl)({
  minWidth: 80,
  marginRight: 0.5,
});
const selectStyles = {
  color: "#F4F4F6",

  ".MuiSelect-select": {
    fontSize: 16,
  },
  "& .MuiSvgIcon-root": {
    color: "#F4F4F6",
  },
};

function CategoryBar() {
  const categories = [
    "Keyboards",
    "Mice",
    "Headsets",
    "Mousepads",
    "Monitors",
    "Gaming Chairs",
  ];

  const [category, setCategory] = useState<string>("..");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Resetuje dropdown ako trenutni URL nije neki od categorya
    if (!location.pathname.includes("category")) {
      setCategory("..");
    }
  }, [location]);

  return (
    <CategoryBox>
      <Stack
        direction="row"
        spacing={window.innerWidth < 900 ? 4 : 8}
        sx={categoryStackStyles}
      >
        {categories.map((category) => {
          const categoryUrl =
            category.split(" ").length > 1
              ? category.split(" ")[1].toLowerCase()
              : category.toLowerCase();

          return (
            <Link
              key={category}
              to={`/category/${categoryUrl}`}
              style={{
                textDecoration: "none",
                color: "#F4F4F6",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                fontSize={15}
                letterSpacing={0.7}
                sx={{
                  "&:hover": { color: "#cecece" },
                }}
              >
                {category}
              </Typography>
            </Link>
          );
        })}
      </Stack>
      <CategoryDropdown
        variant="standard"
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Select
          id="select-category"
          value={category}
          onChange={(event: SelectChangeEvent) => {
            setCategory(event.target.value);
          }}
          autoWidth
          disableUnderline
          sx={selectStyles}
        >
          <MenuItem value=".." onClick={() => navigate("/")}>
            Select category
          </MenuItem>
          <MenuItem
            value={"keyboards"}
            onClick={() => navigate("/category/keyboards")}
          >
            Keyboards
          </MenuItem>
          <MenuItem value={"mice"} onClick={() => navigate("/category/mice")}>
            Mice
          </MenuItem>
          <MenuItem
            value={"headsets"}
            onClick={() => navigate("/category/headsets")}
          >
            Headsets
          </MenuItem>
          <MenuItem
            value={"mousepads"}
            onClick={() => navigate("/category/mousepads")}
          >
            Mousepads
          </MenuItem>
          <MenuItem
            value={"monitors"}
            onClick={() => navigate("/category/monitors")}
          >
            Monitors
          </MenuItem>
          <MenuItem
            value={"chairs"}
            onClick={() => navigate("/category/chairs")}
          >
            Gaming chairs
          </MenuItem>
        </Select>
      </CategoryDropdown>
    </CategoryBox>
  );
}

export default CategoryBar;
