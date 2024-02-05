import React, {useState} from 'react'
import { Grid, Image, Popup, Card, CardContent, Icon,    
    Button,
    Header,
    Modal,
} from 'semantic-ui-react'

import badge from "../assets/Badge.svg";
import woman from "../assets/woman.png";
import molly from "../assets/molly.png";
import new_chat from "../assets/new_chat.svg";
import upgrade_premium from "../assets/upgrade_premium.svg";

import "./leftbar.css";


import {auth} from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

function Leftbar({email, onnewchat}) {

    const navigate = useNavigate();

    const parts = email.split('@');

    const username = parts[0];

    const [open, setOpen] = useState(false)


    const handle_signout = () =>
    {
        signOut(auth).then(() => 
        {
            const updatedPromptList = [];
            localStorage.setItem('promptList', JSON.stringify(updatedPromptList));
            // localStorage.removeItem('tokens');
            localStorage.removeItem('oddMessagesStatus');
            navigate("/login");
            
        }).catch((_) => {
        // An error happened.
        });
    }

    const newchat = ()=>
    {
        localStorage.removeItem('oddMessagesStatus');
        onnewchat(true);
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
        navigate('/privacy', {state:{route:'leftbar'}});
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
            <p onClick={handle_signout} style={{fontFamily: 'Inter', fontSize:'1.0rem', cursor:'pointer'}}>Sign Out</p>
        </CardContent>
      </Card>
    </div>

  return (
    <div style={{marginTop:'5%', paddingLeft:'1%', paddingBottom: '5%', overflow:'hidden'}}>

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
                <p style={{fontFamily: 'Inter', fontSize:'1.0rem'}}>
                    {username}
                </p>
            </Grid.Column>

            <Grid.Column verticalAlign='middle' width={4}>
                <Image src={badge} size='small'/>
            </Grid.Column>
            
        </Grid>
      
      
        
        
        <Grid >

            <Grid.Row centered>
                <div
                 style={{
                    width: '80%',
                    height: 'auto', 
                    background: 'linear-gradient(#FEF9F3, #F7F1FD, #EBF4FD, #EEFBF2)',
                    padding:'5%',
                    border: '1px solid #FEF9F3',
                    borderRadius:'8px'
                  }}
                >
                    <div style={{ cursor: 'pointer' }}>
                                            
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Image src={upgrade_premium}/>}
                        >
                        <Modal.Header>Information</Modal.Header>

                        <Modal.Content image>
                            <Modal.Description>
                            <Header>Premium Membership</Header>
                            <p>
                                Feature available soon...
                            </p>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            
                            <Button
                            content="I understood"
                            labelPosition='right'
                            icon='lightbulb'
                            onClick={() => setOpen(false)}
                            positive
                            />
                        </Modal.Actions>
                        </Modal>
                        
                    </div> 
                </div>
            </Grid.Row>

            <Grid.Row centered>
                <div style={{ cursor: 'pointer' }}>
                    <Image src={new_chat} onClick={newchat} />
                </div> 
            </Grid.Row>        
        </Grid>


        <div
            style={{
              position: 'absolute',
              bottom: "3%",
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              backgroundColor: 'white',
              
              padding: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',               
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
                        <p onClick={download} style={{fontFamily: 'Inter', fontSize:'1.0rem', cursor:'pointer'}}>Download</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='smile' />
                        <p onClick={feedback} style={{fontFamily: 'Inter', fontSize:'1.0rem', cursor:'pointer'}}>Feedback</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='help circle' />
                        <p style={{fontFamily: 'Inter', fontSize:'1.0rem'}}>Help</p>
                    </Grid.Row>

                    <Grid.Row >
                        <Icon name='file text' />
                        <p onClick={navigatetoprivacy} style={{fontFamily: 'Inter', fontSize:'1.0rem', cursor:'pointer'}}>Privacy Policy</p>
                    </Grid.Row>
                </Grid>
            </div>
        </div>

    </div>
    
  )
}

export default Leftbar