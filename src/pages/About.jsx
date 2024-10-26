import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

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
    <div>
      <div>About</div>
      <div><Footer /></div>
    </div>
  )
}

export default About;