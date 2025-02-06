import { useState } from "react";
import axios from "axios";
import { API_URL } from "../data/data";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);  // Loading state
    const Navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const res = await axios.post(`${API_URL}user/reset-password`, { email, newPassword: password });
            setMessage(res.data.success);
            if (res.status === 200) {
                Navigate('/login');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false); // Reset loading state after request
        }
    };

    return (
        <div className="relative">
            {loading && <LoadingSpinner />} {/* Show spinner while loading */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">Set New Password</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="text-center text-red-500 mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
