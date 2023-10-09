import React, { useState, useEffect } from 'react'
import Header from './Header'
import Greetings from './Greetings'
import Chatbot from './Chatbot'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail(user.email);

          const apiUrl = '/save_email';

          axios.post(apiUrl, { email: email})
            .then((response) => {
            })
            .catch((error) => {
            });

        } 
        else 
        {
          navigate("/login");
        }
      });
     
  }, [navigate, email]);

  return (

    <div>
        <Header/>

        <Greetings/>

        <Chatbot onauthchange={email}/>
    </div>
  )
}

export default Dashboard