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

const socket = io("https://parkeasy-server.onrender.com/");

export default function SlotsView() {
    const { user } = useContext(UserContext);
    const [slots, setSlots] = useState({
        1101: { distance: null, isBooked: false },
        1102: { distance: null, isBooked: false },
        1103: { distance: null, isBooked: false }
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("https://parkeasy-server.onrender.com/api/bookings");
                const bookings = response.data.bookings;
                const currentTime = new Date();

                // Update slots state with booking status
                setSlots(prevSlots => {
                    const updatedSlots = {...prevSlots};
                    Object.keys(updatedSlots).forEach(slotNumber => {
                        const activeBooking = bookings.some(booking => 
                            booking.slotNumber === slotNumber && 
                            new Date(booking.expiryTime) > currentTime
                        );
                        updatedSlots[slotNumber].isBooked = activeBooking;
                    });
                    return updatedSlots;
                });
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();

        // Listen for sensor data from WebSocket
        socket.on("sensorData", (data) => {
            console.log("Received sensor data:", data);
            setSlots(prevSlots => ({
                ...prevSlots,
                [data.sensorNo]: {
                    ...prevSlots[data.sensorNo],
                    distance: data.value
                }
            }));
        });

        return () => {
            socket.off("sensorData");
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
                    <h2 className="m-2 mt-4 fw-bold">Parking Slots</h2>
                    
                    {/* Slot 1101 */}
                    <div className="slot-container mb-4">
                        <h3>Slot 1101</h3>
                        <div className="d-flex items-center justify-content-center gap-3 m-4">
                            <img src={UR} alt="Ultrasonic Sensor" className="urimage" />
                            <Slot distance={slots[1101].distance} isBooked={slots[1101].isBooked} />
                        </div>
                        {renderSlotStatus(1101)}
                    </div>
                    
                    {/* Slot 1102 */}
                    <div className="slot-container mb-4">
                        <h3>Slot 1102</h3>
                        <div className="d-flex items-center justify-content-center gap-3 m-4">
                            <img src={UR} alt="Ultrasonic Sensor" className="urimage" />
                            <Slot distance={slots[1102].distance} isBooked={slots[1102].isBooked} />
                        </div>
                        {renderSlotStatus(1102)}
                    </div>
                    
                    {/* Slot 1103 */}
                    <div className="slot-container mb-4">
                        <h3>Slot 1103</h3>
                        <div className="d-flex items-center justify-content-center gap-3 m-4">
                            <img src={UR} alt="Ultrasonic Sensor" className="urimage" />
                            <Slot distance={slots[1103].distance} isBooked={slots[1103].isBooked} />
                        </div>
                        {renderSlotStatus(1103)}
                    </div>
                </div>
            ) : (
                <div className="container min-high d-flex flex-column justify-content-center align-items-center">
                    <p className="fs-4">Please Sign in First!</p>
                    <Link className="btn btn-outline-dark mx-3 fs-5" to="/login">Sign In</Link>
                </div>
            )}
        </motion.div>
    );

    function renderSlotStatus(slotNumber) {
        const slot = slots[slotNumber];
        
        if (slot.distance === null) {
            return <p>Waiting for sensor data...</p>;
        }
        
        return (
            <div className="flex p-2 gap-2">
                <span>Distance: {slot.distance} cm</span>
                {slot.isBooked ? (
                    <span className="text-warning fw-bold">⚠️ Slot is Booked</span>
                ) : slot.distance > 30 ? (
                    <span className="text-success fw-bold">🟢 Free Slot</span>
                ) : (
                    <span className="text-danger fw-bold">🔴 Slot Busy</span>
                )}
                
                {/* Show Book Now button if slot is free and not booked */}
                {!slot.isBooked && slot.distance > 30 && (
                    <Link to={`/booking?slot=${slotNumber}`}>
                        <button className="mx-3 btn btn-md btn-danger">Book Now</button>
                    </Link>
                )}
            </div>
        );
    }
}