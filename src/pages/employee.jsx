import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employee = () => {
  const [customers, setCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Fetch employees based on the status filter
  useEffect(() => {
    let url = 'https://firebliss-1.onrender.com/api/addemp'; // Default to all employees
    if (statusFilter === 'active') {
      url = 'https://firebliss.onrender.com/api/addemp/active';
    } else if (statusFilter === 'suspended') {
      url = 'https://firebliss.onrender.com/api/addemp/suspended';
    }

    axios
      .get(url)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, [statusFilter]);

  // Handle activation of suspended employee
  const handleActivate = (id) => {
    axios
      .put(`https://firebliss.onrender.com/api/addemp/updateStatus/${id}`, { status: 'active' })
      .then((response) => {
        console.log(response.data.message);
        // Update the customers state to reflect the change
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === id ? { ...customer, status: 'active' } : customer
          )
        );
      })
      .catch((error) => {
        console.error('Error activating employee:', error);
      });
  };

  // Handle suspension of active employee
  const handleSuspend = (id) => {
    axios
      .put(`https://firebliss.onrender.com/api/addemp/updateStatus/${id}`, { status: 'suspended' })
      .then((response) => {
        console.log(response.data.message);
        // Update the customers state to reflect the change
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === id ? { ...customer, status: 'suspended' } : customer
          )
        );
      })
      .catch((error) => {
        console.error('Error suspending employee:', error);
      });
  };

  // Handle deletion of an employee
  const handleDelete = (id) => {
    axios
      .delete(`https://firebliss.onrender.com/api/addemp/deleteEmployee/${id}`)
      .then((response) => {
        console.log(response.data.message);
        // Remove the deleted employee from the state
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  // Filter employees based on the search query
  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(searchLower) ||
      customer.lastName.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar with Buttons */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <div>
          <button
            onClick={() => setStatusFilter('active')}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-4"
          >
            Active employees
          </button>
          <button
            onClick={() => setStatusFilter('suspended')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-4"
          >
            Suspended employees
          </button>
          <Link to={'/addemployee'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add employee
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64"
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto mt-6 mx-6">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left bg-gray-800 text-white">
              <th className="px-6 py-4">First Name</th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Password</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer._id} className="border-b">
                <td className="px-6 py-4">{customer.firstName}</td>
                <td className="px-6 py-4">{customer.lastName}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.role}</td>
                <td className="px-6 py-4">{customer.password}</td>
                <td className="px-6 py-4">{customer.status}</td>
                <td className="px-6 py-4">
                  {/* Actions */}
                  {customer.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleSuspend(customer._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                      >
                        Suspend
                      </button>
                    </>
                  )}
                  {customer.status === 'suspended' && (
                    <>
                      <button
                        onClick={() => handleActivate(customer._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                      >
                        Activate
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
