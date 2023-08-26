import { useLoaderData, useSearchParams } from "react-router-dom";
import ResultsMain from "../components/Resultspage/ResultsMain";
import { Product } from "../util/type-definitions";

function ResultsPage() {
  const [searchParams] = useSearchParams();
  const currentInput = searchParams.get("q");
  const searchTerm = currentInput?.replaceAll("-", " ").toLowerCase() || "";

  const products = useLoaderData() as Product[];
  const results = products.filter((product) => {
    const productTitle = product.data.title.toLowerCase();
    return searchTerm ? productTitle.includes(searchTerm) : [];
  });

  return <ResultsMain results={results} searchTerm={searchTerm} />;
}

export default ResultsPage;

export async function resultsLoader() {
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
