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
  const [chat, setchat] = useState(1);

  const [newanswer, setNewAnswer] = useState(1);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const handlenewchat = (newchat) => 
  { 
    if(newchat)
      setchat(chat + 1);
  };

  const handleNewAnswer = (answer) =>
  {
    if(answer)
      setNewAnswer(newanswer + 1);
  }

  
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
            <Leftbar email={email} newanswer={newanswer} onnewchat={handlenewchat}/>
          </Grid>
        </div>

        {/* Pusher */}
        <div className="pusher">        
          <Chatbot email={email} visible={visible} chat={chat} onVisibleChange={handleVisibleChange} onNewAnswer={handleNewAnswer}/>
        </div>

        
      </div>
            
    </div>
  )
}

export default Dashboard