import React, { useState } from 'react';
import StatusButton from './StatusButton';
import OrderDetails from './OrderDetails';
import Modal from './Modal';
import '../styles/Order.css';
import VisibilityIcon from '@mui/icons-material/VisibilitySharp';

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

const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="order-card">
      <div className="order-summary">
        <span className="order-id">{id}</span>
        <button className="order-title-btn" onClick={handleOpenModal}>
          {title}
        </button>
        <span className="order-time">{new Date(orderTime).toLocaleString()}</span>
        <StatusButton
          status={status}
          onChangeStatus={(newStatus) => onUpdateStatus(id, newStatus)}
        />
        <button className="details-btn" onClick={() => setIsModalOpen(true)}>
      
          <VisibilityIcon />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderDetails id={id} title={title} orderTime={orderTime} subItems={subItems} />
      </Modal>
    </div>
  );
};

export default Order;
