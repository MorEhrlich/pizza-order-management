import React from 'react';
import '../styles/Sidebar.css'; // Import styles for the sidebar

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Pizza Manager</h2>
      <ul className="sidebar-menu">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#orders">Orders</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
