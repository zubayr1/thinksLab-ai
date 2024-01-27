import React, {useState, useEffect} from 'react'

import Chatbot from './Chatbot.js'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';

import { useNavigate } from 'react-router-dom';

import Leftbar from './Leftbar.js';
import { 
  Grid, 
   } from 'semantic-ui-react';

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [visible, setVisible] = useState(false);


  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail(user.email);
          
        } 
        else 
        {
          navigate("/login");
        }
      });
     
  }, [navigate, email]);

  

  return (

    <div>
      
      <div>
        {/* Sidebar */}
        <div className={`ui left demo vertical sidebar labeled icon Grid ${visible ? 'visible' : ''}`} 
          style={{paddingTop:'1%', width: '17%', paddingLeft:'1%', paddingRight:'1%', overflowX:'hidden', backgroundColor:'white'}}>
          <Grid>
            <Leftbar email={email}/>
          </Grid>
        </div>

        {/* Pusher */}
        <div className="pusher">        
          <Chatbot email={email} visible={visible} onVisibleChange={handleVisibleChange} />
        </div>

        {/* Toggle Button */}
        
      </div>
            
    </div>
  )
}

export default Dashboard