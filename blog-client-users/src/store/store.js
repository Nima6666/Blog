import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./slices/postSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        postReducer: postSlice.reducer,
        userReducer: userSlice.reducer,
    },
});

export default store;
