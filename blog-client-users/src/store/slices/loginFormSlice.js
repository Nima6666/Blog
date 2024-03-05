import { createSlice } from "@reduxjs/toolkit";

export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState: { isForm: false },
    reducers: {
        setForm: (state) => {
            state.isForm = !state.isForm;
        },
    },
});

export const formAction = loginFormSlice.actions;
