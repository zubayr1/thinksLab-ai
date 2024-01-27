import React, {useState, useEffect} from 'react'
import { Form, Grid, Radio, Image, Button, Checkbox, Segment, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/PigmentGradient.svg";
import thinklabs_logo from "../assets/loginsignuplogo.svg";
import logo from "../assets/logo.svg";


import "@fontsource/montserrat";

import "./head_css.css";

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';

function Login() {

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();  

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [selectedOption, setSelectedOption] = useState('home');

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
        if (storedEmail!=="")
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


  const handleRadioChange = (e, { value }) => 
  {
    setSelectedOption(value);
    localStorage.setItem('usertype', value);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
  
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
  

  let layout;

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
  else 
  {
    layout = <Message negative>
            <Message.Header>Authentication Error</Message.Header>
            <p>{error}</p>
        </Message>
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
                        <p style={{ fontFamily: 'Montserrat', fontSize: '2rem', color: '#ffffff', fontWeight: 'bold' }}>
                            Welcome to ThinkLabsAI Career Mate!
                        </p>
                    </Grid.Row>
                </Grid>
                    
            </Grid.Column>

            <Grid.Column width={8} verticalAlign='middle' only='computer'>
                <div style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    marginTop: '20%',
                    minHeight: '87vh', // 100% - 30% margin-top
                    width: '70%', // Responsive width
                    margin: '0 auto', // Center the div horizontally
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    paddingLeft:'6%',
                    paddingRight:'6%',
                    paddingTop:'10%'
                    }}>
                    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6} floated='left' verticalAlign='middle'>
                                <Image src={logo} />
                            </Grid.Column>

                            <Grid.Column width={8} floated='right' verticalAlign='middle'>
                                <p style={{ fontFamily: 'Montserrat', fontSize: '1rem', color: '#000000' }}>
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
                            <p style={{ fontFamily: 'Montserrat', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'10%' }}>
                                Welcome back!
                            </p>
                        </Grid.Row>

                        <Grid.Row style={{marginTop:'10%'}}>
                            <Grid.Column width={16}>
                                <Form>
                                    <Form.Field required>
                                        <label style={{fontFamily: 'Montserrat', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Montserrat', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Password</label>
                                        <Input fluid type='password' onChange={handle_password} value={password} required />
                                    </Form.Field>

                                    <Form.Field>
                                        <Checkbox label='Remember Me' checked={isChecked} onChange={handleCheckboxClick} />
                                    </Form.Field>

                                    <Grid style={{marginTop:'2%', marginBottom:'2%'}} columns="equal" centered>
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
                                    </Grid>

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
                <p style={{fontSize: '18px', fontFamily: 'Montserrat',}}>Welcome to ThinkLabsAI Careeer Mate!</p>

            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>
                <h4 style={{fontSize: '16px', fontFamily: 'Montserrat',}}>Please Log In</h4>

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

                            <Grid style={{marginTop:'2%', marginBottom:'2%'}} columns="equal" centered>
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
                            </Grid>

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
