import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminList = () => {
  const [admins, setAdmins] = useState([]); // Store the fetched admin data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(''); // Handle error messages

  // Fetch admin data when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('https://firebliss-1.onrender.com/api/auth/admins'); // Your API URL
        setAdmins(response.data); // Set the fetched data to the state
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        setError('Failed to fetch admins');
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchAdmins();
  }, []); // Empty dependency array means this runs only once, when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading message until the data is fetched
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if the fetch fails
  }

  return (
    <div className="admin-list">
      <h2 className="text-2xl font-semibold text-center mb-6">Admin List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admins) => (
            <tr key={admins._id}>
              <td className="py-2 px-4 border-b">{admins.fullName}</td>
              <td className="py-2 px-4 border-b">{admins.email}</td>
              <td className="py-2 px-4 border-b">{admins.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
