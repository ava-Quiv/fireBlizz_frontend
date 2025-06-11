import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all customers (no filter logic)
  useEffect(() => {
    const url = 'https://firebliss.onrender.com/add/customer/seeCustomer';

    axios
      .get(url)
      .then((response) => {
        console.log('Fetched customers:', response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      (customer.firstName && customer.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.lastName && customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.phone && customer.phone.toString().includes(searchQuery))
    );
  });

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
