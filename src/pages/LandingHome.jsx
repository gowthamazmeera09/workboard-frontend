import React from 'react'
import welcomeimage from '../images/workboard-main-image-removebg.png';
import { TbMarquee } from 'react-icons/tb';

function LandingHome() {
  return (
    <div>
        <div className="flex items-center justify-center my-20">
        <img src={welcomeimage } width='300px' className="welcome-image" />
      </div>
    </div>
  )
}

export default LandingHome;