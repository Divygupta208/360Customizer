import { Outlet } from "react-router";
import Header from "../LayoutComponent/Header";
import Footer from "../LayoutComponent/Footer";

const MainLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="mt-20 md:mt-0">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
