import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const DiskAppUsageChart = () => {
  const [diskData, setDiskData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/resources/`)
      .then(response => {
        const disk = response.data.disk || [];
        const app = response.data.app_usage || [];
        const timeLabels = disk.map((_, index) => `Time ${index + 1}`);
        setDiskData(disk);
        setAppData(app);
        setLabels(timeLabels);
      })
      .catch(error => {
        console.error('Error fetching resource usage data:', error);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Disk Usage (%)',
        data: diskData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Application Usage (%)',
        data: appData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Disk & Application Usage Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Disk and Application Usage</h2>
      <Bar data={data} options={options} height={100} />
    </div>
  );
};

export default DiskAppUsageChart;
