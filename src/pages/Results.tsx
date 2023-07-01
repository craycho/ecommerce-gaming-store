import { Params, useLoaderData, useParams } from "react-router-dom";
import ResultsMain from "../components/Resultpage/ResultsMain";

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

function ResultsPage() {
  const products = useLoaderData() as Product[];
  const { currentInput: searchTerm } = useParams();
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
