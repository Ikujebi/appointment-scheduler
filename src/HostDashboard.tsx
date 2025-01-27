import  { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  _id: string;
  guestName: string;
  appointmentTime: string;
  status: 'pending' | 'accepted' | 'canceled';
}

function HostDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/accept`);
      fetchAppointments(); // Refresh appointment list
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      fetchAppointments(); // Refresh appointment list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Host Dashboard</h1>
      {appointments.map(appointment => (
        <div key={appointment._id}>
          <h3>{appointment.guestName} - {new Date(appointment.appointmentTime).toLocaleString()}</h3>
          <p>Status: {appointment.status}</p>
          {appointment.status === 'pending' && (
            <div>
              <button onClick={() => handleAccept(appointment._id)}>Accept</button>
              <button onClick={() => handleCancel(appointment._id)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HostDashboard;
