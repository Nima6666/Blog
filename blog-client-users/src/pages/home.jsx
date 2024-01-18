import { useEffect, useState } from "react";
import Header from "./components/header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { DNA } from "react-loader-spinner";

import { postActions } from "../store/slices/postSlice";

import { CiHeart } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa";

export default function Home() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [titleArr, setTitleArr] = useState([]);

    const postData = useSelector((state) => state.postReducer.posts);
    const selPost = useSelector((state) => state.postReducer.selPost);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVERAPI}/posts`
                );
                dispatch(postActions.setPosts(response.data));
                const index = Math.floor(Math.random() * response.data.length);
                dispatch(postActions.setSelPost(response.data[index]));
                setTitleArr(response.data[index]._doc.title.split(" "));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    function handleHeartHover() {
        const heart = document.getElementById("Heart");
        heart.setAttribute("style", "background-color: red, color:black");
    }

    function handleHeartHoverOut() {
        const heart = document.getElementById("Heart");
        heart.setAttribute("style", "background-color: none");
    }

    const postContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const childAnim = {
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200,
                delay: custom * 0.15,
            },
            blur: 0,
        }),
        hidden: {
            opacity: 0,
            y: -40,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200,
            },
            blur: 1,
        },
    };

    const contentAnim = {
        visible: {
            opacity: 1,
            blur: 0,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.2,
            },
        },
        hidden: {
            opacity: 0,
            blur: 10,
            x: -100,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.2,
            },
        },
    };

    const blogTitleAnim = {
        hidden: {
            x: 200,
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                type: "spring",
                damping: 19,
                stiffness: 105,
                duration: 0.2,
            },
        },
        visible: (custom) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 19,
                stiffness: 105,
                delay: custom * 0.15,
            },
            filter: "blur(0px)",
        }),
        hover: {
            scale: 1.02,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
        },
    };

    const iconsAnim = {
        visible: {
            opacity: 1,
            filter: "blur(0)",
            y: 0,
            transition: {
                type: "easeInOut",
                duration: 0.2,
            },
        },
        hidden: {
            opacity: 0,
            filter: "blur(20px)",
            y: 50,
            transition: {
                type: "easeInOut",
                duration: 0.2,
            },
        },
    };

    const pageAnim = {
        hide: {
            x: "-100vw",
            opacity: 0,
            transition: "easeInOut",
            duration: 0.5,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: "easeInOut",
            duration: 0.5,
        },
    };

    return (
        <motion.div variants={pageAnim} exit="hide">
            <Header loading={loading} />
            <div className="flex mt-10 mx-5 flex-col lg:flex-row">
                {loading && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                        <DNA height={500} width={500} />
                    </div>
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
                                            key={index}
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
                                    <CiHeart
                                        size={30}
                                        className="m-2 hover:text-red-500"
                                        onMouseEnter={handleHeartHover}
                                        onMouseLeave={handleHeartHoverOut}
                                    />{" "}
                                    0
                                </div>
                                <div className="flex items-center mr-2 justify-center rounded-full">
                                    <FaRegComments size={30} className="m-2" />{" "}
                                    0
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.aside className=" flex-[0.35]">
                            <div id="posts">
                                <h1 className="text-center mt-10 font-bold lg:mt-0">
                                    ALL POSTS
                                </h1>
                                {postData.length > 0 &&
                                    postData.map((posts, index) => {
                                        return (
                                            <motion.div
                                                key={index}
                                                className=" mh-20 font-bold text-lg bg-[#e2e2e2] p-4 my-4 shadow-md shadow-slate-500 rounded-md w-[100%]"
                                                variants={blogTitleAnim}
                                                initial="hidden"
                                                animate="visible"
                                                custom={index}
                                                whileHover="hover"
                                            >
                                                <h1>{posts._doc.title}</h1>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        </motion.aside>
                    </>
                )}
            </div>
        </motion.div>
    );
}
