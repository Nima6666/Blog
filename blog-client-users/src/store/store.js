import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./slices/postSlice";
import { userLoggedInSlice } from "./slices/loginSlice";

export const store = configureStore({
    reducer: {
        postReducer: postSlice.reducer,
        userReducer: userLoggedInSlice.reducer,
    },
});

export default store;
