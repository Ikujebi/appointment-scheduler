import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  _id: string;
  guestName: string;
  appointmentTime: string;
  hostName: string;
  status: 'pending' | 'accepted' | 'canceled';
}

function HostDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch appointments from the API
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing from localStorage.');
      }

      const response = await axios.get<{ appointments: Appointment[] }>(
        'http://localhost:4444/api/hosts/appointments',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Ensure the appointments data is set properly
      setAppointments(response.data.appointments);
      setError(null); // Clear any previous error
    } catch (error) {
      handleError(error);
    }
  };

  // Function to handle errors
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred.');
    }
  };

  // Handle accepting an appointment
  const handleAccept = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing from localStorage.');
      }

      await axios.put(
        `http://localhost:4444/api/hosts/appointments/${id}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAppointments(); // Refresh appointment list after accepting
    } catch (error) {
      handleError(error);
    }
  };

  // Handle canceling an appointment
  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing from localStorage.');
      }

      await axios.delete(`http://localhost:4444/api/hosts/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments(); // Refresh appointment list after canceling
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch appointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div >
      <h1>Host Dashboard</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}
          >
            <h3>
              {appointment.guestName} -{' '}
              {new Date(appointment.appointmentTime).toLocaleString()}
            </h3>
            <h3>
              
            <div className='text-[.8rem]'> Host: {appointment.hostName}</div>
            </h3>
            <p>
              Status: <strong>{appointment.status}</strong>
            </p>
            {appointment.status === 'pending' && (
              <div className='flex justify-center'>
                <button onClick={() => handleAccept(appointment._id)}
                 style={{ marginRight: '10px',padding: '.18rem' }}
                 className='bg-green-400 rounded-md'>
                  Accept
                </button>
                <button onClick={() => handleCancel(appointment._id)}
                 style={{ marginRight: '10px',padding: '.18rem' }} 
                 className='bg-red-500 text-white rounded-md'>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default HostDashboard;
