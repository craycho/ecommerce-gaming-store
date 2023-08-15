import { Params, useLoaderData, useParams } from "react-router-dom";
import ResultsMain from "../components/Resultpage/ResultsMain";
import { Product } from "../util/type-definitions";

function CategoryPage() {
  const products = useLoaderData() as Product[];
  const { category } = useParams();
  const results = products.filter((product) => {
    const productCategory = product.data.category.toLowerCase();
    return category ? productCategory.includes(category) : [];
  });

  return <ResultsMain results={results} searchTerm={category} />;
}

export default CategoryPage;

interface LoaderData {
  request: Request;
  params: Params;
}

export async function categoryLoader({ request, params }: LoaderData) {
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
