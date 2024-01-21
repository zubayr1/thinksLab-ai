import React from 'react'
import { Grid, Icon, Image, Divider } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import thinklabs_logo from "../assets/landing_logo.svg";

function LandingFooter() {

  const navigate = useNavigate();

  
  const navigatetoterms = () =>
  {
    navigate('/terms');
  }


  const navigatetoprivacy = () =>
  {
    navigate('/privacy');
  }
 

  const handlefacebook = () => {
    window.location.href = 'https://www.facebook.com/ThinkLabsAI/';
  };

  const handlelinkedin = () => {
    window.location.href = 'https://www.linkedin.com/company/thinklabsai/';
  };

  const handleyoutube = () => {
    window.location.href = 'https://www.youtube.com/@ThinkLabsAI';
  };

  return (

    <div style={{marginLeft: '5%', marginRight: '5%', marginTop:'2%'}}>


      <Grid>
        <Grid.Row>
          <Grid.Column width={8} floated='left'>
            <Image src={thinklabs_logo} size='small'/>
          </Grid.Column>

          <Grid.Column width={4} floated='right' only='computer' verticalAlign='middle'>

            <Grid verticalAlign='middle' centered>
                
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handlefacebook} size='large' name='facebook f' />
                  </Grid.Column>

                  <Grid.Column width={3}>
                  <Icon style={{cursor: 'pointer'}} onClick={handlelinkedin} size='large' name='linkedin' />  
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handleyoutube} size='large' name='youtube' />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>

          <Grid.Column width={6} floated='right' only='tablet' verticalAlign='middle'>

            <Grid verticalAlign='middle' centered>
                
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handlefacebook} size='large' name='facebook f' />
                  </Grid.Column>

                  <Grid.Column width={3}>
                  <Icon style={{cursor: 'pointer'}} onClick={handlelinkedin} size='large' name='linkedin' />  
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handleyoutube} size='large' name='youtube' />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>


          <Grid.Column width={8} floated='right' only='mobile' verticalAlign='middle'>

            <Grid verticalAlign='middle' centered>
                
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handlefacebook} size='large' name='facebook f' />
                  </Grid.Column>

                  <Grid.Column width={3}>
                  <Icon style={{cursor: 'pointer'}} onClick={handlelinkedin} size='large' name='linkedin' />  
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <Icon style={{cursor: 'pointer'}} onClick={handleyoutube} size='large' name='youtube' />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>
        </Grid.Row>

        <Divider/>


        <Grid.Row>
          <Grid.Column floated='left' width={8}>
            <p style={{color:'#82828f', fontSize:'.9rem'}}>© {new Date().getFullYear()} ThinkLabsAI. All rights reserved.</p>
          </Grid.Column>


          <Grid.Column floated='right' width={4} only='computer'>

            <Grid>
                
                <Grid.Column width={8}>
                  <p onClick={navigatetoterms} style={{fontSize: '16px', cursor:'pointer'}}>Terms of Service</p>
                </Grid.Column>

                <Grid.Column width={8}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '16px', cursor:'pointer'}}>Privacy Policy</p>
                </Grid.Column>
            </Grid>

          </Grid.Column>


          <Grid.Column floated='right' width={6} only='tablet'>

            <Grid>
                
                <Grid.Column width={8}>
                  <p onClick={navigatetoterms} style={{fontSize: '16px', cursor:'pointer'}}>Terms of Service</p>
                </Grid.Column>

                <Grid.Column width={8}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '16px', cursor:'pointer'}}>Privacy Policy</p>
                </Grid.Column>
            </Grid>

          </Grid.Column>


          <Grid.Column floated='right' width={8} only='mobile'>

            <Grid>
                
                <Grid.Column width={8}>
                  <p onClick={navigatetoterms} style={{fontSize: '14px', cursor:'pointer'}}>Terms of Service</p>
                </Grid.Column>

                <Grid.Column width={8}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '14px', cursor:'pointer'}}>Privacy Policy</p>
                </Grid.Column>
            </Grid>

          </Grid.Column>

        </Grid.Row>

      </Grid>


    </div>
  )
}

export default LandingFooter