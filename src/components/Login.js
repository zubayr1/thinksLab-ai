import React, {useState, useEffect} from 'react'
import { Grid, Image, Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import login_img from "../assets/pikachu.jpeg";
import logo from "../assets/logo.png";
import microsoft_support from "../assets/microsoft_support.jpg";
import santander from "../assets/santander.jpg";

import "./head_css.css";

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import axios from 'axios';

function Login() {

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();  

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if storedEmail and storedPassword exist in localStorage
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");
    console.log(storedEmail);
    // If storedEmail and storedPassword exist, set them as initial values
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setIsChecked(true); // Set the checkbox as checked
    }
  }, []);


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

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked); // Toggle the checkbox status
  }

  const storeCredentialsInLocalStorage = () => {
    if (isChecked) {
      localStorage.setItem('storedEmail', email);
      localStorage.setItem('storedPassword', password);
    }
  }

  const handle_login = (e) =>
  {
    e.preventDefault();

    if (email!=="" && password!=="")
    {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            storeCredentialsInLocalStorage();
            navigate("/")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
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

                            <h3 style={{fontSize: '28px'}}>Please Log In</h3>

                            <div style={{marginTop: "8%"}}>
                                <Segment>

                                    <Form>
                                        <Form.Field>
                                        <label>Email:</label>
                                        <input placeholder='Email id' onChange={handle_email} value={email}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Password:</label>
                                        <input placeholder='password' onChange={handle_password} value={password}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <Checkbox label='Remember Me' checked={isChecked} onChange={handleCheckboxClick} />
                                        </Form.Field>
                                        <Button onClick={handle_login} style={{backgroundColor: 'blue', color:"white", borderRadius: 5}}>Login</Button>
                                    </Form>

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

                <h4 style={{fontSize: '16px'}}>Please Log In</h4>                

            </Grid.Row>

            <Grid.Row only='mobile tablet' centered>

                <div style={{marginTop: "1%", width: '80%'}}>
                    <Segment>

                        <Form>
                            <Form.Field>
                            <label>Email:</label>
                            <input placeholder='Email id' onChange={handle_email} value={email}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Password:</label>
                            <input placeholder='password' onChange={handle_password} value={password}/>
                            </Form.Field>
                            <Form.Field>
                            <Checkbox label='Remember Me' onChange={handleCheckboxClick} />
                            </Form.Field>
                            <Button onClick={handle_login} style={{backgroundColor: 'blue', color:"white", borderRadius: 5}}>Login</Button>
                        </Form>

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

export default Login