import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ItemTypeChartProps {
  data: { [key: string]: number }; 
}

const ItemTypeChart: React.FC<ItemTypeChartProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data), 
    datasets: [
      {
        data: Object.values(data), 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div style={{ width: '250px',  margin: '0 auto', height:'250px' }}>
      <h3 style={{ textAlign: 'center' }}>Orders by Item Type</h3>
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

export default ItemTypeChart;
