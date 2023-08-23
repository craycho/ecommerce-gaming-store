import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
const categoryStackStyles = { display: { xs: "none", sm: "flex" } };

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

  useEffect(() => {
    navigate(`/category/${category}`);
  }, [category, navigate]);

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
                sx={{ "&:hover": { color: "#d03c06" } }}
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
          <MenuItem value="..">Select category</MenuItem>
          <MenuItem value={"keyboards"}>Keyboards</MenuItem>
          <MenuItem value={"mice"}>Mice</MenuItem>
          <MenuItem value={"headsets"}>Headsets</MenuItem>
          <MenuItem value={"mousepads"}>Mousepads</MenuItem>
          <MenuItem value={"monitors"}>Monitors</MenuItem>
          <MenuItem value={"chairs"}>Gaming chairs</MenuItem>
        </Select>
      </CategoryDropdown>
    </CategoryBox>
  );
}

export default CategoryBar;
