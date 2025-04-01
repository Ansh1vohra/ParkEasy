import "./pageComman.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { UserContext } from '../UserContext/UserContext';
import { useContext, useEffect, useState } from 'react';
import Slot from "../components/Slot";
import UR from "../assets/ursensor.png";
import "./SlotView.css";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://parkeasy-server.vercel.app");

export default function SlotsView() {
    const { user } = useContext(UserContext);
    const [distance, setDistance] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const slotNumber = 1101;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("https://parkeasy-server.vercel.app/api/bookings");
                const bookings = response.data.bookings;

                // Get the current time
                const currentTime = new Date();

                // Check if this slot is booked and still valid (not expired)
                const activeBooking = bookings.some(booking => 
                    booking.slotNumber === slotNumber && 
                    new Date(booking.expiryTime) > currentTime // Check if not expired
                );

                setIsBooked(activeBooking);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();

        // Listen for sensor data from WebSocket
        socket.on("sensorData", (data) => {
            console.log("Received sensor data:", data);
            setDistance(data.value); // Update distance state
        });

        return () => {
            socket.off("sensorData"); // Cleanup on unmount
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {user ? (
                <div className="container min-high d-flex flex-column justify-content-center align-items-center">
                    <h2 className="m-2 mt-4 fw-bold">Parking Slot:</h2>
                    <div className="d-flex items-center justify-content-center gap-3 m-4">
                        <img src={UR} alt="Ultrasonic Sensor" className="urimage" />
                        <Slot distance={distance} isBooked={isBooked} />
                    </div>

                    {/* Display Distance and Slot Status */}
                    {distance !== null ? (
                        <div className="flex p-2 gap-2">
                            <span>Distance: {distance} cm</span>
                            {isBooked ? (
                                <span className="text-warning fw-bold">⚠️ Slot is Booked</span>
                            ) : distance > 30 ? (
                                <span className="text-success fw-bold">🟢 Free Slot</span>
                            ) : (
                                <span className="text-danger fw-bold">🔴 Slot Busy</span>
                            )}
                        </div>
                    ) : (
                        <p>Waiting for sensor data...</p>
                    )}

                    {/* Show Book Now button if slot is free and not booked */}
                    {!isBooked && distance > 30 && (
                        <Link to="/booking">
                            <button className="mx-3 btn btn-md btn-danger">Book Now</button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="container min-high d-flex flex-column justify-content-center align-items-center">
                    <p className="fs-4">Please Sign in First!</p>
                    <Link className="btn btn-outline-dark mx-3 fs-5" to="/login">Sign In</Link>
                </div>
            )}
        </motion.div>
    );
}
