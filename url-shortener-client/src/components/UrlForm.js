import React, { useState } from 'react';
import { shortenUrl } from '../services/api';
import './UrlForm.css';

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const UrlForm = ({ onAdd }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [aliasError, setAliasError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setLongUrl(val);
    if (val && !isValidUrl(val)) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(longUrl)) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setLoading(true);
    setUrlError('');
    setAliasError('');

    try {
      const res = await shortenUrl({ longUrl, customAlias, expiryDate: expiryDate || null });
      onAdd({ longUrl, shortUrl: res.data.shortUrl });
      setLongUrl('');
      setCustomAlias('');
      setExpiryDate('');
    } catch (err) {
      const msg = err.response?.data || '';
      if (msg === 'Alias already taken') {
        setAliasError('This alias is already taken. Try a different one.');
      } else {
        setAliasError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-form">
      <form className="url-form__fields" onSubmit={handleSubmit}>
        <div>
          <label className="url-form__label">Long URL</label>
          <input
            className={`url-form__input ${urlError ? 'url-form__input--error' : ''}`}
            type="text"
            placeholder="https://example.com/your/long/url"
            value={longUrl}
            onChange={handleUrlChange}
            required
          />
          {urlError && <p className="url-form__error">{urlError}</p>}
        </div>

        <div className="url-form__row">
          <div className="url-form__col">
            <label className="url-form__label">
              Custom alias <span className="url-form__optional">(optional)</span>
            </label>
            <input
              className={`url-form__input ${aliasError ? 'url-form__input--error' : ''}`}
              type="text"
              placeholder="my-link"
              value={customAlias}
              onChange={(e) => { setCustomAlias(e.target.value); setAliasError(''); }}
            />
            {aliasError && <p className="url-form__error">{aliasError}</p>}
          </div>

          <div className="url-form__col">
            <label className="url-form__label">
              Expiry date <span className="url-form__optional">(optional)</span>
            </label>
            <input
              className="url-form__input url-form__input--date"
              type="date"
              min={today}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
        </div>

        <button className="url-form__submit" type="submit" disabled={loading || !!urlError}>
          {loading ? 'Generating...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
};

export default UrlForm;