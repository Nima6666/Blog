import { AnimatePresence, motion } from "framer-motion";

export default function Signup() {
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

    return (
        <AnimatePresence>
            <motion.form
                method="post"
                variants={pageAnim}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h1>SIGNUP FORM</h1>
            </motion.form>
        </AnimatePresence>
    );
}
