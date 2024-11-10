import React from 'react'
import { Link } from 'react-router-dom';
import images from '../images/cartoon teacher image.webp';
import mason from '../images/mason.jpeg'
import marbul from '../images/marbul mason.jpg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import welder from '../images/welder.jpeg';
import driver from '../images/driver.jpg';
import carpenter from '../images/carpenter.jpeg';
import ACtechnician from '../images/AC technician.jpg';


function Buttons() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-10 max-w-[500px] justify-center mt-20 mb-20">
        <Link to="/AddWorkForm" state={{ role: 'mason' }}>
          <img src={mason} width="150px"alt="meson" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'carpenter' }}>
          <img src={carpenter} width="130px" alt="carpenter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={painter} width="150px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'plumber' }}>
          <img src={plumber} width="150px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'electrician' }}>
          <img src={electrician} width="150px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'welder' }}>
          <img src={welder} width="150px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={ACtechnician} width="150px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={driver} width="150px" alt="Driver" />
        </Link>
      </div>
    </div>
  );
}

export default Buttons;
