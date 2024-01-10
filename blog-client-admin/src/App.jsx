import AdminLogin from "./pages/adminLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Post from "./pages/post";
import ErrorPage from "./pages/Error";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AdminLogin />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/blogs",
            element: <Blogs />,
        },
        {
            path: "/blogs/:id",
            element: <Post />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
