import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Get the admin's ID from the URL
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get(`https://firebliss.onrender.com/api/auth/profile/${id}`);
        setAdmin(response.data);
      } catch (error) {
        setError('Failed to fetch admin profile.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [id]); // Re-fetch when `id` changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-white">
      <h2 className="text-3xl font-semibold">Admin Profile</h2>

      {admin ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold">{admin.fullName}</h3>
          <p className="text-lg">Email: {admin.email}</p>
          <p className="text-lg">Role: {admin.phoneNumber}</p>
          <p className="text-lg">Joined on: {new Date(admin.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No admin profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
