import React from 'react';
import '../styles/Order.css'; // Use centralized styles

interface OrderProps {
  id: number;
  title: string;
  status: string;
  orderTime: string;
  onUpdateStatus: (id: number, status: string) => void;
}

const Order: React.FC<OrderProps> = ({ id, title, status, orderTime, onUpdateStatus }) => {
  return (
    <div className="order-card">
      <h3 className="order-title">{title}</h3>
      <p className="order-status">
        <strong>Status:</strong> {status}
      </p>
      <p className="order-time">
        <strong>Order Time:</strong> {new Date(orderTime).toLocaleString()}
      </p>
      <div className="order-actions">
        <button onClick={() => onUpdateStatus(id, 'Preparing')} className="btn preparing">
          Mark as Preparing
        </button>
        <button onClick={() => onUpdateStatus(id, 'Delivered')} className="btn delivered">
          Mark as Delivered
        </button>
      </div>
    </div>
  );
};

export default Order;
