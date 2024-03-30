import React, {useState, useEffect} from 'react'
import { Form, Grid, Image, Button, Checkbox, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../../assets/PigmentGradient.svg";
import thinklabs_logo from "../../assets/loginsignuplogo.svg";
import logo from "../../assets/logo.svg";


import "../head_css.css";

import {  signInWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase.js';

function AdminLogin() {

  const navigate = useNavigate();

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
        if (storedEmail!=="")
        {
            if (user) 
            {         
              if(user.email==="admin@thinklabsai.com")
              {
                setEmail(user.email);
                navigate("/adminchatbot");
              }                        
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
        if (user.email==="admin@thinklabsai.com") {
          // User's email is verified
          storeCredentialsInLocalStorage();
          localStorage.setItem('loggedIn', true);
          navigate("/adminchatbot");
        } else {
          // User's email is not verified
          setError("Access Denied.");
          
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
    height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', overflowX:'hidden'}}>

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
                    paddingTop:'10%',
                    paddingBottom:'5%',
                    height: 'auto', 
                    maxHeight: '90vh'
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
                                        onClick={() => navigate("/adminsignup")}
                                    >
                                        Sign up here
                                    </span>
                                </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{ fontFamily: 'Inter', fontSize: '1.8rem', color: '#000', fontWeight: 'bold', marginTop:'3%' }}>
                                Welcome back!
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



            <Grid.Column verticalAlign='middle' width={16} only='tablet'>


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
                    paddingTop:'10%',
                    paddingBottom:'5%',
                    height: 'auto', 
                    maxHeight: '85vh'
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



            <Grid.Column verticalAlign='middle' width={16} only='mobile'>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    height:"80vh",
                    padding:"10%"
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

        </Grid>

        



    </div>
  )
}

export default AdminLogin
