import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "LoadingSlice",
  initialState: { loading: true },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
