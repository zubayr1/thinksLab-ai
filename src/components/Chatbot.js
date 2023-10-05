import React, {useState, useEffect} from 'react'
import { Grid, Segment, Message, Image, Icon, TextArea } from 'semantic-ui-react'

import "./chatbot.css";
import axios from 'axios';

import logo from "../assets/logo.png";
import woman from "../assets/woman.png";

import loader from "../assets/loader.gif";

import TextareaAutosize from 'react-textarea-autosize';

function Chatbot() {

  const [question, setQuestion] = useState('');

  const [loading, setLoading] = useState(false);
  
  const [storedPromptList, setStoredPromptList] = useState([]);


  useEffect(() => {
    const storedPromptList = JSON.parse(localStorage.getItem('promptList') || '[]');
    setStoredPromptList(storedPromptList);

    console.log(storedPromptList);
  }, []);

  

  const handle_input_change = (e) =>
  {
    setQuestion(e.target.value)
  }

  const handle_submit = async (e) =>
  {     e.preventDefault();
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
        <Segment placeholder>

          {/* Render conversation messages */}
          {storedPromptList.map((message, index) => (
          <div key={index} className={index % 2 === 0 ? 'user-message' : 'bot-message'}
           style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
            <Message
              className="hoverable-message"
              color={index % 2 === 0 ? 'blue' : 'green'}
              style={{
                display: 'inline-block', 
                maxWidth: 'auto',
                borderRadius: '10px',
              }}
            >
              <Image
                  src={index % 2 === 0 ? woman : logo} 
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