import Dashboard from './components/Dashboard.js';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import PageNotFound from './components/PageNotFound.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import ForgotPassword from './components/ForgotPassword.js';
import LandingPage from './components/LandingPage.js';
import Terms from './components/Terms.js';
import Privacy from './components/Privacy.js';

function App() {
  return (
    <div style={{marginTop:'0%'}}>
      <Router>
        <Routes >
          <Route exact path="/" element={<LandingPage/>}/> 
          <Route exact path="/terms" element={<Terms/>}/>
          <Route exact path="/privacy" element={<Privacy/>}/>
          <Route exact path="/chatbot" element={<Dashboard/>}/>  
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/signup" element={<Signup/>}/> 
          <Route exact path="/forgotpassword" element={<ForgotPassword/>}/> 
          <Route path="*" element={<PageNotFound/>} />        
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
