import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = async () => {
  console.log("getting all posts");
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/posts`);

    return response.data;
  } catch {
    return Error;
  }
};

export const getPost = async (id) => {
  console.log("getting clicked post");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVERAPI}/posts/${id}`
    );
    return response.data;
  } catch {
    return Error;
  }
};

export const like = async (id) => {
  console.log("liking post");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVERAPI}/posts/${id}/like`,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
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
