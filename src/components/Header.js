import React, {useState, useEffect} from 'react'
import { Grid, Image, Icon} from 'semantic-ui-react'

import career_mate from "../assets/career_mate.svg";

import "./head_css.css";



function Header({visible, onVisibleChange }) {

    const [arrow, setArrow] = useState("arrow right");

    useEffect(() => {
        if(visible===true)
        {
            setArrow("arrow left");
        }
        else
        {
            setArrow("arrow right");
        }
      }, [visible]);

      const handlearrowclick = ()=>
      {
        if(visible===true)
        {
            visible=false;
            onVisibleChange(visible);
            setArrow("arrow right");
        }
        else
        {
            visible=true;
            onVisibleChange(visible);
            setArrow("arrow left");
        }
      }

  return (
    <div style={{ backgroundColor:'#ffffff'}}>
        <div style={{marginLeft: "3%", marginRight: "3%", marginTop:'1%', marginBottom:'1%',}}>

            <Grid >
                <Grid.Row>

                    <Grid.Column verticalAlign='middle' width={1}>
                        <div onClick={handlearrowclick} style={{cursor:'pointer'}}>
                            <Icon name={arrow} />
                        </div>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' width={3}>
                        <Image src={career_mate} size='small' />
                    </Grid.Column>

                </Grid.Row>
            </Grid>


            {/* <Grid >
                <Grid.Row width={6} only='computer' >

                    <Grid.Column verticalAlign='middle'>
                        <Image src={logo} size='tiny' />
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <h2 style={{fontSize: '1.5rem', fontFamily: 'Montserrat'}}>Career Mate</h2>
                    </Grid.Column>
                    
                    <div class="horizontal-container">
                        <div class="item">
                            
                        </div>
                        <div class="item">
                            
                        </div>
                        
                    </div>                     

                </Grid.Row>
                

                <Grid.Column width={5} only='tablet'>
                    
                    <div class="horizontal-container">
                        <div class="item">
                            <Image src={logo} size='tiny' style={{ width: '100%', minWidth: '50px', maxWidth: '80px' }}/>
                        </div>
                        <div class="item">
                            <h2>ThinkLabsAI</h2>
                        </div>
                        
                    </div>                     

                </Grid.Column>

                
                <Grid.Column floated='right' width={4} only='computer'>
                    <Grid>
                        <Grid.Column floated='left' width={8} verticalAlign='middle'>
                            <div class="horizontal-container">
                                <div class="item">
                                    <p>
                                        <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                    </p>
                                </div>
                            </div>
                            
                        </Grid.Column>

                        <Grid.Column floated='right' width={8}>
                            <div class="horizontal-container">
                                <div class="item">
                                    <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", borderRadius: 10}}>Sign Out</Button>
                                </div>
                            </div> 
                            
                        </Grid.Column>

                    </Grid>
                                
                </Grid.Column>


                <Grid.Column floated='right' width={4} only='tablet'>
                    <Grid>
                        <Grid.Column floated='left' width={8} verticalAlign='middle'>
                            <div class="horizontal-container">
                                <div class="item">
                                    <p>
                                        <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                    </p>
                                </div>
                            </div>
                            
                        </Grid.Column>

                        <Grid.Column floated='right' width={8}>
                            <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", fontsize:"10px", borderRadius: 4}}>
                                <Icon name='sign out' />
                            </Button>                        
                        </Grid.Column>

                    </Grid>
                                
                </Grid.Column>



            </Grid> */}


            {/* <Grid verticalAlign="middle">
                <Grid.Column width={7} only='mobile'>
                    <div class="horizontal-container">
                        <div class="item" style={{ width: '100%', minWidth: '30px', maxWidth: '60px' }}>
                            <Image src={logo} size='mid' />
                        </div>
                        <div class="item">
                            <h3>ThinkLabsAI</h3>
                        </div>
                    </div>                     
                    
                </Grid.Column>

                <Grid.Column floated='right' width={6} only='mobile'>

                    <Grid>
                        <Grid.Column floated='left' verticalAlign='middle'>
                            <div class="horizontal-container">
                                <div class="item">
                                    <p>
                                        <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                    </p>
                                </div>
                            </div>

                        </Grid.Column>

                        <Grid.Column floated='right' width={8}>
                            <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", fontsize:"10px", borderRadius: 4}}>
                                <Icon name='sign out' />
                            </Button>                        
                        </Grid.Column>

                    </Grid>

                    
                                    
                </Grid.Column>
            </Grid> */}
        </div>
    </div>
  )
}

export default Header