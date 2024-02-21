import React, {useState, useEffect} from 'react'
import { Grid, Image, Popup, Card, CardContent,     
    Button,
    Header,
    Modal,
    Progress
} from 'semantic-ui-react'

import badge from "../assets/Badge.svg";
import woman from "../assets/woman.png";
import molly from "../assets/molly.png";
import userlogo from "../assets/userlogo.png";
import new_chat from "../assets/new_chat.svg";
import upgrade_premium from "../assets/upgrade_premium.svg";
import downloadimg from "../assets/download.svg";
import feedbackimg from "../assets/feedback.svg";
import helpimg from "../assets/help.svg";
import privacyimg from "../assets/privacy.svg";

import "./leftbar.css";


import {auth} from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

import { doc, getDoc } from 'firebase/firestore';
import {db} from "../firebase.js"


function Leftbar({email, onnewchat, newanswer}) {

    const navigate = useNavigate();

    const parts = email.split('@');

    const username = parts[0];

    const [open, setOpen] = useState(false)

    const [tokens, setTokens] = useState(0);

    const max = 5000;

    useEffect(() => {
        (async () => {
          try {
            
            if(email!=null)
            {
                console.log(email);
                const docRef = doc(db, 'wordCounts', email);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) 
                {
                  const data = docSnap.data();
                  setTokens(data.wordcount);
                  
                } 
                else 
                {
                  setTokens(0);
                }
            }
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        })();
        
      }, [email, newanswer]); 



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


    // Calculate color class based on percentage
    const getColorClass = (percent) => {
        if (percent <= 50) {
        return 'green';
        } else if (percent <= 80) {
        return 'yellow';
        } else {
        return 'red';
        }
    };

    const color = getColorClass((tokens / max) * 100);

    const card = 

    <div style={{ padding: '2%', width:'250px'}}>
      <Card style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}>
        <Image src={userlogo} wrapped ui={false} />
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
                    <p style={{ fontFamily: 'Inter', fontSize: '12px' }}>{tokens}/ {max} words</p>
                    <div style={{marginTop:'5%', marginRight:'40%'}}>                        
                        <Progress percent={(tokens / max) * 100} size='tiny' color={color}/>                                                    
                    </div>

                    <p style={{ fontFamily: 'Inter', fontSize: '12px' }}>Upgrade plan for unlimited access</p>

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
                        <Image src={downloadimg} onClick={download} style={{cursor:'pointer'}}/>
                    </Grid.Row>

                    <Grid.Row >
                        <Image src={feedbackimg} onClick={feedback} style={{cursor:'pointer'}}/>
                    </Grid.Row>

                    <Grid.Row >
                        <Image src={helpimg} style={{cursor:'pointer'}}/>
                    </Grid.Row>

                    <Grid.Row >
                        <Image src={privacyimg} onClick={navigatetoprivacy} style={{cursor:'pointer'}}/>
                    </Grid.Row>
                </Grid>
            </div>
        </div>

    </div>
    
  )
}

export default Leftbar