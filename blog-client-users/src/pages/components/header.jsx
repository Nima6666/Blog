import { useState } from "react";
import Model from "./model/model";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Header({ loading }) {
    const [isForm, setIsForm] = useState(false);

    const [imageLoaded, setImageLoaded] = useState(false);

    const loggedInUser = useSelector((state) => state.userReducer.userIn);

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
        console.log("loaded");
        setImageLoaded(true);
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
                {!loading && !loggedInUser && (
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
                {!loading && loggedInUser && (
                    <motion.div
                        className="flex items-center"
                        variants={buttonAnim}
                        initial="hidden"
                        animate="visible"
                        disabled={loading}
                    >
                        <div className="text-lg p-2">
                            {loggedInUser.name.split(" ")[0]}
                        </div>
                        <img
                            src={loggedInUser.profileImg}
                            onLoad={handleImageLoad}
                            className="h-10 rounded-full"
                        />
                    </motion.div>
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
