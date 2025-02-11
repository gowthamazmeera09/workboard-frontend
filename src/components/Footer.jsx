import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 border-t border-gray-300 shadow-lg md:flex md:items-center md:justify-between md:p-6 text-white">
            <ul className="flex flex-wrap items-center justify-between w-full text-sm font-medium">
                <li>
                    <Link to="/AddWorkForm" className='ml-6 lg:ml-96 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200'>
                        ➕ Add Work
                    </Link>
                </li>
                <li>
                    <Link to="/Totalworks" className='mr-6 lg:mr-96 transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200'>
                        📋 Total Works
                    </Link>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;