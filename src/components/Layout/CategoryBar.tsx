import { Link } from "react-router-dom";
import { Box, Stack, Typography, styled } from "@mui/material";

const CategoryBox = styled(Box)({
  width: "100%",
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#393d44",
  color: "whitesmoke",
});

function CategoryBar() {
  const categories = [
    "Keyboards",
    "Mice",
    "Headsets",
    "Mousepads",
    "Monitors",
    "Gaming Chairs",
  ];

  return (
    <CategoryBox>
      <Stack direction="row" spacing={8}>
        {categories.map((category) => {
          const categoryUrl =
            category.split(" ").length > 1
              ? category.split(" ")[1].toLowerCase()
              : category.toLowerCase();

          return (
            <Link
              key={category}
              to={`/${categoryUrl}`}
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {category}
              </Typography>
            </Link>
          );
        })}
      </Stack>
    </CategoryBox>
  );
}

export default CategoryBar;
