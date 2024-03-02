import React from 'react'
import { Grid, Image, Divider } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import thinklabs_logo from "../assets/landing_logo.svg";
import instagram from "../assets/icons8-instagram.svg";
import linkedin from "../assets/icons8-linkedin.svg";
import youtube from "../assets/icons8-youtube.svg";


function LandingFooter() {

  const navigate = useNavigate();

  
  const navigatetoterms = () =>
  {
    navigate('/terms');
  }


  const navigatetoprivacy = () =>
  {
    navigate('/privacy', {state:{route:'landing'}});
  }
 

  const handlefacebook = () => {
    window.location.href = 'https://www.instagram.com/thinklabsai_official/';
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
                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlefacebook} size='mini' src={instagram} />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlelinkedin} size='mini' src={linkedin} />  
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handleyoutube} size='mini' src={youtube} />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>

          <Grid.Column width={6} floated='right' only='tablet' verticalAlign='middle'>

            <Grid verticalAlign='middle' centered>
                
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlefacebook} size='mini' src={instagram} />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlelinkedin} size='mini' src={linkedin} />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handleyoutube} size='mini' src={youtube} />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>


          <Grid.Column width={8} floated='right' only='mobile' verticalAlign='middle'>

            <Grid verticalAlign='middle' centered>
                
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlefacebook} size='mini' src={instagram} />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handlelinkedin} size='mini' src={linkedin} />  
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Image style={{cursor: 'pointer'}} onClick={handleyoutube} size='mini' src={youtube} />
                  </Grid.Column>
                </Grid.Row>
            </Grid>

          </Grid.Column>
        </Grid.Row>

        <Divider/>


        <Grid.Row>
          <Grid.Column floated='left' width={8} only='computer tablet'>
            <p style={{color:'#82828f', fontSize:'.9rem'}}>© {new Date().getFullYear()} ThinkLabsAI. All rights reserved.</p>
          </Grid.Column>

          <Grid.Column floated='left' width={6} only='mobile'>
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


          <Grid.Column floated='right' width={10} only='mobile'>

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