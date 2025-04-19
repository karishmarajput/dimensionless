import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const NetworkTrafficAreaChart = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/network/`)
      .then((response) => {
        const { timestamps, traffic } = response.data;
        setLabels(timestamps);
        setTrafficData(traffic);
      })
      .catch((error) => console.error("Error fetching network traffic data:", error));
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Incoming Traffic (MB)",
        data: trafficData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Server Incoming Network Traffic",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Network Traffic Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default NetworkTrafficAreaChart;
