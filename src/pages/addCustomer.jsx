import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Added password state
  const [phone, setPhone] = useState('');  // Added phone state
  const [error, setError] = useState(''); // To handle error messages
  const [success, setSuccess] = useState(''); // To handle success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the customer data object
    const customerData = {
      firstName,
      lastName,
      email,
      password, // Add password to the data object
      phone,   // Added phone to the data object
      status :'pending', // default status of the customer after sign up
    };

    try {
      // Make a POST request to your backend API
      const response = await axios.post('http://localhost:5000/add/customer/addCustomer', customerData);

      // On success, reset the form and display success message
      setSuccess('Customer added successfully!');
      setError(''); // Clear any existing errors
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');  // Reset the phone field
    } catch (err) {
      console.error('Error adding customer:', err);
      // If there's an error, display the error message
      setError('Failed to add customer. Please try again.');
      setSuccess(''); // Clear any success messages
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Customer</h2>

        {/* Display success or error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
