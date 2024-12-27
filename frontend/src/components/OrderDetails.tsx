import React from 'react';
import '../styles/OrderDetails.css';

interface SubItem {
  title: string;
  amount: number;
  type: string;
  
}

interface OrderDetailsProps {
  id: number;
  title: string;
  orderTime: string;
  subItems: SubItem[];
  // expanded: boolean;
}

// const OrderDetails: React.FC<OrderDetailsProps> = ({ subItems, expanded }) => {
  const OrderDetails: React.FC<OrderDetailsProps> = ({ id, title, orderTime, subItems }) => {
  return (
    // <div className={`order-details ${expanded ? 'expanded' : ''}`}>
    
       <div className="order-details">
        
         <h3>Order Details:</h3>
         <div className="order-info">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Reservation Time:</strong> {new Date(orderTime).toLocaleString()}</p>
      </div>
    <div className="subitems-header">
      <span className="header-title">Title</span>
      <span className="header-amount">Amount</span>
      <span className="header-type">Type</span>
    </div>
    <ul>
      {subItems.map((item, index) => (
        <li key={index}>
          <span>{item.title}</span>
          <span>{item.amount}</span>
          <span>{item.type}</span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default OrderDetails;// Ensure it's exported as default
