import React, { useState } from 'react';
import '../styles/Order.css';
import StatusButton from './StatusButton';
import OrderDetails from './OrderDetails';

interface SubItem {
  title: string;
  amount: number;
  type: string;
}

interface OrderProps {
  id: number;
  title: string;
  status: string;
  orderTime: string;
  subItems: SubItem[];
  onUpdateStatus: (id: number, status: string) => void;
}

const Order: React.FC<OrderProps> = ({ id, title, status, orderTime, subItems, onUpdateStatus }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`order-card ${expanded ? 'expanded' : ''}`}>
      <div className="order-summary">
        <span className="order-id">{id}</span>
        <span className="order-title">{title}</span>
        <span className="order-time">{new Date(orderTime).toLocaleString()}</span>
        <StatusButton
          status={status}
          onChangeStatus={(newStatus) => onUpdateStatus(id, newStatus)}
        />
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {expanded && <OrderDetails subItems={subItems} expanded={expanded} />}
    </div>
  );
};

export default Order;
