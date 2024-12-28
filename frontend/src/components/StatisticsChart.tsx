import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);


const STATUS_COLORS: { [key: string]: string } = {
  Received: '#007bff', // Blue
  Preparing: '#ffc107', // Yellow
  Ready: '#28a745', // Green
  EnRoute: '#17a2b8', // Teal
  Delivered: '#6c757d', // Gray
};

interface StatisticsChartProps {
  data: { [key: string]: number }; 
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data), 
    datasets: [
      {
        data: Object.values(data), 
        backgroundColor: Object.keys(data).map((status) => STATUS_COLORS[status] || '#cccccc'),
        hoverBackgroundColor: Object.keys(data).map((status) => STATUS_COLORS[status] || '#aaaaaa'),
      },
    ],
  };

  return (
    <div style={{ width: '250px',  margin: '0 auto', height:'250px' }}>
      <h3  style={{ textAlign: 'center' }}>Reservations Statistics</h3>
      <Pie
        data={chartData} 
        options={{
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default StatisticsChart;
