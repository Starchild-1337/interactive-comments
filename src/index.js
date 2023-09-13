import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import ErrorPage from "./pages/404";
import { AppProvider } from "./context";

const router = createHashRouter([
  {
    errorElement: <ErrorPage />, // <-- root error component
    children: [
      {
        path: "/",
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
