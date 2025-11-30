import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import mason from '../images/ui mason.jpg';
import painter from '../images/ui painter.jpg';
import plumber from '../images/ui plumber.jpg';
import electrician from '../images/ui electrician.jpg';
import welder from '../images/ui welder.jpg';
import carpenter from '../images/ui carpenter.jpg';
import Ac from '../images/ui AcTech.jpg';
import lift from '../images/ui liftTech.jpg';
import aglabour from '../images/agricultural labour.jpg';
import carmechanic from '../images/car mechanic.jpg';
import bikemechanic from '../images/bike mechanic.jpg';
import automechanic from '../images/auto mechanic.jpg';
import carwash from '../images/car washer.jpg';
import chief from '../images/chief.jpg';
import cloths from '../images/cloths washer.jpg';
import garden from '../images/garden cleaner.jpg';
import glassclener from '../images/glass cleaner.jpg';
import kids from '../images/kids care taker.jpg';
import oldpeople from '../images/old people caretaker.jpg';
import photographer from '../images/photographer for shoots and wedding.jpg';
import cattering from '../images/waiter or catering .jpg';
import dishwash from '../images/washing dishes.jpg';
import makeup from '../images/make up artest 2.jpg';
import teacher from '../images/ui teacher.jpg';
import watchman from '../images/ui watchman.jpg';
import driver from '../images/ui driver.jpg';

const monthlyWorks = [
  { role: 'teacher', image: teacher },
  { role: 'watchman', image: watchman },
  { role: 'driver', image: driver },
  { role: 'kidscaretaker', image: kids },
  { role: 'oldpeoplecaretaker', image: oldpeople },
];

const dailyWorks = [
  { role: 'mason', image: mason },
  { role: 'painter', image: painter },
  { role: 'plumber', image: plumber },
  { role: 'electrician', image: electrician },
  { role: 'welder', image: welder },
  { role: 'carpenter', image: carpenter },
  { role: 'AcTech', image: Ac },
  { role: 'liftTech', image: lift },
  { role: 'agriculturallabour', image: aglabour },
  { role: 'carmechanic', image: carmechanic },
  { role: 'bikemechanic', image: bikemechanic },
  { role: 'automechanic', image: automechanic },
  { role: 'carwash', image: carwash },
  { role: 'chief', image: chief },
  { role: 'clothswasher', image: cloths },
  { role: 'gardencleaner', image: garden },
  { role: 'glasscleaner', image: glassclener },
  { role: 'kidscaretaker', image: kids },
  { role: 'oldpeoplecaretaker', image: oldpeople },
  { role: 'makeupartest', image: makeup },
  { role: 'photographer', image: photographer },
  { role: 'cattering', image: cattering },
  { role: 'washingdishes', image: dishwash },
];

function Buttons() {
  const [workerType, setWorkerType] = useState('daily');
  const [search, setSearch] = useState('');

  const works = workerType === 'daily' ? dailyWorks : monthlyWorks;

  const filteredWorks = works.filter((work) =>
    work.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center px-4">
      
      {/* Toggle Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md ${
            workerType === 'daily'
              ? 'bg-gradient-to-r from-gray-950 to-indigo-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setWorkerType('daily')}
        >
          Daily Worker
        </button>

        <button
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md ${
            workerType === 'monthly'
              ? 'bg-gradient-to-r from-gray-950 to-indigo-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setWorkerType('monthly')}
        >
          Monthly Worker
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mt-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search work (ex: mason, teacher, electrician...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow bg-gray-100 focus:outline-none text-lg"
        />
      </div>

      {/* WORK GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mt-10 mb-20">
        {filteredWorks.length > 0 ? (
          filteredWorks.map((work, index) => (
            <Link
              key={index}
              to="/AddWorkForm"
              state={{ role: work.role }}
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <img
                  src={work.image}
                  alt={work.role}
                  className="w-32 h-32 rounded-lg shadow-lg transform transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-all rounded-lg hidden sm:flex">
                  {work.role.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-700 sm:hidden">
                {work.role.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg">
            No matching work found
          </p>
        )}
      </div>
    </div>
  );
}

export default Buttons;
