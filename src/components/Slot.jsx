import "./Slot.css";
import car from "../assets/carVector.png"

export default function Slot({ distance,isBooked }){
    return(
        <div className="slotBox">
            {distance !== null ? (
                        <div className="flex p-2 gap-2">
                            {isBooked ? (
                                <span className="text-warning fw-bold">⚠️ Slot is Booked</span>
                            ) : distance > 30 ? (
                                <span className="text-success fw-bold">🟢 Free Slot</span>
                            ) : (
                                <img src={car} alt="car" />
                            )}
                        </div>
                    ) : (
                        <p>Waiting for sensor data...</p>
                    )}
        </div>
    )
}