import React, { useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    onChangeStatus(newStatus); // Notify parent about the change
    setIsEditing(false); // Close dropdown immediately
  };

  return (
    <div className="status-button-container">
      {isEditing ? (
        <select
          className="status-select"
          value={status}
          onChange={handleStatusChange}
          onBlur={() => setIsEditing(false)} // Close dropdown when it loses focus
          autoFocus // Automatically focus the dropdown for instant interaction
        >
          {STATUS_LIST.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      ) : (
        <button
          className="status-button"
          style={{ backgroundColor: STATUS_COLORS[status] }}
          onClick={() => setIsEditing(true)}
        >
          {status}
        </button>
      )}
    </div>
  );
};

export default StatusButton;
