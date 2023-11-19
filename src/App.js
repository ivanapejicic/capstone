import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home/Home';
import User from './assets/pages/User/User';
import About from './assets/components/About/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/user' element={<User />} />
          <Route path= '/about' element={<About />} />  
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
