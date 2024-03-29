import React, {useState, useEffect} from 'react'

import Chatbot from './Chatbot.js'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';

import { useNavigate } from 'react-router-dom';

import Leftbar from './Leftbar.js';
import { 
  Grid, Icon,  Sidebar,
  
   } from 'semantic-ui-react';

import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [visible, setVisible] = useState(false);
  const [chat, setchat] = useState(1);

  const [newanswer, setNewAnswer] = useState(1);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const handleToggle = () => {
    setVisible(!visible);
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

  const isDesktop = () => {
    return window.matchMedia('(min-width: 1000px)').matches;
  };

  const handleSidebarHide = () => {
    if (!isDesktop()) {
      setVisible(false);
    }
  };

  return (

    <div>     
      <Grid>
          <Grid.Column width={16} only='computer'>           

          <main style={{ minHeight: '100vh' }}>
            <div id='left-area' style={{ position: 'fixed', display: 'flex', height: '100vh', zIndex: 1 }}>
              {visible && (
                <nav style={{ flex: 1, overflowY: 'auto', width: '300px' }}>
                  <Leftbar email={email} newanswer={newanswer} onnewchat={handlenewchat} />
                </nav>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70px',
                  cursor: 'pointer',
                  background: 'transparent',
                  zIndex: 2, // Ensure the Icon div is above other elements
                  position: 'relative' // Adjust position to enable click interaction
                }}
                onClick={handleToggle} // Make the entire div clickable
              >
                <Icon name={visible ? 'chevron left' : 'chevron right'} style={{ alignSelf: 'center', marginBottom: 0 }} />
              </div>
            </div>
            <div id='right-area' style={{ marginLeft: `${visible ? '300px' : '0px'}` }}>
              <Chatbot email={email} visible={visible} chat={chat} onVisibleChange={handleVisibleChange} onNewAnswer={handleNewAnswer} />
            </div>
          </main>


          </Grid.Column>        

          <Grid.Column width={16} only='tablet mobile'>
            
            <div>
              <Sidebar
                as={Grid}
                animation='overlay'
                icon='labeled'
                onHide={handleSidebarHide}
                vertical
                visible={visible}
                width='thin'
                className='fixed-sidebar' // Apply custom CSS class
              >
                <div className={`ui inverted  left demo vertical overlay wide sidebar labeled icon Grid ${visible ? 'visible' : ''}`} 
                style={{paddingTop:'1%',  paddingLeft:'1%', paddingRight:'1%', overflowX:'hidden', backgroundColor:'white'}}>
                <Grid>
                  <Leftbar email={email} newanswer={newanswer} onnewchat={handlenewchat}/>
                </Grid>
              </div>
              </Sidebar>

              <Sidebar.Pusher dimmed={visible}>
                
                  
                  {/* Add your scrollable main body content here */}
                  <div className='main-content'>
                    <Chatbot email={email} visible={visible} chat={chat} onHide={() => setVisible(false)} onVisibleChange={handleVisibleChange} onNewAnswer={handleNewAnswer}/>
                  </div>
                
              </Sidebar.Pusher>
            </div>


            <div>
              {/* Sidebar */}
              <div className={`ui inverted  left demo vertical overlay wide sidebar labeled icon Grid ${visible ? 'visible' : ''}`} 
                style={{paddingTop:'1%',  paddingLeft:'1%', paddingRight:'1%', overflowX:'hidden', backgroundColor:'white'}}>
                <Grid>
                  <Leftbar email={email} newanswer={newanswer} onnewchat={handlenewchat}/>
                </Grid>
              </div>

              {/* Pusher */}
              <div className={`pusher`}>        
              </div>

              
            </div>
          </Grid.Column>

      </Grid> 
                    
    </div>
  )
}

export default Dashboard