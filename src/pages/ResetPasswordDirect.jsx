import React, { useState } from "react";
import { API_URL } from "../data/data";
import { useNavigate } from "react-router-dom";

function ResetPasswordDirect() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}user/reset-password-direct`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.success);
                setError("");
                setTimeout(() => navigate("/Login"), 3000);
            } else {
                setError(data.error);
                setMessage("");
            }
        } catch (error) {
            setError("Something went wrong.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Remembered your password?{" "}
                    <a href="/Login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ResetPasswordDirect;
