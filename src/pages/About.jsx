import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

function About() {
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();

  useEffect(()=>{
    if(!userId){
      alert("user not found")
      Navigate('/')
    }
  },[])
  return (
    

    <div>About</div>
  )
}

export default About;