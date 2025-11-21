import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
import LoadingSpinner from './LoadingSpinner';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}user/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('loginToken', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('imageUrl', data.photo);

                Navigate('/Home');
                window.location.reload();
            } 
            else {
                // 🔥 USER NOT VERIFIED CASE
                if (data.error === "Please verify your email before logging in") {

                    alert("Please verify your email before logging in. A new OTP has been sent to your email.");

                    // Redirect to verification page WITH EMAIL
                    Navigate('/Verificationpage', {
                        state: { email }
                    });

                } else {
                    setError(data.error || "Login failed");
                }

                setEmail("");
                setPassword("");
            }

        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <LoadingSpinner />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://t3.ftcdn.net/jpg/04/06/91/94/240_F_406919447_kAcC5gdh1rpYlVxwMfHtUTGf24PUYSq8.jpg"
                        className="mx-auto h-24 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    type="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base border-2 border-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <Link to="/requestpasswordreset" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base border-2 border-gray-300"
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-600 mx-16 mb-5">{error}</div>}

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/Signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
