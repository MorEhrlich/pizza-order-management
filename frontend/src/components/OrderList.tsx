import React from 'react';

interface Order {
  id: number;
  title: string;
  status: string;
}

interface Props {
  orders: Order[];
  onUpdateStatus: (id: number, status: string) => void;
}

const OrderList: React.FC<Props> = ({ orders, onUpdateStatus }) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.title} - {order.status}
          <button onClick={() => onUpdateStatus(order.id, 'Preparing')}>Prepare</button>
          <button onClick={() => onUpdateStatus(order.id, 'Delivered')}>Deliver</button>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
