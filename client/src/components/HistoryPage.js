import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './HistoryPage.css';

const HistoryPage = ({ user, onLogout }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (term) => {
    navigate('/', { state: { searchTerm: term } });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
      });
    }
  };

  const groupByDate = (historyList) => {
    const grouped = {};
    historyList.forEach(item => {
      const date = new Date(item.timestamp);
      const dateKey = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    return grouped;
  };

  const groupedHistory = groupByDate(history);

  return (
    <div className="history-page">
      <Navigation user={user} onLogout={onLogout} />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📜 Search History</h1>
          <p className="page-subtitle">Your past searches</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No search history yet</h3>
            <p>Start searching for images to see your history here!</p>
            <button 
              className="start-search-btn"
              onClick={() => navigate('/')}
            >
              Start Searching
            </button>
          </div>
        ) : (
          <div className="history-content">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="history-date-group">
                <h2 className="date-header">{date}</h2>
                <div className="history-list">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="history-item-card"
                      onClick={() => handleHistoryClick(item.term)}
                    >
                      <div className="history-item-icon">🔍</div>
                      <div className="history-item-content">
                        <h3 className="history-term">{item.term}</h3>
                        <p className="history-time">{formatTime(item.timestamp)}</p>
                      </div>
                      <div className="history-item-action">
                        <span className="action-arrow">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;


