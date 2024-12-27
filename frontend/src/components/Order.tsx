import React, { useState } from 'react';
import StatusButton from './StatusButton';
import OrderDetails from './OrderDetails';
import Modal from './Modal';
import '../styles/Order.css';

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

  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="order-card">
      <div className="order-summary">
        <span className="order-id">{id}</span>
        <span className="order-title">{title}</span>
        <span className="order-time">{new Date(orderTime).toLocaleString()}</span>
        <StatusButton
          status={status}
          onChangeStatus={(newStatus) => onUpdateStatus(id, newStatus)}
        />
        <button className="details-btn" onClick={() => setIsModalOpen(true)}>
          View Details
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderDetails id={id} title={title} orderTime={orderTime} subItems={subItems} />
      </Modal>
    </div>
  );
};

export default Order;
