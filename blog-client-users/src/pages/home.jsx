import { useEffect, useState } from "react";
import Header from "./components/header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { getPosts, postActions } from "../store/slices/postSlice";

import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
// import { userActions } from "../store/slices/userSlice";
import { formAction } from "../store/slices/loginFormSlice";
import Content from "./components/mainThing";

export default function Home() {
  const dispatch = useDispatch();

  const [titleArr, setTitleArr] = useState([]);
  // const [userLoggedIn, setUserLoggedIn] = useState(null);

  const [postFetched, setPostFetched] = useState(false);

  const postData = useSelector((state) => state.postReducer.posts);
  const selPost = useSelector((state) => state.postReducer.selPost);
  // const loggedInUser = useSelector((state) => state.userReducer.userIn);

  async function setPostRe() {
    const idToRefetch = selPost._doc._id;

    const response = await axios.get(
      `${import.meta.env.VITE_SERVERAPI}/posts/${idToRefetch}`,
      { withCredentials: true }
    );
    dispatch(postActions.setSelPost(await response.data));
    setTitleArr(await response.data._doc.title.split(" "));
  }

  async function likeHandler() {
    console.log(selPost.url);
    const response = axios.post(
      `${import.meta.env.VITE_SERVERAPI}/posts/${selPost.url}/like`,
      {
        postId: selPost.url,
      },
      {
        withCredentials: true,
      }
    );
    response.then((data) => {
      setPostRe();
      console.log(data.data);
      if (data.data.message === "user is not authenticated") {
        dispatch(formAction.setForm());
      }
    });

    console.log(selPost);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div>
        <Header />
        <Content />
      </motion.div>
    </AnimatePresence>
  );
}
