import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";
import ProductMain from "./components/Product/ProductMain";
import { productLoader } from "./components/Product/ProductMain";
import ResultsPage from "./components/Resultpage/ResultsPage";
// import { resultsLoader } from "./components/Resultpage/ResultsPage";

/**@todo Ne radi submit sa enter ili dugmetom, bez obzira je li autocompleted ili ne. */

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
        element: <ProductMain />,
        loader: productLoader,
      },
      {
        path: "/search/:category/:currentInput",
        element: <ResultsPage />,
        // loader: resultsLoader,
      },
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
