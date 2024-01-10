import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PostCreateForm from "./components/postCreateForm";

export default function Posts() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isUserLoggedIn, setUserLogin] = useState(true);
    const [responseData, setResponseData] = useState([]);
    const [isForm, setIsForm] = useState(false);

    console.log(responseData);

    // Use a ref to track whether the toast has been shown
    const toastShown = useRef(false);

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
        setResponseData(responseDataRecieved);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    function togglePostForm() {
        setIsForm(true);
    }

    useEffect(() => {
        getPosts();

        if (!user) {
            setUserLogin(false);
        } else {
            setUserLogin(true);

            if (!toastShown.current) {
                toast("Login Successful");
                toastShown.current = true;
            }
        }

        if (!isUserLoggedIn) {
            navigate("/");
        }
    }, [user, isUserLoggedIn, navigate, isForm]);

    return (
        <>
            {isUserLoggedIn && (
                <>
                    <header className="sticky top-0 flex align-middle justify-between bg-blue-500 p-4 pr-20 pl-20">
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
                    {/* {responseData &&
                        responseData.length > 0 &&
                        responseData.map((data) => {
                            console.log(data._doc);
                        })} */}
                    {isForm && <PostCreateForm setIsForm={setIsForm} />}
                    <div className="w-100 flex justify-center">
                        <button
                            id="addPostBtn"
                            className="mt-3 border border-green-700 rounded-md shadow-md shadow-green-950 p-2 bg-green-400 transition-all hover:shadow-sm hover:shadow-green-950"
                            onClick={togglePostForm}
                        >
                            Add Post
                        </button>
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    );
}
