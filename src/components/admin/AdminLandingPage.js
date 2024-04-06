import React, { useState, useEffect} from 'react';

import '../landingpage.css';

import {onAuthStateChanged} from "firebase/auth";
import {auth} from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import AdminLandingHeader from './AdminLandingHeader.js';
import AdminLowerLandingPage from './AdminLowerLandingPage.js';
import AdminLandingInformation from './AdminLandingInformation.js';
import AdminLandingDo from './AdminLandingDo.js';
import AdminLandingGetStarted from './AdminLandingGetStarted.js';
import AdminLandingFooter from './AdminLandingFooter.js';


function AdminLandingPage() {

const navigate = useNavigate();


useEffect(() => {       //navgate to login
    onAuthStateChanged(auth, (user) => {
        if (!user || user.email!=="admin@thinklabsai.com") {
            navigate("/admin");
        }
    });
}, [navigate]);


  const [selectedHeader, setSelectedHeader] = useState(null);


  const handleonValueChange = (selectedText) => {
    setSelectedHeader(selectedText);
  };


  useEffect(() => 
  {
    if(selectedHeader==='Home')
    {
      if(localStorage.getItem('loggedIn')===true)
      {
        navigate("/adminchatbot");
      }
      else
      {
        navigate("/adminlandingpage");
      }
      
    }
    if(selectedHeader==='Contact')
    {
      navigate("/contact");
    }
    
  }, [selectedHeader, navigate]); 



  return (
    <div>
      <div style={{marginLeft: "3%", marginRight: "0%", marginTop:'.5%', marginBottom:'.5%', color: 'white',}}>
        
        <AdminLandingHeader onValueChange={handleonValueChange}/>
      </div>

      <AdminLowerLandingPage/>

      <AdminLandingInformation/>

      <AdminLandingDo/>

      <AdminLandingGetStarted/>


      <AdminLandingFooter/> 
        
    </div>
  )
}

export default AdminLandingPage