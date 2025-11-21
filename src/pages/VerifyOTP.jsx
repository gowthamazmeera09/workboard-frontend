import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../data/data';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function VerifyOTP() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      if (newCode.every(num => num !== "")) {
        handleSubmit(newCode.join(""));
      }
    }
  };

  // Backspace movement
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (finalCode) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: finalCode }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        navigate('/reset-password', { state: { email } });
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const resendCode = async () => {
    try {
      const response = await fetch(`${API_URL}user/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("New OTP sent successfully!");
        setResendTimer(30);
      } else {
        alert(data.error || "Error resending OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {isSubmitting && <LoadingSpinner />}

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Verify OTP
        </h2>

        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to: <br />
          <span className="font-semibold text-indigo-600">{email}</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 mb-4">
          {code.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg 
                         text-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-300 transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
          onClick={() => handleSubmit(code.join(""))}
          disabled={isSubmitting || code.some(num => num === "")}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>

        {/* Resend OTP */}
        <button
          className="w-full py-2 mt-4 text-indigo-600 hover:underline disabled:text-gray-400"
          onClick={resendCode}
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
