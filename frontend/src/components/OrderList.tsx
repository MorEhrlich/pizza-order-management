import React from 'react';
import Order from './Order'; // Import the new Order component

interface OrderProps {
  id: number;
  title: string;
  status: string;
  orderTime: string; // Add orderTime for more details in each order
}

interface Props {
  orders: OrderProps[];
  onUpdateStatus: (id: number, status: string) => void;
}

const OrderList: React.FC<Props> = ({ orders, onUpdateStatus }) => {
  return (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          title={order.title}
          status={order.status}
          orderTime={order.orderTime}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default OrderList;
