import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/products-slice";
import { RootState } from "../store/index";

import ProductStack from "../components/Products/ProductStack";
import HeroProduct from "../components/Products/HeroStack";
import { Box, Stack } from "@mui/material";
import HeroStack from "../components/Products/HeroStack";

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

let isInitial: boolean = true;

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const fetchProducts = async () => {
      const res = await fetch(
        "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      const productData = await res.json();
      // console.log(productData);

      const productsArray = Object.keys(productData).map((productId) => ({
        id: productId,
        data: productData[productId],
      }));
      dispatch(productsActions.initProducts(productsArray));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Box sx={{ width: "90%" }} margin="30px auto">
        <HeroStack products={products} />
      </Box>

      <ProductStack />
    </>
  );
}

export default Home;

/* Storeanje products pomocu useState:

  // const [products, setProducts] = useState<Product[]>([]);

      // for (const productId in productData) {
      //   setProducts((prev) => [
      //     ...prev,
      //     { id: productId, data: productData[productId] },
      //   ]);
      // }
*/
