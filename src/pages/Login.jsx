import React, { useState, useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import "./pageComman.css";
import "./Login.css";
import vectorImg from '../assets/vectorPark2.jpg';
import googleIcon from '../assets/gIcon.png';

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(UserContext);  // Using UserContext
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');


  const googleLoginSuccess = async (credentialResponse) => {

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
          console.log("User Email:", userInfo.email);
          console.log("User Name:", userInfo.name);
          try {
            const response = await axios.post("http://localhost:5000/api/users/signin", {
              userMail: userInfo.email,
              userName: userInfo.name
            });

            console.log("Server Response:", response.data);

            // Save user to Context
            login({
              email: userInfo.email,
              name: userInfo.name
            });

            nav('/slots');

          } catch (e) {
            console.error(e);
          }
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

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    document.getElementById('emailForm').classList.remove('d-none');
    document.getElementById('otpForm').classList.add('d-none');
  }, [])

  async function sendOTP() {
    try {
      const response = await axios.post('http://localhost:5000/api/users/send-otp', {
        email: email
      })

      console.log("Server Response:", response.data);

      if (response != null) {
        document.getElementById('emailForm').classList.add('d-none');
        document.getElementById('otpForm').classList.remove('d-none');

      }

    } catch (error) {
      console.error(error);
    }
  }

  async function verifyOTP() {
    try {
      const res = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email: email,
        otp: otp
      })

      console.log("Server Response :", res.data);

      if (res != null) {
        try {
          const signinResponse = await axios.post("http://localhost:5000/api/users/signin", {
            userMail: email,
            userName: email.split('@')[0]
          });
          console.log(signinResponse);
          if (signinResponse!=null){
            login({
              email: email,
              name: email.split('@')[0]
            });
            nav('/');
          }

        } catch (error) {
          console.error(error);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-high container-fluid d-flex justify-content-center align-items-center bg-light">
      <motion.div className="row width-75 shadow-lg rounded bg-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
            <div id="emailForm" className='email'>
              <div className="mb-3">
                <label className="form-label my-2">Email Address:</label>
                <input
                  type="email"
                  className="form-control p-3"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="button" onClick={sendOTP} className="btn btn-dark w-100 p-3">Send OTP</button>
            </div>

            <div id="otpForm" className='otpForm'>
              <div className='mb-3'>
                <label className="form-label my-2">Enter Your OTP(Valid for 5 mins):</label>
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={verifyOTP} className="btn btn-dark w-100 p-3">Verify OTP</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}