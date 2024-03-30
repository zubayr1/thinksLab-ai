import React, {useState} from 'react'
import { Form, Grid, Image, Button, Input, Message } from 'semantic-ui-react'
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

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

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
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', overflowX:'hidden'}}>


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
                    marginTop: '10%',
                    marginBottom: '10%',
                    width: '60%', 
                    margin: '0 auto', 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    paddingLeft:'6%',
                    paddingRight:'6%',
                    paddingTop:'7%',
                    paddingBottom:'7%',
                    height: 'auto', 
                    maxHeight: 'auto'
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
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'3%' }}>
                                Create Account
                            </p>
                        </Grid.Row>

                        <Grid.Row style={{marginTop:'5%'}}>
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



            <Grid.Column width={16} verticalAlign='middle' only='tablet'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    marginTop: '10%',
                    marginBottom: '10%',
                    width: '60%', 
                    margin: '0 auto', 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    paddingLeft:'6%',
                    paddingRight:'6%',
                    paddingTop:'5%',
                    paddingBottom:'5%',
                    height: 'auto', 
                    maxHeight: 'auto'
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
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'2%' }}>
                                Create Account
                            </p>
                        </Grid.Row>

                        <Grid.Row style={{marginTop:'3%'}}>
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


            <Grid.Column verticalAlign='middle' width={16} only='mobile'>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    height:"auto",
                    padding:"10%"
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
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'2%' }}>
                                Create Account
                            </p>
                        </Grid.Row>

                        <Grid.Row style={{marginTop:'3%'}}>
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

        </Grid>


    </div>
  )
}

export default Signup
