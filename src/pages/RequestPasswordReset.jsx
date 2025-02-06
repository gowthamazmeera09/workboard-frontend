import { useState } from "react";
import axios from "axios";
import { API_URL } from "../data/data";
import { useNavigate } from "react-router-dom";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}user/request-password-reset`, { email });
      setMessage(res.data.success);
      if (res.status === 200) {
        Navigate('/verify-otp', { state: { email } });
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
