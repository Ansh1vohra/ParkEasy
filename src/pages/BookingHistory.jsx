import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "./BookingHistory.css"; // Optional styling
import "./pageComman.css";

export default function BookingHistory() {
    const { user } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrVisible, setQrVisible] = useState({}); // To track QR visibility

    useEffect(() => {
        if (!user) return; // Exit if user is not logged in

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`https://parkeasy-server.onrender.com/api/bookings/${user.email}`);
                setBookings(response.data.bookings);
            } catch (err) {
                setError("No bookings found.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (!user) {
        return (
            <div className="container text-center mt-5 min-high">
                <h3>Please Sign in to View Booking History</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4 min-high">
            <h2 className="text-center fw-bold mb-3">Booking History</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Slot Number</th>
                                <th>Duration (Hours)</th>
                                <th>Total Charge</th>
                                <th>Expiry Time</th>
                                <th>QR Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.slotNumber}</td>
                                    <td>{booking.parkingDuration}</td>
                                    <td>₹{booking.totalCharge}</td>
                                    <td>{new Date(booking.expiryTime).toLocaleString()}</td>
                                    <td>
                                        {qrVisible[index] ? (
                                            <QRCodeCanvas value={booking.qrCodeData} size={100} />
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() =>
                                                    setQrVisible((prev) => ({
                                                        ...prev,
                                                        [index]: !prev[index],
                                                    }))
                                                }
                                            >
                                                Show QR Code
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
