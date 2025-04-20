import React from "react";
import CPUSpeedometer from "./components/CPUSpeedometer";
import AlarmsPieChart from "./components/AlarmsPieChart";
import RAMUsageLineChart from "./components/RAMUsageLineChart";
import DiskAppUsageChart from "./components/DiskAppUsageChart";
import ServerList from "./components/ServerList";
import NetworkTrafficAreaChart from "./components/NetworkTrafficAreaChart";
import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <p>
          Server Monitoring Dashboard
        </p>
      </nav>
      <div className="content">
        <div className="component">
          <CPUSpeedometer />
        </div>
        <div className="component">
          <RAMUsageLineChart />
        </div>
        <div className="component">
          <AlarmsPieChart />
        </div>
        <div className="component">
          <NetworkTrafficAreaChart />
        </div>
        <div className="disk-usage">
          <DiskAppUsageChart />
        </div>
        <div className="server-list">
          <ServerList />
        </div>
      </div>
    </div>
  );
}

export default App;
