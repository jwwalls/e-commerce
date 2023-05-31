import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './pages/NavBar';
import Footer from './components/Footer';
import RRoutes from './components/Routes'; 
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <div className='logo'>SHOE<span>N</span>STAR</div>
        <Navbar />
        <RRoutes token={token} setToken={setToken} user={user} setUser={setUser} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;