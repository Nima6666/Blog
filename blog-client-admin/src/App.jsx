import AdminLogin from "./pages/adminLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Post from "./pages/post";
import ErrorPage from "./pages/Error";
import { Provider } from "react-redux";
import store from "./store/stateManager";

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
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
