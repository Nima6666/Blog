import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ loading }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {}

    return (
        <form
            method="post"
            id="adminLoginForm"
            className="min-h-60 min-w-120 flex flex-col rounded-lg bg-slate-100 justify-around align-middle p-5 border shadow-2xl border-gray-500  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <h2 className="text-lg self-center mb-2">Login</h2>
            <label htmlFor="username" className="flex flex-col">
                Username
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label htmlFor="password" className="flex flex-col">
                password
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button
                className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black w-[50%] self-center mt-2"
                onClick={handleLogin}
                disabled={loading}
            >
                login
            </button>
            <p className="mt-2">
                Dont have an account{" "}
                <Link to="/signup" className="text-blue-700">
                    signup
                </Link>
            </p>
        </form>
    );
}
