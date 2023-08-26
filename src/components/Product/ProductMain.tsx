import { useState } from "react";
import MainImage from "./MainImage";
import ImageGrid from "./ImageGrid";
import Info from "./Info";
import { Product } from "../../util/type-definitions";

import { Box, Fade, Grid, Stack, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

function ProductMain({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const productImages = [product.data.image, product.data.imageAlt];

  return (
    <>
      {/* Large screen layout */}
      <Fade in={true} timeout={700}>
        <Box
          sx={{
            display: { sm: "block", xs: "none" },
            margin: "3rem auto",
            width: "85%",
          }}
        >
          <Grid container columnSpacing={8} justifyContent="center">
            <Grid item xs={1.5}>
              <ImageGrid
                images={productImages}
                selectedImage={selectedImage}
                onSelect={setSelectedImage}
              />
            </Grid>
            <Grid item xs={5.5}>
              <MainImage mainImage={productImages[selectedImage]} />
            </Grid>
            <Grid item xs={4.5}>
              <Info product={product} />
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Mobile layout */}
      <Fade in={true} timeout={700}>
        <Box
          sx={{
            display: { sm: "none", xs: "block" },
            margin: "0 auto 4rem auto",
            width: "90%",
          }}
        >
          <Stack direction="column" spacing={2}>
            <MainImage mainImage={productImages[selectedImage]} />
            <ImageGrid
              images={productImages}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
            <Info product={product} />
          </Stack>
          <Box mt={3}>
            <InventoryIcon sx={{ verticalAlign: "-13.5%" }} />
            <Typography
              variant="body1"
              fontWeight={700}
              ml={1}
              display="inline"
            >
              Availability: {Math.floor(Math.random() * 20)} left in stock
            </Typography>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

export default ProductMain;

/* Category breadcrumb 

const CategoryBreadcrumb = styled(Typography)({
  position: "absolute",
  left: 28,
  top: -45,

  "&:hover": {
    "&:last-child": {
      color: "orangered",
    },
  },
});

<Box>
          <CategoryBreadcrumb variant="subtitle2" color="primary">
            Category
            <RightArrowIcon
              fontSize="small"
              sx={{ color: "grey", verticalAlign: "-16%" }}
            />
            Mice
          </CategoryBreadcrumb>
        </Box> */
