import "./pageComman.css";
import vectorImg from '../assets/vectorPark2.jpg';

export default function Login() {
    return (
        <div className="min-high container-fluid d-flex justify-content-center align-items-center bg-light">
            <div className="row w-75 shadow-lg rounded bg-white p-4">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={vectorImg} alt="Vector" className="img-fluid rounded" />
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <form className="p-4">
                        <h2 className="text-center mb-4 fw-bold">Sign In</h2>
                        <div className="mb-3">
                            <label className="form-label">Email Address:</label>
                            <input type="email" className="form-control" placeholder="Enter your email" required />
                        </div>
                        <button className="btn btn-dark w-100">Send OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
