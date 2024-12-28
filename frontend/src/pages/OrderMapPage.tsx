import React, { useEffect, useState } from 'react';
import OrderMap from '../components/OrderMap';
import { fetchOrders } from '../services/api';
import '../styles/OrderMapPage.css';

const OrderMapPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);


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
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-map-page">
      <h1 style={{fontSize: '35px'}}>Orders Locations Map</h1>
      {orders.length > 0 ? (
        <OrderMap orders={orders} />
      ) : (
        <div>Loading orders...</div>
      )}
    </div>
  );
};

export default OrderMapPage;
