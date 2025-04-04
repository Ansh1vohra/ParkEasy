import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

export default function ProviderDashboard() {
  const webcamRef = useRef(null);
  const [qrResult, setQrResult] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          decodeQR(imageSrc);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const decodeQR = async (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrResult(code.data);
      }
    };
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-high">
      <h2 className="text-center">Parking Provider Dashboard</h2>

      <div className="mt-4 p-3 border rounded">
        <h4>Scan User's QR Code</h4>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          width={400}
          height={300}
          facingMode= "environment"
        />
      </div>

      {/* Display Scanned Result */}
      {qrResult ? (
        <div className="mt-3 p-2 bg-light border rounded text-center">
          <h5>Scanned QR:</h5>
          <p className="text-success fw-bold">{qrResult}</p>
        </div>
      ) : (
        <p className="mt-3">Waiting for scan...</p>
      )}
    </div>
  );
}
