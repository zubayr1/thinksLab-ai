import React from 'react'
import { Grid, Image, Popup, Card, CardContent, Button, Icon} from 'semantic-ui-react'

import badge from "../assets/Badge.svg";
import woman from "../assets/woman.png";
import molly from "../assets/molly.png";


import "./leftbar.css";


import {auth} from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

function Leftbar(props) {

    const navigate = useNavigate();


    let email = props.email;

    const parts = email.split('@');

    const username = parts[0];



    const handle_signout = () =>
    {
        localStorage.removeItem('oddMessagesStatus');

        signOut(auth).then(() => {
        // Sign-out successful.
        // localStorage.setItem('tokens', 0);

            const updatedPromptList = [];
            localStorage.setItem('promptList', JSON.stringify(updatedPromptList));
            // localStorage.removeItem('tokens');
            navigate("/login");
            
        }).catch((_) => {
        // An error happened.
        });
    }

    const newchat = ()=>
    {

    }

    const download = () =>
    {
        const storedPromptListA = JSON.parse(localStorage.getItem('promptList') || '[]');

        // Convert the data to a string
        const dataAsText = JSON.stringify(storedPromptListA, null, 2); // Using JSON.stringify to format the JSON nicely

        // Create a Blob containing the data
        const blob = new Blob([dataAsText], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const a = document.createElement('a');
        a.href = url;
        a.download = 'conversation.txt'; 
        a.click();
    }

    const feedback = ()=>
    {
        window.location.href = "https://forms.office.com/e/KYM1m3DuCD";
    }


    const navigatetoprivacy = () =>
    {
        navigate('/privacy');
    }


    const card = 

    <div style={{ padding: '2%', width:'250px'}}>
      <Card style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}>
        <Image src={molly} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Description>
            
          </Card.Description>
        </Card.Content>

        <CardContent extra>
            <p onClick={handle_signout} style={{fontFamily: 'Montserrat', fontSize:'1.0rem', cursor:'pointer'}}>Sign Out</p>
        </CardContent>
      </Card>
    </div>

  return (
    <div style={{marginTop:'5%', paddingLeft:'1%'}}>

        <Grid columns={3}>
            <Grid.Column verticalAlign='middle' width={4}>

                <Popup
                    trigger={<Image src={woman} size='tiny'/>}
                    content={card}
                    position='bottom left'
                    flowing hoverable
                />

            </Grid.Column>

            <Grid.Column floated='left' verticalAlign='middle' width={5}>
                <p style={{fontFamily: 'Montserrat', fontSize:'1.0rem'}}>
                    {username}
                </p>
            </Grid.Column>

            <Grid.Column verticalAlign='middle' width={4}>
                <Image src={badge} size='small'/>
            </Grid.Column>
            
        </Grid>
      
      
        
        
        <Grid >
            <Grid.Row centered>
                <Button size='small'  onClick={newchat}
                        basic
                        color='blue'
                        icon='plus'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: 'New Chat',
                        }}
                        style={{marginTop:"60%"}}
                    />                                      

            </Grid.Row>        
        </Grid>


        <div
            style={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              backgroundColor: 'white',
              
              padding: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', 
              maxHeight: '80%',
              marginBottom: '0%',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                position: 'relative',
              }}
            >
        
                <Grid textAlign='left'>
                    <Grid.Row >
                        <Icon name='download' />
                        <p onClick={download} style={{fontFamily: 'Montserrat', fontSize:'1.0rem', cursor:'pointer'}}>Download</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='smile' />
                        <p onClick={feedback} style={{fontFamily: 'Montserrat', fontSize:'1.0rem', cursor:'pointer'}}>Feedback</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='help circle' />
                        <p style={{fontFamily: 'Montserrat', fontSize:'1.0rem'}}>Help</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='file text' />
                        <p onClick={navigatetoprivacy} style={{fontFamily: 'Montserrat', fontSize:'1.0rem', cursor:'pointer'}}>Privacy Policy</p>
                    </Grid.Row>
                </Grid>
            </div>
        </div>

    </div>
    
  )
}

export default Leftbar