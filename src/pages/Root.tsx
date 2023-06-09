import { Outlet } from "react-router-dom";
import MainNavigation from "../components/UI/MainNav";

function RootLayout() {
  // const navigation = useNavigation();
  // navigation.state moze biti "idle", "loading" i "submitting"
  // idle = nije pokrenut route navigation, loading = ceka da se zavrsi route navigation

  return (
    <>
      <main>
        <MainNavigation />
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
