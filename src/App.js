import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home/Home';
import User from './assets/pages/User/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/user' element={<User />} />

          
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
