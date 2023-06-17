import { useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import MainImage from "./MainImage";
import ImageGrid from "./ImageGrid";
import Info from "./Info";

import { Box, Container, Grid, Stack } from "@mui/material";

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

function ProductMain() {
  const productData = useLoaderData() as Product;
  // Type assertion. "Overwriteamo" tip jer znamo bolje koji ce biti od automatskog inferanja. Slicno :ProductData ali poredi subtypes a ne exact types.
  console.log(productData);
  const productImages = [productData.data.image, productData.data.imageAlt];

  const [selectedImage, setSelectedImage] = useState<number>(0);

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
          title={productData.data.title}
          description={productData.data.description}
          price={productData.data.price}
          category={productData.data.category}
        />
      </Stack>
      {/* <Grid
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
      </Grid> */}
    </Box>
  );
}

export default ProductMain;

interface LoaderData {
  request: Request;
  params: Params;
}

interface ParamsData {
  category: string;
  productId: string;
}

export async function productLoader({ request, params }: LoaderData) {
  const { category, productId } = params;
  const productTitle = productId?.replaceAll("-", " ");

  const res = await fetch(
    "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
  );
  const productData = await res.json();

  const products = Object.keys(productData).map((productId) => ({
    id: productId,
    data: productData[productId],
  }));

  // console.log(products);
  // console.log(productTitle);

  // Returns the product where the category and title match the params
  const foundProduct = products.find(
    (product) =>
      product.data.category.toLowerCase().includes(category) &&
      product.data.title.toLowerCase().includes(productTitle)
  );

  return foundProduct;
}

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
