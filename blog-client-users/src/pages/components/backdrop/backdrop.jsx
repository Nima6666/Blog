import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-slate-500">
            {children}
        </motion.div>
    );
}
