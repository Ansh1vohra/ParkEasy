import "./pageComman.css";

export default function Home() {
    return (
        <div className="min-high w-80 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-primary headingFont fw-bold text-center">
                Welcome to ParkEasy!
            </h1>
            <p className="p-2 fs-5 mx-2 text-center">Smart, Hassle-Free Parking - Book Your Spot Online, Show Your QR, and Park with Real-Time Slot Availability!</p>
            <button className="btn btn-primary fs-5">Book a Slot Now!</button>
        </div>
    )
}