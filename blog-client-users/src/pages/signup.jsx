import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const pageAnim = {
        hidden: {
            x: "100vw",
            opacity: 0,
            transition: { ease: "easeInOut", duration: 0.5 },
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { ease: "easeInOut", duration: 0.5 },
        },
        exit: {
            x: "100vw", // Exit to the right
            opacity: 0,
            transition: { ease: "easeInOut", duration: 0.5 },
        },
    };

    async function handleSignUp() {
        try {
            const formData = {
                firstname,
                lastname,
                username,
                password,
                confirmPassword,
            };
            console.log(formData);
            // axios.post(`${import.meta.env.VITE_SERVERAPI}/user`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AnimatePresence>
            <motion.form
                method="post"
                variants={pageAnim}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col rounded-lg bg-slate-100 justify-around items-center border shadow-2xl border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <h1>SIGNUP FORM</h1>
                <div className="grid grid-cols-2">
                    <label htmlFor="firstname">
                        Firstname
                        <input
                            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="jon"
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="lastname">
                        Lastname
                        <input
                            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="doe"
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="username">
                        Username
                        <input
                            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter a password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                        <input
                            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
                            type="password"
                            id="confirmPassword"
                            name="comfirmPassword"
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="button" onClick={handleSignUp}>
                    submit
                </button>
            </motion.form>
        </AnimatePresence>
    );
}
