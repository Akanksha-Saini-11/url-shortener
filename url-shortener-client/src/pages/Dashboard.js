import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlCard from '../components/UrlCard';
import './Dashboard.css';

const Dashboard = () => {
  const [url, setUrl] = useState(null);

  return (
    <div className="dashboard">
      {/* <h1 className="dashboard__title">Dashboard</h1> */}
      <p className="dashboard__subtitle">Shorten a link to get started.</p>

      <UrlForm onAdd={setUrl} />
      {url && <UrlCard url={url} />}
    </div>
  );
};

export default Dashboard;