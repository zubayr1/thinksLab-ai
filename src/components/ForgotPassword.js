import React, {useState} from 'react'
import { Grid, Image, Button, Form, Segment, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase.js';


function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const currentYear = new Date().getFullYear(); 
    
    const [error, setError] = useState("");
    const [errortype, setErrortype] = useState(0);
    
    const handle_email = (e) =>
    {
        setEmail(e.target.value);
    }


    const handle_button = async () => {
        try {
          if (email !== "") {
            // Send password reset email
            await sendPasswordResetEmail(auth, email);
      
            setError("Password reset email sent to " + email);
            setErrortype(1);

            setTimeout(() => {
              
              navigate("/login");
            }, 2000); 
          } 
          else 
          {
            setError("Email is empty");
            setErrortype(2);
            
          }
        } 
        catch (error) 
        {
          // Handle any errors that occurred while sending the password reset email
          setError("Error sending password reset email", error);
          setErrortype(3);
        }
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
                {layout}
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