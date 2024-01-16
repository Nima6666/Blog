import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./pages/signup";

import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/signup",
        element: <Signup />,
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
