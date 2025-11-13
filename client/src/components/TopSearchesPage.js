import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './TopSearchesPage.css';

const TopSearchesPage = ({ user, onLogout }) => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/top-searches');
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (term) => {
    navigate('/', { state: { searchTerm: term } });
  };

  return (
    <div className="top-searches-page">
      <Navigation user={user} onLogout={onLogout} />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">🔥 Top Searches</h1>
          <p className="page-subtitle">Most popular search terms across all users</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading top searches...</p>
          </div>
        ) : topSearches.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No searches yet</h3>
            <p>Be the first to search for images!</p>
          </div>
        ) : (
          <div className="top-searches-grid">
            {topSearches.map((item, index) => (
              <div
                key={index}
                className="top-search-card"
                onClick={() => handleSearchClick(item.term)}
              >
                <div className="rank-badge">{index + 1}</div>
                <div className="search-info">
                  <h3 className="search-term">{item.term}</h3>
                  <p className="search-count">{item.count} search{item.count !== 1 ? 'es' : ''}</p>
                </div>
                <div className="search-action">
                  <span className="action-icon">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSearchesPage;


