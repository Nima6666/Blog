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
        dispatch(postActions.setPosts(await response.data));
    }
    useEffect(() => {
        getPosts();
    }, []);

    console.log(postData);

    return (
        <>
            <Header />
            <div id="posts">
                {postData.length > 0 &&
                    postData.map((posts, index) => {
                        return (
                            <div key={index}>
                                <h1>{posts._doc.title}</h1>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
