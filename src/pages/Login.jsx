import "./pageComman.css";
import "./Login.css";
import vectorImg from '../assets/vectorPark2.jpg';
import googleIcon from '../assets/gIcon.png';

export default function Login() {
    return (
        <div className="min-high container-fluid d-flex justify-content-center align-items-center bg-light">
            <div className="row width-75 shadow-lg rounded bg-white p-4">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={vectorImg} alt="Vector" className="img-fluid rounded" />
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <form className="p-4">
                        <h2 className="text-center mb-4 fw-bold">Sign In</h2>
                        <button type="button" className="btn btn-dark w-100 mb-3 p-3">Sign-in with Google
                        <img src={googleIcon} className="mx-3" alt="google" width='25px' />
                        </button>
                        <div className="mb-3">
                            <label className="form-label my-2">Email Address:</label>
                            <input type="email" className="form-control p-3" placeholder="Enter your email" required />
                        </div>
                        <button type="button" className="btn btn-dark w-100 p-3">Send OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
