import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/Sidebar.css'; 


const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>Orders Manager <img 
    src='../pizza-box_9425833.png'
    alt="Orders Icon" 
    style={{ width: '30px', height: '30px' }} 
  /></h2>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li> <Link to="/order-map">Orders Map</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
