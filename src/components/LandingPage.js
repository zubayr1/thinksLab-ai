import React, { useState, useEffect} from 'react';

// import "@fontsource/Inter";
import './landingpage.css';

import LowerLandingPage from './LowerLandingPage.js';
// import LandingTour from './LandingTour.js';
import LandingDo from './LandingDo.js';
import LandingFooter from './LandingFooter.js';
// import LandingPartners from './LandingPartners.js';
import LandingInformation from './LandingInformation.js';
import LandingHeader from './LandingHeader.js';
import LandingGetStarted from './LandingGetStarted.js';

import { useNavigate } from 'react-router-dom';


function LandingPage() {

  const navigate = useNavigate();

  const [selectedHeader, setSelectedHeader] = useState(null);


  const handleonValueChange = (selectedText) => {
    setSelectedHeader(selectedText);
  };


  useEffect(() => 
  {
    if(selectedHeader==='Contact')
    {
      navigate("/contact");
    }
    
  }, [selectedHeader, navigate]); 



  return (
    <div>
      <div style={{marginLeft: "3%", marginRight: "0%", marginTop:'.5%', marginBottom:'.5%', color: 'white',}}>
        
        <LandingHeader onValueChange={handleonValueChange}/>
      </div>

      <LowerLandingPage/>

      <LandingInformation/>

      <LandingDo/>

      <LandingGetStarted/>


      <LandingFooter/> 
        
    </div>
  )
}

export default LandingPage