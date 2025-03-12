import "./pageComman.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';
import Slot from "../components/Slot"


export default function SlotsView() {
    const { user } = useContext(UserContext);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {user ? (
                <div
                    className="container min-high d-flex flex-column justify-content-center align-items-center"
                >
                    <h2 className="m-2 mt-4 fw-bold">
                        Slots Available at Our Parking:
                    </h2>
                    <div className="d-flex flex-wrap justify-content-center gap-3 m-4">
                        <Slot />
                        <Slot />
                        <Slot />
                        <Slot />
                    </div>
                </div>
            ) : (
                <div
                    className="container min-high d-flex flex-column justify-content-center align-items-center"
                >
                    <p className="fs-4">Please Sign in First!</p>
                    <Link className="btn btn-outline-dark mx-3 fs-5" to="/login">Signin</Link>
                </div>
            )}

        </motion.div>
    )
}