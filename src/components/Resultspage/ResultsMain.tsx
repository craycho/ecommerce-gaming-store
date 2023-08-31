import { useEffect, useState } from "react";
import ProductCard from "../Homepage/ProductCard";
import { Product } from "../../util/type-definitions";
import { getGridItemWidth } from "../../util/grid-item-width";

import { Box, Fade, Grid, Pagination, Typography } from "@mui/material";

interface ResultsProps {
  results: Product[];
  searchTerm: string | undefined;
}

function ResultsMain({ results, searchTerm }: ResultsProps) {
  const [page, setPage] = useState<number>(1);
  const resultsStart = (page - 1) * 16 + 1;
  const resultsEnd = page * 16 > results.length ? results.length : page * 16;
  const [currentProducts, setCurrentProducts] = useState<Product[]>(
    results.slice(0, 16)
  );
  const [gridSize, setGridSize] = useState<number>(
    getGridItemWidth(window.innerWidth)
  );

  const handleResize = () => {
    setGridSize(getGridItemWidth(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Resetuje trenutno displayane produkte svaki novi search
    window.scrollTo(0, 0);
    setCurrentProducts(results.slice(0, 16));
  }, [searchTerm, results]);

  const handlePagination = (event: React.ChangeEvent<any>, value: number) => {
    window.scrollTo(0, 0);
    setPage(value);
    const startIndex = (value - 1) * 16;
    const endIndex = value * 16;
    setCurrentProducts(results.slice(startIndex, endIndex));
  };

  return (
    <Box sx={{ width: "85%" }} margin="30px auto">
      {results.length > 0 ? (
        <>
          <Typography
            variant="h6"
            mb={1}
          >{`Search results: "${searchTerm}"`}</Typography>
          {results.length > 16 ? (
            <Typography variant="body1" textAlign="end" mb={3}>
              Showing {resultsStart}-{resultsEnd} of {results.length} results:
            </Typography>
          ) : (
            <Typography variant="body1" textAlign="end" mb={3}>
              Showing all {results.length} results:
            </Typography>
          )}
          <Fade in={true} timeout={700}>
            {currentProducts && (
              <Grid container spacing={1} mb={4.5} rowGap={3}>
                {currentProducts.map((product) => (
                  <Grid item xs={gridSize} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Fade>
          <Box
            display="flex"
            justifyContent="center"
            width="85%"
            margin="30px auto"
          >
            <Pagination
              count={Math.ceil(results.length / 16)}
              color="primary"
              page={page}
              onChange={handlePagination}
            />
          </Box>
        </>
      ) : (
        <Box width="95%" height="60vh">
          <Typography variant="h6" mb={4}>
            No results found for: "{searchTerm}"
          </Typography>
          <Typography variant="body1" width={500} display="inline">
            Unfortunately, no products were found matching your search criteria.
          </Typography>
          <Typography variant="body1" width={500} mt={2}>
            Consider changing your search terms and try again.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ResultsMain;

/* WORKING CATEGORY FILTER

const matchingByCategory =
    category === "all"
      ? products
      : products.filter(
          (product) => product.data.category.toLowerCase() === category
        );
*/
