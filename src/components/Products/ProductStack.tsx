import ProductCard from "./ProductCard";

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

interface StackProps {
  randomProducts: Product[];
}

function ProductStack({ randomProducts }: StackProps) {
  return (
    <Box sx={{ width: "95%", margin: "0 auto" }}>
      <Typography variant="h6" mb={2}>
        You might be interested in:
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {randomProducts.map((product) => (
          <ProductCard
            id={product.id}
            title={product.data.title}
            category={product.data.category}
            description={product.data.description}
            price={product.data.price}
            onSale={product.data.onSale}
            img={product.data.image}
            key={product.id}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default ProductStack;
