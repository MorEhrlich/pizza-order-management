import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { fetchOrders ,updateOrderStatus } from './services/api'; 
import OrderList from './components/OrderList';
import Sidebar from './components/Sidebar';
import ControlsBar from './components/ControlsBar';
import StatisticsChart from './components/StatisticsChart'; 
import ItemTypeChart from './components/ItemTypeChart';
import OrderMapPage from './pages/OrderMapPage';
import DashboardPage from './pages/DashboardPage';
import './styles/App.css';

const App: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>('orderTimeDesc'); 
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

  //statistics 
  const reservationStatistics = orders.reduce((acc: { [key: string]: number }, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const itemTypeStatistics = orders.reduce((acc: { [key: string]: number }, order) => {
    order.subItems.forEach((item: { type: string; amount: number }) => {
      acc[item.type] = (acc[item.type] || 0) + item.amount;
    });
    return acc;
  }, {});

  const totalOrders = orders.length;

  const additionalCounts = {
    "Received": orders.filter((order) => order.status === "Received").length,
    "Preparing": orders.filter((order) => order.status === "Preparing").length,
    "Ready": orders.filter((order) => order.status === "Ready").length,
    "EnRoute": orders.filter((order) => order.status === "EnRoute").length,
    "Delivered": orders.filter((order) => order.status === "Delivered").length,
  };

  if (error) return <div>Error: {error}</div>; 

  return (
    <Router>
    <div className="app-container">
           <Sidebar />
      <main className="content">
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
              path="/dashboard"
              element={
                <DashboardPage
                  reservationStatistics={reservationStatistics}
                  itemTypeStatistics={itemTypeStatistics}
                  totalOrders={totalOrders}
                  additionalCounts={additionalCounts}
                />
              }
            />
      <Route
              path="/orders"
              element={
                <>
      <h1 style={{textAlign: 'center'}}>Resturant Orders Management</h1>
        <div className="controls">
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
      </>
          }
          />
      <Route path="/order-map" element={<OrderMapPage />} />
      </Routes>
      </main>
    </div>
    </Router>
  );
};

export default App;

