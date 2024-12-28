import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/StatusButton.css';

const STATUS_COLORS: { [key: string]: string } = {
  Received: '#007bff', // Blue
  Preparing: '#ffc107', // Yellow
  Ready: '#28a745', // Green
  EnRoute: '#17a2b8', // Teal
  Delivered: '#6c757d', // Gray
};

const STATUS_LIST = ['Received', 'Preparing', 'Ready', 'EnRoute', 'Delivered'];

interface StatusButtonProps {
  status: string;
  onChangeStatus: (newStatus: string) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onChangeStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);


  const handleStatusUpdate = () => {
    if (selectedStatus !== status) {
      onChangeStatus(selectedStatus);
    }
    setIsModalOpen(false);
  };
  return (
    <div className="status-button-container">
      <button
        className="status-button"
        style={{ backgroundColor: STATUS_COLORS[status] }}
        onClick={() => setIsModalOpen(true)}
      >
        {status}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="status-modal-content">
          <h4>Change Order Status</h4>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            {STATUS_LIST.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
          <div className="modal-actions">
            <button className="modal-ok-btn" onClick={handleStatusUpdate}>
              OK
            </button>
            <button className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StatusButton;
