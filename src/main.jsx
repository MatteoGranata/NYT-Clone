import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store.js";

import App from "./App.jsx";
import SectionPage from "./pages/SectionPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/section/:sectionID",
    element: <SectionPage />,
  },
  {
    path: "/search/:searchID",
    element: <SearchPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
