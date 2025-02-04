import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';

function VerificationPage({ email }) {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // Handle input change for the verification code
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input if valid
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      // Automatically submit the code when all 6 digits are filled
      if (newCode.every(num => num !== "")) {
        handleSubmit(newCode.join(""));
      }
    }
  };

  // Handle backspace key press
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle submission of the verification code
  const handleSubmit = async (finalCode) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_URL}user/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: finalCode }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Email verified successfully!");
        navigate('/Login');
      } else {
        alert(data.error || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying the code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend the verification code
  const resendCode = async () => {
    try {
      const response = await fetch(`${API_URL}/user/resendVerificationCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Verification code sent successfully");
        setResendTimer(30);
      } else {
        alert(data.error || "Error resending verification code");
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
    }
  };

  // Countdown timer for resending the code
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email.</p>

        {/* Input fields for the verification code */}
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
              className="w-12 h-12 text-center border border-gray-300 rounded-lg text-2xl focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
            />
          ))}
        </div>

        {/* Submit button to verify the code */}
        <button
          className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          onClick={() => handleSubmit(code.join(""))}
          disabled={isSubmitting || code.some((num) => num === "")}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>

        {/* Resend code button */}
        <button
          className="w-full py-2 mt-4 text-blue-600 hover:underline disabled:text-gray-400"
          onClick={resendCode}
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
}

export default VerificationPage;
