import "./pageComman.css";
import { motion } from 'framer-motion';
import Slot from "../components/Slot";

export default function SlotsView() {


    return (
        <motion.div
            className="min-high d-flex flex-column justify-content-center align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Slots Available at Our Parking:
            <div className="d-flex flex-wrap gap-3 my-4">
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            </div>
        </motion.div>
    )
}