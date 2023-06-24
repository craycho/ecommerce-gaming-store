import { useState } from "react";
import MainImage from "./MainImage";
import ImageGrid from "./ImageGrid";
import Info from "./Info";

import { Box, Stack } from "@mui/material";

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
    <Box sx={{ margin: "4rem auto", width: "80%" }}>
      <Stack columnGap={8} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <ImageGrid
          images={productImages}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />
        <MainImage mainImage={productImages[selectedImage]} />
        <Info
          title={product?.data.title}
          description={product?.data.description}
          price={product?.data.price}
          category={product?.data.category}
        />
      </Stack>
    </Box>
  );
}

export default ProductMain;

/* NEWER GRID

  <Grid
        container
        direction="row"
        columnSpacing={5}
        justifyContent="center"
        sx={{ margin: "0 auto", width: "90%" }}
      >
        <Grid item sm={1} display="flex" justifyContent="center" width="100%">
          <ImageGrid
            images={productImages}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
          />
        </Grid>
        <Grid item sm={6}>
          <MainImage mainImage={productImages[selectedImage]} />
        </Grid>
        <Grid item sm={5}>
          <Info
            title={productData.data.title}
            description={productData.data.description}
            price={productData.data.price}
            category={productData.data.category}
          />
        </Grid>
      </Grid>
*/

/* <Grid
        container
        direction="row"
        spacing={8}
        justifyContent="center"
        sx={{ maxWidth: 1100 }}
      >
        <Grid item sm={1} display="flex" justifyContent="center" width="100%">
          <ImageGrid
            images={productImages}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
          />
        </Grid>
        <Grid item sm={6}>
          <MainImage mainImage={productImages[selectedImage]} />
        </Grid>
        <Grid item sm={5}>
          <Info
            title={productData.data.title}
            description={productData.data.description}
            price={productData.data.price}
            category={productData.data.category}
          />
        </Grid>
      </Grid> */

/*  <Stack columnGap={8} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <ImageGrid
          images={productImages}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />
        <MainImage mainImage={productImages[selectedImage]} />
        <Info
          title={productData.data.title}
          description={productData.data.description}
          price={productData.data.price}
          category={productData.data.category}
        />
      </Stack> */

/* ------------- WITH REDUX -------------
  // Casting radi nepotrebnog "string | undefined" type. Nikad nisu undefined.
  const { category, productId } = useParams() as {
    category: string;
    productId: string;
  };
  const productTitle = productId.replaceAll("-", " ");
  const products = useSelector((state: RootState) => state.products); 
  
  const currentProduct = products.find(
    (product) =>
    product.data.category.toLowerCase().includes(category) &&
    product.data.title.toLowerCase().includes(productTitle)
    );
    
  */

/*  if (!currentProduct) {
   return (
     <Typography variant="h6" mt={5} ml={5}>
     There was an error displaying your product.
     </Typography>
     );
    } */
