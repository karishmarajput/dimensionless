import React, { useState, useEffect } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

const CPUSpeedometer = () => {
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/resources/`)
      .then(response => {
        const cpuValues = response.data.cpu || [];
        if (cpuValues.length) {
          const avgCpu = cpuValues.reduce((a, b) => a + b, 0) / cpuValues.length;
          setCpuUsage(avgCpu);
        }
      })
      .catch(error => console.error('Error fetching CPU usage', error));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>CPU Daily Usage</h2>
      <ReactSpeedometer
        width={300}
        height={180}
        value={cpuUsage}
        maxValue={100}
        needleColor="steelblue"
        startColor="green"
        segments={10}
        endColor="red"
      />
    </div>
  );
};

export default CPUSpeedometer;
