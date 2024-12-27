import React, { useState } from 'react';
import Order from './Order';
import '../styles/OrderList.css';

interface OrderProps {
  id: number;
  title: string;
  status: string;
  orderTime: string;
  subItems: [];
}

interface Props {
  orders: OrderProps[];
  onUpdateStatus: (id: number, status: string) => void;
}

const OrderList: React.FC<Props> = ({ orders, onUpdateStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of orders per page

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="order-list">
      <div className="order-list-header">
        <span className="header-id">ID</span>
        <span className="header-title">Title</span>
        <span className="header-time">Order Time</span>
        <span className="header-status">Status</span>
        <span className="header-actions">Actions</span>
      </div>
      {currentOrders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          title={order.title}
          subItems={order.subItems}
          status={order.status}
          orderTime={order.orderTime}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
