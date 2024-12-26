import React, { useEffect, useState } from 'react';
import { fetchOrders ,updateOrderStatus } from './services/api'; // Import the fetch function
import './styles/App.css';
import OrderList from './components/OrderList';
import OrderMap from './components/OrderMap';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]); // State to store fetched orders
  const [error, setError] = useState<string | null>(null); // State to store any errors
  const [sortKey, setSortKey] = useState<string>('title'); // Default sort key
  const [showUndelivered, setShowUndelivered] = useState(false); // Filter state

  // Fetch data when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(); // Call the fetch function
        setOrders(data); // Update state with the fetched data
      } catch (err: any) {
        setError(err.message); // Handle errors
      }
    };

    loadOrders();
    const interval = setInterval(loadOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredOrders = showUndelivered
    ? orders.filter((order) => order.status !== 'Delivered')
    : orders;

  // Apply sorting
  const sortedAndFilteredOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === 'orderTime') {
      return new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime();
    }
    return a[sortKey].localeCompare(b[sortKey]);
  });

  if (error) return <div>Error: {error}</div>; // Display error message if there's an issue

  return (
    <div className="app-container">
           <Sidebar />
      <main className="content">
        <div className="controls">
          <h1>Pizza Order Management</h1>
      <div className="controls-bar">
            <label>Sort By:</label>
            <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="orderTime">Order Time</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={showUndelivered}
                onChange={() => setShowUndelivered(!showUndelivered)}
              />
              Show Only Undelivered Orders
            </label>
          </div>
        </div>
      {/* Order List */}
      <OrderList orders={sortedAndFilteredOrders} onUpdateStatus={handleUpdateStatus} />
      <h2>Order Locations</h2>
      <OrderMap orders={orders} />
      </main>
    </div>
  );
};

export default App;

