import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Message, Image, Icon, TextArea, Modal, Button } from 'semantic-ui-react'

import "./chatbot.css";
import axios from 'axios';

import logo from "../assets/logo.svg";
import woman from "../assets/woman.png";
import compact from "../assets/compact.svg";
import not_compact from "../assets/not_compact.svg";


import loader from "../assets/loader.gif";

import TextareaAutosize from 'react-textarea-autosize';

import Header from './Header.js'
import Greetings from './Greetings.js'

import {db} from "../firebase.js"
import { collection, updateDoc, arrayUnion, getDoc, addDoc, serverTimestamp, getDocs, doc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";


function Chatbot({email, visible, chat, onVisibleChange , onNewAnswer }) 
{
  const currentUrl = window.location.href;  
  const ipAddress = currentUrl.split(':')[0] +":"+currentUrl.split(':')[1];
  let baseURL = ipAddress + ":5002";
  baseURL = 'http://3.121.239.181:5002'

  
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');

  const [loading, setLoading] = useState(false);
  
  const [storedPromptList, setStoredPromptList] = useState([]);

  const [currentDateTimeString, setCurrentDateTimeString] = useState("");

  const [oddMessagesStatus, setOddMessagesStatus] = useState([]);

  const [check, setCheck] = useState(false);

  const [open, setOpen] = useState(false);

  const [localtime, setLocaltime] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const [isnewchat, setIsNewChat] = useState(false);
  
  const oneDayInMillis = 24 * 60 * 60 * 1000; 

  const MAXTOKEN = 5000;

  const [isTextareaActive, setIsTextareaActive] = useState(false);

  useEffect(()=>{       //navgate to login
    onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/login");
        } 
      });     
  }, [navigate]);


  const handleTextareaClick = () => {       // textarea focused
    setIsTextareaActive(true);
  };
  const handleTextareaBlur = () => {        // textarea blurred
    setIsTextareaActive(false);
  };


  const addDataToFirestore = useCallback(async (currentDateTimeString, data) =>       // adding chats to Firebase Firestore
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
        
        
      } 
      catch (err) 
      {
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

      } 
      catch (err) 
      {
      }

    }

  }, [email]); 




  const addReactInfoToFirestore = useCallback(async (currentDateTimeString, data, react) =>         // adding reacts to Firebase Firestore
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

      } 
      catch (err) 
      {
      }
  
  }, [email]); 




  const addwordCounttoFirestore = useCallback(async (wordcount) =>               // adding word counts to Firebase Firestore
  {
    try 
    {
      const docRef = doc(db, 'wordCounts', email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document exists, update wordcount

        const existingWordCount = docSnap.data().wordcount || 0;
        
        const updatedWordCount = wordcount + existingWordCount;

        localStorage.setItem('wordCount', updatedWordCount);

        await updateDoc(docRef, {
          wordcount: updatedWordCount,
          timestamp: new Date().getTime(), 
        });
      } else {
        // Document doesn't exist, create a new one
        await setDoc(docRef, { wordcount: wordcount, timestamp: new Date().getTime(), });
      }

    }
    catch (error) 
    {
      
      if(wordcount)
      {
        localStorage.setItem('wordCount', wordcount);
      }
    }
  }, [email]);



  function formatTimeRemaining(timeRemainingInMillis, fixedTime)            // formatting time
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



  useEffect(() =>     // get currenttime to make key in Firestore for new chats
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
  



  useEffect(() =>       // setting newchat variable after triggered from Leftbar
  {    
    setIsNewChat(true);
  }, [chat]);

  
  useEffect(() =>       // resetting chats
  {
    if(isnewchat && chat>1)
    {
      localStorage.setItem(('promptList'), []);
      setStoredPromptList([]);

      setIsNewChat(false);
      
      setCheck(true);

      setLoading(true);
        
      let selected_option = localStorage.getItem('selectedOption');

      let messagetype = "initial";

      let questions_set = parseInt(localStorage.getItem('questions_set'), 10);

      let prev = '';

      let tokens = 0;

      let question = '';

      axios.post(`${baseURL}/bot`, { email, selected_option, messagetype, questions_set, prev, tokens, question }, 
      {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => {
            // Handle response from the backend
            const { chatresponse,  } = response.data;
            
            const updatedPromptList = [...[], chatresponse];

            // Store the updated prompt list in localStorage
            localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

            localStorage.setItem('questions_set', 1);

            setStoredPromptList(updatedPromptList);

            setLoading(false);

            
          })
          .catch(error => {
            // Handle error
            console.log(error);
          });


    }
  }, [isnewchat, chat, baseURL, email, storedPromptList]);
  

  
  useEffect(() =>       // fetch FIRSTTIME chat information from backend
  {
    const storedPromptList = JSON.parse(localStorage.getItem('promptList') || '[]');
   
    if (storedPromptList.length===0 && check===false)       // no chat in local storage
    { 
      setCheck(true);

      setLoading(true);
        
      let selected_option = localStorage.getItem('selectedOption');

      let messagetype = "initial";

      let questions_set = parseInt(localStorage.getItem('questions_set'), 10);

      let prev = '';

      let tokens = 0;

      let question = ''

      axios.post(`${baseURL}/bot`, { email, selected_option, messagetype, questions_set, prev, tokens, question }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => {
            // Handle response from the backend
            const { chatresponse, } = response.data;
           
            
            const updatedPromptList = [...storedPromptList, chatresponse];

            // Store the updated prompt list in localStorage
            localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

            localStorage.setItem('questions_set', 1);

            setStoredPromptList(updatedPromptList);

            setLoading(false);

            
          })
          .catch(error => {
            // Handle error
            console.log(error);
          });
 

    }
    else          // chat already in local storage
    {
      localStorage.setItem('promptList', JSON.stringify(storedPromptList));
      setStoredPromptList(storedPromptList);

      const currentDateTimeString = localStorage.getItem('currentDateTimeString');

      setCurrentDateTimeString(currentDateTimeString);

      const oddmessagesstatus = JSON.parse(localStorage.getItem('oddmessagesstatus') || '[]');

      setOddMessagesStatus(oddmessagesstatus);

    }    

  }, [check, currentDateTimeString, email, baseURL]);




  const handle_input_change = (e) =>    // store question
  {
    setQuestion(e.target.value)
  }



  const handle_submit = async (e) =>        // get AI output from backend based on user question
  {     
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    let tokens = 0;

    let storedTimestamp = new Date().getTime();
    
    
    try 
    {
      const docRef = doc(db, 'wordCounts', email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        tokens = data.wordcount;
        storedTimestamp = data.timestamp
      } 
    } 
    catch (error) 
    {
      tokens = 0;
    }
    
            
    
    const storedTimestampValue = parseInt(storedTimestamp, 10);
    
    const currentTime = new Date().getTime();
    

    if (currentTime - storedTimestampValue >= oneDayInMillis) 
    {        
      
      if (tokens> MAXTOKEN)
      {           
        await addwordCounttoFirestore(0);
      }

    }
    else
    { 
      setLocaltime(formatTimeRemaining(currentTime - storedTimestampValue, oneDayInMillis));       
      
    }
    
        

    if (tokens<= MAXTOKEN)
    { 
      if (question!=="" && !submitted)
      {     
        setSubmitted(true);

        const prev = storedPromptList;

        const updatedPromptList = [...storedPromptList, question];

        // Store the updated prompt list in localStorage
        localStorage.setItem('promptList', JSON.stringify(updatedPromptList));

        setStoredPromptList(updatedPromptList);
       
        
        let selected_option = localStorage.getItem('selectedOption');

        let messagetype = "next";

        localStorage.setItem('questions_set', parseInt(localStorage.getItem('questions_set'), 10)+1);

        let questions_set = parseInt(localStorage.getItem('questions_set'), 10);       

        axios.post(`${baseURL}/bot`, { email, selected_option, messagetype, questions_set, prev, tokens, question }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => 
          {
            // Handle response from the backend
            const { chatresponse, wordsCount } = response.data;

            setQuestion('');

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
            await addwordCounttoFirestore(wordsCount);

            onNewAnswer(true);

          })
          .catch(async () => {            

            const chatresponse = `We apologise for the inconvenience. It appears that an error has occurred. If the problem persists, 
            please contact us at hello@thinklabsai.co.uk or try refreshing your browser. Thank you for your patience.`

            let wordsCount = 31;           

            try 
            {
              const docRef = doc(db, 'wordCounts', email);
              const docSnap = await getDoc(docRef);
        
              if (docSnap.exists()) 
              {
                
                const existingData = docSnap.data();
                wordsCount = existingData.wordcount + wordsCount;
                
              } 
              else 
              {
                wordsCount = wordsCount + parseInt(localStorage.getItem('wordCount')) || 0;
              }
        
            } 
            catch (error) 
            {
              wordsCount = wordsCount + parseInt(localStorage.getItem('wordCount')) || 0;
            }
            

            setQuestion('');

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
            await addwordCounttoFirestore(wordsCount);

            onNewAnswer(true);
            
          });                
      }
    }
    else
    {       
      setLoading(false);
      setOpen(true);
    }
    
  }




  const handle_like =async (i) =>     //handle LIKE react
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


  const handle_dislike =async (i) =>      //handle DISLIKE react
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
    <div style={{ width: visible ? '85%' : '100%', backgroundColor:'#eff5fa' }}>

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


      <Grid centered>

        <Grid.Column verticalAlign='middle' width={16} only='computer tablet'>

          <Header visible={visible} onVisibleChange={onVisibleChange} />

          <div style={{minHeight:'90vh'}}>

            <div style={{paddingLeft:'15%', paddingRight:'15%', paddingTop:'15%', paddingBottom:'10%', }}>


              <Greetings/>
          
              {/* Render conversation messages */}
              {storedPromptList.map((message, index) => (
                
              <div key={index} className={index % 2 === 0 ? 'bot-message' : 'user-message'}
              style={{marginLeft: '2%', textAlign: index % 2 === 0 ? 'left' : 'right'}}>

              {index % 2 === 0 ? ( // Check if index is even
                
                <Message                                            
                  style={{
                    display: 'inline-block', 
                    maxWidth: 'auto',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    color: '#000',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >                                  

                  <Grid centered>
                    <Grid.Column width={2} verticalAlign='top'>
                      <div style={{ width: '30px', height: '30px' }}>
                        <Image src={logo} style={{ width: '100%', height: '100%' }} />
                      </div>
                    </Grid.Column>

                    <Grid.Column floated='left' width={12} >
                      <div style={{ flexGrow: 1, marginLeft: '1rem' }}>
                        <p style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 'bold' }}>Career Mate</p>
                        <div style={{ marginTop: '2%' }}>
                          {message.split('\n').map((line, i) => (
                            <React.Fragment key={i}>                              
                                <span style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                                  {line}
                                </span>
                              {i < message.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </Grid.Column>

                    <Grid.Column width={2}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
                        <Icon onClick={() => handle_like(index)} style={{ cursor: 'pointer' }} name={oddMessagesStatus[index/2] === 1 ? 'thumbs up' : 'thumbs up outline'} />
                        <Icon onClick={() => handle_dislike(index)} style={{ cursor: 'pointer' }} name={oddMessagesStatus[index/2] === -1 ? 'thumbs down' : 'thumbs down outline'} />
                      </div>
                    </Grid.Column>
                  </Grid>
                                                      
                </Message>
                  
              ) : 
              (
                <div>

                  <Message                   
                    style={{
                      display: 'inline-block', 
                      maxWidth: 'auto',
                      borderRadius: '10px',
                      backgroundColor: '#2971ea',
                      color: '#fff',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >

                    <Grid centered>
                      <Grid.Column width={2} verticalAlign='top'>
                        <div style={{ width: '30px', height: '30px' }}>
                          <Image src={woman} style={{ width: '100%', height: '100%' }} />
                        </div>
                      </Grid.Column>


                      <Grid.Column floated='left' width={12} >
                        <div style={{ flexGrow: 1, marginLeft: '1rem' }}>
                          <p style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 'bold' }}>You</p>
                          <div style={{ marginTop: '2%' }}>
                            {message.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                <span style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                                  {line}
                                </span>
                                {i < message.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </Grid.Column>

                    </Grid>
                    
                                  
                  </Message>

                </div>)
              }
                
                
              </div>
              ))}

              {layout}

            </div>
          </div>

          <div
          className="border d-flex align-items-center justify-content-center"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              backgroundColor: 'white',
              boxShadow: isTextareaActive
                ? '0px -5px 10px rgba(0, 0, 0, 0.2)'
                : '0px -2px 5px rgba(0, 0, 0, 0.1)',
              padding: '5px',              
              maxHeight: '90%', 
              border: '1px solid #ccc',  
              borderRadius: '8px', 
              fontFamily:'Inter',
              fontSize:'1.0rem'    ,       
            }}
          >
            <div
            className="border d-flex align-items-center"
              style={{                
                position: 'relative',
                backgroundColor:'white',   
                
              }}
            >
              <TextareaAutosize
                placeholder='Write your questions...'
                minRows={3}
                maxRows={10}
                value={question}
                onChange={handle_input_change}
                spellCheck={false}
                onKeyDown={(e) => {
                  if (e.shiftKey && e.key === 'Enter') {
                    // Insert a newline character in the text area
                    setQuestion((prevQuestion) => prevQuestion);
                  } else if (e.key === 'Enter') {
                    // Handle the regular submission behavior
                    handle_submit(e);
                  }
                }}
                onClick={handleTextareaClick}
                onBlur={handleTextareaBlur}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  paddingLeft: "1%",                   
                }}
              />
              <Image
                src={isTextareaActive ? compact : not_compact}
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
          
          


        </Grid.Column>

      </Grid>
    
        

        <Grid>
            <Grid.Row only='computer tablet'>

            


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
