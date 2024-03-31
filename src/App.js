import Dashboard from './components/Dashboard.js';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import PageNotFound from './components/PageNotFound.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import ForgotPassword from './components/ForgotPassword.js';
import LandingPage from './components/LandingPage.js';
import Terms from './components/Terms.js';
import Privacy from './components/Privacy.js';
import Admin from './components/admin/Admin.js';
import AdminLandingPage from './components/admin/AdminLandingPage.js';
import AdminLogin from './components/admin/AdminLogin.js';
import AdminSignup from './components/admin/AdminSignup.js';
import AdminDashboard from './components/admin/AdminDashboard.js';

import './App.css';
import Contact from './components/Contact.js';

function App() {
  return (
    <div style={{marginTop:'0%'}}>
      <Router>
        <Routes >
          <Route exact path="/" element={<LandingPage/>}/> 
          <Route exact path="/terms" element={<Terms/>}/>
          <Route exact path="/privacy" element={<Privacy/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/chatbot" element={<Dashboard/>}/>  
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/signup" element={<Signup/>}/> 
          <Route exact path="/forgotpassword" element={<ForgotPassword/>}/> 

          <Route exact path="/admin" element={<Admin/>}/> 
          <Route exact path="/adminlandingpage" element={<AdminLandingPage/>}/> 
          <Route exact path="/adminLogin" element={<AdminLogin/>}/> 
          <Route exact path="/adminSignup" element={<AdminSignup/>}/> 
          <Route exact path="/adminchatbot" element={<AdminDashboard/>}/> 

          <Route path="*" element={<PageNotFound/>}/>        
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
