import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://https://firebliss-1.onrender.com'; // Change if needed

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bookings`);
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={styles.container}>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customer?.name || 'N/A'} <br /> ({booking.customer?.email})</td>
                <td>{booking.service?.name || 'N/A'} <br /> ${booking.service?.price}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>{booking.paymentMethod}</td>
                <td>{booking.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thtd: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
};

export default AllBookings;
