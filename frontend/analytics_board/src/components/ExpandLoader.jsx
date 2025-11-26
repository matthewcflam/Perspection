import { motion } from "framer-motion";

export default function ExpandLoader() {
  return (
    <motion.div
      initial={{ scale: 0, borderRadius: "50%" }}
      animate={{ scale: 50, borderRadius: "0%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-20 h-20 bg-white"
    />
  );
}
