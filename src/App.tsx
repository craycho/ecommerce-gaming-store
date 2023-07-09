import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { productLoader } from "./pages/Product";
import CategoryPage from "./pages/Category";
import { categoryLoader } from "./pages/Category";
import ResultsPage from "./pages/Results";
import { resultsLoader } from "./pages/Results";
import WishlistPage from "./pages/Wishlist";
import SignupPage from "./pages/Signup";

/**@todo errorElement not rendered when an error is thrown. */
/**@todo Auto scroll to top on page refresh. */
/**@todo openOnFocus doesn't work. */
/**@todo Implement search sa query params. */

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:category/:productId",
        element: <Product />,
        loader: productLoader,
      },
      { path: "/:category", element: <CategoryPage />, loader: categoryLoader },
      {
        path: "/search/:currentInput",
        element: <ResultsPage />,
        loader: resultsLoader,
      },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// U form handlerima je tip "(event: React.FormEvent)"
// U click handlerima moze biti React.MouseEvent (ako se koristi event object)
// Ako se za form submit koristi useRef tip je "const refName = useRef<HTMLInputElement>();"
// const [state, setState] = useState<type>();
// Funkcije su tipa imeFunkc: (argument: type) => returnValueType (void ako ga nema)
