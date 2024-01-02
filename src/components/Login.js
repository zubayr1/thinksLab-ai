import React, {useState, useEffect} from 'react'
import { Form, Grid, Radio, Image, Button, Checkbox, Segment, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/robot_hand.jpg";
import thinklabs_logo from "../assets/landing_logo.png";

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


//   useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           setEmail(user.email);
//           navigate("/chatbot");
      
//         } 
        
//       });
     
//   }, [navigate, email]);
  

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


  const handleRadioChange = (e, { value }) => {
    setSelectedOption(value);
    localStorage.setItem('usertype', value);
  };

  const handle_login = (e) =>
  {
    e.preventDefault();

    if (email!=="" && password!=="")
    {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            storeCredentialsInLocalStorage();
            navigate("/chatbot")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode, errorMessage);
        });
    }
    else
    {
        setError("Email or Password is empty!");
    }
  }

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
    <div style={{position:'absolute'}}>
        <Grid>
            <Grid.Row columns={2} only='computer'>
                <Grid.Column width={6} >
                    <Image src={login_img} style={{width:"100%", height: "100vh"}}/>
                </Grid.Column>

                <Grid.Column width={2}>  
                    <div style={{marginTop:'10%'}}>
                        <Image src={thinklabs_logo} style={{filter: 'invert(100%)'}}/>
                    </div>                    
                </Grid.Column>


                <Grid.Column width={6}>  
                    <Grid centered>
                        <div style={{marginTop: "18%"}}>

                            <Grid.Row>
                                <p style={{fontSize: '36px', fontFamily: 'Montserrat',}}>Welcome to ThinkLabsAI Careeer Mate!</p>

                                <h3 style={{fontSize: '28px', fontFamily: 'Montserrat',}}>Please Log In</h3>

                                <div style={{marginTop: "8%"}}>
                                    <Segment>

                                        <Form>
                                            <Form.Field required>
                                            <label>Email:</label>
                                            <Input placeholder='Email id' onChange={handle_email} value={email} required />
                                            </Form.Field>
                                            <Form.Field required>
                                            <label>Password:</label>
                                            <Input type='password' placeholder='password' 
                                                onChange={handle_password} value={password} required />
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

                                            <Button onClick={handle_login} size='large'
                                                style={{background: 'linear-gradient(to right, #a8e8ed, #cff7fa)', minWidth:'25%',
                                                 color:"black", borderRadius: 20, }}>Login</Button>
                                        </Form>


                                        
                                        {layout}

                                    </Segment>
                                    
                                </div>

                                <div style={{marginTop: "5%"}}>
                                    <p style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => navigate("/signup")}>
                                        Don't have an account? Sign up here
                                    </p>

                                    <p style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => navigate("/forgotpassword")}>
                                        Forgot Password?
                                    </p>
                                </div>

                                
                                <div style={{marginTop: "4%"}}>                                    
                                
                                    <Grid centered>
                                        <Grid.Row>
                                            <p style={{fontSize: '18px'}}> &copy; {currentYear} ThinkLabsAI. All rights reserved</p>
                                        </Grid.Row>
                                    </Grid>

                                </div>
                                
                            </Grid.Row>


                        </div>
                        
                    </Grid>
                                
                </Grid.Column>

            </Grid.Row>
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

                            <Button onClick={handle_login} 
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
