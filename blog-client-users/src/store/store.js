import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./slices/postSlice";
import { userSlice } from "./slices/userSlice";
import { loginFormSlice } from "./slices/loginFormSlice";

export const store = configureStore({
    reducer: {
        postReducer: postSlice.reducer,
        userReducer: userSlice.reducer,
        loginFormReducer: loginFormSlice.reducer,
    },
});

export default store;
