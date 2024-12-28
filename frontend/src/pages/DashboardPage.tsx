import React from 'react';
import StatisticsChart from '../components/StatisticsChart';
import ItemTypeChart from '../components/ItemTypeChart';
import '../styles/DashboardPage.css';

interface DashboardPageProps {
  reservationStatistics: { [key: string]: number };
  itemTypeStatistics: { [key: string]: number };
  totalOrders: number;
  additionalCounts: { [key: string]: number };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ 
  reservationStatistics, 
  itemTypeStatistics, 
  totalOrders, 
  additionalCounts 
}) => {
  return (
    <div className="dashboard-page">
     <h1 style={{ textAlign: 'center', fontSize: '35px' }}>Orders Manager - Dashboard</h1>
      <h2 style={{ marginLeft: '10px', textAlign: 'center' ,fontSize: '33px' }}>Welcome!</h2>

      <div className="dashboard-content">
        <div className="countings">
          <h3>Orders Details</h3>
          <hr className="separator-line" />
          <ul className="order-details-list">
            <li>
              <span className="order-label red-text">Total Orders:</span>
              <span className="order-value red-text">{totalOrders}</span>
            </li>
            <li>
              <span className="order-label">Received:</span>
              <span className="order-value">{additionalCounts["Received"] || 0}</span>
            </li>
            <li>
              <span className="order-label">Preparing:</span>
              <span className="order-value">{additionalCounts["Preparing"] || 0}</span>
            </li>
            <li>
              <span className="order-label">Ready:</span>
              <span className="order-value">{additionalCounts["Ready"] || 0}</span>
            </li>
            <li>
              <span className="order-label">En Route:</span>
              <span className="order-value">{additionalCounts["EnRoute"] || 0}</span>
            </li>
            <li>
              <span className="order-label">Delivered:</span>
              <span className="order-value">{additionalCounts["Delivered"] || 0}</span>
            </li>
          </ul>
          
        </div>

        <div className="reservation-chart">
          <StatisticsChart data={reservationStatistics} />
        </div>
      </div>

      {/* <div className="statistics-chart-container">
        <ItemTypeChart data={itemTypeStatistics} />
      </div> */}
    </div>
  );
};

export default DashboardPage;
