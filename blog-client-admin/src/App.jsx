import AdminLogin from "./pages/adminLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Posts from "./pages/posts";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AdminLogin />,
        },
        {
            path: "/posts",
            element: <Posts />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
