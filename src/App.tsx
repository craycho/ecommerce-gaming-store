import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { productLoader } from "./pages/Product";
import ResultsPage from "./components/Resultpage/ResultsPage";
// import { resultsLoader } from "./components/Resultpage/ResultsPage";

/**@todo Nepotrebno x re-rendera kada se vrati sa product pagea na home page. */
/**@todo Implement input clear on logo click and back button. */
/**@todo openOnFocus doesn't work. */
/**@todo Implement search sa query params. */
/**@todo Scroll bug on "back". Try to scroll to top of page. */

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
        path: "/search/:currentInput",
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
