import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

function LandingFooter() {

  const navigate = useNavigate();

  const redirectToForm = () => {
    window.location.href = 'https://forms.office.com/e/ydSj3ZQ7k5';
  };

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

    <div style={{backgroundColor:'#d3e5f2'}}>
    <div style={{marginTop: '5%', marginLeft: '5%', marginRight: '5%'}}>

        <Grid>
            <Grid.Column only='computer' width={3} floated='left'>
              <Grid>
                <Grid.Column width={5}>
                  <p onClick={redirectToForm} style={{fontSize: '16px', cursor:'pointer'}}>Contact</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoterms} style={{fontSize: '16px', cursor:'pointer'}}>Terms</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '16px', cursor:'pointer'}}>Privacy</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>


            <Grid.Column only='tablet' width={6} floated='left'>
              <Grid>
                <Grid.Column width={5}>
                  <p onClick={redirectToForm} style={{fontSize: '16px', cursor:'pointer'}}>Contact</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoterms} style={{fontSize: '16px', cursor:'pointer'}}>Terms</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '16px', cursor:'pointer'}}>Privacy</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>


            <Grid.Column only='mobile' width={8} floated='left'>
              <Grid>
                <Grid.Column width={5}>
                  <p onClick={redirectToForm} style={{fontSize: '16px', cursor:'pointer'}}>Contact</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoterms} style={{fontSize: '16px', cursor:'pointer'}}>Terms</p>
                </Grid.Column>

                <Grid.Column width={5}>
                  <p onClick={navigatetoprivacy} style={{fontSize: '16px', cursor:'pointer'}}>Privacy</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>


            <Grid.Column only='computer' width={3}>
              <Grid verticalAlign='middle' centered>
                <Grid.Row>
                  <Icon name='mail'/><p>: hello@thinklabsai.co.uk</p>
                </Grid.Row>

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


            <Grid.Column only='tablet' width={4}>
              <Grid verticalAlign='middle' centered>
                <Grid.Row>
                  <p>hello@thinklabsai.co.uk</p>
                </Grid.Row>


                <Grid.Row>
                  <Grid.Column width={5}>
                    <Icon style={{cursor: 'pointer'}} onClick={handlefacebook} size='large' name='facebook f' />
                  </Grid.Column>

                  <Grid.Column width={5}>
                  <Icon style={{cursor: 'pointer'}} onClick={handlelinkedin} size='large' name='linkedin' />  
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Icon style={{cursor: 'pointer'}} onClick={handleyoutube} size='large' name='youtube' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>



            <Grid.Column only='mobile' width={6}>
              <Grid verticalAlign='middle' centered>
                <Grid.Row>
                  <p>hello@thinklabsai.co.uk</p>
                </Grid.Row>


                <Grid.Row>
                  <Grid.Column width={5}>
                    <Icon style={{cursor: 'pointer'}} onClick={handlefacebook} size='large' name='facebook f' />
                  </Grid.Column>

                  <Grid.Column width={5}>
                  <Icon style={{cursor: 'pointer'}} onClick={handlelinkedin} size='large' name='linkedin' />  
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Icon style={{cursor: 'pointer'}} onClick={handleyoutube} size='large' name='youtube' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
        </Grid>
       

        </div>

        <div style={{
          
          textAlign: 'center',
          fontFamily: 'Montserrat',
          paddingTop:'8%'
        }}>
          Copyright © 2023 ThinkLabsAI. All rights reserved
        </div>
    </div>
  )
}

export default LandingFooter