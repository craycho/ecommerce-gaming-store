import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import Product, { productLoader } from "./pages/Product";
import CategoryPage, { categoryLoader } from "./pages/Category";
import ResultsPage, { resultsLoader } from "./pages/Results";
import WishlistPage from "./pages/Wishlist";
import SignupPage from "./pages/Signup";
import CheckoutPage from "./pages/Checkout";
import FaqPage from "./pages/Faq";
import TermsConditionsPage from "./pages/TermsConditions";
import CustomerServicePage from "./pages/CustomerService";

/**@todo Search multiple words connected with "-" */
/**@todo Implement search sa query params. */

/**@todo errorElement not rendered when an error is thrown. */
/**@todo Hide navbar and show when scrolling up */
/**@todo Implement mailto feature on email click */
/**@todo openOnFocus doesn't work. */

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
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
        loader: categoryLoader,
      },
      {
        path: "/search/:currentInput",
        element: <ResultsPage />,
        loader: resultsLoader,
      },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/terms-conditions", element: <TermsConditionsPage /> },
      { path: "/customer-service", element: <CustomerServicePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Ako se za form submit koristi useRef tip je "const refName = useRef<HTMLInputElement>();"
// const [state, setState] = useState<type>();
// Funkcije su tipa imeFunkc: (argument: type) => returnValueType (void ako ga nema)

// const navigation = useNavigation();
// navigation.state moze biti "idle", "loading" i "submitting"
// idle = nije pokrenut route navigation, loading = ceka da se zavrsi route navigation
