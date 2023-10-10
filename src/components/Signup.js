import React, {useState, useEffect} from 'react'
import { Grid, Image, Button, Checkbox, Form, Segment, Input, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/login.png";
import logo from "../assets/logo.png";
import microsoft_support from "../assets/microsoft_support.jpg";
import santander from "../assets/santander.jpg";
import { auth } from '../firebase.js';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

import "./head_css.css";


function Signup() {

  const navigate = useNavigate();


  const currentYear = new Date().getFullYear();  

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState("");

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail(user.email);

          const apiUrl = '/save_email';

          axios.post(apiUrl, { email: email})
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
            });

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

  const handle_signup = async  (e) =>
  {
    e.preventDefault()

    if (email!=="" && password!=="")
    {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            
            navigate("/login")
            
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
    <div style={{overflowX: 'hidden', overflowY: 'hidden', marginLeft: "1%", marginRight: "1%", position: 'fixed'}}>
        <Grid>
            <Grid.Column width={6} style={{ height: '100vh' }} only='computer'>
                <Image src={login_img} style={{width:"100%", height: "100%"}}/>
            </Grid.Column>

            <Grid.Column width={2} only='computer'>  

                <div class="horizontal-container" style={{marginTop: "15%"}}>
                    <div class="item">
                        <Image src={logo} size='tiny' />
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>                    
                </div> 
            </Grid.Column>


            <Grid.Column width={6} only='computer'>  
                <Grid centered>
                    <div style={{marginTop: "18%"}}>

                        <Grid.Row>
                            <h2 style={{fontSize: '36px'}}>Welcome to ThinkLabsAI course assistance chatbot!</h2>

                            <h3 style={{fontSize: '28px'}}>Please Sign Up</h3>

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
                                        <Form.Field>
                                        <Checkbox label='Remember Me' />
                                        </Form.Field>
                                        <Button onClick={handle_signup} style={{backgroundColor: 'blue', color:"white", borderRadius: 5}}>SignUp</Button>
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
                                    <Image src={microsoft_support} size='small'/>
                                    </Grid.Row>

                                </Grid>

                                <Grid centered>
                                    <Grid.Row>
                                    <Image src={santander} size='small'/>
                                    </Grid.Row>

                                </Grid>


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
        </Grid>


        <Grid >
            <Grid.Row only='mobile tablet' centered>
                <div style={{alignContent: 'center', alignItems: 'center', display: 'flex', marginLeft: '30%', marginRight: '30%', marginTop: '3%'}}>
                    <Image src={login_img} />
                </div>
                
            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>
                <div class="horizontal-container">
                    <div class="item">
                        <Image src={logo} size='tiny' />
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>                    
                </div> 
            </Grid.Row>


            <Grid.Row only='mobile tablet' centered>

                <h3 style={{fontSize: '18px'}}>Welcome to ThinkLabsAI course assistance chatbot!</h3>

            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>

                <h4 style={{fontSize: '16px'}}>Please Sign Up</h4>                

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
                            <Button onClick={handle_signup} style={{backgroundColor: 'blue', color:"white", borderRadius: 5}}>SignUp</Button>
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
                <Image src={microsoft_support} size='tiny'/>

                <Image src={santander} size='tiny'/>
            </Grid.Row>

            
            <Grid.Row only='mobile tablet' centered>
                <p style={{fontSize: '14px'}}> &copy; {currentYear} ThinkLabsAI. All rights reserved</p>
            </Grid.Row>

        </Grid>

    </div>
  )
}

export default Signup