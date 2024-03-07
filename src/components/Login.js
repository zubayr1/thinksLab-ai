import React, {useState, useEffect} from 'react'
import { Form, Grid, Image, Button, Checkbox, Segment, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/PigmentGradient.svg";
import thinklabs_logo from "../assets/loginsignuplogo.svg";
import logo from "../assets/logo.svg";


import "./head_css.css";

import {  signInWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';

function Login() {

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();  

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [linksent, setLinkSent] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");

    
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setIsChecked(true); 
    }
  }, []);


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        const storedEmail = localStorage.getItem("storedEmail");
        if (storedEmail!=="" && user.emailVerified)
        {
            if (user) 
            {            
              setEmail(user.email);
              navigate("/chatbot");
          
            } 
        }
        
        
      });
     
  }, [navigate, email]);
  

  const handle_email = (e) =>
  {
    setEmail(e.target.value);
  }

  const handle_password = (e) =>
  {
    setPassword(e.target.value);
  }

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked); 
  }

  const storeCredentialsInLocalStorage = () => {
    if (isChecked) {
      localStorage.setItem('storedEmail', email);
      localStorage.setItem('storedPassword', password);
    }
  }


//   const handleRadioChange = (e, { value }) => 
//   {
//     setSelectedOption(value);
//     localStorage.setItem('usertype', value);
//   };

  const handlelogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem('promptList');

    try 
    {
      if (email !== "" && password !== "") 
      {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Check if the user's email is verified
        if (user.emailVerified) {
          // User's email is verified
          storeCredentialsInLocalStorage();
          localStorage.setItem('loggedIn', true);
          navigate("/chatbot");
        } else {
          // User's email is not verified
          setError("Please verify your email before logging in.");
          
        }
      } else {
        setError("Email or Password is empty!");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode, errorMessage);
    }
  };


  const handlesendlinklogin = async ()=>
  {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
        sendEmailVerification(auth.currentUser);
        setError("");
        setLinkSent(true);
    }
  };
  
  

  let layout;

  if (!linksent)
  {
    if (error==="")
    {
      layout=<div></div>
    }
    else if (error==="Email or Password is empty!")
    {
      layout = <Message warning>
              <Message.Header>Something is wrong</Message.Header>
              <p>{error}</p>
          </Message>
    }
    else if (error==="Please verify your email before logging in.")
    {
      layout = <Message negative>
              <Message.Header>Authentication Error</Message.Header>
              <p>{error}</p>
                  <div style={{marginLeft:'10%', marginRight:'10%'}}>
                      <Button onClick={handlesendlinklogin} size='medium' fluid
                          style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', minWidth:'25%', color:'white',
                              borderRadius: 7, height:'10%' }}>Send Link Again
                      </Button>
  
                  </div>
                  
          </Message>
    }
    else 
    {
      layout = <Message negative>
              <Message.Header>Authentication Error</Message.Header>
              <p>{error}</p>
          </Message>
    }
  }
  else
  {
    if(error==="")
    {
        layout = <Message positive>
              <Message.Header>Verification Link Sent!</Message.Header>
              <p>Check your mail content and verify your mail id</p>
          </Message>
    }
    else
    {
        layout = <Message negative>
              <Message.Header>Authentication Error</Message.Header>
              <p>{error}</p>
                  <div style={{marginLeft:'10%', marginRight:'10%'}}>
                      <Button onClick={handlesendlinklogin} size='medium' fluid
                          style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', minWidth:'25%', color:'white',
                              borderRadius: 7, height:'10%' }}>Resend Link
                      </Button>
  
                  </div>
                  
          </Message>
    }
  }
  

  
  return (
    <div style={{position:'absolute', backgroundImage:`url(${login_img})`, width:'100%',
    height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', overflow:'hidden'}}>

        <Grid  style={{ height: '100vh' }}>

            <Grid.Column width={6} verticalAlign='middle' floated='right' only='computer'>                
                <Grid>
                    <Grid.Row>
                        <Image src={thinklabs_logo} />
                    </Grid.Row>

                    <Grid.Row>
                        <p style={{ fontFamily: 'Inter', fontSize: '2rem', color: '#ffffff', fontWeight: 'bold' }}>
                            Welcome to ThinkLabsAI Career Mate!
                        </p>
                    </Grid.Row>
                </Grid>
                    
            </Grid.Column>

            <Grid.Column width={8} verticalAlign='middle' only='computer'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    marginTop: '20%',
                    width: '60%', 
                    margin: '0 auto', 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    paddingLeft:'6%',
                    paddingRight:'6%',
                    paddingTop:'10%',
                    paddingBottom:'5%',
                    height: 'auto', 
                }}>
                    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated='left' width={6} verticalAlign='middle'>
                                <Image src={logo} />
                            </Grid.Column>

                            <Grid.Column floated='right' width={10} verticalAlign='middle' textAlign='right'>
                                <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#000000' }}>
                                    Don't have an account?{' '}
                                    <span                                        
                                        style={{ display: 'block', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={() => navigate("/signup")}
                                    >
                                        Sign up here
                                    </span>
                                </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'10%' }}>
                                Welcome back!
                            </p>
                        </Grid.Row>

                        <Grid.Row style={{marginTop:'10%'}}>
                            <Grid.Column width={16}>
                                <Form>
                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Password</label>
                                        <Input fluid type='password' onChange={handle_password} value={password} required />
                                    </Form.Field>

                                    <Form.Field>
                                        <Checkbox label='Remember Me' checked={isChecked} onChange={handleCheckboxClick} />
                                    </Form.Field>
                                   

                                    <Button onClick={handlelogin} size='large' fluid
                                        style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', minWidth:'25%', color:'white',
                                            borderRadius: 7, height:'7%' }}>Login</Button>
                                </Form>

                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row centered>
                            {layout}
                        </Grid.Row>

                        <Grid.Row centered>
                            <p style={{fontSize: '1.2rem', cursor: 'pointer', textDecoration: 'underline'}} 
                            onClick={() => navigate("/forgotpassword")}>
                                Forgot Password?
                            </p>
                        </Grid.Row>

                        
                    </Grid>
                </div>
            </Grid.Column>



            <Grid.Column only='tablet mobile'>
                    
            </Grid.Column>

        </Grid>

        




        
        <Grid >
            <Grid.Row only='mobile tablet' centered>
                <div style={{width:'30%',
                 transform: 'rotate(90deg)'}}>
                    <Image src={login_img} />
                </div>
                
            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>
                <div style={{width:'50%'}}>
                    <Image src={thinklabs_logo} style={{filter: 'invert(100%)'}}/>                  
                </div> 
            </Grid.Row>


            <Grid.Row only='mobile tablet' centered>
                <p style={{fontSize: '18px', fontFamily: 'Inter',}}>Welcome to ThinkLabsAI Careeer Mate!</p>

            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>
                <h4 style={{fontSize: '16px', fontFamily: 'Inter',}}>Please Log In</h4>

            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>

                <div style={{marginTop: "1%", width: '80%'}}>
                    <Segment>

                        <Form>
                            <Form.Field required>
                            <label>Email:</label>
                            <Input placeholder='Email id' onChange={handle_email} value={email} required/>
                            </Form.Field>
                            <Form.Field required>
                            <label>Password:</label>
                            <Input type='password' placeholder='password' onChange={handle_password} value={password} required/>
                            </Form.Field>
                            <Form.Field>
                            <Checkbox label='Remember Me' onChange={handleCheckboxClick} />
                            </Form.Field>

                            {/* <Grid style={{marginTop:'2%', marginBottom:'2%'}} columns="equal" centered>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Form.Field>
                                        <Radio
                                            label="Home"
                                            name="radioGroup"
                                            value="home"
                                            checked={selectedOption === 'home'}
                                            onChange={handleRadioChange}
                                        />
                                        </Form.Field>
                                    </Grid.Column>
                                    
                                    <Grid.Column width={4}>
                                        <Form.Field>
                                        <Radio
                                            label="International"
                                            name="radioGroup"
                                            value="international"
                                            checked={selectedOption === 'international'}
                                            onChange={handleRadioChange}
                                        />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid> */}

                            <Button onClick={handlelogin} 
                            style={{background: 'linear-gradient(to right, #a8e8ed, #cff7fa)', minWidth:'25%',
                                                 color:"black", borderRadius: 20, }}>Login</Button>
                        </Form>

                        {layout}

                    </Segment>

                    <p style={{fontSize: '14px', cursor: 'pointer'}} onClick={() => navigate("/signup")}>
                        Don't have an account? Sign up here
                    </p>

                    <p style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => navigate("/forgotpassword")}>
                        Forgot Password?
                    </p>
                    

                </div>
            </Grid.Row>

                        
            
            <Grid.Row only='mobile tablet' centered>
                <p style={{fontSize: '14px'}}> &copy; {currentYear} ThinkLabsAI. All rights reserved</p>
            </Grid.Row>

        </Grid>

    </div>
  )
}

export default Login
