import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
//import ErrorPage from "./errorpage"; 
import Auth from "./components/HandleAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  //  errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Auth initialAuthChoice="login"/>,
  },
  {
    path: "/signin",
    element: <Auth initialAuthChoice="signin"/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
