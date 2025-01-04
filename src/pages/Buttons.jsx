import React from 'react'
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


function Buttons() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-10 max-w-[500px] justify-center mt-20 mb-20">
        <Link to="/AddWorkForm" state={{ role: 'mason' }}>
          <img src={mason} width="150px"alt="mason" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'carpenter' }}>
          <img src={carpenter} width="130px" alt="carpenter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={painter} width="150px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'plumber' }}>
          <img src={plumber} width="150px" alt="plumber" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'electrician' }}>
          <img src={electrician} width="150px" alt="electrician" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'welder' }}>
          <img src={welder} width="150px" alt="welder" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'AcTech' }}>
          <img src={Ac} width="150px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'liftTech' }}>
          <img src={lift} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'agricultural labour' }}>
          <img src={aglabour} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'car mechanic' }}>
          <img src={carmechanic} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'bike mechanic' }}>
          <img src={bikemechanic} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'auto mechanic' }}>
          <img src={automechanic} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'car wash' }}>
          <img src={carwash} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'chief' }}>
          <img src={chief} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'cloths washer' }}>
          <img src={cloths} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'garden cleaner' }}>
          <img src={garden} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'glass cleaner' }}>
          <img src={glassclener} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'kids caretaker' }}>
          <img src={kids} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'old people caretaker' }}>
          <img src={oldpeople} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'makeup artest' }}>
          <img src={makeup} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'photographer' }}>
          <img src={photographer} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'cattering' }}>
          <img src={cattering} width="150px" alt="lift" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'washing dishes' }}>
          <img src={dishwash} width="150px" alt="lift" />
        </Link>
      </div>
    </div>
  );
}

export default Buttons;
