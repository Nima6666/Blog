import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PostCreateForm from "./components/postCreateForm";

export default function Blogs() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isUserLoggedIn, setUserLogin] = useState(true);
    const [responseData, setResponseData] = useState([]);
    const [isForm, setIsForm] = useState(false);

    async function getPosts() {
        const response = await axios.get("http://localhost:3000/admin/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                admin: user,
            },
        });
        const responseDataRecieved = response.data;
        localStorage.setItem("data", JSON.stringify(responseDataRecieved));
        setResponseData(responseDataRecieved);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    function togglePostForm() {
        setIsForm(true);
    }

    function handlePostClick(event) {
        const index = event.target.id.split("t")[1];
        const id = responseData[index].url;
        navigate(`/blogs/${id}`);
    }

    useEffect(() => {
        getPosts();

        if (!token) {
            navigate("/");
        }

        if (!user) {
            setUserLogin(false);
        } else {
            setUserLogin(true);
        }

        if (!isUserLoggedIn) {
            navigate("/");
        }
    }, [user, isUserLoggedIn, navigate, isForm]);

    return (
        <>
            {isUserLoggedIn && (
                <>
                    <header className="sticky z-10 top-0 flex align-middle justify-between shadow-md shadow-blue-950 bg-blue-900 bg-opacity-70 backdrop-blur-sm p-4 pr-20 pl-20">
                        <div className="">
                            <h1 className="text-2xl text-white">
                                Welcome Admin{" "}
                                <span className="font-bold">{user}</span>
                            </h1>
                        </div>
                        <div>
                            <button
                                id="logout"
                                className="border border-red-600 rounded-md shadow-md shadow-red-950 p-2 bg-red-400 transition-all hover:shadow-sm hover:shadow-red-950"
                                onClick={handleLogout}
                            >
                                logout
                            </button>
                        </div>
                    </header>
                    {responseData && responseData.length < 1 && (
                        <h1 className="text-2xl text-center p-5">
                            No Posts Available
                        </h1>
                    )}
                    {responseData && responseData.length > 0 && (
                        <div className="m-9 p-5 grid grid-rows-1 gap-4">
                            {responseData.map((data, index) => {
                                return (
                                    <div
                                        id={`post${index}`}
                                        key={index}
                                        className="relative bg-gray-200 rounded-md shadow-lg p-4 h-36 overflow-hidden duration-300 hover:scale-[1.02] hover:cursor-pointer"
                                        onClick={(e) => handlePostClick(e)}
                                    >
                                        <h1 className="text-xl font-semibold mb-2 pointer-events-none">
                                            {data._doc.title}
                                        </h1>
                                        <p className="pointer-events-none">
                                            {data._doc.content}
                                        </p>
                                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-gray-200"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {isForm && <PostCreateForm setIsForm={setIsForm} />}
                    <div className="w-100 flex justify-center">
                        <button
                            id="addPostBtn"
                            className="mt-3 mb-5 border border-green-700 rounded-md shadow-md shadow-green-950 p-2 bg-green-400 transition-all hover:shadow-sm hover:shadow-green-950"
                            onClick={togglePostForm}
                        >
                            Add Post
                        </button>
                    </div>
                </>
            )}
            <ToastContainer position="top-center" />
        </>
    );
}
