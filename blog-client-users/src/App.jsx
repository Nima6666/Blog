import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./pages/signup";

import { AnimatePresence } from "framer-motion";
import Verification from "./pages/verifyKey";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/google/:key",
        element: <Verification />,
    },
]);

function App() {
    return (
        <Provider store={store}>
            <AnimatePresence mode="wait" onExitComplete={() => null}>
                <RouterProvider router={router} />
            </AnimatePresence>
        </Provider>
    );
}

export default App;
