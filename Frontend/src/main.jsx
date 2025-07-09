import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { IsAuthenticated, IsResume } from "./routes/ProtectedRoute.jsx";
import UpdateResume from "./pages/UpdateResume.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <IsAuthenticated>
            <Dashboard />
          </IsAuthenticated>
        ),
      },
      {
        path: "/update-resume/:resumeId",
        element: (
          <IsResume>
            {" "}
            <UpdateResume />{" "}
          </IsResume>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
