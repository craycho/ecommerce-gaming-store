import { Suspense } from "react";
import {
  Params,
  useLoaderData,
  useParams,
  defer,
  Await,
} from "react-router-dom";
import ResultsMain from "../components/Resultpage/ResultsMain";
import { Product } from "./type-definitions";

import { CircularProgress } from "@mui/material";

// RADI, ALI NE DAJE ZELJENI REZULTAT
function ResultsPage() {
  const { products } = useLoaderData() as { products: Promise<Product[]> };
  const { currentInput: searchTerm } = useParams();

  return (
    <>
      <Suspense fallback={<CircularProgress sx={{ margin: "2% 48%" }} />}>
        <Await resolve={products}>
          {(resolvedProducts: Product[]) => {
            const results = resolvedProducts.filter((product) => {
              const productTitle = product.data.title.toLowerCase();
              return searchTerm ? productTitle.includes(searchTerm) : [];
            });
            return (
              <ResultsMain results={resolvedProducts} searchTerm={searchTerm} />
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default ResultsPage;

interface LoaderData {
  request: Request;
  params: Params;
}

async function fetchProducts() {
  try {
    const res = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    const productData = await res.json();

    const products = Object.keys(productData).map((productId) => ({
      id: productId,
      data: productData[productId],
    }));

    return products;
  } catch (err) {
    console.log(err);
  }
}

export async function resultsLoader({ request, params }: LoaderData) {
  return defer({ products: await fetchProducts() });
}
