import React from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Import icons

function Help() {
    return (
        <div className="p-6 text-center font-sans">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
                If you have any questions or need assistance, feel free to reach out to us through the following channels:
            </p>

            <div className="flex justify-center space-x-12">
                {/* Phone Section */}
                <div className="text-center">
                    <a href="tel:+916303497101" className="hover:text-green-500">
                        <FaPhone size={40} className="mx-auto text-green-600" />
                        <p className="mt-2 text-lg font-medium">Call Us</p>
                    </a>
                </div>

                {/* Email Section */}
                <div className="text-center">
                    <a href="mailto:gowthamazmeera@gmail.com.com" className="hover:text-blue-500">
                        <FaEnvelope size={40} className="mx-auto text-blue-600" />
                        <p className="mt-2 text-lg font-medium">Email Us</p>
                    </a>
                </div>

                {/* WhatsApp Section */}
                <div className="text-center">
                    <a href="https://wa.me/+916303497101" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                        <FaWhatsapp size={40} className="mx-auto text-green-600" />
                        <p className="mt-2 text-lg font-medium">WhatsApp</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Help;