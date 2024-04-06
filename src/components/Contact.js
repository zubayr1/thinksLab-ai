import React, { useState, useEffect } from 'react';
import LandingHeader from './LandingHeader.js';

import { Grid, Segment, Form, Button, Input, TextArea, Message } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom';

import { db, } from '../firebase.js';
import {
    collection,    
    addDoc,
    serverTimestamp,    
} from 'firebase/firestore'

function Contact() {

  const navigate = useNavigate();

  const [selectedHeader, setSelectedHeader] = useState(null);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const [error, setError] = useState(-1);

  useEffect(() => 
    {
        if(selectedHeader==="Home")
        {
            if(localStorage.getItem('loggedIn')===true)
            {
                navigate("/chatbot");
            }
            else
            {
                navigate("/");
            }
        }
        if(selectedHeader==='Contact')
        {
            navigate('/contact');
        }
    
    }, [selectedHeader, navigate]);


  const handleonValueChange = (selectedText) => {
    setSelectedHeader(selectedText);
  };


  const handle_name = (e) =>
  {
    setName(e.target.value);
  }

  const handle_email = (e) =>
  {
    setEmail(e.target.value);
  }

  const handle_message = (e) =>
  {
    setMessage(e.target.value);
  }

  const handlesubmit = async (e) => {
    if(name==='' || email===''|| message==='')
    {
        setError(1);
    }
    else
    {        
          const combinedPath = 'contactMessages/' + email + '/message';
            const collectionRef = collection(db, combinedPath);

            try {
                await addDoc(collectionRef, {
                    name: name,   
                    email: email,           
                    message: message,
                    timestamp: serverTimestamp()
                })
                setError(0);

                setTimeout(() => {
                    window.location.reload(); 
                  }, 2000);
            } catch (err) 
            {                
                setError(2);
            }

    }
  }


  let layout;

  if(error===-1)
  {
    layout=<div></div>
  }
  else if(error===1)
  {
    layout=<div> 
        <Message
            warning
            header='Submission Error'
            content='One of the entries is empty'
        />
    </div>
  }
  else if(error===2)
  {
    layout=<div> 
        <Message
            error
            header='Submission Error'
            content='You must login first'
        />
    </div>
  }
  else if(error===0)
  {
    layout=<div>
        <Message
            success
            header='Success'
            content='Submission done successfully'
        />
    </div>
  }

  return (
    <div style={{marginLeft:'2%', marginRight:'2%'}}>
      <div style={{marginLeft: "3%", marginRight: "0%", marginTop:'.5%', marginBottom:'2%', color: 'white',}}>
        
        <LandingHeader onValueChange={handleonValueChange}/>

      </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', }}>
            <Segment style={{padding:'2%'}} size='huge'>
                <Grid centered>
                        <Grid.Row centered only='computer'>
                            
                            <Grid.Column verticalAlign='middle' width={7} textAlign='left'>
                                <p style={{fontFamily: 'Inter', fontSize:'2.5rem', color:'#000000'}}>Contact Us</p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.4rem', color:'#000000'}}>
                                    To reach us, submit a message below or email us at hello@thinklabsai.co.uk. 
                                    We will get back to you in two working days.
                                </p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.3rem', color:'#000000'}}>
                                    If you want a meeting instead, please 
                                    <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                </p>
                            </Grid.Column>

                            <Grid.Column textAlign='middle' verticalAlign='middle' width={9}>
                                <Form>
                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Full Name</label>
                                        <Input fluid onChange={handle_name} value={name}   />
                                    </Form.Field>

                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email}   />
                                    </Form.Field>

                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Your Message</label>
                                        <TextArea fluid onChange={handle_message} value={message}  />
                                    </Form.Field>

                                    <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={handlesubmit} size='large'
                                            style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white',
                                            borderRadius: 7 }}>Submit</Button>
                                    </Grid.Column>

                                    
                                </Form>
                                <div style={{margin:'2%'}}>
                                    {layout}
                                </div>                                
                            </Grid.Column>                            

                        </Grid.Row>


                        <Grid.Row only='tablet'>

                            <Grid.Column verticalAlign='middle' width={6} textAlign='left'>
                                <p style={{fontFamily: 'Inter', fontSize:'2.05rem', color:'#000000'}}>Contact Us</p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.2rem', color:'#000000'}}>
                                    To reach us, submit a message below or email us at hello@thinklabsai.co.uk. 
                                    We will get back to you in two working days.
                                </p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.1rem', color:'#000000'}}>
                                    If you want a meeting instead, please 
                                    <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                </p>
                            </Grid.Column>

                            <Grid.Column textAlign='middle' verticalAlign='middle' width={10}>
                                <Form>
                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Full Name</label>
                                        <Input fluid onChange={handle_name} value={name} />
                                    </Form.Field>

                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email} />
                                    </Form.Field>

                                    <Form.Field >
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Your Message</label>
                                        <TextArea fluid onChange={handle_message} value={message} />
                                    </Form.Field>

                                    <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={handlesubmit} size='large'
                                            style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white',
                                            borderRadius: 7 }}>Submit</Button>
                                    </Grid.Column>
                                </Form>

                                <div style={{margin:'2%'}}>
                                    {layout}
                                </div>
                                
                            </Grid.Column>

                        </Grid.Row>


                        <Grid.Row centered only='mobile'>
                            <Grid centered>
                                <Grid.Row centered verticalAlign='middle'>
                                    <p style={{ fontFamily: 'Inter', fontSize: '2.0rem', color: '#000000' }}>Contact Us</p>

                                    <p style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000000', padding: '2%' }}>
                                        To reach us, submit a message below or email us at hello@thinklabsai.co.uk.
                                        We will get back to you in two working days.
                                    </p>

                                    <p style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000000' }}>
                                        If you want a meeting instead, please
                                        <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                    </p>
                                </Grid.Row>

                                <Grid.Row centered textAlign='middle' verticalAlign='middle'>
                                    <Form style={{ width: '100%' }}>
                                        <Form.Field style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Full Name
                                            </label>
                                            <Input fluid onChange={handle_name} value={name} style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Form.Field style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>                                            
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Email Address
                                            </label>                                            
                                            <Input fluid onChange={handle_email} value={email} style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Form.Field >
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Your Message
                                            </label>
                                            <TextArea fluid onChange={handle_message} value={message} style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={handlesubmit} size='large'
                                                style={{ background: 'linear-gradient(to right, #2971ea, #1b4aee)', color: 'white', 
                                                borderRadius: 7 }}>
                                                Submit
                                            </Button>
                                        </Grid.Column>
                                                                                
                                    </Form>

                                    <Grid.Column width={16}>
                                        <div style={{margin:'2%'}}>
                                            {layout}
                                        </div>
                                    </Grid.Column>

                                </Grid.Row>
                            </Grid>
                        </Grid.Row>


                    </Grid>
                </Segment>
        </div>

    </div>
  )
}

export default Contact