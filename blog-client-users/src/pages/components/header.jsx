import { useEffect, useState } from "react";
import Model from "./model/model";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userActions } from "../../store/slices/userSlice";
import gangstaImg from "/gangsta.jpg";

export default function Header({ loading, user }) {
    const [isForm, setIsForm] = useState(false);

    const [toggleLogout, setToggleLogout] = useState(false);

    const dispatch = useDispatch();

    const [imageLoaded, setImageLoaded] = useState(false);

    const usernow = useSelector((state) => state.userReducer.userIn);
    const loggedInUser = usernow;

    useEffect(() => {
        console.log(usernow);
        async function getCurrentUser() {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVERAPI}/session`,
                { withCredentials: true }
            );
            console.log(response.data, "got current user");
            dispatch(userActions.setUser(await response.data));
        }
        getCurrentUser();

        document
            .querySelector("#restOfTheThings")
            .addEventListener("click", () => {
                setToggleLogout(false);
            });
    }, []);

    // console.log("loggedIn usr: ", loggedInUser);

    function handleClose() {
        setIsForm(false);
    }

    const buttonAnim = {
        hidden: {
            opacity: 0,
            y: -50,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 300,
                duration: 0.2,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 300,
                duration: 0.2,
            },
        },
    };

    const headTitleAnim = {
        hidden: {
            y: -100,
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                type: "easeInOut",
                duration: 0.2,
            },
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "easeInOut",
                duration: 0.2,
            },
        },
    };

    function handleImageLoad() {
        var cookies = document.cookie.split(";");
        console.log(cookies, "a cookie");
        console.log("loaded");
        setImageLoaded(true);
    }

    async function logout() {
        var cookies = document.cookie.split(";");
        console.log(cookies, "a cookie");

        const response = await axios.post(
            `${import.meta.env.VITE_SERVERAPI}/logout`,
            null,
            { withCredentials: true }
        );
        window.location.reload();
    }

    return (
        <>
            <header className=" px-16 py-4 bg-[#e8e8e894]  flex justify-between items-center">
                <motion.div
                    className="text-amber-800 text-lg font-extrabold py-2"
                    variants={headTitleAnim}
                    initial="hidden"
                    animate="visible"
                >
                    BLOG <span className="text-[#423bbf]">POST</span>
                </motion.div>
                {!loading && !loggedInUser.name && (
                    <motion.button
                        className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold shadow-md shadow-black "
                        onClick={() =>
                            isForm ? setIsForm(false) : setIsForm(true)
                        }
                        variants={buttonAnim}
                        initial="hidden"
                        animate="visible"
                        disabled={loading}
                    >
                        Be Our Guest
                    </motion.button>
                )}
                {!loading && loggedInUser.name && (
                    <>
                        <motion.div
                            className="flex items-center relative"
                            variants={buttonAnim}
                            initial="hidden"
                            animate="visible"
                            disabled={loading}
                        >
                            <div className="text-lg p-2">
                                {loggedInUser.name.split(" ")[0]}
                            </div>
                            <img
                                src={
                                    loggedInUser.profileImg
                                        ? loggedInUser.profileImg
                                        : gangstaImg
                                }
                                onLoad={handleImageLoad}
                                className="h-10 rounded-full"
                                onClick={() =>
                                    toggleLogout
                                        ? setToggleLogout(false)
                                        : setToggleLogout(true)
                                }
                            />
                            {toggleLogout && (
                                <motion.div
                                    id="logoutBtn"
                                    className="absolute top-[120%] right-[0px] bg-red-600 text-white rounded-md shadow-md shadow-red-700"
                                >
                                    <button onClick={logout} className="p-2">
                                        logout
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </>
                )}
            </header>
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {isForm && (
                    <Model modelOpen={isForm} handleClose={handleClose} />
                )}
            </AnimatePresence>
        </>
    );
}
