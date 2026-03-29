import React, { useEffect, useState } from 'react';
import { getAllUrls, deleteUrl } from '../services/api';
import './Analytics.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const Analytics = () => {
  const [urls, setUrls] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [deletedId, setDeletedId] = useState(null);

  const fetchUrls = async () => {
    try {
      const res = await getAllUrls();
      const sorted = res.data.sort((a, b) => b.clicks - a.clicks);
      setUrls(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
    const interval = setInterval(fetchUrls, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (shortUrl, index) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDelete = async (id) => {
    setDeletedId(id);
    try {
      await deleteUrl(id);
      // Show red tick briefly then remove the row
      setTimeout(() => {
        setUrls((prev) => prev.filter((u) => u._id !== id));
        setDeletedId(null);
      }, 800);
    } catch (err) {
      console.error(err);
      setDeletedId(null);
    }
  };

  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);

  return (
    <div className="analytics">
      <div className="analytics__header">
        <div className="analytics__title-row">
          <h2 className="analytics__title">Analytics</h2>
          <div className="analytics__live">
            <span className="analytics__live-dot" /> Live
          </div>
        </div>
      </div>

      <div className="analytics__stats">
        <div className="analytics__stat">
          <p className="analytics__stat-label">Total Links</p>
          <p className="analytics__stat-value">{urls.length}</p>
        </div>
        <div className="analytics__stat">
          <p className="analytics__stat-label">Total Clicks</p>
          <p className="analytics__stat-value">{totalClicks}</p>
        </div>
        <div className="analytics__stat">
          <p className="analytics__stat-label">Avg. Clicks</p>
          <p className="analytics__stat-value">
            {urls.length ? (totalClicks / urls.length).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      <div className="analytics__table-wrap">
        {urls.length === 0 ? (
          <div className="analytics__empty">No links yet.</div>
        ) : (
          <table className="analytics__table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks ↓</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, i) => {
                const shortUrl = `${BASE_URL}/${url.shortId}`;
                const isDeleted = deletedId === url._id;
                return (
                  <tr key={url._id}>
                    <td>
                      <a href={url.longUrl} target="_blank" rel="noopener noreferrer" title={url.longUrl}>
                        {url.longUrl}
                      </a>
                    </td>
                    <td>
                      <a className="analytics__short-link" href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                      </a>
                    </td>
                    <td>{url.clicks}</td>
                    <td>
                      <div className="analytics__actions">
                        <button
                          className={`analytics__copy-btn ${copiedIndex === i ? 'analytics__copy-btn--copied' : ''}`}
                          onClick={() => handleCopy(shortUrl, i)}
                        >
                          {copiedIndex === i ? '✓' : 'Copy'}
                        </button>
                        <button
                          className={`analytics__delete-btn ${isDeleted ? 'analytics__delete-btn--deleted' : ''}`}
                          onClick={() => handleDelete(url._id)}
                          disabled={isDeleted}
                        >
                          {isDeleted ? '✓' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Analytics;