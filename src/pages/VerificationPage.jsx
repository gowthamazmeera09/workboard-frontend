import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/data';
import { useNavigate } from 'react-router-dom';

function VerificationPage({ email }) {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();

  // Update each box value
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus to next box if value is not empty
      if (value !== "" && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }

      // Auto submit if all fields are filled
      if (newCode.every((num) => num !== "")) {
        handleSubmit(newCode.join(""));
      }
    }
  };

  // Auto-submit the verification code
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
        Navigate('/Sigin')
        // Navigate to dashboard or login
      } else {
        alert(data.error || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying the code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend verification code logic
  const resendCode = async () => {
    try {
      const response = await fetch(`${API_URL}user/resendVerificationCode`, {
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

  // Timer for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  return (
    <div className="max-w-md mx-auto p-4 lg:mt-[-200px]">
      <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">Enter the 6-digit code sent to your email.</p>
      
      <div className="flex justify-center mb-4">
        {code.map((value, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg mx-1 text-xl"
          />
        ))}
      </div>
      
      <button
        className="w-full py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        onClick={() => handleSubmit(code.join(""))}
        disabled={isSubmitting || code.some((num) => num === "")}
      >
        {isSubmitting ? "Submitting..." : "Verify Code"}
      </button>

      <button
        className="w-full py-2 text-blue-600 hover:underline disabled:text-gray-400"
        onClick={resendCode}
        disabled={resendTimer > 0}
      >
        {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
      </button>
    </div>
  );
}

export default VerificationPage;
