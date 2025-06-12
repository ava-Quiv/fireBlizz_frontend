import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch customers based on the filter (status)
  useEffect(() => {
    let url = 'https://firebliss.onrender.com/add/customer/seeCustomer'; // Default URL for 'all' customers

    if (filter === 'active') {
      url = 'https://firebliss.onrender.com/add/customer/active';
    } else if (filter === 'rejected') {
      url = 'https://firebliss.onrender.com/add/customer/rejected';
    } else if (filter === 'suspended') {
      url = 'https://firebliss.onrender.com/add/customer/suspended';
    } else if (filter === 'pending') {
      url = 'https://firebliss.onrender.com/add/customer/pending';
    }

    axios
      .get(url)
      .then((response) => {
        console.log('Fetched customers:', response.data); // Debug log
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, [filter]);

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      (customer.firstName && customer.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.lastName && customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.phone && customer.phone.toString().includes(searchQuery))
    );
  });

  // Handle Approve action
  const handleApprove = async (customerId) => {
    try {
      await axios.put(`https://firebliss.onrender.com/add/customer/approve/${customerId}`);
      setCustomers(customers.map(customer =>
        customer._id === customerId ? { ...customer, status: 'active' } : customer
      ));
    } catch (error) {
      console.error('Error approving customer:', error);
    }
  };

  // Handle Reject action
  const handleReject = async (customerId) => {
    try {
      await axios.put(`https://firebliss.onrender.com/add/customer/reject/${customerId}`);
      setCustomers(customers.map(customer =>
        customer._id === customerId ? { ...customer, status: 'rejected' } : customer
      ));
    } catch (error) {
      console.error('Error rejecting customer:', error);
    }
  };

  // Handle Suspend action
  const handleSuspend = async (customerId) => {
    try {
      await axios.put(`https://firebliss.onrender.com/add/customer/suspend/${customerId}`);
      setCustomers(customers.map(customer =>
        customer._id === customerId ? { ...customer, status: 'suspended' } : customer
      ));
    } catch (error) {
      console.error('Error suspending customer:', error);
    }
  };

  // Handle Reactivate action
  const handleReactivate = async (customerId) => {
    try {
      await axios.put(`https://firebliss.onrender.com/add/customer/reactivate/${customerId}`);
      setCustomers(customers.map(customer =>
        customer._id === customerId ? { ...customer, status: 'active' } : customer
      ));
    } catch (error) {
      console.error('Error reactivating customer:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Customers Dashboard</h1>

      {/* Filter Buttons
      <div className="mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg mr-2 ${
            filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          All Customers
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg mr-2 ${
            filter === 'active' ? 'bg-green-700 text-white' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Active Customers
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg mr-2 ${
            filter === 'rejected' ? 'bg-red-700 text-white' : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Rejected Customers
        </button>
        <button
          onClick={() => setFilter('suspended')}
          className={`px-4 py-2 rounded-lg mr-2 ${
            filter === 'suspended' ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          Suspended Customers
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'pending' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Pending Customers
        </button>
      </div> */}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Phone</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No customers to display.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer._id} className="border-b">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-full ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : customer.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : customer.status === 'suspended'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {customer.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(customer._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(customer._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {customer.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleSuspend(customer._id)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                          Suspend
                        </button>
                        <button
                          onClick={() => handleReactivate(customer._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                          Reactivate
                        </button>
                      </>
                    )}
                    {customer.status === 'suspended' && (
                      <button
                        onClick={() => handleReactivate(customer._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersDashboard;
