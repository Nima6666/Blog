import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = async () => {
  console.log("hit");
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/posts`);
    return response.data;
  } catch {
    return Error;
  }
};

export const postSlice = createSlice({
  name: "post",
  initialState: { posts: {}, selPost: [] },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSelPost(state, action) {
      state.selPost = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
