import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderMapPage from '../pages/OrderMapPage';
import '../styles/Sidebar.css'; 

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Orders Manager</h2>
      <ul className="sidebar-menu">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Orders Map</a></li>
      </ul>
    </div>
//     <Router>
//     <div className="sidebar-container">
   
//       <nav className="sidebar">
//       <h2>Orders Manager</h2>
//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/">Order List</Link>
//           </li>
//           <li>
//             <Link to="/map">Orders Map</Link>
//           </li>
//         </ul>
//       </nav>
//       <main className="sidebar-content">
//         <Routes>
//           <Route path="/"  />
//           <Route path="/map"  element={<OrderMapPage />}/>
//         </Routes>
//       </main>
//     </div>
//   </Router>
  );
};

export default Sidebar;
