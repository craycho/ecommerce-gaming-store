import { useState } from "react";
import MainImage from "./MainImage";
import ImageGrid from "./ImageGrid";
import Info from "./Info";

import { Box, Fade, Grid, Stack } from "@mui/material";

interface ProductData {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
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

function ProductMain({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const productImages = [product.data.image, product.data.imageAlt];

  return (
    <Fade in={true} timeout={700}>
      <Box sx={{ margin: "4rem auto", width: "80%" }}>
        <Grid
          container
          columnSpacing={5}
          sx={{
            ".MuiGrid-root": {
              "&:first-of-type": {
                pl: 0,
              },
            },
          }}
        >
          <Grid item xs={1.5}>
            <ImageGrid
              images={productImages}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
          </Grid>
          <Grid item xs={6}>
            <MainImage mainImage={productImages[selectedImage]} />
          </Grid>
          <Grid item xs={4.5}>
            <Info product={product} />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}

export default ProductMain;
