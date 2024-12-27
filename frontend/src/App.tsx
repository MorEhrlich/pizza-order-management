import React, { useEffect, useState } from 'react';
import { fetchOrders ,updateOrderStatus } from './services/api'; 
import OrderList from './components/OrderList';
import OrderMap from './components/OrderMap';
import Sidebar from './components/Sidebar';
import ControlsBar from './components/ControlsBar';
import './styles/App.css';

const App: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>('orderTimeAsc'); 
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(); 
        setOrders(data);
      } catch (err: any) {
        setError(err.message); 
      }
    };

    loadOrders();
    const interval = setInterval(loadOrders, 5000); 
    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    setCurrentPage(1); 
  }, [sortKey, filterStatus]);
  

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

  //filtering
  const filteredOrders = filterStatus === 'all'
  ? orders
  : filterStatus === 'undelivered'
  ? orders.filter((order) => order.status !== 'Delivered')
  : orders.filter((order) => order.status === filterStatus);

  //sorting
  const sortedAndFilteredOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === 'orderTimeAsc') {
      return new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime(); 
    }
    if (sortKey === 'orderTimeDesc') {
      return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime(); 
    }
    return a[sortKey].localeCompare(b[sortKey]); 
  });

  if (error) return <div>Error: {error}</div>; 

  return (
    <div className="app-container">
           <Sidebar />
      <main className="content">
        <div className="controls">
          <h1>Pizza Order Management</h1>
          <ControlsBar
            sortKey={sortKey}
            setSortKey={setSortKey}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            pageSize={pageSize} 
            setPageSize={setPageSize} 
          />
        </div>
      <OrderList 
        orders={sortedAndFilteredOrders}
        onUpdateStatus={handleUpdateStatus}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        />
      <h2>Order Locations</h2>
      <OrderMap orders={orders} />
      </main>
    </div>
  );
};

export default App;

