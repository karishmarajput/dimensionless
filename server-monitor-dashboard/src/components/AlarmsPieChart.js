import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const AlarmsPieChart = () => {
  const [alertData, setAlertData] = useState({ critical: 0, medium: 0, low: 0 });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/alerts/`)
      .then(response => setAlertData(response.data))
      .catch(error => console.error('Error fetching alert data', error));
  }, []);

  const chartData = {
    labels: ['Critical', 'Medium', 'Low'],
    datasets: [{
      data: [alertData.critical, alertData.medium, alertData.low],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(54, 162, 235, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 2
    }]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Alarm Types</h2>
      <Pie data={chartData} options={options} height={100} />
    </div>
  );
};

export default AlarmsPieChart;
