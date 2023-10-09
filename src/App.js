import Dashboard from './components/Dashboard.js';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import PageNotFound from './components/PageNotFound.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import ForgotPassword from './components/ForgotPassword.js';

function App() {
  return (
    <div style={{marginTop:'1%'}}>
      <Router>
        <Routes >
          <Route exact path="/" element={<Dashboard/>}/>  
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
