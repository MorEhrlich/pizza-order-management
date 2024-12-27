import React from 'react';
import '../styles/OrderDetails.css';

interface SubItem {
  title: string;
  amount: number;
  type: string;
  
}

interface OrderDetailsProps {
  subItems: SubItem[];
  expanded: boolean;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ subItems, expanded }) => {
  return (
    <div className={`order-details ${expanded ? 'expanded' : ''}`}>
         <h4>Order Details:</h4>
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
