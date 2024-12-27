import React from 'react';
import '../styles/ControlsBar.css';

interface ControlsBarProps {
  sortKey: string;
  setSortKey: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const ControlsBar: React.FC<ControlsBarProps> = ({
  sortKey,
  setSortKey,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="controls-bar">
      <label>Sort By:</label>
      <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
        <option value="title">Title</option>
        <option value="status">Status</option>
        {/* <option value="orderTime">Order Time</option> */}
        <option value="orderTimeAsc">Oldest to Newest</option> 
        <option value="orderTimeDesc">Newest to Oldest</option>
      </select>

      <label>Filter By Status:</label>
      <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
        <option value="undelivered">All Undelivered Orders</option>
        <option value="all">All Orders</option>
        <option value="Received">Received</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="EnRoute">EnRoute</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  );
};

export default ControlsBar;
