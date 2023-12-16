import React, {useRef} from 'react';

import { TypeAnimation } from 'react-type-animation';

import { Grid, Image, Button, Dropdown } from 'semantic-ui-react'

import logo from "../assets/landing_logo.png";
import LowerLandingPage from './LowerLandingPage.js';
import LandingTour from './LandingTour.js';
import "@fontsource/montserrat";
import './landingpage.css';
import LandingDo from './LandingDo.js';
import LandingCapabilities from './LandingCapabilities.js';
import LandingFooter from './LandingFooter.js';
import LandingPartners from './LandingPartners.js';


function LandingPage() {

  const tourRef = useRef(null);

  const pencilSrc = "../assets/pencil.png"; 
  const pencil = <img src={pencilSrc} alt='testpencil'/>;


  const scrollToTour = () => {
    if (tourRef.current) {
      tourRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const gradientStyle = {
    background: 'linear-gradient(to bottom, #1e90ff 18%, #ffffff)',
    width: '100%',
    height: 'auto',    
    position: 'relative',
    fontSize: '24px',
    overflow:'hidden'
  };

  const redirectToForm = () => {
    window.location.href = 'https://forms.office.com/e/ydSj3ZQ7k5';
  };
  

  return (
    <div>
      <div style={gradientStyle}>
      <div style={{marginLeft: "5%", marginRight: "5%", color: 'white',}}>
        <Grid verticalAlign="middle">

            <Grid.Column width={16} only='computer' style={{marginTop:'1rem', overflow:'hidden'}}> 
              <Grid columns={2} verticalAlign="middle">
                <Grid.Column width={3}>
                  <Image src={logo} size='large' style={{ width: '100%', marginTop: '5%' }}/>
                </Grid.Column>

                <Grid.Column width={5} floated='right'>
                  <Grid columns={2} verticalAlign='middle'>
                      <Grid.Column textAlign='right' width={8}>
                        <div className="hover-cursor" onClick={scrollToTour}>
                          <p style={{fontFamily: 'Montserrat', fontSize:'1.4rem'}}>
                              Take a Tour
                          </p>
                        </div>
                          
                      </Grid.Column>
                      
                      <Grid.Column floated='right' width={6}>
                          <div class="horizontal-container">
                              <div class="item">
                                  <Button  onClick={redirectToForm} style={{
                                    background: 'linear-gradient(to right, #2971ea, #1b4aee)', textAlign:'center',
                                    color:"white", borderRadius: 10, fontFamily: 'Montserrat', width:'90%'}}>
                                    Contact</Button>
                              </div>
                          </div>                           
                      </Grid.Column>
                  </Grid>
                </Grid.Column>

              </Grid>  

            </Grid.Column>



            <Grid.Column width={16} only='tablet' style={{marginTop:'1rem'}}>
              <Grid columns={2}>
                <Grid.Column width={4}>
                  <Image src={logo} size='large' style={{ width: '100%', marginTop: '5%' }}/>
                </Grid.Column>

                <Grid.Column width={2} floated='right'>
                  <Dropdown className="floating left">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={scrollToTour} text='Take a Tour' />
                      <Dropdown.Item onClick={redirectToForm} text='Contact' />
                      
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>

            </Grid.Column>


            <Grid.Column width={16} only='mobile' style={{marginTop:'1rem'}}>
              <Grid columns={2}>
                <Grid.Column width={6}>
                  <Image src={logo} size='big' />
                </Grid.Column>

                <Grid.Column floated='right' width={4}>
                  <Dropdown className="floating left">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={scrollToTour} text='Take a Tour' />
                      <Dropdown.Item onClick={redirectToForm} text='Contact' />                      
                    </Dropdown.Menu>
                  </Dropdown>
                  
                </Grid.Column>
              </Grid>
            </Grid.Column>
              
             
          </Grid>


        </div>

        <Grid centered >        
          <Grid.Row only='computer'>          
            <div style={{marginTop: '5%', fontFamily: 'Montserrat', fontSize:'100%',
             marginLeft: '20%', marginRight: '20%', lineHeight:'40px', height: '150px', overflow:'hidden', 
             }}>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Affordable and instant solutions for UK students',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Affordable and instant solutions for career guidance',
                  1000,
                  'Affordable and instant solutions for academic growth',
                  1000,
                  'Affordable and instant solutions for career development',
                  1000,
                  'Affordable and instant solutions for discovering courses',
                  1000,
                  'Affordable and instant solutions for exploring universities',
                  1000,
                  'Affordable and instant solutions for finance management',
                  1000
                ]}
                wrapper="span"
                speed={50}                             
                cursor={true}
                style={{ fontSize: '2em', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
                repeat={Infinity}
              />
            </div>
          </Grid.Row>


          <Grid.Row only='tablet'>          
            <div style={{marginTop: '5%', fontFamily: 'Montserrat',
             marginLeft: '20%', marginRight: '20%', lineHeight:'45px', height:'150px', overflow:'hidden', }}>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Affordable and instant solutions for UK students',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Affordable and instant solutions for career guidance',
                  1000,
                  'Affordable and instant solutions for academic growth',
                  1000,
                  'Affordable and instant solutions for career development',
                  1000,
                  'Affordable and instant solutions for discovering courses',
                  1000,
                  'Affordable and instant solutions for exploring universities',
                  1000,
                  'Affordable and instant solutions for finance management',
                  1000
                ]}
                wrapper="span"
                speed={50}                             
                cursor={true}
                style={{ fontSize: '40px', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
                repeat={Infinity}
              />
            </div>
          </Grid.Row>


          <Grid.Row only='mobile'>
          
            <div style={{marginTop: '5%', marginLeft: '20%', fontFamily: 'Montserrat',
             marginRight: '20%', lineHeight:'25px', height:'100px', overflow:'hidden'}}>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Affordable and instant solutions for UK students',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Affordable and instant solutions for career guidance',
                  1000,
                  'Affordable and instant solutions for academic growth',
                  1000,
                  'Affordable and instant solutions for career development',
                  1000,
                  'Affordable and instant solutions for discovering courses',
                  1000,
                  'Affordable and instant solutions for exploring universities',
                  1000,
                  'Affordable and instant solutions for finance management',
                  1000
                ]}
                wrapper="span"
                speed={50}   
                             
                cursor={{
                  show: true,
                  blink: true,
                  element: pencil, 
                }}
                style={{ fontSize: '24px', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
                repeat={Infinity}
              />
            </div>
          </Grid.Row>


          <LowerLandingPage/>


        </Grid>

        </div> 

        <div ref={tourRef}>
          <LandingTour/>
        </div>

        <LandingDo/>

        <LandingCapabilities/>

        <LandingPartners/>

        <LandingFooter/> 
        
    </div>
  )
}

export default LandingPage