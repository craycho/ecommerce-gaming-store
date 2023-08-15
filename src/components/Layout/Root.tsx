import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
import Footer from "./Footer";

function RootLayout() {
  return (
    <main>
      <Navbar />
      <CategoryBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default RootLayout;
