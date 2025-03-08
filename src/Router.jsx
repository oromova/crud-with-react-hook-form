import { createBrowserRouter } from "react-router-dom";
import Banner from "./Banner";
import Login from "./Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/banner",
    element: <Banner/>
  }
])