import React from 'react'
import welcomeimage from '../images/workboard-main-image-removebg.png';

function LandingHome() {
  return (
    <div>
        <div className="flex items-center justify-center">
        <img src={welcomeimage } width='300px' className="welcome-image" />
      </div>
    </div>
  )
}

export default LandingHome;