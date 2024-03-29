import { useEffect } from "react";
import { Params, useLoaderData } from "react-router-dom";
import ProductMain from "../components/Product/ProductMain";
import { Product } from "../util/type-definitions";

function ProductPage() {
  // Type assertion. "Overwriteamo" tip jer znamo bolje koji ce biti od automatskog inferanja. Slicno :ProductData ali poredi subtypes a ne exact types.
  const product = useLoaderData() as Product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductMain product={product} />;
}

export default ProductPage;

interface LoaderData {
  request: Request;
  params: Params;
}

export async function productLoader({ request, params }: LoaderData) {
  const { category, productId } = params;
  const productTitle = productId?.replaceAll("-", " ");
  try {
    const res = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    const productData = await res.json();

    const products = Object.keys(productData).map((productId) => ({
      id: productId,
      data: productData[productId],
    }));

    // Returns the product in which the category and title match the params
    const currentProduct = products.find(
      (product) =>
        product.data.category.toLowerCase().includes(category) &&
        product.data.title.toLowerCase().includes(productTitle)
    );

    return currentProduct;
  } catch (err) {
    console.log(err);
  }
}
