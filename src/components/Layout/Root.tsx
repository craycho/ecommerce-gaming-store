import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNav";
import CategoryBar from "./CategoryBar";
import Footer from "./Footer";

function RootLayout() {
  // const navigation = useNavigation();
  // navigation.state moze biti "idle", "loading" i "submitting"
  // idle = nije pokrenut route navigation, loading = ceka da se zavrsi route navigation

  return (
    <>
      <main>
        <MainNavigation />
        <CategoryBar />
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default RootLayout;
