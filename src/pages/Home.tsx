import { useEffect, useState } from "react";

interface ProductData {
  category: string;
  description: string;
  id: string;
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
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

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

      for (const productId in productData) {
        setProducts((prev) => [
          ...prev,
          { id: productId, data: productData[productId] },
        ]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Home page</h1>
      <ul style={{ display: "flex", flexWrap: "wrap", rowGap: "20px" }}>
        {products.map((product) => {
          console.log(product);
          return (
            <li key={product.id} style={{ display: "block", width: "50%" }}>
              {product.data.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
