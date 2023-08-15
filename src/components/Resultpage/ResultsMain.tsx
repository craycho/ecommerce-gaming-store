import { useEffect, useState } from "react";
import { Product } from "../../util/type-definitions";
import ProductCard from "../Homepage/ProductCard";

import { Box, Fade, Grid, Pagination, Typography } from "@mui/material";

function ResultsMain({
  results,
  searchTerm,
}: {
  results: Product[];
  searchTerm: string | undefined;
}) {
  const [page, setPage] = useState<number>(1);
  const resultsStart = (page - 1) * 16 + 1;
  const resultsEnd = page * 16 > results.length ? results.length : page * 16;
  const [currentProducts, setCurrentProducts] = useState<Product[]>(
    results.slice(0, 16)
  );

  useEffect(() => {
    // Resetuje trenutno displayane produkte svaki novi search
    window.scrollTo(0, 0);
    setCurrentProducts(results.slice(0, 16));
  }, [searchTerm]);

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
            <Typography variant="body1" mb={3} textAlign="end">
              Showing {resultsStart}-{resultsEnd} of {results.length} results:
            </Typography>
          ) : (
            <Typography variant="body1" mb={3} textAlign="end">
              Showing all {results.length} results:
            </Typography>
          )}
          <Fade in={true} timeout={700}>
            {currentProducts && (
              <Grid container spacing={2} mb={4.5}>
                {currentProducts.map((product) => (
                  <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Fade>
          <Box
            sx={{ width: "85%", display: "flex", justifyContent: "center" }}
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
        <Box sx={{ width: "95%", height: "60vh" }}>
          <Typography variant="h6" mb={4}>
            No results found for: "{searchTerm}"
          </Typography>
          <Typography variant="body1" width={500} display="inline">
            Unfortunately, no products were found matching your search criteria.
          </Typography>
          <Typography variant="body1" width={500} mt={2}>
            Try changing your search terms and search again.
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
