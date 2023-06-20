import { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import ResultItem from "./ResultItem";

import { Box, Stack, Typography } from "@mui/material";

interface ProductData {
  category: string;
  description: string;
  image: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}
interface Product {
  id: string;
  data: ProductData;
}

function ResultsPage() {
  const products = useSelector((state: RootState) => state.products);
  const { category, currentInput } = useParams();

  const matchingByCategory =
    category === "all"
      ? products
      : products.filter(
          (product) => product.data.category.toLowerCase() === category
        );

  const results = matchingByCategory.filter((product) => {
    const productTitle = product.data.title.toLowerCase();
    return currentInput ? productTitle.includes(currentInput) : [];
  });
  // console.log(results);

  return (
    <Box sx={{ width: "85%" }} margin="30px auto">
      <Typography
        variant="h6"
        mb={3}
      >{`Showing results for "${currentInput}" in ${category}:`}</Typography>
      {results && (
        <Stack direction="column" gap={1.5} justifyContent="center">
          {results.map((product) => (
            <ResultItem productData={product} key={product.id} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default ResultsPage;
