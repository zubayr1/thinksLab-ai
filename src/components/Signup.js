import React, {useState} from 'react'
import { Form, Grid, Radio, Image, Button, Checkbox, Segment, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/PigmentGradient.svg";
import thinklabs_logo from "../assets/loginsignuplogo.svg";
import logo from "../assets/logo.svg";


import { auth } from '../firebase.js';
import {  createUserWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';

import "./head_css.css";


function Signup() 
{
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();  

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [selectedOption, setSelectedOption] = useState('home');

  const [error, setError] = useState("");
  const [errortype, setErrortype] = useState(0);

  const handle_email = (e) =>
  {
    setEmail(e.target.value);
  }

  const handle_password = (e) =>
  {
    setPassword(e.target.value);
  }
  

  const handle_signup = async  (e) =>
  {
    e.preventDefault()

    if (email !== "" && password !== "") 
    {
        try 
        {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            if (userCredential && auth.currentUser) 
            {
                sendEmailVerification(auth.currentUser);

    
                localStorage.setItem("storedEmail", "");
                localStorage.setItem("storedPassword", "");
    
                setError("Sign Up Successful. Please verify your " + email+ " using the provided link!");
                setErrortype(1);
                
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
            

            
        } 
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode, errorMessage);
            setErrortype(3);
        }

    } 
    else 
    {
        setError("Email or Password is empty!");
        setErrortype(2);
    }
  }

  const handleRadioChange = (e, { value }) => {
    setSelectedOption(value);
    localStorage.setItem('usertype', value);
  };

  let layout;

  if (errortype===0)
  {
    layout=<div></div>
  }
  else if (errortype===1)
  {
    layout = <Message positive>
            <Message.Header>Successful</Message.Header>
            <p>{error}</p>
        </Message>
  }
  else if (errortype===2)
  {
    layout = <Message warning>
            <Message.Header>Warning</Message.Header>
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
                        <p style={{ fontFamily: 'Inter', fontSize: '2rem', color: '#ffffff', fontWeight: 'bold' }}>
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
                    width: '60%', // Responsive width
                    margin: '0 auto', // Center the div horizontally
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    paddingLeft:'6%',
                    paddingRight:'6%',
                    paddingTop:'10%',
                    paddingBottom:'5%'
                    }}>
                    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6} floated='left' verticalAlign='middle'>
                                <Image src={logo} />
                            </Grid.Column>

                            <Grid.Column width={10} floated='right' verticalAlign='middle' textAlign='right'>
                                <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#000000' }}>
                                    Already have an account?{' '}
                                    <span                                        
                                        style={{ display: 'block', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Sign in here
                                    </span>
                                </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'10%' }}>
                                Create Account
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

                                                                       

                                    <Button onClick={handle_signup} size='large' fluid
                                        style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', minWidth:'25%', color:'white',
                                            borderRadius: 7, height:'7%' }}>Signup</Button>
                                </Form>

                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row centered>
                            {layout}
                        </Grid.Row>

                        <Grid.Row centered>
                            <p style={{fontSize: '1.0rem',}}>
                                By creating an account, you agree to our {' '}
                                <span                                        
                                    style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => navigate("/terms")}>
                                        Terms of use
                                </span>
                                {' '} and {' '}
                                 <span                                        
                                    style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => navigate("/privacy")}>
                                        Privacy Policy 
                                </span>
                                                                  
                            </p>
                        </Grid.Row>

                        
                    </Grid>
                </div>
            </Grid.Column>



            <Grid.Column only='tablet mobile'>
                    
            </Grid.Column>

        </Grid>
















        <Grid>
            <Grid.Row only='computer'>
                <Grid.Column width={6}>
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
                            <p style={{fontSize: '36px', fontFamily: 'Inter',}}>Welcome to ThinkLabsAI Careeer Mate!</p>

                            <h3 style={{fontSize: '28px', fontFamily: 'Inter',}}>Please Sign Up</h3>

                                <div style={{marginTop: "8%"}}>
                                    <Segment>

                                        <Form>
                                            <Form.Field required>
                                            <label>Email:</label>
                                            <Input placeholder='Email id' onChange={handle_email} required />
                                            </Form.Field>
                                            <Form.Field required>
                                            <label>Password:</label>
                                            <Input type='password' placeholder='password' onChange={handle_password} required />
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

                                            <Button onClick={handle_signup} size='large'
                                                style={{background: 'linear-gradient(to right, #a8e8ed, #cff7fa)', minWidth:'25%',
                                                 color:"black", borderRadius: 20}}>SignUp</Button>
                                        </Form>

                                        {layout}

                                    </Segment>
                                    
                                </div>

                                <div style={{marginTop: "5%"}}>
                                    <p style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => navigate("/login")}>
                                        Already have an account? Login here
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
                            <Input placeholder='Email id' onChange={handle_email} required />
                            </Form.Field>
                            <Form.Field required>
                            <label>Password:</label>
                            <Input type='password' placeholder='password' onChange={handle_password} required />
                            </Form.Field>
                            <Form.Field>
                            <Checkbox label='Remember Me' />
                            </Form.Field>
                            <Button onClick={handle_signup} 
                                style={{background: 'linear-gradient(to right, #a8e8ed, #cff7fa)', minWidth:'25%',
                                color:"black", borderRadius: 20, }}>SignUp</Button>
                        </Form>

                        {layout}

                    </Segment>

                    <p style={{fontSize: '14px', cursor: 'pointer'}} onClick={() => navigate("/signup")}>
                        Already have an account? Login here
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

export default Signup
