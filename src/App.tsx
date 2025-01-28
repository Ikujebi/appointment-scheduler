// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login'; // Import HostDashboard component
import Guest from './Guest'; // Import Guest component
import HostDashboard from './HostDashboard';
function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="heading" style={{marginTop: '20rem'}}>Appointment System</h1>

        {/* Navigation Links */}
        <nav >
          <ul>
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
