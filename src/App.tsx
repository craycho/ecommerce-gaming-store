import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";

// const App = ({ message }: AppProps) => <div>{message}</div>;
/* 
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: () => {};
  action?: () => {};
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
} */

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
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
