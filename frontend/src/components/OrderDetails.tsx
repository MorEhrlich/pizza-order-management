import React from 'react';
import '../styles/OrderDetails.css';

interface Topping {
  title: string;
  type: string;
  amount: number; 
}

interface SubItem {
  title: string;
  amount: number;
  type: string;
  toppings?: Topping[];
}

interface OrderDetailsProps {
  id: number;
  title: string;
  orderTime: string;
  subItems: SubItem[];
}

  const OrderDetails: React.FC<OrderDetailsProps> = ({ id, title, orderTime, subItems }) => {
  return (
    <div className="order-details">
    <h3>Order Details:</h3>
    <div className="order-info">
      <p><strong>Order ID:</strong> {id}</p>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Reservation Time:</strong> {new Date(orderTime).toLocaleString()}</p>
    </div>
    <div className='orders-table'>
    <div className="order-header">
        <span>Title</span>
        <span>Amount</span>
        <span>Type</span>
      </div>
    <ul className="order-list">
      {subItems.map((item, index) => (
        <React.Fragment key={index}>
          <li className="order-item base-item">
            <span>{item.title}</span>
            <span>{item.amount}</span>
            <span>{item.type}</span>
          </li>
          {item.toppings && item.toppings.length > 0 && (
            item.toppings.map((topping, i) => (
              <li key={i} className="order-item topping-item">
                <span>{topping.title}</span>
                <span>{topping.amount}</span>
                <span>{topping.type}</span>
              </li>
            ))
          )}
        </React.Fragment>
      ))}
    </ul>
    </div>
  </div>
  );
};

export default OrderDetails;
