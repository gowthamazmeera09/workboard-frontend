import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("user not found");
      Navigate('/');
    }
  }, [Navigate, userId]);

  return (
    <div>Contact</div>
  );
}

export default Contact;
