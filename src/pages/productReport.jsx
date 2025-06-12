import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://firebliss-1.onrender.com'; // 🔁 Change if needed

const ProductBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service/bookings/report`);
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = (bookingId) => {
    const url = `${BASE_URL}/product-bookings/${bookingId}/report`;
    window.open(url, '_blank'); // Opens a new tab to trigger download
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={styles.container}>
      <h2>Product Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thtd}>Customer</th>
              <th style={styles.thtd}>Product</th>
              <th style={styles.thtd}>Quantity</th>
              <th style={styles.thtd}>Status</th>
              <th style={styles.thtd}>Payment</th>
              <th style={styles.thtd}>Method</th>
              <th style={styles.thtd}>Transaction</th>
              <th style={styles.thtd}>Booked At</th>
              <th style={styles.thtd}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td style={styles.thtd}>{b.customer?.name || 'N/A'}<br />{b.customer?.email}</td>
                <td style={styles.thtd}>{b.product?.commodityName || 'N/A'}<br />${b.product?.price ?? 0}</td>
                <td style={styles.thtd}>{b.quantity}</td>
                <td style={styles.thtd}>{b.status}</td>
                <td style={styles.thtd}>{b.paymentStatus} (${b.paymentAmount})</td>
                <td style={styles.thtd}>{b.paymentMethod}</td>
                <td style={styles.thtd}>{b.transactionCode || '-'}</td>
                <td style={styles.thtd}>{new Date(b.bookedAt).toLocaleDateString()}</td>
                <td style={styles.thtd}>
                  <button onClick={() => downloadReceipt(b._id)} style={styles.button}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductBookings;

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  thtd: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
