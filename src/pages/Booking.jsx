import React, { useState, useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "./Booking.css";
import "./pageComman.css";
import { UserContext } from "../UserContext/UserContext"; // Import UserContext

const BookingPage = () => {
    const { user } = useContext(UserContext);
    const [parkingDuration, setParkingDuration] = useState(1);
    const [qrCode, setQrCode] = useState(null);
    const [totalCharge, setTotalCharge] = useState(35);
    const [expiryTime, setExpiryTime] = useState("");
    const [slotNumber, setSlotNumber] = useState(null);

    // Function to calculate total charge based on parking duration
    const calculateCharge = (duration) => {
        if (duration === 1) {
            return 35; // Price for 1 hour
        }
        return 35 + (duration - 1) * 25; // Price for additional hours
    };

    // Update total charge when parking duration changes
    const handleDurationChange = (e) => {
        const duration = Number(e.target.value);
        setParkingDuration(duration);
        setTotalCharge(calculateCharge(duration));
    };

    const handleBooking = async () => {
        if (!user) {
            alert("Please log in to book a parking slot.");
            return;
        }
        console.log(user);
        setSlotNumber(1101);

        try {
            const response = await axios.post("https://parkeasy-server.onrender.com/api/bookings/create", {
                userEmail: user.email,
                parkingDuration: parkingDuration,
                slotNumber: 1101
            });

            if (response.data.success) {
                // Set QR Code data as user email and slot number
                const qrCodeData = `${user.email}_${slotNumber}`;
                setQrCode(qrCodeData);
                setExpiryTime(new Date(response.data.expiryTime).toLocaleTimeString());
                setSlotNumber(response.data.slotNumber);
            }
        } catch (error) {
            alert("Error creating booking. Please try again.");
        }
    };

    return (
        <div className="min-high bookpage d-flex items-center justify-center">
            <div className="booking-container">
                <h2>Book Your Parking Slot</h2>

                <label>Duration (1-12 hours):</label>
                <input
                    type="number"
                    value={parkingDuration}
                    onChange={handleDurationChange} // Call new function here
                    min="1" max="12"
                />

                <p>Total Charge: ₹{totalCharge}</p> {/* Display total charge here */}

                <button className="book-btn" onClick={handleBooking}>
                    🚗 Confirm Booking
                </button>

                {/* Pricing Information Section */}
                {qrCode && (
                    <div className="qr-section">
                        <h3>Booking Confirmed!</h3>
                        <p>Slot Number: {slotNumber}</p>
                        <p>QR Code (valid till {expiryTime})</p>
                        <QRCodeCanvas value={qrCode} size={180} />
                    </div>
                )}
            </div>
            <div className="pricing-info">
                <h3>Pricing Details</h3>
                <p>
                    Our parking charges are structured as follows:
                </p>
                <ul>
                    <li><strong>First Hour:</strong> ₹35</li>
                    <li><strong>Each Additional Hour:</strong> ₹25</li>
                </ul>
                <p>
                    For example, if you book for 3 hours, the total charge will be:
                </p>
                <p><strong>₹35 + ₹25 + ₹25 = ₹85</strong></p>
                <p>
                    You can book for a maximum of 12 hours. Please ensure to check your total charge before confirming your booking.
                </p>
            </div>
        </div>
    );
};

export default BookingPage;
