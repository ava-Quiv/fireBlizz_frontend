import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CompanyReport() {
  const [customerStats, setCustomerStats] = useState(null);
  const [commodityReport, setCommodityReport] = useState(null);
  const [serviceReport, setServiceReport] = useState(null);
  const [bookingReport, setBookingReport] = useState(null);
  const [serviceBookingReport, setServiceBookingReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Starting fetch for all reports...');

    const fetchData = async (url, setter, name) => {
      try {
        const res = await axios.get(url);
        console.log(`${name} data received:`, res.data);
        setter(res.data);
      } catch (err) {
        console.error(`Error fetching ${name}:`, err);
        setError(`Failed to load ${name} data`);
      }
    };

    fetchData('https://firebliss-1.onrender.com/report/customers/stats', setCustomerStats, 'Customer Stats');
    fetchData('https://firebliss-1.onrender.com/report/commodities/report', setCommodityReport, 'Commodity Report');
    fetchData('https://firebliss-1.onrender.com/report/services/report', setServiceReport, 'Service Report');
    fetchData('https://firebliss-1.onrender.com/report/bookings/report', setBookingReport, 'Booking Report');
    fetchData('https://firebliss-1.onrender.com/report/reports/service-bookings', setServiceBookingReport, 'Service Booking Report');
  }, []);

  if (error)
    return (
      <div className="text-red-600 bg-red-100 p-4 rounded-md max-w-3xl mx-auto mt-10">
        Error: {error}
      </div>
    );

  const safeFixed = (num, decimals = 2) =>
    typeof num === 'number' && !isNaN(num) ? num.toFixed(decimals) : '0.00';

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans space-y-10">
      <h1 className="text-4xl font-bold text-center mb-6">📊 Company Progress Report</h1>

      {/* Customer Stats */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">👥 Customers</h2>
        {!customerStats && <p className="text-gray-500">Loading customer stats...</p>}
        {customerStats && (
          <>
            <p className="mb-2">
              <strong>Total Customers:</strong> {customerStats.total ?? 'N/A'}
            </p>
            <h4 className="font-semibold mb-2">Status Breakdown:</h4>
            <ul className="list-disc list-inside space-y-1">
              {customerStats.statusBreakdown
                ? Object.entries(customerStats.statusBreakdown).map(([status, count]) => (
                    <li key={status} className="capitalize">
                      {status}: {count}
                    </li>
                  ))
                : <li>No status breakdown data</li>}
            </ul>
          </>
        )}
      </section>

      {/* Commodity Report */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">📦 Commodities</h2>
        {!commodityReport && <p className="text-gray-500">Loading commodity report...</p>}
        {commodityReport && (
          <div className="space-y-2">
            <p><strong>Total Commodities:</strong> {commodityReport.total ?? 'N/A'}</p>
            <p><strong>Total Pieces:</strong> {commodityReport.totalPieces ?? 'N/A'}</p>
            <p><strong>Average Price:</strong> ${safeFixed(commodityReport.avgPrice)}</p>
            <p><strong>Total Value:</strong> ${safeFixed(commodityReport.totalValue)}</p>
          </div>
        )}
      </section>

      {/* Service Report */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Services</h2>
        {!serviceReport && <p className="text-gray-500">Loading service report...</p>}
        {serviceReport && (
          <div className="space-y-2">
            <p><strong>Total Services:</strong> {serviceReport.total ?? 'N/A'}</p>
            <p><strong>Available:</strong> {serviceReport.available ?? 'N/A'}</p>
            <p><strong>Unavailable:</strong> {serviceReport.unavailable ?? 'N/A'}</p>
            <p><strong>Average Price:</strong> ${safeFixed(serviceReport.avgPrice)}</p>
            <p><strong>Average Duration:</strong> {safeFixed(serviceReport.avgDuration, 1)} minutes</p>
          </div>
        )}
      </section>

      {/* Booking Report */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">📅 Bookings</h2>
        {!bookingReport && <p className="text-gray-500">Loading booking report...</p>}
        {bookingReport && (
          <>
            <p className="mb-2"><strong>Total Bookings:</strong> {bookingReport.totalBookings ?? 'N/A'}</p>

            <h4 className="font-semibold mb-1">Status Counts:</h4>
            <ul className="list-disc list-inside mb-3">
              {bookingReport.statusCounts
                ? Object.entries(bookingReport.statusCounts).map(([status, count]) => (
                    <li key={status} className="capitalize">{status}: {count}</li>
                  ))
                : <li>No booking status data</li>}
            </ul>

            <h4 className="font-semibold mb-1">Payment Status Counts:</h4>
            <ul className="list-disc list-inside mb-3">
              {bookingReport.paymentStatusCounts
                ? Object.entries(bookingReport.paymentStatusCounts).map(([status, count]) => (
                    <li key={status} className="capitalize">{status}: {count}</li>
                  ))
                : <li>No payment status data</li>}
            </ul>

            <h4 className="font-semibold mb-1">Payment Method Counts:</h4>
            <ul className="list-disc list-inside mb-3">
              {bookingReport.paymentMethodCounts
                ? Object.entries(bookingReport.paymentMethodCounts).map(([method, count]) => (
                    <li key={method} className="capitalize">{method}: {count}</li>
                  ))
                : <li>No payment method data</li>}
            </ul>

            <p><strong>Total Revenue (paid):</strong> ${safeFixed(bookingReport.totalRevenue)}</p>
          </>
        )}
      </section>

      {/* Service Booking Report */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🔧 Service Bookings</h2>
        {!serviceBookingReport && <p className="text-gray-500">Loading service booking report...</p>}
        {serviceBookingReport && (
          <>
            <p className="mb-2"><strong>Total Service Bookings:</strong> {serviceBookingReport.totalBookings ?? 'N/A'}</p>

            <h4 className="font-semibold mb-1">Status Counts:</h4>
            <ul className="list-disc list-inside mb-3">
              {serviceBookingReport.statusCounts
                ? Object.entries(serviceBookingReport.statusCounts).map(([status, count]) => (
                    <li key={status} className="capitalize">{status}: {count}</li>
                  ))
                : <li>No service booking status data</li>}
            </ul>

            <h4 className="font-semibold mb-1">Payment Method Counts:</h4>
            <ul className="list-disc list-inside mb-3">
              {serviceBookingReport.paymentMethodCounts
                ? Object.entries(serviceBookingReport.paymentMethodCounts).map(([method, count]) => (
                    <li key={method} className="capitalize">{method}: {count}</li>
                  ))
                : <li>No service booking payment method data</li>}
            </ul>

            <h4 className="font-semibold mb-1">Service Booking Counts (Top Services):</h4>
            <ol className="list-decimal list-inside space-y-1">
              {serviceBookingReport.serviceBookingCounts && serviceBookingReport.serviceBookingCounts.length > 0 ? (
                serviceBookingReport.serviceBookingCounts.map(({ serviceId, serviceName, count }) => (
                  <li key={serviceId}>
                    {serviceName} - <span className="font-medium">{count} bookings</span>
                  </li>
                ))
              ) : (
                <p>No service booking count data available.</p>
              )}
            </ol>
          </>
        )}
      </section>
    </div>
  );
}
