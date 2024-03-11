import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { DNA } from "react-loader-spinner";

import { postActions } from "../store/slices/postSlice";

import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
// import { userActions } from "../store/slices/userSlice";
import {
    blogTitleAnim,
    childAnim,
    contentAnim,
    iconsAnim,
    postContainer,
} from "./animations";
import { formAction } from "../store/slices/loginFormSlice";

export default function Home() {
    const dispatch = useDispatch();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [titleArr, setTitleArr] = useState([]);
    // const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [noPostsFound, setNoPostsFound] = useState(true);

    const [postFetched, setPostFetched] = useState(false);

    const postData = useSelector((state) => state.postReducer.posts);
    const selPost = useSelector((state) => state.postReducer.selPost);
    // const loggedInUser = useSelector((state) => state.userReducer.userIn);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPosts = await axios.get(
                    `${import.meta.env.VITE_SERVERAPI}/posts`,
                    { withCredentials: true }
                );
                if (allPosts.data.posts.length) {
                    setNoPostsFound(false);
                    dispatch(postActions.setPosts(allPosts.data.posts));
                    let response = "";
                    if (id) {
                        response = await axios.get(
                            `${import.meta.env.VITE_SERVERAPI}/posts/${id}`,
                            { withCredentials: true }
                        );
                        dispatch(postActions.setSelPost(await response.data));
                        setTitleArr(await response.data._doc.title.split(" "));
                    } else {
                        const index = Math.floor(
                            Math.random() * allPosts.data.posts.length
                        );
                        setTitleArr(
                            await allPosts.data.posts[index]._doc.title.split(
                                " "
                            )
                        );
                        dispatch(
                            postActions.setSelPost(allPosts.data.posts[index])
                        );
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchData();
    }, [dispatch, postFetched, id]);

    const test = async () => {
        postFetched ? setPostFetched(false) : setPostFetched(true);
    };

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

    function log() {
        console.log(selPost);
    }

    return (
        <AnimatePresence mode="wait">
            <button onClick={log}>test</button>
            <motion.div>
                <Header loading={loading} />
                <div
                    className="flex mt-10 mx-5 flex-col lg:flex-row"
                    id="restOfTheThings"
                >
                    {loading && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                            <DNA height={500} width={500} />
                        </div>
                    )}
                    {!loading && noPostsFound && (
                        <h1 className="text-xl">No posts Found</h1>
                    )}
                    {!loading && selPost && (
                        <>
                            <motion.div
                                className="bg-zinc-200 p-4 m-2 rounded-md flex-1 h-fit"
                                id="post"
                            >
                                <motion.div
                                    id="titles"
                                    className="flex flex-wrap"
                                    variants={postContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {titleArr.length &&
                                        titleArr.map((titleTxt, index) => (
                                            <motion.h1
                                                className="text-xl font-bold mr-2 overflow-hidden"
                                                key={uuidv4()}
                                                variants={childAnim}
                                                initial="hidden"
                                                animate="visible"
                                                custom={index}
                                            >
                                                {titleTxt}
                                            </motion.h1>
                                        ))}
                                </motion.div>
                                <motion.p
                                    variants={contentAnim}
                                    initial="hidden"
                                    animate="visible"
                                    className="mt-4 text-justify"
                                >
                                    {selPost._doc.content}
                                </motion.p>
                                <motion.div
                                    id="icons"
                                    className="flex justify-start p-2 mt-4"
                                    variants={iconsAnim}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="flex items-center mr-4 justify-center rounded-full ">
                                        <FaHeart
                                            size={30}
                                            className="m-2 text-[#ababab] hover:text-red-500 hover:cursor-pointer"
                                            onClick={likeHandler}
                                        />{" "}
                                        {selPost._doc.likes.length}
                                    </div>
                                    <div className="flex items-center mr-2 justify-center rounded-full">
                                        <FaComment
                                            size={30}
                                            className="m-2 text-[#b4b4b4]"
                                        />{" "}
                                        0
                                    </div>
                                </motion.div>
                                <div className="w-full flex items-center">
                                    <input
                                        type="text"
                                        name="comment"
                                        id="comment"
                                        placeholder="Leave a comment for this post"
                                        className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 flex-1"
                                    />
                                    <button className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black self-center mt-2">
                                        comment
                                    </button>
                                </div>
                            </motion.div>
                            <motion.aside className=" flex-[0.35]">
                                <div id="posts">
                                    <h1 className="text-center mt-10 font-bold lg:mt-0">
                                        ALL POSTS
                                    </h1>
                                    {postData.length > 0 &&
                                        selPost &&
                                        postData.map((posts, index) => {
                                            return (
                                                selPost._doc.title !==
                                                    posts._doc.title && (
                                                    <Link
                                                        to={`/${posts._doc._id}`}
                                                        onClick={test}
                                                        key={uuidv4()}
                                                    >
                                                        <motion.div
                                                            className=" mh-20 font-bold text-lg bg-[#e2e2e2] p-4 my-4 shadow-md shadow-slate-500 rounded-md w-[100%]"
                                                            variants={
                                                                blogTitleAnim
                                                            }
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={index}
                                                            whileHover="hover"
                                                        >
                                                            <h1>
                                                                {
                                                                    posts._doc
                                                                        .title
                                                                }
                                                            </h1>
                                                        </motion.div>
                                                    </Link>
                                                )
                                            );
                                        })}
                                </div>
                            </motion.aside>
                        </>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
