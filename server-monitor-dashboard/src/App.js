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
      {/* Navbar */}
      <nav>
        <p>
          Server Monitoring Dashboard
        </p>
      </nav>

      {/* Main Grid Content */}
      <div className="content">
        {/* First Row of Grid Items */}
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
        {/* Disk/App Usage-> spans two columns (we want it to be prominent) */}
        <div className="disk-usage">
          <DiskAppUsageChart />
        </div>
        {/* Next item */}
        
        {/* Server List spans full width on a new row */}
        <div className="server-list">
          <ServerList />
        </div>
      </div>
    </div>
  );
}

export default App;
