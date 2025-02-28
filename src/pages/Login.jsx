import React,{useState} from 'react';
import "./pageComman.css";
import "./Login.css";
import { useGoogleLogin } from '@react-oauth/google';
import vectorImg from '../assets/vectorPark2.jpg';
import googleIcon from '../assets/gIcon.png';
import { useNavigate } from 'react-router';

export default function Login() {
  const nav = useNavigate();
  const [email,setEmail] = useState('');

  const googleLoginSuccess = async (credentialResponse) => {
    console.log("Google OAuth Response:", credentialResponse); 

    if (credentialResponse && credentialResponse.access_token) {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
            },
          }
        );

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          console.log("User Info:", userInfo);
          console.log("User Email:", userInfo.email);
          console.log("User Name:", userInfo.name);
          nav('/');

        } else {
          console.error("Failed to fetch user info:", userInfoResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    } else {
      console.error("No access token found in the response");
    }
  };

  function googleLoginError() {
    console.log("Login Failed");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleLoginSuccess,
    onError: googleLoginError,
  });

  return (
    <div className="min-high container-fluid d-flex justify-content-center align-items-center bg-light">
      <div className="row width-75 shadow-lg rounded bg-white p-4">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={vectorImg} alt="Vector" className="img-fluid rounded" />
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center">
          <form className="p-4">
            <h2 className="text-center mb-4 fw-bold">Sign In</h2>

            <button
              type="button"
              className="btn btn-dark w-100 mb-3 p-3 d-flex justify-content-center align-items-center"
              onClick={googleLogin}
            >
              Sign-in with Google
              <img src={googleIcon} className="mx-3" alt="google" width="25px" />
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