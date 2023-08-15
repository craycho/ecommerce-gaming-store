import { useLoaderData, useParams, Params } from "react-router-dom";
import { Product } from "../util/type-definitions";
import ResultsMain from "../components/Resultpage/ResultsMain";

function CategoryPage() {
  const { categoryName } = useParams();
  const products = useLoaderData() as Product[]; // Used instead of useSelector because of first time URL visit
  const results = products.filter((product) => {
    const productCategory = product.data.category.toLowerCase();
    return categoryName ? productCategory.includes(categoryName) : [];
  });

  return <ResultsMain results={results} searchTerm={categoryName} />;
}

export default CategoryPage;

// interface LoaderData {
//   request: Request;
//   params: Params;
// }

export async function categoryLoader({ params }: { params: Params }) {
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
