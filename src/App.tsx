// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login'; // Import HostDashboard component
import Guest from './Guest'; // Import Guest component
import HostDashboard from './HostDashboard';
import {useState, useEffect} from 'react'
function App() {

  const [isHostDashboard, setIsHostDashboard] = useState(false);

  useEffect(() => {
    // Listen for route changes dynamically
    const handleRouteChange = () => {
      setIsHostDashboard(window.location.pathname === '/host-dashboard');
    };

    handleRouteChange(); // Check initially
    window.addEventListener('popstate', handleRouteChange); // Handle browser navigation

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <Router>
      <div  style={isHostDashboard ? { marginTop: '42rem' } : {}} className="container md:w-[35rem] lg:w-[35rem] xl:w-[50rem] 2xl:w-[50rem]">
        <h1 className="heading" >Appointment System</h1>

        {/* Navigation Links */}
        <nav >
          <ul className='flex gap-5 justify-end font-semibold'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Host Dashboard</Link></li>
          </ul>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Guest />} /> {/* Guest component */}
          <Route path="/login" element={<Login />} />
          <Route path="/host-dashboard" element={<HostDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
