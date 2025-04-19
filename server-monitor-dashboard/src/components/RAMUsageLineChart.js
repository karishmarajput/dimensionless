import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const RAMUsageLineChart = () => {
  const [ramData, setRamData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendUrl}/api/resources/`)
      .then(response => {
        const ramArray = response.data.ram || [];
        setRamData(ramArray);
        setLabels(ramArray.map((_, index) => `Time ${index + 1}`));
      })
      .catch(error => console.error('Error fetching RAM usage data', error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'RAM Usage (%)',
        data: ramData,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'lightblue'
      }
    ]
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>RAM Usage</h2>
      <Line data={data} />
    </div>
  );
};

export default RAMUsageLineChart;
