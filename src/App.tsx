import  { useState } from 'react'; 
import axios from 'axios';

function App() {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [hostName, setHostName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleBookAppointment = async () => {
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        guestName,
        guestEmail,
        hostName,
        appointmentTime
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error(error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Book Appointment</h1>
      <form className="appointment-form" onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
        <input className="input-field" type="text" placeholder="Guest Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
        <input className="input-field" type="email" placeholder="Guest Email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
        <input className="input-field" type="text" placeholder="Host Name" value={hostName} onChange={(e) => setHostName(e.target.value)} />
        <input className="input-field" type="datetime-local" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
        <button className="submit-btn" type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default App;
