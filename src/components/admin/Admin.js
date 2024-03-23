import React, { useState } from 'react';
import { Grid, FormField, Button, Form, Image } from 'semantic-ui-react'
// thinkadminaccess
import logo from "../../assets/logo.svg";

import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase.js';

import { useNavigate } from 'react-router-dom';

function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
        try{
            if(email==="admin@thinklabsai.com")
            {
                
                await signInWithEmailAndPassword(auth, email, password);
                        
                navigate("/adminlandingpage");
            }
            else{
                alert('Access denied!');
            }
        }
        catch (_) {
            alert('Access denied!');
        }
        
        
    };

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%', position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', width: '50%' }}>
        <Grid centered>
            <Grid.Row>
                <Image src={logo} size='small'/>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign='center' width={16}>
                    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <h3>Admin Portal</h3>
                        <FormField>
                            <label>email</label>
                            <input 
                                    placeholder='Email Id'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                        </FormField>
                        <FormField>
                            <label>Password</label>
                            <input 
                                    type="password" 
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                        </FormField>
                        <Button primary type='submit'>Submit</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>

  )
}

export default Admin