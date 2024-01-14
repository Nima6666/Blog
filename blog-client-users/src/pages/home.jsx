import { useEffect } from "react";
import Header from "./components/header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { postActions } from "../store/slices/postSlice";

export default function Home() {
    const dispatch = useDispatch();

    const postData = useSelector((state) => state.postReducer.posts);

    async function getPosts() {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVERAPI}/posts`
        );

        console.log(response.data);
        dispatch(postActions.setPosts(response.data));
    }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Header />
            <div id="posts">
                {postData.length && postData.map((post) => {})}
            </div>
        </>
    );
}
