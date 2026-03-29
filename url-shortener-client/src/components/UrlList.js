import React, { useState, useEffect } from 'react';
import './UrlList.css';

const UrlList = ({ urls }) => {
  const [urlList, setUrlList] = useState(urls);

  useEffect(() => {
    setUrlList(urls);
  }, [urls]);

  const handleClick = (index, shortUrl) => {
    const updated = [...urlList];
    updated[index].clicks += 1;
    setUrlList(updated);
    window.open(shortUrl, '_blank');
  };

  return (
    <div className="url-list">
      <h3 className="url-list__title">All Links</h3>
      <div className="url-list__table-wrap">
        {urlList.length === 0 ? (
          <div className="url-list__empty">No links yet.</div>
        ) : (
          <table className="url-list__table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map((url, index) => (
                <tr key={index}>
                  <td>
                    <a href={url.longUrl} target="_blank" rel="noopener noreferrer" title={url.longUrl}>
                      {url.longUrl}
                    </a>
                  </td>
                  <td>
                    <button className="url-list__short-btn" onClick={() => handleClick(index, url.shortUrl)}>
                      {url.shortUrl}
                    </button>
                  </td>
                  <td className="url-list__clicks">{url.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UrlList;