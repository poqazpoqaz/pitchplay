import Footer from "../../containers/footer/Footer";
import Header from "../../containers/header/Header";
import styles from "./Main.module.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "../../containers/Login/Login"
import Register from "../../containers/Register/Register"
import MainSection from "../../components/MainSection/MainSection";

const router = createBrowserRouter([
    {path:"/", element:<MainSection gridArea={"section"}/>},
    {path: "/login", element:<Login gridArea={"section"}/>},
    {path: "/register", element:<Register gridArea={"section"}/>}
]);

function Main() {
  return (
    <div className={styles['main-grid']}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default Main;