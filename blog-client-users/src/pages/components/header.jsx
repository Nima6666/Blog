import { useState } from "react";
import Model from "./model/model";
import { AnimatePresence, motion } from "framer-motion";

export default function Header({ loading }) {
    const [isForm, setIsForm] = useState(false);

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
                duration: 0.5,
            },
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "easeInOut",
                duration: 0.5,
            },
        },
    };

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
                {!loading && (
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
