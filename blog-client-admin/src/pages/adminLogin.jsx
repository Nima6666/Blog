import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin({ setUser }) {
    const navigate = useNavigate();
    async function handleLogin(event) {
        event.preventDefault();
        try {
            const postData = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
            };

            const response = await axios.post(
                "http://localhost:3000/admin/login",
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const tokenForLogin = await response.data.token;

            localStorage.setItem("token", tokenForLogin); // Storing token in Local Storage

            // console.log("locallyStored Token: ", localStorage.getItem("token"));
            // const res = await axios.post(
            //     "http://localhost:3000/admin/create",
            //     { admin: await response.data.username },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${await response.data.token}`,
            //         },
            //     }
            // );
            localStorage.setItem("user", await response.data.username);
            navigate("/posts");
        } catch (err) {
            console.error("got error: ", err);
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <form
                method="post"
                id="adminLoginForm"
                className="min-h-60 min-w-120 flex flex-col rounded-lg bg-slate-100 justify-around align-middle p-5 border border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <h2 className="text-lg">Admin Login Form</h2>
                <label htmlFor="username" className="flex flex-col">
                    Username
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="outline-2 outline-double mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                    />
                </label>
                <label htmlFor="password" className="flex flex-col">
                    password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="border-2 border-green-500 mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                    />
                </label>
                <button className="border border-black" onClick={handleLogin}>
                    login
                </button>
            </form>
            <ToastContainer />
        </>
    );
}
