import React, { useState, useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Booking.css";
import "./pageComman.css";
import { UserContext } from "../UserContext/UserContext";

const BookingPage = () => {
    const { user } = useContext(UserContext);
    const [parkingDuration, setParkingDuration] = useState(1);
    const [qrCode, setQrCode] = useState(null);
    const [totalCharge, setTotalCharge] = useState(35);
    const [expiryTime, setExpiryTime] = useState("");
    // const [slotNumber, setSlotNumber] = useState(null);
    const { slotNumber } = useParams();
    const [errorMsg, setErrorMsg] = useState("");


    const calculateCharge = (duration) => {
        if (duration === 1) {
            return 35;
        }
        return 35 + (duration - 1) * 25;
    };

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

        if (!slotNumber) {
            setErrorMsg("No parking slot selected");
            return;
        }

        setQrCode(null);
        setExpiryTime("");
        setErrorMsg("");

        try {
            const response = await axios.post("https://parkeasy-server.onrender.com/api/bookings/create", {
                userEmail: user.email,
                parkingDuration,
                slotNumber: slotNumber
            });

            if (response.data.success) {
                const qrCodeData = `${user.email}_${response.data.slotNumber}`;
                setQrCode(qrCodeData);
                setExpiryTime(new Date(response.data.expiryTime).toLocaleTimeString());
                // setSlotNumber(response.data.slotNumber);
            }
        } catch (error) {
            const serverError = error.response?.data?.error || "Error creating booking. Please try again.";
            setErrorMsg(serverError);
        }
    };

    return (
        <div className="min-high bookpage d-flex items-center justify-center">
            <div className="booking-container">
                <h2>Book Your Parking Slot</h2>
                
                {slotNumber && (
                    <p className="slot-info">Selected Slot: <strong>{slotNumber}</strong></p>
                )}

                <label>Duration (1-12 hours):</label>
                <input
                    type="number"
                    value={parkingDuration}
                    onChange={handleDurationChange}
                    min="1"
                    max="12"
                />

                <p>Total Charge: ₹{totalCharge}</p>

                <button className="book-btn" onClick={handleBooking}>
                    🚗 Confirm Booking
                </button>

                {errorMsg && (
                    <div className="error-msg">
                        ⚠️ {errorMsg}
                    </div>
                )}

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
                <p>Our parking charges are structured as follows:</p>
                <ul>
                    <li><strong>First Hour:</strong> ₹35</li>
                    <li><strong>Each Additional Hour:</strong> ₹25</li>
                </ul>
                <p>For example, if you book for 3 hours:</p>
                <p><strong>₹35 + ₹25 + ₹25 = ₹85</strong></p>
                <p>Maximum duration: 12 hours.</p>
            </div>
        </div>
    );
};

export default BookingPage;