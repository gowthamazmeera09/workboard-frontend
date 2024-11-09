import React from 'react'
import { Link } from 'react-router-dom';
import images from '../images/cartoon teacher image.webp';

function Buttons() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-10 max-w-[500px] justify-center mt-20 mb-20">
        <Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link><Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link><Link to="/AddWorkForm" state={{ role: 'teacher' }}>
          <img src={images} width="80px" alt="Teacher" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'driver' }}>
          <img src={images} width="80px" alt="Driver" />
        </Link>
        <Link to="/AddWorkForm" state={{ role: 'painter' }}>
          <img src={images} width="80px" alt="Painter" />
        </Link>
      </div>
    </div>
  );
}

export default Buttons;
