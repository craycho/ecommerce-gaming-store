import {
  Params,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ResultsMain from "../components/Resultpage/ResultsMain";
import { Product } from "../util/type-definitions";

function ResultsPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("q"));
  const currentInput = searchParams.get("q");

  const products = useLoaderData() as Product[];
  // const { currentInput } = useParams();
  const searchTerm = currentInput?.replaceAll("-", " ").toLowerCase() || "";

  const results = products.filter((product) => {
    const productTitle = product.data.title.toLowerCase();
    return searchTerm ? productTitle.includes(searchTerm) : [];
  });

  return <ResultsMain results={results} searchTerm={searchTerm} />;
}

export default ResultsPage;

interface LoaderData {
  request: Request;
  params: Params;
}

export async function resultsLoader({ request, params }: LoaderData) {
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
