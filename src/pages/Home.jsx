import "./pageComman.css";

export default function Home(){
    return(
        <div className="min-high d-flex flex-column justify-content-center align-items-center">
            <h1 className="fs-1 fw-bold">Welcome to ParkEasy!</h1>
            <p className="p-2 mx-2 text-center">Smart, Hassle-Free Parking - Book Your Spot Online, Scan Your QR, and Park with Real-Time Slot Availability!</p>
            <button className="btn btn-outline-dark">Book a Slot Now!</button>
        </div>
    )
}