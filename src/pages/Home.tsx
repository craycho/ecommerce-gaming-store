import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/products-slice";
import { RootState } from "../store/index";

import ProductCard from "../components/Products/ProductCard";
import randomProductStack from "../util/random-stack";
import ProductStack from "../components/Products/ProductStack";

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
/* 
const fourRandomProducts = (products: Product[]): Product[] => {
  const randomProducts: Product[] = [];

  while (randomProducts.length < 4) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];

    if (randomProducts.includes(randomProduct)) {
      continue;
    }
    randomProducts.push(randomProduct);
  }

  return randomProducts;
}; */

let isInitial: boolean = true;

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  // console.log(randomProduct?.data.title);

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

  useEffect(() => {
    if (products.length > 0) {
      const randomProducts: Product[] = randomProductStack(products);
      setRandomProducts(randomProducts);
    }
  }, [products]);

  console.log(randomProducts);

  return (
    <>
      <h1>Home page</h1>
      {randomProducts && <ProductStack randomProducts={randomProducts} />}
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
