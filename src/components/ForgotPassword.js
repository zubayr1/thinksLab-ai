import React, {useState, useEffect} from 'react'
import { Grid, Image, Button, Form, Segment } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';


function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const currentYear = new Date().getFullYear(); 
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setEmail(user.email);

              navigate("/");
    
            } 
            
          });
         
      }, [navigate, email]);

    const handle_email = (e) =>
    {
        setEmail(e.target.value);
    }


    const handle_button = () =>
    {
        console.log(email);
    }


  return (
    <div style={{overflow: 'hidden'}}>
        <Grid>
            <Grid.Row>
                <div class="horizontal-container" style={{marginTop: "2%", marginLeft: '2%'}}>
                    <div class="item">
                        <Image src={logo} size='tiny' />
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>                    
                </div> 
            </Grid.Row>

            <Grid.Row centered>
                <h2>Reset Password</h2>                

            </Grid.Row>

            <Grid.Row centered>
                <div style={{width: '60%'}}>
                    <Segment>
                        <Form>
                            <Form.Field>
                            <label>Email:</label>
                            <input placeholder='Email id' onChange={handle_email} required/>
                            </Form.Field>
                            
                            <Button onClick={handle_button} style={{backgroundColor: 'blue', color:"white", borderRadius: 5}}>Reset Password</Button>
                        </Form>

                    </Segment>
                </div>
            </Grid.Row>

            <Grid.Row centered>
                <h3 style={{fontSize: '16px', cursor: 'pointer'}} onClick={() => navigate("/signup")}>
                    Don't have an account? Sign up here
                </h3>
                    
            </Grid.Row>

            <Grid.Row centered>
                <h3 style={{fontSize: '16px', cursor: 'pointer'}} onClick={() => navigate("/login")}>
                    Go back to Login Page
                </h3>
            </Grid.Row>

            <Grid.Row centered>
                <p style={{fontSize: '16px', marginTop: '5%'}}>Backed by</p>
            </Grid.Row>
        
            <Grid.Row centered>
                <p style={{fontSize: '14px'}}> &copy; {currentYear} ThinkLabsAI. All rights reserved</p>
            </Grid.Row>
        </Grid>
    </div>
  )
}

export default ForgotPassword