import React, {useState, useEffect} from 'react'
import { Grid, Segment, Message, Image, Icon, TextArea, Modal, Button } from 'semantic-ui-react'

import "./chatbot.css";
import axios from 'axios';

import logo from "../assets/logo.png";
import woman from "../assets/woman.png";

import loader from "../assets/loader.gif";

import TextareaAutosize from 'react-textarea-autosize';

import {returnSet} from "./initial_question_set.js";

function Chatbot(email) {

  const [question, setQuestion] = useState('');

  const [loading, setLoading] = useState(false);
  
  const [storedPromptList, setStoredPromptList] = useState([]);

  const [check, setCheck] = useState(false);

  const [open, setOpen] = useState(false);

  const [localtime, setLocaltime] = useState(0);

  const oneDayInMillis = 24 * 60 * 60 * 1000; 

  const MAXTOKEN = 5000;

  function formatTimeRemaining(timeRemainingInMillis, fixedTime) 
  {
    const oneMinuteInMillis = 60 * 1000;
    const oneHourInMillis = 60 * oneMinuteInMillis;
    const oneDayInMillis = 24 * oneHourInMillis;

    
  
    if (timeRemainingInMillis < oneMinuteInMillis) 
    {
      let seconds = Math.floor(timeRemainingInMillis / 1000);
      seconds = fixedTime/1000 - seconds;
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    } 
    else if (timeRemainingInMillis < oneHourInMillis) 
    {
      let minutes = Math.floor(timeRemainingInMillis / oneMinuteInMillis);
      minutes = fixedTime/(1000*60) - minutes;
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } 
    else if (timeRemainingInMillis < oneDayInMillis) 
    {
      let hours = Math.floor(timeRemainingInMillis / oneHourInMillis);
      hours = fixedTime/(1000*60*60) - hours;
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } 
    else 
    {
      let days = Math.floor(timeRemainingInMillis / oneDayInMillis);
      days = fixedTime/(1000*60*60*24) - days;
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  }

  useEffect(() => 
  {

    const storedPromptList = JSON.parse(localStorage.getItem('promptList') || '[]');
    
    if (storedPromptList.length===0 && check===false)
    { 
      setCheck(true);

      let val = returnSet(1, 20);

      const updatedPromptList = [...storedPromptList, val];

      // Store the updated prompt list in localStorage
      localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

      setStoredPromptList(updatedPromptList);

    }
    else
    {
      localStorage.setItem('promptList', JSON.stringify(storedPromptList));
      setStoredPromptList(storedPromptList);
    }
    

  }, [check]);

  

  const handle_input_change = (e) =>
  {
    setQuestion(e.target.value)
  }



  const handle_submit = async (e) =>
  {     
    e.preventDefault();

    let tokens = localStorage.getItem('tokens');

    const storedTimestamp = localStorage.getItem('timestamp');

    if (!tokens || tokens==="NaN")
    {
      tokens=0;
    }
            
    if(storedTimestamp>0)
    {
      const storedTimestampValue = parseInt(storedTimestamp, 10);
      
      const currentTime = new Date().getTime();

      if (currentTime - storedTimestampValue >= oneDayInMillis) 
      {        
        // Update the timestamp to the current time
        localStorage.setItem('timestamp', 0);


        if (tokens> MAXTOKEN)
        { 
          localStorage.setItem('tokens', 0);
        }

      }
      else
      { 
        setLocaltime(formatTimeRemaining(currentTime - storedTimestampValue, oneDayInMillis));
        localStorage.setItem('timestamp', currentTime - storedTimestampValue);
        
      }
    }
    
    
    
    if (tokens<= MAXTOKEN)
    { 
      if (question!=="")
      {     
        const updatedPromptList = [...storedPromptList, question];

        // Store the updated prompt list in localStorage
        localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

        setStoredPromptList(updatedPromptList);

        const apiUrl = '/add_question'; 
        
        // Make a POST request using Axios to add the question to the backend
        await axios.post(apiUrl, { question })
          .then((response) => {
            setLoading(true);
            setQuestion('');
            const apiUrl = '/bot'; 
              axios.get(apiUrl)
                .then((response) => {
                  setLoading(false);
                  const storedPromptList = JSON.parse(localStorage.getItem('promptList') || '[]');

                  const updatedPromptList = [...storedPromptList, response.data.prompt];
                  
                  // Store the updated prompt list in localStorage
                  localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

                  setStoredPromptList(updatedPromptList);

                  let tokens = localStorage.getItem('tokens');

                  localStorage.setItem('tokens', parseInt(tokens, 10) + parseInt(response.data.tokens, 10));
                 
                  
                })
                .catch((error) => {
                  console.error('Error fetching prompt:', error);
                });
            
          })
          .catch((error) => {
            console.error('Error sending question to backend:', error);
          });
      }
    }
    else
    { 
      const currentTimestamp = new Date().getTime();
      const storedTimestamp = localStorage.getItem('timestamp');
      
      if (!storedTimestamp)
      { 
        setLocaltime(formatTimeRemaining(currentTimestamp, oneDayInMillis));
        localStorage.setItem('timestamp', currentTimestamp);

      }
      else
      {
        const storedTimestampValue = parseInt(storedTimestamp, 10);
        // setLocaltime(formatTimeDifference(currentTimestamp - storedTimestampValue));
        localStorage.setItem('timestamp', currentTimestamp - storedTimestampValue);
      }
      
      setOpen(true);
    }
    
  }

  let layout;
  
  if (loading)
  {
    layout = <div style={{display: "flex", alignContent: "center", alignItems: "center"}}>
      <Image src={loader} alt="loader" size='tiny'/>
    </div>
  }
  else
  {
    layout = <div></div>

  }
 
    

  return (
    <div className="StyledDiv" style={{marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>

      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}          
        >
          <Modal.Header>Alert!</Modal.Header>
          <Modal.Content image>
            
            <Modal.Description>
              <p>
              {localtime === 0 ? 'Token exceeded! Cannot use for sometime!' : `Token exceeded! Cannot use for more ${localtime}!`}
              </p>
              
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Got it! Thanks!
            </Button>
            <Button
              content="Take me to Premium"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
      </Modal>
    
        <Segment placeholder>

          {/* Render conversation messages */}
          {storedPromptList.map((message, index) => (
          <div key={index} className={index % 2 === 0 ? 'bot-message' : 'user-message'}
           style={{ textAlign: index % 2 === 0 ? 'left' : 'right' }}>
            <Message
              className="hoverable-message"
              color={index % 2 === 0 ? 'green' : 'blue'}
              style={{
                display: 'inline-block', 
                maxWidth: 'auto',
                borderRadius: '10px',
              }}
            >
              <Image
                  src={index % 2 === 0 ? logo : woman} 
                  size="mini"
                  circular
                  />
              <p>{message}</p>
              
                            
            </Message>
          </div>
          ))}
            {layout}
        </Segment>

        <Grid>
            <Grid.Row only='computer tablet'>

            <div
              style={{
                position: 'fixed',
                bottom: 0,
                left: '20%',
                width: '60%',
                backgroundColor: 'white',
                boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.2)',
                padding: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start', // Align the content to the top
                maxHeight: '80%',
                marginBottom: "2%"
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              >
                <TextareaAutosize
                  placeholder='Write your questions...'
                  minRows={3}
                  maxRows={10}
                  value={question}
                  onChange={handle_input_change}
                  onKeyDown={(e) => {
                    if (e.shiftKey && e.key === 'Enter') {
                      // Insert a newline character in the text area
                      setQuestion((prevQuestion) => prevQuestion);
                    } else if (e.key === 'Enter') {
                      // Handle the regular submission behavior
                      handle_submit(e);
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    paddingLeft: "1%"
                  }}
                />
                <Icon
                  name='arrow alternate circle right large'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: '1',
                  }}
                  onClick={handle_submit}
                />
              </div>
            </div>


            </Grid.Row>


            <Grid.Row only='mobile'>

                <div
                style={{
                position: 'fixed',
                bottom: 0,
                left: '10%', /* Adjust the left position to make the div 60% of the screen */
                width: '80%',
                backgroundColor: 'white',
                boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.2)', // Adding an elevation shadow
                padding: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '4%',
                height: "7%",
                
                }}
                >
                  <div style={{ position: 'relative', width: "100%", height: "100%", resize: 'none',}}>
                      <Icon name='arrow alternate circle right large' 
                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '1' }}
                        onClick={handle_submit}
                      />
                      <TextArea placeholder='Write your questions...' 
                        style={{ width: '100%', height: '100%', border: 'none', outline: 'none', resize: 'none', maxHeight: "100%", paddingLeft: "1%"}}
                        onChange={handle_input_change}  value={question}
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === 'Enter') {
                            // Insert a newline character in the text area
                            setQuestion((prevQuestion) => prevQuestion);
                          } else if (e.key === 'Enter') {
                            // Handle the regular submission behavior
                            handle_submit(e);
                          }
                        }}
                        />
                  </div>
                </div>

            </Grid.Row>
        </Grid>

        
    </div>
  )
}

export default Chatbot