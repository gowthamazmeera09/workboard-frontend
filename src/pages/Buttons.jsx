import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/mason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import welder from '../images/welder.jpeg';
import carpenter from '../images/carpenter.jpeg';
import Ac from '../images/AcTech.jpeg';
import lift from '../images/lift technition.jpeg';
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
// Monthly Worker List
const monthlyWorks = [
  { role: 'teacher', image: teacher },
  { role: 'watchman', image: watchman },
  { role: 'driver', image: driver },
  // Add more roles as needed
];

// Daily Worker List
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

  const works = workerType === 'daily' ? dailyWorks : monthlyWorks;

  return (
    <div className="flex flex-col items-center">
      {/* Worker Type Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          className={`px-4 py-2 rounded ${workerType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setWorkerType('daily')}
        >
          Daily Worker
        </button>
        <button
          className={`px-4 py-2 rounded ${workerType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setWorkerType('monthly')}
        >
          Monthly Worker
        </button>
      </div>

      {/* Worker List */}
      <div className="flex flex-wrap gap-10 max-w-[500px] justify-center mt-10 mb-20">
        {works.map((work, index) => (
          <Link key={index} to="/AddWorkForm" state={{ role: work.role }}>
            <img src={work.image} width="150px" alt={work.role} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Buttons;
