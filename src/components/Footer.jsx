import React from 'react'

import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 justify-between">
                    <li>
                        <Link to="/AddWorkForm" className='ml-10 lg:ml-96  ' >
                        AddWorkForm
                        </Link>
                    </li>
                    <li>
                        <Link to="/Home" className='mr-10 lg:mr-96' >
                        Total Works
                        </Link>
                    </li>
                </ul>
            </footer>

        </div>
    )
}

export default Footer;
