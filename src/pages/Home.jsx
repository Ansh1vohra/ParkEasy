import "./pageComman.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <motion.div
      className="min-high w-80 d-flex flex-column justify-content-center align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-primary headingFont fw-bold text-center">
        Welcome to ParkEasy!
      </h1>
      <p className="p-2 fs-5 mx-2 text-center">
        Smart, Hassle-Free Parking - Book Your Spot Online, Show Your QR, and Park with Real-Time Slot Availability!
      </p>

      {/* Book Slot Button */}
      <motion.button
        onClick={() => navigate('/slots')}
        className="btn btn-primary fs-5"
        whileHover={{
          scale: 1.05,
          backgroundColor: "#0d6efd",
          color: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        Book a Slot Now!
      </motion.button>

      {/* Show "Booking History" for Logged-in Users */}
      {user ? (
        <motion.button
          onClick={() => navigate('/bookinghistory')}
          className="mt-3 btn btn-primary fs-5"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#0d6efd",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          Booking History
        </motion.button>
      ) : (
        // If user is NOT logged in, show provider sign-up button
        <motion.button
          onClick={() => navigate('/parkinglogin')}
          className="mt-3 btn btn-outline-dark fs-5"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#000",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          Join as Parking Provider
        </motion.button>
      )}
    </motion.div>
  );
}
