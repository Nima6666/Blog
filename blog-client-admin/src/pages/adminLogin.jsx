import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
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
            console.log(response.data);
            toast("logged in successfully");
            const res = await axios.post(
                "http://localhost:3000/admin/create",
                {userId :await response.data.id},
                {
                    headers: {
                        Authorization: `Bearer ${await response.data.token}`,
                    },
                }
            );
            console.log(res.data);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <form method="post" id="adminLoginForm">
                <h2>Admin Login Form</h2>
                <label htmlFor="username">
                    Username
                    <input type="text" name="username" id="username" />
                </label>
                <label htmlFor="password">
                    password
                    <input type="password" name="password" id="password" />
                </label>
                <button onClick={handleLogin}>login</button>
            </form>
            <ToastContainer />
        </>
    );
}
