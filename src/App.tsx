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
        path: "/search",
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
