import { motion } from "framer-motion"

function DeleteButton({ onClick }) {
    return (
        <motion.button
            style={{fontWeight:"bold"}}
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.8, color: "var(--main-color)" }}
            onClick={onClick}
        >X</motion.button>
    );
}
export default DeleteButton;