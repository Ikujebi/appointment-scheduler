import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      console.log('Email:', email);
    console.log('Password:', password);

      const response = await axios.post('http://localhost:4444/api/auth/login', { email, password });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      
      // Redirect to host dashboard using navigate
      navigate('/host-dashboard'); // Navigate to host dashboard after login
    } catch (error) {
      alert('Invalid email or password');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='mb'>
      <h1>Host Login</h1>
      <div>
<div className=' bg-blue-100 rounded-md mt'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className=' outline-0 pl-5  lgn-input rounded-md w-[100%]'
      /> 
      </div>
      <div className=' bg-blue-100 rounded-md mt'>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className=' outline-0 pl-5  lgn-input rounded-md w-[100%]'
      />
      </div>
      </div>
      <div className='flex justify-center mt bg-blue-300 '>
      <button onClick={handleLogin} className='lgn-input font-bold w-[100%] '>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
