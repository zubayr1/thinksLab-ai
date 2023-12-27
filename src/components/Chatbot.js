import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Segment, Message, Image, Icon, TextArea, Modal, Button } from 'semantic-ui-react'

import "./chatbot.css";
import axios from 'axios';

import logo from "../assets/logo.png";
import woman from "../assets/woman.png";

import loader from "../assets/loader.gif";

import TextareaAutosize from 'react-textarea-autosize';

import {returnSet} from "./initial_question_set.js";

// import OpenAI from 'openai';

import {db} from "../firebase.js"
import { collection, updateDoc, arrayUnion, getDoc, addDoc, serverTimestamp, getDocs, doc } from 'firebase/firestore'



function Chatbot({email}) {

  const [question, setQuestion] = useState('');

  const [loading, setLoading] = useState(false);
  
  const [storedPromptList, setStoredPromptList] = useState([]);

  const [currentDateTimeString, setCurrentDateTimeString] = useState("");

  const [oddMessagesStatus, setOddMessagesStatus] = useState([]);

  const [check, setCheck] = useState(false);

  const [open, setOpen] = useState(false);

  const [localtime, setLocaltime] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const oneDayInMillis = 24 * 60 * 60 * 1000; 

  const MAXTOKEN = 5000;

  // const openaiApiKey = process.env.REACT_APP_OPENAI_API;

  // const openai = new OpenAI({
  //   apiKey: openaiApiKey,
  //   dangerouslyAllowBrowser: true
  // });


  const addDataToFirestore = useCallback(async (currentDateTimeString, data) => 
  {    
    const combinedPath = 'dataset/' + email + '/'+ currentDateTimeString;
    const collectionRef = collection(db, combinedPath);
  
    let firstDocumentId="";

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      firstDocumentId = doc.id;

      return;
    });

    if (firstDocumentId!=="")
    { 
      try 
      {
        const docRefchild = doc(db, combinedPath, firstDocumentId);

        const docSnapshot = await getDoc(docRefchild);  
        
        const existing = docSnapshot.data();

        const existingData = existing.data;
        const newData = data;

        const newElements = newData.filter(element => !existingData.includes(element));

        await updateDoc(docRefchild, {
          data: arrayUnion(...newElements)
        });
        
        
      } catch (err) {
        console.error('Error:', err);
      }
    }
    else
    {
      try 
      {
        await addDoc(collectionRef, {
          id: currentDateTimeString,
          data: data,
          timestamp: serverTimestamp()
        })

      } catch (err) {
        console.log(err);
      }

    }

  }, [email]); 


  const addReactInfoToFirestore = useCallback(async (currentDateTimeString, data, react) => 
  { 
    const combinedPath = 'reactions/' + email + '/'+ currentDateTimeString;
    const collectionRef = collection(db, combinedPath);

    try 
      {
        await addDoc(collectionRef, {
          id: currentDateTimeString,
          data: data,
          react: react,
          timestamp: serverTimestamp()
        })

      } catch (err) {
        console.log(err);
      }
  
  }, [email]); 


  function formatTimeRemaining(timeRemainingInMillis, fixedTime) 
  {
    timeRemainingInMillis = parseInt(timeRemainingInMillis, 10);
    const oneMinuteInMillis = 60 * 1000;
    const oneHourInMillis = 60 * oneMinuteInMillis;
    // const oneDayInMillis = 24 * oneHourInMillis;

    let seconds = Math.floor(timeRemainingInMillis / 1000);
    seconds = fixedTime/1000 - seconds;

    if (seconds<=60)
    {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    let minutes = Math.floor(timeRemainingInMillis / oneMinuteInMillis);
    minutes = fixedTime/(1000*60) - minutes;

    if (minutes<=60)
    {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    let hours = Math.floor(timeRemainingInMillis / oneHourInMillis);
    hours = fixedTime/(1000*60*60) - hours;
    return `${hours} hour${hours !== 1 ? 's' : ''}`;

  
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

      const currentDateTimeString = localStorage.getItem('currentDateTimeString');

      setCurrentDateTimeString(currentDateTimeString);

      const oddmessagesstatus = JSON.parse(localStorage.getItem('oddmessagesstatus') || '[]');

      setOddMessagesStatus(oddmessagesstatus);

    }
    

  }, [check, currentDateTimeString]);

  

  useEffect(() =>
  {
    const storedPromptList = JSON.parse(localStorage.getItem('promptList') || '[]');
    
    const fetchData = async () => {
      if (storedPromptList.length === 1) {
        const currentDateTime = new Date();
        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(currentDateTime.getDate()).padStart(2, '0');
        const hours = String(currentDateTime.getHours()).padStart(2, '0');
        const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
  
        const currentDateTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
        setCurrentDateTimeString(currentDateTimeStr);
        localStorage.setItem('currentDateTimeString', currentDateTimeStr);
  
      }
  
      const existingArrayJSON = localStorage.getItem('oddMessagesStatus');
      const existingArray = existingArrayJSON ? JSON.parse(existingArrayJSON) : [];
      setOddMessagesStatus(existingArray);

      localStorage.setItem('oddmessagesstatus', JSON.stringify(existingArray));
    };
  
    fetchData();

  }, [])
  
  


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
      if (question!=="" && !submitted)
      {     
        setSubmitted(true);

        const updatedPromptList = [...storedPromptList, question];

        // Store the updated prompt list in localStorage
        localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

        setStoredPromptList(updatedPromptList);

        setLoading(true);
        // const chatCompletion = await openai.chat.completions.create({
        //   messages: [{ role: 'user', content: question }],
        //   model: 'gpt-3.5-turbo',
        // });

        let selected_option = localStorage.getItem('usertype');

        axios.post('http://127.0.0.1:5000/bot', { email, selected_option }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => {
            // Handle response from the backend
            const { chatresponse, wordsCount } = response.data;
            console.log('aa');
            
            setQuestion('');

            let currenttoken = parseInt(wordsCount, 10);
            let prevtoken = parseInt(tokens, 10);
            localStorage.setItem('tokens', prevtoken + currenttoken);

            const storedPromptListA = JSON.parse(localStorage.getItem('promptList') || '[]');

            const updatedPromptList1 = [...storedPromptListA, chatresponse];
            
            // Store the updated prompt list in localStorage
            localStorage.setItem('promptList', JSON.stringify(updatedPromptList1));

            setStoredPromptList(updatedPromptList1);

            setCurrentDateTimeString(currentDateTimeString);

            localStorage.setItem('currentDateTimeString', currentDateTimeString);

            setLoading(false);

            setSubmitted(false);

            const existingArrayJSON = localStorage.getItem('oddMessagesStatus');

            const existingArray = existingArrayJSON ? JSON.parse(existingArrayJSON) : [];

            if (existingArray.length===0)
            {
              existingArray.push(0);
            }

            existingArray.push(0);

            localStorage.setItem('oddMessagesStatus', JSON.stringify(existingArray));

            setOddMessagesStatus(existingArray);

            localStorage.setItem('oddmessagesstatus', JSON.stringify(existingArray));

            await addDataToFirestore(currentDateTimeString, updatedPromptList1);

          })
          .catch(error => {
            // Handle error
            console.log(error);
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
 
  const handle_like =async (i) =>
  {
    const index = parseInt(i/2, 10);

    const existingArrayJSON = localStorage.getItem('oddMessagesStatus');

    let existingArray = existingArrayJSON ? JSON.parse(existingArrayJSON) : [];

    if(existingArray.length===0)
    {
      existingArray=[1]
      localStorage.setItem('oddMessagesStatus', JSON.stringify(existingArray));

      setOddMessagesStatus(existingArray)
      localStorage.setItem('oddmessagesstatus', JSON.stringify(existingArray));

      
    }
    else
    {
      existingArray = [...existingArray];

      existingArray[index] = 1
  
      localStorage.setItem('oddMessagesStatus', JSON.stringify(existingArray));
  
      setOddMessagesStatus(existingArray);
      localStorage.setItem('oddmessagesstatus', JSON.stringify(existingArray));


      await addReactInfoToFirestore(currentDateTimeString, storedPromptList[parseInt(i, 10)], 1);
    }
        
  }


  const handle_dislike =async (i) =>
  {
    const index = parseInt(i/2, 10);

    const existingArrayJSON = localStorage.getItem('oddMessagesStatus');

    let existingArray = existingArrayJSON ? JSON.parse(existingArrayJSON) : [];

    if(existingArray.length===0)
    {
      existingArray=[-1]
      localStorage.setItem('oddMessagesStatus', JSON.stringify(existingArray));

    }
    else
    {
      existingArray = [...existingArray];
      existingArray[index] = -1
  
      localStorage.setItem('oddMessagesStatus', JSON.stringify(existingArray));

      setOddMessagesStatus(existingArray);
      localStorage.setItem('oddmessagesstatus', JSON.stringify(existingArray));


      await addReactInfoToFirestore(currentDateTimeString, storedPromptList[parseInt(i, 10)], -1);
    }
          
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
           style={{marginLeft: '2%', textAlign: index % 2 === 0 ? 'left' : 'right'}}>

          {index % 2 === 0 ? ( // Check if index is even
            <Grid>
              <Grid.Row columns={1}>
                <Message
                  // className="hoverable-message"
                  // color={index % 2 === 0 ? '#cbcbe0' : '#0e38cf'}
                  style={{
                    display: 'inline-block', 
                    maxWidth: 'auto',
                    borderRadius: '10px',
                    backgroundColor: index % 2 === 0 ? '#cbcbe0' : '#0e38cf',
                    color: index % 2 === 0 ? '#000' : '#fff'
                  }}
                >
                  <Image
                      src={index % 2 === 0 ? logo : woman} 
                      size="mini"
                      circular
                      />
                  

                  {message.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  
                                
                </Message>

              </Grid.Row>

              <Grid.Row >
                <Grid style={{marginLeft: '2%', marginTop:'-30px'}}>
                  <Grid.Column >
                    <Icon onClick={() => handle_like(index)} style={{cursor: 'pointer'}}
                      name={oddMessagesStatus[index/2] === 1
                        ? 'thumbs up'
                        : 'thumbs up outline'
                      }
                    />
                  </Grid.Column>

                  <Grid.Column >
                    <Icon onClick={() => handle_dislike(index)} style={{cursor: 'pointer'}}
                    name={oddMessagesStatus[index/2] === -1
                      ? 'thumbs down'
                      : 'thumbs down outline'
                    }
                    />
                  </Grid.Column>
                </Grid>

              </Grid.Row>
            </Grid>
          ) : 
          (
            <div>

              <Message
                className="hoverable-message"
                // color={index % 2 === 0 ? '#cbcbe0' : '#0e38cf'}
                style={{
                  display: 'inline-block', 
                  maxWidth: 'auto',
                  borderRadius: '10px',
                  backgroundColor: index % 2 === 0 ? '#cbcbe0' : '#0e38cf',
                  color: index % 2 === 0 ? '#000' : '#fff'
                }}
              >
                <Image
                    src={index % 2 === 0 ? logo : woman} 
                    size="mini"
                    circular
                    />
                

                {message.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
                
                              
              </Message>

            </div>)
          }
            
            
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