import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home/Home';
import User from './assets/pages/User/User';
import About from './assets/components/About/About';
import Login from './assets/pages/Login/Login';
import Signup from './assets/pages/Signup/Signup';
import Rides from './assets/pages/Rides/Rides';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/user' element={<User />} />
          <Route path= '/about' element={<About />} />  
          <Route path= '/login' element={<Login />} />  
          <Route path= '/signup' element={<Signup />} /> 
          <Route path='/rides'  element={<Rides />} />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
