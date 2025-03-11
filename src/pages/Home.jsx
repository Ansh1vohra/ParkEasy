import "./pageComman.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

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

      {/* Enhanced Button with Hover Animation */}
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
    </motion.div>
  );
}