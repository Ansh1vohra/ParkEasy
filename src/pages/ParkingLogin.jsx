import { useState } from "react";
import "./pageComman.css";
import { useNavigate } from "react-router";

export default function ParkingLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleParkingLogin(e) {
    e.preventDefault(); // Prevent form from reloading the page

    if (username === "parking" && password === "parking") {
      alert("Login Successful! 🎉");
      navigate("/provider-dashboard"); // Redirect to provider dashboard
    } else {
      setError("Invalid username or password! ❌");
    }
  }

  return (
    <div className="min-high d-flex justify-content-center align-items-center">
      <div className="flex justify-center align-center wid">
        <form onSubmit={handleParkingLogin} className="p-4 border rounded">
          <h2 className="text-center">Parking Provider Login</h2>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          <label>Username:</label>
          <input
            type="text"
            className="form-control mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            className="form-control mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}
