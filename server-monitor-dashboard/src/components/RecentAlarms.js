import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentAlarms = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendUrl}/api/alarms/`)
      .then(response => setAlarms(response.data))
      .catch(error => console.error('Error fetching recent alarms', error));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Most Recent Alarms</h2>
      <ul>
        {alarms.map(alarm => (
          <li key={alarm.id}>
            {alarm.server} - {alarm.alert_type} at {alarm.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAlarms;
