import PropTypes from "prop-types";
import ScrollToTop from "@ui/scroll-to-top";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Wrapper = ({ children }) => (
    <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
        }}
    >
        {children}
        <ScrollToTop />
        <ToastContainer autoClose={2000} />
    </motion.div>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
