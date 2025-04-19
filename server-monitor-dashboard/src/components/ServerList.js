import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ServerList = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/servers/`)
      .then(response => setServers(response.data))
      .catch(error => console.error('Error fetching servers', error));
  }, []);

  return (
    <div className="container py-3">
      <h2 className="mb-3">Active Instances</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>IP</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {servers.map(server => (
            <tr key={server.id}>
              <td>{server.id}</td>
              <td>{server.name}</td>
              <td>{server.ip}</td>
              <td>{server.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServerList;
