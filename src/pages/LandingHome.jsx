import React from 'react';
import { Link } from 'react-router-dom';
import image from '../images/workboard-main-image-removebg.png';
import Login from './Login';
import Home from './Home';

function Landingpage() {
    const userId = localStorage.getItem('userId');

    return (
        <div>
            
                <div className='flex justify-center'>
                    <div className="flex flex-col items-center justify-center min-h-screen px-4">
                        {/* Image Section */}
                        <div className="w-full flex justify-center">
                            <img
                                src={image}
                                alt="driver"
                                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md mt-10 sm:mt-20 object-contain"
                            />
                        </div>

                        {/* Button Section */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 w-full lg:hidden">
                            <Link
                                to='/Login'
                                className="w-full sm:w-auto text-center text-white bg-blue-500 hover:bg-blue-600 px-16 py-3 rounded-lg font-semibold shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link
                                to='/Signup'
                                className="w-full sm:w-auto text-center text-white bg-blue-500 hover:bg-blue-600 px-16 py-3 rounded-lg font-semibold shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>

                    {/* Hide Login on Small Screens */}
                    <div className="hidden lg:block">
                        <Login />
                    </div>
                </div>
        </div>
    );
}

export default Landingpage;
