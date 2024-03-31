import React, { useState, useEffect } from 'react';
import LandingHeader from './LandingHeader.js';

import { Grid, Segment, Form, Button, Input, TextArea } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom';

function Contact() {

  const navigate = useNavigate();

  const [selectedHeader, setSelectedHeader] = useState(null);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');


  useEffect(() => 
    {
        if(selectedHeader==="Home")
        {
            navigate('/');
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
                            
                            <Grid.Column verticalAlign='middle' width={7}>
                                <p style={{fontFamily: 'Inter', fontSize:'2.5rem', color:'#000000'}}>Contact Us</p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.4rem', color:'#000000'}}>
                                    To reach us, submit a message below or email us at hello@thinklabsai.co.uk. 
                                    We will get back to you in two working days.
                                </p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.3rem', color:'#000000'}}>
                                    If you want a meeting instead please 
                                    <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                </p>
                            </Grid.Column>

                            <Grid.Column textAlign='middle' verticalAlign='middle' width={9}>
                                <Form>
                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Full Name</label>
                                        <Input fluid onChange={handle_name} value={name} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Your Message</label>
                                        <TextArea fluid onChange={handle_message} value={message} required />
                                    </Form.Field>

                                    <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={handlesubmit} size='large'
                                            style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white',
                                            borderRadius: 7 }}>Submit</Button>
                                    </Grid.Column>
                                </Form>
                                
                            </Grid.Column>
                            

                        </Grid.Row>


                        <Grid.Row only='tablet'>

                            <Grid.Column verticalAlign='middle' width={6}>
                                <p style={{fontFamily: 'Inter', fontSize:'2.05rem', color:'#000000'}}>Contact Us</p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.2rem', color:'#000000'}}>
                                    To reach us, submit a message below or email us at hello@thinklabsai.co.uk. 
                                    We will get back to you in two working days.
                                </p>

                                <p style={{fontFamily: 'Inter', fontSize:'1.1rem', color:'#000000'}}>
                                    If you want a meeting instead please 
                                    <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                </p>
                            </Grid.Column>

                            <Grid.Column textAlign='middle' verticalAlign='middle' width={10}>
                                <Form>
                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Full Name</label>
                                        <Input fluid onChange={handle_name} value={name} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Email Address</label>
                                        <Input fluid onChange={handle_email} value={email} required  />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label style={{fontFamily: 'Inter', fontSize: '1.2rem', color: '#000', fontWeight: 'normal'}}>
                                            Your Message</label>
                                        <TextArea fluid onChange={handle_message} value={message} required />
                                    </Form.Field>

                                    <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={handlesubmit} size='large'
                                            style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white',
                                            borderRadius: 7 }}>Submit</Button>
                                    </Grid.Column>
                                </Form>
                                
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
                                        If you want a meeting instead please
                                        <a href='https://calendly.com/thinklabsai2023/thinklabsai?month=2023-10'> click here</a>
                                    </p>
                                </Grid.Row>

                                <Grid.Row centered textAlign='middle' verticalAlign='middle'>
                                    <Form style={{ width: '100%' }}>
                                        <Form.Field required style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Full Name
                                            </label>
                                            <Input fluid onChange={handle_name} value={name} required style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Form.Field required style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>                                            
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Email Address
                                            </label>                                            
                                            <Input fluid onChange={handle_email} value={email} required style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Form.Field required>
                                            <label style={{ fontFamily: 'Inter', fontSize: '1.0rem', color: '#000', fontWeight: 'normal' }}>
                                                Your Message
                                            </label>
                                            <TextArea fluid onChange={handle_message} value={message} required style={{ width: '80%' }} />
                                        </Form.Field>

                                        <Grid.Column verticalAlign='middle' width={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={handlesubmit} size='large'
                                                style={{ background: 'linear-gradient(to right, #2971ea, #1b4aee)', color: 'white', 
                                                borderRadius: 7 }}>
                                                Submit
                                            </Button>
                                        </Grid.Column>
                                    </Form>
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