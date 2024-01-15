import motion from "framer-motion";
import Backdrop from "../backdrop/backdrop";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Model = ({ handleClose, text }) => {
    return (
        <>
            <Backdrop onClick={handleClose}>
                <motion.div
                    id="shouldBeForm"
                    onClick={(e) => e.stopPropagation()}
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    sdfsadfsdf
                </motion.div>
            </Backdrop>
        </>
    );
};

export default Model;
