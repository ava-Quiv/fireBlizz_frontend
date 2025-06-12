import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDash = () => {
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentServices, setRecentServices] = useState([]);

  const [countEmployee, setCountEmployee] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [countServices, setCountServices] = useState(null); // Changed to null for better fallback handling

  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [errorCustomers, setErrorCustomers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://firebliss-1.onrender.com/api/addemp/countEmployee')
      .then((response) => {
        setCountEmployee(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching employee count:', error);
      });
  }, []);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await axios.get('https://firebliss-1.onrender.com/add/customer/countCustomer');
        setCustomerCount(response.data.totalCustomers);
      } catch (error) {
        setError('Error fetching customer count');
        console.error(error);
      }
    };
    fetchCustomerCount();
  }, []);

  useEffect(() => {
    axios
      .get('https://firebliss-1.onrender.com/api/addemp/recent-employees')
      .then((response) => {
        setRecentEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent employees:', error);
      });
  }, []);

  useEffect(() => {
    const fetchRecentCustomers = async () => {
      try {
        const response = await axios.get('https://firebliss-1.onrender.com/add/customer/recent-customers');
        setRecentCustomers(response.data);
      } catch (error) {
        setErrorCustomers(error.message);
      } finally {
        setIsLoadingCustomers(false);
      }
    };
    fetchRecentCustomers();
  }, []);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await axios.get('https://firebliss-1.onrender.com/api/report/commodities/first-four');
        setRecentProducts(response.data);
      } catch (error) {
        console.error('Error fetching recent products:', error);
      }
    };
    fetchRecentProducts();
  }, []);

  useEffect(() => {
    const fetchRecentServices = async () => {
      try {
        const response = await axios.get('https://firebliss-1.onrender.com/api/report/services/first-three');
        setRecentServices(response.data);
      } catch (error) {
        console.error('Error fetching recent services:', error);
      }
    };
    fetchRecentServices();
  }, []);

  useEffect(() => {
    axios
      .get('https://firebliss-1.onrender.com/api/report/total-products')
      .then((response) => {
        setProductCount(response.data.totalProducts);
      })
      .catch((error) => {
        console.error('Error fetching total products:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://firebliss-1.onrender.com/api/report/services/count')
      .then((response) => {
        setCountServices(response.data.countServices);
      })
      .catch((error) => {
        console.error('Error fetching service count:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://firebliss-1.onrender.com/api/report/total-revenue')
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue);
      })
      .catch((error) => {
        console.error('Error fetching total revenue:', error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white p-6 h-full">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/user" className="hover:text-green-300">Users</Link>
          </li>
          <li className="mb-4">
            <Link to="/employee" className="hover:text-green-300">Employees</Link>
          </li>
          <li className="mb-4">
            <Link to="/reports" className="hover:text-green-300">Progress Report</Link>
          </li>
          <li className="mb-4">
            <Link to="/productReport" className="hover:text-green-300">product bookings</Link>
          </li>
          <li className="mb-4">
            <Link to="/serviceBookingReport" className="hover:text-green-300">booked services</Link>
          </li>
          <li>
            <Link to="/Login" className="hover:text-green-300">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        <h2 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h2>
        <p className="mt-4 text-lg">Select an option from the sidebar to get started.</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-500 hover:text-white transition">
            <Link to="/employee" className="text-xl font-semibold mb-4"><h3>Employees</h3></Link>
            <p className="text-gray-600">View and manage employees.</p>
            <p className="text-yellow-950">Total employees: {countEmployee}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <p className="text-gray-600 mb-2">Manage your product listings.</p>
            <p className="text-yellow-950 mb-1">Total products: {productCount}</p>
            <p className="text-yellow-950">Total revenue: ${totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Customers</h3>
            <p className="text-gray-600">View and manage customers.</p>
            <p className="text-yellow-950">Total customers: {customerCount}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <p className="text-gray-600">Overview of available services.</p>
            {countServices !== null ? (
              <p className="text-yellow-950">Total services: {countServices}</p>
            ) : (
              <p className="text-red-500">Could not load service count</p>
            )}
          </div>
        </div>

        <div className="border-t-4 border-green-600 my-6"></div>

        {/* Recent Items */}
        <div className="flex flex-wrap gap-6 mt-6">
          {/* Recent Employees */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/4 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Our Recent Employees</h3>
            <ul className="space-y-2">
              {recentEmployees.length > 0 ? (
                recentEmployees.map((employee) => (
                  <li key={employee._id} className="text-gray-600">
                    <p className="font-semibold">{employee.firstName} {employee.lastName}</p>
                    <p className="text-sm">{employee.role}</p>
                    <p className="text-xs text-gray-400">
                      Added on: {new Date(employee.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No recent employees found.</p>
              )}
            </ul>
          </div>

          {/* Recent Customers */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/4 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Our Recent Customers</h3>
            {isLoadingCustomers ? (
              <p className="text-gray-500">Loading...</p>
            ) : errorCustomers ? (
              <p className="text-red-500">Error: {errorCustomers}</p>
            ) : recentCustomers.length > 0 ? (
              <ul className="space-y-2">
                {recentCustomers.map((customer) => (
                  <li key={customer.email} className="text-gray-600">
                    <p className="font-semibold">{customer.firstName}</p>
                    <p className="text-sm">{customer.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent customers found.</p>
            )}
          </div>

          {/* Recent Products */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/4 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Recent Products</h3>
            {recentProducts.length > 0 ? (
              <ul className="space-y-2">
                {recentProducts.map((product) => (
                  <li key={product._id} className="text-gray-600">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">Price: ${product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      Added on: {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent products found.</p>
            )}
          </div>

          {/* Recent Services */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/4 hover:bg-green-500 hover:text-white transition">
            <h3 className="text-xl font-semibold mb-4">Recent Services</h3>
            {recentServices.length > 0 ? (
              <ul className="space-y-2">
                {recentServices.map((service) => (
                  <li key={service._id} className="text-gray-600">
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm">Price: ${service.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      Added on: {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent services found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
