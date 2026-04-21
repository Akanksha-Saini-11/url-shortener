import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './UrlCard.css';

const UrlCard = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 const handleDownloadQR = () => {
  const canvas = document.querySelector('.url-card__qr canvas');
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'qrcode.png';
  a.click();
};
  return (
    <div className="url-card">
      <div className="url-card__row">
        <p className="url-card__label">Original URL</p>
        <p className="url-card__value">{url.longUrl}</p>
      </div>

      <div className="url-card__row">
        <p className="url-card__label">Short URL</p>
        <p className="url-card__value">
          <a href={url.shortUrl} target="_blank" rel="noreferrer">{url.shortUrl}</a>
        </p>
      </div>

      <hr className="url-card__divider" />

      <div className="url-card__footer">
        <button
          className={`url-card__copy-btn ${copied ? 'url-card__copy-btn--copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ Copied to clipboard' : 'Copy short link'}
        </button>

        <div className="url-card__qr-wrap">
          <p className="url-card__qr-label">Scan QR Code</p>
          <div className="url-card__qr">
            <QRCodeCanvas value={url.shortUrl} size={140} />
          </div>
          <button className="url-card__copy-btn" onClick={handleDownloadQR}>
  Download QR Code
</button>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;