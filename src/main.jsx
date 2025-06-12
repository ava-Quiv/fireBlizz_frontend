import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Import the App component
import AdminDash from './pages/admindash'; // Correct path for AdminDash
import Login from './pages/Login'; // Correct path for Login component
import User from './pages/user';
import AddCustomer from './pages/addCustomer';
import Employee from './pages/employee';
import AddEmployee from './pages/addemployee';
import AdminList from './pages/AdminList';
import Report from './pages/reports';
import ProductBookings from './pages/productReport';
import AllBookings from './pages/serviceBookingReport'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admindash" element={<AdminDash />} />
      <Route path="/login" element={<Login />} /> {/* Add a route for Login if needed */}
      <Route path="/user" element={<User />} /> {/* Add a route for Login if needed */}
      <Route  path ="addCustomer" element={<AddCustomer/>} />
      <Route path="employee" element={< Employee/>} />
      <Route path='addemployee' element={< AddEmployee/>} />
      <Route path='adminList' element={< AdminList/>}/>
      <Route path="/reports" element={< Report/>} />
      <Route path="/productReport" element={<ProductBookings />} />
      <Route path="/serviceBookingReport" element={< AllBookings/>} />
      
    </Routes>
  </Router>
);
