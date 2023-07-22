import { useEffect } from "react";
import { Params, useLoaderData } from "react-router-dom";
import ProductMain from "../components/Product/ProductMain";

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
  quantity?: number;
}

function Checkoutpage() {
  // Type assertion. "Overwriteamo" tip jer znamo bolje koji ce biti od automatskog inferanja. Slicno :ProductData ali poredi subtypes a ne exact types.
  const product = useLoaderData() as Product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductMain product={product} />;
}

export default Checkoutpage;

interface LoaderData {
  request: Request;
  params: Params;
}
