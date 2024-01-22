import React, { useState, useEffect} from 'react';

import "@fontsource/montserrat";
import './landingpage.css';

import LowerLandingPage from './LowerLandingPage.js';
// import LandingTour from './LandingTour.js';
import LandingDo from './LandingDo.js';
import LandingFooter from './LandingFooter.js';
// import LandingPartners from './LandingPartners.js';
import LandingInformation from './LandingInformation.js';
import LandingHeader from './LandingHeader.js';
import LandingGetStarted from './LandingGetStarted.js';


function LandingPage() {

  
  const redirectToForm = () => {
    window.location.href = 'https://forms.office.com/e/ydSj3ZQ7k5';
  };
  

  const [selectedHeader, setSelectedHeader] = useState(null);


  const handleonValueChange = (selectedText) => {
    setSelectedHeader(selectedText);
  };


  useEffect(() => 
  {
    if(selectedHeader==='Contact')
    {
      redirectToForm();
    }
    
  }, [selectedHeader]); 



  return (
    <div>
      <div style={{marginLeft: "3%", marginRight: "0%", marginTop:'.5%', marginBottom:'.5%', color: 'white'}}>
        
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