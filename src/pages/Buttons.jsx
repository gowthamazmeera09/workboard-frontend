import React from 'react'
import { Link } from 'react-router-dom';
import mason from '../images/mason.jpeg'
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import welder from '../images/welder.jpeg';
import driver from '../images/driver.jpg';
import carpenter from '../images/carpenter.jpeg';
import Ac from '../images/AcTech.jpeg';
import lift from '../images/lift technition.jpeg';


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
      </div>
    </div>
  );
}

export default Buttons;
