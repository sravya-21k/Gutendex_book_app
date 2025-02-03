import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";

import HomeView from "./views/HomeView";
import CategoryView from "./views/CategoryView";
import BookDetailsView from "./views/BookDetailsView";
import FavoritesView from "./views/FavoritesView";
import ErrorView from "./views/ErrorView";
import BookListView from "./views/BookListView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/books", element: <BookListView /> },
      { path: "/category/:category", element: <CategoryView /> },
      { path: "/book/:bookId", element: <BookDetailsView /> },
      { path: "/favorites", element: <FavoritesView /> },
      { path: "*", element: <ErrorView /> },
      // { path: "/error", element: <ErrorView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
