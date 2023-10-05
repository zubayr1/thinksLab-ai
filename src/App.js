import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

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
